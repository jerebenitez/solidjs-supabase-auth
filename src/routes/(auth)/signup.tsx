import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card'
import { SignUpForm } from '~/features/auth/forms/sign-up'
export default function SignUp() {
    return (
        <Card class="w-full max-w-md">
            <CardHeader>
                <CardTitle>Sign up to our platform</CardTitle>
                <CardDescription>Create an account to access the system.</CardDescription>
            </CardHeader>
            <CardContent>
                <SignUpForm />
            </CardContent>
        </Card>
    )
}
