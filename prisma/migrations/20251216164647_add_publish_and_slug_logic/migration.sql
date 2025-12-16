-- AlterTable
ALTER TABLE "Resume" ADD COLUMN     "published" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "slug" DROP NOT NULL,
ALTER COLUMN "title" SET DEFAULT 'Untitled Resume',
ALTER COLUMN "personal" DROP NOT NULL,
ALTER COLUMN "experience" DROP NOT NULL,
ALTER COLUMN "education" DROP NOT NULL,
ALTER COLUMN "skills" DROP NOT NULL,
ALTER COLUMN "projects" DROP NOT NULL;

-- CreateIndex
CREATE INDEX "Resume_published_idx" ON "Resume"("published");
