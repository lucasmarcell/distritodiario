import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import type { Article } from '@/types/article';
import { categoryLabels } from '@/types/article';

interface ArticleCardProps {
  article: Article;
  variant?: 'default' | 'compact' | 'horizontal';
}

function formatDate(dateString: string | null): string {
  if (!dateString) return '';
  try {
    return format(new Date(dateString), "d 'de' MMMM, yyyy", { locale: ptBR });
  } catch {
    return '';
  }
}

export function ArticleCard({ article, variant = 'default' }: ArticleCardProps) {
  const displayDate = formatDate(article.published_at || article.created_at);

  if (variant === 'compact') {
    return (
      <article className="group">
        <Link to={`/artigo/${article.id}`} className="block">
          {article.image_url && (
            <div className="aspect-[16/10] mb-3 overflow-hidden rounded-lg">
              <img
                src={article.image_url}
                alt={article.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          )}
          <span className="caption text-primary mb-2 block">
            {article.column_name || categoryLabels[article.category]}
          </span>
          <h3 className="headline-sm group-hover:text-primary transition-colors">
            {article.title}
          </h3>
          <p className="text-editorial-gray text-sm mt-2">{article.author_name}</p>
        </Link>
      </article>
    );
  }

  if (variant === 'horizontal') {
    return (
      <article className="group flex gap-6 py-6 border-b border-editorial-divider last:border-b-0">
        {article.image_url && (
          <div className="w-32 h-24 flex-shrink-0 overflow-hidden rounded-lg">
            <Link to={`/artigo/${article.id}`}>
              <img
                src={article.image_url}
                alt={article.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </Link>
          </div>
        )}
        <div className="flex-1">
          <Link to={`/artigo/${article.id}`} className="block">
            <span className="caption text-primary mb-2 block">
              {categoryLabels[article.category]}
            </span>
            <h3 className="headline-sm group-hover:text-primary transition-colors mb-2">
              {article.title}
            </h3>
            <p className="text-editorial-gray body-sm line-clamp-2">
              {article.excerpt}
            </p>
            <div className="flex items-center gap-2 mt-3 text-sm text-editorial-gray">
              <span>{article.author_name}</span>
              <span>•</span>
              <span>{displayDate}</span>
            </div>
          </Link>
        </div>
      </article>
    );
  }

  return (
    <article className="group">
      <Link to={`/artigo/${article.id}`} className="block">
        {article.image_url && (
          <div className="aspect-[16/10] mb-4 overflow-hidden rounded-lg">
            <img
              src={article.image_url}
              alt={article.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        )}
        <span className="caption text-primary mb-3 block">
          {categoryLabels[article.category]}
        </span>
        <h3 className="headline-md group-hover:text-primary transition-colors mb-3">
          {article.title}
        </h3>
        <p className="text-editorial-gray body-sm line-clamp-3 mb-3">
          {article.excerpt}
        </p>
        <div className="flex items-center gap-2 text-sm text-editorial-gray">
          <span>{article.author_name}</span>
          <span>•</span>
          <span>{displayDate}</span>
        </div>
      </Link>
    </article>
  );
}
