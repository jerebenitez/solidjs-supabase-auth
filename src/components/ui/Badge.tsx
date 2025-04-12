import { cn } from '~/lib/utils'

export type BadgeProps = {
    title: string
    color?: string
    class?: string
    pill?: boolean
}
export function Badge(props: BadgeProps) {
    const color = props.color || 'blue'

    return (
        <span
            class={cn(
                `bg-${color}-100 text-${color}-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:text-${color}-300`,
                `dark:bg-${color}-${color === "gray" ? "700" : "900"}`,
                props.pill && 'rounded-full',
                props.class
            )}
        >
            {props.title}
        </span>
    )
}
