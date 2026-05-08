import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Find articles that are scheduled and due for publication
    const now = new Date().toISOString()
    
    const { data: articlesToPublish, error: fetchError } = await supabase
      .from('articles')
      .select('id, title')
      .eq('is_published', false)
      .not('scheduled_at', 'is', null)
      .lte('scheduled_at', now)

    if (fetchError) {
      throw fetchError
    }

    if (!articlesToPublish || articlesToPublish.length === 0) {
      return new Response(
        JSON.stringify({ message: 'No articles to publish', published: 0 }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Publish each article
    const articleIds = articlesToPublish.map(a => a.id)
    
    const { error: updateError } = await supabase
      .from('articles')
      .update({ 
        is_published: true,
        published_at: now
      })
      .in('id', articleIds)

    if (updateError) {
      throw updateError
    }

    console.log(`Published ${articlesToPublish.length} scheduled articles:`, articlesToPublish.map(a => a.title))

    return new Response(
      JSON.stringify({ 
        message: `Published ${articlesToPublish.length} articles`,
        published: articlesToPublish.length,
        articles: articlesToPublish.map(a => a.title)
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    console.error('Error publishing scheduled articles:', error)
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
