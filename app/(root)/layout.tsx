import { HeaderComponent } from '@/components/common/header-component'
import { FooterComponent } from '@/components/common/footer-component'

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <HeaderComponent />
      {children}
      <FooterComponent />
    </>
  )
}
