'use client'

import { PropsWithChildren, ReactNode } from 'react'
import { KeyIcon, UserGroupIcon } from '@heroicons/react/24/outline'
import { Navbar as DaisyNavbar, Button, Menu } from 'react-daisyui'
import Link from 'next/link'
import { Url } from 'next/dist/shared/lib/router/router'
import Image from 'next/image'
import ROUTES from '../lib/routes'

type NavbarProps = {
  title: ReactNode
  toggleSidebar: () => void
}

function Title({ to, children }: PropsWithChildren<{ to: Url }>) {
  return (
    <>
      <div className="font-title inline-flex text-2xl transition-all duration-100 md:text-3xl">
        <Link href={to}>
          <Button className="text-xl normal-case" color="ghost">
            {children}
          </Button>
        </Link>
      </div>
    </>
  )
}

export function Navbar({ title, toggleSidebar }: NavbarProps) {
  return (
    <div className="bg-base-200 text-base-200-content">
      <DaisyNavbar className="md:container mx-auto gap-2 mb-6">
        <DaisyNavbar.Start>
          <div className="flex-none md:hidden">
            <Button shape="square" color="ghost" onClick={toggleSidebar}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-6 h-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </Button>
          </div>
          <div className="flex-1 hidden md:block">
            <span data-testid="sidebar-title-md">
              <Title to={ROUTES.index}>
                <>
                  <div className="mr-2">
                    <Image
                      src="/logo192.png"
                      alt="logo"
                      width={32}
                      height={32}
                    />
                  </div>
                  {title}
                </>
              </Title>
            </span>
          </div>
        </DaisyNavbar.Start>
        <DaisyNavbar.Center className="flex-none md:hidden">
          <span data-testid="sidebar-title">
            <Title to={ROUTES.index}>
              <>
                <div className="mr-2">
                  <Image src="logo192.png" alt="logo" width={32} height={32} />
                </div>
                {title}
              </>
            </Title>
          </span>
        </DaisyNavbar.Center>
        <DaisyNavbar.End>
          <div className="flex-none hidden md:block">
            <Menu horizontal={true} className="gap-2">
              <Menu.Item className="rounded-lg">
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
            </Menu>
          </div>
        </DaisyNavbar.End>
      </DaisyNavbar>
    </div>
  )
}
