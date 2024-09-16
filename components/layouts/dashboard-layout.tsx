'use client'

import { useEffect, useCallback } from 'react'
import Link from 'next/link'
import { GithubIcon, InboxIcon, LogOutIcon, CalendarCheckIcon } from 'lucide-react'
import { isEmpty } from 'lodash'
import { Toaster } from '@/components/ui/sonner'

import { DrowserStudioLogo } from '@/components/svg/drowser-studio-logo'
import { ToggleTheme } from '@/components/shared/toogle-theme'
import { KinotioLogo } from '@/components/svg/kinotio-logo'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'
import { Navigation } from '@/components/shared/navigation'

import { Import } from '@/components/modules/import'

import { USER_INBOXES_PREFERENCES, PATH, EVENT_TYPES, APP_VERSION } from '@/lib/constants'
import { MenuType, Event } from '@/lib/definitions'

import { useUser } from '@/hooks/use-user'
import { useEvents } from '@/hooks/use-events'

const DashboardLayout = ({
  menus,
  children
}: Readonly<{
  menus: MenuType[]
  children: React.ReactNode
}>) => {
  return (
    <div className='flex flex-col h-screen'>
      <div className='flex flex-col'>
        <div className='flex h-[60px] items-center px-6 border-b gap-6 justify-between'>
          <div className='flex gap-4 items-center'>
            <Link className='flex items-center font-bold' href={PATH.DASHBOARD_REPORTS}>
              <DrowserStudioLogo width={200} height={100} />
            </Link>
            <Navigation menus={menus} />
          </div>
          <Header />
        </div>
      </div>

      <main className='flex flex-1 flex-col overflow-auto'>{children}</main>

      <Footer />
      <Toaster position='bottom-center' />
    </div>
  )
}

const Header = () => {
  return (
    <header className='flex h-14 lg:h-[60px] items-center gap-4 border-b px-6'>
      <div className='flex flex-1 items-center gap-4 md:ml-auto md:gap-2 lg:gap-4'>
        <div className='ml-auto flex items-center gap-4'>
          <Import />

          <Badge variant='outline' className='h-8 cursor-pointer'>
            <Link href={'https://github.com/kinotio/drowser-studio/issues'} target='_blank'>
              Feedback
            </Link>
          </Badge>

          <ToggleTheme />
        </div>

        <Inboxes />
        <UserSettings />
      </div>
    </header>
  )
}

const Inboxes = () => {
  const { loading, getUser, user, getUserInboxes, inboxes } = useUser()

  const predicateFn = useCallback((event: Event) => event.type === 'inboxes_preferences_change', [])
  const { events } = useEvents(predicateFn)

  useEffect(() => {
    getUser()
    getUserInboxes()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (Array.isArray(events) && events.length > 0) {
      const inboxesPreferencesEvent = events
        .filter(({ type }) => type === EVENT_TYPES.inboxesPreferencesChange)
        .shift()

      if (!isEmpty(inboxesPreferencesEvent)) getUser()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [events])

  const Inboxes = () => {
    if (!loading) {
      if (user?.inboxes_preferences[0].preference === USER_INBOXES_PREFERENCES.ignoring) {
        return (
          <div className='space-y-4 text-center flex flex-col'>
            <span>
              You set the inboxes preference to be ignore , update your Inboxes Preferences in
              settings
            </span>
            <Link href={PATH.DASHBOARD_SETTINGS} className='underline text-sm'>
              View settings
            </Link>
          </div>
        )
      }

      if (Array.isArray(inboxes) && inboxes.length > 0) {
        return (
          <div className='space-y-4'>
            <div className='flex items-start gap-3'>
              <div className='flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground'>
                <CalendarCheckIcon className='h-4 w-4' />
              </div>
              <div className='flex-1 space-y-1'>
                <p className='text-sm font-medium'>Meeting Reminder</p>
                <p className='text-sm text-muted-foreground'>
                  Your weekly team meeting is in 15 minutes.
                </p>
              </div>
            </div>
          </div>
        )
      } else {
        return (
          <div className='space-y-4 text-center'>
            <span>You have no inboxes</span>
          </div>
        )
      }
    }

    return (
      <div className='w-full flex flex-col gap-3 space-y-4'>
        <div className='h-14 rounded-md bg-muted' />
      </div>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className='rounded-full' size='icon' variant='ghost'>
          <InboxIcon size={20} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-[360px] p-4'>
        <DropdownMenuLabel className='mb-2 text-lg font-bold'>Inboxes</DropdownMenuLabel>
        <Inboxes />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const UserSettings = () => {
  const { user, getUser } = useUser()

  const logout = () => alert('logout')

  useEffect(() => {
    getUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='secondary' className='py-2 cursor-pointer'>
          {user?.name}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align='end'
        className='w-[240px] p-4 bg-card text-card-foreground rounded-md shadow-lg'
      >
        <div className='space-y-2'>
          <Button
            className='flex items-center gap-2 hover:bg-muted/50 px-2 py-1 rounded-md w-full'
            variant='outline'
            onClick={logout}
          >
            <LogOutIcon className='h-4 w-4' />
            <span>Logout</span>
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const Footer = () => {
  return (
    <footer className='flex h-14 lg:h-[60px] items-center border-t'>
      <div className='flex flex-1 items-center justify-between px-4 w-full'>
        <div className='flex lg:h-[60px] border-t flex-col'>
          <div className='flex py-6 px-6 items-center justify-between gap-4'>
            <Badge>{APP_VERSION}</Badge>
            <div className='flex items-center gap-2'>
              <Link href={'https://github.com/kinotio/drowser-studio'}>
                <GithubIcon size={20} />
              </Link>
            </div>
          </div>
        </div>

        <div className='flex items-center pl-4 gap-2'>
          <span className='text-sm font-semibold'>By</span>
          <Link href={'https://github.com/kinotio'}>
            <KinotioLogo width={100} height={50} />
          </Link>
        </div>
      </div>
    </footer>
  )
}

export { DashboardLayout }
