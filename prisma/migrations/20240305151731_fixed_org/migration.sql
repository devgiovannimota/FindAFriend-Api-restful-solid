/*
  Warnings:

  - Added the required column `latitude` to the `Orgs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `Orgs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Orgs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Orgs" ADD COLUMN     "latitude" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "longitude" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL;
