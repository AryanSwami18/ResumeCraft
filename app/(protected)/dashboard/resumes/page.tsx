import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import React from 'react'

import { Plus } from "lucide-react"
import Link from 'next/link'

function Resumes() {
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
            <Link href="/dashboard/create-resume">
              <Button
                className="bg-primary text-white hover:bg-primary/80 transition font-bold
                   rounded-full h-12 w-12 p-0 flex items-center justify-center
                   hover:scale-105 shadow-lg cursor-pointer"
              >
                <Plus className='h-6 w-6' />
              </Button>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Create New Resume</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </>
  )
}

export default Resumes