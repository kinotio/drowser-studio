'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronDownIcon, LayoutListIcon, LayoutGridIcon, FilesIcon } from 'lucide-react'

import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'

import { Import } from '@/components/modules/import'

import { useReports } from '@/hooks/use-reports'

import { Report } from '@/lib/definitions'
import { readableTimestamp } from '@/lib/utils'
import { PATH } from '@/lib/constants'

type ViewType = 'list' | 'card'

const Page = () => {
  const [viewType, setViewType] = useState<ViewType>('card')

  const { reports } = useReports()

  return (
    <div className='container mx-auto p-4'>
      <div className='flex justify-between items-center mb-6'>
        <div>
          <Badge variant='secondary' className='flex gap-2'>
            <FilesIcon size={20} />
            <span className='text-2xl font-bold'>Reports</span>
          </Badge>
        </div>

        <div className='flex items-center gap-2'>
          <Import>
            <Button>Import Report</Button>
          </Import>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='outline'>
                {viewType === 'list' ? (
                  <LayoutListIcon className='mr-2 h-4 w-4' />
                ) : (
                  <LayoutGridIcon className='mr-2 h-4 w-4' />
                )}
                View
                <ChevronDownIcon className='ml-2 h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setViewType('list')}>
                <LayoutListIcon className='mr-2 h-4 w-4' />
                List View
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setViewType('card')}>
                <LayoutGridIcon className='mr-2 h-4 w-4' />
                Card View
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {viewType === 'list' ? <ListView reports={reports} /> : <CardView reports={reports} />}
    </div>
  )
}

function ListView({ reports }: { reports: Report[] }) {
  return (
    <ul className='space-y-4 flex flex-col gap-2'>
      {reports.map((report) => (
        <Link href={`${PATH.DASHBOARD_REPORTS}/${report.slug}`} key={report.id}>
          <li className='border rounded-lg p-4 hover:bg-gray-50'>
            <h2 className='text-lg font-semibold'>{report.name}</h2>
            <p className='text-sm'>{report.slug}</p>
            <p className='text-sm text-gray-500 mt-2'>
              Date: {readableTimestamp(report.created_at)}
            </p>
          </li>
        </Link>
      ))}
    </ul>
  )
}

function CardView({ reports }: { reports: Report[] }) {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
      {reports.map((report) => (
        <Link href={`${PATH.DASHBOARD_REPORTS}/${report.slug}`} key={report.id}>
          <Card>
            <CardHeader>
              <CardTitle>{report.name}</CardTitle>
              <CardDescription>{report.slug}</CardDescription>
            </CardHeader>
            <CardFooter>
              <p className='text-sm text-gray-500'>Date: {readableTimestamp(report.created_at)}</p>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  )
}

export default Page
