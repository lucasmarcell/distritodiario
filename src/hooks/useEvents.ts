import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export type EventType = 'show' | 'cinema' | 'exposicao' | 'teatro' | 'festival' | 'evento';

export interface Event {
  id: string;
  name: string;
  location: string | null;
  date: string;
  type: EventType;
  articleId?: string;
}

// Keywords to identify event types from article titles
const eventKeywords: Record<EventType, string[]> = {
  show: ['show', 'apresentação', 'apresentacao', 'música', 'musica', 'concert', 'banda'],
  cinema: ['cinema', 'filme', 'sessão', 'sessao', 'exibição', 'exibicao', 'mostra de cinema'],
  exposicao: ['exposição', 'exposicao', 'galeria', 'mostra', 'arte', 'artista'],
  teatro: ['teatro', 'peça', 'peca', 'espetáculo', 'espetaculo', 'dramaturgia', 'encenação', 'encenacao'],
  festival: ['festival', 'festa', 'carnaval', 'são joão', 'sao joao', 'arraial'],
  evento: ['evento', 'lançamento', 'lancamento', 'inauguração', 'inauguracao', 'palestra', 'workshop', 'oficina'],
};

function detectEventType(title: string): EventType | null {
  const lowerTitle = title.toLowerCase();
  
  for (const [type, keywords] of Object.entries(eventKeywords)) {
    for (const keyword of keywords) {
      if (lowerTitle.includes(keyword)) {
        return type as EventType;
      }
    }
  }
  
  return null;
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const day = date.getDate();
  const months = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];
  return `${day} de ${months[date.getMonth()]}`;
}

export function useEvents(limit: number = 4) {
  return useQuery({
    queryKey: ['events', limit],
    queryFn: async () => {
      // Fetch recent articles from cultura category that might be events
      const { data: articles, error } = await supabase
        .from('articles')
        .select('id, title, excerpt, published_at, category')
        .eq('is_published', true)
        .in('category', ['cultura', 'noticias'])
        .order('published_at', { ascending: false })
        .limit(20);

      if (error) {
        console.error('Error fetching events:', error);
        return [];
      }

      if (!articles || articles.length === 0) {
        return [];
      }

      // Filter articles that match event keywords and transform to Event format
      const events: Event[] = [];
      
      for (const article of articles) {
        const eventType = detectEventType(article.title);
        
        if (eventType) {
          events.push({
            id: article.id,
            name: article.title,
            location: null, // Can be extracted from excerpt if needed
            date: article.published_at ? formatDate(article.published_at) : 'Em breve',
            type: eventType,
            articleId: article.id,
          });
        }
        
        if (events.length >= limit) break;
      }

      return events;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export const eventTypeLabels: Record<EventType, string> = {
  show: 'Show',
  cinema: 'Cinema',
  exposicao: 'Exposição',
  teatro: 'Teatro',
  festival: 'Festival',
  evento: 'Evento',
};
