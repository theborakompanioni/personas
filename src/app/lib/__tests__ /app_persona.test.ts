/**
 * @jest-environment node
 */
import { generateNip06SubIdentity, generatePersona } from '../app_persona'

import PERSONAS from '../../personas.json'

describe('app_persona', () => {
  describe('alice', () => {
    it('should generate alice persona', () => {
      const persona = generatePersona(PERSONAS['alice'])

      expect(persona.persona.id).toEqual('alice')
      expect(persona.entropyHex).toEqual('2bd806c97f0e00af1a1fc3328fa763a9')
      expect(persona.mnemonic).toEqual(
        'cloth scan rather wrap theme fiscal half wear crater large suggest fancy',
      )
    })

    it('should generate alice sub identity #0', () => {
      const persona = generatePersona(PERSONAS['alice'])
      const identity = generateNip06SubIdentity(persona, 0)

      expect(identity.displayName).toEqual('Alice #0')
      expect(identity.path).toEqual(`m/44'/1237'/0'/0/0`)
      expect(identity.privateKey.hex).toEqual(
        '7eaab2f5e9359badb538722e23e6e65bb0c8265a707d317ec4b132ccd23aeb72',
      )
      expect(identity.privateKey.nip19).toEqual(
        'nsec1064t9a0fxkd6mdfcwghz8ehxtwcvsfj6wp7nzlkykyeve536adeqjksgqj',
      )
      expect(identity.publicKey.hex).toEqual(
        'f319269a8757e84e9b6dad9325cb74933f64e9497c4c3a8f7757361e78edf564',
      )
      expect(identity.publicKey.nip19).toEqual(
        'npub17vvjdx582l5yaxmd4kfjtjm5jvlkf62f03xr4rmh2umpu78d74jqxhkuj6',
      )
    })

    it('should generate alice sub identity #15', () => {
      const persona = generatePersona(PERSONAS['alice'])
      const identity = generateNip06SubIdentity(persona, 15)

      expect(identity.displayName).toEqual('Alice #15')
      expect(identity.path).toEqual(`m/44'/1237'/15'/0/0`)
      expect(identity.privateKey.hex).toEqual(
        '223955cda115e533305bc7bb27d598cd807238da2418be3b882450fc812f41e7',
      )
      expect(identity.privateKey.nip19).toEqual(
        'nsec1ygu4tndpzhjnxvzmc7aj04vcekq8ywx6ysvtuwugy3g0eqf0g8nse3k7qa',
      )
      expect(identity.publicKey.hex).toEqual(
        '19f322cf03fb653f1bcc7b736d1ea4b6cdf100accec83f4282433010b7ef09b5',
      )
      expect(identity.publicKey.nip19).toEqual(
        'npub1r8ej9ncrldjn7x7v0dek684ykmxlzq9vemyr7s5zgvcppdl0px6srjpt4a',
      )
    })
  })

  describe('bob', () => {
    it('should generate bob persona', () => {
      const persona = generatePersona(PERSONAS['bob'])

      expect(persona.persona.id).toEqual('bob')
      expect(persona.entropyHex).toEqual('81b637d8fcd2c6da6359e6963113a117')
      expect(persona.mnemonic).toEqual(
        'like random wage whale cluster honey miracle devote normal mass tribe comfort',
      )
    })

    it('should generate bob sub identity #0', () => {
      const persona = generatePersona(PERSONAS['bob'])
      const identity = generateNip06SubIdentity(persona, 0)

      expect(identity.displayName).toEqual('Bob #0')
      expect(identity.path).toEqual(`m/44'/1237'/0'/0/0`)
      expect(identity.privateKey.hex).toEqual(
        'db5348eb22abb023fde6015a562a56a09da6ee2458c7714cb458af8d7441e6e3',
      )
      expect(identity.privateKey.nip19).toEqual(
        'nsec1mdf536ez4wcz8l0xq9d9v2jk5zw6dm3ytrrhzn95tzhc6azpum3s9xd9wz',
      )
      expect(identity.publicKey.hex).toEqual(
        '72603b8a1329cd9cb7e117f1d9d6ae6bb9385ec591d30a3c91ef40aa8aa4c409',
      )
      expect(identity.publicKey.nip19).toEqual(
        'npub1wfsrhzsn98xeedlpzlcan44wdwunshk9j8fs50y3aaq24z4ycsysuspqy8',
      )
    })

    it('should generate bob sub identity #15', () => {
      const persona = generatePersona(PERSONAS['bob'])
      const identity = generateNip06SubIdentity(persona, 15)

      expect(identity.displayName).toEqual('Bob #15')
      expect(identity.path).toEqual(`m/44'/1237'/15'/0/0`)
      expect(identity.privateKey.hex).toEqual(
        '415cdb8c2c397802cde2ea9ec6173379f81e56bf04777d6daea75a93a7dadc1d',
      )
      expect(identity.privateKey.nip19).toEqual(
        'nsec1g9wdhrpv89uq9n0za20vv9en08upu44lq3mh6mdw5adf8f76msws3pzj7t',
      )
      expect(identity.publicKey.hex).toEqual(
        '7705f65a3c1a062d762aaf0af656407ea97a86e343cc31829eebaaa905e5da7d',
      )
      expect(identity.publicKey.nip19).toEqual(
        'npub1wuzlvk3urgrz6a324u90v4jq065h4phrg0xrrq57aw42jp09mf7ss5xcqq',
      )
    })
  })
})
