import { isDevMode } from './dev'

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
