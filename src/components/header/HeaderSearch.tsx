import Search from 'lucide-solid/icons/search'
import { JSX } from 'solid-js'
import { Input, InputIcon } from '~/components/ui/input'

export function HeaderSearch(props: JSX.HTMLAttributes<HTMLDivElement>) {
    return (
        <div {...props}>
            <label for="topbar-search" class="sr-only">
                Search
            </label>
            <Input
                type="text"
                name="email"
                id="topbar-search"
                placeholder='Search'
                icon={() => (
                    <InputIcon>
                        <Search class="w-4 h-4"/>
                    </InputIcon>
                )} />
        </div>
    )
}
