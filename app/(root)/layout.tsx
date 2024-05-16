import { HeaderComponent } from '@/components/common/header-component'

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <HeaderComponent />
      {children}
    </>
  )
}
