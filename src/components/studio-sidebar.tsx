'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  Import,
  MessageSquare,
  icons,
  Clipboard,
  BarChartBig,
  ClipboardList,
  Globe,
  LifeBuoy,
  SquareStack
} from 'lucide-react'
import { UserButton, useUser, useAuth } from '@clerk/nextjs'
import { usePathname, useParams } from 'next/navigation'
import { isEmpty } from 'lodash'

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
  SidebarSeparator,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton
} from '@/components/ui/sidebar'
import { Button } from '@/components/ui/button'
import { ToggleTheme } from '@/components/toogle-theme'
import { Icon } from '@/components/ui/icon'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'

import { MenuType, TContentCase, Report } from '@/lib/definitions'
import { readableTimestamp } from '@/lib/utils'
import { PATH } from '@/lib/constants'
import { pocketbase } from '@/lib/pocketbase'

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

export const StudioSidebar = () => {
  const { user } = useUser()
  const pathName = usePathname()
  const params = useParams()
  const { userId } = useAuth()

  const [report, setReport] = useState<Report | null>(null)
  const [openBrowser, setOpenBrowser] = useState<string | null>(null)

  const paramsReportSlug = params.reportSlug as string

  const cases = Array.isArray(report?.metadata?.drowser?.cases)
    ? report?.metadata?.drowser?.cases
    : []
  const browserCases = cases.map((c: TContentCase) => c.browser)
  const uniqueBrowsers = Array.from(new Set(browserCases))

  useEffect(() => {
    pocketbase
      .collection('reports')
      .getFirstListItem('', {
        filter: `user_id = "${userId}" && slug = "${paramsReportSlug}"`
      })
      .then((data) => setReport(data as Report))
      .catch(() => setReport(null))
  }, [userId, paramsReportSlug])

  return (
    <Sidebar collapsible='icon'>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className='flex items-center'>
              <Link href='/'>
                <DrowserStudioIcon />
                <span>
                  <DrowserStudio width={175} height={70} />
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
                  <SidebarMenuButton asChild isActive={pathName === menu.path}>
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

        {!isEmpty(report) ? (
          <SidebarGroup>
            <SidebarGroupLabel>Report</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href={`${PATH.STUDIO_REPORTS}/${paramsReportSlug}`}>
                      <BarChartBig className='mr-2 h-4 w-4' />
                      <span>Overview</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <Collapsible defaultOpen className='group/collapsible'>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuItem>
                      <SidebarMenuButton>
                        <ClipboardList className='mr-2 h-4 w-4' />
                        <span>Cases</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {uniqueBrowsers.map((browser, idx) => (
                        <Collapsible
                          key={idx}
                          open={openBrowser === browser}
                          onOpenChange={() =>
                            setOpenBrowser(openBrowser === browser ? null : browser)
                          }
                        >
                          <CollapsibleTrigger asChild>
                            <SidebarMenuSubItem>
                              <SidebarMenuSubButton>
                                <Globe className='mr-2 h-4 w-4' />
                                <span className='capitalize'>{browser}</span>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          </CollapsibleTrigger>
                          <CollapsibleContent>
                            <SidebarMenuSub>
                              {cases
                                .filter((c) => c.browser === browser)
                                .map((c) => (
                                  <SidebarMenuSubItem key={c.id}>
                                    <SidebarMenuSubButton asChild>
                                      <Link
                                        href={`${PATH.STUDIO_REPORTS}/${paramsReportSlug}/cases/${c.id}`}
                                      >
                                        <Clipboard className='mr-2 h-4 w-4' />
                                        <span>{readableTimestamp(c.time)}</span>
                                      </Link>
                                    </SidebarMenuSubButton>
                                  </SidebarMenuSubItem>
                                ))}
                            </SidebarMenuSub>
                          </CollapsibleContent>
                        </Collapsible>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </Collapsible>

                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href={`${PATH.STUDIO_REPORTS}/${paramsReportSlug}/visualize`}>
                      <SquareStack className='mr-2 h-4 w-4 -rotate-90' />
                      <span>Visualize</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ) : null}

        <SidebarGroup>
          <SidebarGroupLabel>Help</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href={`mailto:support@kinotio.io`}>
                    <LifeBuoy className='mr-2 h-4 w-4' />
                    <span>Support</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href={`https://github.com/kinotio/drowser-studio/issues`}>
                    <MessageSquare className='mr-2 h-4 w-4' />
                    <span>Feedback</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
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
                <ToggleTheme />
              </Button>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarSeparator />

          <SidebarMenuItem>
            <SidebarMenuButton asChild size={'lg'}>
              <div className='flex items-center'>
                <UserButton />
                <div className='flex flex-col gap-1'>
                  <span>{user?.fullName}</span>
                  <span className='text-xs'>{user?.emailAddresses[0].emailAddress}</span>
                </div>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
