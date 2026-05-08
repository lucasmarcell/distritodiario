-- Create audit log table for security monitoring
CREATE TABLE public.auth_audit_log (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
    event_type text NOT NULL,
    ip_address text,
    user_agent text,
    metadata jsonb DEFAULT '{}',
    created_at timestamp with time zone DEFAULT now() NOT NULL
);

-- Enable RLS
ALTER TABLE public.auth_audit_log ENABLE ROW LEVEL SECURITY;

-- Only admins can view audit logs
CREATE POLICY "Admins can view audit logs"
ON public.auth_audit_log
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

-- System can insert audit logs (via service role)
CREATE POLICY "System can insert audit logs"
ON public.auth_audit_log
FOR INSERT
WITH CHECK (true);

-- Create index for efficient querying
CREATE INDEX idx_auth_audit_log_user_id ON public.auth_audit_log(user_id);
CREATE INDEX idx_auth_audit_log_event_type ON public.auth_audit_log(event_type);
CREATE INDEX idx_auth_audit_log_created_at ON public.auth_audit_log(created_at DESC);

-- Add mfa_enabled column to track 2FA status per user
ALTER TABLE public.profiles ADD COLUMN mfa_enabled boolean DEFAULT false;