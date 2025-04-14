import { Component, splitProps } from 'solid-js'
import { InputIconProps, useInputContext } from '.'
import { cn } from '~/lib/utils'

export const InputIcon: Component<InputIconProps> = (props) => {
    const [local, divProps] = splitProps(props, ['size', 'class', 'children'])
    const context = useInputContext()

    const position = context?.iconPosition || 'left'

    return (
        <div
            class={cn(
                'absolute flex items-center justify-center text-gray-500 dark:text-gray-400',
                position === 'right' ? 'right-0' : 'left-0',
                local.size === 'sm' && 'p-2',
                local.size === 'lg' && 'p-4',
                (local.size === 'md' || !local.size) && 'p-2.5',
                local.class
            )}
            {...divProps}
        >
            {props.children}
        </div>
    )
}
