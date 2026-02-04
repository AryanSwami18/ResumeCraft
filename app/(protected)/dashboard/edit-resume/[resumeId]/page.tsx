"use client"

import React, { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Download, CloudCheck, CloudUpload, FileText, Settings2, Sparkles } from "lucide-react"
import axios from "axios"
import { toast } from "sonner" // Assuming you use sonner for toasts
import { useResumeEditorStore } from "@/store/editResumeStore"
import { Spinner } from "@/components/ui/spinner"
import { Input } from "@/components/ui/input"
import { diffResume } from "@/lib/utils/diffResume"
import { ExperienceSection } from "@/components/editor/ExperienceSection"
import { PersonalSection } from "@/components/editor/PersonalSection"
import { SkillsSection } from "@/components/editor/SkillsSection"
import { ProjectsSection } from "@/components/editor/ProjectSection"
import { EducationSection } from "@/components/editor/EducationSection"
import { CertificationsSection } from "@/components/editor/CertificationSection"
import { HobbiesSection } from "@/components/editor/HobbiesSection"
// Import 'pdf' function to generate blob imperatively
import { PDFViewer, pdf } from "@react-pdf/renderer"
import ResumeDocument from "@/components/pdf/ResumeDocument"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"


// --- SUB-COMPONENT: ISOLATED PREVIEW ---
const ResumePreview = React.memo(({ data, isUpdating }: { data: any, isUpdating: boolean }) => {
  if (!data) return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <Spinner className="h-8 w-8 text-muted-foreground/40" />
      <p className="text-sm font-medium text-muted-foreground animate-pulse">Initializing Canvas...</p>
    </div>
  )

  return (
    <div className="relative h-full w-full">
      {isUpdating && (
        <div className="absolute inset-0 z-20 bg-background/60 backdrop-blur-[2px] flex flex-col items-center justify-center animate-in fade-in duration-300">
          <div className="flex items-center gap-3 bg-background px-6 py-3 rounded-full shadow-lg border border-border">
            <Spinner className="h-5 w-5 text-primary" />
            <span className="text-sm font-semibold">Updating PDF...</span>
          </div>
        </div>
      )}
      <PDFViewer width="100%" height="100%" showToolbar={false} className="border-none">
        <ResumeDocument resume={data} />
      </PDFViewer>
    </div>
  )
})
ResumePreview.displayName = "ResumePreview"

