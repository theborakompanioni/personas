'use client'

import { PropsWithChildren, useMemo, useState } from 'react'
import {
  Avatar,
  Breadcrumbs,
  Card,
  Dropdown,
  DropdownProps,
} from 'react-daisyui'
import { HDKey } from '@scure/bip32'
import { entropyToMnemonic, mnemonicToSeedSync } from '@scure/bip39'
import { wordlist } from '@scure/bip39/wordlists/english'
import { sha256 } from '@noble/hashes/sha256'
import { bytesToHex } from '@noble/hashes/utils'
import {
  deriveNostrKeyFromPath,
  nip06DerivationPath,
  NostrPrivateKey,
  NostrPublicKey,
  toNostrPrivateKey,
  toNostrPublicKey,
} from '../../lib/app_nostr'
import { Persona } from '../page'

type Nip06SubPersona = {
  displayName: Persona['displayName']
  path: string
  privateKey: NostrPrivateKey
  publicKey: NostrPublicKey
}

export default function PersonaPageContent({ value }: { value: Persona }) {
  const idHash = useMemo(() => sha256(value.id), [value.id])
  const entropy = useMemo(() => idHash.slice(0, 16), [idHash])
  const entropyHex = useMemo(() => bytesToHex(entropy), [entropy])
  const mnemonic = useMemo(
    () => entropyToMnemonic(entropy, wordlist),
    [entropy],
  )
  const seed = useMemo(() => mnemonicToSeedSync(mnemonic), [mnemonic])
  const seedHex = useMemo(() => bytesToHex(seed), [seed])
  const masterKey = useMemo(() => seed && HDKey.fromMasterSeed(seed), [seed])

  const nostrKey0Path = useMemo(() => nip06DerivationPath(0), [])

  const nostrKey0 = useMemo(
    () => deriveNostrKeyFromPath(masterKey, nostrKey0Path),
    [nostrKey0Path],
  )
  const nostrKey0PrivateKey = useMemo(
    () => toNostrPrivateKey(nostrKey0.privateKey),
    [nostrKey0],
  )
  const nostrKey0PublicKey = useMemo(
    () => toNostrPublicKey(nostrKey0.publicKey),
    [nostrKey0],
  )

  const [subPersonas, setSubPersonas] = useState<Nip06SubPersona[]>(() => {
    return Array(16)
      .fill('')
      .map((_, index) => {
        const path = nip06DerivationPath(index)
        const key = deriveNostrKeyFromPath(masterKey, path)
        return {
          displayName: `${value.displayName} ${index}`,
          path,
          privateKey: toNostrPrivateKey(key.privateKey),
          publicKey: toNostrPublicKey(key.publicKey),
        }
      })
  })

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

      <div className="flex my-6 bg-neutral rounded-lg p-8">
        <div className="text-lg text-neutral-content break-all">
          {'>'} {value.description}
        </div>
      </div>

      <div className="flex my-6 bg-neutral rounded-lg p-8">
        <div className="text-lg text-neutral-content break-all">
          <pre>
            <div>
              <span className="text-primary">Id:</span> {value.id}
            </div>

            <div className="flex items-center">
              <div>
                <span className="text-primary">Entropy:</span> {entropyHex}
              </div>
              <InfoDropdown>
                <code className="text-info">
                  `sha256("{value.id}").slice(0, 16)`
                </code>
              </InfoDropdown>
            </div>
            <div>
              <span className="text-primary">Mnemonic:</span> {mnemonic}
            </div>
            <div className="hidden">
              <br />
              Seed: {seedHex}
              <br />
              xpriv: {masterKey.privateExtendedKey}
              <br />
              xpub: {masterKey.publicExtendedKey}
            </div>
          </pre>
        </div>
      </div>

      <div className="grid grid-cols-1 2xl:grid-cols-2 gap-2">
        {subPersonas.map((it, index) => (
          <SubPersonaCard value={it} key={index} />
        ))}
      </div>
    </>
  )
}

function SubPersonaCard({ value }: { value: Nip06SubPersona }) {
  return (
    <>
      <div className="flex-1 bg-neutral rounded-lg p-8 text-sm text-neutral-content break-all">
        <div className="mb-2">
          <div className="text-lg">{value.displayName}</div>
          <div className="flex items-center">
            <Breadcrumbs>
              {value.path.split('/').map((it) => (
                <Breadcrumbs.Item>{it}</Breadcrumbs.Item>
              ))}
            </Breadcrumbs>
            <InfoDropdown className="ms-2">
              NIP-06 Derivation path
              <div className="w-64">
                <span className="text-primary">path:</span> {value.path}
              </div>
            </InfoDropdown>
          </div>
        </div>
        <pre>
          <span className="text-primary">nsec:</span> {value.privateKey.nip19}
          <br />
          <span className="text-primary">nsec (hex):</span>{' '}
          {value.privateKey.hex}
          <br />
          <span className="text-primary">npub:</span> {value.publicKey.nip19}
          <br />
          <span className="text-primary">npub (hex):</span>{' '}
          {value.publicKey.hex}
          <br />
        </pre>
      </div>
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
          className="btn btn-circle btn-ghost btn-xs text-info"
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
