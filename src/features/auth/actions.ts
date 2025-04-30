import { action, query, redirect, revalidate } from "@solidjs/router";
import { SignInWithPasswordCredentials, SignUpWithPasswordCredentials } from "@supabase/supabase-js";
import { createClient } from "~/lib/supabase/server";

export const getLoggedUser = query(async () => {
    "use server"

    const supabase = createClient()
    const { data: { user }, error } = await supabase.auth.getUser()

    if (error !== null) {
        console.error(error)
        return null
    }

    return user

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
    throw redirect("/signin")
})

export const signIn = action(async (data: SignInWithPasswordCredentials) => {
    "use server"

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword(data)

    if (error) return { error: error.message }

    await revalidate("logged-user")
    return { success: true }
})

export const signUp = action(async (credentials: SignUpWithPasswordCredentials) => {
    "use server"

    const supabase = createClient()
    const { error } = await supabase.auth.signUp({ ...credentials })

    if (error) return { error: error.message }

    return { success: true }
})

export const deleteUser = action(async ({ requestEmail }: { requestEmail: string }) => {
    "use server"

    const supabase = createClient()

    // get user UID
    const { data: { user } } = await supabase.auth.getUser()

    if (!user)
        return { error: "No user found." }

    if (requestEmail !== user.email)
        return { error: "Error: e-mail addresses don't match." }

    // Invoke deleteUser rpc, needs to be defined in Supabase as follows:
    /*
        CREATE or replace function "deleteUser"()
          returns void
        LANGUAGE SQL SECURITY DEFINER 
        AS $$
           delete from auth.users where id = auth.uid();
        $$;
    */
    const { error } = await supabase.rpc("deleteUser")

    if (error)
        return { error: error.message }

    await revalidate("logged-user")
    return { success: true }
})
