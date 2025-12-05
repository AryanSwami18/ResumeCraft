import React from 'react'

function Footer() {
  return (
    <div className='w-full text-accent py-6
     bg-background text-center flex flex-row justify-center
    '>
        <span className='border-b'>
            &copy; {new Date().getFullYear()} ResumeCraft. All rights reserved.
        </span>
    </div>
  )
}

export default Footer