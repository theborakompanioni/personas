'use client'

import { useEffect, useMemo, useState } from 'react'
import {
  Alert,
  Badge,
  Button,
  Collapse,
  CollapseProps,
  Form,
  Loading,
  Steps,
  Textarea,
  Tooltip,
} from 'react-daisyui'

import {
  finalizeEvent,
  verifyEvent,
  EventTemplate,
  NostrEvent,
  UnsignedEvent,
  getEventHash,
  SimplePool,
  nip19,
} from 'nostr-tools'
import { bytesToHex } from '@noble/hashes/utils'
import { defaultRelays } from '../lib/app_nostr'
import {
  ArrowPathIcon,
  ArrowTopRightOnSquareIcon,
  CheckCircleIcon,
  CheckIcon,
  CloudArrowUpIcon,
  DocumentPlusIcon,
  InformationCircleIcon,
  PaperAirplaneIcon,
  PencilSquareIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline'
import { publicKey, readKeyFromSessionStorage } from '../lib/nostr/identity'
import Link from 'next/link'
import ROUTES from '../lib/routes'
import { ArrowRightIcon } from '@heroicons/react/24/outline'

type SignedNote = NostrEvent
type UnsignedNote = UnsignedEvent & Pick<SignedNote, 'id'>
type PartialNote = EventTemplate

const initialValue = (): PartialNote => {
  const now = Date.now()
  return {
    created_at: Math.floor(now / 1_000),
    kind: 1,
    tags: [['expiration', `${Math.floor(now / 1_000) + 60 * 60}`]],
    content: '',
  }
}

function CollapsedNote({
  value,
  ...collapseOptions
}: { value: Partial<NostrEvent> } & CollapseProps) {
  return (
    <Collapse
      checkbox
      icon="arrow"
      className="bg-base-200"
      {...collapseOptions}
    >
      <Collapse.Title className="text-xl font-medium">Note</Collapse.Title>
      <Collapse.Content>
        {(() => {
          const json = JSON.stringify(value, null, 2)
          const rows = json.split('\n').length + 1

          return (
            <div className="form-control">
              <Textarea
                size="lg"
                className="bg-base-200 color-base-200 font-mono"
                rows={rows}
                value={json}
                readOnly
                tabIndex={-1}
              />
            </div>
          )
        })()}
      </Collapse.Content>
    </Collapse>
  )
}

type BuildFormProps = {
  value: PartialNote
  onSubmit: (val: PartialNote) => void
  onReset: () => void
  disabled?: boolean
  readOnly?: boolean
}

function BuildForm({
  value,
  onSubmit,
  onReset,
  disabled,
  readOnly,
}: BuildFormProps) {
  const [json, setJson] = useState(JSON.stringify(value, null, 2))

  useEffect(() => {
    setJson(JSON.stringify(value, null, 2))
  }, [value])

  const rows = useMemo(() => json.split('\n').length + 1, [json])

  const isValid = useMemo(() => {
    try {
      const parsed = JSON.parse(json)
      return (
        parsed.id === undefined &&
        parsed.pubkey === undefined &&
        parsed.sig === undefined
      )
    } catch (e) {
      return false
    }
  }, [json])

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

        if (!isValid) return
        onSubmit(JSON.parse(json))
      }}
    >
      <div className="flex flex-col gap-2">
        <div className="form-control">
          <Textarea
            size="lg"
            rows={rows}
            className="bg-base-200 color-base-200 font-mono"
            value={json}
            onChange={(e) => setJson(e.target.value)}
            placeholder="Your note or other stuff…"
            color={json && !isValid ? 'error' : undefined}
            readOnly={readOnly}
            disabled={disabled}
          />
        </div>

        <div className="flex gap-2 justify-center">
          <Button type="reset" size="lg" disabled={disabled}>
            Reset
          </Button>
          <Button type="submit" size="lg" disabled={disabled}>
            <CheckIcon className="w-6 h-6" />
            Build
          </Button>
        </div>
      </div>
    </Form>
  )
}

type SignFormProps = {
  value: UnsignedNote
  onSubmit: (value: SignedNote) => void
  onReset: () => void
  disabled?: boolean
}

function SignForm({ value, onSubmit, onReset, disabled }: SignFormProps) {
  const json = useMemo(() => JSON.stringify(value, null, 2), [value])
  const rows = useMemo(() => json.split('\n').length + 1, [json])

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

        onSubmit(JSON.parse(json))
      }}
    >
      <div className="flex flex-col gap-2">
        <CollapsedNote value={value} open={true} />

        <div className="flex gap-2 justify-center">
          <Button type="reset" size="lg" disabled={disabled}>
            Cancel
          </Button>
          <Button type="submit" size="lg" disabled={disabled}>
            <PencilSquareIcon className="w-6 h-6" />
            Sign
          </Button>
        </div>
      </div>
    </Form>
  )
}

