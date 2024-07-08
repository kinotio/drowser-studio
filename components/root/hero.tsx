'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ImportIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { TFileContent } from '@/lib/definitions'
import { isValidFileContent } from '@/lib/utils'

import useReportStore from '@/hooks/use-report-store'

const Hero = () => {
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
    <section className='w-full h-full py-12 md:py-24 lg:py-32 xl:py-48 bg-white'>
      <div className='container px-4 md:px-6'>
        <div className='flex flex-col items-center space-y-6 text-center'>
          <div className='space-y-4 text-black'>
            <h1 className='text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl'>
              Track, Analyze, and Improve Your Performance Over Time
            </h1>
            <p className='mx-auto max-w-[700px] md:text-xl'>
              Drowser Studio is a robust and intuitive app designed to help users track, visualize,
              and analyze the performance of various tests over time.
            </p>
            <div className='flex justify-center items-center gap-3'>
              <Input
                className='flex h-10 w-50 rounded-md border border-input px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-gray-white backdrop-blur-md text-black hover:bg-white dark:bg-gray-50/80 dark:text-gray-900 dark:hover:bg-gray-50/90'
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
  )
}

export { Hero }
