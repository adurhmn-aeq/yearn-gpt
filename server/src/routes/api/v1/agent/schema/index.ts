import { FastifySchema } from "fastify";

export const createAgentSchema: FastifySchema = {
  body: {
    type: "object",
    properties: {
      name: {
        type: "string",
      },
      initMsg: {
        type: "string",
      },
      prompt: {
        type: "string",
      },
      model: {
        type: "string",
      },
    },
  },
};

export const getAgentByIdSchema: FastifySchema = {
  params: {
    type: "object",
    required: ["id"],
    properties: {
      id: {
        type: "string",
      },
    },
  },
};

export const agentResponseSchema: FastifySchema = {
  body: {
    type: "object",
    properties: {
      isInitReq: {
        type: "boolean",
      },
      response: {
        type: "string",
      },
      session: {
        type: "string",
      },
    },
  },
};

export const createSessionSchema: FastifySchema = {
  body: {
    type: "object",
    properties: {
      name: {
        type: "string",
      },
      phone: {
        type: "string",
      },
      email: {
        type: "string",
      },
      agentId: {
        type: "string",
      },
    },
  },
};
