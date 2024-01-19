-- CreateTable
CREATE TABLE "Inventory" (
    "id" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "purchases" JSONB NOT NULL DEFAULT '[]',
    "total_credits_purchased" INTEGER NOT NULL DEFAULT 0,
    "total_credits_spent" INTEGER NOT NULL DEFAULT 0,
    "credit_balance" INTEGER NOT NULL DEFAULT 500,

    CONSTRAINT "Inventory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Inventory_user_id_key" ON "Inventory"("user_id");

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
