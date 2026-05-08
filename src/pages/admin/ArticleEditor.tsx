import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Save, Upload, X, Calendar } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface ArticleForm {
  title: string;
  subtitle: string;
  excerpt: string;
  content: string;
  category: string;
  column_name: string;
  image_url: string;
  is_highlight: boolean;
  is_published: boolean;
  scheduled_at: Date | null;
}

const initialForm: ArticleForm = {
  title: '',
  subtitle: '',
  excerpt: '',
  content: '',
  category: 'noticias',
  column_name: '',
  image_url: '',
  is_highlight: false,
  is_published: false,
  scheduled_at: null,
};

export default function ArticleEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [form, setForm] = useState<ArticleForm>(initialForm);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [authorName, setAuthorName] = useState('');

  const isEditing = !!id;

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;

      // Fetch author name from profile
      const { data: profile } = await supabase
        .from('profiles')
        .select('name')
        .eq('user_id', user.id)
        .single();

      if (profile) {
        setAuthorName(profile.name);
      }

      // Fetch article if editing
      if (isEditing) {
        setLoading(true);
        const { data: article, error } = await supabase
          .from('articles')
          .select('*')
          .eq('id', id)
          .single();

        if (error) {
          toast({
            title: 'Erro',
            description: 'Não foi possível carregar a matéria.',
            variant: 'destructive',
          });
          navigate('/admin/materias');
          return;
        }

        if (article) {
          setForm({
            title: article.title,
            subtitle: article.subtitle || '',
            excerpt: article.excerpt,
            content: article.content,
            category: article.category,
            column_name: article.column_name || '',
            image_url: article.image_url || '',
            is_highlight: article.is_highlight ?? false,
            is_published: article.is_published ?? false,
            scheduled_at: article.scheduled_at ? new Date(article.scheduled_at) : null,
          });
        }
        setLoading(false);
      }
    };

    fetchData();
  }, [id, user, isEditing, navigate, toast]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: 'Erro',
        description: 'Por favor, selecione um arquivo de imagem.',
        variant: 'destructive',
      });
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: 'Erro',
        description: 'A imagem deve ter no máximo 5MB.',
        variant: 'destructive',
      });
      return;
    }

    setUploading(true);

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `articles/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('article-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('article-images')
        .getPublicUrl(filePath);

      setForm({ ...form, image_url: publicUrl });

      toast({
        title: 'Imagem enviada',
        description: 'A imagem foi enviada com sucesso.',
      });
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível enviar a imagem.',
        variant: 'destructive',
      });
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.title || !form.excerpt || !form.content) {
      toast({
        title: 'Campos obrigatórios',
        description: 'Preencha título, resumo e conteúdo.',
        variant: 'destructive',
      });
      return;
    }

    setSaving(true);

    try {
      const articleData = {
        title: form.title,
        subtitle: form.subtitle || null,
        excerpt: form.excerpt,
        content: form.content,
        category: form.category,
        column_name: form.column_name || null,
        image_url: form.image_url || null,
        is_highlight: form.is_highlight,
        is_published: form.is_published,
        scheduled_at: form.scheduled_at ? form.scheduled_at.toISOString() : null,
        author_id: user?.id,
        author_name: authorName,
        published_at: form.is_published ? new Date().toISOString() : null,
      };

      if (isEditing) {
        const { error } = await supabase
          .from('articles')
          .update(articleData)
          .eq('id', id);

        if (error) throw error;

        toast({
          title: 'Matéria atualizada',
          description: 'As alterações foram salvas.',
        });
      } else {
        const { error } = await supabase.from('articles').insert(articleData);

        if (error) throw error;

        toast({
          title: 'Matéria criada',
          description: 'A matéria foi criada com sucesso.',
        });
      }

      navigate('/admin/materias');
    } catch (error) {
      console.error('Error saving article:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível salvar a matéria.',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
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
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" size="icon" onClick={() => navigate('/admin/materias')}>
          <ArrowLeft size={20} />
        </Button>
        <h1 className="headline-lg">
          {isEditing ? 'Editar Matéria' : 'Nova Matéria'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
        {/* Image Upload */}
        <div className="space-y-2">
          <Label>Imagem de Capa</Label>
          {form.image_url ? (
            <div className="relative aspect-video rounded-lg overflow-hidden border border-editorial-divider">
              <img
                src={form.image_url}
                alt="Imagem de capa"
                className="w-full h-full object-cover"
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2"
                onClick={() => setForm({ ...form, image_url: '' })}
              >
                <X size={16} />
              </Button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center w-full aspect-video border-2 border-dashed border-editorial-divider rounded-lg cursor-pointer hover:border-primary transition-colors">
              <Upload size={32} className="text-muted-foreground mb-2" />
              <span className="text-sm text-muted-foreground">
                {uploading ? 'Enviando...' : 'Clique para enviar uma imagem'}
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                disabled={uploading}
              />
            </label>
          )}
        </div>

        {/* Title */}
        <div className="space-y-2">
          <Label htmlFor="title">Título *</Label>
          <Input
            id="title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Título da matéria"
            required
          />
        </div>

        {/* Subtitle */}
        <div className="space-y-2">
          <Label htmlFor="subtitle">Subtítulo</Label>
          <Input
            id="subtitle"
            value={form.subtitle}
            onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
            placeholder="Subtítulo opcional"
          />
        </div>

        {/* Excerpt */}
        <div className="space-y-2">
          <Label htmlFor="excerpt">Resumo *</Label>
          <Textarea
            id="excerpt"
            value={form.excerpt}
            onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
            placeholder="Um breve resumo da matéria"
            rows={3}
            required
          />
        </div>

        {/* Content */}
        <div className="space-y-2">
          <Label htmlFor="content">Conteúdo *</Label>
          <Textarea
            id="content"
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            placeholder="O conteúdo completo da matéria"
            rows={15}
            required
          />
        </div>

        {/* Category */}
        <div className="space-y-2">
          <Label htmlFor="category">Categoria *</Label>
          <Select
            value={form.category}
            onValueChange={(value) => setForm({ ...form, category: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione a categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="noticias">Notícias</SelectItem>
              <SelectItem value="cultura">Cultura</SelectItem>
              <SelectItem value="comportamento">Comportamento</SelectItem>
              <SelectItem value="opiniao">Opinião</SelectItem>
              <SelectItem value="conteudo-mais">Conteúdo+ (Patrocinado)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Column Name (for opinion) */}
        {form.category === 'opiniao' && (
          <div className="space-y-2">
            <Label htmlFor="column_name">Nome da Coluna</Label>
            <Input
              id="column_name"
              value={form.column_name}
              onChange={(e) => setForm({ ...form, column_name: e.target.value })}
              placeholder="Ex: Notas do Distrito"
            />
          </div>
        )}

        {/* Toggles */}
        <div className="flex flex-col gap-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="is_highlight">Matéria Destaque</Label>
              <p className="text-sm text-muted-foreground">
                Exibir em destaque na página inicial
              </p>
            </div>
            <Switch
              id="is_highlight"
              checked={form.is_highlight}
              onCheckedChange={(checked) =>
                setForm({ ...form, is_highlight: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="is_published">Publicar</Label>
              <p className="text-sm text-muted-foreground">
                Tornar a matéria visível no site
              </p>
            </div>
            <Switch
              id="is_published"
              checked={form.is_published}
              onCheckedChange={(checked) =>
                setForm({ ...form, is_published: checked, scheduled_at: checked ? null : form.scheduled_at })
              }
            />
          </div>

          {/* Scheduling */}
          {!form.is_published && (
            <div className="flex items-center justify-between border-t pt-4">
              <div>
                <Label>Agendar Publicação</Label>
                <p className="text-sm text-muted-foreground">
                  {form.scheduled_at 
                    ? `Agendado para ${format(form.scheduled_at, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}`
                    : 'Programar uma data e hora para publicar'}
                </p>
              </div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" type="button">
                    <Calendar size={16} className="mr-2" />
                    {form.scheduled_at ? 'Alterar' : 'Agendar'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                  <div className="p-4 space-y-4">
                    <CalendarComponent
                      mode="single"
                      selected={form.scheduled_at || undefined}
                      onSelect={(date) => {
                        if (date) {
                          const newDate = form.scheduled_at 
                            ? new Date(date.setHours(form.scheduled_at.getHours(), form.scheduled_at.getMinutes()))
                            : new Date(date.setHours(9, 0));
                          setForm({ ...form, scheduled_at: newDate });
                        }
                      }}
                      disabled={(date) => date < new Date()}
                      initialFocus
                      locale={ptBR}
                    />
                    {form.scheduled_at && (
                      <div className="flex items-center gap-2 border-t pt-4">
                        <Label htmlFor="schedule-time" className="text-sm">Horário:</Label>
                        <Input
                          id="schedule-time"
                          type="time"
                          value={format(form.scheduled_at, 'HH:mm')}
                          onChange={(e) => {
                            const [hours, minutes] = e.target.value.split(':').map(Number);
                            const newDate = new Date(form.scheduled_at!);
                            newDate.setHours(hours, minutes);
                            setForm({ ...form, scheduled_at: newDate });
                          }}
                          className="w-24"
                        />
                      </div>
                    )}
                    {form.scheduled_at && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        type="button"
                        className="w-full text-destructive"
                        onClick={() => setForm({ ...form, scheduled_at: null })}
                      >
                        Remover agendamento
                      </Button>
                    )}
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          )}
        </div>

        {/* Submit */}
        <div className="flex gap-4 pt-4">
          <Button type="submit" disabled={saving}>
            <Save size={18} className="mr-2" />
            {saving ? 'Salvando...' : 'Salvar'}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/admin/materias')}
          >
            Cancelar
          </Button>
        </div>
      </form>
    </div>
  );
}
