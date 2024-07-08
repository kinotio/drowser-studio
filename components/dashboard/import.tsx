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

import { useReportStore } from '@/hooks/use-report-store'

import { TFileContent } from '@/lib/definitions'
import { isValidFileContent } from '@/lib/utils'

const Import = () => {
  const setReport = useReportStore((state) => state.setReport)

  const router = useRouter()

  const [fileContent, setFileContent] = useState<TFileContent | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return

    const file = event.target.files[0]
    if (!file || file.type !== 'application/json') return

    setIsLoading(true)

    const fileReader = new FileReader()
    fileReader.readAsText(file, 'UTF-8')
    fileReader.onload = (e: ProgressEvent<FileReader>) => {
      setFileContent(JSON.parse(e.target?.result as string))
      setIsLoading(false)
    }
    fileReader.onerror = () => {
      console.error('An error occurred while loading file')
      setIsLoading(false)
    }
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
          <AlertDialogAction onClick={handleSubmit}>
            {isLoading ? 'Loading...' : 'Import Reports'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export { Import }
