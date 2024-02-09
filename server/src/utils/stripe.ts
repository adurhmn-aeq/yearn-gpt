import { PrismaClient } from "@prisma/client";
import Stripe from "stripe";

export const getStripe = () => {
  if (!process.env.STRIPE_SECRET_KEY) throw new Error("No Stripe Key Found");
  return require("stripe")(process.env.STRIPE_SECRET_KEY) as Stripe;
};

export const createCustomer = async ({
  userName,
  email,
  userId,
}: {
  userName: string;
  email: string;
  userId: string;
}) => {
  const stripe = getStripe();
  try {
    return await stripe.customers.create({
      metadata: {
        userName,
        email,
        userId,
      },
    });
  } catch (err) {
    console.log("createCustomer err", err);
    return null;
  }
};

export const deleteCustomer = async ({
  customerId,
}: {
  customerId: string;
}) => {
  const stripe = getStripe();
  try {
    return await stripe.customers.del(customerId);
  } catch (err) {
    console.log("deleteCustomer err", err);
    return null;
  }
};

export const createCheckout = async ({
  customerId,
  lookup,
}: {
  lookup: string;
  customerId: string;
}) => {
  const stripe = getStripe();

  // get prize
  const prices = await stripe.prices.list({
    lookup_keys: [lookup],
    expand: ["data.product"],
  });

  // get checkout session
  const checkout = await stripe.checkout.sessions.create({
    billing_address_collection: "auto",
    customer: customerId,
    line_items: [
      {
        price: prices.data[0].id,
        quantity: 1,
      },
    ],
    mode: "subscription",
    success_url: `${process.env.FRONTEND_HOST_URL_DEV}/#/pricing`,
    cancel_url: `${process.env.FRONTEND_HOST_URL_DEV}/#/pricing`,
  });

  return checkout;
};

export const createPortal = async (customerId: string) => {
  try {
    const stripe = getStripe();

    const portal = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${process.env.FRONTEND_HOST_URL_DEV}/#/pricing`,
    });

    return portal;
  } catch (err) {
    console.log("createPortal err", err);
    return null;
  }
};

export enum PlanLookup {
  HOBBY_MONTHLY = "hobby_monthly",
  HOBBY_YEARLY = "hobby_yearly",
  STARTUP_MONTHLY = "startup_monthly",
  STARTUP_YEARLY = "startup_yearly",
  ENTERPRISE_MONTHLY = "enterprise_monthly",
  ENTERPRISE_YEARLY = "enterprise_yearly",
}

export const MessageCredits = {
  [PlanLookup.HOBBY_MONTHLY]: 200,
  [PlanLookup.HOBBY_YEARLY]: 200,
  [PlanLookup.STARTUP_MONTHLY]: 700,
  [PlanLookup.STARTUP_YEARLY]: 700,
  [PlanLookup.ENTERPRISE_MONTHLY]: 1500,
  [PlanLookup.ENTERPRISE_YEARLY]: 1500,
};

export const BotLimit = {
  [PlanLookup.HOBBY_MONTHLY]: 2,
  [PlanLookup.HOBBY_YEARLY]: 2,
  [PlanLookup.STARTUP_MONTHLY]: 5,
  [PlanLookup.STARTUP_YEARLY]: 5,
  [PlanLookup.ENTERPRISE_MONTHLY]: 10,
  [PlanLookup.ENTERPRISE_YEARLY]: 10,
};

export const AgentLimit = {
  [PlanLookup.HOBBY_MONTHLY]: 2,
  [PlanLookup.HOBBY_YEARLY]: 2,
  [PlanLookup.STARTUP_MONTHLY]: 5,
  [PlanLookup.STARTUP_YEARLY]: 5,
  [PlanLookup.ENTERPRISE_MONTHLY]: 10,
  [PlanLookup.ENTERPRISE_YEARLY]: 10,
};

export enum PlanStatus {
  ACTIVE = "active",
  PAST_DUE = "past_due",
}

export const canCreateBot = async (prisma: PrismaClient, userId: number) => {
  const stripe = await prisma.stripe.findUnique({ where: { user_id: userId } });
  const activeBotCount = await prisma.bot.count({
    where: { user_id: userId, disabled: false },
  });

  if (stripe === null || activeBotCount === null) {
    throw new Error("Validation didn't go through");
  }

  if (!stripe.active_plan || stripe.plan_status === PlanStatus.PAST_DUE) {
    return [false, "You have no active subscription. Subscribe to create bot."];
  }

  if (activeBotCount === BotLimit[stripe.active_plan as PlanLookup])
    return [false, "Reached bot limit. Upgrade plan to increase limit."];

  return [true, ""];
};

export const canCreateAgent = async (prisma: PrismaClient, userId: number) => {
  const stripe = await prisma.stripe.findUnique({ where: { user_id: userId } });
  const activeAgentCount = await prisma.agent.count({
    where: { user_id: userId, disabled: false },
  });

  if (stripe === null || activeAgentCount === null) {
    throw new Error("Validation didn't go through");
  }

  if (!stripe.active_plan || stripe.plan_status === PlanStatus.PAST_DUE) {
    return [
      false,
      "You have no active subscription. Subscribe to create agent.",
    ];
  }

  if (activeAgentCount === AgentLimit[stripe.active_plan as PlanLookup])
    return [false, "Reached agent limit. Upgrade plan to increase limit."];

  return [true, ""];
};
