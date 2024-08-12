import PERSONAS from '../../personas.json'
import Persona from './Persona'

// export const dynamicParams = false

export const generateStaticParams = async () =>
  Object.values(PERSONAS).map((it) => ({
    id: it.id,
  }))

export default function Page({ params }: any) {
  const persona = PERSONAS[params.id]
  return (
    <main>
      <Persona value={persona} />
    </main>
  )
}
