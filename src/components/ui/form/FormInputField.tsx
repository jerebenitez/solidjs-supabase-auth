import { JSX, splitProps } from 'solid-js'
import { Label } from '../Label'
import { Input } from '../input'

type TextInputProps = {
    name: string
    type: 'text' | 'email' | 'tel' | 'password' | 'url' | 'date'
    label?: string
    placeholder?: string
    value: string | undefined
    error: string
    required?: boolean
    ref: (element: HTMLInputElement) => void
    onInput: JSX.EventHandler<HTMLInputElement, InputEvent>
    onChange: JSX.EventHandler<HTMLInputElement, Event>
    onBlur: JSX.EventHandler<HTMLInputElement, FocusEvent>
}

export function FormInputField(props: TextInputProps) {
    const [, inputProps] = splitProps(props, ['value', 'label', 'error'])

    return (
        <div>
            {props.label && (
                <Label for={props.name} class={props.error && "text-red-700 dark:text-red-500"}>
                    {props.label} {props.required && <span class="text-xs">(required)</span>}
                </Label>
            )}
            <Input
                {...inputProps}
                id={props.name}
                value={props.value || ''}
                aria-invalid={!!props.error}
                aria-errormessage={`${props.name}-error`}
                class={props.error && "border border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"}
            />
            {props.error && (
                <p
                    id={`${props.name}-error`}
                    class="mt-2 text-sm text-red-600 dark:text-red-500"
                >
                    {props.error}
                </p>
            )}
        </div>
    )
}
