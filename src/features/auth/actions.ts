import { action, query, redirect, revalidate } from '@solidjs/router'
import {
    EmailOtpType,
    SignInWithPasswordCredentials,
    SignUpWithPasswordCredentials,
} from '@supabase/supabase-js'
import { createClient } from '~/lib/supabase/server'
import { PasswordRecover, ResetPassword, ResetPasswordSchema, UpdatePassword } from './schemas'

export const getLoggedUser = query(async () => {
    'use server'

    const supabase = createClient()
    const {
        data: { user },
        error,
    } = await supabase.auth.getUser()

    if (error !== null) {
        console.error(error)
        return null
    }

    return user
}, 'logged-user')

// https://supabase.com/docs/guides/auth/signout#sign-out-and-scopes
export const signOut = action(
    async (scope: 'local' | 'global' | 'others' | undefined) => {
        'use server'

        const supabase = createClient()
        const { error } = await supabase.auth.signOut({ scope })

        if (error) {
            console.error(error)
            return { error: error.message }
        }

        await revalidate('logged-user')
        throw redirect('/signin')
    }
)

export const signIn = action(async (data: SignInWithPasswordCredentials) => {
    'use server'

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword(data)

    if (error) return { error: error.message }

    await revalidate('logged-user')
    return { success: true }
})

export const signUp = action(
    async (credentials: SignUpWithPasswordCredentials) => {
        'use server'

        const supabase = createClient()
        const { error } = await supabase.auth.signUp({ ...credentials })

        if (error) return { error: error.message }

        return { success: true }
    }
)

export const deleteUser = action(
    async ({ requestEmail }: { requestEmail: string }) => {
        'use server'

        const supabase = createClient()

        // get user UID
        const {
            data: { user },
        } = await supabase.auth.getUser()

        if (!user) return { error: 'No user found.' }

        if (requestEmail !== user.email)
            return { error: "Error: e-mail addresses don't match." }

        const { error } = await supabase.rpc('deleteUser')

        if (error) return { error: error.message }

        await revalidate('logged-user')
        return { success: true }
    }
)

export const updatePassword = action(async (formData: UpdatePassword) => {
    'use server'

    const supabase = createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) return { error: 'No user found.' }

    const { data, error } = await supabase.rpc('update_password', {
        current_id: user.id,
        current_plain_password: formData.oldPassword,
        new_plain_password: formData.newPassword,
    })

    if (error) {
        return { error: error.message }
    }

    if (data === 'incorrect') {
        return { error: 'Old password was not valid. Try again.' }
    }

    await revalidate('logged-user')
    return { success: true }
})

export const recoverPassword = action(async (formData: PasswordRecover) => {
    'use server'

    const supabase = createClient()
    await supabase.auth.resetPasswordForEmail(formData.email)

    await revalidate('logged-user')
    return { success: true }
})

export const resetPassword = action(async (token_hash: string, type: string, password: ResetPassword) => {
    'use server'

    const { error: parseError } = ResetPasswordSchema.safeParse(password)

    if (parseError || !token_hash || !type) {
        return { error: "Invalid credentials." }
    }

    const supabase = createClient()

    let { error } = await supabase.auth.verifyOtp({
        type: type as EmailOtpType,
        token_hash
    })

    if (error) return { error: error.message }

    // WTF JS
    ;({ error } = await supabase.auth.updateUser({
        password: password.newPassword
    }))

    if (error) return { error: error.message }
    
    await revalidate('logged-user')
    return { success: true }
})
