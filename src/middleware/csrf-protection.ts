// from: https://github.com/atilafassina/auth-unstorage/blob/eb4bcfb4c6187ff555be339eb2bbf669c04c4e93/src/middlewares/csrf-protection.ts
import { type RequestMiddleware } from '@solidjs/start/middleware'
import { FetchEvent } from '@solidjs/start/server'
import { getHeader } from 'vinxi/http'

function getHost(url: string) {
    try {
        return new URL(url)?.host || null
    } catch {
        return null
    }
}

function verifyRequestOrigin(origin: string, allowedDomains: string[]) {
    if (!origin || allowedDomains.length === 0) return false
    const originHost = getHost(origin)

    if (!originHost) return false

    for (const domain of allowedDomains) {
        let host
        if (domain.startsWith('http://') || domain.startsWith('https://')) {
            host = getHost(domain)
        } else {
            host = getHost('https://' + domain)
        }
        if (originHost === host) return true
    }
    return false
}

function csrfBlocker(event: FetchEvent) {
    if (event.request.method !== 'GET') {
        const originHeader =
            (getHeader(event.nativeEvent, 'Origin') ||
                getHeader(event.nativeEvent, 'Referrer')) ??
            null
        const hostHeader = getHeader(event.nativeEvent, 'Host') ?? null

        if (
            !originHeader ||
            !hostHeader ||
            !verifyRequestOrigin(originHeader, [hostHeader])
        ) {
            return 'block'
        } else {
            return 'ok'
        }
    }
}

export const csrfProtection: RequestMiddleware = async (event) => {
    if (csrfBlocker(event) === 'block') {
        event.nativeEvent.respondWith(new Response(null, { status: 403 }))
        return
    }
}
