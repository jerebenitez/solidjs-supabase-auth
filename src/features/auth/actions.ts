import { action, query, redirect, revalidate } from "@solidjs/router";
import { SignInWithPasswordCredentials, SignUpWithPasswordCredentials } from "@supabase/supabase-js";
import { createClient } from "~/lib/supabase/server";
import { UpdatePassword } from "./schemas";

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

    // TODO: add this to the readme
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

export const updatePassword = action(async (formData: UpdatePassword) => {
    "use server"
    
    const supabase = createClient()

    const { data: { user } } = await supabase.auth.getUser()

    if (!user)
        return { error: "No user found." }

    //TODO: Add this to the readme
    // Source: https://www.reddit.com/r/Supabase/comments/1ggkfeh/update_password_with_current_password_validation/
    // Depends on the following rpc:
    // CREATE OR REPLACE FUNCTION update_password (
        //  "current_plain_password" TEXT,
        //  "new_plain_password" TEXT,
        //  "current_id" UUID
        //) RETURNS TEXT LANGUAGE plpgsql SECURITY DEFINER AS $$
        //DECLARE encpass auth.users.encrypted_password %TYPE;
        //BEGIN
        //SELECT encrypted_password
        //FROM auth.users INTO encpass
        //WHERE id = current_id
        //  AND encrypted_password = crypt(
        //    current_plain_password,
        //    auth.users.encrypted_password
        //  );
        //
        //IF encpass IS NULL THEN RETURN 'incorrect';
        //ELSE
        //UPDATE auth.users
        //SET encrypted_password = crypt(new_plain_password, gen_salt('bf'))
        //WHERE id = current_id;
        //RETURN 'success';
        //END IF;
        //END;
        //$$;
    const { data, error } = await supabase.rpc("update_password", {
        current_id: user.id,
        current_plain_password: formData.oldPassword,
        new_plain_password: formData.newPassword
    });

    if (error) {
        return { error: error.message }
    }

    if (data === "incorrect") {
        return { error: "Old password was not valid. Try again." }
    }

    await revalidate("logged-user")
    return { success: true }
})
