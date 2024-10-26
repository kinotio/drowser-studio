'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronDownIcon, LayoutListIcon, LayoutGridIcon, FilesIcon } from 'lucide-react'
import { useAuth } from '@clerk/nextjs'

import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination'

import { readableTimestamp } from '@/lib/utils'
import { pocketbase } from '@/lib/pocketbase'
import { Input } from '@/components/ui/input'

type ViewType = 'list' | 'card'

type ReportMetadata = {
  drowser?: Record<string, unknown>
}

type ReportItem = {
  collectionId: string
  collectionName: string
  created: string
  id: string
  metadata: ReportMetadata
  name: string
  slug: string
  updated: string
  user_id: string
}

// type ReportList = {
//   items: Array<ReportItem>
//   page: number
//   perPage: number
//   totalItems: number
//   totalPages: number
// }

const Page = () => {
  const { userId } = useAuth()

  const [reports, setReports] = useState<ReportItem[]>([])
  const [viewType, setViewType] = useState<ViewType>('card')
  const [isLoading, setIsLoading] = useState<boolean>(true)
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const [_, setSearchTerm] = useState<string>('')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [total, setTotal] = useState<number>(0)

  const itemsPerPage = 12

  const totalPages = Math.ceil(total / itemsPerPage)

  const handlePageChange = (pageNumber: number) => setCurrentPage(pageNumber)

  useEffect(() => {
    pocketbase
      .collection('reports')
      .getList(currentPage, itemsPerPage, { requestKey: null, filter: `user_id = "${userId}"` })
      .then((data) => {
        setReports(data.items as ReportItem[])
        setTotal(data.totalItems)
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false))
  }, [userId, currentPage])

  return (
    <div className='container mx-auto p-4'>
      <div className='flex justify-between items-center mb-6'>
        <div>
          <Badge variant='secondary' className='flex gap-2'>
            <FilesIcon size={20} />
            <span className='text-xl font-bold'>Reports</span>
          </Badge>
        </div>

        <div className='flex items-center gap-2'>
          <Input
            name='search'
            type='text'
            placeholder='Search report...'
            onChange={(e) => setSearchTerm(e.target.value)}
          />

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

      {viewType === 'list' ? (
        <ListView reports={reports} />
      ) : (
        <CardView reports={reports} isLoading={isLoading} />
      )}

      {!isLoading && reports.length !== 0 ? (
        <PagePagination
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      ) : null}
    </div>
  )
}

const ListView = ({ reports }: { reports: ReportItem[] }) => {
  return (
    <ul className='space-y-4 flex flex-col gap-2'>
      {reports.map((report) => (
        <Link href={`/studio/reports/${report.slug}`} key={report.id}>
          <li className='border rounded-lg p-4 hover:bg-gray-50'>
            <h2 className='text-lg font-semibold'>{report.name}</h2>
            <p className='text-sm'>{report.slug}</p>
            <p className='text-sm text-gray-500 mt-2'>Date: {readableTimestamp(report.created)}</p>
          </li>
        </Link>
      ))}
    </ul>
  )
}

const CardView = ({ reports, isLoading }: { reports: ReportItem[]; isLoading: boolean }) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
      {isLoading ? (
        <>
          {Array.from({ length: 3 }).map((_, idx) => (
            <Skeleton key={idx} className='h-[150px] w-[340px] rounded-xl' />
          ))}
        </>
      ) : (
        <>
          {reports.map((report) => (
            <Link href={`/studio/reports/${report.slug}`} key={report.id}>
              <Card>
                <CardHeader>
                  <CardTitle>{report.name}</CardTitle>
                  <CardDescription>{report.slug}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <p className='text-sm text-gray-500'>Date: {readableTimestamp(report.created)}</p>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </>
      )}
    </div>
  )
}

const PagePagination = ({
  currentPage,
  totalPages,
  handlePageChange
}: {
  currentPage: number
  totalPages: number
  handlePageChange: (page: number) => void
}) => {
  return (
    <Pagination className='my-20'>
      <PaginationContent>
        <PaginationItem>
          {currentPage !== 1 ? (
            <PaginationPrevious href='#' onClick={() => handlePageChange(currentPage - 1)} />
          ) : null}
        </PaginationItem>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <PaginationItem key={page}>
            <PaginationLink isActive={page === currentPage} onClick={() => handlePageChange(page)}>
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          {currentPage !== totalPages ? (
            <PaginationNext onClick={() => handlePageChange(currentPage + 1)} />
          ) : null}
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export default Page
