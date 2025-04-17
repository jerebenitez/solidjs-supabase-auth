import { splitProps } from 'solid-js'
import { Button, ButtonProps } from '~/components/ui/Button'

type DropdownTriggerProps = {
    for: string
} & ButtonProps

export function DropdownTrigger(props: DropdownTriggerProps) {
    const [forProp, restProps] = splitProps(props, ['for'])

    return <Button {...restProps} data-dropdown-toggle={forProp.for} aria-expanded="false" />
}
