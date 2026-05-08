-- Fix the permissive INSERT policy for auth_audit_log
-- Drop the permissive policy
DROP POLICY IF EXISTS "System can insert audit logs" ON public.auth_audit_log;

-- Create a more restrictive policy that only allows authenticated users or service role
CREATE POLICY "Authenticated users can insert their own audit logs"
ON public.auth_audit_log
FOR INSERT
WITH CHECK (auth.uid() IS NOT NULL AND (user_id = auth.uid() OR user_id IS NULL));