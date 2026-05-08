import { Link, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  LogOut,
  Menu,
  X,
  Home,
  Settings,
  UsersRound,
  Shield
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export default function AdminLayout() {
  const { user, isAdmin, signOut } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { label: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { label: 'Matérias', path: '/admin/materias', icon: FileText },
    { label: 'Segurança', path: '/admin/seguranca', icon: Shield },
    ...(isAdmin ? [
      { label: 'Usuários', path: '/admin/usuarios', icon: Users },
      { label: 'Equipe', path: '/admin/equipe', icon: UsersRound },
      { label: 'Configurações', path: '/admin/configuracoes', icon: Settings },
    ] : []),
  ];

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Mobile menu button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-background border border-editorial-divider rounded-md"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed lg:static inset-y-0 left-0 z-40 w-64 bg-foreground text-background transform transition-transform duration-200 ease-in-out',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        <div className="p-6">
          <h1 className="font-serif text-xl font-bold text-primary">
            Distrito Diário
          </h1>
          <p className="text-sm text-background/70 mt-1">Painel Admin</p>
        </div>

        <nav className="px-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-md transition-colors',
                location.pathname === item.path
                  ? 'bg-primary text-foreground'
                  : 'hover:bg-background/10'
              )}
            >
              <item.icon size={20} />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-background/20">
          <div className="px-4 py-2 mb-2">
            <p className="text-sm font-medium truncate">{user?.email}</p>
            <p className="text-xs text-background/70">{isAdmin ? 'Administrador' : 'Editor'}</p>
          </div>
          
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-background/10 transition-colors mb-2"
          >
            <Home size={18} />
            <span className="text-sm">Ver site</span>
          </Link>
          
          <Button
            variant="ghost"
            className="w-full justify-start text-background hover:bg-background/10 hover:text-background"
            onClick={handleSignOut}
          >
            <LogOut size={18} className="mr-3" />
            Sair
          </Button>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <main className="flex-1 lg:ml-0">
        <div className="p-6 lg:p-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
