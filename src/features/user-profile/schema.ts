import { z } from 'zod';

const urlImageRegex = /^(https?:\/\/.*\.(jpeg|jpg|gif|png|webp)|data:image\/(jpeg|jpg|gif|png|webp);base64,.*)$/i;

export const ProfileSchema = z.object({
  id: z.string().uuid().optional(),
  
  username: z.string()
    .min(3, 'Username must be at least 3 characters.')
    .max(30, 'Username cannot be longer than 30 characters.')
    .regex(/^[a-zA-Z0-9_]+$/, 'Only letters, numbers, and _ are allowed.'),
  
  full_name: z.string().min(2, 'Full name must be at least 2 characters.').max(100).optional(),
  bio: z.string().max(500, 'Bio cannot be longer than 500 characters.').optional().nullable(),
  website: z.string().url('Invalid URL.').max(100).optional().nullable(),
  avatar_url: z.string().regex(urlImageRegex, 'Invalid image URL.').optional().nullable(),
  birth_date: z.coerce.date().optional().nullable(),
  
  metadata: z.record(z.unknown()).optional().nullable(),
  
  created_at: z.date().optional(),
  updated_at: z.date().optional(),
});
export type Profile = z.infer<typeof ProfileSchema>;

export const ProfileUpdateSchema = ProfileSchema.partial().omit({ 
  id: true, 
  created_at: true, 
  updated_at: true 
});

export type ProfileUpdate = z.infer<typeof ProfileUpdateSchema>;

export const ProfileCreateSchema = ProfileSchema
  .omit({ id: true, created_at: true, updated_at: true })
  .required({ username: true });

export type ProfileCreate = z.infer<typeof ProfileCreateSchema>;
