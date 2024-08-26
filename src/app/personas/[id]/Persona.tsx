'use client'

import { useMemo, useState } from 'react'
import { Avatar } from 'react-daisyui'
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
            <span className="text-primary">Id:</span> {value.id}
            <br />
            <span className="text-primary">Entropy:</span> {entropyHex} (
            <code className="text-accent">
              `sha256("{value.id}").slice(0, 16)`
            </code>
            )
            <br />
            <span className="text-primary">Mnemonic:</span> {mnemonic}
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

      <div className="grid grid-cols-2 gap-2">
        {subPersonas.map((it) => (
          <div className="flex-1 bg-neutral rounded-lg p-8 text-sm text-neutral-content break-all">
            <div className="text-lg mb-2">{it.displayName}</div>
            <pre>
              <span className="text-primary">path:</span> {it.path}
              <br />
              <span className="text-primary">nsec:</span> {it.privateKey.nip19}
              <br />
              <span className="text-primary">nsec (hex):</span>{' '}
              {it.privateKey.hex}
              <br />
              <span className="text-primary">npub:</span> {it.publicKey.nip19}
              <br />
              <span className="text-primary">npub (hex):</span>{' '}
              {it.publicKey.hex}
              <br />
            </pre>
          </div>
        ))}
      </div>
    </>
  )
}
