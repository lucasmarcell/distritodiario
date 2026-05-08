import { Link } from 'react-router-dom';
import { Calendar, TrendingUp, MessageSquare } from 'lucide-react';
import { useEvents, eventTypeLabels } from '@/hooks/useEvents';
import { useLatestArticles, useArticlesByCategory } from '@/hooks/useArticles';
import { Skeleton } from '@/components/ui/skeleton';

export function HomeSidebar() {
  const { data: events = [], isLoading: loadingEvents } = useEvents(4);
  const { data: latestArticles = [], isLoading: loadingLatest } = useLatestArticles(4);
  const { data: opinionArticles = [], isLoading: loadingOpinion } = useArticlesByCategory('opiniao');

  return (
    <aside className="space-y-10">
      {/* Distrito Indica */}
      <section className="bg-editorial-light p-6">
        <div className="flex items-center gap-2 mb-4">
          <Calendar size={18} className="text-primary" />
          <h3 className="font-serif font-semibold text-lg">Distrito Indica</h3>
        </div>
        {loadingEvents ? (
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="border-b border-editorial-divider pb-4 last:border-b-0 last:pb-0">
                <Skeleton className="h-3 w-16 mb-2" />
                <Skeleton className="h-4 w-full mb-1" />
                <Skeleton className="h-3 w-24" />
              </div>
            ))}
          </div>
        ) : events.length > 0 ? (
          <ul className="space-y-4">
            {events.map((event) => (
              <li key={event.id} className="border-b border-editorial-divider pb-4 last:border-b-0 last:pb-0">
                <Link 
                  to={event.articleId ? `/artigo/${event.articleId}` : '/agenda'} 
                  className="block group"
                >
                  <span className="caption text-primary">{eventTypeLabels[event.type]}</span>
                  <h4 className="font-medium mt-1 group-hover:text-primary transition-colors text-sm line-clamp-2">
                    {event.name}
                  </h4>
                  <p className="text-editorial-gray text-xs mt-1">
                    {event.date}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-editorial-gray text-sm">
            Nenhuma indicação no momento. Publique matérias com palavras-chave como Show, Cinema, Exposição ou Teatro.
          </p>
        )}
        <Link 
          to="/agenda" 
          className="block text-primary text-sm font-medium mt-4 hover-underline-animation w-fit"
        >
          Ver agenda completa →
        </Link>
      </section>

      {/* Mais Lidas */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp size={18} className="text-primary" />
          <h3 className="font-serif font-semibold text-lg">Mais Lidas</h3>
        </div>
        {loadingLatest ? (
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex gap-3">
                <Skeleton className="h-8 w-8" />
                <Skeleton className="h-4 flex-1" />
              </div>
            ))}
          </div>
        ) : latestArticles.length > 0 ? (
          <ul className="space-y-4">
            {latestArticles.map((article, index) => (
              <li key={article.id} className="flex gap-3">
                <span className="font-serif text-2xl font-bold text-editorial-divider">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <Link 
                  to={`/artigo/${article.id}`} 
                  className="group flex-1"
                >
                  <h4 className="font-medium text-sm group-hover:text-primary transition-colors line-clamp-2">
                    {article.title}
                  </h4>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-editorial-gray text-sm">Nenhuma matéria publicada ainda.</p>
        )}
      </section>

      {/* Opinião */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <MessageSquare size={18} className="text-primary" />
          <h3 className="font-serif font-semibold text-lg">Opinião</h3>
        </div>
        {loadingOpinion ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="border-b border-editorial-divider pb-4 last:border-b-0 last:pb-0">
                <Skeleton className="h-3 w-20 mb-2" />
                <Skeleton className="h-4 w-full mb-1" />
                <Skeleton className="h-3 w-24" />
              </div>
            ))}
          </div>
        ) : opinionArticles.length > 0 ? (
          <ul className="space-y-4">
            {opinionArticles.slice(0, 3).map((article) => (
              <li key={article.id} className="border-b border-editorial-divider pb-4 last:border-b-0 last:pb-0">
                <Link to={`/artigo/${article.id}`} className="block group">
                  <span className="caption text-primary">{article.column_name || 'Opinião'}</span>
                  <h4 className="font-medium mt-1 group-hover:text-primary transition-colors text-sm line-clamp-2">
                    {article.title}
                  </h4>
                  <p className="text-editorial-gray text-xs mt-1">{article.author_name}</p>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-editorial-gray text-sm">Nenhum artigo de opinião ainda.</p>
        )}
      </section>
    </aside>
  );
}
