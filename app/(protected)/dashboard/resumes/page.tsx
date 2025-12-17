"use client"

import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import React, { useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { Plus } from "lucide-react"
import { toast } from 'sonner'

function Resumes() {
  const [creating, setCreating] = React.useState(false)
  const [resumeId, setResumeId] = React.useState<string | null>(null)
  const [showTitleModal, setShowTitleModal] = React.useState(false)
  const [title, setTitle] = React.useState('')
  const router = useRouter()
  const createResume = async () => {
    setCreating(true)
    try {
      const res = await axios.post('/api/resumes/create-resume')
      const { id } = res.data.data
      setResumeId(id)
      setShowTitleModal(true)
    } catch (err:any) {
      console.log(err);
      
      toast.error('Failed to create resume:')
    } finally {
      setCreating(false)
    }
  }

  const saveTitleAndContinue = async () => {
    if (!title.trim() || !resumeId) {
      toast.error('Title is required')
      return
    }

    await axios.patch(`/api/resumes/${resumeId}`, {
      title,
    })

    router.push(`/dashboard/resume/${resumeId}/edit`)
  }

  return (
    <>
      <div className='flex flex-col min-h-screen max-w-[1200px] m-auto justify-start items-center'>
        <div className='flex flex-col sm:flex-row gap-4 justify-between items-start mt-10 w-full px-4'>
          <h1 className='text-xl font-medium text-muted-foreground border-b '>Your Resumes</h1>
        </div>

        <div className='flex flex-col sm:flex-row flex-wrap gap-4 m-2 overflow-auto w-full justify-center items-center'>
          {/* Resume list will go here */}
          This is where resumes will go
        </div>




      </div>

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
              <Plus className='h-6 w-6' />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Create New Resume</p>
          </TooltipContent>
        </Tooltip>

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

              <Button onClick={saveTitleAndContinue}>
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default Resumes