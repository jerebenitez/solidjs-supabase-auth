import {
    createForm,
    FormError,
    SubmitHandler,
    zodForm,
} from '@modular-forms/solid'
import { UserSignIn, UserSignInSchema } from '../schemas'
import { A, useAction, useNavigate } from '@solidjs/router'
import { signIn } from '../actions'
import { Button } from '~/components/ui/button'
import {
    TextField,
    TextFieldErrorMessage,
    TextFieldInput,
    TextFieldLabel,
} from '~/components/ui/text-field'
import { LabelSeparator } from '~/components/ui/separator'

function GoogleSignInButton() {
    return (
        <Button
            variant="secondary"
            class="flex items-center w-full justify-center"
        >
            <svg
                class="w-4 h-4 me-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 19"
            >
                <path
                    fill-rule="evenodd"
                    d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z"
                    clip-rule="evenodd"
                />
            </svg>
            Sign in with Google
        </Button>
    )
}

export function SignInForm() {
    const [userSignInForm, { Form, Field }] = createForm<UserSignIn>({
        validate: zodForm(UserSignInSchema),
    })

    const navigate = useNavigate()
    const submit = useAction(signIn)

    const handleSubmit: SubmitHandler<UserSignIn> = async (values, _) => {
        const { error } = await submit(values)

        if (error) {
            throw new FormError<UserSignIn>(error)
        }

        navigate('/')
    }

    return (
        <Form class="space-y-6" onSubmit={handleSubmit}>
            <Field name="email">
                {(field, props) => (
                    <TextField 
                        class="gap-1"
                        validationState={field.error ? "invalid" : "valid"}
                        value={field.value}
                    >
                        <TextFieldLabel>Your email</TextFieldLabel>
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
            <Field name="password">
                {(field, props) => (
                    <TextField 
                        class="gap-1"
                        validationState={field.error ? "invalid" : "valid"}
                        value={field.value}
                    >
                        <TextFieldLabel>Your password</TextFieldLabel>
                        <TextFieldInput
                            {...props}
                            type="password"
                            placeholder="••••••••"
                            aria-invalid={!!field.error}
                            aria-errormessage={`${field.name}-error`}
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

            <p class="w-full flex justify-end items center">
                <Button as={A} variant="link" href="/recover-password">Forgot your password?</Button>
            </p>

            <span class="text-destructive text-sm font-bold mb-2">{userSignInForm.response.message}</span>
            <Button
                type="submit"
                class="w-full"
                disabled={userSignInForm.submitting}
            >
                Sing in to your account
            </Button>
            <LabelSeparator label="or" />
            <GoogleSignInButton />
            <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
                Not registered?{' '}
                <A
                    href="/signup"
                    class="text-blue-700 hover:underline dark:text-blue-500"
                >
                    Create account
                </A>
            </div>
        </Form>
    )
}
