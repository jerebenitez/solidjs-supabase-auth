import { A, createAsync } from '@solidjs/router'
import { User } from '@supabase/auth-js'
import LogOut from 'lucide-solid/icons/log-out'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import { Button } from '~/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'
import { getLoggedUser, signOut } from '~/features/auth/actions'
import { getCurrentProfile } from '~/features/user-profile/actions'
import { getInitials } from '~/lib/utils'

export function UserDropdown() {
    const user = createAsync<User | null>(() => getLoggedUser())
    const profile = createAsync(() => getCurrentProfile())

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar>
                    <AvatarImage src={profile()?.profile?.avatar_url} />
                    <AvatarFallback>{getInitials(profile()?.profile?.full_name || user()?.email)}</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent class="w-64">
                <DropdownMenuLabel>
                    <p>Hello{profile() && `, ${profile()?.profile?.full_name}`}!</p>
                    <span class="text-muted-foreground text-xs">
                        {user()?.email}
                    </span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem as={A} href="/profile">My Profile</DropdownMenuItem>
                <DropdownMenuItem as={A} href="/settings">
                    Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <form action={signOut.with('local')} method="post">
                    <DropdownMenuItem
                        as={Button}
                        type="submit"
                        variant="ghost"
                        size="sm"
                        class="w-full font-normal justify-start"
                    >
                        <LogOut class="w-4" />
                        Sign out
                    </DropdownMenuItem>
                </form>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
