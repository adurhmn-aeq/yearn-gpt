import { FastifyReply, FastifyRequest } from "fastify";

import { GetBotRequestById } from "./types";
import { PlanLookup, SourceCharsPerBot } from "../../../../../utils/stripe";

export const getBotByIdEmbeddingsHandler = async (
  request: FastifyRequest<GetBotRequestById>,
  reply: FastifyReply
) => {
  const prisma = request.server.prisma;
  const id = request.params.id;

  const bot = await prisma.bot.findFirst({
    where: {
      id,
      user_id: request.user.user_id,
    },
  });

  if (!bot) {
    return reply.status(404).send({
      message: "Bot not found",
    });
  }

  const source = await prisma.botSource.count({
    where: {
      botId: id,
      isPending: true,
    },
  });

  return {
    inProgress: source > 0,
    public_id: bot.publicId,
  };
};

export const getBotByIdAllSourcesHandler = async (
  request: FastifyRequest<GetBotRequestById>,
  reply: FastifyReply
) => {
  const prisma = request.server.prisma;
  const id = request.params.id;

  const bot = await prisma.bot.findFirst({
    where: {
      id,
      user_id: request.user.user_id,
    },
  });

  const stripe = await prisma.stripe.findFirst({
    where: {
      user_id: request.user.user_id,
    },
  });

  if (!bot) {
    return reply.status(404).send({
      message: "Bot not found",
    });
  }

  const sources = await prisma.botSource.findMany({
    where: {
      botId: id,
      type: {
        notIn: ["crawl", "sitemap"],
      },
    },
  });

  return {
    sources,
    totalSourceChars: SourceCharsPerBot[stripe?.active_plan as PlanLookup] || 0,
    sourceCharsUsed: sources.reduce(
      (acc, cur) =>
        acc + (cur.disabled || cur.isPending ? 0 : cur.source_chars),
      0
    ),
  };
};

export const getBotByIdHandler = async (
  request: FastifyRequest<GetBotRequestById>,
  reply: FastifyReply
) => {
  const prisma = request.server.prisma;
  const id = request.params.id;

  const bot = await prisma.bot.findFirst({
    where: {
      id,
      user_id: request.user.user_id,
    },
  });

  if (!bot) {
    return reply.status(404).send({
      message: "Bot not found",
    });
  }
  return {
    data: bot,
  };
};

export const getAllBotsHandler = async (
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

  return bots;
};

export const getCreateBotConfigHandler = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const prisma = request.server.prisma;
  const models = await prisma.dialoqbaseModels.findMany({
    where: {
      hide: false,
      deleted: false,
    },
  });

  const chatModel = models
    .filter((model) => model.model_type !== "embedding")
    .map((model) => {
      return {
        label: model.name || model.model_id,
        value: model.model_id,
        stream: model.stream_available,
      };
    });

  const embeddingModel = models
    .filter((model) => model.model_type === "embedding")
    .map((model) => {
      return {
        label: `${model.name || model.model_id} ${
          model.model_id === "dialoqbase_eb_dialoqbase-ollama"
            ? "(Deprecated)"
            : ""
        }`,
        value: model.model_id,
        disabled: model.model_id === "dialoqbase_eb_dialoqbase-ollama",
      };
    });

  return {
    chatModel,
    embeddingModel,
  };
};

export const getBotByIdSettingsHandler = async (
  request: FastifyRequest<GetBotRequestById>,
  reply: FastifyReply
) => {
  const prisma = request.server.prisma;
  const id = request.params.id;

  const bot = await prisma.bot.findFirst({
    where: {
      id,
      user_id: request.user.user_id,
    },
  });

  const models = await prisma.dialoqbaseModels.findMany({
    where: {
      hide: false,
      deleted: false,
    },
  });

  const chatModel = models
    .filter((model) => model.model_type !== "embedding")
    .map((model) => {
      return {
        label: model.name || model.model_id,
        value: model.model_id,
        stream: model.stream_available,
      };
    });

  const embeddingModel = models
    .filter((model) => model.model_type === "embedding")
    .map((model) => {
      return {
        label: `${model.name || model.model_id} ${
          model.model_id === "dialoqbase_eb_dialoqbase-ollama"
            ? "(Deprecated)"
            : ""
        }`,
        value: model.model_id,
        disabled: model.model_id === "dialoqbase_eb_dialoqbase-ollama",
      };
    });

  if (!bot) {
    return reply.status(404).send({
      message: "Bot not found",
    });
  }
  return {
    data: bot,
    chatModel,
    embeddingModel,
  };
};
