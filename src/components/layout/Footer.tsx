import { Link } from 'react-router-dom';
import { Instagram, Mail, Facebook, Youtube } from 'lucide-react';
import { useSiteSettings } from '@/hooks/useSiteSettings';

// X (Twitter) icon component
const XIcon = ({ size = 24 }: { size?: number }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

// TikTok icon component
const TikTokIcon = ({ size = 24 }: { size?: number }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

export function Footer() {
  const { data: settings } = useSiteSettings();

  const socialLinks = [
    { 
      name: 'Instagram', 
      url: settings?.instagram_url || 'https://www.instagram.com/distritodiario/', 
      icon: Instagram 
    },
    { 
      name: 'X', 
      url: settings?.twitter_url || 'https://twitter.com/distrito_diario', 
      icon: XIcon 
    },
    { 
      name: 'Facebook', 
      url: settings?.facebook_url, 
      icon: Facebook 
    },
    { 
      name: 'YouTube', 
      url: settings?.youtube_url || 'https://www.youtube.com/@distritodiario', 
      icon: Youtube 
    },
    { 
      name: 'TikTok', 
      url: settings?.tiktok_url || 'https://tiktok.com/@distritodiario', 
      icon: TikTokIcon 
    },
  ].filter(link => link.url && link.url.trim() !== '');

  return (
    <footer className="bg-foreground text-background mt-16">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <h2 className="font-serif text-2xl font-bold mb-4 text-primary">
              {settings?.site_name || 'Distrito Diário'}
            </h2>
            <p className="text-background/70 body-sm max-w-md">
              Jornalismo independente com foco em cidade, cultura e comportamento. 
              Produzido com dedicação para leitores que buscam informação de qualidade.
            </p>
            <div className="flex gap-4 mt-4">
              {socialLinks.map((social) => (
                <a 
                  key={social.name}
                  href={social.url}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-background/70 hover:text-primary transition-colors"
                  aria-label={social.name}
                >
                  <social.icon size={24} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-medium mb-4 text-background/90">Navegação</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/noticias" className="text-background/70 hover:text-background transition-colors body-sm">
                  Notícias
                </Link>
              </li>
              <li>
                <Link to="/cultura" className="text-background/70 hover:text-background transition-colors body-sm">
                  Cultura
                </Link>
              </li>
              <li>
                <Link to="/comportamento" className="text-background/70 hover:text-background transition-colors body-sm">
                  Comportamento
                </Link>
              </li>
              <li>
                <Link to="/opiniao" className="text-background/70 hover:text-background transition-colors body-sm">
                  Opinião
                </Link>
              </li>
              <li>
                <Link to="/conteudo-mais" className="text-background/70 hover:text-background transition-colors body-sm">
                  Matéria Patrocinada
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Contact */}
          <div>
            <h3 className="font-medium mb-4 text-background/90">Institucional</h3>
            <ul className="space-y-2 text-background/70 body-sm">
              <li>
                <Link to="/contato" className="hover:text-background transition-colors flex items-center gap-2">
                  <Mail size={14} />
                  Fale com a Redação
                </Link>
              </li>
              <li>
                <Link to="/expediente" className="hover:text-background transition-colors">
                  Expediente
                </Link>
              </li>
              <li>
                <Link to="/sobre" className="hover:text-background transition-colors">
                  Sobre nós
                </Link>
              </li>
              <li>
                <Link to="/politica-de-privacidade" className="hover:text-background transition-colors">
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link to="/termos-de-uso" className="hover:text-background transition-colors">
                  Termos de Uso
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 mt-10 pt-6 text-center">
          <p className="text-background/50 text-sm">
            © {new Date().getFullYear()} {settings?.site_name || 'Distrito Diário'}. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
