'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  ClipboardIcon,
  GithubIcon,
  BarChartBigIcon,
  ClipboardListIcon,
  LogOutIcon,
  FlaskConicalIcon,
  PencilIcon,
  NetworkIcon,
  GlobeIcon,
  ConstructionIcon,
  SettingsIcon
} from 'lucide-react'
import { useRouter, usePathname, useParams } from 'next/navigation'
import { deleteCookie } from 'cookies-next'

import { Badge } from '@/components/ui/badge'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { DrowserStudioLogo } from '@/components/svg/drowser-studio-logo'

import { Import } from '@/components/modules/dashboard/import'
import { Settings } from '@/components/modules/dashboard/settings'

import { APP_VERSION, PATH } from '@/lib/constants'

import { useStore } from '@/hooks/use-store'
import { useReportStore } from '@/hooks/use-report-store'
import { useConfigStore } from '@/hooks/use-config-store'

import { TDrowserReport, TContentCase } from '@/lib/definitions'

import { readableTimestamp } from '@/lib/utils'

const Sidebar = () => {
  const report = useStore(useReportStore, (state) => state.content)

  const router = useRouter()
  const pathName = usePathname()
  const params = useParams()

  const [content, setContent] = useState<TDrowserReport>()

  const handleQuit = () => {
    useReportStore.persist.clearStorage()
    useConfigStore.persist.clearStorage()
    deleteCookie('session-active')
    router.push('/')
  }

  const browserCases = content?.drowser.cases.map((c: TContentCase) => c.browser)
  const uniqueBrowsers = Array.from(new Set(browserCases))

  useEffect(() => {
    try {
      setContent(JSON.parse(report as string))
    } catch (error) {}
  }, [report])

  return (
    <div className='w-1/4 border-r lg:block'>
      <div className='flex flex-col gap-2 h-full'>
        <div className='flex h-[60px] items-center px-6 border-b'>
          <Link className='flex items-center font-bold' href='/dashboard'>
            <DrowserStudioLogo width={200} height={100} />
          </Link>
        </div>

        <div className='flex-1 overflow-auto'>
          <nav className='grid items-start px-4 text-sm font-medium'>
            <Link
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${pathName === PATH.DASHBOARD ? 'text-black dark:text-white' : ''}`}
              href='/dashboard'
            >
              <BarChartBigIcon className='h-4 w-4' />
              Dashboard
            </Link>

            <Collapsible className='grid'>
              <CollapsibleTrigger
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${pathName.startsWith(PATH.DASHBOARD_CASES) ? 'text-black dark:text-white' : ''}`}
              >
                <div className='flex items-center gap-3'>
                  <ClipboardListIcon className='h-4 w-4' />
                  Cases
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent className='grid px-4 overflow-auto'>
                {uniqueBrowsers.map((browser, idx) => (
                  <Collapsible key={idx} className='grid'>
                    <CollapsibleTrigger
                      className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${pathName.startsWith(PATH.DASHBOARD_CASES) ? 'text-black dark:text-white' : ''}`}
                    >
                      <div className='flex items-center gap-3 capitalize'>
                        <GlobeIcon className='h-4 w-4' />
                        {browser}
                      </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      {content?.drowser.cases.map((c: TContentCase, idx) => (
                        <div key={idx}>
                          {c.browser === browser ? (
                            <Link
                              key={c.id}
                              className={`ml-6 flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${pathName.startsWith(PATH.DASHBOARD_CASES) && params.id === c.id ? 'text-black dark:text-white' : ''}`}
                              href={`/dashboard/cases/${c.id}`}
                            >
                              <ClipboardIcon className='h-4 w-4' />
                              {readableTimestamp(c.time)}
                            </Link>
                          ) : null}
                        </div>
                      ))}
                    </CollapsibleContent>
                  </Collapsible>
                ))}
              </CollapsibleContent>
            </Collapsible>

            <div className='flex'>
              <Link
                className='flex items-center gap-3 rounded-lg px-3 py-2 transition-all'
                href='/dashboard/visualize'
              >
                <NetworkIcon className='h-4 w-4 -rotate-90' />
                Visualize
              </Link>
            </div>

            <div className='flex'>
              <Link
                className='pointer-events-none flex items-center gap-3 rounded-lg px-3 py-2 transition-all'
                href='/dashboard/ia'
              >
                <FlaskConicalIcon className='h-4 w-4' />
                Drowser AI
              </Link>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <ConstructionIcon className='text-yellow-400 h-4 w-4' />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Under construction</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <div className='flex'>
              <Link
                className='pointer-events-none flex items-center gap-3 rounded-lg px-3 py-2 transition-all'
                href='/dashboard/playground'
              >
                <PencilIcon className='h-4 w-4' />
                Playground
              </Link>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <ConstructionIcon className='text-yellow-400 h-4 w-4' />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Under construction</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <Link
              className='flex items-center gap-3 rounded-lg px-3 py-2 transition-all'
              href='/dashboard/settings'
            >
              <SettingsIcon className='h-4 w-4' />
              Settings
            </Link>
          </nav>
        </div>

        <div className='flex flex-col border-t'>
          <Import />

          <Button size='lg' variant='outline' className='mb-4 mx-4' onClick={handleQuit}>
            Quit <LogOutIcon className='ml-2' />
          </Button>

          <div className='flex h-[60px] py-6 px-6 items-center justify-between'>
            <Badge>{APP_VERSION}</Badge>
            <div className='flex items-center gap-2'>
              <Link href={'https://github.com/kinotio/drowser-studio'}>
                <GithubIcon size={20} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export { Sidebar }
