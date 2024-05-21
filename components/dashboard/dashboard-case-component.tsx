'use client'

import { useState, useEffect } from 'react'

import MetricsComponent from '@/components/dashboard/metrics-component'
import TableComponent from '@/components/dashboard/table-component'
import LoaderComponent from '@/components/common/loader-component'

export default function DashboardCaseComponent() {
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000)
  }, [])

  return (
    <>
      {isLoading ? (
        <div className='w-full h-screen flex justify-center items-center'>
          <LoaderComponent />
        </div>
      ) : (
        <div className='flex flex-col gap-4 p-4 md:gap-8 md:p-6'>
          <MetricsComponent />
          <TableComponent />
        </div>
      )}
    </>
  )
}
