import { hexToBytes } from '@noble/hashes/utils'
import { toNostrPrivateKey } from '../app_nostr'

/**
 * Test vectors taken from <a href="https://github.com/nostr-protocol/nips/blob/master/19.md#examples">NIP-19 examples</a>.
 */
describe('app_nostr', () => {
  describe('toNostrPrivateKey', () => {
    it('should map private key to nsec', () => {
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
})
