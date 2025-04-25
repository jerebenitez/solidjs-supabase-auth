import { createAsync, useNavigate } from '@solidjs/router'
import { createEffect } from 'solid-js'
import { Card, CardTitle } from '~/components/ui/Card'
import { getLoggedUser } from '~/features/auth/actions'
import { SignInForm } from '~/features/auth/forms'

export default function SignIn() {
    const navigate = useNavigate()
    const user = createAsync(() => getLoggedUser())

    createEffect(() => {
        if (user()?.user)
            navigate("/")
    })

    return (
        <Card>
            <CardTitle>Sing in to our platform</CardTitle>
            <SignInForm />
        </Card>
    )
}
