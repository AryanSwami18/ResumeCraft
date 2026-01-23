"use client"

import React, { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Download, SquareCheck, SquareCheckBig } from "lucide-react"
import axios from "axios"
import { toast } from "sonner"
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

function EditResume() {
  const params = useParams<{ resumeId: string }>()
  const resumeId = params.resumeId
  const { current, lastSaved, isInitialized, setSaving, markSaved, setError, initialize, reset, updateField, isSaving } = useResumeEditorStore()
  const [loading, setLoading] = useState(true)
  const [resumeLoadingError, setResumeLoadingError] = useState(false)


  useEffect(() => {
    let isMounted = true

    const getResume = async () => {
      try {
        const response = await axios.get(`/api/resumes/${resumeId}`)

        if (!isMounted) return

        if (response.status !== 200) {
          toast.error("Failed to load resume")
          setResumeLoadingError(true)
          return
        }
        console.log(response);
        setResumeLoadingError(false)
        initialize(response.data.resume)
      } catch (error) {
        console.error(error)
        toast.error("Cannot get the resume. Please try again later.")
        setResumeLoadingError(true)
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    getResume()

    return () => {
      isMounted = false
      reset()
    }
  }, [resumeId, initialize, reset])

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
        console.error(error)
        setError("Failed to autosave resume")
      } finally {
        setSaving(false)
      }
    }, 800)

    return () => clearTimeout(timeout)
  }, [current, lastSaved, isInitialized])


  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Spinner />
      </div>
    )
  }

  if (resumeLoadingError) {
    return (
      <div className="h-screen flex items-center justify-center">
        <span className="text-muted-foreground">
          Error loading resume. Please try again later.
        </span>
      </div>
    )
  }

  return (
    <div className="min-h-screen w-full bg-background">
      {/* Top bar */}
      <div className="bg-background">
        <div className="border-b mx-auto flex h-14 max-w-[1200px] items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard/resumes"
              className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Link>

            <span className="text-sm text-muted-foreground">
              {isSaving ? <Spinner /> : 'Synced'}
            </span>
          </div>

          <button className="flex items-center gap-1 rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90">
            <Download className="h-4 w-4" />
            Download
          </button>
        </div>
      </div>

      {/* Main boxed content */}
      <div className="mx-auto max-w-[1200px] px-4 py-6">
        <div className="flex flex-col gap-6 md:flex-row">

          {/* Editor */}
          <div className="w-full md:w-[60%]">
            <div className="space-y-6">
              <Input
                value={current?.title}
                placeholder="Untitled resume"
                name="title"
                onChange={(e) => updateField("title", e.target.value)}
                className="
                            w-full
                            border-0
                            border-b
                            border-border
                            bg-transparent
                            px-2
                            py-2
                            text-2xl
                            font-semibold
                            tracking-tight
                            focus-visible:ring-0
                            focus-visible:border-primary
                            placeholder:text-muted-foreground
                            transition-colors   
                          "
              />
              <div className="rounded-lg border p-4 text-muted-foreground flex flex-col gap-4">
                {/* Education Editor */}
                <PersonalSection />
              </div>
              <div className="rounded-lg border p-4 text-muted-foreground">
                {/* Additional info editor */}
                <SkillsSection />
              </div>

              <div className="rounded-lg border p-4 text-muted-foreground">
                {/* Projects editor */}
                <ProjectsSection />
              </div>

              <div className="rounded-lg border p-4 text-muted-foreground">
                {/* Experience Editor */}
                <ExperienceSection />
              </div>

              <div className="rounded-lg border p-4 text-muted-foreground">
                {/* Experience Editor */}
                <EducationSection />
              </div>

              <div className="rounded-lg border p-4 text-muted-foreground">
                {/* Experience Editor */}
                <CertificationsSection />
              </div>

              <div className="rounded-lg border p-4 text-muted-foreground">
                {/* Experience Editor */}
                <HobbiesSection />
              </div>







            </div>
          </div>

          {/* Preview */}
          <div className="hidden md:block md:w-[50%]">
            <div className="sticky top-24 flex justify-center">
              <div className="h-[760px] w-[420px] rounded-md bg-white shadow-lg">
                {/* PDF preview */}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default EditResume
