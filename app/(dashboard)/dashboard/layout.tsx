import type { Metadata } from 'next'

import { DashboardLayout } from '@/components/layouts/dashboard-layout'

import { PATH } from '@/lib/constants'
import { MenuType } from '@/lib/definitions'

export const metadata: Metadata = {
  title: 'Drowser Studio | Dashboard'
}

const menus = [
  {
    label: 'Reports',
    path: PATH.HOME,
    icon: 'Files'
  },
  {
    label: 'Activities',
    path: PATH.DASHBOARD_ACTIVITIES,
    icon: 'Activity'
  },
  {
    label: 'Settings',
    path: PATH.DASHBOARD_SETTINGS,
    icon: 'Settings'
  }
] as MenuType[]

const SubLayout = ({
  children
}: Readonly<{
  children: React.ReactNode
}>) => {
  return <DashboardLayout menus={menus}>{children}</DashboardLayout>
}

export default SubLayout
