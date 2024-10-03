import { hexToBytes } from '@noble/hashes/utils'
import { toNostrPrivateKey, toNostrPublicKey } from '../app_nostr'

/**
 * Test vectors taken from <a href="https://github.com/nostr-protocol/nips/blob/master/19.md#examples">NIP-19 examples</a>.
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
  })

  describe('toNostrPublicKey', () => {
    it('should map public key to npub', () => {
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
  })
})
