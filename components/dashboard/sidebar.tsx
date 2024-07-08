'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  ClipboardIcon,
  GithubIcon,
  BarChartBigIcon,
  ClipboardListIcon,
  LogOutIcon,
  FlaskConicalIcon,
  PencilIcon,
  EyeIcon,
  GlobeIcon
} from 'lucide-react'
import { useRouter, usePathname, useParams } from 'next/navigation'

import { Badge } from '@/components/ui/badge'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Button } from '@/components/ui/button'

import { Import } from '@/components/dashboard/import'
import { Settings } from '@/components/dashboard/settings'

import { APP_VERSION, PATH } from '@/lib/constants'

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

  const handleQuit = () => {
    useReportStore.persist.clearStorage()
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
    <div className='w-1/4 border-r bg-gray-100/40 lg:block dark:bg-gray-800/40'>
      <div className='flex flex-col gap-2 h-full'>
        <div className='flex h-[60px] items-center px-6 border-b'>
          <Link className='flex items-center font-bold' href='/dashboard'>
            <Image
              src='/images/drowser-black.png'
              width={200}
              height={200}
              alt='Drowser Studio Logo'
            />
          </Link>
        </div>

        <div className='flex-1 overflow-auto'>
          <nav className='grid items-start px-4 text-sm font-medium'>
            <Link
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 ${pathName === PATH.DASHBOARD ? 'text-gray-900' : ''}`}
              href='/dashboard'
            >
              <BarChartBigIcon className='h-4 w-4' />
              Dashboard
            </Link>
            <Collapsible className='grid'>
              <CollapsibleTrigger
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 ${pathName.startsWith(PATH.DASHBOARD_CASES) ? 'text-gray-900' : ''}`}
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
                      className={`flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 ${pathName.startsWith(PATH.DASHBOARD_CASES) ? 'text-gray-900' : ''}`}
                    >
                      <div className='flex items-center gap-3 capitalize'>
                        <GlobeIcon className='h-4 w-4' />
                        {browser}
                      </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      {content?.drowser.cases.map((c: TContentCase) => (
                        <>
                          {c.browser === browser ? (
                            <Link
                              key={c.id}
                              className={`ml-6 flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 ${pathName.startsWith(PATH.DASHBOARD_CASES) && params.id === c.id ? 'text-gray-900' : ''}`}
                              href={`/dashboard/cases/${c.id}`}
                            >
                              <ClipboardIcon className='h-4 w-4' />
                              {readableTimestamp(c.time)}
                            </Link>
                          ) : null}
                        </>
                      ))}
                    </CollapsibleContent>
                  </Collapsible>
                ))}
              </CollapsibleContent>
            </Collapsible>
            <Link
              className='pointer-events-none flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50'
              href='/dashboard/visualize'
            >
              <EyeIcon className='h-4 w-4' />
              Visualize
            </Link>
            <Link
              className='pointer-events-none flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50'
              href='/dashboard/ia'
            >
              <FlaskConicalIcon className='h-4 w-4' />
              Drowser AI
            </Link>
            <Link
              className='pointer-events-none flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50'
              href='/dashboard/playground'
            >
              <PencilIcon className='h-4 w-4' />
              Playground
            </Link>
            <Link
              className='pointer-events-none flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50'
              href='#'
            >
              <Settings />
            </Link>
          </nav>
        </div>

        <div className='flex flex-col border-t'>
          <Import />

          <Button size='lg' variant='outline' className='mb-4 mx-4' onClick={handleQuit}>
            Quit <LogOutIcon className='ml-2' />
          </Button>

          <div className='flex h-[60px] py-6 px-6 items-end justify-between'>
            <Badge>{APP_VERSION}</Badge>
            <Link href={'https://github.com/kinotio/drowser-studio'}>
              <GithubIcon />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export { Sidebar }
