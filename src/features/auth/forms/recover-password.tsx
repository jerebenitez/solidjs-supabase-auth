import { createForm, SubmitHandler, zodForm } from '@modular-forms/solid'
import { PasswordRecover, PasswordRecoverSchema } from '../schemas'
import { useAction } from '@solidjs/router'
import { Button } from '~/components/ui/button'
import {
    TextField,
    TextFieldErrorMessage,
    TextFieldInput,
    TextFieldLabel,
} from '~/components/ui/text-field'
import { recoverPassword } from '../actions'
import { toast } from 'solid-sonner'

export function RecoverPasswordForm() {
    const [deleteUserForm, { Form, Field }] = createForm<PasswordRecover>({
        validate: zodForm(PasswordRecoverSchema),
    })

    const submit = useAction(recoverPassword)

    const handleSubmit: SubmitHandler<PasswordRecover> = async (values, _) => {
        await submit(values)
        // We don't report errors so that it can't be used to check for users

        toast('Check your e-mail.')
    }

    return (
        <Form class="space-y-6 max-w-md" onSubmit={handleSubmit}>
            <Field name="email">
                {(field, props) => (
                    <TextField
                        class="gap-1"
                        validationState={field.error ? 'invalid' : 'valid'}
                        value={field.value}
                    >
                        <TextFieldLabel>Your email</TextFieldLabel>
                        <TextFieldInput
                            {...props}
                            type="email"
                            placeholder="me@email.com"
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
                {deleteUserForm.response.message}
            </span>
            <Button
                disabled={deleteUserForm.submitting}
                variant="secondary"
                type="submit"
            >
                Send Link
            </Button>
        </Form>
    )
}
