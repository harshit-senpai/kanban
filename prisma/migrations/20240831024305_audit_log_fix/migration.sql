/*
  Warnings:

  - Added the required column `entityId` to the `AuditLog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `entityTitle` to the `AuditLog` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `action` on the `AuditLog` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "AuditLog" ADD COLUMN     "entityId" TEXT NOT NULL,
ADD COLUMN     "entityTitle" TEXT NOT NULL,
DROP COLUMN "action",
ADD COLUMN     "action" "ACTION" NOT NULL;
