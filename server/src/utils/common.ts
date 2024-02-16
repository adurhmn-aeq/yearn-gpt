import { Bot, PrismaClient } from "@prisma/client";
import { FastifyRequest } from "fastify";
import { Document } from "langchain/document";

export const getInventory = async (prisma: PrismaClient, user_id: number) => {
  let inventory = await prisma.inventory.findUnique({
    where: {
      user_id,
    },
  });

  if (!inventory) {
    inventory = await prisma.inventory.create({
      data: {
        user_id,
      },
    });
  }

  return inventory;
};

export const getSettings = (prisma: PrismaClient) => {
  const settings = prisma.dialoqbaseSettings.findFirst({
    where: {
      id: 1,
    },
  });

  if (!settings) {
    const defaultSettings = prisma.dialoqbaseSettings.create({
      data: {
        id: 1,
        allowUserToCreateBots: true,
        allowUserToRegister: false,
        noOfBotsPerUser: 10,
      },
    });

    return defaultSettings;
  }

  return settings;
};

export const validateDataSource = (
  docs: Document<Record<string, any>>[],
  bot: Bot | null
): [boolean, number] => {
  if (bot === null) throw new Error("Bot not found");

  const docLen = docs[0]?.pageContent?.length || 0;
  console.log({
    docLen,
    "bot.source_chars_remaining": bot.source_chars_remaining,
  });
  if (docLen <= bot.source_chars_remaining) return [true, docLen];
  return [false, docLen];
};

export const consumeDataSource = async (
  docs: Document<Record<string, any>>[],
  prisma: PrismaClient,
  botId: string
) => {
  const docLen = docs[0]?.pageContent?.length;
  await prisma.bot.update({
    where: { id: botId },
    data: {
      source_chars_remaining: {
        decrement: docLen,
      },
    },
  });
};

// reset source char limits before refreshing!
export const refreshAllBotSources = async (
  user_id: number,
  prisma: PrismaClient,
  request: FastifyRequest<any>
) => {
  const bots = await prisma.bot.findMany({ where: { user_id } });
  // console.log(`h27c: total bots => ${bots.length}`);
  for (let i = 0; i < bots.length; i++) {
    const bot = bots[i];

    const botSources = await prisma.botSource.findMany({
      where: {
        botId: bot.id,
        type: {
          notIn: ["crawl", "sitemap"],
        },
      },
    });
    // console.log(`h27c: bot ${i + 1} sources => ${botSources.length}`);

    for (let j = 0; j < botSources.length; j++) {
      const botSource = botSources[j];

      // console.log(`h27c: handling bot ${i + 1} source ${j + 1}`);

      await prisma.botSource.update({
        where: {
          id: botSource.id,
        },
        data: {
          isPending: true,
          status: "pending",
          disabled: false,
        },
      });

      await prisma.botDocument.deleteMany({
        where: {
          botId: bot.id,
          sourceId: botSource.id,
        },
      });

      await request.server.queue.add([
        {
          ...botSource,
          embedding: bot.embedding,
        },
      ]);

      console.log(`h27c: handled bot ${i + 1} source ${j + 1}`);
    }
  }
};