type ReviewFormProps = {
  value: SignedNote
  onSubmit: (value: SignedNote) => void
  onReset: () => void
  disabled?: boolean
}

function ReviewForm({ value, onSubmit, onReset, disabled }: ReviewFormProps) {
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

        onSubmit(value)
      }}
    >
      <div className="flex flex-col gap-2">
        <CollapsedNote value={value} open={true} />

        <div className="flex gap-2 justify-center">
          <Button type="reset" size="lg" disabled={disabled}>
            Cancel
          </Button>
          <Button type="submit" size="lg" disabled={disabled}>
            <ArrowRightIcon className="w-6 h-6" />
            Next
          </Button>
        </div>
      </div>
    </Form>
  )
}

type PublishFormProps = {
  value: SignedNote
  onSubmit: (value: SignedNote) => void
  onReset: () => void
  disabled?: boolean
}

function PublishForm({ value, onSubmit, onReset, disabled }: PublishFormProps) {
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

        onSubmit(value)
      }}
    >
      <div className="flex flex-col gap-2">
        <CollapsedNote value={value} />
        TODO: Ability to select relays here
        <div className="flex gap-2 justify-center">
          <Button type="reset" size="lg" disabled={disabled}>
            Cancel
          </Button>
          <Button type="submit" size="lg" disabled={disabled}>
            <PaperAirplaneIcon className="w-6 h-6" />
            Publish
          </Button>
        </div>
      </div>
    </Form>
  )
}

type RelayUrl = string
type RelayPublishResult = [RelayUrl, PromiseSettledResult<string>]

type PublishResult = {
  success: boolean
  relays: RelayUrl[]
  results?: RelayPublishResult[]
  error?: any
}

