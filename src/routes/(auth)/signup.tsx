import { A } from '@solidjs/router'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '~/components/ui/card'
import { SignUpForm } from '~/features/auth/forms/sign-up'
export default function SignUp() {
    return (
        <Card class="w-full max-w-md">
            <CardHeader>
                <CardTitle>Sign up to our platform</CardTitle>
                <CardDescription>
                    Create an account to access the system.
                </CardDescription>
            </CardHeader>
            <CardContent class="space-y-6">
                <SignUpForm />
                <div class="text-right text-sm font-medium text-gray-500 dark:text-gray-300">
                    Already have an account?{' '}
                    <A
                        href="/signin"
                        class="text-blue-700 hover:underline dark:text-blue-500"
                    >
                        Sign in instead
                    </A>
                </div>
            </CardContent>
        </Card>
    )
}