function EditResume() {
  const params = useParams<{ resumeId: string }>()
  const resumeId = params.resumeId

  const current = useResumeEditorStore((state) => state.current)
  const lastSaved = useResumeEditorStore((state) => state.lastSaved)
  const isInitialized = useResumeEditorStore((state) => state.isInitialized)
  const isSaving = useResumeEditorStore((state) => state.isSaving)
  const initialize = useResumeEditorStore((state) => state.initialize)
  const setSaving = useResumeEditorStore((state) => state.setSaving)
  const markSaved = useResumeEditorStore((state) => state.markSaved)
  const updateField = useResumeEditorStore((state) => state.updateField)
  const reset = useResumeEditorStore((state) => state.reset)
  const setError = useResumeEditorStore((state) => state.setError)

  const [loading, setLoading] = useState(true)
  const [resumeLoadingError, setResumeLoadingError] = useState(false)
  const [debouncedData, setDebouncedData] = useState<any>(null)
  const [isUpdatingPreview, setIsUpdatingPreview] = useState(false)

  // New state to track download status
  const [isDownloading, setIsDownloading] = useState(false)

  // --- DOWNLOAD HANDLER ---
  const handleDownload = async () => {
    if (!current) return

    try {
      setIsDownloading(true)

      // 1. Generate the PDF blob using the *current* state (not debounced)
      //    This ensures the download includes even your latest keystroke.
      const blob = await pdf(<ResumeDocument resume={current} />).toBlob()

      // 2. Create a download link
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      // Sanitize filename
      const filename = current.title
        ? current.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()
        : 'resume'
      link.download = `${filename}.pdf`

      // 3. Trigger click
      document.body.appendChild(link)
      link.click()

      // 4. Cleanup
      document.body.removeChild(link)
      URL.revokeObjectURL(url)

      toast.success("Resume downloaded successfully")
    } catch (error) {
      console.error("Download failed:", error)
      toast.error("Failed to download resume")
    } finally {
      setIsDownloading(false)
    }
  }

  // --- DATA LOADING & LOGIC ---
  useEffect(() => {
    let isMounted = true
    const getResume = async () => {
      try {
        const response = await axios.get(`/api/resumes/${resumeId}`)
        if (!isMounted) return
        initialize(response.data.resume)
        setDebouncedData(response.data.resume)
      } catch (error) {
        setResumeLoadingError(true)
      } finally {
        if (isMounted) setLoading(false)
      }
    }
    getResume()
    return () => { isMounted = false; reset(); }
  }, [resumeId, initialize, reset])

  useEffect(() => {
    if (!current) return
    setIsUpdatingPreview(true)
    const timer = setTimeout(() => {
      setDebouncedData(current)
      setIsUpdatingPreview(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [current])

  useEffect(() => {
    if (!current || !lastSaved || !isInitialized) return
    const changes = diffResume(current, lastSaved)
    if (Object.keys(changes).length === 0) return

    const timeout = setTimeout(async () => {
      try {
        setSaving(true)
        await axios.patch(`/api/resumes/${current.id}`, changes)
        markSaved()
      } catch (error) {
        setError("Failed to autosave")
      } finally {
        setSaving(false)
      }
    }, 1500)
    return () => clearTimeout(timeout)
  }, [current, lastSaved, isInitialized, setSaving, markSaved, setError])

  if (loading) return <div className="h-screen w-full flex items-center justify-center"><Spinner className="h-10 w-10 text-primary" /></div>

  return (
    <div className="h-screen w-full bg-background text-foreground overflow-hidden flex flex-col">
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* Navbar */}
      <nav className="h-16 border-b bg-background/95 backdrop-blur-sm flex-none z-50">
        <div className="mx-auto flex h-full max-w-[1600px] items-center justify-between px-6">
          <div className="flex items-center gap-6">
            <Link href="/dashboard/resumes" className="p-2 hover:bg-accent rounded-full transition-colors text-muted-foreground hover:text-primary">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-primary uppercase tracking-[0.2em]">ResumeCraft Editor</span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold truncate max-w-[200px]">{current?.title || "Untitled Document"}</span>
                {isSaving ? (
                  <div className="flex items-center gap-1 text-[10px] font-bold text-amber-500 px-2 py-0.5 rounded-full uppercase bg-amber-500/10">
                    <CloudUpload className="h-3 w-3" /> Saving
                  </div>
                ) : (
                  <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-500 px-2 py-0.5 rounded-full uppercase bg-emerald-500/10">
                    <CloudCheck className="h-3 w-3" /> Saved
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="hidden sm:inline-block">
                    <Button
                      type="button"
                      disabled
                      className="flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg opacity-60 cursor-not-allowed"
                    >
                      <Settings2 className="h-4 w-4" /> Template
                    </Button>
                  </span>
                </TooltipTrigger>

                <TooltipContent side="bottom" align="end">
                  <p> Template feature is in development More to come</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <Button
              onClick={handleDownload}
              disabled={isDownloading || loading}
              className="flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-lg text-sm font-bold shadow-sm hover:opacity-90 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isDownloading ? (
                <>
                  <Spinner className="h-4 w-4 animate-spin text-primary-foreground" />
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <Download className="h-4 w-4" />
                  <span>Export PDF</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </nav>

      {/* Split Pane Layout */}
      <div className="flex-1 flex overflow-hidden">

        {/* LEFT PANEL: EDITOR */}
        <div className="w-full md:w-[55%] lg:w-[60%] h-full overflow-y-auto no-scrollbar bg-background">
          <div className="max-w-[800px] mx-auto p-6 md:p-10 space-y-10">
            {/* Title Input */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-primary font-bold">
                <FileText className="h-5 w-5" />
                <span className="text-sm uppercase tracking-widest">Document Title</span>
              </div>
              <Input
                value={current?.title || ""}
                onChange={(e) => updateField("title", e.target.value)}
                className="border-0 border-b border-border bg-transparent px-0 text-4xl font-extrabold focus-visible:ring-0 focus-visible:border-primary rounded-none h-auto pb-4 transition-all"
                placeholder="Ex: Senior Software Engineer 2024"
              />
            </div>

            {/* Sections */}
            <div className="grid gap-8 pb-20">
              {[
                { label: "Personal Info", component: <PersonalSection /> },
                { label: "Skills & Expertise", component: <SkillsSection /> },
                { label: "Professional Experience", component: <ExperienceSection /> },
                { label: "Featured Projects", component: <ProjectsSection /> },
                { label: "Education", component: <EducationSection /> },
                { label: "Certifications", component: <CertificationsSection /> },
                { label: "Interests & Hobbies", component: <HobbiesSection /> }
              ].map((section, idx) => (
                <section key={idx} className="group relative bg-card border border-border rounded-2xl p-6 transition-all hover:border-primary/40 shadow-sm">
                  <div className="mb-6 flex items-center justify-between">
                    <h3 className="text-lg font-bold flex items-center gap-2">
                      <span className="flex items-center justify-center w-6 h-6 rounded bg-primary/10 text-primary text-[10px] font-bold">{idx + 1}</span>
                      {section.label}
                    </h3>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="cursor-pointer">
                            <Sparkles className="h-4 w-4 text-muted-foreground/30 group-hover:text-primary transition-colors" />
                          </div>
                        </TooltipTrigger>

                        <TooltipContent>
                          <p> AI suggestions are in development</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <div>{section.component}</div>
                </section>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: PREVIEW */}
        <div className="hidden md:block w-[45%] lg:w-[40%] h-full bg-muted/30 border-l border-border relative">
          <div className="absolute inset-0 p-8 flex items-center justify-center">
            <div className="h-full w-full max-w-[600px] shadow-2xl rounded-sm overflow-hidden border border-border/50 bg-white">
              <ResumePreview data={debouncedData} isUpdating={isUpdatingPreview} />
            </div>
          </div>

          {/* Floating Status Badge */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur border border-border px-4 py-2 rounded-full shadow-lg flex items-center gap-3 z-30">
            <div className={`h-2 w-2 rounded-full ${isUpdatingPreview ? "bg-amber-400 animate-pulse" : "bg-emerald-400"}`} />
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest font-mono">
              {isUpdatingPreview ? "Rendering Preview..." : "Live Preview Active"}
            </span>
          </div>
        </div>

      </div>
    </div>
  )
}

export default EditResume