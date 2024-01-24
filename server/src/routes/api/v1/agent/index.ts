import { FastifyPluginAsync } from "fastify";
import {
  agentResponseHandler,
  // agentResponseHandler,
  createAgentHandler,
  createSessionHandler,
  getAgentByIdHandler,
  getAllBotsAndAgentsHandler,
} from "./handlers";
import {
  agentResponseSchema,
  createAgentSchema,
  createSessionSchema,
  getAgentByIdSchema,
} from "./schema";

const root: FastifyPluginAsync = async (fastify, _): Promise<void> => {
  fastify.post(
    "/",
    {
      schema: createAgentSchema,
      onRequest: [fastify.authenticate],
    },
    createAgentHandler
  );

  // get bot info
  fastify.get(
    "/:id",
    {
      schema: getAgentByIdSchema,
      onRequest: [fastify.authenticate],
    },
    getAgentByIdHandler
  );

  // get all bots
  fastify.get(
    "/with-bots",
    {
      onRequest: [fastify.authenticate],
    },
    getAllBotsAndAgentsHandler
  );

  fastify.post(
    "/session/response",
    {
      schema: agentResponseSchema,
    },
    agentResponseHandler
  );

  fastify.post(
    "/session",
    {
      schema: createSessionSchema,
    },
    createSessionHandler
  );
};

export default root;
