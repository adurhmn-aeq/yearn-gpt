import { FastifyReply, FastifyRequest } from "fastify";
import {
  CreateAgentRequest,
  AgentResponseRequest,
  CreateSessionRequest,
} from "./types";
import { getInventory } from "../../../../../utils/common";
import { CreditsNeeded } from "../../../../../utils/credits";
import {
  apiKeyValidaton,
  apiKeyValidatonMessage,
} from "../../../../../utils/validate";
import { createId } from "@paralleldrive/cuid2";
import { chatModelProvider } from "../../../../../utils/models";
import {
  createAgentChain,
  // createChain,
} from "../../../../../chain";

export const createAgentHandler = async (
  request: FastifyRequest<CreateAgentRequest>,
  reply: FastifyReply
) => {
  const { name, initMsg, prompt, model } = request.body;

  const prisma = request.server.prisma;

  const inventory = await getInventory(prisma, request.user.user_id);
  if (inventory.credit_balance < CreditsNeeded.AGENT_CREATE) {
    return reply.status(400).send({
      message: `Not enough credits. Credits Remaining: ${inventory.credit_balance}. Credits Needed: ${CreditsNeeded.AGENT_CREATE}`,
    });
  }

  const modelInfo = await prisma.dialoqbaseModels.findFirst({
    where: {
      model_id: model,
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
    `${modelInfo.model_provider}`.toLowerCase()
  );

  if (!isAPIKeyAddedForProvider) {
    return reply.status(400).send({
      message: apiKeyValidatonMessage(modelInfo.model_provider || ""),
    });
  }

  const agent = await prisma.agent.create({
    data: {
      name,
      prompt,
      initMsg,
      model,
      // provider: modelInfo.model_provider || "",
      user_id: request.user.user_id,
    },
  });

  // consume credits (todo: consume based on prompt weight)
  await prisma.inventory.update({
    where: { user_id: request.user.user_id },
    data: {
      credit_balance: { decrement: CreditsNeeded.AGENT_CREATE },
    },
  });

  return {
    id: agent.id,
  };
};

export const createSessionHandler = async (
  request: FastifyRequest<CreateSessionRequest>,
  reply: FastifyReply
) => {
  const { name, email, phone, agentId } = request.body;

  const prisma = request.server.prisma;

  const agent = await prisma.agent.findFirst({
    where: {
      id: agentId,
    },
  });

  if (!agent) {
    return reply.status(400).send({
      message: "Agent not found",
    });
  }

  const session = await prisma.session.create({
    data: {
      name,
      email,
      phone,
      agent_id: agentId,
      user_id: agent.user_id,
      messages: [],
    },
  });

  return {
    id: session.id,
  };
};

export const agentResponseHandler = async (
  request: FastifyRequest<AgentResponseRequest>,
  reply: FastifyReply
) => {
  const { isInitReq, response, session } = request.body;
  const prisma = request.server.prisma;

  const sessionInfo = await prisma.session.findFirst({
    where: {
      id: session,
    },
  });
  if (!sessionInfo) {
    return reply.status(400).send({
      message: `Session not found`,
    });
  }

  const agentInfo = await prisma.agent.findFirst({
    where: {
      id: sessionInfo.agent_id || "",
    },
  });

  if (!agentInfo) {
    return reply.status(404).send({
      message: `Agent not found`,
    });
  }

  const modelInfo = await prisma.dialoqbaseModels.findFirst({
    where: {
      model_id: agentInfo.model,
    },
  });

  if (!modelInfo) {
    return reply.status(404).send({
      message: `Model not found`,
    });
  }

  // generate agent message
  let agentResponse = "";
  if (isInitReq) {
    agentResponse = agentInfo.initMsg;
  } else {
    const sanitizedQuestion = response.trim().replaceAll("\n", " ");
    const modelConfig: any = (modelInfo.config as {}) || {};
    // if (modelInfo.model_provider?.toLowerCase() === "openai") {
    //   if (modelInfo.bot_model_api_key && modelInfo.bot_model_api_key.trim() !== "") {
    //     modelConfig.configuration = {
    //       apiKey: modelInfo.bot_model_api_key,
    //     };
    //   }
    // }

    const model = chatModelProvider(
      modelInfo.model_provider || "",
      agentInfo.model,
      agentInfo.temperature,
      {
        ...modelConfig,
      }
    );

    const chain = createAgentChain({
      llm: model,
      question_llm: model,
      response_template: `You are conducting an interactive session. The goal of this session is to collect information from user. Use the following guidelines for understanding what information to collect: "${agentInfo.prompt}". Keep your responses succinct. Your responses MUST end with a relavant question. When all the necessary information is collected, Ask a final confirmation to user if the session can be ended. On user confirmation, end the session and return "[[END]]" along with your final response, this is very important.`,
    });

    agentResponse = await chain.invoke({
      question: sanitizedQuestion,
      chat_history: sessionInfo.messages?.map((message: any) => {
        if (message.isBot) return { ai: message.message };
        else return { human: message.message };
      }),
    });
  }

  // update messages
  if (!isInitReq) {
    const userMessage = {
      id: createId(),
      isBot: false,
      message: response,
      createdAt: new Date().getTime(),
    };
    await prisma.session.update({
      where: { id: session },
      data: { messages: { push: userMessage } },
    });
  }
  const agentMessage = {
    id: createId(),
    isBot: true,
    message: agentResponse,
    createdAt: new Date().getTime(),
  };
  await prisma.session.update({
    where: { id: session },
    data: { messages: { push: agentMessage } },
  });

  return { response: agentMessage };
};
