import { Layout } from '@/components/layout/Layout';
import { ArticleCard } from '@/components/articles/ArticleCard';
import { useArticlesByCategory } from '@/hooks/useArticles';
import { Skeleton } from '@/components/ui/skeleton';
import { Sparkles } from 'lucide-react';

const ConteudoMais = () => {
  // Using 'conteudo-mais' as category for sponsored content
  const { data: articles = [], isLoading } = useArticlesByCategory('conteudo-mais' as any);

  return (
    <Layout>
      <div className="container">
        <header className="py-10 border-b border-editorial-divider">
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="text-primary" size={28} />
            <span className="text-sm font-medium text-primary uppercase tracking-wider">
              Conteúdo Patrocinado
            </span>
          </div>
          <h1 className="headline-xl">Conteúdo+</h1>
          <p className="body-lg text-editorial-gray mt-4 max-w-2xl">
            Conteúdo produzido em parceria com marcas e anunciantes. 
            Transparência é um dos nossos valores — todo conteúdo patrocinado 
            é claramente identificado.
          </p>
        </header>

        <div className="py-10">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="aspect-[4/3] rounded-lg" />
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              ))}
            </div>
          ) : articles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-editorial-light rounded-lg">
              <Sparkles className="mx-auto text-editorial-gray mb-4" size={48} />
              <h2 className="headline-md mb-2">Nenhum conteúdo ainda</h2>
              <p className="text-editorial-gray">
                Em breve, novos conteúdos patrocinados serão publicados aqui.
              </p>
            </div>
          )}
        </div>

        <section className="py-10 border-t border-editorial-divider">
          <div className="bg-editorial-light p-8 rounded-lg max-w-2xl">
            <h2 className="headline-md mb-4">Quer anunciar conosco?</h2>
            <p className="body-lg text-editorial-gray mb-4">
              Se você representa uma marca ou empresa e deseja criar conteúdo 
              patrocinado junto ao Distrito Diário, entre em contato com nossa 
              equipe comercial.
            </p>
            <a 
              href="/contato" 
              className="inline-flex items-center text-primary font-medium hover-underline-animation"
            >
              Fale com a redação →
            </a>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default ConteudoMais;
