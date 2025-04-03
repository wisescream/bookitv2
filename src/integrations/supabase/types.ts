export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      bookings: {
        Row: {
          booking_date: string
          booking_time: string
          created_at: string | null
          guests: number
          id: string
          restaurant_id: string
          status: string
          user_id: string
        }
        Insert: {
          booking_date: string
          booking_time: string
          created_at?: string | null
          guests?: number
          id?: string
          restaurant_id: string
          status?: string
          user_id: string
        }
        Update: {
          booking_date?: string
          booking_time?: string
          created_at?: string | null
          guests?: number
          id?: string
          restaurant_id?: string
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookings_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
        ]
      }
      business_accounts: {
        Row: {
          address: string | null
          created_at: string
          description: string | null
          email: string
          id: string
          logo_url: string | null
          name: string
          phone: string | null
          updated_at: string
        }
        Insert: {
          address?: string | null
          created_at?: string
          description?: string | null
          email: string
          id?: string
          logo_url?: string | null
          name: string
          phone?: string | null
          updated_at?: string
        }
        Update: {
          address?: string | null
          created_at?: string
          description?: string | null
          email?: string
          id?: string
          logo_url?: string | null
          name?: string
          phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      business_services: {
        Row: {
          business_id: string
          created_at: string
          description: string | null
          duration: number | null
          id: string
          name: string
          price: number | null
          updated_at: string
        }
        Insert: {
          business_id: string
          created_at?: string
          description?: string | null
          duration?: number | null
          id?: string
          name: string
          price?: number | null
          updated_at?: string
        }
        Update: {
          business_id?: string
          created_at?: string
          description?: string | null
          duration?: number | null
          id?: string
          name?: string
          price?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "business_services_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "business_accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      food_items: {
        Row: {
          category: string
          created_at: string | null
          description: string | null
          id: string
          image_url: string | null
          name: string
          price: number
          restaurant_id: string
        }
        Insert: {
          category: string
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          name: string
          price: number
          restaurant_id: string
        }
        Update: {
          category?: string
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          name?: string
          price?: number
          restaurant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "food_items_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
        ]
      }
      hotel_bookings: {
        Row: {
          check_in_date: string
          check_out_date: string
          created_at: string | null
          guests: number
          hotel_id: string
          id: string
          status: string
          user_id: string
        }
        Insert: {
          check_in_date: string
          check_out_date: string
          created_at?: string | null
          guests?: number
          hotel_id: string
          id?: string
          status?: string
          user_id: string
        }
        Update: {
          check_in_date?: string
          check_out_date?: string
          created_at?: string | null
          guests?: number
          hotel_id?: string
          id?: string
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "hotel_bookings_hotel_id_fkey"
            columns: ["hotel_id"]
            isOneToOne: false
            referencedRelation: "hotels"
            referencedColumns: ["id"]
          },
        ]
      }
      hotels: {
        Row: {
          address: string
          category: string | null
          city: string
          created_at: string | null
          description: string | null
          id: string
          image_url: string | null
          name: string
          price_per_night: number
          rating: number | null
          tripadvisor_last_updated: string | null
          tripadvisor_rating: number | null
          tripadvisor_reviews_count: number | null
        }
        Insert: {
          address: string
          category?: string | null
          city: string
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          name: string
          price_per_night: number
          rating?: number | null
          tripadvisor_last_updated?: string | null
          tripadvisor_rating?: number | null
          tripadvisor_reviews_count?: number | null
        }
        Update: {
          address?: string
          category?: string | null
          city?: string
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          name?: string
          price_per_night?: number
          rating?: number | null
          tripadvisor_last_updated?: string | null
          tripadvisor_rating?: number | null
          tripadvisor_reviews_count?: number | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          id: string
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      restaurants: {
        Row: {
          address: string
          category: string | null
          city: string
          close_time: string
          created_at: string | null
          id: string
          image_url: string | null
          name: string
          open_time: string
          rating: number | null
          tripadvisor_last_updated: string | null
          tripadvisor_rating: number | null
          tripadvisor_reviews_count: number | null
        }
        Insert: {
          address: string
          category?: string | null
          city: string
          close_time: string
          created_at?: string | null
          id?: string
          image_url?: string | null
          name: string
          open_time: string
          rating?: number | null
          tripadvisor_last_updated?: string | null
          tripadvisor_rating?: number | null
          tripadvisor_reviews_count?: number | null
        }
        Update: {
          address?: string
          category?: string | null
          city?: string
          close_time?: string
          created_at?: string | null
          id?: string
          image_url?: string | null
          name?: string
          open_time?: string
          rating?: number | null
          tripadvisor_last_updated?: string | null
          tripadvisor_rating?: number | null
          tripadvisor_reviews_count?: number | null
        }
        Relationships: []
      }
      spa_bookings: {
        Row: {
          booking_date: string
          booking_time: string
          created_at: string | null
          id: string
          service_type: string
          spa_id: string
          status: string
          user_id: string
        }
        Insert: {
          booking_date: string
          booking_time: string
          created_at?: string | null
          id?: string
          service_type: string
          spa_id: string
          status?: string
          user_id: string
        }
        Update: {
          booking_date?: string
          booking_time?: string
          created_at?: string | null
          id?: string
          service_type?: string
          spa_id?: string
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "spa_bookings_spa_id_fkey"
            columns: ["spa_id"]
            isOneToOne: false
            referencedRelation: "spas"
            referencedColumns: ["id"]
          },
        ]
      }
      spas: {
        Row: {
          address: string
          category: string | null
          city: string
          created_at: string | null
          description: string | null
          id: string
          image_url: string | null
          name: string
          price_per_session: number
          rating: number | null
          tripadvisor_last_updated: string | null
          tripadvisor_rating: number | null
          tripadvisor_reviews_count: number | null
        }
        Insert: {
          address: string
          category?: string | null
          city: string
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          name: string
          price_per_session: number
          rating?: number | null
          tripadvisor_last_updated?: string | null
          tripadvisor_rating?: number | null
          tripadvisor_reviews_count?: number | null
        }
        Update: {
          address?: string
          category?: string | null
          city?: string
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          name?: string
          price_per_session?: number
          rating?: number | null
          tripadvisor_last_updated?: string | null
          tripadvisor_rating?: number | null
          tripadvisor_reviews_count?: number | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          business_id: string | null
          created_at: string
          id: string
          role: string
          user_id: string
        }
        Insert: {
          business_id?: string | null
          created_at?: string
          id?: string
          role: string
          user_id: string
        }
        Update: {
          business_id?: string | null
          created_at?: string
          id?: string
          role?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "business_accounts"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          role: string
        }
        Returns: boolean
      }
      is_business_member: {
        Args: {
          business_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
