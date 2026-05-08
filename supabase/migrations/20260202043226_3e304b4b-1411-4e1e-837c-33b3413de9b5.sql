-- Create team_members table for editorial team management
CREATE TABLE public.team_members (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    position TEXT NOT NULL, -- e.g., 'editor-chefe', 'jornalista'
    editorial_section TEXT, -- e.g., 'noticias', 'cultura'
    bio TEXT,
    photo_url TEXT,
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;

-- Public can view active team members
CREATE POLICY "Active team members are viewable by everyone"
ON public.team_members
FOR SELECT
USING (is_active = true);

-- Admins can manage all team members
CREATE POLICY "Admins can manage team members"
ON public.team_members
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Create site_settings table for admin to manage site-wide settings
CREATE TABLE public.site_settings (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    key TEXT NOT NULL UNIQUE,
    value TEXT NOT NULL,
    description TEXT,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_by UUID REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Public can view site settings
CREATE POLICY "Site settings are viewable by everyone"
ON public.site_settings
FOR SELECT
USING (true);

-- Admins can manage site settings
CREATE POLICY "Admins can manage site settings"
ON public.site_settings
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Create trigger for team_members updated_at
CREATE TRIGGER update_team_members_updated_at
BEFORE UPDATE ON public.team_members
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create trigger for site_settings updated_at
CREATE TRIGGER update_site_settings_updated_at
BEFORE UPDATE ON public.site_settings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default site settings
INSERT INTO public.site_settings (key, value, description) VALUES
('instagram_url', 'https://www.instagram.com/distritodiario/', 'Link do Instagram'),
('tiktok_url', 'https://tiktok.com/@distritodiario', 'Link do TikTok'),
('twitter_url', 'https://twitter.com/distrito_diario', 'Link do X (Twitter)'),
('facebook_url', '', 'Link do Facebook'),
('youtube_url', 'https://www.youtube.com/@distritodiario', 'Link do YouTube'),
('contact_email', 'redacaodistritodiario@gmail.com', 'E-mail de contato'),
('site_name', 'Distrito Diário', 'Nome do site'),
('site_tagline', 'Direto da capital do país', 'Slogan do site');

-- Insert initial team member (Editor Chefe)
INSERT INTO public.team_members (name, role, position, editorial_section, bio, display_order) VALUES
('Viniciús Ramos', 'Editor-Chefe', 'editor-chefe', NULL, 'Fundador e Editor-Chefe do Distrito Diário.', 1);