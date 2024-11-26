import '@/app/globals.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider, ClerkLoaded } from '@clerk/nextjs'
import Script from 'next/script'

import { ThemeProvider } from '@/components/theme-provider'
import { TooltipProvider } from '@/components/ui/tooltip'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
})

export const metadata: Metadata = {
  title: 'Drowser',
  description: 'A easy way to implement and write Selenium with TypeScript using Deno'
}

const Layout = ({
  children
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <ClerkProvider dynamic>
      <html lang='en'>
        <Script
          async
          src='https://analytics.kinotio.io/script.js'
          data-website-id='c5168dda-d0db-468c-b8c0-3d70fab4cfd8'
        />
        <body className={`${inter.className}`}>
          <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
            <ClerkLoaded>
              <TooltipProvider>{children}</TooltipProvider>
            </ClerkLoaded>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}

export default Layout
