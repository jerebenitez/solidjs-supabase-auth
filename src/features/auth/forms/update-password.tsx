import {
    createForm,
    FormError,
    SubmitHandler,
    zodForm,
} from '@modular-forms/solid'
import { UpdatePassword, UpdatePasswordSchema } from '../schemas'
import { useAction } from '@solidjs/router'
import { Button } from '~/components/ui/button'
import {
    TextField,
    TextFieldErrorMessage,
    TextFieldInput,
    TextFieldLabel,
} from '~/components/ui/text-field'
import { updatePassword } from '../actions'
import { toast } from 'solid-sonner'

export function UpdatePasswordForm() {
    const [updatePasswordForm, { Form, Field }] = createForm<UpdatePassword>({
        validate: zodForm(UpdatePasswordSchema),
    })

    const submit = useAction(updatePassword)

    const handleSubmit: SubmitHandler<UpdatePassword> = async (values, _) => {
        const { error } = await submit(values)

        if (error) {
            throw new FormError<UpdatePassword>(error)
        }

        toast("Password updated successfully")
    }

    return (
        <Form class="space-y-6 max-w-md" onSubmit={handleSubmit}>
            <Field name="oldPassword">
                {(field, props) => (
                    <TextField
                        class="gap-1"
                        validationState={field.error ? 'invalid' : 'valid'}
                        value={field.value}
                    >
                        <TextFieldLabel>Current Password</TextFieldLabel>
                        <TextFieldInput
                            {...props}
                            type="password"
                            placeholder="••••••••"
                            aria-invalid={!!field.error}
                            required
                        />
                        {field.error && (
                            <TextFieldErrorMessage id={`${field.name}-error`}>
                                {field.error}
                            </TextFieldErrorMessage>
                        )}
                    </TextField>
                )}
            </Field>
            <Field name="newPassword">
                {(field, props) => (
                    <TextField
                        class="gap-1"
                        validationState={field.error ? 'invalid' : 'valid'}
                        value={field.value}
                    >
                        <TextFieldLabel>New Password</TextFieldLabel>
                        <TextFieldInput
                            {...props}
                            type="password"
                            placeholder="••••••••"
                            aria-invalid={!!field.error}
                            required
                        />
                        {field.error && (
                            <TextFieldErrorMessage id={`${field.name}-error`}>
                                {field.error}
                            </TextFieldErrorMessage>
                        )}
                    </TextField>
                )}
            </Field>
            <Field name="confirmPassword">
                {(field, props) => (
                    <TextField
                        class="gap-1"
                        validationState={field.error ? 'invalid' : 'valid'}
                        value={field.value}
                    >
                        <TextFieldLabel>Confirm New Password</TextFieldLabel>
                        <TextFieldInput
                            {...props}
                            type="password"
                            placeholder="••••••••"
                            aria-invalid={!!field.error}
                            required
                        />
                        {field.error && (
                            <TextFieldErrorMessage id={`${field.name}-error`}>
                                {field.error}
                            </TextFieldErrorMessage>
                        )}
                    </TextField>
                )}
            </Field>

            <span class="text-destructive text-sm font-bold">
                {updatePasswordForm.response.message}
            </span>
            <Button
                disabled={updatePasswordForm.submitting}
                variant="secondary"
                type="submit"
            >
                Update Password
            </Button>
        </Form>
    )
}
