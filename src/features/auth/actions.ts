import { action, revalidate } from "@solidjs/router"
import { SignInWithPasswordCredentials } from "@supabase/supabase-js"
import { supabase } from "~/lib/supabase"
import { UserSignInSchema } from "./schemas"

export const signIn = action(async (data: SignInWithPasswordCredentials) => {
    "use server"

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
