/*
  Warnings:

  - Added the required column `shopId` to the `Printify` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Printify" ADD COLUMN     "shopId" TEXT NOT NULL;
