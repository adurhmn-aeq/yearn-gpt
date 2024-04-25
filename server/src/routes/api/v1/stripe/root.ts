import { FastifyPluginAsync } from "fastify";
import { createSubscriptionSchema, updatePlanDemoSchema } from "../../../../schema/api/v1/stripe";
import {
  createSubscriptionHandler,
  dataPatch,
  getSubscriptionHandler,
  getUsageHandler,
  manageSubscriptionHandler,
  updatePlanDemoHandler,
  webhookHandler,
} from "../../../../handlers/api/v1/stripe";

const root: FastifyPluginAsync = async (fastify, _): Promise<void> => {
  fastify.get("/data-patch", dataPatch);

  fastify.get(
    "/subscription/fetch",
    { onRequest: [fastify.authenticate] },
    getSubscriptionHandler
  );

  fastify.get(
    "/subscription/manage",
    { onRequest: [fastify.authenticate] },
    manageSubscriptionHandler
  );

  fastify.get(
    "/subscription/create",
    { schema: createSubscriptionSchema, onRequest: [fastify.authenticate] },
    createSubscriptionHandler
  );

  fastify.get("/usage", { onRequest: [fastify.authenticate] }, getUsageHandler);

  fastify.get(
    "/update-plan-demo",
    {
      schema: updatePlanDemoSchema,
      onRequest: [fastify.authenticate],
    },
    updatePlanDemoHandler
  );

  fastify.addContentTypeParser(
    "application/json",
    { parseAs: "buffer" },
    function (req, body, done) {
      try {
        var newBody = {
          raw: body,
        };
        done(null, newBody);
      } catch (error: any) {
        error.statusCode = 400;
        done(error, undefined);
      }
    }
  );

  fastify.post("/webhook", webhookHandler);
};

export default root;
