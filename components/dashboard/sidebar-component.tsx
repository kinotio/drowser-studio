'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ClipboardIcon, GithubIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { Badge } from '@/components/ui/badge'

import { APP_VERSION } from '@/constants'

import useReportStore from '@/stores/useReportStore'

import { TDrowserReport, TContentCase } from '@/types'

import { readableTimestamp } from '@/utils'

export default function SidebarComponent() {
  const report = useReportStore((state) => state.content)

  const router = useRouter()

  const [content, setContent] = useState<TDrowserReport>()

  useEffect(() => {
    if (report === '') return router.push('/')
    setContent(JSON.parse(report))
  }, [report])

  return (
    <div className='hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40'>
      <div className='flex flex-col gap-2 h-full'>
        <div className='flex h-[60px] items-center px-6'>
          <Link className='flex items-center font-bold' href='/dashboard'>
            <Image src='/images/drowser-black.png' width={100} height={100} alt='Drowser Logo' />
          </Link>
        </div>

        <div className='flex-1'>
          <nav className='grid items-start px-4 text-sm font-medium'>
            {content?.drowser.cases.map((c: TContentCase) => (
              <Link
                key={c.id}
                className='flex items-center gap-3 rounded-lg px-3 py-2 text-gray-900 transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50'
                href={`/dashboard/cases/${c.id}`}
              >
                <ClipboardIcon className='h-4 w-4' />
                {readableTimestamp(c.time)}
              </Link>
            ))}
          </nav>
        </div>

        <div className='flex h-[60px] py-6 px-6 items-end justify-between'>
          <Badge>{APP_VERSION}</Badge>
          <Link href={'https://github.com/kinotio/drowser'}>
            <GithubIcon />
          </Link>
        </div>
      </div>
    </div>
  )
}
