import React from 'react'
import Image from 'next/image'
function Hero() {
    return (
        <div className='flex flex-col  md:flex-row  items-center my-10 justify-between w-full px-4
    max-w-[1200px] mx-auto gap-10 md:gap-6 '>
            <div className='flex flex-col md:gap-6 gap-4 '>
                <h1 className='text-4xl md:text-6xl font-bold leading-tight text-center md:text-left'>
                    Craft Your Perfect Resume With
                    <span>
                        <span className='text-accent'> Resume</span>
                        <span className='text-primary'>Craft</span>
                    </span>
                </h1>

                <p className='text-lg md:text-xl text-muted-foreground text-center md:text-left '>
                    Create stunning resumes in minutes with templates and easy customization.
                </p>

                <div className="flex flex-row flex-wrap gap-4 sm:flex-row md:gap-6 justify-center md:justify-start text-sm md:text-lg">
                    <div className="flex items-center gap-2">
                        <span className="text-primary text-xl">✓</span>
                        <span>Free to use</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="text-primary text-xl">✓</span>
                        <span>No  card required</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="text-primary text-xl">✓</span>
                        <span>Export as ATS-friendly PDF</span>
                    </div>
                </div>
            </div>


            <div>
                <Image
                    src="/hero-resume.png"
                    alt="Hero Image"
                    width={600}
                    height={600}
                    className="
                        w-full h-auto max-w-sm md:max-w-md
                        rounded-xl

                        border border-border dark:border-white/10
                        rotate-3
                        shadow-2xl
                        dark:shadow-[0_0_55px_-8px_hsl(var(--accent))]
                        transition-transform duration-300 hover:-translate-y-1 hover:scale-120
                        hover:rotate-10
  "
                    priority
                />




            </div>
        </div>
    )
}

export default Hero