-- DropTable
DROP TABLE IF EXISTS "HomeContent";

-- CreateTable
CREATE TABLE "SiteContent" (
    "id" TEXT NOT NULL,
    "heroHeadline" TEXT NOT NULL DEFAULT 'Where Craft\nMeets Legacy.',
    "heroSubheadline" TEXT NOT NULL DEFAULT 'Architecture. Luxury. Visual Storytelling.',
    "heroCta1" TEXT NOT NULL DEFAULT 'View Portfolio',
    "heroCta2" TEXT NOT NULL DEFAULT 'Book a Shoot',
    "stats" JSONB NOT NULL DEFAULT '{}',
    "partners" JSONB NOT NULL DEFAULT '[]',
    "socialProofEyebrow" TEXT NOT NULL DEFAULT 'Trusted worldwide',
    "socialProofHeadline" TEXT NOT NULL DEFAULT 'Receipts, not promises.',
    "faq" JSONB NOT NULL DEFAULT '[]',
    "packages" JSONB NOT NULL DEFAULT '[]',
    "footerTagline" TEXT NOT NULL DEFAULT '',
    "footerPhone" TEXT NOT NULL DEFAULT '',
    "footerEmail" TEXT NOT NULL DEFAULT '',
    "footerCities" TEXT NOT NULL DEFAULT '',
    "contactHeadline" TEXT NOT NULL DEFAULT 'Let''s make something worth keeping.',
    "contactSubheadline" TEXT NOT NULL DEFAULT 'Tell us about your project and we''ll get back to you within 24 hours.',
    "socialDock" JSONB NOT NULL DEFAULT '{}',
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SiteContent_pkey" PRIMARY KEY ("id")
);
