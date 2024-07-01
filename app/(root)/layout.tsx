import { HeaderComponent } from '@/components/shared/header-component'
import { FooterComponent } from '@/components/shared/footer-component'

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
