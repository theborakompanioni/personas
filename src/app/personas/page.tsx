'use client'

import { Avatar, AvatarProps, Card, Stack } from 'react-daisyui'

type Persona = {
  name: string
  displayName: string
  description: string
}

const PERSONAS = {
  alice: {
    name: 'Alice',
    displayName: 'Alice',
    description:
      'An original, generic character. Generally, she wants to exchange a message or cryptographic key with Bob.',
  },
  bob: {
    name: 'Bob',
    displayName: 'Bob',
    description:
      'An original, generic character. Generally, he wants to exchange a message or cryptographic key with Alice.',
  },
  charlie: {
    name: 'Charlie',
    displayName: 'Charlie',
    description: 'A generic third participant.',
  },
  dave: {
    name: 'Dave',
    displayName: 'Dave',
    description: 'A generic fourth participant.',
  },
  eve: {
    name: 'Eve',
    displayName: 'Eve',
    description:
      'An eavesdropper, who is usually a passive attacker. While they can listen in on messages between Alice and Bob, they cannot modify them.',
  },
  frank: {
    name: 'Frank',
    displayName: 'Frank',
    description: 'A generic sixth participant.',
  },
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
  persona: { name, displayName = name, description },
}: PersonaProps) {
  return (
    <>
      <Stack>
        <Card
          className={`${className} text-center shadow-md bg-${bgColor} text-${bgColor}-content`}
        >
          <Card.Body className="items-center">
            <Avatar
              shape="circle"
              border
              borderColor={avatarBorderColor}
              src={`https://robohash.org/${name}.png`}
            />
            <Card.Title>{displayName}</Card.Title>
            <p>{description}</p>
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

      <div className="my-12 flex flex-wrap justify-center gap-2">
        <Persona
          className="w-96 min-h-80"
          persona={PERSONAS.alice}
          bgColor="primary"
          avatarBorderColor="secondary"
        />
        <div className="min-h-80 flex justify-center items-center mx-4 text-5xl ">
          &
        </div>
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
