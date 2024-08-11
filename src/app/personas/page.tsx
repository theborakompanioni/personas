'use client'

import Link from 'next/link'
import { Avatar, AvatarProps, Card, Stack } from 'react-daisyui'
import PERSONAS from '../personas.json'
import ROUTES from '../lib/routes'

type Persona = {
  id: string
  displayName: string
  shortDescription: string
  description: string
}

interface PersonaProps {
  persona: Persona
  className?: string
  bgColor?: AvatarProps['color']
  avatarBorderColor?: AvatarProps['borderColor']
}

function Persona({
  className,
  bgColor = 'neutral',
  avatarBorderColor = 'neutral',
  persona: { id, displayName, shortDescription },
}: PersonaProps) {
  return (
    <>
      <Stack><Link href={`${ROUTES.personas}/${id}`}>
        <Card
          className={`${className} text-center shadow-md bg-${bgColor} text-${bgColor}-content`}
        >
          <Card.Body className="items-center">
            <Avatar
              shape="circle"
              border
              borderColor={avatarBorderColor}
              src={`https://robohash.org/${id}.png`}
            />
            <Card.Title>{displayName}</Card.Title>
            <p>{shortDescription}</p>
            <Link className="link link-hover" href={`${ROUTES.personas}/${id}`}>
              {`${ROUTES.personas}/${id}`}
            </Link>
          </Card.Body>
        </Card></Link>
        <Card
          className={`text-center shadow-md bg-${bgColor} text-${bgColor}-content`}
        >
          <Card.Body>
            <Card.Title>&nbsp;</Card.Title>
            <p>&nbsp;</p>
          </Card.Body>
        </Card>
        <Card
          className={`text-center shadow-md bg-${bgColor} text-${bgColor}-content`}
        >
          <Card.Body>
            <Card.Title>&nbsp;</Card.Title>
            <p>&nbsp;</p>
          </Card.Body>
        </Card>
      </Stack>
    </>
  )
}

export default function Page() {
  return (
    <main>
      <h2 className="text-3xl font-bold tracking-tighter">Personas</h2>
      <div className="text-lg text-slate-500 break-all"></div>

      <div className="my-12 flex flex-wrap justify-center gap-8">
        <Persona
          className="w-96 min-h-80"
          persona={PERSONAS.alice}
          bgColor="primary"
          avatarBorderColor="secondary"
        />
        <Persona
          className="w-96 min-h-80"
          persona={PERSONAS.bob}
          bgColor="primary"
          avatarBorderColor="secondary"
        />
      </div>

      <div className="my-4 flex flex-wrap justify-center gap-2">
        <Persona
          className="w-96 min-h-80"
          persona={PERSONAS.charlie}
          avatarBorderColor="neutral"
        />
        <Persona
          className="w-96 min-h-80"
          persona={PERSONAS.dave}
          avatarBorderColor="neutral"
        />
        <Persona
          className="w-96 min-h-80"
          persona={PERSONAS.eve}
          avatarBorderColor="warning"
        />
        <Persona
          className="w-96 min-h-80"
          persona={PERSONAS.frank}
          avatarBorderColor="neutral"
        />
      </div>
    </main>
  )
}
