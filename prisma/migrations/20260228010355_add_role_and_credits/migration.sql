-- AlterTable
ALTER TABLE "SubTask" ADD COLUMN     "credits" INTEGER;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'client';
