/*
  Warnings:

  - You are about to drop the column `contactInfo` on the `Schools` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Schools" DROP COLUMN "contactInfo",
ALTER COLUMN "status" SET DEFAULT 'APPROVED';
