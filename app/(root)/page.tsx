'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ImportIcon } from 'lucide-react'
import { setCookie } from 'cookies-next'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { TFileContent } from '@/lib/definitions'
import { isValidFileContent } from '@/lib/utils'

import { useReportStore } from '@/hooks/use-report-store'

const Page = () => {
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
    fileReader.onload = (e: ProgressEvent) => {
      setFileContent(JSON.parse((e.target as FileReader).result as string))
      setIsLoading(false)
    }
    fileReader.onerror = () => {
      console.error('An error occurred while loading file')
      setIsLoading(false)
    }
  }

  const handleSubmit = () => {
    if (!isValidFileContent(fileContent)) {
      toast('Report is not valid')
      return
    }

    setReport(JSON.stringify(fileContent))
    setCookie('session-active', true, { secure: true, expires: new Date(Date.now() + 86400000) })

    router.push('/dashboard')
  }

  return (
    <div className='min-h-[86vh]'>
      <section className='w-full h-full py-12 md:py-24 lg:py-32 xl:py-48'>
        <div className='container px-4 md:px-6'>
          <div className='flex flex-col items-center space-y-6 text-center'>
            <div className='space-y-4'>
              <h1 className='text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl'>
                Track, Analyze, and Improve Your Performance Over Time
              </h1>
              <p className='mx-auto max-w-[700px] md:text-xl'>
                Drowser Studio is a robust and intuitive app designed to help users track,
                visualize, and analyze the performance of various tests over time.
              </p>
              <div className='grid grid-cols-1 px-12 lg:px-0 lg:flex justify-center items-center gap-3'>
                <Input
                  className='flex h-10 w-50 rounded-md border border-input px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-gray-white backdrop-blur-md'
                  type='file'
                  onChange={handleFileChange}
                />

                <Button onClick={handleSubmit} disabled={isLoading}>
                  {isLoading ? 'Loading...' : 'Import Reports'} <ImportIcon className='ml-2' />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Page
