import type { ValidComponent } from 'solid-js'
import { splitProps } from 'solid-js'

import type { PolymorphicProps } from '@kobalte/core/polymorphic'
import * as SeparatorPrimitive from '@kobalte/core/separator'

import { cn } from '~/lib/utils'

type SeparatorRootProps<T extends ValidComponent = 'hr'> =
    SeparatorPrimitive.SeparatorRootProps<T> & { class?: string | undefined }

const Separator = <T extends ValidComponent = 'hr'>(
    props: PolymorphicProps<T, SeparatorRootProps<T>>
) => {
    const [local, others] = splitProps(props as SeparatorRootProps, [
        'class',
        'orientation',
    ])
    return (
        <SeparatorPrimitive.Root
            orientation={local.orientation ?? 'horizontal'}
            class={cn(
                'shrink-0 bg-border',
                local.orientation === 'vertical'
                    ? 'h-full w-px'
                    : 'h-px w-full',
                local.class
            )}
            {...others}
        />
    )
}

type SeparatorProps = {
    label: string
    class?: string
}

function LabelSeparator(props: SeparatorProps) {
    return (
        <div
            class={cn(
                'flex text-center items-center w-full px-3 font-medium text-muted-foreground bg-background',
                "after:content-[''] after:border-b after:border-b-gray-700 after:ml-2 after:flex-1",
                "before:content-[''] before:border-b before:border-b-gray-700 before:mr-2 before:flex-1",
                props.class
            )}
        >
            {props.label}
        </div>
    )
}

export { Separator, LabelSeparator }
