import '@/app/globals.css'

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

const Layout = ({
  children
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <ClerkProvider dynamic>
      <html lang='en' suppressHydrationWarning>
        <Script
          async
          src='https://insight.kinotio.io/script.js'
          data-website-id='a3a15497-c4c8-4fc5-95da-4235c05e77b2'
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
