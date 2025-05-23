import Check from 'lucide-solid/icons/check'
import ChevronsUpDown from 'lucide-solid/icons/chevrons-up-down'
import File from 'lucide-solid/icons/file'
import { createSignal, For } from 'solid-js'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '~/components/ui/sidebar'

export function VersionSwitcher(props: {
    versions: string[]
    defaultVersion: string
}) {
    const [selectedVersion, setSelectedVersion] = createSignal(
        props.defaultVersion
    )
    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu placement="bottom-start">
                    <DropdownMenuTrigger
                        as={SidebarMenuButton}
                        size="lg"
                        class="data-[expanded]:bg-sidebar-accent data-[expanded]:text-sidebar-accent-foreground"
                    >
                        <div class="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                            <File class="size-4" />
                        </div>
                        <div class="flex flex-col gap-0.5 leading-none">
                            <span class="font-semibold">Documentation</span>
                            <span class="">v{selectedVersion()}</span>
                        </div>
                        <ChevronsUpDown class="ml-auto" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent class="w-[var(--kb-popper-anchor-width)]">
                        <For each={props.versions}>
                            {(version) => (
                                <DropdownMenuItem
                                    onSelect={() => setSelectedVersion(version)}
                                >
                                    v{version}{' '}
                                    {version === selectedVersion() && (
                                        <Check class="ml-auto w-4" />
                                    )}
                                </DropdownMenuItem>
                            )}
                        </For>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}
