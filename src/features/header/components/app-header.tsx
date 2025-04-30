import { SidebarTrigger } from '~/components/ui/sidebar'
import { Notifications } from './notifications'
import { notifications } from '../data'
import { UserDropdown } from './user-dropdown'

export function AppHeader() {
    return (
        <header class="flex h-16 shrink-0 items-center justify-between gap-2 border-b px-4">
            <SidebarTrigger class="-ml-1" />
            <div class="flex gap-2 items-center">
                <Notifications notifications={notifications} />
                <UserDropdown />
            </div>
        </header>
    )
}
