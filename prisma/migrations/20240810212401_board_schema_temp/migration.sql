-- AlterTable
ALTER TABLE "Board" ADD COLUMN     "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "imageFullUrl" TEXT,
ADD COLUMN     "imageId" TEXT,
ADD COLUMN     "imageLinkHTML" TEXT,
ADD COLUMN     "imageThumbUrl" TEXT,
ADD COLUMN     "imaheUserName" TEXT,
ADD COLUMN     "orgId" TEXT,
ADD COLUMN     "updaedAt" TIMESTAMP(3);
