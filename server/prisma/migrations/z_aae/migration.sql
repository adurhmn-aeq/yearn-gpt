-- AlterTable
ALTER TABLE "Bot" ADD COLUMN     "source_chars_remaining" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "BotSource" ADD COLUMN     "disabled" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "source_chars" INTEGER NOT NULL DEFAULT 0;
