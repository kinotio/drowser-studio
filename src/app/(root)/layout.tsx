import type { Metadata } from 'next'

import { RootLayout } from '@/components/layouts/root-layout'

import { DATA } from '@/data'

export const metadata: Metadata = {
  metadataBase: new URL(DATA.url),
  title: {
    default: DATA.name,
    template: `%s | ${DATA.name}`
  },
  description: DATA.description,
  keywords: DATA.keywords,
  openGraph: {
    title: `${DATA.name}`,
    description: DATA.description,
    url: DATA.url,
    siteName: `${DATA.name}`,
    type: 'website'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      'index': true,
      'follow': true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  twitter: {
    title: `${DATA.name}`,
    card: 'summary_large_image'
  },
  verification: {
    google: '',
    yandex: ''
  }
}

const Layout = ({
  children
}: Readonly<{
  children: React.ReactNode
}>) => {
  return <RootLayout>{children}</RootLayout>
}

export default Layout
