import { For } from 'solid-js'
import { Button } from '~/components/ui/button'
import { Separator } from '~/components/ui/separator'

export function SubscriptionSection() {
    const freeFeatures = [
        '5 projects',
        '100MB storage',
        '2 user collaboration',
        'Basic exports',
        'Email support',
    ]

    return (
        <section>
            <h1 class="text-2xl font-bold">Subscription</h1>
            <Separator class="mt-2 mb-6" />
            <div class="flex items-center py-4">
                <div class="space-y-3 w-1/2">
                    <div class="max-w-md mx-auto">
                        <h3 class="text-xl font-bold">Free</h3>
                        <p class="text-muted-foreground">
                            Access to basic features to start using the platform at
                            no cost. Perfect for personal projects or small teams.
                        </p>
                        <Button class="mt-6">Upgrade</Button>
                    </div>
                </div>
                <div class="p-4 w-1/2">
                    <ul class="space-y-2">
                        <For each={freeFeatures}>
                            {(feature) => (
                                <li class="flex items-center">
                                    <div class="mr-2 text-green-500">✓</div>
                                    <span>{feature}</span>
                                </li>
                            )}
                        </For>
                    </ul>
                </div>
            </div>
        </section>
    )
}
