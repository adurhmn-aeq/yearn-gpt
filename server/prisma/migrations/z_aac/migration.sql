-- CreateTable
CREATE TABLE "Stripe" (
    "id" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "active_plan" TEXT NOT NULL DEFAULT '',
    "subscription_id" TEXT NOT NULL DEFAULT '',
    "line_item_id" TEXT NOT NULL DEFAULT '',
    "plan_status" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "Stripe_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Stripe_customerId_key" ON "Stripe"("customerId");

-- CreateIndex
CREATE UNIQUE INDEX "Stripe_user_id_key" ON "Stripe"("user_id");

-- AddForeignKey
ALTER TABLE "Stripe" ADD CONSTRAINT "Stripe_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
