import { Layout } from '@/components/layout/Layout';
import { ArticleCard } from '@/components/articles/ArticleCard';
import { useArticlesByCategory } from '@/hooks/useArticles';
import { Skeleton } from '@/components/ui/skeleton';

const Opiniao = () => {
  const { data: articles = [], isLoading } = useArticlesByCategory('opiniao');

  return (
    <Layout>
      <div className="container">
        <header className="py-10 border-b border-editorial-divider">
          <h1 className="headline-xl">Opinião</h1>
          <p className="text-editorial-gray body-lg mt-4 max-w-2xl">
            Artigos assinados, editoriais e colunas. 
            Vozes diversas debatendo os temas que importam.
          </p>
        </header>

        {/* Colunas */}
        <section className="py-10 border-b border-editorial-divider">
          <h2 className="font-serif text-xl font-semibold mb-6">Nossas Colunas</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-editorial-light">
              <h3 className="font-serif font-semibold text-lg mb-2">Notas do Distrito</h3>
              <p className="text-editorial-gray text-sm">
                Reflexões sobre a cidade e suas contradições
              </p>
            </div>
            <div className="p-6 bg-editorial-light">
              <h3 className="font-serif font-semibold text-lg mb-2">Entre Linhas</h3>
              <p className="text-editorial-gray text-sm">
                O cotidiano visto de ângulos inesperados
              </p>
            </div>
            <div className="p-6 bg-editorial-light">
              <h3 className="font-serif font-semibold text-lg mb-2">Ponto de Vista</h3>
              <p className="text-editorial-gray text-sm">
                Análises sobre política e sociedade
              </p>
            </div>
          </div>
        </section>

        {/* Articles */}
        <div className="py-10 grid grid-cols-1 md:grid-cols-2 gap-10">
          {isLoading ? (
            [...Array(4)].map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="aspect-[16/10] rounded-lg" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))
          ) : articles.length > 0 ? (
            articles.map((article) => (
              <ArticleCard key={article.id} article={article} variant="compact" />
            ))
          ) : (
            <p className="text-editorial-gray py-10 text-center col-span-2">
              Nenhuma matéria publicada nesta categoria.
            </p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Opiniao;
