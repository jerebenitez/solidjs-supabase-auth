import TriangleAlert from 'lucide-solid/icons/triangle-alert'
import { createEffect, createSignal, onMount, Show } from 'solid-js'
import { JSX } from 'solid-js/h/jsx-runtime'
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '~/components/ui/alert-dialog'
import { Button } from '~/components/ui/button'
import { DeleteUserForm } from './forms/delete-account'
import { createAsync } from '@solidjs/router'
import { getLoggedUser } from './actions'

function Warning(props: { onClick: JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent> }) {
    return (
        <AlertDialogDescription class="flex flex-col gap-4">
            <section class="bg-yellow-950 p-10 rounded border border-yellow-900 flex items-center gap-6">
                <TriangleAlert class="text-yellow-400" size={40} />
                All your data will be permanently deleted. Proceed with caution.
            </section>
            <Button variant="secondary" class="w-full" onClick={props.onClick}>
                I understand these effects.
            </Button>
        </AlertDialogDescription>
    )
}

function ConfirmDelete(props: { email: string | undefined | null }) {
    return (
        <AlertDialogDescription class="flex flex-col gap-4">
            <Show when={props.email} fallback={"No email detected. Are you logged in?"}>
                <DeleteUserForm email={props.email || ""} />
            </Show>
        </AlertDialogDescription>
    )
}

export function DeleteAccountDialog() {
    const [ showWarning, setShowWarning ] = createSignal<boolean>(true)
    const [userEmail, setUserEmail] = createSignal<string | null>()

    const user = createAsync(() => getLoggedUser(), { deferStream: true })
    console.log(user())
    createEffect(() => {
        setUserEmail(user()?.email)
    })
    
    return (
        <AlertDialog>
            <AlertDialogTrigger
                as={Button}
                variant="outline"
                class="text-destructive-foreground hover:text-destructive-foreground"
            >
                Delete your account
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogTitle>Delete Account</AlertDialogTitle>
                {showWarning()
                    ? <Warning onClick={() => setShowWarning(false)} />
                    : <ConfirmDelete email={userEmail()} />
                }
            </AlertDialogContent>
        </AlertDialog>
    )
}
