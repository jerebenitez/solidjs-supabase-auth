import { Router } from '@solidjs/router'
import { FileRoutes } from '@solidjs/start/router'
import { Suspense } from 'solid-js'
import { MetaProvider, Title } from '@solidjs/meta'
import './app.css'

export default function App() {
    return (
        <MetaProvider>
            <Title>SolidBase starter kit</Title>
            <Router root={(props) => <Suspense>{props.children}</Suspense>}>
                <FileRoutes />
            </Router>
        </MetaProvider>
    )
}
