import Link from 'next/link'
import { Import, MessageSquare, icons } from 'lucide-react'
import { UserButton, useUser } from '@clerk/nextjs'

import { DrowserStudio } from '@/components/icons/drowser-studio'
import { DrowserStudioIcon } from '@/components/icons/drowser-studio-icon'
import { ImportReport } from '@/components/import-report'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarHeader,
  SidebarSeparator
} from '@/components/ui/sidebar'
import { Button } from '@/components/ui/button'
import { ToggleTheme } from '@/components/toogle-theme'
import { Icon } from '@/components/ui/icon'

import { MenuType } from '@/lib/definitions'

const menus = [
  {
    label: 'Reports',
    path: '/studio/reports',
    icon: 'Files'
  },
  {
    label: 'Activities',
    path: '/studio/activities',
    icon: 'Activity'
  }
] as MenuType[]

export const AppSidebar = () => {
  const { user } = useUser()

  return (
    <Sidebar collapsible='icon'>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className='flex items-center'>
              <Link href='/'>
                <DrowserStudioIcon />
                <span>
                  <DrowserStudio width={175} height={50} />
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>General</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menus.map((menu) => (
                <SidebarMenuItem key={menu.label}>
                  <SidebarMenuButton asChild>
                    <Link href={menu.path}>
                      <Icon name={menu.icon as keyof typeof icons} size={20} />
                      <span>{menu.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Report</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu></SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <ImportReport>
              <SidebarMenuButton asChild>
                <Button variant='ghost' className='w-full justify-start'>
                  <Import className='mr-2 h-4 w-4' />
                  <span>Import report</span>
                </Button>
              </SidebarMenuButton>
            </ImportReport>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Button variant='ghost' className='w-full justify-start'>
                <MessageSquare className='mr-2 h-4 w-4' />
                <span>Feedback</span>
              </Button>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Button variant='ghost' className='w-full justify-start'>
                <ToggleTheme />
              </Button>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarSeparator />

          <SidebarMenuItem>
            <SidebarMenuButton asChild size={'lg'}>
              <Link href='#'>
                <UserButton />
                <span>{user?.fullName}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
