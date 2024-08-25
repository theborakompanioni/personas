import { HDKey } from '@scure/bip32'
import { isDevMode } from './dev'
import { bech32 } from '@scure/base'
import { bytesToHex } from '@noble/hashes/utils'

const developmentRelays: string[] = [
  'ws://localhost:7000',
  'ws://localhost:7000', // duplicate on purpose (e.g. testing pool behaviour)
  'ws://127.0.0.1:7000',
  'wss://non-existing-nostr-relay.example.com:7000',
]

const publicRelays: string[] = [
  //'wss://nostr-pub.wellorder.net',
  'wss://relay.damus.io',
  'wss://relay.primal.net',
  'wss://relay.snort.social',
  'wss://nostr.swiss-enigma.ch',
]

const DEFAULT_RELAYS = [...(isDevMode() ? developmentRelays : publicRelays)]

export const defaultRelays = () => DEFAULT_RELAYS

export const nip06DerivationPath = (account: number = 0) =>
  `m/44'/1237'/${account}'/0/0`

// https://github.com/nostr-protocol/nips/blob/master/06.md
export const deriveNostrKeyFromPath = (
  masterKey: HDKey,
  path: string,
): HDKey => {
  return masterKey.derive(path)
}

export const deriveNostrKey = (
  masterKey: HDKey,
  account: number = 0,
): HDKey => {
  return deriveNostrKeyFromPath(masterKey, nip06DerivationPath(account))
}

// NIP-19: bech32-encoded entities
// https://github.com/nostr-protocol/nips/blob/master/19.md
const NOSTR_PUBLIC_KEY_PREFIX = 'npub'
const NOSTR_PRIVATE_KEY_PREFIX = 'nsec'

export type Nip19EncodedPublicKey =
  `${typeof NOSTR_PRIVATE_KEY_PREFIX}1${string}`
export type NostrPublicKey = {
  bytes: Uint8Array
  nip19: Nip19EncodedPublicKey
  hex: string
}

export type Nip19EncodedPrivateKey =
  `${typeof NOSTR_PRIVATE_KEY_PREFIX}1${string}`
export type NostrPrivateKey = {
  bytes: Uint8Array
  nip19: Nip19EncodedPrivateKey
  hex: string
}

const PUBKEY_LIMIT = NOSTR_PUBLIC_KEY_PREFIX.length + 7 + 128
const PRVKEY_LIMIT = NOSTR_PRIVATE_KEY_PREFIX.length + 7 + 128

export const toNostrPublicKey = (publicKey: Uint8Array): NostrPublicKey => {
  const words = bech32.toWords(publicKey)
  const encoded = bech32.encode(
    NOSTR_PUBLIC_KEY_PREFIX,
    words,
    PUBKEY_LIMIT,
  ) as Nip19EncodedPublicKey
  return {
    bytes: publicKey,
    nip19: encoded,
    hex: bytesToHex(publicKey),
  }
}

export const toNostrPrivateKey = (privateKey: Uint8Array): NostrPrivateKey => {
  const words = bech32.toWords(privateKey)
  const encoded = bech32.encode(
    NOSTR_PRIVATE_KEY_PREFIX,
    words,
    PRVKEY_LIMIT,
  ) as Nip19EncodedPrivateKey
  return {
    bytes: privateKey,
    nip19: encoded,
    hex: bytesToHex(privateKey),
  }
}
