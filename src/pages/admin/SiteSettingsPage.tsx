import { useState } from 'react';
import { useSiteSettingsList, useUpdateSiteSetting } from '@/hooks/useSiteSettings';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings, Save, Globe, Mail, Instagram, Youtube, Facebook, LucideIcon } from 'lucide-react';
import { toast } from 'sonner';

// X (Twitter) icon
const XIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

// TikTok icon
const TikTokIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

type IconComponent = LucideIcon | React.FC<{ size?: number }>;

const settingsConfig: Record<string, { label: string; description: string; icon: IconComponent }> = {
  site_name: { label: 'Nome do Site', description: 'Nome principal exibido no site', icon: Globe },
  site_tagline: { label: 'Slogan', description: 'Frase de destaque do site', icon: Globe },
  contact_email: { label: 'E-mail de Contato', description: 'E-mail para receber mensagens', icon: Mail },
  instagram_url: { label: 'Instagram', description: 'Link do perfil no Instagram', icon: Instagram },
  twitter_url: { label: 'X (Twitter)', description: 'Link do perfil no X', icon: XIcon },
  facebook_url: { label: 'Facebook', description: 'Link da página no Facebook', icon: Facebook },
  youtube_url: { label: 'YouTube', description: 'Link do canal no YouTube', icon: Youtube },
  tiktok_url: { label: 'TikTok', description: 'Link do perfil no TikTok', icon: TikTokIcon },
};

export default function SiteSettingsPage() {
  const { data: settings = [], isLoading } = useSiteSettingsList();
  const updateSetting = useUpdateSiteSetting();
  const [editedValues, setEditedValues] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState<string | null>(null);

  const handleChange = (key: string, value: string) => {
    setEditedValues(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = async (key: string) => {
    const newValue = editedValues[key];
    if (newValue === undefined) return;

    setSaving(key);
    try {
      await updateSetting.mutateAsync({ key, value: newValue });
      toast.success('Configuração salva!');
      setEditedValues(prev => {
        const { [key]: _, ...rest } = prev;
        return rest;
      });
    } catch (error) {
      toast.error('Erro ao salvar configuração');
    } finally {
      setSaving(null);
    }
  };

  const getValue = (key: string, currentValue: string) => {
    return editedValues[key] !== undefined ? editedValues[key] : currentValue;
  };

  const hasChanges = (key: string, currentValue: string) => {
    return editedValues[key] !== undefined && editedValues[key] !== currentValue;
  };

  const siteSettings = settings.filter(s => ['site_name', 'site_tagline', 'contact_email'].includes(s.key));
  const socialSettings = settings.filter(s => ['instagram_url', 'twitter_url', 'facebook_url', 'youtube_url', 'tiktok_url'].includes(s.key));

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Settings className="h-6 w-6" />
          <h1 className="text-2xl font-bold font-serif">Configurações do Site</h1>
        </div>
        <Card>
          <CardContent className="p-6">
            <div className="animate-pulse space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="h-4 bg-muted rounded w-1/4" />
                  <div className="h-10 bg-muted rounded" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Settings className="h-6 w-6" />
        <div>
          <h1 className="text-2xl font-bold font-serif">Configurações do Site</h1>
          <p className="text-muted-foreground">Gerencie as informações e redes sociais do Distrito Diário</p>
        </div>
      </div>

      {/* Site Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe size={20} />
            Informações Gerais
          </CardTitle>
          <CardDescription>Nome, slogan e informações de contato do site</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {siteSettings.map(setting => {
            const config = settingsConfig[setting.key];
            if (!config) return null;
            
            return (
              <div key={setting.id} className="space-y-2">
                <Label htmlFor={setting.key} className="flex items-center gap-2">
                  <config.icon size={16} />
                  {config.label}
                </Label>
                <div className="flex gap-2">
                  <Input
                    id={setting.key}
                    value={getValue(setting.key, setting.value)}
                    onChange={(e) => handleChange(setting.key, e.target.value)}
                    placeholder={config.description}
                  />
                  {hasChanges(setting.key, setting.value) && (
                    <Button
                      onClick={() => handleSave(setting.key)}
                      disabled={saving === setting.key}
                      size="icon"
                    >
                      <Save size={16} />
                    </Button>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">{config.description}</p>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Social Media */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Instagram size={20} />
            Redes Sociais
          </CardTitle>
          <CardDescription>Links das redes sociais exibidos no rodapé do site</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {socialSettings.map(setting => {
            const config = settingsConfig[setting.key];
            if (!config) return null;
            
            return (
              <div key={setting.id} className="space-y-2">
                <Label htmlFor={setting.key} className="flex items-center gap-2">
                  <config.icon size={16} />
                  {config.label}
                </Label>
                <div className="flex gap-2">
                  <Input
                    id={setting.key}
                    type="url"
                    value={getValue(setting.key, setting.value)}
                    onChange={(e) => handleChange(setting.key, e.target.value)}
                    placeholder={`https://...`}
                  />
                  {hasChanges(setting.key, setting.value) && (
                    <Button
                      onClick={() => handleSave(setting.key)}
                      disabled={saving === setting.key}
                      size="icon"
                    >
                      <Save size={16} />
                    </Button>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">{config.description}</p>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
