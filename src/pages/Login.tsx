import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Layout } from '@/components/layout/Layout';
import { TwoFactorVerify } from '@/components/auth/TwoFactorVerify';
import { Shield, Loader2 } from 'lucide-react';

// Token secreto para acesso ao login
const ACCESS_TOKEN = 'dd2024';

type LoginStep = 'credentials' | 'mfa';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasAccess, setHasAccess] = useState(false);
  const [step, setStep] = useState<LoginStep>('credentials');
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Se já está logado, verifica MFA
    const checkAuth = async () => {
      if (user) {
        const { data: aalData } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
        const { data: factors } = await supabase.auth.mfa.listFactors();
        
        const hasVerifiedFactor = factors?.totp?.some(f => f.status === 'verified');
        
        if (hasVerifiedFactor && aalData?.currentLevel !== 'aal2') {
          setStep('mfa');
          setHasAccess(true);
        } else {
          navigate('/admin');
        }
        return;
      }

      // Verifica token na URL ou sessionStorage
      const token = searchParams.get('access');
      if (token === ACCESS_TOKEN) {
        sessionStorage.setItem('editor_access', 'true');
        setHasAccess(true);
      } else if (sessionStorage.getItem('editor_access') === 'true') {
        setHasAccess(true);
      } else {
        navigate('/');
      }
    };

    checkAuth();
  }, [searchParams, user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast({
          title: 'Erro ao entrar',
          description: 'Email ou senha incorretos.',
          variant: 'destructive',
        });
        setIsLoading(false);
        return;
      }

      // Log audit event
      await supabase.from('auth_audit_log').insert({
        user_id: data.user?.id,
        event_type: 'login_success',
        metadata: { email },
      });

      // Check if MFA is required
      const { data: aalData } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
      const { data: factors } = await supabase.auth.mfa.listFactors();
      
      const hasVerifiedFactor = factors?.totp?.some(f => f.status === 'verified');

      if (hasVerifiedFactor && aalData?.currentLevel !== 'aal2') {
        setStep('mfa');
        toast({
          title: 'Verificação necessária',
          description: 'Digite o código do seu aplicativo autenticador.',
        });
      } else {
        toast({
          title: 'Bem-vindo!',
          description: 'Login realizado com sucesso.',
        });
        navigate('/admin');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: 'Erro',
        description: 'Ocorreu um erro ao fazer login.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleMFASuccess = () => {
    toast({
      title: 'Bem-vindo!',
      description: 'Login realizado com sucesso.',
    });
    navigate('/admin');
  };

  const handleMFACancel = async () => {
    await supabase.auth.signOut();
    setStep('credentials');
    setEmail('');
    setPassword('');
  };

  // Não renderiza nada enquanto verifica acesso
  if (!hasAccess) {
    return null;
  }

  return (
    <Layout>
      <div className="container max-w-md py-20">
        <div className="bg-card border border-editorial-divider p-8">
          {step === 'credentials' ? (
            <>
              <h1 className="headline-lg text-center mb-8">Área Restrita</h1>
              <p className="text-center text-muted-foreground mb-8">
                Acesso exclusivo para editores e administradores
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu@email.com"
                    required
                    autoComplete="email"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Senha</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    autoComplete="current-password"
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Entrando...
                    </>
                  ) : (
                    'Entrar'
                  )}
                </Button>
              </form>

              <div className="mt-6 pt-6 border-t border-editorial-divider">
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <Shield className="h-4 w-4" />
                  <span>Protegido por autenticação de dois fatores</span>
                </div>
              </div>
            </>
          ) : (
            <TwoFactorVerify onSuccess={handleMFASuccess} onCancel={handleMFACancel} />
          )}
        </div>
      </div>
    </Layout>
  );
}
