-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "systemAuth" TEXT NOT NULL,
    "idAuth" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CustomGate" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "complexOneOne" DOUBLE PRECISION NOT NULL,
    "complexOneTwo" DOUBLE PRECISION NOT NULL,
    "complexTwoOne" DOUBLE PRECISION NOT NULL,
    "complexTwoTwo" DOUBLE PRECISION NOT NULL,
    "complexThreeOne" DOUBLE PRECISION NOT NULL,
    "complexThreeTwo" DOUBLE PRECISION NOT NULL,
    "complexFourOne" DOUBLE PRECISION NOT NULL,
    "complexFourTwo" DOUBLE PRECISION NOT NULL,
    "authorId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CustomGate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CustomAlgorithm" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "qubit" INTEGER NOT NULL,
    "column" INTEGER NOT NULL,
    "data" JSONB NOT NULL,
    "authorId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CustomAlgorithm_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "User_systemAuth_idx" ON "User"("systemAuth");

-- CreateIndex
CREATE INDEX "User_idAuth_idx" ON "User"("idAuth");

-- CreateIndex
CREATE UNIQUE INDEX "User_systemAuth_idAuth_key" ON "User"("systemAuth", "idAuth");

-- CreateIndex
CREATE INDEX "CustomGate_authorId_idx" ON "CustomGate"("authorId");

-- CreateIndex
CREATE INDEX "CustomAlgorithm_authorId_idx" ON "CustomAlgorithm"("authorId");

-- AddForeignKey
ALTER TABLE "CustomGate" ADD CONSTRAINT "CustomGate_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomAlgorithm" ADD CONSTRAINT "CustomAlgorithm_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
