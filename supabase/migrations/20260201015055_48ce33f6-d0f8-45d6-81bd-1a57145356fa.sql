-- Add RESTRICTIVE policies to deny anonymous access to profiles table
CREATE POLICY "Deny anonymous access to profiles" 
ON public.profiles 
AS RESTRICTIVE
FOR SELECT 
TO anon 
USING (false);

-- Add RESTRICTIVE policies to deny anonymous access to user_roles table
CREATE POLICY "Deny anonymous access to user_roles" 
ON public.user_roles 
AS RESTRICTIVE
FOR SELECT 
TO anon 
USING (false);