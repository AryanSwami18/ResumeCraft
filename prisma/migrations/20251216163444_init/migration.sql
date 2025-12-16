-- CreateTable
CREATE TABLE "Resume" (
    "id" TEXT NOT NULL,
    "clerkUserId" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "personal" JSONB NOT NULL,
    "experience" JSONB NOT NULL,
    "education" JSONB NOT NULL,
    "skills" JSONB NOT NULL,
    "projects" JSONB NOT NULL,
    "certifications" JSONB,
    "hobbies" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Resume_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Resume_slug_key" ON "Resume"("slug");

-- CreateIndex
CREATE INDEX "Resume_clerkUserId_idx" ON "Resume"("clerkUserId");
