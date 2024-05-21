'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { SheetIcon } from 'lucide-react'

import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table
} from '@/components/ui/table'

import { TContentSubCase, TContentCase } from '@/types'

import { caseStatus } from '@/constants'

import { readableTimestamp, humanizeDuration } from '@/utils'

import useStore from '@/stores/useStore'
import useReportStore from '@/stores/useReportStore'
import { isEmpty } from 'lodash'

export default function TableComponent() {
  const report = useStore(useReportStore, (state) => state.content)

  const { id } = useParams()

  const [content, setContent] = useState<TContentCase>()

  useEffect(() => {
    try {
      setContent(JSON.parse(report as string)?.drowser.cases.filter((c: any) => c.id === id)[0])
    } catch (error) {}
  }, [id, report])

  return (
    <>
      {!isEmpty(content) ? (
        <div className='border rounded-lg w-full'>
          <div className='relative w-full overflow-auto'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Test Name</TableHead>
                  <TableHead>Actual</TableHead>
                  <TableHead>Exceptation</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Month of Testing</TableHead>
                  <TableHead>Browser</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.isArray(content?.cases) &&
                  content?.cases.map((c: TContentSubCase) => (
                    <TableRow key={c.id}>
                      <TableCell>{c.name}</TableCell>
                      <TableCell>{c.actual}</TableCell>
                      <TableCell>{c.exceptation}</TableCell>
                      <TableCell
                        className={
                          c.status === caseStatus.passed
                            ? 'text-green-500 capitalize'
                            : 'text-red-500 capitalize'
                        }
                      >
                        {c.status}
                      </TableCell>
                      <TableCell>{readableTimestamp(c.timestamp)}</TableCell>
                      <TableCell>{humanizeDuration(c.duration)}</TableCell>
                      <TableCell className='capitalize'>{c.month_of_test}</TableCell>
                      <TableCell className='capitalize'>{c.browser}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </div>
      ) : (
        <div className='border rounded-lg w-full h-full flex items-center justify-center p-12'>
          <div className='text-center space-y-4'>
            <SheetIcon className='h-12 w-12 text-gray-500' />
            <h2 className='text-2xl font-bold'>No Data Table Available</h2>
            <p className='text-gray-500'>
              It looks like there are no data table to display at the moment. Please provide a
              verified or conform json report form the <strong>Drowser</strong> package
            </p>
          </div>
        </div>
      )}
    </>
  )
}
