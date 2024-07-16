import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { PATH } from '@/lib/constants'

const middleware = async (request: NextRequest) => {
  const sessionActive = request.cookies.get('session-active')

  const dashboardPath = PATH.DASHBOARD
  const rootPath = '/'

  if (request.nextUrl.pathname === rootPath) {
    if (sessionActive && sessionActive.value === 'true') {
      return NextResponse.redirect(new URL(dashboardPath, request.url))
    }
  }

  if (request.nextUrl.pathname.startsWith(dashboardPath)) {
    if (!sessionActive || sessionActive.value !== 'true') {
      return NextResponse.redirect(new URL(rootPath, request.url))
    }
  }

  return NextResponse.next()
}

export const config = { matcher: ['/', '/dashboard/:path*'] }

export { middleware }
