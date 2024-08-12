'use client'

import { Footer as DaisyFooter } from 'react-daisyui'
import Link from 'next/link'
import ROUTES from '../lib/routes'

export function Footer() {
  return (
    <div className="bg-base-300 text-base-300-content sticky top-[100vh] p-10">
      <DaisyFooter className="md:container mx-auto">
        <div>
          <DaisyFooter.Title>App</DaisyFooter.Title>
          <Link className="link link-hover" href={ROUTES.index}>
            Home
          </Link>
          <Link className="link link-hover" href={ROUTES.personas}>
            Personas
          </Link>
          <Link className="link link-hover" href={ROUTES.identity}>
            Identity
          </Link>
        </div>
        <div>
          <DaisyFooter.Title>More</DaisyFooter.Title>
          <Link className="link link-hover" href={ROUTES.settings}>
            Settings
          </Link>
          <Link className="link link-hover" href={ROUTES.about}>
            About
          </Link>
        </div>
        <div></div>
        <div></div>
      </DaisyFooter>
    </div>
  )
}
