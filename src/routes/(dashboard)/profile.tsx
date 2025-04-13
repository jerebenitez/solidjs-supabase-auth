import Phone from 'lucide-solid/icons/phone'
import { Button } from '~/components/ui/Button'
import { Input } from '~/components/ui/Input'
import { Label } from '~/components/ui/Label'

export default function ProfilePage() {
    return (
        <form>
            <div class="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                    <Label for="first_name">First name</Label>
                    <Input
                        type="text"
                        id="first_name"
                        placeholder="John"
                        required
                    />
                </div>
                <div>
                    <Label for="last_name">Last name</Label>
                    <Input
                        type="text"
                        id="last_name"
                        placeholder="Doe"
                        required
                    />
                </div>
                <div>
                    <Label for="company">Company</Label>
                    <Input
                        type="text"
                        id="company"
                        placeholder="Flowbite"
                        required
                    />
                </div>
                <div>
                    <Label for="phone">Phone number</Label>
                    <Input
                        type="tel"
                        id="phone"
                        placeholder="123-45-678"
                        pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                        required
                        icon={Phone}
                    />
                </div>
                <div>
                    <Label for="website">Website URL</Label>
                    <Input
                        type="url"
                        id="website"
                        placeholder="flowbite.com"
                        required
                    />
                </div>
                <div>
                    <Label for="visitors">Unique visitors (per month)</Label>
                    <Input
                        type="number"
                        id="visitors"
                        placeholder=""
                        required
                    />
                </div>
            </div>
            <div class="mb-6">
                <Label for="email">Email address</Label>
                <Input
                    type="email"
                    id="email"
                    placeholder="john.doe@company.com"
                    required
                />
            </div>
            <div class="mb-6">
                <Label for="password">Password</Label>
                <Input
                    type="password"
                    id="password"
                    placeholder="•••••••••"
                    required
                />
            </div>
            <div class="mb-6">
                <Label for="confirm_password">Confirm password</Label>
                <Input
                    type="password"
                    id="confirm_password"
                    placeholder="•••••••••"
                    required
                />
            </div>
            <div class="flex items-start gap-2 mb-6">
                <div class="flex items-center h-5">
                    <Input id="remember" type="checkbox" value="" required />
                </div>
                <Label for="remember">
                    I agree with the{' '}
                    <a
                        href="#"
                        class="text-blue-600 hover:underline dark:text-blue-500"
                    >
                        terms and conditions
                    </a>
                    .
                </Label>
            </div>
            <Button type="submit">Submit</Button>
        </form>
    )
}
