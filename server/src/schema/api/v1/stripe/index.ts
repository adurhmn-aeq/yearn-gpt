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
