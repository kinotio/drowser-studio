'use client'

import React, { useState } from 'react'
import { Info } from 'lucide-react'
import { toast } from 'sonner'
import { uniqueNamesGenerator, colors, animals, adjectives } from 'unique-names-generator'
import { useAuth } from '@clerk/nextjs'
import axios from 'axios'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

import { TFileContent } from '@/lib/definitions'
import { isValidFileContent } from '@/lib/utils'

// Use correct modular imports with the standardized function names
import { createReport } from '@/server/actions/report/create'
import { countReports } from '@/server/actions/report/get'
import { createLog } from '@/server/actions/log/create'
import { getMetric } from '@/server/actions/metric/get'
import { createMetric } from '@/server/actions/metric/create'
import { updateMetric } from '@/server/actions/metric/update'
import type { Report } from '@/server/databases/types'

import { useEvents, EventTypes } from '@/hooks/use-events'

const FREE_MAX_REPORT_COUNT = 10

export const ImportReport = ({ children }: { children: React.ReactElement }) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [reportName, setReportName] = useState<string>('')
  const [reportContent, setReportContent] = useState<TFileContent | null>(null)

  const { userId } = useAuth()
  const { publish } = useEvents((event) => event.type === EventTypes.REPORT_IMPORTED)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return

    const file = event.target.files[0]
    if (!file || file.type !== 'application/json') return

    setLoading(true)

    const fileReader = new FileReader()
    fileReader.readAsText(file, 'UTF-8')
    fileReader.onload = (e: ProgressEvent<FileReader>) => {
      if (e.target?.result) {
        setReportContent(JSON.parse(e.target.result as string))
      }
      setLoading(false)
    }
    fileReader.onerror = () => {
      console.error('An error occurred while loading file')
      setLoading(false)
    }
  }

  const handleSubmit = async () => {
    // Ensure userId is defined
    if (!userId) {
      toast.error('User ID not available')
      return
    }

    const countResponse = await countReports({ userId: userId })

    if (!countResponse.success) {
      toast.error('Failed to check report count')
      return
    }

    if (countResponse.data && countResponse.data.count >= FREE_MAX_REPORT_COUNT) {
      toast.error('You have reached the maximum number of reports allowed')
      return
    }

    if (!isValidFileContent(reportContent)) {
      toast.error('Invalid report format')
      return
    }

    const randomSlug = uniqueNamesGenerator({
      dictionaries: [colors, animals, adjectives],
      separator: '-'
    })

    const data = {
      name: reportName,
      slug: randomSlug,
      metadata: reportContent,
      user_id: userId
    } satisfies Omit<Report, 'id'>

    toast.promise(
      createReport({
        // Changed from saveReport to createReport
        user_id: data.user_id,
        name: data.name,
        slug: data.slug,
        metadata: data.metadata
      }),
      {
        loading: 'Saving report',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        success: async (response: any) => {
          // Type added to fix unknown type errors
          if (response.success && response.data) {
            const now = new Date()
            const month = now.getMonth() + 1
            const year = now.getFullYear()

            // Get metric for current month/year
            const metricResponse = await getMetric({ userId, year, month })

            if (metricResponse.success && metricResponse.data) {
              // Update existing metric
              await updateMetric({
                metricId: metricResponse.data.id as string,
                total: metricResponse.data.total + 1
              })
            } else {
              // Create new metric
              await createMetric({
                user_id: userId,
                year,
                month,
                total: 1
              })
            }

            // Log the import
            const deviceResponse = await axios.get('/api/device')
            const device = deviceResponse.data.device

            await createLog({
              type: 'report_imported',
              description: 'Report imported',
              user_id: userId,
              device
            })

            publish({ type: EventTypes.REPORT_IMPORTED, payload: response.data })

            return 'Report Imported'
          }
          return 'An error occurred while importing report'
        },
        error: 'Failed to import report'
      }
    )
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Import new report ?</AlertDialogTitle>
        </AlertDialogHeader>

        <div className='flex flex-col gap-4'>
          <div className='flex flex-col gap-2'>
            <Label htmlFor='name'>Report Name</Label>
            <Input
              id='name'
              name='name'
              className='flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm'
              type='text'
              onChange={(e) => setReportName(e.target.value)}
              placeholder='Name of report'
            />
          </div>

          <div className='flex flex-col gap-2'>
            <Label htmlFor='report'>Report File</Label>
            <Input
              id='report'
              name='report'
              className='flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm'
              type='file'
              onChange={handleFileChange}
            />
          </div>
        </div>

        <Alert>
          <Info className='h-4 w-4' />
          <AlertTitle>Report Format Notice</AlertTitle>
          <AlertDescription>
            The report format should be compatible with Drowser Report specifications.
          </AlertDescription>
        </Alert>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleSubmit} className='bg-primary hover:bg-orange-600'>
            {loading ? 'Loading...' : 'Import Report'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
