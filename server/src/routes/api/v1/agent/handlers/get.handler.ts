import { FastifyReply, FastifyRequest } from "fastify";
import { GetAgentRequestById, GetSession, GetSessionListById } from "./types";

export const getAllBotsAndAgentsHandler = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const prisma = request.server.prisma;

  const bots = await prisma.bot.findMany({
    where: {
      user_id: request.user.user_id,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      source: {
        distinct: ["type"],
        select: {
          type: true,
        },
      },
    },
  });

  const agents = await prisma.agent.findMany({
    where: {
      user_id: request.user.user_id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const combined = [
    ...bots.map((x) => ({ bot: x, createdAt: x.createdAt })),
    ...agents.map((x) => ({ agent: x, createdAt: x.createdAt })),
  ].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return combined;
};

export const getAgentByIdHandler = async (
  request: FastifyRequest<GetAgentRequestById>,
  reply: FastifyReply
) => {
  const prisma = request.server.prisma;
  const id = request.params.id;

  const agent = await prisma.agent.findFirst({
    where: {
      id,
      user_id: request.user.user_id,
    },
  });

  if (!agent) {
    return reply.status(404).send({
      message: "Agent not found",
    });
  }

  const sessions = await prisma.session.findMany({
    where: {
      agent_id: id,
      user_id: request.user.user_id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
    },
  });

  return { ...agent, sessions: sessions || [] };
};

export const getSessionList = async (
  request: FastifyRequest<GetSessionListById>,
  reply: FastifyReply
) => {
  const prisma = request.server.prisma;
  const agentId = request.params.agentId;

  const sessions = await prisma.session.findMany({
    where: {
      agent_id: agentId,
      user_id: request.user.user_id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
    },
  });

  if (!sessions) {
    return reply.status(404).send({
      message: "Session List not found",
    });
  }

  return sessions;
};

export const getSession = async (
  request: FastifyRequest<GetSession>,
  reply: FastifyReply
) => {
  const prisma = request.server.prisma;
  const { agentId, sessionId } = request.query;

  const session = await prisma.session.findFirst({
    where: {
      id: sessionId,
      agent_id: agentId,
      user_id: request.user.user_id,
    },
  });

  if (!session) {
    return reply.status(404).send({
      message: "Session not found",
    });
  }

  return session;
};
