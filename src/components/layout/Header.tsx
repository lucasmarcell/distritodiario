import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useAuth } from '@/contexts/AuthContext';
import logo from '@/assets/logo.png';

const navItems = [
  { label: 'Central', path: '/' },
  { label: 'Distrito Diário', path: '/noticias' },
  { label: 'Cultura', path: '/cultura' },
  { label: 'Comportamento', path: '/comportamento' },
  { label: 'Opinião', path: '/opiniao' },
  { label: 'Agenda', path: '/agenda' },
  { label: 'Conteúdo+', path: '/conteudo-mais' },
  { label: 'Sobre', path: '/sobre' },
];

// Token secreto para acesso ao login - compartilhe este link com editores
const ACCESS_TOKEN = 'dd2024';

function getCurrentDate() {
  return format(new Date(), "EEEE, d 'de' MMMM 'de' yyyy", { locale: ptBR });
}

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasAccessToken, setHasAccessToken] = useState(false);
  const location = useLocation();
  const { user, isEditor } = useAuth();

  // Verifica se o usuário tem o token de acesso na URL ou no sessionStorage
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('access');
    
    if (token === ACCESS_TOKEN) {
      sessionStorage.setItem('editor_access', 'true');
      setHasAccessToken(true);
    } else if (sessionStorage.getItem('editor_access') === 'true') {
      setHasAccessToken(true);
    }
  }, [location]);

  // Mostrar botão de login apenas se: usuário tem token de acesso OU já está logado
  const showLoginButton = hasAccessToken && !user;

  const isActive = (path: string) => location.pathname === path;

  // Capitalize first letter
  const formattedDate = getCurrentDate().charAt(0).toUpperCase() + getCurrentDate().slice(1);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-editorial-divider">
      {/* Top bar with date */}
      <div className="border-b border-editorial-divider">
        <div className="container py-2">
          <p className="caption text-editorial-gray text-center">
            {formattedDate}
          </p>
        </div>
      </div>

      {/* Logo */}
      <div className="border-b border-editorial-divider">
        <div className="container py-4">
          <Link to="/" className="flex flex-col items-center">
            <img 
              src={logo} 
              alt="Distrito Diário" 
              className="h-12 md:h-16 w-auto"
            />
            <p className="text-editorial-gray text-sm mt-2">
              Direto da capital do país
            </p>
          </Link>
        </div>
      </div>

      {/* Navigation */}
      <nav className="container">
        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center justify-center gap-6 py-4">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`text-sm font-medium transition-colors hover-underline-animation ${
                  isActive(item.path)
                    ? 'text-primary'
                    : 'text-foreground hover:text-primary'
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
          {user && isEditor && (
            <li>
              <Link
                to="/admin"
                className={`flex items-center gap-1 text-sm font-medium transition-colors hover-underline-animation ${
                  location.pathname.startsWith('/admin')
                    ? 'text-primary'
                    : 'text-foreground hover:text-primary'
                }`}
              >
                <User size={16} />
                Admin
              </Link>
            </li>
          )}
          {showLoginButton && (
            <li>
              <Link
                to="/login"
                className="text-sm font-medium text-foreground hover:text-primary transition-colors hover-underline-animation"
              >
                Entrar
              </Link>
            </li>
          )}
        </ul>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center justify-end py-3">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-foreground"
            aria-label="Menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-editorial-divider animate-fade-in">
            <ul className="py-4 space-y-4">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block text-lg font-medium ${
                      isActive(item.path)
                        ? 'text-primary'
                        : 'text-foreground'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              {user && isEditor && (
                <li>
                  <Link
                    to="/admin"
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center gap-2 text-lg font-medium ${
                      location.pathname.startsWith('/admin')
                        ? 'text-primary'
                        : 'text-foreground'
                    }`}
                  >
                    <User size={18} />
                    Admin
                  </Link>
                </li>
              )}
              {showLoginButton && (
                <li>
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-lg font-medium text-foreground"
                  >
                    Entrar
                  </Link>
                </li>
              )}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
