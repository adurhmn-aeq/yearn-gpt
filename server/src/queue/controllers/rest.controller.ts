import { QSource } from "../type";
import { DialoqbaseVectorStore } from "../../utils/store";
import { embeddings } from "../../utils/embeddings";
import { DialoqbaseRestApi } from "../../loader/rest";
import { PrismaClient } from "@prisma/client";
import { consumeDataSource, validateDataSource } from "../../utils/common";

export const restQueueController = async (
  source: QSource,
  prisma: PrismaClient
): Promise<[boolean, number]> => {
  let options = JSON.parse(JSON.stringify(source.options));

  const loader = new DialoqbaseRestApi({
    method: options.method,
    url: source.content!,
    body: options.body,
    headers: options.headers,
  });
  const docs = await loader.load();

  const embeddingInfo = await prisma.dialoqbaseModels.findFirst({
    where: {
      model_id: source.embedding,
      hide: false,
      deleted: false,
    },
  });

  if (!embeddingInfo) {
    throw new Error("Embedding not found. Please verify the embedding id");
  }

  const bot = await prisma.bot.findFirst({ where: { id: source.botId } });
  const [isValid, sourceChars] = validateDataSource(docs, bot);
  if (!isValid) return [false, sourceChars];

  await DialoqbaseVectorStore.fromDocuments(
    docs,
    embeddings(
      embeddingInfo.model_provider!.toLowerCase(),
      embeddingInfo.model_id,
      embeddingInfo?.config
    ),
    {
      botId: source.botId,
      sourceId: source.id,
    }
  );

  consumeDataSource(docs, prisma, source.botId);
  return [true, sourceChars];
};
