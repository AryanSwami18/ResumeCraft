'use client'
import React from 'react'
import * as Clerk from '@clerk/elements/common'
import * as SignUp from '@clerk/elements/sign-up'
import { useSignUp } from '@clerk/nextjs'
import { Spinner } from '@/components/ui/spinner'
import Link from 'next/link'
import { ClerkLoaded, ClerkLoading, ClerkDegraded, ClerkFailed, RedirectToSignIn } from '@clerk/nextjs'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default function SignUpPage() {
  const { isLoaded } = useSignUp()

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
            <span className="text-accent">Create</span>
            <span className="text-primary"> Your Account</span>
          </div>
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Join{' '}
            <span className="bg-linear-to-r from-primary to-accent bg-clip-text text-transparent font-bold">
              ResumeCraft
            </span>
          </h1>
          <p className="max-w-md text-sm text-muted-foreground md:text-base">
            Build multiple resumes, switch templates instantly, export ATS-friendly PDFs — all in one place.
          </p>
        </div>

        {/* Right side */}
        <div className="flex flex-1 w-full max-w-md flex-col items-center justify-center rounded-lg p-6">
          <Card className="w-full shadow-lg border border-border bg-card flex flex-col">
            <CardHeader>
              <CardTitle className="text-2xl">Sign Up</CardTitle>
              <CardDescription>Create your account to continue.</CardDescription>
            </CardHeader>

            <CardContent className="w-full">
              <SignUp.Root>
                {/* STEP 1 — Social OR first/last/email */}
                <SignUp.Step name="start">
                  <div className="flex w-full flex-col gap-3">

                    {/* Social sign ups */}
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
                      <span className="mx-2 text-sm text-muted-foreground font-semibold">or</span>
                      <hr className="grow border-border" />
                    </div>

                    {/* First name */}
                    <Clerk.Field name="firstName">
                      <Clerk.Label className="text-sm font-medium text-foreground">First Name</Clerk.Label>
                      <Clerk.Input className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-primary" />
                      <Clerk.FieldError className="text-xs text-destructive" />
                    </Clerk.Field>

                    {/* Last name */}
                    <Clerk.Field name="lastName">
                      <Clerk.Label className="text-sm font-medium text-foreground">Last Name</Clerk.Label>
                      <Clerk.Input className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-primary" />
                      <Clerk.FieldError className="text-xs text-destructive" />
                    </Clerk.Field>

                    {/* Email */}
                    <Clerk.Field name="emailAddress">
                      <Clerk.Label className="text-sm font-medium text-foreground">Email</Clerk.Label>
                      <Clerk.Input
                        type="email"
                        placeholder="you@example.com"
                        className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-primary"
                      />
                      <Clerk.FieldError className="text-xs text-destructive" />
                    </Clerk.Field>

                    <Clerk.GlobalError className="text-xs text-destructive" />

                    {/* Continue → send email code */}
                    <SignUp.Action
                      submit
                      className="w-full rounded-md bg-primary py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 cursor-pointer"
                    >
                      <Clerk.Loading>
                        {(isLoading) =>
                          isLoading ? (
                            <div className="flex items-center justify-center gap-2">
                              <Spinner className="h-4 w-4 text-white" />
                              <span>Processing...</span>
                            </div>
                          ) : (
                            'Continue'
                          )
                        }
                      </Clerk.Loading>
                    </SignUp.Action>
                  </div>
                </SignUp.Step>


                {/* STEP 2 — Verification code */}
                <SignUp.Step name="verifications">

                  <RedirectToSignIn
                  />
                  <SignUp.Strategy name="email_code">
                    <div className="flex w-full flex-col gap-3">
                      <div className="text-center">
                        <h2 className="text-lg font-semibold">Check your email</h2>
                        <p className="text-sm text-muted-foreground">
                          We sent a sign-up code
                        </p>
                      </div>

                      <Clerk.Field name="code">
                        <Clerk.Label className="text-sm font-medium text-foreground">Verification code</Clerk.Label>
                        <Clerk.Input
                          type="text"
                          inputMode="numeric"
                          placeholder="123456"
                          className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-primary"
                        />
                        <Clerk.FieldError className="text-xs text-destructive" />
                      </Clerk.Field>

                      <Clerk.GlobalError className="text-xs text-destructive" />

                      <div className="flex w-full items-center justify-between gap-2 mt-2">
                        <SignUp.Action resend className="text-xs text-muted-foreground hover:underline cursor-pointer">
                          Resend code
                        </SignUp.Action>
                        <SignUp.Action
                          submit
                          className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 cursor-pointer"
                        >
                          <Clerk.Loading>
                            {(isLoading) =>
                              isLoading ? (
                                <div className="flex items-center justify-center gap-2">
                                  <Spinner className="h-4 w-4 text-white" />
                                  <span>Verifying...</span>
                                </div>
                              ) : (
                                'Verify & Create Account'
                              )
                            }
                          </Clerk.Loading>
                        </SignUp.Action>
                      </div>
                    </div>
                  </SignUp.Strategy>
                </SignUp.Step>
              </SignUp.Root>
            </CardContent>

            <CardFooter className="flex justify-center pt-4">
              <p className="text-sm text-muted-foreground">
                Already have an account?{' '}
                <Link href="/sign-in" className="text-primary font-medium hover:underline">
                  Sign In
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
