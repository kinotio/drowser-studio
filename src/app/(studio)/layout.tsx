import type { Metadata } from 'next'

import { StudioLayout } from '@/components/layouts/studio-layout'

export const metadata: Metadata = {
  title: 'Drowser',
  description: 'A easy way to implement and write Selenium with TypeScript using Deno'
}

const Layout = ({
  children
}: Readonly<{
  children: React.ReactNode
}>) => {
  return <StudioLayout>{children}</StudioLayout>
}
export default Layout
