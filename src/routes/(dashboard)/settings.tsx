import { Separator } from "~/components/ui/separator";
import { DeleteAccountDialog } from "~/features/auth/dialogs";

export default function SettingsPage() {
    return (
        <main class="container mt-4">
        <section>
            <h1 class="">Change password</h1>
        </section>
        <section>
            <h1 class="">Export account data</h1>
        </section>
        <section>
            <h1 class="w-full text-3xl text-destructive-foreground font-bold mb-2">Delete account</h1>
            <Separator />
            <p>This action is permanent!</p>
            <DeleteAccountDialog />
        </section>
        </main>
    )
}
