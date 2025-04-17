import { JSX, splitProps } from "solid-js";
import { cn } from "~/lib/utils";

export function DropdownLabel(props: JSX.HTMLAttributes<HTMLDivElement>) {
    const [classes, restProps] = splitProps(props, ["class"])

    return <div class={cn("py-3 px-4", classes)} {...restProps} />

}
