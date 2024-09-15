import { AuthLayout } from '@/components/layouts/auth-layout'

const SubLayout = ({
  children
}: Readonly<{
  children: React.ReactNode
}>) => {
  return <AuthLayout>{children}</AuthLayout>
}

export default SubLayout
