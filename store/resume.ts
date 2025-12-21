import { create } from "zustand"

type ResumeSummary = {
    id: string
    title: string
    createdAt: string
}

type ResumeStore = {
    resumes: ResumeSummary[]
    isLoading: boolean
    error: string | null

    setResumes: (resumes: ResumeSummary[]) => void
    addResume: (resume: ResumeSummary) => void
    removeResume: (id: string) => void
    updateTitle: (id: string, title: string) => void
    setLoading: (value: boolean) => void
    setError: (error: string | null) => void
    reset: () => void
}

export const useResumeStore = create<ResumeStore>((set) => ({
    resumes: [],
    isLoading: false,
    error: null,

    setResumes: (resumes) =>
        set({
            resumes,
            isLoading: false,
            error: null,
        }),

    addResume: (resume) =>
        set((state) => ({
            resumes: [resume, ...state.resumes],
        })),

    removeResume: (id) =>
        set((state) => ({
            resumes: state.resumes.filter((r) => r.id !== id),
        })),

    updateTitle: (id, title) =>
        set((state) => ({
            resumes: state.resumes.map((r) =>
                r.id === id ? { ...r, title } : r
            ),
        })),

    setLoading: (value) => set({ isLoading: value }),
    setError: (error) => set({ error }),

    reset: () =>
        set({
            resumes: [],
            isLoading: false,
            error: null,
        }),
}))
