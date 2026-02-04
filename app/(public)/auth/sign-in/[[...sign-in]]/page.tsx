'use client'
import React from 'react'
import * as Clerk from '@clerk/elements/common'
import * as SignIn from '@clerk/elements/sign-in'
import { useSignIn } from '@clerk/nextjs'
import { Spinner } from '@/components/ui/spinner'
import Link from 'next/link'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default function SignInPage() {
  const { isLoaded } = useSignIn()

  if (!isLoaded) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <Spinner />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-5">
      <div className="flex w-full max-w-5xl flex-col gap-6 md:flex-row md:items-stretch">
        {/* Left side */}
        <div className="hidden flex-1 flex-col justify-center gap-4 md:flex">
          <div className="text-2xl font-bold">
            <span className="text-accent">Welcome</span>
            <span className="text-primary"> Back!</span>
          </div>
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Sign in to{' '}
            <span className="bg-linear-to-r from-primary to-accent bg-clip-text text-transparent font-bold">
              ResumeCraft
            </span>
          </h1>
          <p className="max-w-md text-sm text-muted-foreground md:text-base">
            Access all your resumes, edit them in seconds, and export ATS-friendly PDFs ready for your next application.
          </p>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li>• Save multiple resumes for different roles</li>
            <li>• Switch templates without re-entering data</li>
            <li>• Export clean, professional PDFs anytime</li>
          </ul>
        </div>

        {/* Right side */}
        <div className="flex flex-1 w-full max-w-md flex-col items-center justify-center rounded-lg p-6">
          <Card className="w-full shadow-lg border border-border bg-card flex flex-col">
            <CardHeader>
              <CardTitle className="text-2xl">Sign In</CardTitle>
              <CardDescription>
                Use your email or social account to access your workspace.
              </CardDescription>
            </CardHeader>

            <CardContent className="w-full">
              <SignIn.Root>
                {/* STEP 1: enter email (or use social) */}
                <SignIn.Step name="start">
                  <div className="flex w-full flex-col gap-3">
                    <div className="flex flex-col md:flex-row w-full gap-2">
                      <Clerk.Connection
                        name="google"
                        className="w-full bg-primary p-2 rounded-lg hover:bg-primary/80 cursor-pointer flex items-center justify-center"
                      >
                        <p className="text-white font-semibold">Google</p>
                      </Clerk.Connection>
                      <Clerk.Connection
                        name="github"
                        className="w-full bg-primary p-2 rounded-lg hover:bg-primary/80 cursor-pointer flex items-center justify-center"
                      >
                        <p className="text-white font-semibold">Github</p>
                      </Clerk.Connection>
                    </div>

                    <div className="flex flex-row w-full items-center">
                      <hr className="grow border-border" />
                      <span className="mx-2 text-sm text-muted-foreground font-semibold">
                        or
                      </span>
                      <hr className="grow border-border" />
                    </div>

                    <div className="flex w-full flex-col gap-3">
                      <Clerk.Field name="identifier">
                        <Clerk.Label className="text-sm font-medium text-foreground">
                          Email
                        </Clerk.Label>
                        <Clerk.Input
                          type="email"
                          placeholder="you@example.com"
                          className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-primary"
                        />
                        <Clerk.FieldError className="mt-1 text-xs text-destructive" />
                      </Clerk.Field>

                      <Clerk.GlobalError className="text-xs text-destructive" />

                      {/* This submits the email and triggers email_code strategy */}
                      <SignIn.Action
                        submit
                        className="w-full rounded-md bg-primary py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 cursor-pointer"
                      >
                        Send code
                      </SignIn.Action>
                    </div>
                  </div>
                </SignIn.Step>

                {/* STEP 2: enter email code */}
                <SignIn.Step name="verifications">
                  <SignIn.Strategy name="email_code">
                    <div className="flex w-full flex-col gap-3">
                      <div className="text-center">
                        <h2 className="text-lg font-semibold">Check your email</h2>
                        <p className="text-sm text-muted-foreground">
                          We sent a sign-in code to <SignIn.SafeIdentifier />.
                        </p>
                      </div>

                      <Clerk.Field name="code">
                        <Clerk.Label className="text-sm font-medium text-foreground">
                          Verification code
                        </Clerk.Label>
                        <Clerk.Input
                          type="text"
                          inputMode="numeric"
                          placeholder="123456"
                          className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-primary"
                        />
                        <Clerk.FieldError className="mt-1 text-xs text-destructive" />
                      </Clerk.Field>

                      <Clerk.GlobalError className="text-xs text-destructive" />

                      <div className="flex w-full items-center justify-between gap-2 mt-2">
                        <SignIn.Action
                          resend
                          className="text-xs text-muted-foreground hover:underline cursor-pointer"
                        >
                          Resend code
                        </SignIn.Action>
                        <SignIn.Action
                          submit
                          className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 cursor-pointer"
                        >
                          Verify & continue
                        </SignIn.Action>
                      </div>
                    </div>
                  </SignIn.Strategy>
                </SignIn.Step>
              </SignIn.Root>
            </CardContent>

            <CardFooter className="flex justify-center pt-4">
              <p className="text-sm text-muted-foreground">
                Don&apos;t have an account?{' '}
                <Link
                  href="/auth/signup"
                  className="text-primary font-medium hover:underline"
                >
                  Sign Up
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
