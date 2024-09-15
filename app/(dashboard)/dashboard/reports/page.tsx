'use client'

import { useState } from 'react'
import { ChevronDownIcon, LayoutListIcon, LayoutGridIcon, FilesIcon } from 'lucide-react'

import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'

type ViewType = 'list' | 'card'

type Report = {
  id: number
  title: string
  date: string
}

const reports: Report[] = [
  {
    id: 1,
    title: 'Q1 Financial Report',
    date: '2023-04-01'
  },
  {
    id: 2,
    title: 'Q2 Financial Report',
    date: '2023-07-01'
  },
  {
    id: 3,
    title: 'Q3 Financial Report',
    date: '2023-10-01'
  },
  {
    id: 4,
    title: 'Annual Report 2023',
    date: '2024-01-15'
  }
]

const Page = () => {
  const [viewType, setViewType] = useState<ViewType>('card')

  return (
    <div className='container mx-auto p-4'>
      <div className='flex justify-between items-center mb-6'>
        <div>
          <Badge variant='secondary' className='flex gap-2'>
            <FilesIcon size={20} />
            <span className='text-2xl font-bold'>Reports</span>
          </Badge>
        </div>

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

      {viewType === 'list' ? <ListView reports={reports} /> : <CardView reports={reports} />}
    </div>
  )
}

function ListView({ reports }: { reports: Report[] }) {
  return (
    <ul className='space-y-4'>
      {reports.map((report) => (
        <li key={report.id} className='border rounded-lg p-4 hover:bg-gray-50'>
          <h2 className='text-lg font-semibold'>{report.title}</h2>

          <p className='text-sm text-gray-500 mt-2'>Date: {report.date}</p>
        </li>
      ))}
    </ul>
  )
}

function CardView({ reports }: { reports: Report[] }) {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
      {reports.map((report) => (
        <Card key={report.id}>
          <CardHeader>
            <CardTitle>{report.title}</CardTitle>
          </CardHeader>
          <CardFooter>
            <p className='text-sm text-gray-500'>Date: {report.date}</p>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

export default Page
