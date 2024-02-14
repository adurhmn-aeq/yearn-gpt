import { updateAgentHandler } from "./handlers/post.handler";
import { FastifyPluginAsync } from "fastify";
import {
  agentResponseHandler,
  // agentResponseHandler,
  createAgentHandler,
  createSessionHandler,
  getAgentByIdHandler,
  getAllBotsAndAgentsHandler,
  getSession,
  getSessionList,
} from "./handlers";
import {
  agentResponseSchema,
  createAgentSchema,
  createSessionSchema,
  getAgentByIdSchema,
  getSessionListSchema,
  getSessionSchema,
  updateAgentSchema,
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
  fastify.put(
    "/",
    {
      schema: updateAgentSchema,
      onRequest: [fastify.authenticate],
    },
    updateAgentHandler
  );
  // get session list
  fastify.get(
    "/session/list",
    {
      schema: getSessionListSchema,
      onRequest: [fastify.authenticate],
    },
    getSessionList
  );
  fastify.get(
    "/session",
    {
      schema: getSessionSchema,
      onRequest: [fastify.authenticate],
    },
    getSession
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
