import { useState, useCallback } from 'react'

import { Message } from '@/lib/definitions'

import { useReport } from '@/hooks/use-report'

export const useAI = (type: 'chat' | 'prompt') => {
  const [responseData, setResponseData] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { report } = useReport()

  const fetchData = useCallback(
    async (input: string | Message[]) => {
      if (!input || !type) return

      const baseUrl = process.env.AI_BASE_URL
      const endpoint = type === 'chat' ? `${baseUrl}/api/ai/chat` : `${baseUrl}/api/ai/generate`
      const token = process.env.AI_TOKEN
      const stringiedReport = JSON.stringify(report)

      const prePrompt = `
        You are Drowser AI with analyzing the following JSON report to provide insights on the performance of 
        various tests. Please focus on key metrics, trends, and any anomalies detected. Do not respond with 
        information unrelated to the test performance analysis.

        ${stringiedReport}
      `

      const body = type === 'chat' ? { messages: input } : { prompt: `${prePrompt}\n${input}` }

      setIsLoading(true)
      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(body)
        })

        if (!response.body) {
          throw new Error('ReadableStream not yet supported in this browser.')
        }

        const reader = response.body.getReader()
        const decoder = new TextDecoder()
        let done = false
        let responseText = ''

        while (!done) {
          const { value, done: doneReading } = await reader.read()
          done = doneReading
          const chunkValue = decoder.decode(value, { stream: true })
          responseText += chunkValue
        }

        setResponseData(responseText)
      } catch (error) {
        console.error('Error fetching stream:', error)
      } finally {
        setIsLoading(false)
      }
    },
    [report, type]
  )

  return { responseData, isLoading, fetchData }
}
