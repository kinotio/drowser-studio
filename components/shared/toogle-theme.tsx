import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'

import { Button } from '@/components/ui/button'

export const ToggleTheme = () => {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      size='sm'
      variant='ghost'
      className='justify-start'
    >
      <div className='flex gap-2 dark:hidden'>
        <Moon size={20} />
        <span className='block lg:hidden'>Dark</span>
      </div>

      <div className='dark:flex gap-2 hidden'>
        <Sun size={20} />
        <span className='block lg:hidden'>Light</span>
      </div>

      <span className='sr-only'>Toggle theme</span>
    </Button>
  )
}
