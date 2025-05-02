import { Separator } from '~/components/ui/separator'
import { DeleteAccountDialog } from '~/features/auth/dialogs'
import { UpdatePasswordForm } from '~/features/auth/forms/update-password'

export default function SettingsPage() {
    return (
        <main class="container mt-4 flex flex-col gap-8">
            <section>
                <h1 class="w-full text-3xl font-bold mb-2">Change Password</h1>
                <Separator class="mt-2 mb-8" />
                <div class="px-8">
                    <UpdatePasswordForm />
                </div>
            </section>
            <section>
                <h1 class="w-full text-3xl text-destructive-foreground font-bold">
                    Delete Account
                </h1>
                <Separator class="mt-2" />
                <div class="px-8">
                    <p class="py-8">This action is permanent!</p>
                    <DeleteAccountDialog />
                </div>
            </section>
        </main>
    )
}
