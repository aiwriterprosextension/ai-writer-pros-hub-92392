export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      affiliate_reviews: {
        Row: {
          ai_model_version: string | null
          asin: string | null
          category: string | null
          config: Json | null
          cons: string | null
          created_at: string
          deleted_at: string | null
          disclosure: string | null
          faq_content: Json | null
          id: string
          persona: Json | null
          product_name: string
          pros: string | null
          rating: number | null
          review_content: string | null
          review_depth: string | null
          seo_keyword: string | null
          tone_balance: number | null
          updated_at: string
          user_id: string
          word_count: number | null
        }
        Insert: {
          ai_model_version?: string | null
          asin?: string | null
          category?: string | null
          config?: Json | null
          cons?: string | null
          created_at?: string
          deleted_at?: string | null
          disclosure?: string | null
          faq_content?: Json | null
          id?: string
          persona?: Json | null
          product_name: string
          pros?: string | null
          rating?: number | null
          review_content?: string | null
          review_depth?: string | null
          seo_keyword?: string | null
          tone_balance?: number | null
          updated_at?: string
          user_id: string
          word_count?: number | null
        }
        Update: {
          ai_model_version?: string | null
          asin?: string | null
          category?: string | null
          config?: Json | null
          cons?: string | null
          created_at?: string
          deleted_at?: string | null
          disclosure?: string | null
          faq_content?: Json | null
          id?: string
          persona?: Json | null
          product_name?: string
          pros?: string | null
          rating?: number | null
          review_content?: string | null
          review_depth?: string | null
          seo_keyword?: string | null
          tone_balance?: number | null
          updated_at?: string
          user_id?: string
          word_count?: number | null
        }
        Relationships: []
      }
      ai_predictions: {
        Row: {
          created_at: string
          id: string
          prediction_data: Json
          tool_name: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          prediction_data?: Json
          tool_name: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          prediction_data?: Json
          tool_name?: string
          user_id?: string
        }
        Relationships: []
      }
      audience_personas: {
        Row: {
          created_at: string
          demographics: string | null
          description: string | null
          desired_action: string | null
          id: string
          pain_point: string | null
          persona_name: string | null
          target_level: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          demographics?: string | null
          description?: string | null
          desired_action?: string | null
          id?: string
          pain_point?: string | null
          persona_name?: string | null
          target_level?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          demographics?: string | null
          description?: string | null
          desired_action?: string | null
          id?: string
          pain_point?: string | null
          persona_name?: string | null
          target_level?: string | null
          user_id?: string
        }
        Relationships: []
      }
      blog_outlines: {
        Row: {
          approved: boolean | null
          created_at: string
          id: string
          outline_structure: Json
          topic: string
          user_id: string
        }
        Insert: {
          approved?: boolean | null
          created_at?: string
          id?: string
          outline_structure?: Json
          topic: string
          user_id: string
        }
        Update: {
          approved?: boolean | null
          created_at?: string
          id?: string
          outline_structure?: Json
          topic?: string
          user_id?: string
        }
        Relationships: []
      }
      blog_posts: {
        Row: {
          audience_persona_id: string | null
          content: string | null
          content_purpose: string | null
          created_at: string
          deleted_at: string | null
          id: string
          is_draft: boolean | null
          keywords: string | null
          outline: Json | null
          readability_score: number | null
          seo_score: number | null
          tone: string | null
          topic: string
          updated_at: string
          user_id: string
          word_count: number | null
        }
        Insert: {
          audience_persona_id?: string | null
          content?: string | null
          content_purpose?: string | null
          created_at?: string
          deleted_at?: string | null
          id?: string
          is_draft?: boolean | null
          keywords?: string | null
          outline?: Json | null
          readability_score?: number | null
          seo_score?: number | null
          tone?: string | null
          topic: string
          updated_at?: string
          user_id: string
          word_count?: number | null
        }
        Update: {
          audience_persona_id?: string | null
          content?: string | null
          content_purpose?: string | null
          created_at?: string
          deleted_at?: string | null
          id?: string
          is_draft?: boolean | null
          keywords?: string | null
          outline?: Json | null
          readability_score?: number | null
          seo_score?: number | null
          tone?: string | null
          topic?: string
          updated_at?: string
          user_id?: string
          word_count?: number | null
        }
        Relationships: []
      }
      buyer_personas: {
        Row: {
          created_at: string
          experience_level: string | null
          id: string
          persona_description: string | null
          price_sensitivity: string | null
          problem: string | null
          product_name: string
          user_id: string
        }
        Insert: {
          created_at?: string
          experience_level?: string | null
          id?: string
          persona_description?: string | null
          price_sensitivity?: string | null
          problem?: string | null
          product_name: string
          user_id: string
        }
        Update: {
          created_at?: string
          experience_level?: string | null
          id?: string
          persona_description?: string | null
          price_sensitivity?: string | null
          problem?: string | null
          product_name?: string
          user_id?: string
        }
        Relationships: []
      }
      email_campaigns: {
        Row: {
          audience: string | null
          content: string | null
          created_at: string
          cta_goal: string | null
          deleted_at: string | null
          id: string
          is_draft: boolean | null
          prediction_data: Json | null
          sequence_length: number | null
          subject_lines: Json | null
          tone: string | null
          topic: string
          type: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          audience?: string | null
          content?: string | null
          created_at?: string
          cta_goal?: string | null
          deleted_at?: string | null
          id?: string
          is_draft?: boolean | null
          prediction_data?: Json | null
          sequence_length?: number | null
          subject_lines?: Json | null
          tone?: string | null
          topic: string
          type?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          audience?: string | null
          content?: string | null
          created_at?: string
          cta_goal?: string | null
          deleted_at?: string | null
          id?: string
          is_draft?: boolean | null
          prediction_data?: Json | null
          sequence_length?: number | null
          subject_lines?: Json | null
          tone?: string | null
          topic?: string
          type?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      email_sequences: {
        Row: {
          campaign_id: string | null
          content: string | null
          created_at: string
          email_number: number
          id: string
          subject_line: string | null
          user_id: string
        }
        Insert: {
          campaign_id?: string | null
          content?: string | null
          created_at?: string
          email_number: number
          id?: string
          subject_line?: string | null
          user_id: string
        }
        Update: {
          campaign_id?: string | null
          content?: string | null
          created_at?: string
          email_number?: number
          id?: string
          subject_line?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "email_sequences_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "email_campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
      fact_check_flags: {
        Row: {
          blog_post_id: string | null
          claim: string | null
          concern_level: string | null
          created_at: string
          id: string
          suggested_sources: Json | null
          user_id: string
          verified: boolean | null
        }
        Insert: {
          blog_post_id?: string | null
          claim?: string | null
          concern_level?: string | null
          created_at?: string
          id?: string
          suggested_sources?: Json | null
          user_id: string
          verified?: boolean | null
        }
        Update: {
          blog_post_id?: string | null
          claim?: string | null
          concern_level?: string | null
          created_at?: string
          id?: string
          suggested_sources?: Json | null
          user_id?: string
          verified?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "fact_check_flags_blog_post_id_fkey"
            columns: ["blog_post_id"]
            isOneToOne: false
            referencedRelation: "blog_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      generations: {
        Row: {
          config: Json | null
          created_at: string
          id: string
          input_preview: string | null
          is_draft: boolean
          output_full: string | null
          output_preview: string | null
          tool: string
          user_id: string
        }
        Insert: {
          config?: Json | null
          created_at?: string
          id?: string
          input_preview?: string | null
          is_draft?: boolean
          output_full?: string | null
          output_preview?: string | null
          tool: string
          user_id: string
        }
        Update: {
          config?: Json | null
          created_at?: string
          id?: string
          input_preview?: string | null
          is_draft?: boolean
          output_full?: string | null
          output_preview?: string | null
          tool?: string
          user_id?: string
        }
        Relationships: []
      }
      product_comparisons: {
        Row: {
          compared_products: Json
          comparison_table: Json | null
          created_at: string
          id: string
          review_id: string | null
          user_id: string
          winner_badges: Json | null
        }
        Insert: {
          compared_products?: Json
          comparison_table?: Json | null
          created_at?: string
          id?: string
          review_id?: string | null
          user_id: string
          winner_badges?: Json | null
        }
        Update: {
          compared_products?: Json
          comparison_table?: Json | null
          created_at?: string
          id?: string
          review_id?: string | null
          user_id?: string
          winner_badges?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "product_comparisons_review_id_fkey"
            columns: ["review_id"]
            isOneToOne: false
            referencedRelation: "affiliate_reviews"
            referencedColumns: ["id"]
          },
        ]
      }
      seo_metadata: {
        Row: {
          blog_post_id: string | null
          created_at: string
          focus_keyword: string | null
          id: string
          meta_description: string | null
          meta_title: string | null
          seo_analysis: Json | null
          title_variations: Json | null
          user_id: string
        }
        Insert: {
          blog_post_id?: string | null
          created_at?: string
          focus_keyword?: string | null
          id?: string
          meta_description?: string | null
          meta_title?: string | null
          seo_analysis?: Json | null
          title_variations?: Json | null
          user_id: string
        }
        Update: {
          blog_post_id?: string | null
          created_at?: string
          focus_keyword?: string | null
          id?: string
          meta_description?: string | null
          meta_title?: string | null
          seo_analysis?: Json | null
          title_variations?: Json | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "seo_metadata_blog_post_id_fkey"
            columns: ["blog_post_id"]
            isOneToOne: false
            referencedRelation: "blog_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      tool_configurations: {
        Row: {
          config: Json
          created_at: string
          favorite_name: string | null
          id: string
          is_draft: boolean
          is_favorite: boolean
          tool: string
          updated_at: string
          user_id: string
        }
        Insert: {
          config?: Json
          created_at?: string
          favorite_name?: string | null
          id?: string
          is_draft?: boolean
          is_favorite?: boolean
          tool: string
          updated_at?: string
          user_id: string
        }
        Update: {
          config?: Json
          created_at?: string
          favorite_name?: string | null
          id?: string
          is_draft?: boolean
          is_favorite?: boolean
          tool?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_subscriptions: {
        Row: {
          created_at: string
          generation_limit: number
          generations_today: number
          id: string
          is_trial_active: boolean
          last_generation_date: string | null
          last_word_reset: string | null
          plan: string
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          trial_ends_at: string | null
          trial_started_at: string | null
          updated_at: string
          user_id: string
          word_limit: number
          words_used_this_month: number
        }
        Insert: {
          created_at?: string
          generation_limit?: number
          generations_today?: number
          id?: string
          is_trial_active?: boolean
          last_generation_date?: string | null
          last_word_reset?: string | null
          plan?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          trial_ends_at?: string | null
          trial_started_at?: string | null
          updated_at?: string
          user_id: string
          word_limit?: number
          words_used_this_month?: number
        }
        Update: {
          created_at?: string
          generation_limit?: number
          generations_today?: number
          id?: string
          is_trial_active?: boolean
          last_generation_date?: string | null
          last_word_reset?: string | null
          plan?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          trial_ends_at?: string | null
          trial_started_at?: string | null
          updated_at?: string
          user_id?: string
          word_limit?: number
          words_used_this_month?: number
        }
        Relationships: []
      }
      visual_content_suggestions: {
        Row: {
          alt_text: string | null
          blog_post_id: string | null
          created_at: string
          id: string
          image_number: number | null
          image_prompt: string | null
          placement: string | null
          type: string | null
          user_id: string
        }
        Insert: {
          alt_text?: string | null
          blog_post_id?: string | null
          created_at?: string
          id?: string
          image_number?: number | null
          image_prompt?: string | null
          placement?: string | null
          type?: string | null
          user_id: string
        }
        Update: {
          alt_text?: string | null
          blog_post_id?: string | null
          created_at?: string
          id?: string
          image_number?: number | null
          image_prompt?: string | null
          placement?: string | null
          type?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "visual_content_suggestions_blog_post_id_fkey"
            columns: ["blog_post_id"]
            isOneToOne: false
            referencedRelation: "blog_posts"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
