import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'lucide-react'

function CTA() {
  return (
    <section
      className="
        w-full flex flex-col items-center text-center
        py-14 md:py-20 px-4
        relative overflow-hidden
      "
    >
      {/* Accent gradient glow */}
      <div
        className="
          absolute inset-0 -z-10 opacity-30 blur-3xl
          bg-[radial-gradient(circle_at_center,hsl(var(--accent))_0%,transparent_70%)]
          dark:opacity-40
        "
      />

      <h2
        className="
          font-semibold tracking-tight
          text-3xl md:text-4xl lg:text-5xl
          max-w-2xl leading-tight
        "
      >
        Start building your resume now -
        <span className="bg-linear-to-r from-primary to-accent bg-clip-text text-transparent font-bold  border-b
        lg:border-none
        border-accent pb-1">
          it's free
        </span>
        .
      </h2>

      {/* Subtext */}
      <p
        className="
          text-muted-foreground
          text-sm md:text-base
          max-w-lg mt-3
        "
      >
        Takes less than 5 minutes. No card required.
      </p>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 mt-8">
        <Link
          href="/auth/sign-in"
        >
          <Button
            size="lg"
            className="
            px-8 md:px-12 text-base md:text-lg
            shadow-md hover:shadow-accent/40
            transition-all duration-300
          "
          >
            Build My Resume
          </Button>
        </Link>
      </div>
    </section>
  )
}

export default CTA
