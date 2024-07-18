-- CreateTable
CREATE TABLE "Etsy" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "storeData" JSONB,

    CONSTRAINT "Etsy_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Etsy_userId_key" ON "Etsy"("userId");

-- AddForeignKey
ALTER TABLE "Etsy" ADD CONSTRAINT "Etsy_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
