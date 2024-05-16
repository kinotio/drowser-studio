'use client'

import { useState } from 'react'
import { ImportIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { FileContent } from '@/types'
import { isValidFileContent } from '@/lib/utils'

export function HeroComponent() {
  const [fileContent, setFileContent] = useState<FileContent | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return
    const fileReader = new FileReader()
    fileReader.readAsText(event.target.files[0], 'UTF-8')
    fileReader.onload = (e: ProgressEvent<FileReader>) =>
      setFileContent(JSON.parse(e.target?.result as string))
  }

  const handleSubmit = () => {
    if (!isValidFileContent(fileContent)) return
    console.log(fileContent)
  }

  return (
    <>
      <section className='w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-r from-[#874CCC]/80 to-[#10439F]/80 backdrop-blur-md'>
        <div className='container px-4 md:px-6'>
          <div className='flex flex-col items-center space-y-6 text-center'>
            <div className='space-y-4 text-white'>
              <h1 className='text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl'>
                Test Your Software with Ease
              </h1>
              <p className='mx-auto max-w-[700px] md:text-xl'>
                Our powerful platform makes it easy to test your software and ensure it meets the
                highest standards. Streamline your testing process and deliver reliable,
                high-quality applications.
              </p>
              <div className='flex justify-center items-center gap-3'>
                <Input
                  className='flex h-10 w-50 rounded-md border border-input px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-gray-900/80 backdrop-blur-md text-gray-50 hover:bg-gray-900/90 dark:bg-gray-50/80 dark:text-gray-900 dark:hover:bg-gray-50/90'
                  type='file'
                  onChange={handleFileChange}
                />

                <Button onClick={handleSubmit}>
                  Import JSON <ImportIcon className='ml-2' />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
