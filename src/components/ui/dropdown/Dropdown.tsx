import { JSX, splitProps } from 'solid-js'
import { cn } from '~/lib/utils'

export function Dropdown(props: JSX.HTMLAttributes<HTMLDivElement>) {
    const defaultClasses =
        'z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700'
    const [classes, restProps] = splitProps(props, ['class'])

    return <div class={cn(defaultClasses, classes.class)} {...restProps} />
}
