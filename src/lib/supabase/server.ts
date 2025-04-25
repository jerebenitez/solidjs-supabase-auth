import {
    CookieMethodsServer,
    createServerClient,
    parseCookieHeader,
    serializeCookieHeader,
} from '@supabase/ssr'
import { getRequestEvent, RequestEvent } from 'solid-js/web'

export function createClient(serverComponent: boolean = false) {
    const cookieHandlers: CookieMethodsServer = {
        getAll: () => {
            return parseCookieHeader(
                getRequestEvent()?.request.headers.get('Cookie') ?? ''
            ).filter((c) => c.value !== undefined) as {
                name: string
                value: string
            }[]
        },
        setAll: (cookiesToSet) => {
            // If it's called from somewhere where it can't set cookies, ignore to avoid errors
            // https://www.youtube.com/watch?v=XIj7nmIYtbo (it's for NextJs, but still applies)
            if (serverComponent) return
            cookiesToSet.forEach(({ name, value, options }) =>
                getRequestEvent()?.response.headers.append(
                    'Set-Cookie',
                    serializeCookieHeader(name, value, options)
                )
            )
        },
    }

    return createServerClient(
        import.meta.env.VITE_SUPABASE_URL,
        import.meta.env.VITE_SUPABASE_KEY,
        { cookies: cookieHandlers }
    )
}

export function createMiddlewareClient(event: RequestEvent) {
    const response = new Response(null, { headers: new Headers() })

    const cookieHandlers: CookieMethodsServer = {
        getAll: () => {
            return parseCookieHeader(
                event.request.headers.get('cookie') ?? ''
            ).filter((c): c is { name: string; value: string } => !!c.value)
        },
        setAll: (cookiesToSet) => {
            cookiesToSet.forEach(({ name, value, options }) => {
                response.headers.append(
                    'Set-Cookie',
                    serializeCookieHeader(name, value, options)
                )
            }
            )
        },
    }

    const supabase = createServerClient(
        import.meta.env.VITE_SUPABASE_URL,
        import.meta.env.VITE_SUPABASE_KEY,
        { cookies: cookieHandlers }
    )

    return { supabase, response }
}
