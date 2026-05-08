import { Layout } from '@/components/layout/Layout';
import { Link } from 'react-router-dom';
import { useTeamMembers } from '@/hooks/useTeamMembers';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowRight } from 'lucide-react';

const Sobre = () => {
  const { data: teamMembers = [], isLoading } = useTeamMembers();
  const leadership = teamMembers.filter(m => 
    m.position === 'editor-chefe' || m.position === 'diretor'
  ).slice(0, 3);

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
  };

  return (
    <Layout>
      <div className="container">
        <header className="py-10 border-b border-editorial-divider">
          <h1 className="headline-xl">Sobre o Distrito Diário</h1>
        </header>

        <div className="py-10 max-w-3xl">
          <section className="mb-12">
            <h2 className="headline-md mb-4">Quem somos</h2>
            <p className="body-lg text-editorial-gray mb-4">
              O Distrito Diário é um jornal online independente, criado por jornalistas 
              apaixonados por contar histórias que importam. Nascemos da vontade de fazer 
              um jornalismo próximo do leitor, com foco na cidade, cultura e comportamento.
            </p>
            <p className="body-lg text-editorial-gray">
              Acreditamos que informação de qualidade deve ser acessível a todos. 
              Por isso, todo nosso conteúdo é gratuito e livre de paywall.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="headline-md mb-4">Nossa missão</h2>
            <p className="body-lg text-editorial-gray">
              Produzir jornalismo independente, ético e relevante, contribuindo para 
              uma sociedade mais informada e engajada. Queremos ser a ponte entre os 
              acontecimentos da cidade e seus cidadãos.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="headline-md mb-4">Linha editorial</h2>
            <p className="body-lg text-editorial-gray mb-4">
              O Distrito Diário preza pela apuração rigorosa, pluralidade de vozes e 
              respeito ao leitor. Não temos vínculos partidários ou comerciais que 
              interfiram em nossa cobertura.
            </p>
            <p className="body-lg text-editorial-gray">
              Nosso compromisso é com a verdade factual e com o interesse público. 
              Quando erramos, corrigimos de forma transparente.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="headline-md mb-4">Valores</h2>
            <ul className="space-y-3 body-lg text-editorial-gray">
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">•</span>
                <span><strong className="text-foreground">Independência:</strong> Livre de pressões políticas e comerciais</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">•</span>
                <span><strong className="text-foreground">Transparência:</strong> Clareza sobre nossas fontes e métodos</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">•</span>
                <span><strong className="text-foreground">Qualidade:</strong> Textos bem apurados e bem escritos</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">•</span>
                <span><strong className="text-foreground">Proximidade:</strong> Jornalismo feito para e com a comunidade</span>
              </li>
            </ul>
          </section>

          {/* Expediente Preview */}
          <section className="mb-12 p-8 bg-editorial-light rounded-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="headline-md">Expediente</h2>
              <Link 
                to="/expediente" 
                className="text-primary font-medium hover-underline-animation flex items-center gap-1"
              >
                Ver equipe completa <ArrowRight size={16} />
              </Link>
            </div>
            
            {isLoading ? (
              <div className="flex gap-6">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Skeleton className="w-12 h-12 rounded-full" />
                    <div className="space-y-1">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-3 w-20" />
                    </div>
                  </div>
                ))}
              </div>
            ) : leadership.length > 0 ? (
              <div className="flex flex-wrap gap-6">
                {leadership.map(member => (
                  <div key={member.id} className="flex items-center gap-3">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={member.photo_url || ''} alt={member.name} />
                      <AvatarFallback className="bg-background">
                        {getInitials(member.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-foreground">{member.name}</p>
                      <p className="text-sm text-editorial-gray">{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-editorial-gray">
                Conheça a equipe que faz o Distrito Diário.
              </p>
            )}
          </section>

          <section className="p-8 bg-editorial-light rounded-lg">
            <h2 className="headline-md mb-4">Contato</h2>
            <p className="body-lg text-editorial-gray mb-4">
              Quer enviar uma pauta, sugestão ou feedback? Estamos sempre abertos 
              a ouvir nossos leitores.
            </p>
            <Link 
              to="/contato" 
              className="inline-flex items-center text-primary font-medium hover-underline-animation"
            >
              Fale com a Redação →
            </Link>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default Sobre;
