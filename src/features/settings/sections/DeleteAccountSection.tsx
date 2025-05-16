import { Separator } from '~/components/ui/separator'
import { DeleteAccountDialog } from '~/features/auth/dialogs'

export function DeleteAccountSection() {
    return (
        <section>
            <h1 class="w-full text-2xl text-destructive-foreground font-bold">
                Delete Account
            </h1>
            <Separator class="mt-2" />
            <div class="px-8">
                <p class="py-8">This action is permanent!</p>
                <DeleteAccountDialog />
            </div>
        </section>
    )
}
