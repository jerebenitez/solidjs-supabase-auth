import { JSX, splitProps } from "solid-js";
import { cn } from "~/lib/utils";

export function NotificationContent(props: JSX.HTMLAttributes<HTMLDivElement>) {
    const defaultClasses = "pl-3 w-full"
    const [classes, restProps] = splitProps(props, ["class"])

    return <div class={cn(defaultClasses, classes.class)} {...restProps} />
}
