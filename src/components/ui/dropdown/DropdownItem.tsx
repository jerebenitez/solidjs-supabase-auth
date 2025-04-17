import { JSX, splitProps } from 'solid-js'
import { cn } from '~/lib/utils'

export function DropdownItem(props: JSX.LiHTMLAttributes<HTMLLIElement>) {
    const defaultClasses =
        'py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white'
    const [classes, restProps] = splitProps(props, ['class'])

    return <li class={cn(defaultClasses, classes.class)} {...restProps} />
}
