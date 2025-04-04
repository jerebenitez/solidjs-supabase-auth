import { children, JSX, splitProps } from 'solid-js'
import { cn } from '~/lib/utils'

type ButtonProps = {
    children: JSX.Element | JSX.Element[] | string
    variant?:
        | 'primary'
        | 'secondary'
        | 'success'
        | 'danger'
        | 'warning'
        | 'dark'
        | 'light'
        | 'outline'
    size?: 'sm' | 'md' | 'lg'
    pill?: boolean
}

export const Button = (
    props: ButtonProps & JSX.ButtonHTMLAttributes<HTMLButtonElement>
) => {
    const [childrenProp, classes, restProps] = splitProps(
        props,
        ['children'],
        ['class']
    )

    const safeChildren = children(() => childrenProp.children)

    const baseStyles =
        'text-white font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none focus:ring-4 transition'
    const variants = {
        primary:
            'bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 disabled:bg-blue-400 dark:disabled:bg-blue-500 disabled:cursor-not-allowed',
        secondary:
            'bg-gray-700 hover:bg-gray-800 focus:ring-gray-300 disabled:bg-gray-400 dark:disabled:bg-gray-500 disabled:cursor-not-allowed',
        success:
            'bg-green-700 hover:bg-green-800 focus:ring-green-300 disabled:bg-green-400 dark:disabled:bg-green-500 disabled:cursor-not-allowed',
        danger: 'bg-red-700 hover:bg-red-800 focus:ring-red-300 disabled:bg-red-400 dark:disabled:bg-red-500 disabled:cursor-not-allowed',
        warning:
            'bg-yellow-500 hover:bg-yellow-600 focus:ring-yellow-300 disabled:bg-yellow-400 dark:disabled:bg-yellow-500 disabled:cursor-not-allowed',
        dark: 'bg-gray-900 hover:bg-black focus:ring-gray-700 disabled:bg-gray-600 dark:disabled:bg-gray-700 disabled:cursor-not-allowed',
        light: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-400 disabled:bg-gray-300 dark:disabled:bg-gray-400 disabled:cursor-not-allowed',
        outline:
            'border border-gray-300 text-gray-900 hover:bg-gray-100 focus:ring-gray-300 disabled:border-gray-400 disabled:text-gray-500 disabled:bg-gray-100 disabled:cursor-not-allowed',
    }

    const sizes = {
        sm: 'text-xs px-3 py-2',
        md: 'text-sm px-5 py-2.5',
        lg: 'text-lg px-6 py-3',
        icon: '',
    }

    const finalClasses = cn(
        baseStyles,
        props.variant ? variants[props.variant] : variants.primary,
        props.size ? sizes[props.size] : sizes.md,
        classes.class
    )

    return (
        <button class={finalClasses} {...restProps}>
            {safeChildren()}
        </button>
    )
}
