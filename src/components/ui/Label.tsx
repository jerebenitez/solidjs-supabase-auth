import { JSX, splitProps } from 'solid-js'
import { cn } from '~/lib/utils'

export function Label(props: JSX.LabelHTMLAttributes<HTMLLabelElement>) {
    const [classes, restProps] = splitProps(props, ['class'])

    return (
        <label
            {...restProps}
            class={cn(
                'block mb-2 text-sm font-medium text-gray-900 dark:text-white',
                classes.class
            )}
        >
            {props.children}
        </label>
    )
}
