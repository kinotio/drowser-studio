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
  SquareStack,
  FileText,
  Shield,
  Logs
} from 'lucide-react'
import { useUser, useAuth, UserButton } from '@clerk/nextjs'
import { usePathname, useParams } from 'next/navigation'
import { isEmpty } from 'lodash'

import { DrowserStudio } from '@/components/icons/drowser-studio'
import { KinotioIcon } from '@/components/icons/kinotio-icon'
import { ImportReport } from '@/components/studio/import-report'
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

import { MenuType, TContentCase } from '@/lib/definitions'
import { readableTimestamp } from '@/lib/utils'
import { PATH } from '@/lib/constants'

import { getReport } from '@/server/actions'
import type { ReportWithTimestamps } from '@/server/types/extended'
import type { ReportModiefied } from '@/server/databases/types'

const menus = [
  {
    label: 'Home',
    path: '/studio',
    icon: 'House'
  },
  {
    label: 'Reports',
    path: '/studio/reports',
    icon: 'Files'
  }
] as MenuType[]

export const StudioSidebar = () => {
  const { user } = useUser()
  const pathName = usePathname()
  const params = useParams()
  const { userId } = useAuth()

  const [report, setReport] = useState<ReportModiefied | null>(null)
  const [openBrowser, setOpenBrowser] = useState<string | null>(null)

  const paramsReportSlug = params.reportSlug as string

  const cases = Array.isArray(report?.metadata?.drowser?.cases)
    ? report?.metadata?.drowser?.cases
    : []
  const browserCases = cases.map((c: TContentCase) => c.browser)
  const uniqueBrowsers = Array.from(new Set(browserCases))

  useEffect(() => {
    if (userId && paramsReportSlug) {
      getReport({ userId: userId as string, reportSlug: paramsReportSlug })
        .then((response) => {
          if (response.success && response.data) {
            // Get report from the response data
            setReport(response.data as ReportWithTimestamps & ReportModiefied)
          } else {
            console.error('Error fetching report for sidebar:', response.error)
            setReport(null)
          }
        })
        .catch(() => setReport(null))
    }
  }, [userId, paramsReportSlug])

  return (
    <Sidebar collapsible='icon'>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href='/' className='flex items-center gap-2'>
                <KinotioIcon />
                <span>
                  <DrowserStudio width={150} height={70} />
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
                  <SidebarMenuButton
                    asChild
                    isActive={pathName === `${PATH.STUDIO_REPORTS}/${paramsReportSlug}`}
                  >
                    <Link href={`${PATH.STUDIO_REPORTS}/${paramsReportSlug}`}>
                      <BarChartBig className='h-4 w-4' />
                      <span>Overview</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <Collapsible defaultOpen className='group/collapsible'>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        isActive={pathName.startsWith(
                          `${PATH.STUDIO_REPORTS}/${paramsReportSlug}/cases`
                        )}
                      >
                        <ClipboardList className='h-4 w-4' />
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
                                <Globe className='h-4 w-4' />
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
                                    <SidebarMenuSubButton
                                      asChild
                                      isActive={pathName.startsWith(
                                        `${PATH.STUDIO_REPORTS}/${paramsReportSlug}/cases/${c.id}`
                                      )}
                                    >
                                      <Link
                                        href={`${PATH.STUDIO_REPORTS}/${paramsReportSlug}/cases/${c.id}`}
                                      >
                                        <Clipboard className='h-4 w-4' />
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
                  <SidebarMenuButton
                    asChild
                    isActive={pathName === `${PATH.STUDIO_REPORTS}/${paramsReportSlug}/visualize`}
                  >
                    <Link href={`${PATH.STUDIO_REPORTS}/${paramsReportSlug}/visualize`}>
                      <SquareStack className='h-4 w-4 -rotate-90' />
                      <span>Visualize</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ) : null}

        <SidebarGroup>
          <SidebarGroupLabel>Activities</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href={'/studio/activities/logs'}>
                    <Logs className='h-4 w-4' />
                    <span>Logs</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Help</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href={`mailto:support@kinotio.io`}>
                    <LifeBuoy className='h-4 w-4' />
                    <span>Support</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href={`https://github.com/kinotio/drowser-studio/issues`} target='_blank'>
                    <MessageSquare className='h-4 w-4' />
                    <span>Feedback</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Legal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href={'/studio/legal/terms'}>
                    <FileText className='h-4 w-4' />
                    <span>Terms of Service</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href={'/studio/legal/privacy'}>
                    <Shield className='h-4 w-4' />
                    <span>Privacy Policy</span>
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
                <Button
                  variant='default'
                  className='w-full justify-start bg-primary hover:bg-orange-600 hover:text-white'
                >
                  <Import className='h-4 w-4' />
                  <span>Import Report</span>
                </Button>
              </SidebarMenuButton>
            </ImportReport>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Button variant='ghost' className='w-full justify-start'>
                <ToggleTheme inStudio />
              </Button>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarSeparator />

          <SidebarMenuItem>
            <SidebarMenuButton asChild size={'lg'}>
              <div className='flex items-center gap-4 w-full'>
                <UserButton />
                <div className='flex items-center justify-between w-full'>
                  <span>{user?.firstName?.split(' ')[0]}</span>
                </div>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
