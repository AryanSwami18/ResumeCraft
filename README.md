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
- PostgreSQL 

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



