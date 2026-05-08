import { useParams, Link } from 'react-router-dom';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Layout } from '@/components/layout/Layout';
import { useArticle, useRelatedArticles } from '@/hooks/useArticles';
import { categoryLabels, categoryPaths } from '@/types/article';
import { ArrowLeft } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

function formatDate(dateString: string | null): string {
  if (!dateString) return '';
  try {
    return format(new Date(dateString), "d 'de' MMMM, yyyy", { locale: ptBR });
  } catch {
    return '';
  }
}

const Artigo = () => {
  const { id } = useParams();
  const { data: article, isLoading, error } = useArticle(id || '');
  const { data: relatedArticles = [] } = useRelatedArticles(
    article?.category || 'noticias',
    id || '',
    3
  );

  if (isLoading) {
    return (
      <Layout>
        <article className="container">
          <div className="py-6 border-b border-editorial-divider">
            <Skeleton className="h-4 w-32" />
          </div>
          <header className="py-10 border-b border-editorial-divider max-w-4xl space-y-4">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-48" />
          </header>
          <div className="py-10 max-w-3xl space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </article>
      </Layout>
    );
  }

  if (error || !article) {
    return (
      <Layout>
        <div className="container py-20 text-center">
          <h1 className="headline-lg mb-4">Artigo não encontrado</h1>
          <Link to="/" className="text-primary hover-underline-animation">
            Voltar para a home
          </Link>
        </div>
      </Layout>
    );
  }

  const displayDate = formatDate(article.published_at || article.created_at);

  return (
    <Layout>
      <article className="container">
        {/* Breadcrumb */}
        <div className="py-6 border-b border-editorial-divider">
          <Link 
            to={categoryPaths[article.category]} 
            className="inline-flex items-center gap-2 text-editorial-gray hover:text-primary transition-colors text-sm"
          >
            <ArrowLeft size={16} />
            <span>Voltar para {categoryLabels[article.category]}</span>
          </Link>
        </div>

        {/* Header */}
        <header className="py-10 border-b border-editorial-divider max-w-4xl">
          <span className="caption text-primary mb-4 block">
            {article.column_name || categoryLabels[article.category]}
          </span>
          <h1 className="headline-xl mb-4">{article.title}</h1>
          {article.subtitle && (
            <p className="text-xl md:text-2xl text-editorial-gray font-light mb-6">
              {article.subtitle}
            </p>
          )}
          <div className="flex items-center gap-3 text-editorial-gray">
            <span className="font-medium text-foreground">{article.author_name}</span>
            <span>•</span>
            <span>{displayDate}</span>
          </div>
        </header>

        {/* Featured Image */}
        {article.image_url && (
          <div className="py-8 max-w-4xl">
            <img
              src={article.image_url}
              alt={article.title}
              className="w-full rounded-lg"
            />
          </div>
        )}

        {/* Body */}
        <div 
          className="py-10 max-w-3xl article-body prose prose-lg"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="py-10 border-t border-editorial-divider">
            <h2 className="font-serif text-xl font-semibold mb-6">Leia também</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedArticles.map((related) => (
                <Link 
                  key={related.id} 
                  to={`/artigo/${related.id}`}
                  className="group"
                >
                  <h3 className="font-serif font-medium group-hover:text-primary transition-colors">
                    {related.title}
                  </h3>
                  <p className="text-editorial-gray text-sm mt-2">{related.author_name}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </Layout>
  );
};

export default Artigo;
