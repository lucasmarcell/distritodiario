import { Layout } from '@/components/layout/Layout';
import { HeroArticle } from '@/components/articles/HeroArticle';
import { LatestArticles } from '@/components/home/LatestArticles';
import { CultureSection } from '@/components/home/CultureSection';
import { OpinionSection } from '@/components/home/OpinionSection';
import { HomeSidebar } from '@/components/home/Sidebar';
import { 
  useHighlightArticle, 
  useLatestArticles, 
  useArticlesByCategory 
} from '@/hooks/useArticles';
import { Skeleton } from '@/components/ui/skeleton';

const Index = () => {
  const { data: highlight, isLoading: loadingHighlight } = useHighlightArticle();
  const { data: latest = [], isLoading: loadingLatest } = useLatestArticles(5);
  const { data: culture = [], isLoading: loadingCulture } = useArticlesByCategory('cultura');
  const { data: opinion = [], isLoading: loadingOpinion } = useArticlesByCategory('opiniao');

  const isLoading = loadingHighlight || loadingLatest || loadingCulture || loadingOpinion;

  return (
    <Layout>
      <div className="container">
        {/* Hero Section */}
        {isLoading ? (
          <div className="py-12 border-b border-editorial-divider">
            <div className="flex flex-col md:flex-row gap-8">
              <Skeleton className="w-full md:w-2/5 aspect-[4/3] rounded-lg" />
              <div className="flex-1 space-y-4">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-20 w-full" />
              </div>
            </div>
          </div>
        ) : highlight ? (
          <HeroArticle article={highlight} />
        ) : null}

        {/* Main Content + Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {isLoading ? (
              <div className="py-10 space-y-6">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex gap-6 py-6 border-b border-editorial-divider">
                    <Skeleton className="w-32 h-24 rounded-lg" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-6 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                {latest.length > 0 && <LatestArticles articles={latest} />}
                {culture.length > 0 && <CultureSection articles={culture} />}
                {opinion.length > 0 && <OpinionSection articles={opinion} />}
              </>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-48 pt-10">
              <HomeSidebar />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
