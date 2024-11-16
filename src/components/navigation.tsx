'use client'

import Link from 'next/link'
import { icons } from 'lucide-react'
import { usePathname } from 'next/navigation'

import { Icon } from '@/components/ui/icon'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList
} from '@/components/ui/navigation-menu'
import { ReportSidebar } from '@/components/report-sidebar'

import { MenuType } from '@/lib/definitions'
import { PATH } from '@/lib/constants'
import { Button } from './ui/button'

export const Navigation = ({
  isMobile = false,
  menus
}: {
  isMobile?: boolean
  menus: MenuType[]
}) => {
  const pathName = usePathname()
  const isOnMobileWithReport = isMobile && pathName.startsWith(PATH.STUDIO_REPORTS)

  return (
    <div>
      <NavigationMenu className={`${isMobile ? 'items-start' : ''}`}>
        <NavigationMenuList className={`gap-6 ml-2 ${isOnMobileWithReport ? '' : 'flex-col'}`}>
          {menus.map((menu) => (
            <NavigationMenuItem key={menu.path}>
              <Link href={menu.path} legacyBehavior passHref>
                {isOnMobileWithReport ? (
                  <Button variant='outline' size='icon'>
                    <Icon name={menu.icon as keyof typeof icons} size={14} />
                  </Button>
                ) : (
                  <NavigationMenuLink className='text-sm flex items-center justify-center gap-2 border-black dark:border-white'>
                    <Icon name={menu.icon as keyof typeof icons} size={14} />
                    {menu.label}
                  </NavigationMenuLink>
                )}
              </Link>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>

      {isOnMobileWithReport ? (
        <div className='my-4 flex justify-start'>
          <ReportSidebar />
        </div>
      ) : null}
    </div>
  )
}
