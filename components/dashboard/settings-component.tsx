'use client'

import { useState } from 'react'

import { BoltIcon } from 'lucide-react'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'

export default function SettingsComponent() {
  const [openAIToken, setOpenAIToken] = useState('')

  const handleSaveChanges = () => {
    console.log(openAIToken)
  }

  return (
    <Sheet>
      <SheetTrigger>
        <span className='flex gap-3'>
          <BoltIcon className='h-4 w-4' />
          Settings
        </span>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Settings</SheetTitle>
          <SheetDescription>
            Make changes to your settings here. Click save when you re done.
          </SheetDescription>
        </SheetHeader>
        <div className='flex flex-col gap-4 py-6'>
          <div className='flex flex-col items-start gap-4'>
            <Label htmlFor='openAIToken' className='text-right'>
              OpenAI Token
            </Label>
            <Input
              id='openAIToken'
              className='col-span-3'
              placeholder='****'
              onChange={(e) => setOpenAIToken(e.target.value)}
            />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type='submit' onClick={handleSaveChanges}>
              Save changes
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
