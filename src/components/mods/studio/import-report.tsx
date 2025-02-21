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

import { saveReport } from '@/server/actions/report'
import { saveLog } from '@/server/actions/log'
import { saveMetric, getMetric, updateMetric } from '@/server/actions/metric'
import type { ReportInferType } from '@/server/types'

import { useEvents, EventTypes } from '@/hooks/use-events'

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
      setReportContent(JSON.parse(e.target?.result as string))
      setLoading(false)
    }
    fileReader.onerror = () => {
      console.error('An error occurred while loading file')
      setLoading(false)
    }
  }

  const handleSubmit = () => {
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
      userId: userId as string
    } satisfies ReportInferType

    toast.promise(
      saveReport({
        userId: data.userId,
        name: data.name,
        slug: data.slug,
        metadata: data.metadata
      }),
      {
        loading: 'Saving report',
        success: async (data) => {
          if (data) {
            const now = new Date()
            const month = now.getMonth() + 1
            const year = now.getFullYear()

            getMetric({ userId: userId as string, year, month }).then(async (metric) => {
              if (Array.isArray(metric) && metric.length !== 0) {
                await updateMetric({ metricId: metric[0].id, total: metric[0].total + 1 })
              } else {
                await saveMetric({
                  userId: userId as string,
                  year,
                  month,
                  total: 1
                })
              }

              const device = (await axios.get('/api/device')).data.device

              await saveLog({
                type: 'report_imported',
                description: 'Report imported',
                userId: userId as string,
                device
              })
            })

            publish({ type: EventTypes.REPORT_IMPORTED, payload: data })

            return 'Report Imported'
          }
          return 'An error occurred while importing report'
        }
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
