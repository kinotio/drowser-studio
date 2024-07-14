'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { isEmpty } from 'lodash'
import {
  BarChartBigIcon,
  ClipboardIcon,
  SheetIcon,
  TimerIcon,
  CalendarIcon,
  GlobeIcon,
  CircleCheckIcon,
  CircleXIcon
} from 'lucide-react'

import { CardTitle, CardDescription, CardHeader, Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

import { humanizeDuration, readableTimestamp } from '@/lib/utils'
import { CASE_STATUS } from '@/lib/constants'
import { TContentCase, TContentSubCase } from '@/lib/definitions'

import { useStore } from '@/hooks/use-store'
import { useReportStore } from '@/hooks/use-report-store'

const Page = () => {
  return (
    <div className='flex flex-col gap-4 p-4 md:gap-8 md:p-6'>
      <CaseMetrics />
      <CardList />
    </div>
  )
}

const CaseMetrics = () => {
  const report = useStore(useReportStore, (state) => state.content)

  const { id } = useParams()

  const [content, setContent] = useState<TContentCase>()
  const [goupedByStatus, setGoupedByStatus] = useState<any>()

  useEffect(() => {
    try {
      setContent(JSON.parse(report as string)?.drowser.cases.filter((c: any) => c.id === id)[0])
    } catch (error) {}
  }, [id, report])

  useEffect(() => {
    if (!isEmpty(content)) {
      setGoupedByStatus(Object.groupBy(content?.cases, ({ status }: { status: string }) => status))
    }
  }, [content])

  return (
    <>
      {!isEmpty(content) ? (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          <Card>
            <CardHeader>
              <CardTitle>Total Tests</CardTitle>
              <CardDescription>
                <span className='text-4xl font-bold'>{content?.cases?.length ?? 0}</span>
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Passing Tests</CardTitle>
              <CardDescription>
                <span className='text-4xl font-bold'>{goupedByStatus?.passed?.length ?? 0}</span>
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Failed Tests</CardTitle>
              <CardDescription>
                <span className='text-4xl font-bold'>{goupedByStatus?.failed?.length ?? 0}</span>
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Test Coverage</CardTitle>
              <CardDescription>
                <span className='text-4xl font-bold'>{`${content?.coverage?.toFixed() ?? 0}%`}</span>
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Avg. Test Duration</CardTitle>
              <CardDescription>
                <span className='text-4xl font-bold'>
                  {humanizeDuration(content?.avg_duration as number) ?? 0}
                </span>
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Flaky Tests</CardTitle>
              <CardDescription>
                <span className='text-4xl font-bold'>{content?.flaky ?? 0}</span>
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      ) : (
        <div className='border rounded-lg w-full h-full flex items-center justify-center p-12'>
          <div className='text-center space-y-4'>
            <BarChartBigIcon className='h-12 w-12 text-gray-500' />
            <h2 className='text-2xl font-bold'>No Metrics Available</h2>
            <p className='text-gray-500'>
              It looks like there are no metrics to display at the moment. Please provide a verified
              or conform json report form the <strong>Drowser</strong> package
            </p>
          </div>
        </div>
      )}
    </>
  )
}

const CardList = () => {
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
        <div className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6'>
          <Card>
            <CardHeader className='border-b-2 pb-6'>
              <CardTitle>Recent Cases</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-4 overflow-auto h-96 pt-6'>
                {content.cases.map((c: TContentSubCase) => (
                  <div key={c.id} className='flex items-center justify-between border-b-2 pb-6'>
                    <div className='flex items-center gap-2'>
                      <div className='bg-gray-200 dark:bg-gray-800 rounded-full w-8 h-8 flex items-center justify-center'>
                        <ClipboardIcon className='h-4 w-4 text-gray-500 dark:text-gray-400' />
                      </div>
                      <div>
                        <h4 className='font-medium'>{c.name === '' ? 'N/A' : c.name}</h4>
                        <div className='flex gap-4'>
                          <p
                            className={`capitalize text-sm text-gray-500 dark:text-gray-400 flex gap-2 items-center ${
                              c.status === CASE_STATUS.passed ? 'text-green-500' : 'text-red-500'
                            }`}
                          >
                            {c.status === CASE_STATUS.passed ? (
                              <CircleCheckIcon size='16' />
                            ) : (
                              <CircleXIcon size='16' />
                            )}
                            {c.status}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className='flex text-sm text-gray-500 dark:text-gray-400 gap-4'>
                      <Badge variant='secondary'>
                        <TimerIcon size='16' className='mr-1' /> {humanizeDuration(c.duration)}
                      </Badge>
                      <Badge>
                        <CalendarIcon size='16' className='mr-1' />
                        {readableTimestamp(c.timestamp)}
                      </Badge>
                      <Badge variant='outline'>
                        <GlobeIcon size='16' className='mr-1' />
                        {c.browser}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
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

export default Page
