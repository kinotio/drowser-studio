'use client'

import { useEffect } from 'react'
import dynamic from 'next/dynamic'
import 'chart.js/auto'

const Bar = dynamic(() => import('react-chartjs-2').then((mod) => mod.Bar), {
  ssr: false
})

const Doughnut = dynamic(() => import('react-chartjs-2').then((mod) => mod.Doughnut), {
  ssr: false
})

const barData = {
  labels: ['Ok', 'Ko'],
  datasets: [
    {
      label: 'My First Dataset',
      data: [40, 70],
      backgroundColor: ['rgb(94, 227, 32)', 'rgb(239, 29, 29)'],
      hoverOffset: 4
    }
  ]
}

const doughnutData = {
  labels: ['Ok', 'Ko'],
  datasets: [
    {
      label: 'My First Dataset',
      data: [40, 70],
      backgroundColor: ['rgb(94, 227, 32)', 'rgb(239, 29, 29)'],
      hoverOffset: 4
    }
  ]
}

export default function Dashboard() {
  return (
    <>
      <div className='flex items-center justify-between'>
        <div style={{ width: '700px', height: '400px' }} className=''>
          <Bar data={barData} />
        </div>
        <div style={{ width: '400px', height: '400px' }} className=''>
          <Doughnut data={doughnutData} />
        </div>
      </div>
    </>
  )
}
