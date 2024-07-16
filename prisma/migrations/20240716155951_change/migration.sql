/*
  Warnings:

  - Changed the type of `shopId` on the `Printify` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Printify" DROP COLUMN "shopId",
ADD COLUMN     "shopId" INTEGER NOT NULL;
