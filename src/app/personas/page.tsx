'use client'

import Link from 'next/link'
import { Avatar, AvatarProps, Card, Stack } from 'react-daisyui'
import PERSONAS from '../personas.json'
import ROUTES from '../lib/routes'

export type PersonaData = {
  id: string
  displayName: string
  shortDescription: string
  description: string
}

interface PersonaViewProps {
  persona: PersonaData
  className?: string
  bgColor?: AvatarProps['color']
  avatarBorderColor?: AvatarProps['borderColor']
}

function PersonaView({
  className,
  bgColor = 'neutral',
  avatarBorderColor = 'neutral',
  persona: { id, displayName, shortDescription },
}: PersonaViewProps) {
  return (
    <>
      <Stack>
        <Link href={`${ROUTES.personas}/${id}`}>
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
              <p className="text-sm">{shortDescription}</p>
            </Card.Body>
          </Card>
        </Link>
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
        <PersonaView
          className="w-80 min-h-64"
          persona={PERSONAS.alice}
          bgColor="primary"
          avatarBorderColor="secondary"
        />
        <PersonaView
          className="w-80 min-h-64"
          persona={PERSONAS.bob}
          bgColor="primary"
          avatarBorderColor="secondary"
        />
      </div>

      <div className="my-4 flex flex-wrap justify-center gap-2">
        <PersonaView
          className="w-80 min-h-64"
          persona={PERSONAS.charlie}
          avatarBorderColor="neutral"
        />
        <PersonaView
          className="w-80 min-h-64"
          persona={PERSONAS.dave}
          avatarBorderColor="neutral"
        />
        <PersonaView
          className="w-80 min-h-64"
          persona={PERSONAS.eve}
          avatarBorderColor="warning"
        />
        <PersonaView
          className="w-80 min-h-64"
          persona={PERSONAS.frank}
          avatarBorderColor="neutral"
        />
      </div>
    </main>
  )
}
