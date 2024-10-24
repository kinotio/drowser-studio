import { NextResponse } from 'next/server'
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isProtectedRoute = createRouteMatcher(['/studio(.*)'])

export default clerkMiddleware(async (auth, request) => {
  const url = request.nextUrl.clone()
  const { userId } = await auth()

  if (userId && request.nextUrl.pathname === '/') {
    url.pathname = '/studio'
    return NextResponse.redirect(url)
  }
  if (isProtectedRoute(request)) await auth.protect()
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)'
  ]
}
