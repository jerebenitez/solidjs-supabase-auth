import { action, query, revalidate } from "@solidjs/router";
import { SignInWithPasswordCredentials } from "@supabase/supabase-js";
import { createClient } from "~/lib/supabase/server";

export const getLoggedUser = query(async () => {
    "use server"

    const supabase = createClient()
    const { data: { session }, error } = await supabase.auth.getSession()

    if (error !== null) {
        return { error: error.message }
    } else if (session === null) {
        return { error: "No user found." }
    }

    return { user: session.user, error: null }

}, "logged-user")

// https://supabase.com/docs/guides/auth/signout#sign-out-and-scopes
export const signOut = action(async (scope: "local" | "global" | "others" | undefined) => {
    "use server"

    const supabase = createClient()
    const { error } = await supabase.auth.signOut({ scope })

    if (error) {
        console.error(error)
        return { error: error.message }
    }
    
    await revalidate("logged-user")
    return { success: true }
})

export const signIn = action(async (data: SignInWithPasswordCredentials) => {
    "use server"

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword(data)

    if (error) return { error: error.message }

    await revalidate("logged-user")
    return { success: true }
})
