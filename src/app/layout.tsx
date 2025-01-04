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
      <html lang='en'>
        <Script
          async
          src='https://umami.kinotio.io/script.js'
          data-website-id='eb707704-e55f-4bcd-bb71-637d1ca6a7a4'
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
