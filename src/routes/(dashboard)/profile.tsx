import { ProfileForm } from "~/features/user-profile/forms";

export default function ProfilePage() {
    return (
        <div class="container py-10">
            <h1 class="text-2xl font-bold text-center mb-6">Profile</h1>
            <ProfileForm />
        </div>
    )
}
