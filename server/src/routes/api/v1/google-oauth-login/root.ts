import { FastifyPluginAsync, FastifySchema } from "fastify";
import { oauthLoginRedirectHandler } from "../../../../handlers/api/v1/google-oauth-login/get.handler";

const schema: FastifySchema = {
  querystring: {
    type: "object",
    required: ["code"],
    properties: {
      code: {
        type: "string",
      },
    },
  },
};

const root: FastifyPluginAsync = async (fastify, _): Promise<void> => {
  fastify.get("/", { schema: schema }, oauthLoginRedirectHandler);
};

export default root;
