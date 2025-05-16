import { createSignal, For, Show } from "solid-js";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import { Card, CardContent } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { formatDate } from "~/lib/utils";

export function ActiveSessionsSection() {
    // TODO: replace this with supabase
    const [sessions, setSessions] = createSignal([
        {
            id: "1a2b3c4d",
            device: "Chrome - Windows",
            location: "Madrid, Spain",
            ip: "192.168.1.1",
            lastActive: "2025-05-15T10:30:00",
            current: true
        },
        {
            id: "2c3d4e5f",
            device: "Safari - MacOS",
            location: "Barcelona, Spain",
            ip: "172.16.254.1",
            lastActive: "2025-05-14T18:45:00",
            current: false
        },
        {
            id: "3e4f5g6h",
            device: "Firefox - Ubuntu",
            location: "Valencia, Spain",
            ip: "10.0.0.1",
            lastActive: "2025-05-12T09:15:00",
            current: false
        },
        {
            id: "4g5h6i7j",
            device: "Mobile - iOS",
            location: "Seville, Spain",
            ip: "172.20.10.2",
            lastActive: "2025-05-10T22:20:00",
            current: false
        }
    ]);

    const handleCloseSession = (sessionId: string) => {
        console.log(`Closing session: ${sessionId}`);
        // TODO: use supabase
        // Ejemplo: await supabase.auth.admin.signOut({ sessionId });

        setSessions(sessions().filter(session => session.id !== sessionId));
    };

    return (
        <section>
            <h1 class="text-2xl font-bold">Active Sessions</h1>
            <Separator class="mt-2 mb-6" />

            <div class="space-y-4">
                <p class="text-muted-foreground">These are the devices currently signed in to your account. You can sign out any session that you don't recognize.</p>
                
                <div class="grid gap-4">
                    <For each={sessions()}>
                        {(session) => (
                            <Card>
                                <CardContent class="p-4">
                                    <div class="flex justify-between items-center">
                                        <div class="space-y-2">
                                            <div class="md:flex md:items-center md:gap-2">
                                                <h3 class="font-medium">{session.device}</h3>
                                                {session.current && <Badge>Current</Badge>}
                                            </div>
                                            <div class="text-sm text-gray-500 space-y-1">
                                                <p>IP: {session.ip} • {session.location}</p>
                                                <p>Last active: {formatDate(session.lastActive)}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <Show when={!session.current}>
                                                <Button 
                                                    variant="destructive" 
                                                    size="sm"
                                                    disabled={session.current}
                                                    onClick={() => handleCloseSession(session.id)}
                                                >
                                                    Sign Out
                                                </Button>
                                            </Show>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </For>
                </div>
            </div>
        </section>
    );
}
