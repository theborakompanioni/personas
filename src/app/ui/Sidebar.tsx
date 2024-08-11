'use client'

import { PropsWithChildren, ReactNode } from 'react'
import {
  HomeIcon,
  WrenchScrewdriverIcon,
  InformationCircleIcon,
  UserGroupIcon,
  KeyIcon,
} from '@heroicons/react/24/outline'
import { Menu } from 'react-daisyui'
import ROUTES from '../lib/routes'
import Link from 'next/link'

interface SidebarProps {
  title: ReactNode
}

export function Sidebar({ title, children }: PropsWithChildren<SidebarProps>) {
  return (
    <div className="menu w-80 md:w-80 bg-base-100 h-screen">
      <Menu horizontal={false} className="gap-2">
        <Menu.Title className="mb-2">{title}</Menu.Title>
        <Menu.Item>
          <Link href={ROUTES.index}>
            <HomeIcon className="w-6 h-6" />
            Home
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link href={ROUTES.personas}>
            <UserGroupIcon className="w-6 h-6" />
            Personas
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link href={ROUTES.identity}>
            <KeyIcon className="w-6 h-6" />
            Identity
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link href={ROUTES.settings}>
            <WrenchScrewdriverIcon className="w-6 h-6" />
            Settings
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link href={ROUTES.about}>
            <InformationCircleIcon className="w-6 h-6" />
            About
          </Link>
        </Menu.Item>
      </Menu>
      <>{children}</>
    </div>
  )
}
