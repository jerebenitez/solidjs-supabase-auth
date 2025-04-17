import { initFlowbite } from 'flowbite'
import { For, onMount } from 'solid-js'
import ChevronsUpDown from 'lucide-solid/icons/chevrons-up-down'
import { DropdownTrigger } from './dropdown/DropdownTrigger'
import { Dropdown } from './dropdown/Dropdown'
import { DropdownContent } from './dropdown/DropdownContent'

export type DropdownOptions = {
    id: number | string | string[]
    title: string
    description?: string
    checked?: boolean
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
            <DropdownTrigger
                variant="secondary"
                for="dropdownRadioHelper"
                id="dropdownRadioHelperButton"
                class="inline-flex items-center gap-2"
                type="button"
            >
                {props.title}
                <ChevronsUpDown />
            </DropdownTrigger>
            <Dropdown class="w-60" id="dropdownRadioHelper">
                <DropdownContent
                    class="p-3 space-y-1"
                    aria-labelledby="dropdownRadioHelperButton"
                >
                    <For each={props.options}>
                        {(option, idx) => (
                            <li>
                                <div class="flex p-2 rounded-sm hover:bg-gray-100 dark:hover:bg-gray-600">
                                    <div class="flex items-center h-5">
                                        <input
                                            id={`helper-radio-${idx()}`}
                                            name="helper-radio"
                                            type="radio"
                                            value={option.id}
                                            checked={option.checked}
                                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                        />
                                    </div>
                                    <div class="ms-2 text-sm">
                                        <label
                                            for={`helper-radio-${idx()}`}
                                            class="font-medium text-gray-900 dark:text-gray-300"
                                        >
                                            <div>{option.title}</div>
                                            {option.description && (
                                                <p
                                                    id={`helper-radio-${idx()}`}
                                                    class="text-xs font-normal text-gray-500 dark:text-gray-300"
                                                >
                                                    {option.description}
                                                </p>
                                            )}
                                        </label>
                                    </div>
                                </div>
                            </li>
                        )}
                    </For>
                </DropdownContent>
            </Dropdown>
        </>
    )
}
