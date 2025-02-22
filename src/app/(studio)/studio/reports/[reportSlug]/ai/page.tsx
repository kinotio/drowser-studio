'use client'

import { Bot, MessageSquare, Send, icons } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Icon } from '@/components/ui/icon'
import { Textarea } from '@/components/ui/textarea'

import { analyzeTemplates } from '@/lib/constants'

const Page = () => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content:
        "Hello! I'm your Test Analysis Assistant. Upload a test report or choose an analysis template to begin."
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom when new messages are added
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages, isLoading])

  const handleSubmit = async () => {
    if (!inputValue.trim()) return

    const userMessage = { role: 'user', content: inputValue }
    setMessages((prev) => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)

    // Simulate AI response - replace with actual AI integration
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setMessages((current) => [
      ...current,
      {
        role: 'assistant',
        content:
          "I'm analyzing your request. This is a placeholder response - integrate your AI service here."
      }
    ])
    setIsLoading(false)
  }

  const handlePromptClick = (prompt: string) => {
    setInputValue(prompt)
  }

  return (
    <div className='flex flex-col gap-4 p-4'>
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        {analyzeTemplates.map((template) => (
          <Card key={template.id} className='overflow-hidden'>
            <CardHeader className='flex flex-row items-center gap-3 space-y-0'>
              <div className='rounded-full bg-primary/10 p-2'>
                <Icon name={template.icon as keyof typeof icons} size={20} />
              </div>
              <div>
                <CardTitle className='text-base'>{template.title}</CardTitle>
                <CardDescription className='text-xs'>{template.description}</CardDescription>
              </div>
            </CardHeader>
            <CardContent className='mt-2'>
              <div className='space-y-2'>
                {template.prompts.map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => handlePromptClick(prompt)}
                    className='w-full rounded-lg border bg-muted/50 px-3 py-2 text-left text-sm hover:bg-muted duration-200'
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Chat Interface */}
      <Card className='flex-1'>
        <CardContent className='flex flex-col p-4 h-[420px]'>
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
                      message.role === 'assistant'
                        ? 'bg-muted'
                        : 'bg-primary text-primary-foreground'
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
                placeholder='Ask about your test results or choose a template above...'
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
                  disabled={!inputValue.trim()}
                  className='rounded-full'
                >
                  <Send className='h-4 w-4' />
                  <span className='sr-only'>Send message</span>
                </Button>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className='text-center text-xs text-muted-foreground mt-2'>
            Drowser AI can make mistakes. Consider checking important information.
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Page
