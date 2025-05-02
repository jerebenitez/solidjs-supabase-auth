import Bell from 'lucide-solid/icons/bell'
import Eye from 'lucide-solid/icons/eye'
import { For, Show } from 'solid-js'
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuSeparator,
    DropdownMenuItem,
    DropdownMenuLabel,
} from '~/components/ui/dropdown-menu'
import { Button } from '~/components/ui/button'
import { A } from '@solidjs/router'
import { NotificationSchema } from '../schemas'
import { Notification } from './notification'

export function Notifications(props: { notifications: NotificationSchema[] }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger as={Button} variant="ghost" size="icon">
                <Bell
                    class="w-4"
                    fill={props.notifications.length > 0 ? 'white' : ''}
                />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <Show
                    when={props.notifications.length > 0}
                    fallback={
                        <DropdownMenuLabel class="text-center">
                            No notifications to show.
                        </DropdownMenuLabel>
                    }
                >
                    <DropdownMenuLabel class="text-center">
                        Notifications
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <For each={props.notifications}>
                        {(item) => (
                            <DropdownMenuItem as={Notification} {...item} />
                        )}
                    </For>
                </Show>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    as={A}
                    href="/notifications"
                    class="w-full cursor-pointer font-bold inline-flex justify-center"
                >
                    <Eye class="w-4" />
                    View all
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
