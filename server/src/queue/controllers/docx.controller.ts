// import { DocxLoader } from "langchain/document_loaders/fs/docx";
import { QSource } from "../type";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { DialoqbaseVectorStore } from "../../utils/store";
import { embeddings } from "../../utils/embeddings";
import { DialoqbaseDocxLoader } from "../../loader/docx";
import { PrismaClient } from "@prisma/client";
import { consumeDataSource, validateDataSource } from "../../utils/common";

export const DocxQueueController = async (
  source: QSource,
  prisma: PrismaClient
): Promise<[boolean, number]> => {
  console.log("loading docx");

  const location = source.location!;
  const loader = new DialoqbaseDocxLoader(location);
  const docs = await loader.load();

  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });
  const chunks = await textSplitter.splitDocuments(docs);

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
  const [isValid, sourceChars] = validateDataSource(chunks, bot);
  if (!isValid) return [false, sourceChars];

  await DialoqbaseVectorStore.fromDocuments(
    chunks,
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

  consumeDataSource(chunks, prisma, source.botId);
  return [true, sourceChars];
};
