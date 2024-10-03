import { hexToBytes } from '@noble/hashes/utils'
import { toNostrPrivateKey, toNostrPublicKey } from '../app_nostr'

/**
 * Test vectors taken from <a href="https://github.com/nostr-protocol/nips/blob/master/19.md#examples">NIP-19 examples</a>
 * and <a href="https://github.com/nostr-protocol/nips/blob/master/06.md#test-vectors">NIP-06 Test vectors</a>.
 */
describe('app_nostr', () => {
  describe('toNostrPrivateKey', () => {
    it('should map private key to nsec (NIP-19 examples)', () => {
      const privateKeyBytes = hexToBytes(
        '67dea2ed018072d675f5415ecfaed7d2597555e202d85b3d65ea4e58d2d92ffa',
      )

      const privateKey = toNostrPrivateKey(privateKeyBytes)
      expect(privateKey.nip19).toEqual(
        'nsec1vl029mgpspedva04g90vltkh6fvh240zqtv9k0t9af8935ke9laqsnlfe5',
      )
      expect(privateKey.hex).toEqual(
        '67dea2ed018072d675f5415ecfaed7d2597555e202d85b3d65ea4e58d2d92ffa',
      )
    })

    it('should map private key to nsec (NIP-06 test vector #0)', () => {
      const privateKeyBytes = hexToBytes(
        '7f7ff03d123792d6ac594bfa67bf6d0c0ab55b6b1fdb6249303fe861f1ccba9a',
      )

      const privateKey = toNostrPrivateKey(privateKeyBytes)
      expect(privateKey.nip19).toEqual(
        'nsec10allq0gjx7fddtzef0ax00mdps9t2kmtrldkyjfs8l5xruwvh2dq0lhhkp',
      )
      expect(privateKey.hex).toEqual(
        '7f7ff03d123792d6ac594bfa67bf6d0c0ab55b6b1fdb6249303fe861f1ccba9a',
      )
    })

    it('should map private key to nsec (NIP-06 test vector #1)', () => {
      const privateKeyBytes = hexToBytes(
        'c15d739894c81a2fcfd3a2df85a0d2c0dbc47a280d092799f144d73d7ae78add',
      )

      const privateKey = toNostrPrivateKey(privateKeyBytes)
      expect(privateKey.nip19).toEqual(
        'nsec1c9wh8xy5eqdzln7n5t0ctgxjcrdug73gp5yj0x03gntn67h83twssdfhel',
      )
      expect(privateKey.hex).toEqual(
        'c15d739894c81a2fcfd3a2df85a0d2c0dbc47a280d092799f144d73d7ae78add',
      )
    })
  })

  describe('toNostrPublicKey', () => {
    it('should map public key to npub (NIP-19 examples)', () => {
      const publicKeyBytes = hexToBytes(
        '7e7e9c42a91bfef19fa929e5fda1b72e0ebc1a4c1141673e2794234d86addf4e',
      )

      const publicKey = toNostrPublicKey(publicKeyBytes)
      expect(publicKey.nip19).toEqual(
        'npub10elfcs4fr0l0r8af98jlmgdh9c8tcxjvz9qkw038js35mp4dma8qzvjptg',
      )
      expect(publicKey.hex).toEqual(
        '7e7e9c42a91bfef19fa929e5fda1b72e0ebc1a4c1141673e2794234d86addf4e',
      )
    })

    it('should map public key to npub (NIP-06 test vector #0)', () => {
      const publicKeyBytes = hexToBytes(
        '17162c921dc4d2518f9a101db33695df1afb56ab82f5ff3e5da6eec3ca5cd917',
      )

      const publicKey = toNostrPublicKey(publicKeyBytes)
      expect(publicKey.nip19).toEqual(
        'npub1zutzeysacnf9rru6zqwmxd54mud0k44tst6l70ja5mhv8jjumytsd2x7nu',
      )
      expect(publicKey.hex).toEqual(
        '17162c921dc4d2518f9a101db33695df1afb56ab82f5ff3e5da6eec3ca5cd917',
      )
    })

    it('should map public key to npub (NIP-06 test vector #1)', () => {
      const publicKeyBytes = hexToBytes(
        'd41b22899549e1f3d335a31002cfd382174006e166d3e658e3a5eecdb6463573',
      )

      const publicKey = toNostrPublicKey(publicKeyBytes)
      expect(publicKey.nip19).toEqual(
        'npub16sdj9zv4f8sl85e45vgq9n7nsgt5qphpvmf7vk8r5hhvmdjxx4es8rq74h',
      )
      expect(publicKey.hex).toEqual(
        'd41b22899549e1f3d335a31002cfd382174006e166d3e658e3a5eecdb6463573',
      )
    })
  })
})
