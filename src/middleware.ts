import { NextResponse } from 'next/server'
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

import { pocketbase } from '@/lib/pocketbase'

const isProtectedRoute = createRouteMatcher(['/studio(.*)'])

export default clerkMiddleware(async (auth, request) => {
  const url = request.nextUrl.clone()
  const { userId } = await auth()

  if (userId && request.nextUrl.pathname === '/') {
    url.pathname = '/studio'
    return NextResponse.redirect(url)
  }

  if (userId && request.nextUrl.pathname.startsWith('/studio')) {
    try {
      await pocketbase.collection('subs').getFirstListItem('', {
        filter: `user_id = "${userId}"`
      })
      return NextResponse.next()
    } catch (err) {
      url.pathname = '/subscription'
      return NextResponse.redirect(url)
    }
  }

  if (isProtectedRoute(request)) await auth.protect()
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)'
  ]
}
