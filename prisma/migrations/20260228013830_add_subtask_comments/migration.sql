-- CreateTable
CREATE TABLE "SubTaskComment" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "subtaskId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SubTaskComment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "SubTaskComment_subtaskId_idx" ON "SubTaskComment"("subtaskId");

-- AddForeignKey
ALTER TABLE "SubTaskComment" ADD CONSTRAINT "SubTaskComment_subtaskId_fkey" FOREIGN KEY ("subtaskId") REFERENCES "SubTask"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubTaskComment" ADD CONSTRAINT "SubTaskComment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
