import type { Metadata } from 'next'

import { StudioLayout } from '@/components/layouts/studio-layout'

import { DATA } from '@/data'

export const metadata: Metadata = {
  metadataBase: new URL('https://drowser.kinotio.io/studio'),
  title: {
    default: 'Drowser Studio',
    template: `%s | Drowser Studio`
  },
  description: 'A web-based tool for importing and visualize data reports from Drowser',
  keywords: DATA.keywords,
  openGraph: {
    title: 'Drowser Studio',
    description: 'A web-based tool for importing and visualize data reports from Drowser',
    url: DATA.url,
    siteName: `https://drowser.kinotio.io/studio`,
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
  return <StudioLayout>{children}</StudioLayout>
}
export default Layout
