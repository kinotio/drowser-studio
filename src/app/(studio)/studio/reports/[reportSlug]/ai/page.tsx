'use client'

import { icons } from 'lucide-react'
import React, { useState, useRef, useEffect } from 'react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Icon } from '@/components/ui/icon'
import { Switch } from '@/components/ui/switch'
import { analyzeTemplates } from '@/lib/constants'
import { Message } from '@/lib/definitions'
import { ChatMode } from '@/components/mods/studio/ai/chat-mode'
import { PromptMode } from '@/components/mods/studio/ai/prompt-mode'

import { useAI } from '@/hooks/use-ai'

const Page = () => {
  const [isChatMode, setIsChatMode] = useState(false)
  const { responseData, isLoading, fetchData } = useAI(isChatMode ? 'chat' : 'prompt')

  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hello! I'm your Test Analysis Assistant. Choose an analysis template to begin."
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  const handleSubmit = async () => {
    if (!inputValue.trim()) return

    if (isChatMode) {
      setMessages((prev) => [...prev, { role: 'user', content: inputValue }])
    }

    await fetchData(isChatMode ? messages : inputValue)

    if (isChatMode) {
      setMessages((current) => [
        ...current,
        {
          role: 'assistant',
          content: responseData || "I'm sorry, I couldn't understand your request."
        }
      ])
    }

    setInputValue('')
  }

  const handlePromptClick = (input: string) => setInputValue(input)

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages, isLoading])

  return (
    <div className='flex flex-col gap-4 p-4 mb-12'>
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

      {/* Mode Switch */}
      <div className='flex items-center justify-end gap-4'>
        <div className='flex items-center gap-2 rounded-lg border bg-muted/50 p-2'>
          <div className='flex items-center gap-2'>
            <span className='text-xs text-muted-foreground'>Prompt</span>
            <Switch checked={isChatMode} onCheckedChange={setIsChatMode} />
            <span className='text-xs text-muted-foreground'>Chat</span>
          </div>
        </div>
      </div>

      {/* Chat Interface */}
      {isChatMode ? (
        <ChatMode
          messages={messages}
          scrollAreaRef={scrollAreaRef}
          isLoading={isLoading}
          inputValue={inputValue}
          handleSubmit={handleSubmit}
          setInputValue={setInputValue}
        />
      ) : (
        <PromptMode
          prompt={inputValue}
          response={isChatMode ? '' : (responseData as string)}
          isLoading={isLoading}
          setInputValue={setInputValue}
          handleSubmit={handleSubmit}
        />
      )}

      {/* Disclaimer */}
      <div className='text-center text-xs text-muted-foreground'>
        Drowser AI can make mistakes. Consider checking important information.
      </div>
    </div>
  )
}

export default Page
