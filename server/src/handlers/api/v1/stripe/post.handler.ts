import { FastifyReply, FastifyRequest } from "fastify";
import Stripe from "stripe";
import {
  AgentLimit,
  BotLimit,
  MessageCredits,
  PlanLookup,
  SourceCharsPerBot,
  getStripe,
} from "../../../../utils/stripe";
import { GetResult } from "@prisma/client/runtime/library";

export const webhookHandler = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(
      (request.body as any).raw,
      request.headers["stripe-signature"]!,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.log("Signature verify failed");
    return reply.status(500).send({ message: "Something went wrong" });
  }

  const prisma = request.server.prisma;
  let lookup: PlanLookup;
  let stripe:
    | (GetResult<
        {
          id: string;
          customerId: string;
          user_id: number;
          active_plan: string;
          subscription_id: string;
          line_item_id: string;
          plan_status: string;
          message_credits_remaining: number;
        },
        any
      > & {})
    | null;

  // Handle the event
  switch (event.type) {
    case "customer.subscription.updated":
      // handles creation + plan switch + deletion
      const customerSubscriptionUpdated = event.data
        .object as Stripe.Subscription;
      lookup = customerSubscriptionUpdated!.items!.data[0]!.price
        .lookup_key as PlanLookup;
      const allowedBots = BotLimit[lookup];
      const allowedAgents = AgentLimit[lookup];
      stripe = await prisma.stripe.findFirst({
        where: {
          customerId: customerSubscriptionUpdated.customer as string,
        },
      });

      if (
        customerSubscriptionUpdated.status === "active" ||
        customerSubscriptionUpdated.status === "past_due"
      ) {
        // creation + plan change
        await prisma.stripe.updateMany({
          where: { customerId: customerSubscriptionUpdated.customer as string },
          data: {
            active_plan:
              customerSubscriptionUpdated?.items?.data[0]?.price.lookup_key ||
              "",
            line_item_id: customerSubscriptionUpdated?.items?.data[0]?.id || "",
            subscription_id:
              customerSubscriptionUpdated?.items?.data[0]?.subscription || "",
            plan_status: customerSubscriptionUpdated.status,
          },
        });

        // enable / disable bots & agents according to new plan
        if (customerSubscriptionUpdated.status === "active") {
          // message credits reset
          await prisma.stripe.updateMany({
            where: {
              customerId: customerSubscriptionUpdated.customer as string,
            },
            data: {
              message_credits_remaining: MessageCredits[lookup],
            },
          });

          // // source chars reset
          // await prisma.bot.updateMany({
          //   where: {
          //     user_id: stripe?.user_id,
          //   },
          //   data: {
          //     source_chars_remaining: SourceCharsPerBot[lookup],
          //   },
          // });

          const enabledBots = await prisma.bot.findMany({
            where: { user_id: stripe?.user_id, disabled: false },
            select: { id: true },
          });
          const disabledBots = await prisma.bot.findMany({
            where: { user_id: stripe?.user_id, disabled: true },
            select: { id: true },
          });
          if (enabledBots.length > allowedBots) {
            console.log("disable bots");
            await prisma.bot.updateMany({
              where: {
                id: {
                  in: enabledBots
                    .slice(0, enabledBots.length - allowedBots)
                    .map((b) => b.id),
                },
              },
              data: { disabled: true },
            });
          } else if (enabledBots.length < allowedBots) {
            console.log("enable bots");
            await prisma.bot.updateMany({
              where: {
                id: {
                  in: disabledBots
                    .slice(0, allowedBots - enabledBots.length)
                    .map((b) => b.id),
                },
              },
              data: { disabled: false },
            });
          }

          const enabledAgents = await prisma.agent.findMany({
            where: { user_id: stripe?.user_id, disabled: false },
            select: { id: true },
          });
          const disabledAgents = await prisma.agent.findMany({
            where: { user_id: stripe?.user_id, disabled: true },
            select: { id: true },
          });
          if (enabledAgents.length > allowedAgents) {
            console.log("disable agents");
            await prisma.agent.updateMany({
              where: {
                id: {
                  in: enabledAgents
                    .slice(0, enabledAgents.length - allowedAgents)
                    .map((b) => b.id),
                },
              },
              data: { disabled: true },
            });
          } else if (enabledAgents.length < allowedAgents) {
            console.log("enable bots");
            await prisma.agent.updateMany({
              where: {
                id: {
                  in: disabledAgents
                    .slice(0, allowedAgents - enabledAgents.length)
                    .map((b) => b.id),
                },
              },
              data: { disabled: false },
            });
          }
        }
        // disable all bots & agents
        if (customerSubscriptionUpdated.status === "past_due") {
          await prisma.bot.updateMany({
            where: { user_id: stripe?.user_id },
            data: { disabled: true },
          });
          await prisma.agent.updateMany({
            where: { user_id: stripe?.user_id },
            data: { disabled: true },
          });
        }
      }
      console.log("handled customer.subscription.updated");
      break;

    case "customer.subscription.deleted":
      const customerSubscriptionDeleted = event.data.object;
      lookup = customerSubscriptionDeleted!.items!.data[0]!.price
        .lookup_key as PlanLookup;
      stripe = await prisma.stripe.findFirst({
        where: {
          customerId: customerSubscriptionDeleted.customer as string,
        },
      });
      await prisma.stripe.updateMany({
        where: { customerId: customerSubscriptionDeleted.customer as string },
        data: {
          active_plan: "",
          line_item_id: "",
          subscription_id: "",
          plan_status: "",
          message_credits_remaining: 0,
        },
      });
      // // source chars reset
      // await prisma.bot.updateMany({
      //   where: {
      //     user_id: stripe?.user_id,
      //   },
      //   data: {
      //     source_chars_remaining: 0,
      //   },
      // });
      // disable all bots and agents
      await prisma.bot.updateMany({
        where: { user_id: stripe?.user_id },
        data: { disabled: true },
      });
      await prisma.agent.updateMany({
        where: { user_id: stripe?.user_id },
        data: { disabled: true },
      });
      console.log("handled customer.subscription.deleted");
      break;

    // case "invoice.paid":
    //   // handles subscription renewal
    //   const invoicePaid = event.data.object;
    //   const lookup = invoicePaid.lines!.data[0]!.price!.lookup_key;

    //   if (lookup) {
    //     // reset message credits according to new plan
    //     await prisma.stripe.updateMany({
    //       where: { customerId: invoicePaid.customer as string },
    //       data: {
    //         message_credits_remaining: MessageCredits[lookup as PlanLookup],
    //       },
    //     });
    //   }

    //   console.log("invoice.paid");
    //   break;
    default:
    // ... handle other event types
    // console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 res to acknowledge receipt of the event
  reply.status(200).send();
};
