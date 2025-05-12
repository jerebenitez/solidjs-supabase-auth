import {
    createForm,
    FormError,
    SubmitHandler,
    zodForm,
} from '@modular-forms/solid'
import { useAction, useNavigate } from '@solidjs/router'
import { Button } from '~/components/ui/button'
import {
    TextField,
    TextFieldErrorMessage,
    TextFieldInput,
    TextFieldLabel,
} from '~/components/ui/text-field'
import { toast } from 'solid-sonner'
import { ResetPassword, ResetPasswordSchema } from '../schemas'
import { resetPassword } from '../actions'

export function ResetPasswordForm(props: { token_hash: string, type: string, next: string }) {
    const [resetPasswordForm, { Form, Field }] = createForm<ResetPassword>({
        validate: zodForm(ResetPasswordSchema),
    })

    const submit = useAction(resetPassword.with(props.token_hash, props.type))
    const navigate = useNavigate()

    const handleSubmit: SubmitHandler<ResetPassword> = async (values, _) => {
        const { error } = await submit(values)

        if (error) {
            throw new FormError<ResetPassword>(error)
        }

        toast('Password updated successfully')
        navigate("/")
    }

    return (
        <Form class="space-y-6 max-w-md" onSubmit={handleSubmit}>
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
                {resetPasswordForm.response.message}
            </span>
            <Button
                disabled={resetPasswordForm.submitting}
                variant="secondary"
                type="submit"
            >
                Reset Password
            </Button>
        </Form>
    )
}
