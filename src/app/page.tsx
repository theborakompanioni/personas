'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Hero } from 'react-daisyui'
import TextTransition, { presets } from 'react-text-transition'

import PERSONAS from './personas.json'
import ROUTES from './lib/routes'

const TEXTS = Object.values(PERSONAS).map((it) => it.displayName)

export default function Home() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const intervalId = setInterval(
      () => setIndex((i) => (i + 1) % TEXTS.length),
      1200,
    )
    return () => clearTimeout(intervalId)
  }, [])

  return (
    <main className="flex flex-col">
      <Hero>
        <Hero.Content className="text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">
              Hello&nbsp;
              <TextTransition inline springConfig={presets.stiff}>
                {TEXTS[index]}
              </TextTransition>
            </h1>
            <p className="py-6">
              Easily craft and manage unique Nostr personas tailored for any
              context—personal, professional, or creative.
            </p>

            <Link className="btn btn-primary btn-lg hover:no-underline" href={ROUTES.personas}>
              Get Started
            </Link>
          </div>
        </Hero.Content>
      </Hero>
    </main>
  )
}
