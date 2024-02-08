import { FastifyReply, FastifyRequest } from "fastify";
import Stripe from "stripe";
import {
  BotLimit,
  MessageCredits,
  PlanLookup,
  getStripe,
} from "../../../../utils/stripe";

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

  // Handle the event
  switch (event.type) {
    case "customer.subscription.updated":
      // handles creation + plan switch + deletion
      const customerSubscriptionUpdated = event.data
        .object as Stripe.Subscription;
      const allowedBots =
        BotLimit[
          customerSubscriptionUpdated!.items!.data[0]!.price
            .lookup_key as PlanLookup
        ];

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
        // enable / disable bots according to new plan
        if (customerSubscriptionUpdated.status === "active") {
          const stripe = await prisma.stripe.findFirst({
            where: {
              customerId: customerSubscriptionUpdated.customer as string,
            },
          });

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
        }
        // disable all bots
        if (customerSubscriptionUpdated.status === "past_due")
          await prisma.bot.updateMany({ where: {}, data: { disabled: true } });
      } else if (customerSubscriptionUpdated.status === "canceled") {
        // deletion
        await prisma.stripe.updateMany({
          where: { customerId: customerSubscriptionUpdated.customer as string },
          data: {
            active_plan: "",
            line_item_id: "",
            subscription_id: "",
            plan_status: "",
            message_credits_remaining: 0,
          },
        });
        // disable all bots
        await prisma.bot.updateMany({ where: {}, data: { disabled: true } });
      }
      console.log("handled customer.subscription.updated");
      break;

    case "invoice.paid":
      // handles subscription renewal
      const invoicePaid = event.data.object;
      const lookup = invoicePaid.lines!.data[0]!.price!.lookup_key;

      if (lookup) {
        // reset message credits according to new plan
        await prisma.stripe.updateMany({
          where: { customerId: invoicePaid.customer as string },
          data: {
            message_credits_remaining: MessageCredits[lookup as PlanLookup],
          },
        });
      }

      console.log("invoice.paid");
      break;
    default:
    // ... handle other event types
    // console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 res to acknowledge receipt of the event
  reply.status(200).send();
};
