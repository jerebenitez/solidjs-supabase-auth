-- Create profiles table
CREATE TABLE public.profiles (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    username VARCHAR(30) UNIQUE NOT NULL,
    full_name VARCHAR(100),
    bio TEXT,
    website VARCHAR(100),
    avatar_url TEXT,
    birth_date DATE,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Column comments
COMMENT ON TABLE public.profiles IS 'Profiles of registered users';
COMMENT ON COLUMN public.profiles.id IS 'References the user ID in auth.users';
COMMENT ON COLUMN public.profiles.username IS 'Unique username';
COMMENT ON COLUMN public.profiles.full_name IS 'User''s full name';
COMMENT ON COLUMN public.profiles.bio IS 'User''s short biography';
COMMENT ON COLUMN public.profiles.website IS 'URL of the user''s website';
COMMENT ON COLUMN public.profiles.avatar_url IS 'URL of the profile image';
COMMENT ON COLUMN public.profiles.birth_date IS 'Date of birth';
COMMENT ON COLUMN public.profiles.metadata IS 'Additional profile metadata in JSON format';

-- Set up RLS (Row Level Security)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create security policies
-- Policy for querying profiles (everyone can view profiles)
CREATE POLICY "Profiles visible to everyone" ON public.profiles
    FOR SELECT USING (true);

-- Policy for inserting profiles (only the user themselves)
CREATE POLICY "Users can insert their own profiles" ON public.profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Policy for updating profiles (only the user themselves)
CREATE POLICY "Users can update their own profiles" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

-- Policy for deleting profiles (only the user themselves)
CREATE POLICY "Users can delete their own profiles" ON public.profiles
    FOR DELETE USING (auth.uid() = id);

-- Create function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_profile_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update the updated_at field
CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION update_profile_updated_at();

-- Function to automatically create a profile when a user registers
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, username)
    VALUES (
        NEW.id,
        'user_' || substr(NEW.id::text, 1, 8)  -- Generate a default username
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new users
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
