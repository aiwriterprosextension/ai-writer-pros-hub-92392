
-- Table for storing affiliate reviews
CREATE TABLE public.affiliate_reviews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  product_name TEXT NOT NULL,
  asin TEXT,
  category TEXT,
  review_content TEXT,
  pros TEXT,
  cons TEXT,
  rating NUMERIC(2,1),
  word_count INTEGER,
  seo_keyword TEXT,
  review_depth TEXT DEFAULT 'standard',
  tone_balance INTEGER DEFAULT 50,
  faq_content JSONB,
  disclosure TEXT,
  persona JSONB,
  config JSONB DEFAULT '{}',
  ai_model_version TEXT DEFAULT 'gemini-3-flash',
  deleted_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.affiliate_reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own affiliate reviews"
ON public.affiliate_reviews FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own affiliate reviews"
ON public.affiliate_reviews FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own affiliate reviews"
ON public.affiliate_reviews FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own affiliate reviews"
ON public.affiliate_reviews FOR DELETE USING (auth.uid() = user_id);

CREATE INDEX idx_affiliate_reviews_user ON public.affiliate_reviews(user_id, created_at DESC);

-- Table for product comparisons
CREATE TABLE public.product_comparisons (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  review_id UUID REFERENCES public.affiliate_reviews(id) ON DELETE CASCADE,
  compared_products JSONB NOT NULL DEFAULT '[]',
  comparison_table JSONB,
  winner_badges JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.product_comparisons ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own comparisons"
ON public.product_comparisons FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own comparisons"
ON public.product_comparisons FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own comparisons"
ON public.product_comparisons FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own comparisons"
ON public.product_comparisons FOR DELETE USING (auth.uid() = user_id);

-- Table for buyer personas
CREATE TABLE public.buyer_personas (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  product_name TEXT NOT NULL,
  problem TEXT,
  price_sensitivity TEXT,
  experience_level TEXT,
  persona_description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.buyer_personas ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own personas"
ON public.buyer_personas FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own personas"
ON public.buyer_personas FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own personas"
ON public.buyer_personas FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own personas"
ON public.buyer_personas FOR DELETE USING (auth.uid() = user_id);
