import { FastifyReply, FastifyRequest } from "fastify";
import { UpdateBotById } from "./types";
import {
  apiKeyValidaton,
  apiKeyValidatonMessage,
} from "../../../../../utils/validate";
import { BotLimit, PlanLookup, PlanStatus } from "../../../../../utils/stripe";

export const updateBotByIdHandler = async (
  request: FastifyRequest<UpdateBotById>,
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

  const modelInfo = await prisma.dialoqbaseModels.findFirst({
    where: {
      model_id: request.body.model,
      hide: false,
      deleted: false,
    },
  });

  if (!modelInfo) {
    return reply.status(400).send({
      message: "Model not found",
    });
  }

  const isAPIKeyAddedForProvider = apiKeyValidaton(
    `${modelInfo.model_provider}`.toLocaleLowerCase()
  );

  if (!isAPIKeyAddedForProvider) {
    return reply.status(400).send({
      message: apiKeyValidatonMessage(modelInfo.model_provider || ""),
    });
  }

  if (!modelInfo.stream_available && request.body.streaming) {
    return reply.status(400).send({
      message: "Streaming is not supported for this model",
    });
  }

  const stripe = await prisma.stripe.findFirst({
    where: { user_id: request.user.user_id },
  });

  if (stripe) {
    const botsCount = await prisma.bot.count({
      where: { user_id: request.user.user_id, disabled: false },
    });

    if (
      !request.body.disabled &&
      (stripe.plan_status === PlanStatus.PAST_DUE ||
        botsCount === BotLimit[stripe.active_plan as PlanLookup])
    ) {
      return reply.status(400).send({
        message:
          "Bot enable permission revoked. Please check if you are a subscriber.",
      });
    }
  }

  await prisma.bot.update({
    where: {
      id: bot.id,
    },
    data: {
      ...request.body,
      provider: modelInfo.model_provider || "",
    },
  });

  return {
    id: bot.id,
  };
};
