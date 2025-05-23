'use client'

import { useState, useEffect, useCallback } from 'react'
import { SearchIcon, FilterIcon, Calendar as CalendarIcon, icons } from 'lucide-react'
import { format } from 'date-fns'
import { DateRange } from 'react-day-picker'
import { useAuth } from '@clerk/nextjs'

import { Card, CardHeader, CardDescription, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from '@/components/ui/table'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext
} from '@/components/ui/pagination'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Icon } from '@/components/ui/icon'
import { Skeleton } from '@/components/ui/skeleton'

import { readableTimestamp, formatToReadable, cn } from '@/lib/utils'
import { LOG_TYPES, deviceIcons } from '@/lib/constants'

import { getAllLogs, countLogs } from '@/server/actions'
import type { LogWithTimestamps } from '@/server/types/extended'

import { useEvents, EventTypes } from '@/hooks/use-events'

const Page = () => {
  const { userId } = useAuth()
  const { events } = useEvents((event) => event.type === EventTypes.REPORT_IMPORTED)

  const [logs, setLogs] = useState<LogWithTimestamps[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [filters, setFilters] = useState({
    type: ''
  })
  const [date, setDate] = useState<DateRange | undefined>()
  const [total, setTotal] = useState<number>(0)

  const itemsPerPage = 9

  const totalPages = Math.ceil(total / itemsPerPage)

  const handlePageChange = (pageNumber: number) => setCurrentPage(pageNumber)

  const handleResetFilters = () => {
    setFilters({ type: '' })
    setDate(undefined)
  }

  const fetchLogs = useCallback(() => {
    getAllLogs({ userId: userId as string, currentPage, searchTerm, itemsPerPage })
      .then((response) => {
        if (response.success && response.data) {
          setLogs(response.data as LogWithTimestamps[])

          // Get total count for pagination
          countLogs({ userId: userId as string }).then((countResponse) => {
            if (countResponse.success && countResponse.data) {
              setTotal(countResponse.data.count)
            } else {
              console.error('Error fetching logs count:', countResponse.error)
            }
          })
        } else {
          console.error('Error fetching logs:', response.error)
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false))
  }, [userId, currentPage, searchTerm, itemsPerPage])

  useEffect(() => {
    fetchLogs()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, currentPage, searchTerm, filters])

  useEffect(() => {
    if (Array.isArray(events) && events.length > 0) {
      for (const event of events) {
        if (event.type === EventTypes.REPORT_IMPORTED) {
          fetchLogs()
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [events])

  return (
    <div className='container mx-auto flex flex-1 flex-col gap-8 w-full py-4 px-3'>
      <section className='w-full mx-auto pb-12 md:pb-16 lg:pb-20 gap-6 flex flex-col'>
        <Card className='w-full'>
          <CardHeader>
            <CardDescription>View and filter log actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='w-full flex flex-col gap-6'>
              <div className='flex gap-2'>
                <div className='relative w-full'>
                  <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <SearchIcon className='h-5 w-5 text-muted-foreground' />
                  </div>
                  <Input
                    type='text'
                    placeholder='Search logs...'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className='pl-10 pr-4 py-2 rounded-md w-full border border-input bg-background focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary'
                  />
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant='outline' size='icon'>
                      <FilterIcon className='h-4 w-4' />
                      <span className='sr-only'>Filters</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align='end'>
                    <DropdownMenuLabel>Filters</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <div className='grid gap-6 p-2'>
                      <div className='grid gap-4'>
                        <Label htmlFor='type-filter'>Type</Label>
                        <Select
                          value={filters.type}
                          onValueChange={(type) => setFilters({ ...filters, type })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder='Filter by type' />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {LOG_TYPES.map((type: string) => (
                                <SelectItem key={type} value={type}>
                                  {formatToReadable(type)}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className='grid gap-4'>
                        <Label htmlFor='timestamp-filter'>Timestamp</Label>
                        <div className='grid gap-2'>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                id='date'
                                variant={'outline'}
                                className={cn(
                                  'w-[300px] justify-start text-left font-normal',
                                  !date && 'text-muted-foreground'
                                )}
                              >
                                <CalendarIcon className='mr-2 h-4 w-4' />
                                {date?.from ? (
                                  date.to ? (
                                    <>
                                      {format(date.from, 'LLL dd, y')} -{' '}
                                      {format(date.to, 'LLL dd, y')}
                                    </>
                                  ) : (
                                    format(date.from, 'LLL dd, y')
                                  )
                                ) : (
                                  <span>Pick a date</span>
                                )}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className='w-auto p-0' align='start'>
                              <Calendar
                                initialFocus
                                mode='range'
                                defaultMonth={date?.from}
                                selected={date}
                                onSelect={setDate}
                                numberOfMonths={2}
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                      </div>

                      <Button variant='outline' onClick={handleResetFilters}>
                        Reset filters
                      </Button>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className='overflow-x-auto'>
                <ActivitiesTable isLoading={isLoading} logs={logs} />
              </div>
              <div className='flex items-center justify-between mt-6'>
                <ActivitiesTablePagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  handlePageChange={handlePageChange}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}

const ActivitiesTable = ({
  isLoading,
  logs
}: {
  isLoading: boolean
  logs: LogWithTimestamps[]
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Type</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Timestamp</TableHead>
          <TableHead>Device</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading ? (
          <SkeletonLoader />
        ) : (
          <>
            {logs.map((log) => (
              <TableRow key={log.id}>
                <TableCell>{formatToReadable(log.type)}</TableCell>
                <TableCell>{log.description}</TableCell>
                <TableCell>{readableTimestamp(log.created.toString())}</TableCell>
                <TableCell>
                  <Icon
                    name={deviceIcons[log.device as keyof typeof deviceIcons] as keyof typeof icons}
                    size={20}
                  />
                </TableCell>
              </TableRow>
            ))}
          </>
        )}
      </TableBody>
    </Table>
  )
}

const ActivitiesTablePagination = ({
  currentPage,
  totalPages,
  handlePageChange
}: {
  currentPage: number
  totalPages: number
  handlePageChange: (page: number) => void
}) => {
  return (
    <Pagination>
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

const SkeletonLoader = () => {
  return (
    <>
      {Array.from({ length: 3 }).map((_, idx) => (
        <TableRow key={idx}>
          {Array.from({ length: 8 }).map((_, idx) => (
            <TableCell key={idx}>
              <Skeleton className='h-6 w-full rounded-md bg-muted' />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  )
}

export default Page
