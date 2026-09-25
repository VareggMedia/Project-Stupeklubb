// BLIR IKKE BRUKT TIL NOE, BARE "test/Supabase/page.tsx". (La stå inntil videre)

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // Server Components kan ikke alltid skrive cookies.
            // Det blir relevant senere når vi bruker Auth/proxy.
          }
        },
      },
    }
  )
}