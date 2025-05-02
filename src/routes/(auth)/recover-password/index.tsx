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
import { RecoverPasswordForm } from '~/features/auth/forms/recover-password'

export default function ForgotPassword() {
    const navigate = useNavigate()
    const user = createAsync<User | null>(() => getLoggedUser())

    createEffect(() => {
        if (user()) navigate('/')
    })

    return (
        <Card class="w-full max-w-md">
            <CardHeader>
                <CardTitle>Recover your password</CardTitle>
                <CardDescription>
                    Enter you e-mail address below. If it's registered in our
                    system, an e-mail with a login link will arrive at that
                    address. You will then be asked to set a new password.
                </CardDescription>
            </CardHeader>
            <CardContent class="space-y-6">
                <RecoverPasswordForm />
                <div class="text-right text-sm font-medium text-gray-500 dark:text-gray-300">
                    Already have an account?{' '}
                    <A
                        href="/signin"
                        class="text-blue-700 hover:underline dark:text-blue-500"
                    >
                        Sign in
                    </A>
                </div>
            </CardContent>
        </Card>
    )
}
