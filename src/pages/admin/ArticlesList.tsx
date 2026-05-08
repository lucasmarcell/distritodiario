import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Plus, Pencil, Trash2, Eye, EyeOff } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
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

interface Article {
  id: string;
  title: string;
  category: string;
  author_name: string;
  is_published: boolean;
  is_highlight: boolean;
  created_at: string;
}

const categoryLabels: Record<string, string> = {
  noticias: 'Notícias',
  cultura: 'Cultura',
  comportamento: 'Comportamento',
  opiniao: 'Opinião',
};

export default function ArticlesList() {
  const { isAdmin, user } = useAuth();
  const { toast } = useToast();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchArticles = async () => {
    try {
      let query = supabase
        .from('articles')
        .select('id, title, category, author_name, is_published, is_highlight, created_at')
        .order('created_at', { ascending: false });

      if (!isAdmin) {
        query = query.eq('author_id', user?.id);
      }

      const { data, error } = await query;

      if (error) throw error;
      setArticles(data || []);
    } catch (error) {
      console.error('Error fetching articles:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível carregar as matérias.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, [isAdmin, user?.id]);

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase.from('articles').delete().eq('id', id);

      if (error) throw error;

      setArticles(articles.filter((a) => a.id !== id));
      toast({
        title: 'Matéria excluída',
        description: 'A matéria foi excluída com sucesso.',
      });
    } catch (error) {
      console.error('Error deleting article:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível excluir a matéria.',
        variant: 'destructive',
      });
    }
  };

  const togglePublish = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('articles')
        .update({
          is_published: !currentStatus,
          published_at: !currentStatus ? new Date().toISOString() : null,
        })
        .eq('id', id);

      if (error) throw error;

      setArticles(
        articles.map((a) =>
          a.id === id ? { ...a, is_published: !currentStatus } : a
        )
      );

      toast({
        title: !currentStatus ? 'Matéria publicada' : 'Matéria despublicada',
        description: !currentStatus
          ? 'A matéria está visível no site.'
          : 'A matéria foi removida do site.',
      });
    } catch (error) {
      console.error('Error toggling publish:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível alterar o status da matéria.',
        variant: 'destructive',
      });
    }
  };

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
        <h1 className="headline-lg">Matérias</h1>
        <Button asChild>
          <Link to="/admin/materias/nova">
            <Plus size={18} className="mr-2" />
            Nova Matéria
          </Link>
        </Button>
      </div>

      {articles.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-editorial-divider rounded-lg">
          <p className="text-muted-foreground mb-4">Nenhuma matéria encontrada</p>
          <Button asChild>
            <Link to="/admin/materias/nova">Criar primeira matéria</Link>
          </Button>
        </div>
      ) : (
        <div className="border border-editorial-divider rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Título</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Autor</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {articles.map((article) => (
                <TableRow key={article.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      {article.title}
                      {article.is_highlight && (
                        <Badge variant="secondary" className="text-xs">
                          Destaque
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{categoryLabels[article.category]}</TableCell>
                  <TableCell>{article.author_name}</TableCell>
                  <TableCell>
                    <Badge
                      variant={article.is_published ? 'default' : 'outline'}
                      className={article.is_published ? 'bg-green-600' : ''}
                    >
                      {article.is_published ? 'Publicada' : 'Rascunho'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => togglePublish(article.id, article.is_published)}
                        title={article.is_published ? 'Despublicar' : 'Publicar'}
                      >
                        {article.is_published ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </Button>
                      <Button variant="ghost" size="icon" asChild>
                        <Link to={`/admin/materias/${article.id}`}>
                          <Pencil size={18} />
                        </Link>
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <Trash2 size={18} className="text-destructive" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Excluir matéria?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Esta ação não pode ser desfeita. A matéria será
                              permanentemente excluída.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(article.id)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Excluir
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
