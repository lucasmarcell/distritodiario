import { Layout } from '@/components/layout/Layout';
import { useTeamMembers } from '@/hooks/useTeamMembers';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { categoryLabels } from '@/types/article';

const Expediente = () => {
  const { data: teamMembers = [], isLoading } = useTeamMembers();

  const leadership = teamMembers.filter(m => 
    m.position === 'editor-chefe' || m.position === 'diretor'
  );
  const journalists = teamMembers.filter(m => 
    m.position === 'jornalista' || m.position === 'reporter'
  );
  const collaborators = teamMembers.filter(m => 
    m.position === 'colaborador' || m.position === 'colunista'
  );

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  const getEditorialLabel = (section: string | null) => {
    if (!section) return null;
    return categoryLabels[section as keyof typeof categoryLabels] || section;
  };

  const TeamMemberCard = ({ member }: { member: typeof teamMembers[0] }) => (
    <div className="flex gap-4 p-6 bg-background border border-editorial-divider rounded-lg hover:shadow-md transition-shadow">
      <Avatar className="w-20 h-20 flex-shrink-0">
        <AvatarImage src={member.photo_url || ''} alt={member.name} />
        <AvatarFallback className="text-lg bg-editorial-light">
          {getInitials(member.name)}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <h3 className="font-serif text-lg font-bold text-foreground">
          {member.name}
        </h3>
        <p className="text-primary font-medium text-sm">
          {member.role}
        </p>
        {member.editorial_section && (
          <p className="text-editorial-gray text-sm mt-1">
            Editoria: {getEditorialLabel(member.editorial_section)}
          </p>
        )}
        {member.bio && (
          <p className="text-editorial-gray text-sm mt-2 line-clamp-3">
            {member.bio}
          </p>
        )}
      </div>
    </div>
  );

  const SkeletonCard = () => (
    <div className="flex gap-4 p-6 border border-editorial-divider rounded-lg">
      <Skeleton className="w-20 h-20 rounded-full flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-full" />
      </div>
    </div>
  );

  return (
    <Layout>
      <div className="container">
        <header className="py-10 border-b border-editorial-divider">
          <h1 className="headline-xl">Expediente</h1>
          <p className="body-lg text-editorial-gray mt-4 max-w-2xl">
            Conheça a equipe que faz o Distrito Diário acontecer todos os dias.
          </p>
        </header>

        <div className="py-10 space-y-12">
          {/* Direção/Liderança */}
          <section>
            <h2 className="headline-md mb-6 pb-2 border-b border-editorial-divider">
              Direção
            </h2>
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SkeletonCard />
              </div>
            ) : leadership.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {leadership.map(member => (
                  <TeamMemberCard key={member.id} member={member} />
                ))}
              </div>
            ) : (
              <p className="text-editorial-gray">Nenhum membro cadastrado.</p>
            )}
          </section>

          {/* Jornalistas */}
          {(isLoading || journalists.length > 0) && (
            <section>
              <h2 className="headline-md mb-6 pb-2 border-b border-editorial-divider">
                Jornalistas
              </h2>
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(3)].map((_, i) => (
                    <SkeletonCard key={i} />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {journalists.map(member => (
                    <TeamMemberCard key={member.id} member={member} />
                  ))}
                </div>
              )}
            </section>
          )}

          {/* Colaboradores */}
          {(isLoading || collaborators.length > 0) && (
            <section>
              <h2 className="headline-md mb-6 pb-2 border-b border-editorial-divider">
                Colaboradores
              </h2>
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(2)].map((_, i) => (
                    <SkeletonCard key={i} />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {collaborators.map(member => (
                    <TeamMemberCard key={member.id} member={member} />
                  ))}
                </div>
              )}
            </section>
          )}
        </div>

        {/* Contato */}
        <section className="py-10 border-t border-editorial-divider">
          <div className="bg-editorial-light p-8 rounded-lg max-w-2xl">
            <h2 className="headline-md mb-4">Faça parte da equipe</h2>
            <p className="body-lg text-editorial-gray mb-4">
              O Distrito Diário está sempre em busca de novos talentos. 
              Se você é jornalista e quer colaborar conosco, entre em contato.
            </p>
            <a 
              href="/contato" 
              className="inline-flex items-center text-primary font-medium hover-underline-animation"
            >
              Enviar currículo →
            </a>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Expediente;
