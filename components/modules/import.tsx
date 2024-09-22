'use client'

import React, { useState } from 'react'
import { toast } from 'sonner'

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

import { TFileContent } from '@/lib/definitions'
import { isValidFileContent } from '@/lib/utils'

import { saveReport } from '@/app/(dashboard)/actions'

const Import = ({ children }: { children: React.ReactElement }) => {
  const [fileContent, setFileContent] = useState<TFileContent | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return

    const file = event.target.files[0]
    if (!file || file.type !== 'application/json') return

    setLoading(true)

    const fileReader = new FileReader()
    fileReader.readAsText(file, 'UTF-8')
    fileReader.onload = (e: ProgressEvent<FileReader>) => {
      setFileContent(JSON.parse(e.target?.result as string))
      setLoading(false)
    }
    fileReader.onerror = () => {
      console.error('An error occurred while loading file')
      setLoading(false)
    }
  }

  const handleSubmit = () => {
    if (!isValidFileContent(fileContent)) {
      toast.error('Invalid report format')
      return
    }

    toast.promise(saveReport({ metadata: fileContent }), {
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

        <div>
          <Input
            className='flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm'
            type='file'
            onChange={handleFileChange}
          />
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

export { Import }
