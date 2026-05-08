import { Layout } from '@/components/layout/Layout';
import { ArticleCard } from '@/components/articles/ArticleCard';
import { useArticlesByCategory } from '@/hooks/useArticles';
import { Skeleton } from '@/components/ui/skeleton';

const Comportamento = () => {
  const { data: articles = [], isLoading } = useArticlesByCategory('comportamento');

  return (
    <Layout>
      <div className="container">
        <header className="py-10 border-b border-editorial-divider">
          <h1 className="headline-xl">Comportamento</h1>
          <p className="text-editorial-gray body-lg mt-4 max-w-2xl">
            Textos reflexivos e autorais sobre temas sociais, urbanos e contemporâneos. 
            Conteúdos para pensar o mundo em que vivemos.
          </p>
        </header>

        <div className="py-10 max-w-3xl">
          {isLoading ? (
            [...Array(4)].map((_, i) => (
              <div key={i} className="flex gap-6 py-6 border-b border-editorial-divider">
                <Skeleton className="w-32 h-24 rounded-lg" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </div>
            ))
          ) : articles.length > 0 ? (
            articles.map((article) => (
              <ArticleCard key={article.id} article={article} variant="horizontal" />
            ))
          ) : (
            <p className="text-editorial-gray py-10 text-center">
              Nenhuma matéria publicada nesta categoria.
            </p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Comportamento;
