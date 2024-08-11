'use client'

import { useMemo, useState } from 'react'
import { Button, Form, Input } from 'react-daisyui'
import { generateSecretKey, getPublicKey, nip19 } from 'nostr-tools'
import { bytesToHex } from '@noble/hashes/utils'
import {
  clearKeyFromSessionStorage,
  readKeyFromSessionStorage,
  writeKeyToSessionStorage,
} from '../lib/nostr/identity'

type IdentityFormProps = {
  value?: Uint8Array
  onSubmit: (val: Uint8Array) => void
  onReset: () => void
  disabled?: boolean
}

function IdentityForm({
  value,
  onSubmit,
  onReset,
  disabled,
}: IdentityFormProps) {
  const publicKey = useMemo(() => (value ? getPublicKey(value) : null), [value])

  return (
    <Form
      noValidate
      onReset={(e) => {
        e.preventDefault()
        e.stopPropagation()

        onReset()
      }}
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()

        onSubmit(generateSecretKey())
      }}
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Private key (nsec)</span>
            </label>
            <Input
              name="first"
              size="lg"
              className="bg-base-200 color-base-200 font-mono"
              value={value ? nip19.nsecEncode(value) : ''}
              readOnly={true}
              disabled={disabled}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Private key (Hex)</span>
            </label>
            <Input
              name="first"
              size="lg"
              className="bg-base-200 color-base-200 font-mono"
              value={value ? bytesToHex(value) : ''}
              readOnly={true}
              disabled={disabled}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Public key (npub)</span>
            </label>
            <Input
              name="second"
              size="lg"
              className="bg-base-200 color-base-200 font-mono"
              value={publicKey ? nip19.npubEncode(publicKey) : ''}
              readOnly={true}
              disabled={disabled}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Public key (Hex)</span>
            </label>
            <Input
              name="second"
              size="lg"
              className="bg-base-200 color-base-200 font-mono"
              value={publicKey ? publicKey : ''}
              readOnly={true}
              disabled={disabled}
            />
          </div>
        </div>

        <div className="flex gap-2 justify-center">
          <Button type="reset" size="lg" disabled={disabled}>
            Reset
          </Button>
          <Button type="submit" size="lg" disabled={disabled}>
            Generate new keys
          </Button>
        </div>
      </div>
    </Form>
  )
}

export default function Page() {
  const [privateKey, setPrivateKey] = useState(readKeyFromSessionStorage())

  return (
    <main className="flex flex-col gap-2">
      <h2 className="text-3xl font-bold tracking-tighter">Identitiy</h2>

      <div className="flex flex-col gap-4 mb-4">
        <IdentityForm
          value={privateKey || undefined}
          onReset={() => {
            clearKeyFromSessionStorage()
            setPrivateKey(null)
          }}
          onSubmit={async (value) => {
            writeKeyToSessionStorage(value)
            setPrivateKey(value)
          }}
        />
      </div>
    </main>
  )
}
