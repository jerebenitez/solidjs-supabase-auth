import { initFlowbite } from 'flowbite'
import { onMount } from 'solid-js'

export type DropdownOptions = {
    title: string
    description?: string
}

type DropdownProps = {
    title: string
    icon?: string
    options: DropdownOptions[]
}

export function RadioDropdown(props: DropdownProps) {
    onMount(() => {
        initFlowbite()
    })

    return (
        <>
            <button
                id="dropdownRadioHelperButton"
                data-dropdown-toggle="dropdownRadioHelper"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="button"
            >
                {props.title}
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevrons-up-down-icon lucide-chevrons-up-down"><path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/></svg>
            </button>
            <div
                id="dropdownRadioHelper"
                class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-60 dark:bg-gray-700 dark:divide-gray-600"
            >
                <ul
                    class="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownRadioHelperButton"
                >
                {props.options.map((option, idx) => (
                    <li>
                        <div class="flex p-2 rounded-sm hover:bg-gray-100 dark:hover:bg-gray-600">
                            <div class="flex items-center h-5">
                                <input
                                    id={`helper-radio-${idx}`}
                                    name="helper-radio"
                                    type="radio"
                                    value=""
                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                />
                            </div>
                            <div class="ms-2 text-sm">
                                <label
                                    for={`helper-radio-${idx}`}
                                    class="font-medium text-gray-900 dark:text-gray-300"
                                >
                                    <div>{option.title}</div>
                                    {option.description && (
                                    <p
                                        id={`helper-radio-${idx}`}
                                        class="text-xs font-normal text-gray-500 dark:text-gray-300"
                                    >{option.description}</p>
                                    )}
                                </label>
                            </div>
                        </div>
                    </li>
                ))}
                </ul>
            </div>
        </>
    )
}
