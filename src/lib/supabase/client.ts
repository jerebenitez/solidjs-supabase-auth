import { createBrowserClient } from "@supabase/ssr";

export function createFrontendClient() {
    return createBrowserClient(
        import.meta.env.VITE_SUPABASE_URL,
        import.meta.env.VITA_SUPABASE_KEY
    )
}
