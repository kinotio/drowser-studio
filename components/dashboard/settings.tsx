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

const Settings = () => {
  const [accessToken, setAccessToken] = useState('')

  const handleSaveChanges = () => {
    console.log(accessToken)
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
            <Label htmlFor='accessToken' className='text-right'>
              Access Token
            </Label>
            <Input
              id='accessToken'
              className='col-span-3'
              placeholder='Access Token'
              onChange={(e) => setAccessToken(e.target.value)}
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

export { Settings }
