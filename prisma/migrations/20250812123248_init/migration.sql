-- CreateEnum
CREATE TYPE "ComputerType" AS ENUM ('virtual_machine', 'physical_machine', 'quantum_computer');

-- CreateEnum
CREATE TYPE "CalculationsType" AS ENUM ('schema', 'code', 'image');

-- CreateEnum
CREATE TYPE "CalculationsStatus" AS ENUM ('queued', 'calculated', 'success', 'error');

-- CreateTable
CREATE TABLE "Configurations" (
    "id" TEXT NOT NULL,
    "type" "ComputerType" NOT NULL,
    "works" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Configurations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Calculations" (
    "id" SERIAL NOT NULL,
    "type" "CalculationsType" NOT NULL,
    "status" "CalculationsStatus" NOT NULL,
    "src" JSONB NOT NULL,
    "result" JSONB NOT NULL,
    "metrics" JSONB NOT NULL,
    "confId" TEXT NOT NULL,
    "authorId" INTEGER NOT NULL,
    "sentEmail" BOOLEAN DEFAULT NULL,
    "errorText" TEXT DEFAULT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "startAt" TIMESTAMP(3) NOT NULL,
    "finishAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Calculations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Calculations_authorId_idx" ON "Calculations"("authorId");

-- AddForeignKey
ALTER TABLE "Calculations" ADD CONSTRAINT "Calculations_confId_fkey" FOREIGN KEY ("confId") REFERENCES "Configurations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Calculations" ADD CONSTRAINT "Calculations_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
