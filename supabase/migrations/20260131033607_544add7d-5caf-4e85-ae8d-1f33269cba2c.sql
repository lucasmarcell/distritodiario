-- Fix security issue 1: Prevent anonymous access to profiles table
-- Drop existing SELECT policy and create one that requires authentication
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;

CREATE POLICY "Authenticated users can view their own profile" 
ON public.profiles 
FOR SELECT 
TO authenticated
USING (auth.uid() = user_id OR has_role(auth.uid(), 'admin'));

-- Fix security issue 2: Prevent anonymous access to user_roles table
-- Update existing policies to explicitly require authentication
DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;

CREATE POLICY "Authenticated users can view their own roles" 
ON public.user_roles 
FOR SELECT 
TO authenticated
USING (auth.uid() = user_id);