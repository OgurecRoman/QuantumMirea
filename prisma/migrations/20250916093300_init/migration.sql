/*
  Warnings:

  - Added the required column `jobs` to the `Configurations` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "JobsType" AS ENUM ('calculations', 'images', 'videos');

-- AlterTable
ALTER TABLE "Calculations" ALTER COLUMN "sentEmail" SET DEFAULT NULL,
ALTER COLUMN "errorText" SET DEFAULT NULL;

-- AlterTable
ALTER TABLE "Configurations" ADD COLUMN     "jobs" "JobsType" NOT NULL;

-- CreateTable
CREATE TABLE "Images" (
    "id" SERIAL NOT NULL,
    "type" "CalculationsType" NOT NULL,
    "status" "CalculationsStatus" NOT NULL,
    "src" TEXT DEFAULT NULL,
    "result" TEXT DEFAULT NULL,
    "metrics" JSONB NOT NULL,
    "confId" TEXT NOT NULL,
    "authorId" INTEGER NOT NULL,
    "sentEmail" BOOLEAN DEFAULT NULL,
    "errorText" TEXT DEFAULT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "startAt" TIMESTAMP(3) NOT NULL,
    "finishAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Videos" (
    "id" SERIAL NOT NULL,
    "type" "CalculationsType" NOT NULL,
    "status" "CalculationsStatus" NOT NULL,
    "src" TEXT DEFAULT NULL,
    "result" TEXT DEFAULT NULL,
    "metrics" JSONB NOT NULL,
    "confId" TEXT NOT NULL,
    "authorId" INTEGER NOT NULL,
    "sentEmail" BOOLEAN DEFAULT NULL,
    "errorText" TEXT DEFAULT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "startAt" TIMESTAMP(3) NOT NULL,
    "finishAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Videos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Images_authorId_idx" ON "Images"("authorId");

-- CreateIndex
CREATE INDEX "Videos_authorId_idx" ON "Videos"("authorId");

-- AddForeignKey
ALTER TABLE "Images" ADD CONSTRAINT "Images_confId_fkey" FOREIGN KEY ("confId") REFERENCES "Configurations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Images" ADD CONSTRAINT "Images_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Videos" ADD CONSTRAINT "Videos_confId_fkey" FOREIGN KEY ("confId") REFERENCES "Configurations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Videos" ADD CONSTRAINT "Videos_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
