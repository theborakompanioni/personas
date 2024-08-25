'use client'

import { useMemo } from 'react'
import { Avatar } from 'react-daisyui'
import { Persona } from '../page'
import { HDKey } from '@scure/bip32'
import { entropyToMnemonic, mnemonicToSeedSync } from '@scure/bip39'
import { wordlist } from '@scure/bip39/wordlists/english'
import { sha256 } from '@noble/hashes/sha256'
import { bytesToHex } from '@noble/hashes/utils'

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
        <div className="text-lgtext-neutral-content break-all">
          {'>'} {value.description}
        </div>
      </div>

      <div className="flex my-6 bg-neutral rounded-lg p-8">
        <div className="text-lgtext-neutral-content break-all">
          <pre>
            Id: {value.id}
            <br />
            Entropy (
            <code className="text-accent">
              `sha256("{value.id}").slice(0, 16)`
            </code>
            ): {entropyHex}
            <br />
            Mnemonic: {mnemonic}
            <br />
            Seed: {seedHex}
            <br />
            xpriv: {masterKey.privateExtendedKey}
            <br />
            xpub: {masterKey.publicExtendedKey}
          </pre>
        </div>
      </div>
    </>
  )
}
