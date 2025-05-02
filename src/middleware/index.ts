import { csrfProtection } from './csrf-protection'
import { createMiddleware } from '@solidjs/start/middleware'
import { refreshAuthCookie } from './refresh-auth-cookie'

export default createMiddleware({
    onRequest: [csrfProtection, refreshAuthCookie],
})
