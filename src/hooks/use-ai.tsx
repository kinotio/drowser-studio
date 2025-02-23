import { useState, useCallback } from 'react'

export const useAI = (type: 'chat' | 'prompt', message: string) => {
  const [responseData, setResponseData] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const fetchData = useCallback(async () => {
    if (!message || !type) return

    const baseUrl = process.env.AI_BASE_URL
    const endpoint = type === 'chat' ? `${baseUrl}/api/ai/chat` : `${baseUrl}/api/ai/generate`
    const token = process.env.AI_TOKEN

    setIsLoading(true)
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ message })
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
  }, [message, type])

  return { responseData, isLoading, fetchData }
}
