'use client'

import Link from 'next/link'
import { icons } from 'lucide-react'

import { Icon } from '@/components/ui/icon'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList
} from '@/components/ui/navigation-menu'

import { MenuType } from '@/lib/definitions'

export const Navigation = ({ menus }: { menus: MenuType[] }) => {
  return (
    <NavigationMenu>
      <NavigationMenuList className='gap-6'>
        {menus.map((menu) => (
          <NavigationMenuItem key={menu.path}>
            <Link href={menu.path} legacyBehavior passHref>
              <NavigationMenuLink className='py-4 text-sm flex items-center justify-center gap-2 border-black dark:border-white'>
                <Icon name={menu.icon as keyof typeof icons} size={14} />
                {menu.label}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
