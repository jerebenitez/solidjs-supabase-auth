import { ParentProps } from 'solid-js'
import { SidebarInset, SidebarProvider } from '~/components/ui/sidebar'
import { AppHeader } from '~/features/header/components/app-header'
import { AppSidebar } from '~/features/sidebar/components/app-sidebar'

export default function DashboardLayout(props: ParentProps) {
    return (
        <SidebarProvider>
            <AppSidebar variant="inset" />
            <SidebarInset>
                <AppHeader />
                <div class="flex-1">{props.children}</div>
            </SidebarInset>
        </SidebarProvider>
    )
}
