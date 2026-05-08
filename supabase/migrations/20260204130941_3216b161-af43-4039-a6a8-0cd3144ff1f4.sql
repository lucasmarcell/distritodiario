-- Add scheduled_at column to articles table
ALTER TABLE public.articles ADD COLUMN scheduled_at timestamp with time zone DEFAULT NULL;

-- Add index for efficient querying of scheduled articles
CREATE INDEX idx_articles_scheduled_at ON public.articles (scheduled_at) WHERE scheduled_at IS NOT NULL AND is_published = false;