import { FastifySchema } from "fastify";

export const createSubscriptionSchema: FastifySchema = {
  tags: ["Stripe"],
  summary: "API to create subscription",
  querystring: {
    type: "object",
    required: ["lookup"],
    properties: {
      lookup: {
        type: "string",
      },
    },
  },
};

export const updatePlanDemoSchema: FastifySchema = {
  tags: ["Stripe"],
  summary: "API to update subscription plan",
  querystring: {
    type: "object",
    required: ["planLookup"],
    properties: {
      planLookup: {
        type: "string",
      },
    },
  },
};
