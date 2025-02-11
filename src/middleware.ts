import { NextResponse } from 'next/server'
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isProtectedRoute = createRouteMatcher(['/studio(.*)'])

export default clerkMiddleware(async (auth, request) => {
  const url = request.nextUrl.clone()
  const { userId } = await auth()
  const reportCasesPattern = /^\/studio\/reports\/([^\/]+)\/cases$/
  const match = request.nextUrl.pathname.match(reportCasesPattern)

  if (
    (userId && request.nextUrl.pathname === '/') ||
    (userId && request.nextUrl.pathname === '/drowser-studio') ||
    (userId && request.nextUrl.pathname.startsWith('/legal'))
  ) {
    url.pathname = '/studio'
    return NextResponse.redirect(url)
  }

  if (userId && match) {
    url.pathname = '/studio/reports/' + match[1]
    return NextResponse.redirect(url)
  }

  if (isProtectedRoute(request)) await auth.protect()
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)'
  ]
}
