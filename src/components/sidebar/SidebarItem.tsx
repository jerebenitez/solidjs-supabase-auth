import { A } from "@solidjs/router"
import { LucideIcon } from "lucide-solid"
import { Badge, BadgeProps } from "~/components/ui/Badge"

export type SidebarItemProps = {
    title: string
    href: string
    icon?: LucideIcon
    badge?: BadgeProps
    class?: string
}

export function SidebarItem(props: SidebarItemProps) {
    return (
        <li class={props.class}>
            <A href={props.href} class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"> 
                {props.icon && <props.icon />}
                <span class={`ms-3 ${props.badge && "flex-1 whitespace-nowrap"}`}>{props.title}</span>
                {props.badge && <Badge title={props.badge.title} color={props.badge.color} pill={props.badge.pill} />}
            </A>
        </li>
    )
}
