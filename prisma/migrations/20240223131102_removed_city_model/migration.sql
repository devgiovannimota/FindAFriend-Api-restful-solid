/*
  Warnings:

  - You are about to drop the column `cityId` on the `Pets` table. All the data in the column will be lost.
  - You are about to drop the `Citys` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `city` to the `Orgs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `Orgs` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Pets" DROP CONSTRAINT "Pets_cityId_fkey";

-- AlterTable
ALTER TABLE "Orgs" ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Pets" DROP COLUMN "cityId";

-- DropTable
DROP TABLE "Citys";
