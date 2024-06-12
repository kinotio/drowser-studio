'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ImportIcon } from 'lucide-react'

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
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import useReportStore from '@/stores/useReportStore'

import { TFileContent } from '@/types'
import { isValidFileContent } from '@/lib/utils'

export default function ImportDialogComponent() {
  const setReport = useReportStore((state) => state.setReport)

  const router = useRouter()

  const [fileContent, setFileContent] = useState<TFileContent | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return

    const file = event.target.files[0]
    if (file.type !== 'application/pdf') return

    const fileReader = new FileReader()
    fileReader.readAsText(file, 'UTF-8')
    fileReader.onload = (e: ProgressEvent<FileReader>) =>
      setFileContent(JSON.parse(e.target?.result as string))
  }

  const handleSubmit = () => {
    if (!isValidFileContent(fileContent)) return
    setReport(JSON.stringify(fileContent))
    router.push('/dashboard')
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size='lg' variant='default' className='my-4 mx-4'>
          Import Reports <ImportIcon className='ml-2' />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Import new reports ?</AlertDialogTitle>
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
          <AlertDialogAction onClick={handleSubmit}>Import</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
