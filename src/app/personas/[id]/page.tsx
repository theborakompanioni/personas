import PERSONAS from '../../personas.json'

// export const dynamicParams = false

export const generateStaticParams = async () => Object.values(PERSONAS)
    .map(it => ({
      id: it.id,
    }))


export default function Page({ params }: any) {
  const persona = PERSONAS[params.id]
  return (
    <main>
      <h2 className="text-3xl font-bold tracking-tighter">{persona.displayName}</h2>
      <div className="text-lg text-slate-500 break-all">

      </div>
    </main>
  )
}
