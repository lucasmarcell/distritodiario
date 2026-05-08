import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Users, Eye, Plus } from 'lucide-react';

interface Stats {
  totalArticles: number;
  publishedArticles: number;
  draftArticles: number;
  totalUsers: number;
}

export default function Dashboard() {
  const { isAdmin, user } = useAuth();
  const [stats, setStats] = useState<Stats>({
    totalArticles: 0,
    publishedArticles: 0,
    draftArticles: 0,
    totalUsers: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch article stats - for non-admins, only their own articles
        let articlesQuery = supabase.from('articles').select('id, is_published');
        
        if (!isAdmin) {
          articlesQuery = articlesQuery.eq('author_id', user?.id);
        }

        const { data: articles, error: articlesError } = await articlesQuery;

        if (articlesError) throw articlesError;

        const totalArticles = articles?.length || 0;
        const publishedArticles = articles?.filter(a => a.is_published).length || 0;
        const draftArticles = totalArticles - publishedArticles;

        let totalUsers = 0;
        
        if (isAdmin) {
          const { count, error: usersError } = await supabase
            .from('user_roles')
            .select('*', { count: 'exact', head: true });
          
          if (!usersError) {
            totalUsers = count || 0;
          }
        }

        setStats({
          totalArticles,
          publishedArticles,
          draftArticles,
          totalUsers,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [isAdmin, user?.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="headline-lg">Dashboard</h1>
        <Button asChild>
          <Link to="/admin/materias/nova">
            <Plus size={18} className="mr-2" />
            Nova Matéria
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total de Matérias
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalArticles}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Publicadas
            </CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.publishedArticles}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Rascunhos
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.draftArticles}</div>
          </CardContent>
        </Card>

        {isAdmin && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Usuários
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
            </CardContent>
          </Card>
        )}
      </div>

      <div className="mt-8">
        <h2 className="headline-sm mb-4">Ações Rápidas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link
            to="/admin/materias/nova"
            className="p-6 border border-editorial-divider rounded-lg hover:border-primary transition-colors group"
          >
            <Plus className="h-8 w-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="font-medium mb-1">Nova Matéria</h3>
            <p className="text-sm text-muted-foreground">Criar uma nova publicação</p>
          </Link>

          <Link
            to="/admin/materias"
            className="p-6 border border-editorial-divider rounded-lg hover:border-primary transition-colors group"
          >
            <FileText className="h-8 w-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="font-medium mb-1">Ver Matérias</h3>
            <p className="text-sm text-muted-foreground">Gerenciar todas as matérias</p>
          </Link>

          {isAdmin && (
            <Link
              to="/admin/usuarios"
              className="p-6 border border-editorial-divider rounded-lg hover:border-primary transition-colors group"
            >
              <Users className="h-8 w-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-medium mb-1">Gerenciar Usuários</h3>
              <p className="text-sm text-muted-foreground">Adicionar editores e admins</p>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
