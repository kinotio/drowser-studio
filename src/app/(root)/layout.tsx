import type { Metadata } from 'next'

import { RootLayout } from '@/components/layouts/root-layout'

export const metadata: Metadata = {
  title: 'Drowser',
  description: 'A easy way to implement and write Selenium with TypeScript using Deno'
}

export default function Layout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return <RootLayout>{children}</RootLayout>
}
