import { QSource } from "../type";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { DialoqbaseVectorStore } from "../../utils/store";
import { embeddings } from "../../utils/embeddings";
import * as fs from "fs/promises";
import axios from "axios";
import { DialoqbasePDFLoader } from "../../loader/pdf";
import { DialoqbaseWebLoader } from "../../loader/web";
import { CheerioWebBaseLoader } from "langchain/document_loaders/web/cheerio";
import { PrismaClient } from "@prisma/client";
import { consumeDataSource, validateDataSource } from "../../utils/common";

export const websiteQueueController = async (
  source: QSource,
  prisma: PrismaClient
): Promise<[boolean, number]> => {
  // check if url is html or pdf or other
  // if html, use cheerio

  const response = await axios.get(source.content!);

  const type = response.headers["content-type"];

  console.log("website type is", type);

  const bot = await prisma.bot.findFirst({ where: { id: source.botId } });

  let isValid: boolean = true;
  let sourceChars: number = 0;

  if (type.includes("application/pdf")) {
    const response = await axios.get(source.content!, {
      responseType: "arraybuffer",
    });

    const buffer = Buffer.from(response.data, "binary");

    await fs.writeFile(`./uploads/${source.id}.pdf`, buffer);

    const loader = new DialoqbasePDFLoader(`./uploads/${source.id}.pdf`);
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

    [isValid, sourceChars] = validateDataSource(chunks, bot);
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
  } else {
    let docs: any[] = [];
    if (process.env.USE_LEGACY_WEB_LOADER === "true") {
      const loader = new CheerioWebBaseLoader(source.content!);
      docs = await loader.load();
    } else {
      const loader = new DialoqbaseWebLoader({
        url: source.content!,
      });
      docs = await loader.load();
    }

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
  }
};
