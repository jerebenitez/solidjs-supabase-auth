'use server'
import type { RequestEvent } from 'solid-js/web'
import {
    createServerClient,
    parseCookieHeader,
    serializeCookieHeader,
} from '@supabase/ssr'
import { CookieMethodsServer } from '@supabase/ssr'

export async function createClient(event: RequestEvent) {
    let response: Response | undefined

    const cookiesMethodsHandlers: CookieMethodsServer = {
        getAll: () => {
            const cookies = parseCookieHeader(
                event.request.headers.get('cookie') ?? ''
            )

            // Filtramos las cookies sin valor y forzamos value a ser string
            return (cookies ?? []).filter(
                (c): c is { name: string; value: string } =>
                    typeof c.value === 'string'
            )
        },
        setAll: (cookiesToSet) => {
            cookiesToSet.forEach(({ name, value, options }) =>
                event.response.headers.append(
                    'Set-Cookie',
                    serializeCookieHeader(name, value, options)
                )
            )
        },
    }

    const supabase = createServerClient(
        import.meta.env.VITE_SUPABASE_URL!,
        import.meta.env.VITE_SUPABASE_KEY!,
        {
            cookies: cookiesMethodsHandlers,
        }
    )

    return { supabase, response }
}
