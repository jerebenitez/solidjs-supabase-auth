type SeparatorProps = {
    label: string
}

export function Separator(props: SeparatorProps) {
    return (
        <div class="inline-flex items-center justify-center w-full">
            <hr class="w-64 h-px my-4" />
            <span class="absolute px-3 font-medium text-gray-900 -translate-x-1/2 left-1/2 dark:text-white dark:bg-gray-800">
                {props.label}
            </span>
        </div>
    )
}
