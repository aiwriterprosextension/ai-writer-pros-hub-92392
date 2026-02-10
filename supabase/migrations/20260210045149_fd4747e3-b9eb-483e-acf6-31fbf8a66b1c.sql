
-- Create generations table to track AI usage
CREATE TABLE public.generations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  tool TEXT NOT NULL,
  input_preview TEXT,
  output_preview TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.generations ENABLE ROW LEVEL SECURITY;

-- Users can only see their own generations
CREATE POLICY "Users can view own generations"
  ON public.generations FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own generations
CREATE POLICY "Users can insert own generations"
  ON public.generations FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Index for fast user lookups
CREATE INDEX idx_generations_user_id ON public.generations(user_id);
CREATE INDEX idx_generations_created_at ON public.generations(created_at DESC);
