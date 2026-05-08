import { Link } from 'react-router-dom';
import { ArticleCard } from '@/components/articles/ArticleCard';
import type { Article } from '@/types/article';

interface CultureSectionProps {
  articles: Article[];
}

export function CultureSection({ articles }: CultureSectionProps) {
  return (
    <section className="py-10 border-t border-editorial-divider">
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-serif text-2xl font-semibold">Cultura</h2>
        <Link 
          to="/cultura" 
          className="text-primary text-sm font-medium hover-underline-animation"
        >
          Ver tudo →
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {articles.slice(0, 3).map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  );
}
