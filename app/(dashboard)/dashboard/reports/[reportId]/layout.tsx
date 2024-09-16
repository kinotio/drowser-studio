import { ReportLayout } from '@/components/layouts/report-layout'

const SubLayout = ({
  children
}: Readonly<{
  children: React.ReactNode
}>) => {
  return <ReportLayout>{children}</ReportLayout>
}

export default SubLayout
