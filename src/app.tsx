import { Router } from '@solidjs/router'
import { FileRoutes } from '@solidjs/start/router'
import { Suspense } from 'solid-js'
import './app.css'
import { MetaProvider, Title } from '@solidjs/meta'

export default function App() {
    return (
        <Router
            root={(props) => (
                <>
                    <MetaProvider>
                        <Title>SolidJs Auth</Title>
                    </MetaProvider>
                    <Suspense>{props.children}</Suspense>
                </>
            )}
        >
            <FileRoutes />
        </Router>
    )
}
