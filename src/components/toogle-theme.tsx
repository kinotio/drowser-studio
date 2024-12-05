import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'
import Link from 'next/link'

export const ToggleTheme = ({ inStudio = false }: { inStudio: boolean }) => {
  const { theme, setTheme } = useTheme()

  if (inStudio) {
    return (
      <Link
        href='#'
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        className='justify-start'
      >
        <div className='flex gap-2 dark:hidden items-center'>
          <Moon size={20} />
          <span>Dark</span>
        </div>

        <div className='dark:flex gap-2 hidden items-center'>
          <Sun size={20} />
          <span>Light</span>
        </div>
      </Link>
    )
  }

  return (
    <Link
      href='#'
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
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
    </Link>
  )
}
