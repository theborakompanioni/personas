'use client'

import { Footer as DaisyFooter } from 'react-daisyui'
import Link from 'next/link'
import ROUTES from '../lib/routes'
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'

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
        <div>
          <DaisyFooter.Title>Software</DaisyFooter.Title>
          <Link
            className="flex gap-1 items-center link link-hover"
            href="https://github.com/theborakompanioni/personas"
            rel="noopener noreferrer"
            target="_blank"
          >
            GitHub
            <ArrowTopRightOnSquareIcon className="h-4 w-4" />
          </Link>
          <Link
            className="flex gap-1 items-center link link-hover"
            href="https://raw.githubusercontent.com/theborakompanioni/personas/devel/LICENSE"
            rel="noopener noreferrer"
            target="_blank"
          >
            License
            <ArrowTopRightOnSquareIcon className="h-4 w-4" />
          </Link>
        </div>
        <div></div>
      </DaisyFooter>
    </div>
  )
}
