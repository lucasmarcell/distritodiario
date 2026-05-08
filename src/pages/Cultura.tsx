import { Layout } from '@/components/layout/Layout';
import { ArticleCard } from '@/components/articles/ArticleCard';
import { useArticlesByCategory } from '@/hooks/useArticles';
import { Skeleton } from '@/components/ui/skeleton';

const Cultura = () => {
  const { data: articles = [], isLoading } = useArticlesByCategory('cultura');

  return (
    <Layout>
      <div className="container">
        <header className="py-10 border-b border-editorial-divider">
          <h1 className="headline-xl">Cultura</h1>
          <p className="text-editorial-gray body-lg mt-4 max-w-2xl">
            Cinema, séries, música e eventos culturais. 
            Críticas, análises e guias para quem ama arte e entretenimento.
          </p>
        </header>

        <div className="py-10 grid grid-cols-1 md:grid-cols-2 gap-10">
          {isLoading ? (
            [...Array(4)].map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="aspect-[16/10] rounded-lg" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            ))
          ) : articles.length > 0 ? (
            articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
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

export default Cultura;
