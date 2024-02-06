import { FastifyPluginAsync } from "fastify";
import { createSubscriptionSchema } from "../../../../schema/api/v1/stripe";
import {
  createSubscriptionHandler,
  dataPatch,
  getSubscriptionHandler,
  manageSubscriptionHandler,
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
