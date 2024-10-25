'use client'

import React, { useState } from 'react'
import { toast } from 'sonner'
import { uniqueNamesGenerator, colors, animals, adjectives } from 'unique-names-generator'
import { useAuth } from '@clerk/nextjs'

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

import { TFileContent } from '@/lib/definitions'
import { isValidFileContent } from '@/lib/utils'
import { pocketbase } from '@/lib/pocketbase'

export const ImportReport = ({ children }: { children: React.ReactElement }) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [reportName, setReportName] = useState<string>()
  const [reportContent, setReportContent] = useState<TFileContent | null>(null)

  const { userId } = useAuth()

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

    const reportSlug = uniqueNamesGenerator({
      dictionaries: [colors, animals, adjectives],
      separator: '-'
    })

    const data = {
      name: reportName,
      slug: reportSlug,
      metadata: reportContent,
      user_id: userId
    }

    toast.promise(pocketbase.collection('reports').create(data), {
      loading: 'Saving report',
      success: (data) => (data?.error ? data.error : 'Report imported')
    })
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

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleSubmit}>
            {loading ? 'Loading...' : 'Import Report'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
