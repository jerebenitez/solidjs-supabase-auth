import { createAsync, useNavigate } from '@solidjs/router'
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
            <CardContent>
                <RecoverPasswordForm />
            </CardContent>
        </Card>
    )
}
