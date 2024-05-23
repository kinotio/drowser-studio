'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { ClipboardIcon, SheetIcon } from 'lucide-react'
import { isEmpty } from 'lodash'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { TContentSubCase, TContentCase } from '@/types'

import { caseStatus } from '@/constants'

import { humanizeDuration } from '@/utils'

import useStore from '@/stores/useStore'
import useReportStore from '@/stores/useReportStore'

export default function CardListComponent() {
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
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6'>
          <Card>
            <CardHeader>
              <CardTitle>Recent Tests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-4 overflow-auto h-96'>
                {content.cases.map((c: TContentSubCase) => (
                  <div key={c.id} className='flex items-center justify-between'>
                    <div className='flex items-center gap-2'>
                      <div className='bg-gray-200 dark:bg-gray-800 rounded-full w-8 h-8 flex items-center justify-center'>
                        <ClipboardIcon className='h-4 w-4 text-gray-500 dark:text-gray-400' />
                      </div>
                      <div>
                        <h4 className='font-medium'>{c.name}</h4>
                        <div className='flex gap-4'>
                          <p
                            className={`capitalize text-sm text-gray-500 dark:text-gray-400 ${
                              c.status === caseStatus.passed ? 'text-green-500' : 'text-red-500'
                            }`}
                          >
                            {c.status}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className='text-sm text-gray-500 dark:text-gray-400'>
                      {humanizeDuration(c.duration)}
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
