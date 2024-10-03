import { HDKey } from '@scure/bip32'
import { wordlist } from '@scure/bip39/wordlists/english'
import { bytesToHex } from '@noble/hashes/utils'
import { PersonaData } from '../personas/page'
import {
  deriveNostrKeyFromPath,
  nip06DerivationPath,
  NostrPrivateKey,
  NostrPublicKey,
  toNostrPrivateKey,
  toNostrPublicKey,
} from './app_nostr'
import { sha256 } from '@noble/hashes/sha256'
import { entropyToMnemonic, mnemonicToSeedSync } from '@scure/bip39'

export type Persona = {
  persona: PersonaData
  idHash: Uint8Array
  entropy: Uint8Array
  entropyHex: string
  mnemonic: string
  seed: Uint8Array
  seedHex: string
  masterKey: HDKey
}

export type Nip06SubIdentity = {
  displayName: PersonaData['displayName']
  path: string
  privateKey: NostrPrivateKey
  publicKey: NostrPublicKey
}

export const generatePersona = (value: PersonaData): Persona => {
  const idHash = sha256(value.id)
  const entropy = idHash.slice(0, 16)
  const entropyHex = bytesToHex(entropy)
  const mnemonic = entropyToMnemonic(entropy, wordlist)
  const seed = mnemonicToSeedSync(mnemonic)
  const seedHex = bytesToHex(seed)
  const masterKey = HDKey.fromMasterSeed(seed)

  return {
    persona: value,
    idHash,
    entropy,
    entropyHex,
    mnemonic,
    seed,
    seedHex,
    masterKey,
  }
}

export const generateNip06SubIdentity = (
  value: Persona,
  index: number,
): Nip06SubIdentity => {
  const path = nip06DerivationPath(index)
  const key = deriveNostrKeyFromPath(value.masterKey, path)
  return {
    displayName: `${value.persona.displayName} #${index}`,
    path,
    privateKey: toNostrPrivateKey(key.privateKey),
    publicKey: toNostrPublicKey(key.publicKey),
  }
}