export default function Page() {
  const privKey = useMemo(() => readKeyFromSessionStorage(), [])

  const [partialNote, setPartialNote] = useState<PartialNote>(initialValue())
  const [unsignedNote, setUnsignedNote] = useState<UnsignedNote>()
  const [signedNote, setSignedNote] = useState<SignedNote>()
  const [reviewed, setReviewed] = useState(false)
  const [publishResult, setPublishResult] = useState<PublishResult>()

  const [publishing, setPublishing] = useState(false)

  const reset = () => {
    setUnsignedNote(undefined)
    setSignedNote(undefined)
    setReviewed(false)
    setPublishResult(undefined)
  }

  const publishNote = async (value: SignedNote) => {
    if (publishing) return

    const relays = defaultRelays()

    setPublishing(true)

    // wait a little to avoid ui flickering
    await new Promise((resolve) => setTimeout(resolve, 500))

    if (relays.length === 0) {
      setPublishResult({
        success: false,
        relays,
        error: new Error('No relays provided.'),
      })
      setPublishing(false)
      return
    }

    const pool = new SimplePool()

    try {
      const settledResults = await Promise.allSettled(
        pool.publish(relays, value),
      )
      const results: RelayPublishResult[] = relays.map((it, index) => [
        it,
        settledResults[index],
      ])
      const success = settledResults.some((it) => it.status === 'fulfilled')
      setPublishResult({
        success,
        relays,
        results,
      })
    } catch (error) {
      setPublishResult({
        success: false,
        relays,
        error,
      })
    } finally {
      setPublishing(false)
      pool.close(relays)
    }
  }

  const republishNote = (value: SignedNote) => {
    setPublishResult(undefined)
    publishNote(value)
  }

  return (
    <main>
      <h2 className="text-3xl font-bold tracking-tighter mb-2">Publish form</h2>

      <div className="flex flex-col gap-4 mb-4">
        <Steps>
          <Steps.Step color="primary">Build</Steps.Step>
          <Steps.Step color={unsignedNote ? 'primary' : undefined}>
            Sign
          </Steps.Step>
          <Steps.Step color={signedNote ? 'primary' : undefined}>
            Review
          </Steps.Step>
          <Steps.Step color={signedNote && reviewed ? 'primary' : undefined}>
            Publish
          </Steps.Step>
        </Steps>

        {!privKey && (
          <>
            <Alert
              status="info"
              icon={<InformationCircleIcon className="w-6 h-6" />}
            >
              <div>
                You need to{' '}
                <Link className="text-bold underline" href={ROUTES.identity}>
                  generate a private key first
                </Link>
                .
              </div>
            </Alert>
          </>
        )}

        {!unsignedNote && (
          <>
            <BuildForm
              value={partialNote}
              onSubmit={async (value) => {
                if (!privKey) return
                setPartialNote(value)

                const unsignedNoteWithoutId = {
                  ...value,
                  pubkey: bytesToHex(publicKey(privKey)),
                }

                setUnsignedNote({
                  ...unsignedNoteWithoutId,
                  id: getEventHash(unsignedNoteWithoutId),
                })
              }}
              onReset={() => {
                setPartialNote(initialValue())
                reset()
              }}
              disabled={!privKey || !!unsignedNote}
            />
          </>
        )}

        {unsignedNote && !signedNote && (
          <>
            <SignForm
              value={unsignedNote}
              onSubmit={async (value) => {
                if (!privKey) return
                setSignedNote(finalizeEvent(value, privKey))
              }}
              onReset={reset}
              disabled={!privKey}
            />
          </>
        )}

        {unsignedNote && signedNote && !reviewed && (
          <>
            <Alert status="success">
              <div>Successfully signed note.</div>
            </Alert>
            <ReviewForm
              value={signedNote}
              onSubmit={async () => {
                setReviewed(true)
              }}
              onReset={reset}
              disabled={!privKey}
            />
          </>
        )}

        {unsignedNote &&
          signedNote &&
          reviewed &&
          !publishing &&
          !publishResult && (
            <>
              <PublishForm
                value={signedNote}
                onSubmit={publishNote}
                onReset={reset}
                disabled={publishing}
              />
            </>
          )}

        {publishing && (
          <>
            <Alert icon={<Loading size="sm" />}>
              <div>Publishing…</div>
            </Alert>
          </>
        )}

        {signedNote && publishResult && (
          <>
            {publishResult.success === false ? (
              <>
                {publishResult.error ? (
                  <Alert
                    status="error"
                    icon={<XCircleIcon className="w-6 h-6" />}
                  >
                    <span>
                      {publishResult.error.message || 'Unknown error.'}
                    </span>
                    <div className="space-x-1">
                      {signedNote && (
                        <Button
                          type="button"
                          size="sm"
                          onClick={() => republishNote(signedNote)}
                          disabled={publishing}
                        >
                          <ArrowPathIcon className="w-6 h-6" />
                          Retry
                        </Button>
                      )}
                    </div>
                  </Alert>
                ) : (
                  <Alert status="warning">
                    <span>
                      None of the relays successfully accepted the event.
                    </span>
                    <div className="space-x-1">
                      {signedNote && (
                        <Button
                          type="button"
                          size="sm"
                          onClick={() => republishNote(signedNote)}
                          disabled={publishing}
                        >
                          <ArrowPathIcon className="w-6 h-6" />
                          Retry
                        </Button>
                      )}
                    </div>
                  </Alert>
                )}
              </>
            ) : (
              <Alert
                status="success"
                icon={<CheckCircleIcon className="w-6 h-6" />}
              >
                <div className="flex flex-col">
                  <div className="font-bold">Successfully published note!</div>
                  <div className="flex items-center gap-2">
                    <a
                      className="link-hover"
                      href={`https://njump.org/${nip19.neventEncode(
                        signedNote,
                      )}`}
                      target="_blank"
                    >
                      {`https://njump.org/${nip19.neventEncode(signedNote)}`}
                    </a>
                    <ArrowTopRightOnSquareIcon className="w-5 h-5" />
                  </div>
                </div>
                <div className="space-x-1">
                  {signedNote && (
                    <Button
                      type="button"
                      size="sm"
                      onClick={() => republishNote(signedNote)}
                      disabled={publishing}
                    >
                      <CloudArrowUpIcon className="w-6 h-6" />
                      Republish
                    </Button>
                  )}
                </div>
              </Alert>
            )}
          </>
        )}

        {publishResult && publishResult.results && (
          <div className="flex flex-col gap-2 bg-base-300 text-base-300-content rounded-lg p-4">
            <div className="font-bold">Published to following relays:</div>
            <div className="flex flex-col gap-2">
              {publishResult.results.map((it, index) => {
                return (
                  <div key={index} className="flex gap-2 items-center">
                    {it[1].status === 'fulfilled' ? (
                      <Tooltip message={it[1].status} color="success">
                        <CheckCircleIcon className="w-6 h-6 text-success" />
                      </Tooltip>
                    ) : (
                      <Tooltip message={it[1].status} color="error">
                        <XCircleIcon className="w-6 h-6 text-error" />
                      </Tooltip>
                    )}
                    <div>{it[0]}</div>
                    {it[1].status === 'fulfilled' && (
                      <Badge outline color="neutral">
                        OK: {JSON.stringify(it[1].value)}
                      </Badge>
                    )}
                    {it[1].status === 'rejected' && (
                      <Badge outline color="error">
                        Rejected:{' '}
                        {JSON.stringify(it[1].reason || 'Unknown reason.')}
                      </Badge>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {signedNote && (publishing || !!publishResult) && (
          <>
            <CollapsedNote value={signedNote} />

            <div className="flex justify-center gap-2">
              <Button
                type="button"
                size="lg"
                onClick={() => {
                  setPartialNote(initialValue())
                  reset()
                }}
                disabled={publishing}
              >
                <DocumentPlusIcon className="w-6 h-6" />
                New note
              </Button>
            </div>
          </>
        )}
      </div>
    </main>
  )
}
