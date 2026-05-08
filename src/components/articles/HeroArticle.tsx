import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import type { Article } from '@/types/article';

interface HeroArticleProps {
  article: Article;
}

function formatDate(dateString: string | null): string {
  if (!dateString) return '';
  try {
    return format(new Date(dateString), "d 'de' MMMM, yyyy", { locale: ptBR });
  } catch {
    return '';
  }
}

export function HeroArticle({ article }: HeroArticleProps) {
  const displayDate = formatDate(article.published_at || article.created_at);

  return (
    <article className="py-12 border-b border-editorial-divider">
      <Link to={`/artigo/${article.id}`} className="block group">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Image on the left - smaller */}
          {article.image_url && (
            <div className="w-full md:w-2/5 flex-shrink-0">
              <div className="aspect-[4/3] overflow-hidden rounded-lg">
                <img
                  src={article.image_url}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>
          )}
          
          {/* Content on the right */}
          <div className="flex-1">
            <span className="caption text-primary mb-3 block">Destaque</span>
            <h2 className="headline-lg group-hover:text-primary transition-colors mb-3">
              {article.title}
            </h2>
            {article.subtitle && (
              <p className="text-lg md:text-xl text-editorial-gray font-light mb-4 max-w-2xl">
                {article.subtitle}
              </p>
            )}
            <p className="body-md text-editorial-gray max-w-2xl mb-4 line-clamp-3">
              {article.excerpt}
            </p>
            <div className="flex items-center gap-3 text-editorial-gray text-sm">
              <span className="font-medium text-foreground">{article.author_name}</span>
              <span>•</span>
              <span>{displayDate}</span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
