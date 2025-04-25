import { Card, CardTitle } from '~/components/ui/Card'
import { SignInForm } from '~/features/auth/forms'

export default function SignIn() {

    return (
        <Card>
            <CardTitle>Sing in to our platform</CardTitle>
            <SignInForm />
        </Card>
    )
}
