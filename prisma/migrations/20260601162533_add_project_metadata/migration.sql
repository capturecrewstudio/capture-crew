-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "client" TEXT,
ADD COLUMN     "location" TEXT,
ADD COLUMN     "narrative" TEXT,
ADD COLUMN     "services" JSONB NOT NULL DEFAULT '[]',
ADD COLUMN     "summary" TEXT,
ADD COLUMN     "year" TEXT;

-- AlterTable
ALTER TABLE "SiteContent" ALTER COLUMN "heroHeadline" SET DEFAULT 'Where Craft
Meets Legacy',
ALTER COLUMN "socialProofEyebrow" SET DEFAULT 'Our Clients',
ALTER COLUMN "socialProofHeadline" SET DEFAULT 'Brands That Trust Our Lens';

-- CreateIndex
CREATE INDEX "Media_folder_idx" ON "Media"("folder");

-- CreateIndex
CREATE INDEX "Media_createdAt_idx" ON "Media"("createdAt" DESC);
