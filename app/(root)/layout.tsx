import { HeaderComponent } from '@/components/shared/header-component'
import { FooterComponent } from '@/components/shared/footer-component'

const Layout = ({
  children
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <>
      <HeaderComponent />
      {children}
      <FooterComponent />
    </>
  )
}

export default Layout
