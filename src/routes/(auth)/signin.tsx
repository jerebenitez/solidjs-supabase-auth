import { A, createAsync, useNavigate } from '@solidjs/router'
import { User } from '@supabase/supabase-js'
import { createEffect } from 'solid-js'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '~/components/ui/card'
import { getLoggedUser } from '~/features/auth/actions'
import { SignInForm } from '~/features/auth/forms/sign-in'

export default function SignIn() {
    const navigate = useNavigate()
    const user = createAsync<User | null>(() => getLoggedUser())

    createEffect(() => {
        if (user()) navigate('/')
    })

    return (
        <Card class="w-full max-w-md">
            <CardHeader>
                <CardTitle>Sign in to our platform</CardTitle>
                <CardDescription>
                    Enter your credentials below to access the system.
                </CardDescription>
            </CardHeader>
            <CardContent class="space-y-6">
                <SignInForm />
                <div class="text-right text-sm font-medium text-gray-500 dark:text-gray-300">
                    Not registered?{' '}
                    <A
                        href="/signup"
                        class="text-blue-700 hover:underline dark:text-blue-500"
                    >
                        Create account
                    </A>
                </div>
            </CardContent>
        </Card>
    )
}
