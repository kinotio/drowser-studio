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
      <div className='flex gap-2 dark:hidden'>
        <Moon size={20} />
      </div>

      <div className='dark:flex gap-2 hidden'>
        <Sun size={20} />
      </div>

      <span className='sr-only'>Toggle theme</span>
    </Link>
  )
}
