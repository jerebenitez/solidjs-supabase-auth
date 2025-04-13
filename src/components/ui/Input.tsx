import { JSX, splitProps } from "solid-js";
import { cn } from "~/lib/utils";

export function Input(props: JSX.InputHTMLAttributes<HTMLInputElement>) {
    const [classes, restProps] = splitProps(
        props,
        ['class']
    )

    return (
        <input
            {...restProps}
            class={cn(
                "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
                classes
            )}
        />
    )
}
