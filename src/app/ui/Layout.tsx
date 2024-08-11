'use client'

import { PropsWithChildren, ReactNode, useState } from 'react'
import { Drawer, DrawerProps, Theme } from 'react-daisyui'
import { Sidebar } from './Sidebar'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { useSettings } from '../context/SettingsContext'

type LayoutProps = {
  title: ReactNode
  drawer: Partial<DrawerProps>
}

export default function Layout({
  title,
  children,
  drawer,
}: PropsWithChildren<LayoutProps>) {
  const { theme } = useSettings()
  const [sidebarVisible, setSitebarVisible] = useState(false)
  const toggleSidebarVisible = () => setSitebarVisible((current) => !current)

  return (
    <Theme dataTheme={theme || 'dark'}>
      <Drawer
        {...drawer}
        side={<Sidebar title={title} />}
        end={false}
        open={sidebarVisible}
        onClickOverlay={toggleSidebarVisible}
        className="min-h-screen"
      >
        <Navbar title={title} toggleSidebar={toggleSidebarVisible} />
        <div className="md:container mx-auto">
          <div className="px-4 pb-32">{children}</div>
        </div>
        <Footer />
      </Drawer>
    </Theme>
  )
}
