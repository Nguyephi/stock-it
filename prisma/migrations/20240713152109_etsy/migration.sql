-- CreateTable
CREATE TABLE "EtsyOAuthState" (
    "id" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "codeVerifier" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EtsyOAuthState_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "idx_state" ON "EtsyOAuthState"("state");
