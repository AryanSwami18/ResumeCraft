"use client"

import React, { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Download } from "lucide-react"
import axios from "axios"
import { toast } from "sonner"
import { useResumeEditorStore } from "@/store/editResumeStore"
import { Spinner } from "@/components/ui/spinner"

function EditResume() {
  const params = useParams<{ resumeId: string }>()
  const resumeId = params.resumeId

  const { initialize, reset } = useResumeEditorStore()
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
              Editing resume
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
              <div className="rounded-lg border p-4 text-muted-foreground">
                Resume editor sections go here
              </div>

              <div className="rounded-lg border p-4 text-muted-foreground">
                Experience / Education / Skills
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className="hidden md:block md:w-[40%]">
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
