import { action, query, redirect, revalidate } from "@solidjs/router";
import { SignInWithPasswordCredentials } from "@supabase/supabase-js";
import { supabase } from "~/lib/supabase";

export const getLoggedUser = query(async () => {
    "use server"

    const { data: { session }, error } = await supabase.auth.getSession()

    if (session === null || error !== null) {
        throw redirect("/")
    }

    return session.user

}, "logged-user")

// https://supabase.com/docs/guides/auth/signout#sign-out-and-scopes
export const signOut = action(async (scope: "local" | "global" | "others" | undefined) => {
    "use server"

    await supabase.auth.signOut({ scope })
    
    return revalidate("logged-user")
})

export const signIn = action(async (data: SignInWithPasswordCredentials) => {
    "use server"

    await supabase.auth.signInWithPassword(data)

    return revalidate("logged-user")
})
