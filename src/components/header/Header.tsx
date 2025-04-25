import { initFlowbite } from 'flowbite'
import { onMount } from 'solid-js'
import { RadioDropdown } from '~/components/ui/RadioDropdown'
import { A, useNavigate } from '@solidjs/router'
import { HeaderSearch } from './HeaderSearch'
import { projects } from '~/lib/data'
import { Dropdown } from '../ui/dropdown/Dropdown'
import { DropdownContent } from '../ui/dropdown/DropdownContent'
import { DropdownItem } from '../ui/dropdown/DropdownItem'
import { Separator } from '../ui/Separator'
import { DropdownTrigger } from '../ui/dropdown/DropdownTrigger'
import { DropdownLabel } from '../ui/dropdown/DropdownLabel'
import { NotificationTime } from '../notification/NotificationTime'
import { NotificationContent } from '../notification/NotificationContent'
import { NotificationIcon } from '../notification/NotificationIcon'
import Video from 'lucide-solid/icons/video'
import { NotificationImage } from '../notification/NotificationImage'
import { Button } from '../ui/Button'
import { signOut } from '~/features/auth/actions'

const getProjects = () => {
    return projects
}

export function Header() {
    const projects = getProjects()

    onMount(() => {
        initFlowbite()
    })

    return (
        <header class="antialiased">
            <nav class="px-3 py-3 lg:px-5 lg:pl-3 fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <div class="flex flex-wrap justify-between items-center">
                    <div class="flex justify-start items-center">
                        <button
                            data-drawer-target="logo-sidebar"
                            data-drawer-toggle="logo-sidebar"
                            aria-controls="logo-sidebar"
                            type="button"
                            class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        >
                            <span class="sr-only">Open sidebar</span>
                            <svg
                                class="w-6 h-6"
                                aria-hidden="true"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    clip-rule="evenodd"
                                    fill-rule="evenodd"
                                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                                ></path>
                            </svg>
                        </button>
                        <a href="https://flowbite.com" class="flex mr-4">
                            <img
                                src="https://flowbite.s3.amazonaws.com/logo.svg"
                                class="mr-3 h-8"
                                alt="FlowBite Logo"
                            />
                            <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                                SolidAuth
                            </span>
                        </a>

                        <RadioDropdown
                            title="Project Name"
                            options={projects}
                        />
                    </div>
                    <div class="flex items-center lg:order-2 gap-4">
                        <form action="#" class="hidden lg:block lg:pl-2">
                            <HeaderSearch />
                        </form>
                        <button
                            id="toggleSidebarMobileSearch"
                            type="button"
                            class="p-2 text-gray-500 rounded-lg lg:hidden hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        >
                            <span class="sr-only">Search</span>
                            <svg
                                class="w-4 h-4"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                />
                            </svg>
                        </button>
                        <button
                            type="button"
                            data-dropdown-toggle="notification-dropdown"
                            class="p-2 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                        >
                            <span class="sr-only">View notifications</span>
                            <svg
                                class="w-5 h-5"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 14 20"
                            >
                                <path d="M12.133 10.632v-1.8A5.406 5.406 0 0 0 7.979 3.57.946.946 0 0 0 8 3.464V1.1a1 1 0 0 0-2 0v2.364a.946.946 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C1.867 13.018 0 13.614 0 14.807 0 15.4 0 16 .538 16h12.924C14 16 14 15.4 14 14.807c0-1.193-1.867-1.789-1.867-4.175ZM3.823 17a3.453 3.453 0 0 0 6.354 0H3.823Z" />
                            </svg>
                        </button>
                        <div
                            class="hidden overflow-hidden z-50 my-4 max-w-sm text-base list-none bg-white rounded divide-y divide-gray-100 shadow-lg dark:divide-gray-600 dark:bg-gray-700"
                            id="notification-dropdown"
                        >
                            <div class="block py-2 px-4 text-base font-medium text-center text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                Notifications
                            </div>
                            <div>
                                <a
                                    href="#"
                                    class="flex py-3 px-4 border-b hover:bg-gray-100 dark:hover:bg-gray-600 dark:border-gray-600"
                                >
                                    <div class="flex-shrink-0">
                                        <img
                                            class="w-11 h-11 rounded-full"
                                            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png"
                                            alt="Bonnie Green avatar"
                                        />
                                        <div class="flex absolute justify-center items-center ml-6 -mt-5 w-5 h-5 rounded-full border border-white bg-primary-700 dark:border-gray-700">
                                            <svg
                                                class="w-2 h-2 text-white"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="currentColor"
                                                viewBox="0 0 18 18"
                                            >
                                                <path d="M15.977.783A1 1 0 0 0 15 0H3a1 1 0 0 0-.977.783L.2 9h4.239a2.99 2.99 0 0 1 2.742 1.8 1.977 1.977 0 0 0 3.638 0A2.99 2.99 0 0 1 13.561 9H17.8L15.977.783ZM6 2h6a1 1 0 1 1 0 2H6a1 1 0 0 1 0-2Zm7 5H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Z" />
                                                <path d="M1 18h16a1 1 0 0 0 1-1v-6h-4.439a.99.99 0 0 0-.908.6 3.978 3.978 0 0 1-7.306 0 .99.99 0 0 0-.908-.6H0v6a1 1 0 0 0 1 1Z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div class="pl-3 w-full">
                                        <div class="text-gray-500 font-normal text-sm mb-1.5 dark:text-gray-400">
                                            New message from{' '}
                                            <span class="font-semibold text-gray-900 dark:text-white">
                                                Bonnie Green
                                            </span>
                                            : "Hey, what's up? All set for the
                                            presentation?"
                                        </div>
                                        <div class="text-xs font-medium text-primary-700 dark:text-primary-400">
                                            a few moments ago
                                        </div>
                                    </div>
                                </a>
                                <a
                                    href="#"
                                    class="flex py-3 px-4 border-b hover:bg-gray-100 dark:hover:bg-gray-600 dark:border-gray-600"
                                >
                                    <div class="flex-shrink-0">
                                        <img
                                            class="w-11 h-11 rounded-full"
                                            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png"
                                            alt="Jese Leos avatar"
                                        />
                                        <div class="flex absolute justify-center items-center ml-6 -mt-5 w-5 h-5 bg-gray-900 rounded-full border border-white dark:border-gray-700">
                                            <svg
                                                class="w-2 h-2 text-white"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="currentColor"
                                                viewBox="0 0 20 18"
                                            >
                                                <path d="M6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Zm11-3h-2V5a1 1 0 0 0-2 0v2h-2a1 1 0 1 0 0 2h2v2a1 1 0 0 0 2 0V9h2a1 1 0 1 0 0-2Z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div class="pl-3 w-full">
                                        <div class="text-gray-500 font-normal text-sm mb-1.5 dark:text-gray-400">
                                            <span class="font-semibold text-gray-900 dark:text-white">
                                                Jese leos
                                            </span>{' '}
                                            and{' '}
                                            <span class="font-medium text-gray-900 dark:text-white">
                                                5 others
                                            </span>{' '}
                                            started following you.
                                        </div>
                                        <div class="text-xs font-medium text-primary-700 dark:text-primary-400">
                                            10 minutes ago
                                        </div>
                                    </div>
                                </a>
                                <a
                                    href="#"
                                    class="flex py-3 px-4 border-b hover:bg-gray-100 dark:hover:bg-gray-600 dark:border-gray-600"
                                >
                                    <div class="flex-shrink-0">
                                        <img
                                            class="w-11 h-11 rounded-full"
                                            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/joseph-mcfall.png"
                                            alt="Joseph McFall avatar"
                                        />
                                        <div class="flex absolute justify-center items-center ml-6 -mt-5 w-5 h-5 bg-red-600 rounded-full border border-white dark:border-gray-700">
                                            <svg
                                                class="w-2 h-2 text-white"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="currentColor"
                                                viewBox="0 0 20 18"
                                            >
                                                {' '}
                                                <path d="M17.947 2.053a5.209 5.209 0 0 0-3.793-1.53A6.414 6.414 0 0 0 10 2.311 6.482 6.482 0 0 0 5.824.5a5.2 5.2 0 0 0-3.8 1.521c-1.915 1.916-2.315 5.392.625 8.333l7 7a.5.5 0 0 0 .708 0l7-7a6.6 6.6 0 0 0 2.123-4.508 5.179 5.179 0 0 0-1.533-3.793Z" />{' '}
                                            </svg>
                                        </div>
                                    </div>
                                    <div class="pl-3 w-full">
                                        <div class="text-gray-500 font-normal text-sm mb-1.5 dark:text-gray-400">
                                            <span class="font-semibold text-gray-900 dark:text-white">
                                                Joseph Mcfall
                                            </span>{' '}
                                            and{' '}
                                            <span class="font-medium text-gray-900 dark:text-white">
                                                141 others
                                            </span>{' '}
                                            love your story. See it and view
                                            more stories.
                                        </div>
                                        <div class="text-xs font-medium text-primary-700 dark:text-primary-400">
                                            44 minutes ago
                                        </div>
                                    </div>
                                </a>
                                <a
                                    href="#"
                                    class="flex py-3 px-4 border-b hover:bg-gray-100 dark:hover:bg-gray-600 dark:border-gray-600"
                                >
                                    <div class="flex-shrink-0">
                                        <img
                                            class="w-11 h-11 rounded-full"
                                            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/roberta-casas.png"
                                            alt="Roberta Casas image"
                                        />
                                        <div class="flex absolute justify-center items-center ml-6 -mt-5 w-5 h-5 bg-green-400 rounded-full border border-white dark:border-gray-700">
                                            <svg
                                                class="w-2 h-2 text-white"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="currentColor"
                                                viewBox="0 0 20 18"
                                            >
                                                <path d="M18 0H2a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h2v4a1 1 0 0 0 1.707.707L10.414 13H18a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5 4h2a1 1 0 1 1 0 2h-2a1 1 0 1 1 0-2ZM5 4h5a1 1 0 1 1 0 2H5a1 1 0 0 1 0-2Zm2 5H5a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Zm9 0h-6a1 1 0 0 1 0-2h6a1 1 0 1 1 0 2Z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div class="pl-3 w-full">
                                        <div class="text-gray-500 font-normal text-sm mb-1.5 dark:text-gray-400">
                                            <span class="font-semibold text-gray-900 dark:text-white">
                                                Leslie Livingston
                                            </span>{' '}
                                            mentioned you in a comment:{' '}
                                            <span class="font-medium text-primary-700 dark:text-primary-500">
                                                @bonnie.green
                                            </span>{' '}
                                            what do you say?
                                        </div>
                                        <div class="text-xs font-medium text-primary-700 dark:text-primary-400">
                                            1 hour ago
                                        </div>
                                    </div>
                                </a>
                                <a
                                    href="#"
                                    class="flex py-3 px-4 hover:bg-gray-100 dark:hover:bg-gray-600"
                                >
                                    <NotificationImage
                                        src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/robert-brown.png"
                                        alt="Robert image"
                                    >
                                        <NotificationIcon>
                                            <Video
                                                class="w-2 h-2 text-white"
                                                fill="currentColor"
                                            />
                                        </NotificationIcon>
                                    </NotificationImage>
                                    <NotificationContent>
                                        <div class="text-gray-500 font-normal text-sm mb-1.5 dark:text-gray-400">
                                            <span class="font-semibold text-gray-900 dark:text-white">
                                                Robert Brown
                                            </span>{' '}
                                            posted a new video: Glassmorphism -
                                            learn how to implement the new
                                            design trend.
                                        </div>
                                        <NotificationTime>
                                            3 hours ago
                                        </NotificationTime>
                                    </NotificationContent>
                                </a>
                            </div>
                            <a
                                href="#"
                                class="block py-2 text-base font-medium text-center text-gray-900 bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:text-white dark:hover:underline"
                            >
                                <div class="inline-flex items-center ">
                                    <svg
                                        aria-hidden="true"
                                        class="mr-2 w-5 h-5"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
                                        <path
                                            fill-rule="evenodd"
                                            d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                                            clip-rule="evenodd"
                                        ></path>
                                    </svg>
                                    View all
                                </div>
                            </a>
                        </div>
                        <DropdownTrigger
                            variant="dark"
                            class="md:mr-0 text-sm p-1 bg-gray-800"
                            pill
                            id="user-menu-button"
                            for="dropdown"
                        >
                            <span class="sr-only">Open user menu</span>
                            <img
                                class="w-8 h-8 rounded-full"
                                src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                                alt="user photo"
                            />
                        </DropdownTrigger>
                        <Dropdown
                            id="dropdown"
                            class="w-56 my-4 list-none text-base bg-white"
                        >
                            <DropdownLabel>
                                <span class="block font-semibold">
                                    Neil sims
                                </span>
                                <span class="block text-sm text-gray-500 truncate dark:text-gray-400">
                                    name@flowbite.com
                                </span>
                            </DropdownLabel>
                            <Separator class="mb-2" />
                            <DropdownContent
                                class="my-2"
                                aria-labelledby="dropdown"
                            >
                                <DropdownItem>
                                    <A href="/profile">My Profile</A>
                                </DropdownItem>
                                <DropdownItem>
                                    <A href="/settings">Account Settings</A>
                                </DropdownItem>
                                <Separator class="my-2" />
                                <DropdownItem>
                                    <form action={signOut.with("local")} method='post'>
                                        <Button variant="link" type="submit">Sing Out</Button>
                                    </form>
                                </DropdownItem>
                            </DropdownContent>
                        </Dropdown>
                    </div>
                </div>
            </nav>
        </header>
    )
}
