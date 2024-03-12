/*
  Warnings:

  - Added the required column `role` to the `Orgs` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('MEMBMER', 'ADMIN');

-- AlterTable
ALTER TABLE "Orgs" ADD COLUMN     "role" "Role" NOT NULL;
