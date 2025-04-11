import { ParentProps, createResource, onMount } from 'solid-js'
import { initFlowbite } from 'flowbite'
import { supabase } from '~/lib/supabase'
import { Header } from '~/components/Header'

const fetchUser = async () => {
    const { data: { user } } = await supabase.auth.getUser()

    return user
}

export default function DashboardLayout(props: ParentProps) {

    onMount(() => {
        initFlowbite()
    })

    const [user] = createResource(fetchUser)

    return (
        <>
            <Header />
            <main>{props.children}</main>
        </>
    )
}
