import { Bot, Send, FileText } from 'lucide-react'
import React from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'

export const PromptMode = ({
  prompt,
  response,
  isLoading,
  setInputValue,
  handleSubmit
}: {
  prompt: string
  response: string
  isLoading: boolean
  setInputValue: (value: string) => void
  handleSubmit: () => void
}) => {
  return (
    <div className='grid gap-4 lg:grid-cols-2 h-[350px]'>
      <Card className='h-full'>
        <CardHeader>
          <CardTitle className='flex items-center gap-2 text-base'>
            <FileText className='h-5 w-5' />
            Analysis Prompt
          </CardTitle>
          <CardDescription>
            Write your analysis request or select from the templates above
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            <div className='relative'>
              <Textarea
                className='h-[150px] resize-none pr-12 bg-muted/50'
                placeholder='Enter your analysis prompt here...'
                value={prompt}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={isLoading}
              />
              <div className='absolute bottom-2 right-2'>
                <Button
                  size='icon'
                  onClick={handleSubmit}
                  disabled={!prompt.trim() || isLoading}
                  className='rounded-full'
                >
                  <Send className='h-4 w-4' />
                  <span className='sr-only'>Send prompt</span>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2 text-base'>
            <Bot className='h-5 w-5' />
            Analysis Response
          </CardTitle>
          <CardDescription>AI-generated analysis based on your prompt</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='relative h-[175px] overflow-y-auto rounded-md bg-muted/50 p-4'>
            {isLoading ? (
              <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                <span>Drowser AI is thinking</span>
                <span className='inline-flex w-4'>
                  <span className='animate-bounce'>.</span>
                  <span className='animate-bounce' style={{ animationDelay: '0.2s' }}>
                    .
                  </span>
                  <span className='animate-bounce' style={{ animationDelay: '0.4s' }}>
                    .
                  </span>
                </span>
              </div>
            ) : response ? (
              <div className='text-sm whitespace-pre-wrap'>{response}</div>
            ) : (
              <div className='text-sm text-muted-foreground'>
                Response will appear here after you submit a prompt.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
