import { createForm, SubmitHandler, zodForm } from '@modular-forms/solid'
import { UserSignIn, UserSignInSchema } from './schemas'
import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/Button'
import { Label } from '~/components/ui/Label'
import { A } from '@solidjs/router'
import { Separator } from '~/components/ui/Separator'
import { FormInputField } from '~/components/ui/form'
import { FormCheckboxField } from '~/components/ui/form/FormCheckboxField'

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
        validate: zodForm(UserSignInSchema)
    })

    const handleSubmit: SubmitHandler<UserSignIn> = (values, event) => {
        event.preventDefault()
        console.log(values)
    }

    return (
        <Form class="space-y-6" onSubmit={handleSubmit}>
            <Field name="email">
                {(field, props) => (
                    <FormInputField 
                        {...props}
                        type="email"
                        label="Your Email"
                        value={field.value}
                        placeholder="name@company.com"
                        error={field.error}
                        required
                    />
                )}
            </Field>
            <Field name="password">
                {(field, props) => (
                    <FormInputField 
                        {...props}
                        type="password"
                        label="Your password"
                        value={field.value}
                        placeholder="••••••••"
                        error={field.error}
                        required
                    />
                )}
            </Field>
            <Field name="rememberMe" type="boolean">
                {(field, props) => (
                    <div class="flex items-start">
                        <FormCheckboxField 
                            {...props}
                            label="Remember me"
                            checked={field.value}
                        />
                        <A
                            href="/forgot-password"
                            class="ms-auto text-sm text-blue-700 hover:underline dark:text-blue-500"
                        >
                            Lost Password?
                        </A>
                    </div>
                )}
            </Field>

            <Button type="submit" class="w-full">
                Sing in to your account
            </Button>
            <Separator label="or" />
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
