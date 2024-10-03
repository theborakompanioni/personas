
/**
 * @jest-environment node
 */
import { generatePersona } from '../app_persona'

import PERSONAS from '../../personas.json'

describe('app_persona', () => {
  describe('generatePersona', () => {
    it('should generate alice', () => {
      const persona = generatePersona(PERSONAS['alice'])

      expect(persona.persona.id).toEqual('alice')
      expect(persona.entropyHex).toEqual('2bd806c97f0e00af1a1fc3328fa763a9')
      expect(persona.mnemonic).toEqual(
        'cloth scan rather wrap theme fiscal half wear crater large suggest fancy',
      )
    })
    it('should generate bob', () => {
      const persona = generatePersona(PERSONAS['bob'])

      expect(persona.persona.id).toEqual('bob')
      expect(persona.entropyHex).toEqual('81b637d8fcd2c6da6359e6963113a117')
      expect(persona.mnemonic).toEqual(
        'like random wage whale cluster honey miracle devote normal mass tribe comfort',
      )
    })
  })
})
