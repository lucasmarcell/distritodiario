import { useState } from 'react';
import { useTeamMembers, useCreateTeamMember, useUpdateTeamMember, useDeleteTeamMember, TeamMember } from '@/hooks/useTeamMembers';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Plus, Pencil, Trash2, Users } from 'lucide-react';
import { toast } from 'sonner';

const positions = [
  { value: 'editor-chefe', label: 'Editor-Chefe' },
  { value: 'diretor', label: 'Diretor' },
  { value: 'jornalista', label: 'Jornalista' },
  { value: 'reporter', label: 'Repórter' },
  { value: 'colaborador', label: 'Colaborador' },
  { value: 'colunista', label: 'Colunista' },
];

const editorialSections = [
  { value: '', label: 'Nenhuma' },
  { value: 'noticias', label: 'Notícias' },
  { value: 'cultura', label: 'Cultura' },
  { value: 'comportamento', label: 'Comportamento' },
  { value: 'opiniao', label: 'Opinião' },
];

interface MemberFormData {
  name: string;
  role: string;
  position: string;
  editorial_section: string;
  bio: string;
  photo_url: string;
  display_order: number;
  is_active: boolean;
}

const initialFormData: MemberFormData = {
  name: '',
  role: '',
  position: 'jornalista',
  editorial_section: '',
  bio: '',
  photo_url: '',
  display_order: 0,
  is_active: true,
};

export default function TeamMembersList() {
  const { data: members = [], isLoading } = useTeamMembers();
  const createMember = useCreateTeamMember();
  const updateMember = useUpdateTeamMember();
  const deleteMember = useDeleteTeamMember();
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [formData, setFormData] = useState<MemberFormData>(initialFormData);

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
  };

  const handleOpenDialog = (member?: TeamMember) => {
    if (member) {
      setEditingMember(member);
      setFormData({
        name: member.name,
        role: member.role,
        position: member.position,
        editorial_section: member.editorial_section || '',
        bio: member.bio || '',
        photo_url: member.photo_url || '',
        display_order: member.display_order,
        is_active: member.is_active,
      });
    } else {
      setEditingMember(null);
      setFormData({ ...initialFormData, display_order: members.length + 1 });
    }
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingMember) {
        await updateMember.mutateAsync({
          id: editingMember.id,
          ...formData,
          editorial_section: formData.editorial_section || null,
        });
        toast.success('Membro atualizado com sucesso!');
      } else {
        await createMember.mutateAsync({
          ...formData,
          editorial_section: formData.editorial_section || null,
        });
        toast.success('Membro adicionado com sucesso!');
      }
      setIsDialogOpen(false);
      setFormData(initialFormData);
    } catch (error) {
      toast.error('Erro ao salvar membro');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja remover este membro?')) return;
    
    try {
      await deleteMember.mutateAsync(id);
      toast.success('Membro removido com sucesso!');
    } catch (error) {
      toast.error('Erro ao remover membro');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold font-serif">Equipe Editorial</h1>
          <p className="text-muted-foreground">Gerencie os membros da equipe do Distrito Diário</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => handleOpenDialog()}>
              <Plus size={16} className="mr-2" />
              Adicionar Membro
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>
                {editingMember ? 'Editar Membro' : 'Novo Membro'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Cargo *</Label>
                  <Input
                    id="role"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    placeholder="Ex: Editor-Chefe"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="position">Posição *</Label>
                  <Select
                    value={formData.position}
                    onValueChange={(value) => setFormData({ ...formData, position: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {positions.map(pos => (
                        <SelectItem key={pos.value} value={pos.value}>
                          {pos.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editorial_section">Editoria</Label>
                  <Select
                    value={formData.editorial_section}
                    onValueChange={(value) => setFormData({ ...formData, editorial_section: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione..." />
                    </SelectTrigger>
                    <SelectContent>
                      {editorialSections.map(sec => (
                        <SelectItem key={sec.value} value={sec.value}>
                          {sec.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="photo_url">URL da Foto</Label>
                <Input
                  id="photo_url"
                  type="url"
                  value={formData.photo_url}
                  onChange={(e) => setFormData({ ...formData, photo_url: e.target.value })}
                  placeholder="https://..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="Uma breve descrição..."
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="display_order">Ordem de Exibição</Label>
                  <Input
                    id="display_order"
                    type="number"
                    value={formData.display_order}
                    onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div className="space-y-2 flex items-end">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.is_active}
                      onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                      className="rounded"
                    />
                    <span className="text-sm">Ativo no site</span>
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={createMember.isPending || updateMember.isPending}>
                  {editingMember ? 'Salvar Alterações' : 'Adicionar'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <div className="w-16 h-16 rounded-full bg-muted" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-muted rounded w-3/4" />
                    <div className="h-3 bg-muted rounded w-1/2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : members.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <Users className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="font-medium text-lg mb-2">Nenhum membro cadastrado</h3>
            <p className="text-muted-foreground mb-4">
              Adicione os membros da equipe editorial do Distrito Diário.
            </p>
            <Button onClick={() => handleOpenDialog()}>
              <Plus size={16} className="mr-2" />
              Adicionar Primeiro Membro
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {members.map(member => (
            <Card key={member.id} className={!member.is_active ? 'opacity-50' : ''}>
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={member.photo_url || ''} alt={member.name} />
                    <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium truncate">{member.name}</h3>
                    <p className="text-sm text-primary">{member.role}</p>
                    {member.editorial_section && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Editoria: {member.editorial_section}
                      </p>
                    )}
                    {!member.is_active && (
                      <span className="text-xs text-destructive">Inativo</span>
                    )}
                  </div>
                </div>
                {member.bio && (
                  <p className="text-sm text-muted-foreground mt-3 line-clamp-2">
                    {member.bio}
                  </p>
                )}
                <div className="flex gap-2 mt-4 pt-4 border-t">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => handleOpenDialog(member)}
                  >
                    <Pencil size={14} className="mr-1" />
                    Editar
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-destructive hover:text-destructive"
                    onClick={() => handleDelete(member.id)}
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
