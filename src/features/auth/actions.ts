"use server"
import { action, query, redirect, revalidate } from "@solidjs/router"
import { SignInWithPasswordCredentials } from "@supabase/supabase-js"
import { UserSignInSchema } from "./schemas"
import { createClient } from "~/lib/supabase/server"
import { getRequestEvent } from "solid-js/web"

export const signIn = action(async (data: SignInWithPasswordCredentials) => {
    const event = getRequestEvent()

    if (!event) {
        console.error("Got no event.")
        return { error: new Error("Got no event.") }
    }

    const { supabase } = await createClient(event)
    const { success, data: parsedData } = UserSignInSchema.safeParse(data)

    if (!success || !data) {
        return { error: new Error("Error parsing form data.") }
    }

    const { error } = await supabase.auth.signInWithPassword(parsedData)

    if (error) {
        return { error }
    }

    await revalidate("logged-user")

    return {
        success: true,
    }
})

export const getLoggedUser = query(async () => {
    const event = getRequestEvent()

    if (!event) {
        console.error("Got no event.")
        return { error: new Error("Got no event.") }
    }

    const { supabase } = await createClient(event)
    const { data, error } = await supabase.auth.getUser()

    if (data === null || error !== null) {
        throw redirect("/")
    }

    return data.user

}, "logged-user")
