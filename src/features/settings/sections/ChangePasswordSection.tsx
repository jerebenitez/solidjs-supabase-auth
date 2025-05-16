import { Separator } from '~/components/ui/separator'
import { UpdatePasswordForm } from '~/features/auth/forms/update-password'

export function ChangePasswordSection() {
    return (
        <section>
            <h1 class="w-full text-2xl font-bold mb-2">Change Password</h1>
            <Separator class="mt-2 mb-8" />
            <div class="px-8">
                <UpdatePasswordForm />
            </div>
        </section>
    )
}
