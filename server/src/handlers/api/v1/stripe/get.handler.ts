import { FastifyReply, FastifyRequest } from "fastify";
import { CreateSubscription } from "./types";
import {
  createCheckout,
  createCustomer,
  createPortal,
} from "../../../../utils/stripe";

export const createSubscriptionHandler = async (
  request: FastifyRequest<CreateSubscription>,
  reply: FastifyReply
) => {
  const prisma = request.server.prisma;
  const lookup = request.query.lookup;

  const stripe = await prisma.stripe.findUnique({
    where: {
      user_id: request.user.user_id,
    },
  });

  if (!stripe) {
    return reply.status(500).send({
      message: "Stipe customer id not created!",
    });
  }

  // if (stripe.active_plan) {
  //   return reply.status(400).send({
  //     message: "User already subscribed to a plan",
  //   });
  // }

  const checkout = await createCheckout({
    customerId: stripe.customerId,
    lookup,
  });

  return {
    redirect: checkout?.url,
  };
};

export const manageSubscriptionHandler = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const prisma = request.server.prisma;

  const stripe = await prisma.stripe.findFirst({
    where: { user_id: request.user.user_id },
  });

  if (!stripe) return reply.status(500).send({ message: "Stripe not found" });

  if (!stripe?.active_plan)
    return reply.status(400).send({ message: "No Active Subscription" });

  const billingPortal = await createPortal(stripe.customerId);
  if (!billingPortal)
    reply.status(500).send({ message: "Portal creation failed" });

  return {
    redirect: billingPortal?.url,
  };
};

export const getSubscriptionHandler = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const prisma = request.server.prisma;

  const stripe = await prisma.stripe.findUnique({
    where: {
      user_id: request.user.user_id,
    },
  });

  if (!stripe) return reply.status(500).send({ message: "Stripe not found" });

  return {
    active_plan: stripe.active_plan,
  };
};

export const dataPatch = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const prisma = request.server.prisma;

  const users = await prisma.user.findMany({
    where: {},
  });

  for (let i = 0; i < users.length; i++) {
    const user = users[i];

    const stripe = await prisma.stripe.findFirst({
      where: { user_id: user.user_id },
    });
    if (!stripe) {
      const customer = await createCustomer({
        email: user.email || "",
        userName: user.username,
        userId: user.user_id.toString(),
      });
      if (customer) {
        await prisma.stripe.create({
          data: {
            user_id: user.user_id,
            customerId: customer.id,
          },
        });
      }
    }
  }

  return { success: true };
};
