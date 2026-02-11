
-- Table for storing tool configurations (history & favorites)
CREATE TABLE public.tool_configurations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  tool TEXT NOT NULL,
  config JSONB NOT NULL DEFAULT '{}',
  is_favorite BOOLEAN NOT NULL DEFAULT false,
  favorite_name TEXT,
  is_draft BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.tool_configurations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own configurations"
ON public.tool_configurations FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own configurations"
ON public.tool_configurations FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own configurations"
ON public.tool_configurations FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own configurations"
ON public.tool_configurations FOR DELETE
USING (auth.uid() = user_id);

-- Index for fast queries
CREATE INDEX idx_tool_configurations_user_tool ON public.tool_configurations(user_id, tool);
CREATE INDEX idx_tool_configurations_favorites ON public.tool_configurations(user_id, is_favorite) WHERE is_favorite = true;

-- Add output_full column to generations for "continue where left off"
ALTER TABLE public.generations ADD COLUMN IF NOT EXISTS output_full TEXT;
ALTER TABLE public.generations ADD COLUMN IF NOT EXISTS is_draft BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE public.generations ADD COLUMN IF NOT EXISTS config JSONB;
