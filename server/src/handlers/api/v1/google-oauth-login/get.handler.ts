import { FastifyReply, FastifyRequest } from "fastify";

export interface PropType {
  Querystring: {
    code: string;
  };
}

export const oauthLoginRedirectHandler = async (
  request: FastifyRequest<PropType>,
  reply: FastifyReply
) => {
  // reply.redirect(303, process.env.BACKEND_HOST_URL + "/#/login?code=" + code);
  reply.redirect(
    303,
    process.env.REAL_LOGIN_URL_CLIENT + "?code=" + request.query.code
  );
};
