
-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Blog posts table
CREATE TABLE public.blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  topic TEXT NOT NULL,
  keywords TEXT,
  outline JSONB,
  content TEXT,
  word_count INTEGER,
  seo_score INTEGER,
  readability_score INTEGER,
  tone TEXT DEFAULT 'informative',
  content_purpose TEXT DEFAULT 'educate',
  audience_persona_id UUID,
  is_draft BOOLEAN DEFAULT true,
  deleted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own blog posts" ON public.blog_posts FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own blog posts" ON public.blog_posts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own blog posts" ON public.blog_posts FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own blog posts" ON public.blog_posts FOR DELETE USING (auth.uid() = user_id);

CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON public.blog_posts FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Blog outlines table
CREATE TABLE public.blog_outlines (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  topic TEXT NOT NULL,
  outline_structure JSONB NOT NULL DEFAULT '[]'::jsonb,
  approved BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.blog_outlines ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own outlines" ON public.blog_outlines FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own outlines" ON public.blog_outlines FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own outlines" ON public.blog_outlines FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own outlines" ON public.blog_outlines FOR DELETE USING (auth.uid() = user_id);

-- Audience personas table
CREATE TABLE public.audience_personas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  persona_name TEXT,
  description TEXT,
  target_level TEXT,
  pain_point TEXT,
  desired_action TEXT,
  demographics TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.audience_personas ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own audience personas" ON public.audience_personas FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own audience personas" ON public.audience_personas FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own audience personas" ON public.audience_personas FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own audience personas" ON public.audience_personas FOR DELETE USING (auth.uid() = user_id);

-- SEO metadata table
CREATE TABLE public.seo_metadata (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  blog_post_id UUID REFERENCES public.blog_posts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  meta_title TEXT,
  meta_description TEXT,
  focus_keyword TEXT,
  title_variations JSONB,
  seo_analysis JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.seo_metadata ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own seo metadata" ON public.seo_metadata FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own seo metadata" ON public.seo_metadata FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own seo metadata" ON public.seo_metadata FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own seo metadata" ON public.seo_metadata FOR DELETE USING (auth.uid() = user_id);

-- Visual content suggestions table
CREATE TABLE public.visual_content_suggestions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  blog_post_id UUID REFERENCES public.blog_posts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  image_number INTEGER,
  type TEXT,
  placement TEXT,
  image_prompt TEXT,
  alt_text TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.visual_content_suggestions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own visual suggestions" ON public.visual_content_suggestions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own visual suggestions" ON public.visual_content_suggestions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own visual suggestions" ON public.visual_content_suggestions FOR DELETE USING (auth.uid() = user_id);

-- Fact check flags table
CREATE TABLE public.fact_check_flags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  blog_post_id UUID REFERENCES public.blog_posts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  claim TEXT,
  concern_level TEXT,
  suggested_sources JSONB,
  verified BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.fact_check_flags ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own fact checks" ON public.fact_check_flags FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own fact checks" ON public.fact_check_flags FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own fact checks" ON public.fact_check_flags FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own fact checks" ON public.fact_check_flags FOR DELETE USING (auth.uid() = user_id);
