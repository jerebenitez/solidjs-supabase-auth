import { type RequestMiddleware } from '@solidjs/start/middleware'
import { createMiddlewareClient } from '~/lib/supabase/server'

export const refreshAuthCookie: RequestMiddleware = async (event) => {
    const { supabase } = createMiddlewareClient(event)

    // we just await this so that cookies are refreshed
    await supabase.auth.getSession()
}
