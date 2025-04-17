import { JSX, ParentProps, splitProps } from 'solid-js'
import { cn } from '~/lib/utils'

type NotificationImageProps = JSX.ImgHTMLAttributes<HTMLImageElement>

export function NotificationImage(props: ParentProps<NotificationImageProps>) {
    const [other, restProps] = splitProps(props, ["class", "children"])

    return (
        <div class="flex-shrink-0">
            <img
                class={cn("w-11 h-11 rounded-full", other.class)}
                {...restProps}
            />
            {other.children}
        </div>
    )
}
