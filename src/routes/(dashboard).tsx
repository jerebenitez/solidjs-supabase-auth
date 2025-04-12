import { ParentProps } from 'solid-js'
import { Header } from '~/components/Header'
import { Sidebar } from '~/components/Sidebar'

export default function DashboardLayout(props: ParentProps) {
    return (
        <>
            <Header />
            <Sidebar />
            <main class="p-4 sm:ml-64">
                <div class="p-4 mt-14">
                    {props.children}
                </div>
            </main>
        </>
    )
}
