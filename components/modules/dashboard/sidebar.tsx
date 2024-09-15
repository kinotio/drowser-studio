'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  ClipboardIcon,
  BarChartBigIcon,
  ClipboardListIcon,
  FlaskConicalIcon,
  PencilIcon,
  NetworkIcon,
  GlobeIcon,
  ConstructionIcon,
  SettingsIcon
} from 'lucide-react'
import { useRouter, usePathname, useParams } from 'next/navigation'

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

import { PATH } from '@/lib/constants'

import { useStore } from '@/hooks/use-store'
import { useReportStore } from '@/hooks/use-report-store'

import { TDrowserReport, TContentCase } from '@/lib/definitions'

import { readableTimestamp } from '@/lib/utils'

const Sidebar = () => {
  const report = useStore(useReportStore, (state) => state.content)

  const router = useRouter()
  const pathName = usePathname()
  const params = useParams()

  const [content, setContent] = useState<TDrowserReport>()

  const browserCases = content?.drowser.cases.map((c: TContentCase) => c.browser)
  const uniqueBrowsers = Array.from(new Set(browserCases))

  useEffect(() => {
    try {
      setContent(JSON.parse(report as string))
    } catch (error) {}
  }, [report])

  return (
    <div className='flex-1 overflow-auto border-r'>
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
  )
}

export { Sidebar }
