import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
const isProtectedRoute = createRouteMatcher(["/dashboard(.*)"])
const isPublicAuthRoute = createRouteMatcher([
  "/",
  "/auth/login(.*)",
  "/auth/signup(.*)",
])

export default clerkMiddleware(async (auth, req) => {
  const { isAuthenticated } = await auth()
  const url = req.nextUrl

  //  Protected routes → require login
  if (isProtectedRoute(req)) {
    await auth.protect()
    return NextResponse.next()
  }

  //  Logged-in user should NOT access landing/login/signup
  if (isAuthenticated && isPublicAuthRoute(req)) {
    return NextResponse.redirect(new URL("/dashboard/resumes", req.url))
  }

  // Otherwise allow request
  return NextResponse.next()
})
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}