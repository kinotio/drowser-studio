import '@/app/globals.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider, ClerkLoaded } from '@clerk/nextjs'
import Script from 'next/script'

import { ThemeProvider } from '@/components/theme-provider'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
})

export const metadata: Metadata = {
  title: 'Drowser',
  description: 'A easy way to implement and write Selenium with TypeScript using Deno'
}

export default function Layout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider dynamic>
      <html lang='en'>
        <Script
          async
          src='https://analytics.kinotio.io/script.js'
          data-website-id='d8631cd7-570b-4f43-9d09-03f27e46c999'
        />
        <body className={`${inter.className}`}>
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
          >
            <ClerkLoaded>{children}</ClerkLoaded>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
