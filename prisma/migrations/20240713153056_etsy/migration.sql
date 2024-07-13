/*
  Warnings:

  - A unique constraint covering the columns `[state]` on the table `EtsyOAuthState` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `EtsyOAuthState` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "EtsyOAuthState" ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "EtsyOAuthState_state_key" ON "EtsyOAuthState"("state");

-- CreateIndex
CREATE INDEX "idx_userId" ON "EtsyOAuthState"("userId");
