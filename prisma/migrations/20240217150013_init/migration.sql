/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `persons` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `persons` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "persons" ADD COLUMN     "email" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "persons_email_key" ON "persons"("email");
