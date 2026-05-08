-- Fix security issue 1: Restrict email visibility to owner and admins only
DROP POLICY IF EXISTS "Profiles are viewable by authenticated users" ON public.profiles;

-- Create new policy: Users can only view their own profile, admins can view all
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = user_id OR has_role(auth.uid(), 'admin'));

-- Fix security issue 2: Allow users to delete their own profile
CREATE POLICY "Users can delete their own profile" 
ON public.profiles 
FOR DELETE 
USING (auth.uid() = user_id);