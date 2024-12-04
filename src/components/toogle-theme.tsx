import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'
import Link from 'next/link'

export const ToggleTheme = () => {
  const { theme, setTheme } = useTheme()

  return (
    <Link
      href='#'
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className='justify-start'
    >
      <div className='flex gap-2 dark:hidden items-center'>
        <Moon size={20} className='mr-2' />
        <span>Dark</span>
      </div>

      <div className='dark:flex gap-2 hidden items-center'>
        <Sun size={20} className='mr-2' />
        <span>Light</span>
      </div>
    </Link>
  )
}
