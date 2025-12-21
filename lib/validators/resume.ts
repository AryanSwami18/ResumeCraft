import { z } from "zod"


/**
 * PATCH /api/resumes/:id
 * All fields optional (partial update)
 */


export const ResumeUpdateSchema = z
    .object({
        title: z.string().min(1).max(150).optional(),

        personal: z.any().optional(),
        experience: z.any().optional(),
        education: z.any().optional(),
        skills: z.any().optional(),
        projects: z.any().optional(),
        certifications: z.any().optional(),
        hobbies: z.any().optional(),

        published: z.boolean().optional(),
    })
    .strict()