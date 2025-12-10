import React from 'react'

function Footer() {
  return (
    <div className='w-full text-accent py-6
     bg-background text-center flex flex-row justify-center border-t border-accent/20
    '>
            &copy; {new Date().getFullYear()} ResumeCraft. All rights reserved.
    </div>
  ) 
}

export default Footer