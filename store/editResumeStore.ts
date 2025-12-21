import { create } from "zustand"

type Resume = {
  id: string
  title: string
  personal?: any
  experience?: any
  education?: any
  skills?: any
  projects?: any
  certifications?: any
  hobbies?: any
  published?: boolean
}

type ResumeEditorStore = {
  // Core data
  current: Resume | null
  lastSaved: Resume | null

  // State flags
  isSaving: boolean
  saveError: string | null
  isInitialized: boolean

  // Actions
  initialize: (resume: Resume) => void
  updateField: (key: keyof Resume, value: any) => void
  replaceSection: (key: keyof Resume, value: any) => void
  markSaved: () => void
  setSaving: (value: boolean) => void
  setError: (error: string | null) => void
  reset: () => void
}

export const useResumeEditorStore = create<ResumeEditorStore>((set, get) => ({
  current: null,
  lastSaved: null,

  isSaving: false,
  saveError: null,
  isInitialized: false,

  // Called once after fetching resume
  initialize: (resume) =>
    set({
      current: structuredClone(resume),
      lastSaved: structuredClone(resume),
      isInitialized: true,
      saveError: null,
    }),

  // For simple fields like title
  updateField: (key, value) =>
    set((state) => ({
      current: state.current
        ? { ...state.current, [key]: value }
        : null,
    })),

  // For JSON sections (experience, skills, etc.)
  replaceSection: (key, value) =>
    set((state) => ({
      current: state.current
        ? { ...state.current, [key]: value }
        : null,
    })),

  // Call ONLY after PATCH success
  markSaved: () =>
    set((state) => ({
      lastSaved: state.current
        ? structuredClone(state.current)
        : null,
      saveError: null,
    })),

  setSaving: (value) => set({ isSaving: value }),
  setError: (error) => set({ saveError: error }),

  reset: () =>
    set({
      current: null,
      lastSaved: null,
      isSaving: false,
      saveError: null,
      isInitialized: false,
    }),
}))
