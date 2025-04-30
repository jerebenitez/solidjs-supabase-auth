import {
    createForm,
    FormError,
    SubmitHandler,
    zodForm,
} from '@modular-forms/solid'
import { UserDelete, UserDeleteSchema } from '../schemas'
import { useAction, useNavigate } from '@solidjs/router'
import { Button } from '~/components/ui/button'
import {
    TextField,
    TextFieldErrorMessage,
    TextFieldInput,
    TextFieldLabel,
} from '~/components/ui/text-field'
import { deleteUser } from '../actions'
import { toast } from 'solid-sonner'
import { createSignal } from 'solid-js'

export function DeleteUserForm(props: { email: string }) {
    const [deleteUserForm, { Form, Field }] = createForm<UserDelete>({
        validate: zodForm(UserDeleteSchema),
    })
    const [email, setEmail] = createSignal<string>('')

    const navigate = useNavigate()
    const submit = useAction(deleteUser)

    const handleSubmit: SubmitHandler<UserDelete> = async (values, _) => {
        const { email: requestEmail } = values
        const { error } = await submit({ requestEmail })

        if (error) {
            throw new FormError<UserDelete>(error)
        }

        toast("Account deleted successfully.")
        navigate('/signup')
    }

    return (
        <Form class="space-y-6" onSubmit={handleSubmit}>
            <Field name="email">
                {(field, props) => (
                    <TextField
                        class="gap-1"
                        validationState={field.error ? 'invalid' : 'valid'}
                        value={field.value}
                        onChange={() => setEmail(field.value || "")}
                    >
                        <TextFieldLabel>
                            To confirm, enter your e-mail below
                        </TextFieldLabel>
                        <TextFieldInput
                            {...props}
                            type="email"
                            placeholder="name@email.com"
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
                disabled={deleteUserForm.submitting || email() !== props.email}
                variant="secondary"
                class="w-full text-destructive"
                type="submit"
            >
                Delete account
            </Button>
        </Form>
    )
}
