/*
  Warnings:

  - You are about to drop the `City` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Org` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Pets" DROP CONSTRAINT "Pets_cityId_fkey";

-- DropForeignKey
ALTER TABLE "Pets" DROP CONSTRAINT "Pets_orgId_fkey";

-- DropTable
DROP TABLE "City";

-- DropTable
DROP TABLE "Org";

-- CreateTable
CREATE TABLE "Citys" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "state" TEXT NOT NULL,

    CONSTRAINT "Citys_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Orgs" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "addres" TEXT NOT NULL,
    "whatsapp" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Orgs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Orgs_email_key" ON "Orgs"("email");

-- AddForeignKey
ALTER TABLE "Pets" ADD CONSTRAINT "Pets_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "Citys"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pets" ADD CONSTRAINT "Pets_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "Orgs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
