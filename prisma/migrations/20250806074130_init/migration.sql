-- CreateTable
CREATE TABLE "CustomCompositeGate" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "gates" JSONB NOT NULL,
    "authorId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CustomCompositeGate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "CustomCompositeGate_authorId_idx" ON "CustomCompositeGate"("authorId");

-- AddForeignKey
ALTER TABLE "CustomCompositeGate" ADD CONSTRAINT "CustomCompositeGate_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
