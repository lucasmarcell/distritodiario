export interface Article {
  id: string;
  title: string;
  subtitle?: string;
  excerpt: string;
  content?: string;
  author: string;
  date: string;
  category: 'noticias' | 'cultura' | 'comportamento' | 'opiniao';
  tags: string[];
  imageUrl?: string;
  isHighlight?: boolean;
  columnName?: string;
}

export interface Event {
  id: string;
  name: string;
  location: string;
  date: string;
  time: string;
  type: 'show' | 'cinema' | 'exposicao' | 'teatro' | 'festival';
}

export const articles: Article[] = [
  {
    id: '1',
    title: 'Centro histórico recebe nova ciclovia que conecta bairros e transforma mobilidade urbana',
    subtitle: 'Projeto de infraestrutura promete reduzir tempo de deslocamento e incentivar transporte sustentável',
    excerpt: 'A nova ciclovia de 12 quilômetros foi inaugurada ontem e já mostra impacto positivo na rotina dos moradores. O projeto conecta três bairros e inclui estações de bicicletas compartilhadas.',
    author: 'Marina Santos',
    date: '27 de Janeiro, 2026',
    category: 'noticias',
    tags: ['mobilidade', 'urbanismo', 'sustentabilidade'],
    isHighlight: true,
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=600&fit=crop',
  },
  {
    id: '2',
    title: 'Festival de cinema independente anuncia programação com 40 filmes inéditos',
    subtitle: 'Evento acontece em março e traz produções de 15 países diferentes',
    excerpt: 'A 8ª edição do festival promete ser a maior da história, com exibições ao ar livre e debates com diretores.',
    author: 'Carlos Mendes',
    date: '26 de Janeiro, 2026',
    category: 'cultura',
    tags: ['cinema', 'festival', 'arte'],
    imageUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&h=500&fit=crop',
  },
  {
    id: '3',
    title: 'A solidão conectada: por que estamos mais sós mesmo cercados de telas',
    excerpt: 'Psicólogos apontam aumento de 40% nos casos de ansiedade relacionada ao uso excessivo de redes sociais entre jovens adultos.',
    author: 'Beatriz Almeida',
    date: '25 de Janeiro, 2026',
    category: 'comportamento',
    tags: ['saúde mental', 'tecnologia', 'sociedade'],
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=500&fit=crop',
  },
  {
    id: '4',
    title: 'Notas do Distrito: O silêncio das autoridades diante da crise habitacional',
    excerpt: 'É curioso como problemas urgentes podem se tornar invisíveis quando convém. A crise habitacional que assola nossa cidade há anos continua sendo tratada como paisagem.',
    author: 'Pedro Oliveira',
    date: '25 de Janeiro, 2026',
    category: 'opiniao',
    tags: ['editorial', 'habitação', 'política'],
    columnName: 'Notas do Distrito',
    imageUrl: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&h=500&fit=crop',
  },
  {
    id: '5',
    title: 'Novo álbum de artista local mistura MPB e eletrônica em experimento sonoro único',
    excerpt: 'Com produção independente, o trabalho já acumula mais de 500 mil reproduções em plataformas digitais.',
    author: 'Julia Costa',
    date: '24 de Janeiro, 2026',
    category: 'cultura',
    tags: ['música', 'mpb', 'eletrônica'],
    imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=500&fit=crop',
  },
  {
    id: '6',
    title: 'Prefeitura anuncia revitalização de praça abandonada há 10 anos',
    excerpt: 'Obra deve começar em março e inclui área de lazer, horta comunitária e espaço para feiras.',
    author: 'Rafael Torres',
    date: '24 de Janeiro, 2026',
    category: 'noticias',
    tags: ['cidade', 'urbanismo', 'lazer'],
    imageUrl: 'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?w=800&h=500&fit=crop',
  },
  {
    id: '7',
    title: 'Entre Linhas: A arte de desacelerar em um mundo que não para',
    excerpt: 'Vivemos correndo atrás do tempo, mas será que sabemos para onde estamos indo? Uma reflexão sobre o ritmo frenético da vida contemporânea.',
    author: 'Ana Luíza Ferreira',
    date: '23 de Janeiro, 2026',
    category: 'opiniao',
    tags: ['reflexão', 'cotidiano', 'bem-estar'],
    columnName: 'Entre Linhas',
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=500&fit=crop',
  },
  {
    id: '8',
    title: 'Série documental sobre bairros periféricos estreia em plataforma de streaming',
    excerpt: 'Produção local conta histórias de cinco comunidades e seus moradores ao longo de seis episódios.',
    author: 'Lucas Ribeiro',
    date: '23 de Janeiro, 2026',
    category: 'cultura',
    tags: ['streaming', 'documentário', 'periferia'],
    imageUrl: 'https://images.unsplash.com/photo-1478720568477-152d9bc98e7b?w=800&h=500&fit=crop',
  },
  {
    id: '9',
    title: 'O retorno dos encontros presenciais: bares e cafés voltam a lotar',
    excerpt: 'Após anos de distanciamento, a busca por conexões reais impulsiona estabelecimentos locais.',
    author: 'Fernanda Lima',
    date: '22 de Janeiro, 2026',
    category: 'comportamento',
    tags: ['sociedade', 'convivência', 'cidade'],
    imageUrl: 'https://images.unsplash.com/photo-1525610553991-2bede1a236e2?w=800&h=500&fit=crop',
  },
  {
    id: '10',
    title: 'Ponto de Vista: Educação como única saída possível',
    excerpt: 'Enquanto debatemos soluções mirabolantes, a resposta para nossos problemas estruturais continua sendo a mesma há décadas.',
    author: 'Roberto Campos',
    date: '22 de Janeiro, 2026',
    category: 'opiniao',
    tags: ['educação', 'política', 'sociedade'],
    columnName: 'Ponto de Vista',
    imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=500&fit=crop',
  },
];

export const events: Event[] = [
  {
    id: '1',
    name: 'Show: Banda Novos Baianos Revisitada',
    location: 'Teatro Municipal',
    date: '28 de Janeiro',
    time: '21h',
    type: 'show',
  },
  {
    id: '2',
    name: 'Exposição: Olhares Urbanos',
    location: 'Galeria Central',
    date: '29 de Janeiro - 15 de Fevereiro',
    time: '10h às 18h',
    type: 'exposicao',
  },
  {
    id: '3',
    name: 'Cinema ao Ar Livre: Clássicos Nacionais',
    location: 'Praça da República',
    date: '30 de Janeiro',
    time: '19h30',
    type: 'cinema',
  },
  {
    id: '4',
    name: 'Peça: A Cidade e Seus Fantasmas',
    location: 'Centro Cultural',
    date: '31 de Janeiro',
    time: '20h',
    type: 'teatro',
  },
  {
    id: '5',
    name: 'Festival Gastronômico de Rua',
    location: 'Avenida Central',
    date: '1 de Fevereiro',
    time: '12h às 22h',
    type: 'festival',
  },
];

export const getArticlesByCategory = (category: Article['category']) => 
  articles.filter(article => article.category === category);

export const getHighlightArticle = () => 
  articles.find(article => article.isHighlight);

export const getLatestArticles = (count: number = 5) => 
  articles.slice(0, count);

export const getOpinionArticles = () => 
  articles.filter(article => article.category === 'opiniao');

export const getCultureArticles = () => 
  articles.filter(article => article.category === 'cultura');
