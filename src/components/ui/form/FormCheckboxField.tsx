import { JSX, splitProps } from 'solid-js'
import { Label } from '../Label'
import { Input } from '../input'

type TextInputProps = {
    name: string
    label?: string
    checked: boolean | undefined
    ref: (element: HTMLInputElement) => void
    onInput: JSX.EventHandler<HTMLInputElement, InputEvent>
    onChange: JSX.EventHandler<HTMLInputElement, Event>
    onBlur: JSX.EventHandler<HTMLInputElement, FocusEvent>
}

export function FormCheckboxField(props: TextInputProps) {
    const [, inputProps] = splitProps(props, ['checked', 'label'])

    return (
        <div class="flex items-start">
            <div class="flex items-center h-5">
                <Input
                    {...inputProps}
                    id={props.name}
                    type="checkbox"
                    checked={props.checked}
                    class="mr-2 w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                />
            </div>
            <Label for={props.name}>{props.label}</Label>
        </div>
    )
}
