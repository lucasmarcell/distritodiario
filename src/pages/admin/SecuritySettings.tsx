import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useMFA } from '@/hooks/useMFA';
import { TwoFactorSetup } from '@/components/auth/TwoFactorSetup';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Shield, ShieldCheck, ShieldOff, Loader2, Lock, AlertTriangle } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

export default function SecuritySettings() {
  const { user, isAdmin } = useAuth();
  const { isEnabled, isVerified, loading, checkMFAStatus, disableMFA } = useMFA();
  const [showSetup, setShowSetup] = useState(false);
  const [disabling, setDisabling] = useState(false);
  const { toast } = useToast();

  const handleDisableMFA = async () => {
    setDisabling(true);
    const { error } = await disableMFA();
    
    if (error) {
      toast({
        title: 'Erro',
        description: 'Não foi possível desativar o 2FA.',
        variant: 'destructive',
      });
    } else {
      toast({
        title: '2FA Desativado',
        description: 'A autenticação de dois fatores foi desativada.',
      });
    }
    setDisabling(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="headline-lg mb-2">Configurações de Segurança</h1>
        <p className="text-muted-foreground">
          Gerencie a segurança da sua conta
        </p>
      </div>

      {/* 2FA Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {isEnabled ? (
                <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                  <ShieldCheck className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
              ) : (
                <div className="h-10 w-10 rounded-full bg-yellow-100 dark:bg-yellow-900/20 flex items-center justify-center">
                  <ShieldOff className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                </div>
              )}
              <div>
                <CardTitle>Autenticação de Dois Fatores (2FA)</CardTitle>
                <CardDescription>
                  {isEnabled 
                    ? 'Sua conta está protegida com 2FA'
                    : 'Adicione uma camada extra de segurança'}
                </CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {isEnabled ? (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                  Ativo
                </span>
              ) : (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400">
                  Desativado
                </span>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted/50 p-4 rounded-lg">
            <h4 className="font-medium mb-2 flex items-center gap-2">
              <Lock className="h-4 w-4" />
              Por que usar 2FA?
            </h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Protege sua conta mesmo se a senha for comprometida</li>
              <li>• Recomendado para contas com acesso editorial</li>
              <li>• Padrão de segurança utilizado por grandes portais de notícias</li>
            </ul>
          </div>

          {!isEnabled ? (
            <Button onClick={() => setShowSetup(true)} className="w-full sm:w-auto">
              <Shield className="mr-2 h-4 w-4" />
              Configurar 2FA
            </Button>
          ) : (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" className="w-full sm:w-auto text-destructive hover:text-destructive">
                  <ShieldOff className="mr-2 h-4 w-4" />
                  Desativar 2FA
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-destructive" />
                    Desativar Autenticação de Dois Fatores?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Isso removerá a camada extra de segurança da sua conta.
                    Sua conta ficará mais vulnerável a acessos não autorizados.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDisableMFA}
                    disabled={disabling}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    {disabling ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Desativando...
                      </>
                    ) : (
                      'Desativar'
                    )}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </CardContent>
      </Card>

      {/* Security Tips Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-yellow-500" />
            Dicas de Segurança
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-3">
              <span className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-xs font-medium text-primary">1</span>
              <span>Use uma senha forte com pelo menos 12 caracteres, incluindo letras, números e símbolos.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-xs font-medium text-primary">2</span>
              <span>Nunca compartilhe suas credenciais de acesso com terceiros.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-xs font-medium text-primary">3</span>
              <span>Sempre faça logout ao usar computadores públicos ou compartilhados.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-xs font-medium text-primary">4</span>
              <span>Mantenha seu aplicativo autenticador em um dispositivo seguro.</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Account Info Card - Admin Only */}
      {isAdmin && (
        <Card>
          <CardHeader>
            <CardTitle>Informações da Conta</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Email:</dt>
                <dd className="font-medium">{user?.email}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Último login:</dt>
                <dd className="font-medium">
                  {user?.last_sign_in_at 
                    ? new Date(user.last_sign_in_at).toLocaleString('pt-BR')
                    : '-'}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Status do 2FA:</dt>
                <dd className="font-medium">
                  {isEnabled ? (
                    <span className="text-green-600 dark:text-green-400">Ativo</span>
                  ) : (
                    <span className="text-yellow-600 dark:text-yellow-400">Não configurado</span>
                  )}
                </dd>
              </div>
            </dl>
          </CardContent>
        </Card>
      )}

      <TwoFactorSetup
        open={showSetup}
        onOpenChange={setShowSetup}
        onSuccess={checkMFAStatus}
      />
    </div>
  );
}
