import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { User, Lock, Save } from 'lucide-react';

export default function MinhaConta() {
  const { user } = useAuth();
  const { toast } = useToast();

  const [profileForm, setProfileForm] = useState({
    name: user?.user_metadata?.name || '',
    email: user?.email || '',
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingProfile(true);

    try {
      // Atualiza metadados do usuário no Auth
      const { error: authError } = await supabase.auth.updateUser({
        data: { name: profileForm.name },
      });
      if (authError) throw authError;

      // Atualiza perfil na tabela profiles
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ name: profileForm.name })
        .eq('user_id', user?.id);
      if (profileError) throw profileError;

      toast({
        title: 'Perfil atualizado!',
        description: 'Suas informações foram salvas com sucesso.',
      });
    } catch (error) {
      console.error(error);
      toast({
        title: 'Erro ao salvar',
        description: 'Não foi possível atualizar o perfil.',
        variant: 'destructive',
      });
    } finally {
      setSavingProfile(false);
    }
  };

  const handleSavePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (passwordForm.newPassword.length < 6) {
      toast({
        title: 'Senha muito curta',
        description: 'A nova senha deve ter pelo menos 6 caracteres.',
        variant: 'destructive',
      });
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast({
        title: 'Senhas não coincidem',
        description: 'A nova senha e a confirmação precisam ser iguais.',
        variant: 'destructive',
      });
      return;
    }

    setSavingPassword(true);

    try {
      const { error } = await supabase.auth.updateUser({
        password: passwordForm.newPassword,
      });
      if (error) throw error;

      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });

      toast({
        title: 'Senha alterada!',
        description: 'Sua senha foi atualizada com sucesso.',
      });
    } catch (error) {
      console.error(error);
      toast({
        title: 'Erro ao alterar senha',
        description: 'Não foi possível alterar a senha. Tente fazer login novamente.',
        variant: 'destructive',
      });
    } finally {
      setSavingPassword(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold font-serif">Minha Conta</h1>
        <p className="text-muted-foreground">Gerencie suas informações pessoais e senha</p>
      </div>

      {/* AVATAR + INFO */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src={user?.user_metadata?.avatar_url} />
              <AvatarFallback className="text-lg bg-primary text-primary-foreground">
                {getInitials(profileForm.name || user?.email || 'U')}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-lg">{profileForm.name || 'Sem nome'}</p>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* DADOS PESSOAIS */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <User size={18} />
            Dados Pessoais
          </CardTitle>
          <CardDescription>Atualize seu nome de exibição</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome completo</Label>
              <Input
                id="name"
                value={profileForm.name}
                onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                placeholder="Seu nome"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                value={profileForm.email}
                disabled
                className="bg-muted cursor-not-allowed"
              />
              <p className="text-xs text-muted-foreground">
                O e-mail não pode ser alterado por aqui.
              </p>
            </div>
            <Button type="submit" disabled={savingProfile}>
              <Save size={16} className="mr-2" />
              {savingProfile ? 'Salvando...' : 'Salvar Alterações'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* SENHA */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Lock size={18} />
            Alterar Senha
          </CardTitle>
          <CardDescription>Escolha uma senha forte com pelo menos 6 caracteres</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSavePassword} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="newPassword">Nova senha</Label>
              <Input
                id="newPassword"
                type="password"
                value={passwordForm.newPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                placeholder="••••••••"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar nova senha</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={passwordForm.confirmPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                placeholder="••••••••"
              />
            </div>

            {/* Indicador de força da senha */}
            {passwordForm.newPassword && (
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Força da senha:</p>
                <div className="flex gap-1">
                  {[1, 2, 3, 4].map((level) => (
                    <div
                      key={level}
                      className={`h-1.5 flex-1 rounded-full transition-colors ${
                        passwordForm.newPassword.length >= level * 3
                          ? level <= 1 ? 'bg-red-500'
                          : level <= 2 ? 'bg-yellow-500'
                          : level <= 3 ? 'bg-blue-500'
                          : 'bg-green-500'
                          : 'bg-muted'
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}

            <Separator />

            <Button type="submit" disabled={savingPassword}>
              <Lock size={16} className="mr-2" />
              {savingPassword ? 'Alterando...' : 'Alterar Senha'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}