'use client'

import { useEffect, useState } from 'react'

import { Progress } from '@/components/ui/progress'

export default function ProgressComponent() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => setProgress(100), 500)
    return () => clearTimeout(timer)
  }, [])

  return <Progress value={progress} className='w-[60%]' />
}
