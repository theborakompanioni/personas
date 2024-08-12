'use client'

import { Avatar } from 'react-daisyui'
import { Persona } from '../page'

export default function PersonaPageContent({ value }: { value: Persona }) {
  return (
    <>
      <div className="flex items-center gap-6">
        <Avatar
          shape="circle"
          border
          borderColor="neutral"
          src={`https://robohash.org/${value.id}.png`}
        />
        <div>
          <h2 className="text-3xl font-bold tracking-tighter">
            {value.displayName}
          </h2>
          <div className="text-slate-500">{value.shortDescription}</div>
        </div>
      </div>

      <div className="flex my-6 bg-neutral rounded-lg p-8">
        <div className="text-lgtext-neutral-content break-all">
          {'>'} {value.description}
        </div>
      </div>
    </>
  )
}
