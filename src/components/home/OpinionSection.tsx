import { Link } from 'react-router-dom';
import { ArticleCard } from '@/components/articles/ArticleCard';
import type { Article } from '@/types/article';

interface OpinionSectionProps {
  articles: Article[];
}

export function OpinionSection({ articles }: OpinionSectionProps) {
  return (
    <section className="py-10 border-t border-editorial-divider">
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-serif text-2xl font-semibold">Opinião & Colunas</h2>
        <Link 
          to="/opiniao" 
          className="text-primary text-sm font-medium hover-underline-animation"
        >
          Ver tudo →
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} variant="compact" />
        ))}
      </div>
    </section>
  );
}
