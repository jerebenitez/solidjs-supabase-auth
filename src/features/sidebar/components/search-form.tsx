import Search from 'lucide-solid/icons/search'
import type { ComponentProps } from 'solid-js'

import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarInput,
} from '~/components/ui/sidebar'

export function SearchForm(props: ComponentProps<'form'>) {
    return (
        <form {...props}>
            <SidebarGroup class="py-0">
                <SidebarGroupContent class="relative">
                    <label for="search" class="sr-only">
                        Search
                    </label>
                    <SidebarInput
                        id="search"
                        placeholder="Search the docs..."
                        class="pl-8"
                    />
                    <Search class="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 select-none opacity-50" />
                </SidebarGroupContent>
            </SidebarGroup>
        </form>
    )
}
