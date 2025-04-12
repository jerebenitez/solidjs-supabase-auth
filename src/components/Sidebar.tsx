import Inbox from 'lucide-solid/icons/inbox'
import LayoutDashboard from 'lucide-solid/icons/layout-dashboard'
import SquareKanban from 'lucide-solid/icons/square-kanban'
import { SidebarItem, SidebarItemProps } from './SidebarItem'

export function Sidebar() {
    const data: SidebarItemProps[] = [
        { title: 'Dashboard', href: '/', icon: LayoutDashboard },
        {
            title: 'Kanban',
            href: '/kanban',
            icon: SquareKanban,
            badge: { title: 'Pro', color: 'gray', pill: true },
        },
        {
            title: 'Inbox',
            href: '/inbox',
            icon: Inbox,
            badge: { title: '3', pill: true },
        },
    ]

    return (
        <aside
            id="logo-sidebar"
            class="fixed top-0 left-0 z-40 w-64 h-screen pt-20 pb-6 px-3 flex flex-col transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
            aria-label="Sidebar"
        >
            <div class="h-full py-4 flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                <ul class="space-y-2 font-medium">
                    {data.map((item) => (
                        <SidebarItem
                            title={item.title}
                            href={item.href}
                            icon={item.icon}
                            badge={item.badge}
                        />
                    ))}
                </ul>
            </div>
            <div
                id="dropdown-cta"
                class="p-4 mt-6 rounded-lg bg-blue-50 dark:bg-blue-900"
                role="alert"
            >
                <div class="flex items-center mb-3">
                    <span class="bg-orange-100 text-orange-800 text-sm font-semibold me-2 px-2.5 py-0.5 rounded-sm dark:bg-orange-200 dark:text-orange-900">
                        Beta
                    </span>
                    <button
                        type="button"
                        class="ms-auto -mx-1.5 -my-1.5 bg-blue-50 inline-flex justify-center items-center w-6 h-6 text-blue-900 rounded-lg focus:ring-2 focus:ring-blue-400 p-1 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-400 dark:hover:bg-blue-800"
                        data-dismiss-target="#dropdown-cta"
                        aria-label="Close"
                    >
                        <span class="sr-only">Close</span>
                        <svg
                            class="w-2.5 h-2.5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 14"
                        >
                            <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                            />
                        </svg>
                    </button>
                </div>
                <p class="mb-3 text-sm text-blue-800 dark:text-blue-400">
                    Preview the new Flowbite dashboard navigation! You can turn
                    the new navigation off for a limited time in your profile.
                </p>
                <a
                    class="text-sm text-blue-800 underline font-medium hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                    href="#"
                >
                    Turn new navigation off
                </a>
            </div>
        </aside>
    )
}
