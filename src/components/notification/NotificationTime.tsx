import { JSX, splitProps } from "solid-js";
import { cn } from "~/lib/utils";

export function NotificationTime(props: JSX.HTMLAttributes<HTMLDivElement>) {
    const defaultClasses = "text-xs font-medium text-primary-700 dark:text-primary-400"
    const [classes, restProps] = splitProps(props, ["class"])

    return <div class={cn(defaultClasses, classes.class)} {...restProps} />
}
