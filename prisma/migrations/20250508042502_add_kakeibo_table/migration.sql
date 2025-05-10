/*
  Warnings:

  - Added the required column `auth_id` to the `Kakeibo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Kakeibo" ADD COLUMN     "auth_id" TEXT NOT NULL;
