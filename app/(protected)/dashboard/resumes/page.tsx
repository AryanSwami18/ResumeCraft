"use client"

import React, { useEffect } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
import { Plus } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Spinner } from "@/components/ui/spinner"
import ResumeCard from "@/components/dashboard/resumeCard"

import { useResumeStore } from "@/store/resume"

function Resumes() {
  const router = useRouter()

  //  Zustand store
  const {
    resumes,
    isLoading,
    error,
    setResumes,
    setLoading,
    setError,
    updateTitle, reset
  } = useResumeStore()

  //  Local UI-only state 
  const [creating, setCreating] = React.useState(false)
  const [resumeId, setResumeId] = React.useState<string | null>(null)
  const [showTitleModal, setShowTitleModal] = React.useState(false)
  const [title, setTitle] = React.useState("")
  const [titleUpdating, setTitleUpdating] = React.useState(false)
  //  Create resume 
  const createResume = async () => {
    setCreating(true)
    try {
      const res = await axios.post("/api/resumes/create-resume")
      const { id } = res.data.data
      setResumeId(id)
      setShowTitleModal(true)
    } catch (err) {
      console.error(err)
      toast.error("Failed to create resume")
    } finally {
      setCreating(false)
    }
  }
  const saveTitleAndContinue = async () => {
    if (!title.trim() || !resumeId) {
      toast.error("Title is required")
      return
    }
    try {
      setTitleUpdating(true)
      await axios.patch(`/api/resumes/${resumeId}`, { title })
      updateTitle(resumeId, title)
      setShowTitleModal(false)
      router.push(`/dashboard/edit-resume/${resumeId}`)
    } catch (error) {
      console.error(error)
      toast.error("Failed to update title")
    } finally {
      setTitleUpdating(false)
    }
  }

  //  Fetch resumes  → store in Zustand
  useEffect(() => {
    const fetchUserResumes = async () => {
      setLoading(true)
      setError(null)

      try {
        const res = await axios.get("/api/resumes/get-user-resumes")
        setResumes(res.data.resumes)
      } catch (err) {
        console.error(err)
        setError("Failed to fetch resumes")
        toast.error("Failed to fetch resumes")
      } finally {
        setLoading(false)
      }
    }

    fetchUserResumes()

    return () => {
      reset()
    }
  }, [setResumes, setLoading, setError])

  return (
    <>
      <div className="flex flex-col min-h-screen max-w-[1200px] m-auto justify-start items-center">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start mt-10 w-full px-4">
          <h1 className="text-xl font-medium text-muted-foreground border-b">
            Your Resumes
          </h1>
        </div>

        <div className="flex flex-col sm:flex-row flex-wrap gap-4 m-2 w-full justify-center items-center cursor-pointer">
          {isLoading ? (
            <Spinner />
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : resumes.length === 0 ? (
            <p className="text-muted-foreground">
              You have no resumes yet. Click the + button to create one.
            </p>
          ) : (
            resumes.map((resume) => (
              <ResumeCard key={resume.id} {...resume} />
            ))
          )}
        </div>
      </div>

      {/* Floating create button */}
      <div className="fixed bottom-6 left-6 z-50">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className="bg-primary text-white hover:bg-primary/80 transition font-bold
                         rounded-full h-12 w-12 p-0 flex items-center justify-center
                         hover:scale-105 shadow-lg cursor-pointer"
              onClick={createResume}
              disabled={creating}
            >
              {creating ? <Spinner /> : <Plus className="h-6 w-6" />}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Create New Resume</p>
          </TooltipContent>
        </Tooltip>

        {/* Title modal */}
        {showTitleModal && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-background p-6 rounded-xl w-96 space-y-4">
              <h2 className="text-lg font-semibold">Resume Title</h2>

              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border rounded p-2"
                placeholder="My Resume"
              />

              <Button onClick={saveTitleAndContinue}
                disabled={titleUpdating}>
                {titleUpdating ? <Spinner /> : "Save and Continue"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default Resumes
