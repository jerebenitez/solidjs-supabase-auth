import { cn } from '~/lib/utils'

type SeparatorProps = {
    label?: string
    class?: string
}

export function Separator(props: SeparatorProps) {
    return props.label ? (
            <div 
                class={cn(
                    "flex text-center items-center w-full px-3 font-medium text-gray-900 dark:text-white dark:bg-gray-800", 
                    "after:content-[''] after:border-b after:border-b-gray-700 after:ml-2 after:flex-1",
                    "before:content-[''] before:border-b before:border-b-gray-700 before:mr-2 before:flex-1",
                    props.class
            )}>
                {props.label}
            </div>
    ) : (
        <hr class={cn('h-px dark:text-gray-600', props.class)} />
    )
}
