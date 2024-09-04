import { Header } from '@/components/shared/header'
import { Footer } from '@/components/shared/footer'
import { Toaster } from '@/components/ui/sonner'

const Layout = ({
  children
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <>
      <Header />
      <main> {children}</main>
      <Toaster position='bottom-center' />
      <Footer />
    </>
  )
}

export default Layout
