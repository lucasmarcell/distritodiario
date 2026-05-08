import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

const COOKIE_CONSENT_KEY = 'dd_cookie_consent';

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      // Pequeno delay para não aparecer imediatamente
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted');
    setIsVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'rejected');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-fade-in">
      <div className="container">
        <div className="bg-foreground text-background rounded-lg shadow-2xl p-6 md:flex md:items-center md:justify-between gap-6">
          <div className="flex-1 mb-4 md:mb-0">
            <p className="text-sm leading-relaxed">
              Utilizamos cookies e tecnologias semelhantes para melhorar sua experiência, 
              analisar o tráfego do site e personalizar conteúdo. Ao continuar navegando, 
              você concorda com nossa{' '}
              <Link 
                to="/politica-de-privacidade" 
                className="text-primary hover:underline font-medium"
              >
                Política de Privacidade
              </Link>
              {' '}e{' '}
              <Link 
                to="/termos-de-uso" 
                className="text-primary hover:underline font-medium"
              >
                Termos de Uso
              </Link>
              , em conformidade com a LGPD.
            </p>
          </div>
          
          <div className="flex items-center gap-3 flex-shrink-0">
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleReject}
              className="border-background/30 text-background hover:bg-background/10 hover:text-background"
            >
              Rejeitar
            </Button>
            <Button 
              size="sm"
              onClick={handleAccept}
              className="bg-primary hover:bg-primary/90"
            >
              Aceitar cookies
            </Button>
            <button
              onClick={handleReject}
              className="p-1 text-background/50 hover:text-background transition-colors md:hidden"
              aria-label="Fechar"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}