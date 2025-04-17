import { JSX, splitProps } from 'solid-js'
import { cn } from '~/lib/utils'

export function DropdownContent(props: JSX.IntrinsicElements['ul']) {
    const defaultClasses = ''
    const [classes, restProps] = splitProps(props, ['class'])

    return <ul class={cn(defaultClasses, classes.class)} {...restProps} />
}
