import { ArticleCard } from '@/components/articles/ArticleCard';
import type { Article } from '@/types/article';

interface LatestArticlesProps {
  articles: Article[];
}

export function LatestArticles({ articles }: LatestArticlesProps) {
  return (
    <section className="py-10">
      <h2 className="font-serif text-2xl font-semibold mb-8 pb-4 border-b border-editorial-divider">
        Últimas Publicações
      </h2>
      <div className="space-y-0">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} variant="horizontal" />
        ))}
      </div>
    </section>
  );
}
