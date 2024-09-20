'use client'

import Link from 'next/link'
import {
  ClipboardIcon,
  BarChartBigIcon,
  ClipboardListIcon,
  FlaskConicalIcon,
  PencilIcon,
  NetworkIcon,
  GlobeIcon,
  ConstructionIcon
} from 'lucide-react'
import { usePathname, useParams } from 'next/navigation'

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

import { TContentCase } from '@/lib/definitions'
import { readableTimestamp } from '@/lib/utils'
import { PATH } from '@/lib/constants'

import { useReport } from '@/hooks/use-report'

const Sidebar = () => {
  const pathName = usePathname()
  const params = useParams()

  const paramsReportSlug = params.reportSlug as string
  const { report } = useReport({ reportSlug: paramsReportSlug })

  const browserCases = report?.drowser.cases.map((c: TContentCase) => c.browser)
  const uniqueBrowsers = Array.from(new Set(browserCases))

  return (
    <div className='flex-1 overflow-auto'>
      <nav className='grid items-start px-4 text-sm font-medium mt-2'>
        <Link
          className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${pathName === PATH.DASHBOARD_REPORT ? 'text-black dark:text-white' : ''}`}
          href={`${PATH.DASHBOARD_REPORTS}/${paramsReportSlug}`}
        >
          <BarChartBigIcon className='h-4 w-4' />
          Overwiew
        </Link>

        <Collapsible className='grid'>
          <CollapsibleTrigger
            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${pathName.startsWith(PATH.DASHBOARD_REPORT_CASES) ? 'text-black dark:text-white' : ''}`}
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
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${pathName.startsWith(PATH.DASHBOARD_REPORT_CASES) ? 'text-black dark:text-white' : ''}`}
                >
                  <div className='flex items-center gap-3 capitalize'>
                    <GlobeIcon className='h-4 w-4' />
                    {browser}
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  {report?.drowser.cases.map((c: TContentCase, idx) => (
                    <div key={idx}>
                      {c.browser === browser ? (
                        <Link
                          key={c.id}
                          className={`ml-6 flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${pathName.startsWith(PATH.DASHBOARD_REPORT_CASES) && params.id === c.id ? 'text-black dark:text-white' : ''}`}
                          href={`${PATH.DASHBOARD_REPORTS}/${paramsReportSlug}/cases/${c.id}`}
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
            href={`${PATH.DASHBOARD_REPORTS}/${paramsReportSlug}/visualize`}
          >
            <NetworkIcon className='h-4 w-4 -rotate-90' />
            Visualize
          </Link>
        </div>

        <div className='flex'>
          <Link
            className='pointer-events-none flex items-center gap-3 rounded-lg px-3 py-2 transition-all'
            href={`${PATH.DASHBOARD_REPORTS}/${paramsReportSlug}/ai`}
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
            href={`${PATH.DASHBOARD_REPORTS}/${paramsReportSlug}/playground`}
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
      </nav>
    </div>
  )
}

export { Sidebar }
