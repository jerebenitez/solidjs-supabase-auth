import { ParentProps } from "solid-js";
import { twMerge } from "tailwind-merge";

export function CardTitle(props: ParentProps & { class: string }) {
    const classes = twMerge(
        "text-xl font-medium text-gray-900 dark:text-white",
        props.class
    )

    return <h1 class={classes}>{props.children}</h1>
}

export function CardHeader(props: ParentProps) {
    return (
        <div class="flex flex-col gap-2">
            {props.children}
        </div>
    )
}

export function CardDescription(props: ParentProps) {
    return <h3 class="text-md font-medium text-gray-700 dark:text-gray-100">{props.children}</h3>
}

export function Card(props: ParentProps & { class: string }) {
    const classes = twMerge(
        "w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 flex flex-col gap-4",
        props.class
    )

    return <div data-slot="card" class={classes}>{props.children}</div>
}
