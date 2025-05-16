import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs'
import { ActiveSessionsSection, ChangePasswordSection, DeleteAccountSection, SubscriptionSection } from '~/features/settings/sections'

export default function SettingsPage() {
    return (
        <main class="container mt-4 flex flex-col gap-4">
            <h1 class="text-3xl font-bold">Settings</h1>
            <Tabs defaultValue="account">
                <TabsList class="mb-4">
                    <TabsTrigger value="account">Account</TabsTrigger>
                    <TabsTrigger value="billing">Billing</TabsTrigger>
                    <TabsTrigger value="sessions">Sessions</TabsTrigger>
                </TabsList>
                <TabsContent value="account" class="w-full flex flex-col gap-6 justify-center">
                    <ChangePasswordSection />
                    <DeleteAccountSection />
                </TabsContent>
                <TabsContent value="billing">
                    <SubscriptionSection />
                </TabsContent>
                <TabsContent value="sessions">
                    <ActiveSessionsSection />
                </TabsContent>
            </Tabs>
        </main>
    )
}
