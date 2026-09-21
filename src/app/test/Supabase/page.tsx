import { createClient } from '@/lib/Supabase/server'

export default async function Page() {
  const supabase = await createClient()

  const { data: instruments } = await supabase.from('instruments').select()

  return (
    <ul>
      {instruments?.map((instrument) => (
        <li key={instrument.id}>{instrument.name}</li>
      ))}
    </ul>
  )
}