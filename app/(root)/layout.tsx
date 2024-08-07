import { Header } from '@/components/shared/header'
import { Footer } from '@/components/shared/footer'

const Layout = ({
  children
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <>
      <Header />
      <main> {children}</main>
      <Footer />
    </>
  )
}

export default Layout
