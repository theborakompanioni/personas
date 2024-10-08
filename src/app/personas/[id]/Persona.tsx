'use client'

import { PropsWithChildren, useMemo, useState } from 'react'
import { DocumentDuplicateIcon, LinkIcon } from '@heroicons/react/24/outline'
import {
  Avatar,
  Breadcrumbs,
  Button,
  Card,
  Dropdown,
  DropdownProps,
  Link,
} from 'react-daisyui'
import { ButtonProps } from 'react-daisyui/dist/Button'
import { PersonaData } from '../page'
import {
  generateNip06SubIdentity,
  generatePersona,
  Nip06SubIdentity,
} from '../../lib/app_persona'

export default function PersonaPageContent({ value }: { value: PersonaData }) {
  const persona = useMemo(() => generatePersona(value), [value])

  const [subIdentities] = useState<Nip06SubIdentity[]>(() => {
    return Array(16 + 1)
      .fill('')
      .map((_, index) => generateNip06SubIdentity(persona, index))
  })

  const [mainIdentity, otherIdentities] = useMemo(
    () => [subIdentities[0], subIdentities.slice(1)],
    [subIdentities],
  )

  return (
    <>
      <div className="flex items-center gap-6">
        <Avatar
          shape="circle"
          border
          borderColor="neutral"
          src={`https://robohash.org/${value.id}.png`}
        />
        <div>
          <h2 className="text-3xl font-bold tracking-tighter">
            {value.displayName}
          </h2>
          <div className="text-slate-500">{value.shortDescription}</div>
        </div>
      </div>

      <div className="flex my-4 bg-neutral rounded-lg p-8">
        <div className="text-lg text-neutral-content break-all">
          {'>'} {value.description}
        </div>
      </div>

      <div className="flex flex-col my-4 bg-neutral rounded-lg p-8 text-neutral-content break-all">
        <div className="flex flex-col gap-2">
          <label className="input input-bordered input-md flex items-center gap-1">
            <div className="text-primary min-w-32">
              <span className="pe-1">Entropy</span>

              <InfoDropdown>
                <code className="text-info w-64">
                  &#96;sha256(&quot;{value.id}&quot;).slice(0, 16)&#96;
                </code>
              </InfoDropdown>
            </div>
            <input
              className="flex-1"
              type="text"
              value={persona.entropyHex}
              readOnly
            />
            <CopyButton value={persona.entropyHex} />
          </label>

          <label className="input input-bordered input-md flex items-center gap-1">
            <div className="text-primary min-w-32">Mnemonic</div>
            <input
              className="flex-1"
              type="text"
              value={persona.mnemonic}
              readOnly
            />
            <CopyButton value={persona.mnemonic} />
          </label>
        </div>
      </div>

      <div className="my-4">
        <SubIdentityCard
          value={mainIdentity}
          className="border-2 border-primary"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
        {otherIdentities.map((it, index) => (
          <SubIdentityCard value={it} key={index} />
        ))}
      </div>
    </>
  )
}

function SubIdentityCard({
  value,
  className,
}: {
  value: Nip06SubIdentity
  className?: string
}) {
  return (
    <>
      <div
        className={`flex-1 bg-neutral rounded-lg p-8 text-sm text-neutral-content break-all ${className ?? ''}`}
      >
        <div className="mb-2">
          <div className="text-lg">{value.displayName}</div>
          <div className="flex items-center">
            <Breadcrumbs>
              {value.path.split('/').map((it, index) => (
                <Breadcrumbs.Item key={index}>{it}</Breadcrumbs.Item>
              ))}
            </Breadcrumbs>
            <InfoDropdown className="ms-2">
              <div>
                Derivation path (
                <Link
                  color="info"
                  href="https://github.com/nostr-protocol/nips/blob/master/06.md"
                  target="_blank"
                >
                  NIP-06
                </Link>
                )
              </div>
              <label className="input input-bordered input-sm flex items-center gap-1">
                <div className="text-primary min-w-16">path</div>
                <input
                  className="flex-1"
                  type="text"
                  value={value.path}
                  readOnly
                />
              </label>
            </InfoDropdown>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div>
            <label className="input input-bordered input-sm flex items-center gap-1">
              <div className="text-primary min-w-20">nsec</div>
              <input
                className="flex-1"
                type="text"
                value={value.privateKey.nip19}
                readOnly
              />
              <CopyButton value={value.privateKey.nip19} />
            </label>
          </div>
          <div>
            <label className="input input-bordered input-sm flex items-center gap-1">
              <div className="text-primary min-w-20">nsec (hex)</div>
              <input
                className="flex-1"
                type="text"
                value={value.privateKey.hex}
                readOnly
              />
              <CopyButton value={value.privateKey.hex} />
            </label>
          </div>
          <div>
            <label className="input input-bordered input-sm flex items-center gap-1">
              <div className="text-primary min-w-20">npub</div>
              <input
                className="flex-1"
                type="text"
                value={value.publicKey.nip19}
                readOnly
              />
              <CopyButton value={value.publicKey.nip19} />
            </label>
          </div>
          <div>
            <label className="input input-bordered input-sm flex items-center gap-1">
              <div className="text-primary min-w-20">npub (hex)</div>
              <input
                className="flex-1"
                type="text"
                value={value.publicKey.hex}
                readOnly
              />
              <CopyButton value={value.publicKey.hex} />
            </label>
          </div>
          <div className="mt-2">
            <a
              className="btn btn-sm"
              target="_blank"
              href={`https://njump.me/${value.publicKey.nip19}`}
            >
              njump <LinkIcon className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

function CopyButton({
  value,
  className,
  size = 'xs',
}: {
  value: string
  className?: string
  size?: ButtonProps['size']
}) {
  const copy = async () => {
    await navigator.clipboard.writeText(value)
  }

  return (
    <>
      <Button className={className} size={size} onClick={copy}>
        <DocumentDuplicateIcon className="w-4 h-4" />
      </Button>
    </>
  )
}

function InfoDropdown({
  children,
  ...props
}: PropsWithChildren<Omit<DropdownProps, 'item'>>) {
  return (
    <>
      <Dropdown hover {...props}>
        <Dropdown.Toggle
          button={false}
          className="btn btn-circle btn-ghost btn-xs"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="w-4 h-4 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        </Dropdown.Toggle>
        <Dropdown.Menu className="card compact shadow rounded-box p-2 border border-2 border-info">
          <Card.Body>{children}</Card.Body>
        </Dropdown.Menu>
      </Dropdown>
    </>
  )
}
