import { bytesToHex, hexToBytes } from '@noble/hashes/utils'
import { generateSecretKey, getPublicKey } from 'nostr-tools'

export const generatePrivateKey = (): Uint8Array => {
  return generateSecretKey()
}

export const publicKey = (privateKey: Uint8Array): Uint8Array => {
  return hexToBytes(getPublicKey(privateKey))
}

const IDENTITY_SESSION_KEY = 'identity'

export const readKeyFromSessionStorage = (): Uint8Array | null => {
  try {
    const val = sessionStorage.getItem(IDENTITY_SESSION_KEY)
    return val ? hexToBytes(val) : null
  } catch (e) {
    return null
  }
}

export const writeKeyToSessionStorage = (val: Uint8Array) => {
  sessionStorage.setItem(IDENTITY_SESSION_KEY, bytesToHex(val))
}

export const clearKeyFromSessionStorage = () => {
  sessionStorage.removeItem(IDENTITY_SESSION_KEY)
}
