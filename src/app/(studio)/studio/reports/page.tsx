'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import {
  ChevronDownIcon,
  LayoutListIcon,
  LayoutGridIcon,
  MoreVerticalIcon,
  Trash2Icon,
  RefreshCcwIcon
} from 'lucide-react'
import { useAuth } from '@clerk/nextjs'
import { toast } from 'sonner'
import axios from 'axios'

import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

import { readableTimestamp } from '@/lib/utils'
import { pocketbase } from '@/lib/pocketbase'
import { Report, Activity } from '@/lib/definitions'

type ViewType = 'list' | 'card'

const Page = () => {
  const { userId } = useAuth()

  const [reports, setReports] = useState<Report[]>([])
  const [viewType, setViewType] = useState<ViewType>('card')
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [total, setTotal] = useState<number>(0)
  const [reportToRemove, setReportToRemove] = useState<string | null>(null)

  const itemsPerPage = 12

  const totalPages = Math.ceil(total / itemsPerPage)

  const handlePageChange = (pageNumber: number) => setCurrentPage(pageNumber)

  const fetchReports = useCallback(() => {
    pocketbase
      .collection('reports')
      .getList(currentPage, itemsPerPage, {
        filter: `name ~ "${searchTerm}" && user_id = "${userId}"`
      })
      .then((data) => {
        setReports(data.items as Report[])
        setTotal(data.totalItems)
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false))
  }, [currentPage, itemsPerPage, searchTerm, userId])

  const handleRemoveReport = (reportId: string) => {
    toast.promise(pocketbase.collection('reports').delete(reportId), {
      loading: 'Deleting report',
      success: async () => {
        setReportToRemove(null)
        fetchReports()

        const device = (await axios.get('/api/device')).data.device

        await pocketbase.collection('activities').create<Activity>({
          type: 'report_deleted',
          description: 'Report deleted',
          user_id: userId,
          device
        })

        return 'Report deleted'
      },
      error: () => 'An error occurred while deleting report'
    })
  }

  useEffect(() => {
    fetchReports()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, currentPage, searchTerm])

  return (
    <div className='container mx-auto p-4'>
      <div className='flex justify-end items-center mb-8'>
        <div className='flex items-center gap-2'>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant={'outline'} onClick={fetchReports}>
                <RefreshCcwIcon className='h-4 w-4' size={20} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <span>Refresh Reports</span>
            </TooltipContent>
          </Tooltip>

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

      {Array.isArray(reports) && reports.length === 0 ? (
        <Alert>
          <AlertTitle>No reports available</AlertTitle>
          <AlertDescription>There are currently no reports to display.</AlertDescription>
        </Alert>
      ) : viewType === 'list' ? (
        <ListView reports={reports} setReportToRemove={setReportToRemove} />
      ) : (
        <CardView isLoading={isLoading} reports={reports} setReportToRemove={setReportToRemove} />
      )}

      {!isLoading && reports.length !== 0 ? (
        <ReportsPagination
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      ) : null}

      <ConfirmRemoveDialog
        isOpen={reportToRemove !== null}
        onClose={() => setReportToRemove(null)}
        onConfirm={() => reportToRemove && handleRemoveReport(reportToRemove)}
      />
    </div>
  )
}

const ListView = ({
  reports,

  setReportToRemove
}: {
  reports: Report[]

  setReportToRemove: (reportId: string) => void
}) => {
  return (
    <ul className='space-y-4 flex flex-col gap-2'>
      {reports.map((report) => (
        <li
          key={report.id}
          className='border rounded-lg p-4 hover:bg-gray-50 flex justify-between items-start'
        >
          <div>
            <Link href={`/studio/reports/${report.slug}`}>
              <h2 className='text-lg font-semibold'>{report.name}</h2>
            </Link>
            <p className='text-gray-600'>{report.slug}</p>
            <p className='text-sm text-gray-500 mt-2'>Date: {readableTimestamp(report.created)}</p>
          </div>
          <ReportMenu reportId={report.id} setReportToRemove={setReportToRemove} />
        </li>
      ))}
    </ul>
  )
}

const CardView = ({
  reports,
  isLoading,

  setReportToRemove
}: {
  reports: Report[]
  isLoading: boolean

  setReportToRemove: (reportId: string) => void
}) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
      {isLoading ? (
        <>
          {Array.from({ length: 3 }).map((_, idx) => (
            <Card key={idx}>
              <Skeleton className='h-[175px] rounded-xl' />
            </Card>
          ))}
        </>
      ) : (
        <>
          {reports.map((report) => (
            <Card key={report.id}>
              <CardHeader className='flex flex-row items-start justify-between space-y-0'>
                <div>
                  <Link href={`/studio/reports/${report.slug}`}>
                    <CardTitle>{report.name}</CardTitle>
                  </Link>
                  <CardDescription>{report.slug}</CardDescription>
                </div>
                <ReportMenu reportId={report.id} setReportToRemove={setReportToRemove} />
              </CardHeader>
              <CardFooter>
                <p className='text-sm text-gray-500'>Date: {readableTimestamp(report.created)}</p>
              </CardFooter>
            </Card>
          ))}
        </>
      )}
    </div>
  )
}

const ReportsPagination = ({
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

const ReportMenu = ({
  reportId,
  setReportToRemove
}: {
  reportId: string
  setReportToRemove: (reportId: string) => void
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='icon' className='h-8 w-8 p-0'>
          <span className='sr-only'>Open menu</span>
          <MoreVerticalIcon className='h-4 w-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem
          onClick={() => setReportToRemove(reportId)}
          className='text-red-600 cursor-pointer'
        >
          <Trash2Icon className='mr-2 h-4 w-4' />
          Remove
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const ConfirmRemoveDialog = ({
  isOpen,
  onClose,
  onConfirm
}: {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Removal</DialogTitle>
          <DialogDescription>
            Are you sure you want to remove this report? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant='outline' onClick={onClose}>
            Cancel
          </Button>
          <Button variant='destructive' onClick={onConfirm}>
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default Page
