/*
  Warnings:

  - Made the column `createdAt` on table `Board` required. This step will fail if there are existing NULL values in that column.
  - Made the column `imageFullUrl` on table `Board` required. This step will fail if there are existing NULL values in that column.
  - Made the column `imageId` on table `Board` required. This step will fail if there are existing NULL values in that column.
  - Made the column `imageLinkHTML` on table `Board` required. This step will fail if there are existing NULL values in that column.
  - Made the column `imageThumbUrl` on table `Board` required. This step will fail if there are existing NULL values in that column.
  - Made the column `imaheUserName` on table `Board` required. This step will fail if there are existing NULL values in that column.
  - Made the column `orgId` on table `Board` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updaedAt` on table `Board` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Board" ALTER COLUMN "createdAt" SET NOT NULL,
ALTER COLUMN "imageFullUrl" SET NOT NULL,
ALTER COLUMN "imageId" SET NOT NULL,
ALTER COLUMN "imageLinkHTML" SET NOT NULL,
ALTER COLUMN "imageThumbUrl" SET NOT NULL,
ALTER COLUMN "imaheUserName" SET NOT NULL,
ALTER COLUMN "orgId" SET NOT NULL,
ALTER COLUMN "updaedAt" SET NOT NULL;
