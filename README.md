# ResumeCraft 📝✨  
A modern, full-stack resume builder with autosave editing and ATS-friendly PDF export.

ResumeCraft lets users create multiple resumes, edit them in a smooth dashboard experience, and export clean professional PDFs. Built with **Next.js App Router**, **Clerk Authentication**, **Prisma**, **Zustand**, and **React-PDF**.

---

##  Features

-  **Authentication (Clerk)**
  - Email code login
  - Google & GitHub social login

-  **Resume Dashboard**
  - Create multiple resumes
  - View saved resumes with title + created date
  - Edit & manage resumes anytime

-  **Resume Editor**
  - Clean “boxed layout” UI (1200px layout system)
  - JSON-based section editing for flexibility
  - Autosave with PATCH updates (only changed fields are saved)

-  **Autosave System**
  - Uses **current vs lastSaved** diff approach
  - Debounced saving to prevent API spam
  - Sync indicator (“Saving…” / “Synced”)

-  **Professional PDF Export**
  - Built using **@react-pdf/renderer**
  - Clickable links inside PDF:
    - Email → `mailto:`
    - Phone → `tel:`
    - Portfolio/LinkedIn/GitHub → `https://`

-  **ATS-Friendly Templates**
  - Clean structure and spacing
  - Recruiter-readable formatting

---

##  Tech Stack

**Frontend**
- Next.js (App Router)
- React + TypeScript
- Tailwind CSS
- shadcn/ui

**State Management**
- Zustand (resume list + editor store)

**Backend**
- Next.js API Routes (Route Handlers)
- Prisma ORM

**Database**
- PostgreSQL (recommended) / MySQL supported via Prisma

**Auth**
- Clerk

**PDF**
- @react-pdf/renderer

---

##  Project Structure (Important Parts)

```txt
src/
  app/
    dashboard/
      resumes/
      resume/[resumeId]/edit/
    api/
      resumes/
        [resumeId]/
        create-resume/
        get-user-resumes/
  components/
    dashboard/
      resumeCard.tsx
    editor/
      PersonalSection.tsx
      SkillsSection.tsx
      ExperienceSection.tsx
      EducationSection.tsx
      ProjectsSection.tsx
      CertificationsSection.tsx
      HobbiesSection.tsx
    pdf/
      ResumeDocument.tsx
  store/
    resume.ts
    editResumeStore.ts
  lib/
    prisma.ts
    auth.ts
    utils/
      diffResume.ts


This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
