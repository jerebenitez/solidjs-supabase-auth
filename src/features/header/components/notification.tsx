import { Flex } from '~/components/ui/flex'
import { type NotificationSchema } from '../schemas'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import { marked } from 'marked'

function getInitials(fullName: string) {
    if (fullName.length === 0) return 'NA'

    const names = fullName.trim().split(/\s+/)

    return names.length === 1
        ? names[0].slice(0, 2).toUpperCase()
        : names
              .slice(-2)
              .map((p) => p[0].toUpperCase())
              .join('')
}

function notificationDescription(notification: NotificationSchema) {
    switch (notification.type) {
        case 'message':
            if (notification.message)
                return `**${notification.from.name}** sent you a message: *${notification.message}*`
        case 'like':
            return `**${notification.from.name}** liked one of your [${notification.target?.type}s](${notification.target?.url}).`
        default:
            return ''
    }
}

export function Notification(props: NotificationSchema) {
    return (
        <Flex class="w-96">
            <Avatar class="ml-4 mr-2">
                <AvatarImage src={props.from.photo} />
                <AvatarFallback>{getInitials(props.from.name)}</AvatarFallback>
            </Avatar>
            <div class="ml-2 mr-4">
                <div
                    class="overflow-ellipsis line-clamp-2"
                    innerHTML={marked.parse(notificationDescription(props), {
                        async: false,
                    })}
                />
                <span class="text-muted-foreground text-xs">
                    {props.createdOn}
                </span>
            </div>
        </Flex>
    )
}
