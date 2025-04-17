import { ParentProps } from "solid-js"
import { cn } from "~/lib/utils"

type NotificationIconProps = {
    class?: string
}

export function NotificationIcon(props: ParentProps<NotificationIconProps>) {
    const defaultClasses = "flex absolute justify-center items-center ml-6 -mt-5 w-5 h-5 bg-purple-500 rounded-full border border-white dark:border-gray-700"

    return (
        <div class={cn(defaultClasses, props.class)}>
            {props.children}
        </div>
    )
}
