
-- Email campaigns table
CREATE TABLE public.email_campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  topic TEXT NOT NULL,
  audience TEXT,
  type TEXT DEFAULT 'promotional',
  tone TEXT DEFAULT 'professional',
  sequence_length INTEGER DEFAULT 1,
  cta_goal TEXT,
  subject_lines JSONB,
  prediction_data JSONB,
  content TEXT,
  is_draft BOOLEAN DEFAULT true,
  deleted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.email_campaigns ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own email campaigns" ON public.email_campaigns FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own email campaigns" ON public.email_campaigns FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own email campaigns" ON public.email_campaigns FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own email campaigns" ON public.email_campaigns FOR DELETE USING (auth.uid() = user_id);

CREATE TRIGGER update_email_campaigns_updated_at BEFORE UPDATE ON public.email_campaigns FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Email sequences table
CREATE TABLE public.email_sequences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID REFERENCES public.email_campaigns(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  email_number INTEGER NOT NULL,
  content TEXT,
  subject_line TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.email_sequences ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own email sequences" ON public.email_sequences FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own email sequences" ON public.email_sequences FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own email sequences" ON public.email_sequences FOR DELETE USING (auth.uid() = user_id);

-- AI predictions table (shared across tools)
CREATE TABLE public.ai_predictions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  tool_name TEXT NOT NULL,
  prediction_data JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.ai_predictions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own predictions" ON public.ai_predictions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own predictions" ON public.ai_predictions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own predictions" ON public.ai_predictions FOR DELETE USING (auth.uid() = user_id);
