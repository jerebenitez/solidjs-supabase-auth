import { Router } from '@solidjs/router'
import { FileRoutes } from '@solidjs/start/router'
import { Suspense } from 'solid-js'
import { MetaProvider, Title } from '@solidjs/meta'
import '@fontsource/inter'
import './app.css'
import { cookieStorageManagerSSR } from '@kobalte/core/src/index.jsx'
import { getCookie } from 'vinxi/http'
import { isServer } from 'solid-js/web'
import { ColorModeProvider, ColorModeScript } from '@kobalte/core'
import { Toaster } from './components/ui/sonner'

function getServerCookies() {
    'use server'
    const colorMode = getCookie('kb-color-mode')
    return colorMode ? `kb-color-mode=${colorMode}` : ''
}

export default function App() {
    const storageManager = cookieStorageManagerSSR(
        isServer ? getServerCookies() : document.cookie
    )

    return (
        <MetaProvider>
            <ColorModeScript storageType={storageManager.type} />
            <ColorModeProvider storageManager={storageManager}>
                <Title>SolidBase starter kit</Title>
                <Router
                    root={(props) => (
                        <Suspense>
                            {props.children}
                            <Toaster />
                        </Suspense>
                    )}
                >
                    <FileRoutes />
                </Router>
            </ColorModeProvider>
        </MetaProvider>
    )
}
