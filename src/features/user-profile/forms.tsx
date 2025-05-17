import {
    createForm,
    FormError,
    reset,
    SubmitHandler,
    zodForm,
} from '@modular-forms/solid'
import { ProfileUpdate, ProfileUpdateSchema } from './schemas'
import { Show, createEffect, createResource, createSignal } from 'solid-js'
import { checkUsernameAvailability, getCurrentProfile, updateProfile, uploadAvatar } from './actions'
import { useAction } from '@solidjs/router'
import { Button } from '~/components/ui/button'
import {
    TextField,
    TextFieldErrorMessage,
    TextFieldInput,
    TextFieldLabel,
    TextFieldTextArea,
} from '~/components/ui/text-field'
import { toast } from 'solid-sonner'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { debounce } from '~/lib/utils'

export function ProfileForm() {
    // Get current profile
    const [profile] = createResource(getCurrentProfile)
    
    // Username state
    const [usernameAvailable, setUsernameAvailable] = createSignal(true)
    const [usernameMessage, setUsernameMessage] = createSignal('')
    
    // Avatar image state
    const [avatarUrl, setAvatarUrl] = createSignal('')
    const [isUploading, setIsUploading] = createSignal(false)
    
    // Check username availability (debounced)
    const checkUsername = useAction(checkUsernameAvailability)
    const debouncedCheckUsername = debounce(async (username: string) => {
        if (username === profile()?.profile?.username) {
            setUsernameAvailable(true)
            setUsernameMessage('')
            return
        }
        
        const result = await checkUsername(username)
        if (!result.error && result.available) {
            setUsernameAvailable(result.available)
            setUsernameMessage(result.reason || '')
        } else {
            setUsernameAvailable(false)
            setUsernameMessage(result.error!)
        }
    }, 300)
    
    // Initialize form once profile is loaded
    const [profileForm, { Form, Field }] = createForm<ProfileUpdate>({
        validate: zodForm(ProfileUpdateSchema),
        initialValues: {
            username: '',
            full_name: '',
            bio: '',
            website: '',
        }
    })
    
    // Load profile data into form
    createEffect(() => {
        const profileData = profile()?.profile
        if (profileData) {
            reset(
                profileForm, 
                ["username", "full_name", "bio", "website"], {
                    initialValues: {
                        username: profileData.username || '',
                        full_name: profileData.full_name || '',
                        bio: profileData.bio || '',
                        website: profileData.website || '',
                    }
            })
            setAvatarUrl(profileData.avatar_url || '')
        }
    })
    
    // Manejar subida de avatar
    const upload = useAction(uploadAvatar)
    const handleAvatarUpload = async (event: Event) => {
        const input = event.target as HTMLInputElement
        if (!input.files || input.files.length === 0) return
        
        const file = input.files[0]
        setIsUploading(true)
        
        try {
            const result = await upload(file)
            if (result.error) {
                toast.error('Error al subir imagen', {
                    description: result.error,
                })
            } else if (result.avatarUrl) {
                setAvatarUrl(result.avatarUrl)
                toast.success('Imagen subida correctamente')
            }
        } catch (error) {
            toast.error('Error al subir imagen')
            console.error(error)
        } finally {
            setIsUploading(false)
        }
    }
    
    // Handle profile update
    const update = useAction(updateProfile)
    const handleSubmit: SubmitHandler<any> = async (values, _) => {
        if (!usernameAvailable()) {
            throw new FormError({
                username: usernameMessage(),
            })
        }
        
        try {
            const result = await update(values)
            
            if (result.error) {
                throw new FormError(
                    typeof result.error === 'string' 
                    ? { '': result.error } 
                    : result.error
                )
            }
            
            toast.success('Profile updated successfully')
        } catch (error) {
            console.error(error)
            toast.error('Error updating profile')
        }
    }

    return (
        <Show when={!profile.loading} fallback={<div>Loading profile...</div>}>
            <div class="max-w-2xl mx-auto mt-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Your Profile</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {/* Avatar Upload */}
                        <div class="flex flex-col items-center mb-6">
                            <div class="relative mb-4">
                                <div class="w-24 h-24 rounded-full overflow-hidden bg-gray-200">
                                    <Show when={avatarUrl()} fallback={
                                        <div class="flex items-center justify-center h-full text-gray-400">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                        </div>
                                    }>
                                        <img src={avatarUrl()} alt="Avatar" class="w-full h-full object-cover" />
                                    </Show>
                                </div>
                                <label 
                                    for="avatar-upload" 
                                    class="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-1 cursor-pointer"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </label>
                                <input
                                    id="avatar-upload"
                                    type="file"
                                    accept="image/*"
                                    class="hidden"
                                    onChange={handleAvatarUpload}
                                    disabled={isUploading()}
                                />
                            </div>
                            <Show when={isUploading()}>
                                <div class="text-sm text-muted-foreground">Uploading image...</div>
                            </Show>
                        </div>

                        <Form class="space-y-5" onSubmit={handleSubmit}>
                            {/* Username */}
                            <Field name="username">
                                {(field, props) => (
                                    <TextField
                                        class="gap-1"
                                        validationState={(field.error || !usernameAvailable()) ? 'invalid' : 'valid'}
                                        value={field.value}
                                    >
                                        <TextFieldLabel>Username</TextFieldLabel>
                                        <TextFieldInput
                                            {...props}
                                            type="text"
                                            placeholder="username"
                                            aria-invalid={!!field.error || !usernameAvailable()}
                                            required
                                            onInput={(e) => {
                                                const value = e.currentTarget.value;
                                                if (value.length >= 3) {
                                                    debouncedCheckUsername(value);
                                                }
                                            }}
                                        />
                                        {field.error && (
                                            <TextFieldErrorMessage id={`${field.name}-error`}>
                                                {field.error}
                                            </TextFieldErrorMessage>
                                        )}
                                        {!field.error && !usernameAvailable() && (
                                            <TextFieldErrorMessage id={`${field.name}-availability`}>
                                                {usernameMessage()}
                                            </TextFieldErrorMessage>
                                        )}
                                    </TextField>
                                )}
                            </Field>

                            {/* Full Name */}
                            <Field name="full_name">
                                {(field, props) => (
                                    <TextField
                                        class="gap-1"
                                        validationState={field.error ? 'invalid' : 'valid'}
                                        value={field.value}
                                    >
                                        <TextFieldLabel>Full Name</TextFieldLabel>
                                        <TextFieldInput
                                            {...props}
                                            type="text"
                                            placeholder="Your full name"
                                            aria-invalid={!!field.error}
                                        />
                                        {field.error && (
                                            <TextFieldErrorMessage id={`${field.name}-error`}>
                                                {field.error}
                                            </TextFieldErrorMessage>
                                        )}
                                    </TextField>
                                )}
                            </Field>

                            {/* Bio */}
                            <Field name="bio">
                                {(field, props) => (
                                    <TextField
                                        class="gap-1"
                                        validationState={field.error ? 'invalid' : 'valid'}
                                        value={field.value}
                                    >
                                        <TextFieldLabel>Bio</TextFieldLabel>
                                        <TextFieldTextArea
                                            {...props}
                                            placeholder="Tell us about yourself"
                                            aria-invalid={!!field.error}
                                            rows={3}
                                        />
                                        {field.error && (
                                            <TextFieldErrorMessage id={`${field.name}-error`}>
                                                {field.error}
                                            </TextFieldErrorMessage>
                                        )}
                                    </TextField>
                                )}
                            </Field>

                            {/* Website */}
                            <Field name="website">
                                {(field, props) => (
                                    <TextField
                                        class="gap-1"
                                        validationState={field.error ? 'invalid' : 'valid'}
                                        value={field.value}
                                    >
                                        <TextFieldLabel>Website</TextFieldLabel>
                                        <TextFieldInput
                                            {...props}
                                            type="url"
                                            placeholder="https://yourdomain.com"
                                            aria-invalid={!!field.error}
                                        />
                                        {field.error && (
                                            <TextFieldErrorMessage id={`${field.name}-error`}>
                                                {field.error}
                                            </TextFieldErrorMessage>
                                        )}
                                    </TextField>
                                )}
                            </Field>

                            <span class="text-destructive text-sm font-bold">
                                {profileForm.response.message}
                            </span>
                            
                            <div class="flex justify-end pt-4">
                                <Button
                                    type="submit"
                                    class="w-full md:w-auto"
                                    disabled={profileForm.submitting || isUploading()}
                                >
                                    {profileForm.submitting 
                                        ? 'Saving changes...' 
                                        : 'Save changes'}
                                </Button>
                            </div>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </Show>
    )
}
