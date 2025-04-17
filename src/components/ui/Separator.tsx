import { cn } from '~/lib/utils'

type SeparatorProps = {
    label?: string
    class?: string
}

export function Separator(props: SeparatorProps) {
    return props.label ? (
        <div class="inline-flex items-center justify-center w-full">
            <hr class={cn('w-64 h-px my-4', props.class)} />
            <span class="absolute px-3 font-medium text-gray-900 -translate-x-1/2 left-1/2 dark:text-white dark:bg-gray-800">
                {props.label}
            </span>
        </div>
    ) : (
        <hr class={cn('h-px dark:text-gray-600', props.class)} />
    )
}
