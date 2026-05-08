import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Article, ArticleCategory } from '@/types/article';

export function useArticles() {
  return useQuery({
    queryKey: ['articles'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('is_published', true)
        .order('published_at', { ascending: false });

      if (error) throw error;
      return data as Article[];
    },
  });
}

export function useArticlesByCategory(category: ArticleCategory) {
  return useQuery({
    queryKey: ['articles', 'category', category],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('is_published', true)
        .eq('category', category)
        .order('published_at', { ascending: false });

      if (error) throw error;
      return data as Article[];
    },
  });
}

export function useArticle(id: string) {
  return useQuery({
    queryKey: ['article', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('id', id)
        .eq('is_published', true)
        .single();

      if (error) throw error;
      return data as Article;
    },
    enabled: !!id,
  });
}

export function useHighlightArticle() {
  return useQuery({
    queryKey: ['articles', 'highlight'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('is_published', true)
        .eq('is_highlight', true)
        .order('published_at', { ascending: false })
        .limit(1)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      return data as Article | null;
    },
  });
}

export function useLatestArticles(limit: number = 5) {
  return useQuery({
    queryKey: ['articles', 'latest', limit],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('is_published', true)
        .order('published_at', { ascending: false })
        .limit(limit);

      if (error) throw error;
      return data as Article[];
    },
  });
}

export function useRelatedArticles(category: ArticleCategory, excludeId: string, limit: number = 3) {
  return useQuery({
    queryKey: ['articles', 'related', category, excludeId, limit],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('is_published', true)
        .eq('category', category)
        .neq('id', excludeId)
        .order('published_at', { ascending: false })
        .limit(limit);

      if (error) throw error;
      return data as Article[];
    },
    enabled: !!excludeId,
  });
}
