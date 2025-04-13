import { Button } from "~/components/ui/Button";
import { Input } from "~/components/ui/Input";

export default function ProfilePage() {
    return (
        <>
            <form>
                <div class="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                        <label
                            for="first_name"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            First name
                        </label>
                        <Input
                            type="text"
                            id="first_name"
                            placeholder="John"
                            required
                        />
                    </div>
                    <div>
                        <label
                            for="last_name"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Last name
                        </label>
                        <Input
                            type="text"
                            id="last_name"
                            placeholder="Doe"
                            required
                        />
                    </div>
                    <div>
                        <label
                            for="company"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Company
                        </label>
                        <Input
                            type="text"
                            id="company"
                            placeholder="Flowbite"
                            required
                        />
                    </div>
                    <div>
                        <label
                            for="phone"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Phone number
                        </label>
                        <Input
                            type="tel"
                            id="phone"
                            placeholder="123-45-678"
                            pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                            required
                        />
                    </div>
                    <div>
                        <label
                            for="website"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Website URL
                        </label>
                        <Input
                            type="url"
                            id="website"
                            placeholder="flowbite.com"
                            required
                        />
                    </div>
                    <div>
                        <label
                            for="visitors"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Unique visitors (per month)
                        </label>
                        <Input
                            type="number"
                            id="visitors"
                            placeholder=""
                            required
                        />
                    </div>
                </div>
                <div class="mb-6">
                    <label
                        for="email"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Email address
                    </label>
                    <Input
                        type="email"
                        id="email"
                        placeholder="john.doe@company.com"
                        required
                    />
                </div>
                <div class="mb-6">
                    <label
                        for="password"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Password
                    </label>
                    <Input
                        type="password"
                        id="password"
                        placeholder="•••••••••"
                        required
                    />
                </div>
                <div class="mb-6">
                    <label
                        for="confirm_password"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Confirm password
                    </label>
                    <Input
                        type="password"
                        id="confirm_password"
                        placeholder="•••••••••"
                        required
                    />
                </div>
                <div class="flex items-start mb-6">
                    <div class="flex items-center h-5">
                        <Input
                            id="remember"
                            type="checkbox"
                            value=""
                            required
                        />
                    </div>
                    <label
                        for="remember"
                        class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                        I agree with the{' '}
                        <a
                            href="#"
                            class="text-blue-600 hover:underline dark:text-blue-500"
                        >
                            terms and conditions
                        </a>
                        .
                    </label>
                </div>
                <Button type="submit">Submit</Button>
            </form>
        </>
    )
}
