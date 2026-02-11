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
