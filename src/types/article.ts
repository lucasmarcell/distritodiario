export type ArticleCategory = 'noticias' | 'cultura' | 'comportamento' | 'opiniao' | 'conteudo-mais';

export interface Article {
  id: string;
  title: string;
  subtitle: string | null;
  excerpt: string;
  content: string;
  author_name: string;
  author_id: string | null;
  category: ArticleCategory;
  column_name: string | null;
  image_url: string | null;
  is_highlight: boolean | null;
  is_published: boolean | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export const categoryLabels: Record<ArticleCategory, string> = {
  noticias: 'Notícias',
  cultura: 'Cultura',
  comportamento: 'Comportamento',
  opiniao: 'Opinião',
  'conteudo-mais': 'Conteúdo+',
};

export const categoryPaths: Record<ArticleCategory, string> = {
  noticias: '/noticias',
  cultura: '/cultura',
  comportamento: '/comportamento',
  opiniao: '/opiniao',
  'conteudo-mais': '/conteudo-mais',
};
