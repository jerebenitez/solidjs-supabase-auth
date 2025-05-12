import { A, createAsync, useNavigate, useSearchParams } from "@solidjs/router"
import { User } from "@supabase/supabase-js"
import { createEffect } from "solid-js"
import { toast } from "solid-sonner"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import { getLoggedUser } from "~/features/auth/actions"
import { ResetPasswordForm } from "~/features/auth/forms/reset-password"

export default function UpdatePasswordPage() {
    const navigate = useNavigate()
    const [params, _] = useSearchParams()
    const { token_hash, type, next, ...rest } = params

    if (!token_hash || !type) {
        toast("No token hash provided.")
        navigate("/signin")
    }

    return (
        <Card class="w-full max-w-md">
            <CardHeader>
                <CardTitle>Reset your password</CardTitle>
                <CardDescription>Enter your new password below.</CardDescription>
            </CardHeader>
            <CardContent class="space-y-6">
                <ResetPasswordForm { ...{token_hash, type, next} } />
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
