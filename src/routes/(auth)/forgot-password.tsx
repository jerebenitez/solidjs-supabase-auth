import { A } from "@solidjs/router";
import { Button } from "~/components/ui/Button";
import { Card, CardDescription, CardHeader, CardTitle } from "~/components/ui/Card";

export default function ForgotPassword() {
    return (
        <Card>
        <CardHeader>
        <CardTitle>Forgot your password?</CardTitle>
        <CardDescription>Enter your mail below and click 'Recover password'. If your mail address is registered in the system, a recovery mail will be sent to it.</CardDescription>
        </CardHeader>
        <form class="space-y-6" action="#">
        <div>
            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
            <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required />
        </div>
        <Button type="submit" class="w-full">Recover password</Button>
        <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
            Don't have an account? <A href="/signup" class="text-blue-700 hover:underline dark:text-blue-500">Create one.</A>
        </div>
    </form>
        </Card>
    )
}
