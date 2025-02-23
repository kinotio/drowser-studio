import { Bot, MessageSquare, Send } from 'lucide-react'
import React from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'

import { Message } from '@/lib/definitions'

export const ChatMode = ({
  messages,
  scrollAreaRef,
  isLoading,
  inputValue,
  handleSubmit,
  setInputValue
}: {
  messages: Message[]
  scrollAreaRef: React.RefObject<HTMLDivElement>
  isLoading: boolean
  inputValue: string
  handleSubmit: () => void
  setInputValue: (value: string) => void
}) => {
  return (
    <Card className='flex-1'>
      <CardContent className='flex flex-col p-4 h-[350px]'>
        <div
          ref={scrollAreaRef}
          className='flex-1 overflow-y-auto pr-4 mb-4 scrollbar-thin scrollbar-thumb-muted-foreground/20 scrollbar-track-transparent'
        >
          <div className='space-y-4'>
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex gap-3 ${message.role === 'assistant' ? 'justify-start' : 'justify-end'}`}
              >
                {message.role === 'assistant' && (
                  <div className='rounded-full bg-primary/10 p-2 h-8 w-8 flex items-center justify-center shrink-0'>
                    <Bot className='h-4 w-4' />
                  </div>
                )}
                <div
                  className={`rounded-lg px-4 py-2 max-w-[80%] ${
                    message.role === 'assistant' ? 'bg-muted' : 'bg-primary text-primary-foreground'
                  }`}
                >
                  <p className='text-sm whitespace-pre-wrap'>{message.content}</p>
                </div>
                {message.role === 'user' && (
                  <div className='rounded-full bg-primary p-2 h-8 w-8 flex items-center justify-center shrink-0'>
                    <MessageSquare className='h-4 w-4 text-white' />
                  </div>
                )}
              </div>
            ))}

            {/* Loading Message */}
            {isLoading && (
              <div className='flex gap-3 justify-start'>
                <div className='rounded-full bg-primary/10 p-2 h-8 w-8 flex items-center justify-center shrink-0'>
                  <Bot className='h-4 w-4' />
                </div>
                <div className='rounded-lg px-4 py-2 max-w-[80%] bg-muted'>
                  <p className='text-sm whitespace-pre-wrap flex items-center gap-1'>
                    Drowser AI is analyzing your request
                    <span className='inline-flex w-4'>
                      <span className='animate-bounce'>.</span>
                      <span className='animate-bounce' style={{ animationDelay: '0.2s' }}>
                        .
                      </span>
                      <span className='animate-bounce' style={{ animationDelay: '0.4s' }}>
                        .
                      </span>
                    </span>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className='flex gap-2'>
          <div className='relative flex-1'>
            <Textarea
              className='min-h-[80px] max-h-[160px] resize-none pr-12 bg-muted/50'
              placeholder='Type your message here...'
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleSubmit()
                }
              }}
            />
            <div className='absolute bottom-2 right-2'>
              <Button
                size='icon'
                onClick={handleSubmit}
                disabled={!inputValue.trim() || isLoading}
                className='rounded-full'
              >
                <Send className='h-4 w-4' />
                <span className='sr-only'>Send message</span>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
