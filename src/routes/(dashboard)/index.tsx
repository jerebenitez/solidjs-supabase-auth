import { A, createAsync, useNavigate } from '@solidjs/router'
import { User } from '@supabase/supabase-js'
import { createEffect } from 'solid-js'
import { getLoggedUser } from '~/features/auth/actions'

export default function Home() {
    const navigate = useNavigate()
    const user = createAsync<User | null >(() => getLoggedUser(), { deferStream: true })

    createEffect(() => {
        if (!user())
            navigate("/signin")
    })

    return (
        <main class="text-center mx-auto text-gray-700 p-4">
            <h1 class="max-6-xs text-6xl text-sky-700 font-thin uppercase my-16">
                Hello {user()?.email}!
            </h1>
            <p class="mt-8">
                Visit{' '}
                <a
                    href="https://solidjs.com"
                    target="_blank"
                    class="text-sky-600 hover:underline"
                >
                    solidjs.com
                </a>{' '}
                to learn how to build Solid apps.
            </p>
            <p class="my-4">
                <span>Home</span>
                {' - '}
                <A href="/about" class="text-sky-600 hover:underline">
                    About Page
                </A>{' '}
            </p>
        </main>
    )
}
