import { createClient } from '~/lib/supabase/server';
import { ProfileSchema, ProfileUpdate } from './schemas';
import { action, revalidate } from '@solidjs/router';

export const getCurrentProfile = async () => {
  'use server';
  
  const supabase = createClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  
  if (error) {
    return { error: error.message };
  } else if (!user) {
    return { error: 'Unable to find user.' }
  }
  
  const { data, error: err } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();
  
  if (err) {
    console.error('Error while getting profile:', err);
    return { error: err.message };
  }
  
  return { profile: data };
};

export const getProfileByUsername = action(async (username: string) => {
  'use server';
  
  const supabase = createClient();
  
  const { data, error: err } = await supabase
    .from('profiles')
    .select('*')
    .eq('username', username)
    .single();
  
  if (err) {
    return { error: err.message };
  }
  
  return { profile: data };
});

export const updateProfile = action(async (profileData: ProfileUpdate) => {
  'use server';
  
  const supabase = createClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  
  if (error) {
    return { error: error.message };
  } else if (!user) {
    return { error: 'Unable to find user.' }
  }
  
  const result = ProfileSchema.partial().safeParse(profileData);
  if (!result.success) {
    return { error: result.error.format() };
  }
  
  const { data, error: err } = await supabase
    .from('profiles')
    .update(profileData)
    .eq('id', user.id)
    .select()
    .single();
  
  if (err) {
    console.error('Error while updating profile:', err);
    return { error: err.message };
  }
  
  await revalidate('profile');
  
  return { profile: data, success: true };
});

export const checkUsernameAvailability = action(async (username: string) => {
  'use server';
  
  if (!username || username.length < 3) {
    return { available: false, reason: 'Username must be at least 3 characters long.' };
  }
  
  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    return { available: false, reason: 'Username can only contain letters, numbers, and underscores.' };
  }
  
  const supabase = createClient();
  
  const { data, error: err } = await supabase
    .from('profiles')
    .select('username')
    .eq('username', username)
    .maybeSingle();
  
  if (err) {
    console.error('Error while checking username availability: ', err);
    return { error: err.message };
  }
  
  return { 
    available: !data,
    reason: data ? 'Username taken.' : null
  };
});

export const uploadAvatar = action(async (file: File) => {
  'use server';
  
  if (!file) {
    return { error: 'No file was chosen.' };
  }
  
  if (!file.type.startsWith('image/')) {
    return { error: 'File must be an image.' };
  }
  
  if (file.size > 2 * 1024 * 1024) {
    return { error: 'Image cannot be bigger than 2M' };
  }
  
  const supabase = createClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  
  if (error) {
    return { error: error.message };
  } else if (!user) {
    return { error: 'Unable to find user.' }
  }
  
  const fileExt = file.name.split('.').pop();
  const fileName = `${user.id}.${fileExt}`;
  const filePath = `avatars/${fileName}`;
  
  const { error: uploadError } = await supabase.storage
    .from('profiles')
    .upload(filePath, file);
  
  if (uploadError) {
    console.error('Error while updating avatar: ', uploadError);
    return { error: uploadError.message };
  }
  
  const { data: { publicUrl } } = supabase.storage
    .from('profiles')
    .getPublicUrl(filePath);
  
  const { error: updateError } = await supabase
    .from('profiles')
    .update({ avatar_url: publicUrl })
    .eq('id', user.id);
  
  if (updateError) {
    console.error('Error while updating avatar_url:', updateError);
    return { error: updateError.message };
  }
  
  await revalidate('profile');
  return { avatarUrl: publicUrl, success: true };
});
