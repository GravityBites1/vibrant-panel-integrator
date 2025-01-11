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
      ad_campaign_metrics: {
        Row: {
          budget_range_end: number
          budget_range_start: number
          created_at: string | null
          estimated_menu_visits: number
          estimated_orders_max: number
          estimated_orders_min: number
          estimated_reach_max: number
          estimated_reach_min: number
          estimated_sales_max: number
          estimated_sales_min: number
          id: string
        }
        Insert: {
          budget_range_end: number
          budget_range_start: number
          created_at?: string | null
          estimated_menu_visits: number
          estimated_orders_max: number
          estimated_orders_min: number
          estimated_reach_max: number
          estimated_reach_min: number
          estimated_sales_max: number
          estimated_sales_min: number
          id?: string
        }
        Update: {
          budget_range_end?: number
          budget_range_start?: number
          created_at?: string | null
          estimated_menu_visits?: number
          estimated_orders_max?: number
          estimated_orders_min?: number
          estimated_reach_max?: number
          estimated_reach_min?: number
          estimated_sales_max?: number
          estimated_sales_min?: number
          id?: string
        }
        Relationships: []
      }
      ad_campaign_parameters: {
        Row: {
          aov: number
          conversion_rate: number
          cpc: number
          created_at: string | null
          ctr: number
          id: string
          is_active: boolean | null
          updated_at: string | null
        }
        Insert: {
          aov: number
          conversion_rate: number
          cpc: number
          created_at?: string | null
          ctr: number
          id?: string
          is_active?: boolean | null
          updated_at?: string | null
        }
        Update: {
          aov?: number
          conversion_rate?: number
          cpc?: number
          created_at?: string | null
          ctr?: number
          id?: string
          is_active?: boolean | null
          updated_at?: string | null
        }
        Relationships: []
      }
      ad_campaigns: {
        Row: {
          bid_amount: number
          billing_type: string
          budget_amount: number
          budget_type: string
          created_at: string | null
          description: string | null
          end_date: string | null
          id: string
          name: string
          restaurant_id: string | null
          spent_amount: number | null
          start_date: string | null
          status: string
          targeting: Json
          updated_at: string | null
        }
        Insert: {
          bid_amount: number
          billing_type: string
          budget_amount: number
          budget_type: string
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          name: string
          restaurant_id?: string | null
          spent_amount?: number | null
          start_date?: string | null
          status?: string
          targeting?: Json
          updated_at?: string | null
        }
        Update: {
          bid_amount?: number
          billing_type?: string
          budget_amount?: number
          budget_type?: string
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          name?: string
          restaurant_id?: string | null
          spent_amount?: number | null
          start_date?: string | null
          status?: string
          targeting?: Json
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ad_campaigns_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "stores"
            referencedColumns: ["id"]
          },
        ]
      }
      ad_clicks: {
        Row: {
          campaign_id: string | null
          content_id: string | null
          created_at: string | null
          id: string
          location: unknown | null
          user_id: string | null
        }
        Insert: {
          campaign_id?: string | null
          content_id?: string | null
          created_at?: string | null
          id?: string
          location?: unknown | null
          user_id?: string | null
        }
        Update: {
          campaign_id?: string | null
          content_id?: string | null
          created_at?: string | null
          id?: string
          location?: unknown | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ad_clicks_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "ad_campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ad_clicks_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "ad_contents"
            referencedColumns: ["id"]
          },
        ]
      }
      ad_contents: {
        Row: {
          action_url: string | null
          campaign_id: string | null
          created_at: string | null
          description: string | null
          id: string
          image_url: string | null
          title: string
          type: string
          updated_at: string | null
        }
        Insert: {
          action_url?: string | null
          campaign_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          title: string
          type: string
          updated_at?: string | null
        }
        Update: {
          action_url?: string | null
          campaign_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          title?: string
          type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ad_contents_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "ad_campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
      ad_conversions: {
        Row: {
          campaign_id: string | null
          click_id: string | null
          content_id: string | null
          conversion_value: number
          created_at: string | null
          id: string
          order_id: string | null
        }
        Insert: {
          campaign_id?: string | null
          click_id?: string | null
          content_id?: string | null
          conversion_value: number
          created_at?: string | null
          id?: string
          order_id?: string | null
        }
        Update: {
          campaign_id?: string | null
          click_id?: string | null
          content_id?: string | null
          conversion_value?: number
          created_at?: string | null
          id?: string
          order_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ad_conversions_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "ad_campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ad_conversions_click_id_fkey"
            columns: ["click_id"]
            isOneToOne: false
            referencedRelation: "ad_clicks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ad_conversions_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "ad_contents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ad_conversions_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      ad_impressions: {
        Row: {
          campaign_id: string | null
          content_id: string | null
          created_at: string | null
          id: string
          location: unknown | null
          user_id: string | null
        }
        Insert: {
          campaign_id?: string | null
          content_id?: string | null
          created_at?: string | null
          id?: string
          location?: unknown | null
          user_id?: string | null
        }
        Update: {
          campaign_id?: string | null
          content_id?: string | null
          created_at?: string | null
          id?: string
          location?: unknown | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ad_impressions_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "ad_campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ad_impressions_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "ad_contents"
            referencedColumns: ["id"]
          },
        ]
      }
      ad_payments: {
        Row: {
          amount: number
          campaign_id: string | null
          created_at: string | null
          id: string
          payment_method: string | null
          status: string
          transaction_id: string | null
          updated_at: string | null
        }
        Insert: {
          amount: number
          campaign_id?: string | null
          created_at?: string | null
          id?: string
          payment_method?: string | null
          status: string
          transaction_id?: string | null
          updated_at?: string | null
        }
        Update: {
          amount?: number
          campaign_id?: string | null
          created_at?: string | null
          id?: string
          payment_method?: string | null
          status?: string
          transaction_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ad_payments_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "ad_campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
      admin_audit_logs: {
        Row: {
          action: string
          admin_id: string
          changes: Json | null
          created_at: string | null
          entity_id: string | null
          entity_type: string
          id: string
          ip_address: string | null
          user_agent: string | null
        }
        Insert: {
          action: string
          admin_id: string
          changes?: Json | null
          created_at?: string | null
          entity_id?: string | null
          entity_type: string
          id?: string
          ip_address?: string | null
          user_agent?: string | null
        }
        Update: {
          action?: string
          admin_id?: string
          changes?: Json | null
          created_at?: string | null
          entity_id?: string | null
          entity_type?: string
          id?: string
          ip_address?: string | null
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "admin_audit_logs_admin_id_fkey"
            columns: ["admin_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      admin_earnings: {
        Row: {
          created_at: string | null
          id: string
          order_id: string
          platform_fee_amount: number
          settled_at: string | null
          status: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          order_id: string
          platform_fee_amount: number
          settled_at?: string | null
          status?: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          order_id?: string
          platform_fee_amount?: number
          settled_at?: string | null
          status?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "admin_earnings_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_log_categories: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      bank_accounts: {
        Row: {
          account_holder_name: string
          account_number: string
          bank_name: string
          created_at: string | null
          id: string
          ifsc_code: string
          is_verified: boolean | null
          partner_id: string
          updated_at: string | null
        }
        Insert: {
          account_holder_name: string
          account_number: string
          bank_name: string
          created_at?: string | null
          id?: string
          ifsc_code: string
          is_verified?: boolean | null
          partner_id: string
          updated_at?: string | null
        }
        Update: {
          account_holder_name?: string
          account_number?: string
          bank_name?: string
          created_at?: string | null
          id?: string
          ifsc_code?: string
          is_verified?: boolean | null
          partner_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bank_accounts_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      bank_verification_status: {
        Row: {
          bank_account_id: string
          created_at: string | null
          failure_reason: string | null
          id: string
          status: string
          updated_at: string | null
          verification_id: string | null
          verified_account_number: string | null
          verified_ifsc: string | null
          verified_name: string | null
        }
        Insert: {
          bank_account_id: string
          created_at?: string | null
          failure_reason?: string | null
          id?: string
          status?: string
          updated_at?: string | null
          verification_id?: string | null
          verified_account_number?: string | null
          verified_ifsc?: string | null
          verified_name?: string | null
        }
        Update: {
          bank_account_id?: string
          created_at?: string | null
          failure_reason?: string | null
          id?: string
          status?: string
          updated_at?: string | null
          verification_id?: string | null
          verified_account_number?: string | null
          verified_ifsc?: string | null
          verified_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bank_verification_status_bank_account_id_fkey"
            columns: ["bank_account_id"]
            isOneToOne: false
            referencedRelation: "bank_accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      banners: {
        Row: {
          created_at: string | null
          end_date: string
          id: string
          image_url: string
          is_active: boolean | null
          link_url: string | null
          start_date: string
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          end_date: string
          id?: string
          image_url: string
          is_active?: boolean | null
          link_url?: string | null
          start_date: string
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          end_date?: string
          id?: string
          image_url?: string
          is_active?: boolean | null
          link_url?: string | null
          start_date?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      cache_invalidations: {
        Row: {
          id: string
          invalidated_at: string | null
          resource_id: string
          resource_type: string
        }
        Insert: {
          id?: string
          invalidated_at?: string | null
          resource_id: string
          resource_type: string
        }
        Update: {
          id?: string
          invalidated_at?: string | null
          resource_id?: string
          resource_type?: string
        }
        Relationships: []
      }
      chat_messages: {
        Row: {
          attachments: Json | null
          content: string
          created_at: string | null
          id: string
          is_read: boolean | null
          room_id: string
          sender_id: string
        }
        Insert: {
          attachments?: Json | null
          content: string
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          room_id: string
          sender_id: string
        }
        Update: {
          attachments?: Json | null
          content?: string
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          room_id?: string
          sender_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_messages_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "chat_rooms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chat_messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_rooms: {
        Row: {
          agent_id: string | null
          created_at: string | null
          id: string
          last_message_at: string | null
          metadata: Json | null
          status: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          agent_id?: string | null
          created_at?: string | null
          id?: string
          last_message_at?: string | null
          metadata?: Json | null
          status: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          agent_id?: string | null
          created_at?: string | null
          id?: string
          last_message_at?: string | null
          metadata?: Json | null
          status?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_rooms_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chat_rooms_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      cod_balance_adjustments: {
        Row: {
          amount: number
          created_at: string | null
          id: string
          partner_id: string
          reason: string
          reference_id: string | null
          type: string
        }
        Insert: {
          amount: number
          created_at?: string | null
          id?: string
          partner_id: string
          reason: string
          reference_id?: string | null
          type: string
        }
        Update: {
          amount?: number
          created_at?: string | null
          id?: string
          partner_id?: string
          reason?: string
          reference_id?: string | null
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "cod_balance_adjustments_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      cod_collections: {
        Row: {
          amount: number
          collected_at: string
          created_at: string | null
          deposit_id: string | null
          id: string
          order_id: string
          partner_id: string
          status: string
          updated_at: string | null
        }
        Insert: {
          amount: number
          collected_at?: string
          created_at?: string | null
          deposit_id?: string | null
          id?: string
          order_id: string
          partner_id: string
          status: string
          updated_at?: string | null
        }
        Update: {
          amount?: number
          collected_at?: string
          created_at?: string | null
          deposit_id?: string | null
          id?: string
          order_id?: string
          partner_id?: string
          status?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cod_collections_deposit_id_fkey"
            columns: ["deposit_id"]
            isOneToOne: false
            referencedRelation: "cod_deposits"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cod_collections_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: true
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cod_collections_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      cod_deposits: {
        Row: {
          collection_count: number
          created_at: string | null
          deposit_date: string | null
          id: string
          partner_id: string
          reference_id: string | null
          status: string
          total_amount: number
          updated_at: string | null
        }
        Insert: {
          collection_count: number
          created_at?: string | null
          deposit_date?: string | null
          id?: string
          partner_id: string
          reference_id?: string | null
          status: string
          total_amount: number
          updated_at?: string | null
        }
        Update: {
          collection_count?: number
          created_at?: string | null
          deposit_date?: string | null
          id?: string
          partner_id?: string
          reference_id?: string | null
          status?: string
          total_amount?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cod_deposits_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      cod_settlement_deductions: {
        Row: {
          amount: number
          created_at: string | null
          id: string
          partner_id: string
          payout_request_id: string
          processed_at: string | null
          settlement_id: string | null
          status: string
        }
        Insert: {
          amount: number
          created_at?: string | null
          id?: string
          partner_id: string
          payout_request_id: string
          processed_at?: string | null
          settlement_id?: string | null
          status: string
        }
        Update: {
          amount?: number
          created_at?: string | null
          id?: string
          partner_id?: string
          payout_request_id?: string
          processed_at?: string | null
          settlement_id?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "cod_settlement_deductions_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cod_settlement_deductions_payout_request_id_fkey"
            columns: ["payout_request_id"]
            isOneToOne: false
            referencedRelation: "payout_requests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cod_settlement_deductions_settlement_id_fkey"
            columns: ["settlement_id"]
            isOneToOne: false
            referencedRelation: "cod_settlements"
            referencedColumns: ["id"]
          },
        ]
      }
      cod_settlements: {
        Row: {
          collection_count: number
          created_at: string | null
          id: string
          partner_id: string
          reference_id: string | null
          settlement_date: string | null
          status: string
          total_amount: number
          updated_at: string | null
        }
        Insert: {
          collection_count: number
          created_at?: string | null
          id?: string
          partner_id: string
          reference_id?: string | null
          settlement_date?: string | null
          status: string
          total_amount: number
          updated_at?: string | null
        }
        Update: {
          collection_count?: number
          created_at?: string | null
          id?: string
          partner_id?: string
          reference_id?: string | null
          settlement_date?: string | null
          status?: string
          total_amount?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cod_settlements_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      commission_earnings: {
        Row: {
          base_amount: number
          commission_amount: number
          commission_rate: number
          created_at: string | null
          id: string
          order_id: string
          restaurant_id: string
        }
        Insert: {
          base_amount: number
          commission_amount: number
          commission_rate: number
          created_at?: string | null
          id?: string
          order_id: string
          restaurant_id: string
        }
        Update: {
          base_amount?: number
          commission_amount?: number
          commission_rate?: number
          created_at?: string | null
          id?: string
          order_id?: string
          restaurant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "commission_earnings_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "commission_earnings_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "stores"
            referencedColumns: ["id"]
          },
        ]
      }
      commission_rates: {
        Row: {
          base_rate: number
          category: string
          created_at: string | null
          id: string
          tier_1_rate: number | null
          tier_1_threshold: number | null
          tier_2_rate: number | null
          tier_2_threshold: number | null
          updated_at: string | null
        }
        Insert: {
          base_rate: number
          category: string
          created_at?: string | null
          id?: string
          tier_1_rate?: number | null
          tier_1_threshold?: number | null
          tier_2_rate?: number | null
          tier_2_threshold?: number | null
          updated_at?: string | null
        }
        Update: {
          base_rate?: number
          category?: string
          created_at?: string | null
          id?: string
          tier_1_rate?: number | null
          tier_1_threshold?: number | null
          tier_2_rate?: number | null
          tier_2_threshold?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      delivery_fee_settings: {
        Row: {
          base_fee: number
          created_at: string | null
          id: string
          max_fee: number
          min_fee: number
          per_km_charge: number
          surge_multiplier_cap: number
          updated_at: string | null
        }
        Insert: {
          base_fee: number
          created_at?: string | null
          id?: string
          max_fee: number
          min_fee: number
          per_km_charge: number
          surge_multiplier_cap: number
          updated_at?: string | null
        }
        Update: {
          base_fee?: number
          created_at?: string | null
          id?: string
          max_fee?: number
          min_fee?: number
          per_km_charge?: number
          surge_multiplier_cap?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      delivery_incentives: {
        Row: {
          amount: number
          created_at: string | null
          criteria: Json
          description: string
          id: string
          partner_id: string
          type: string
        }
        Insert: {
          amount: number
          created_at?: string | null
          criteria: Json
          description: string
          id?: string
          partner_id: string
          type: string
        }
        Update: {
          amount?: number
          created_at?: string | null
          criteria?: Json
          description?: string
          id?: string
          partner_id?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "delivery_incentives_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      delivery_penalties: {
        Row: {
          amount: number
          created_at: string | null
          description: string
          id: string
          order_id: string | null
          partner_id: string
          type: string
        }
        Insert: {
          amount: number
          created_at?: string | null
          description: string
          id?: string
          order_id?: string | null
          partner_id: string
          type: string
        }
        Update: {
          amount?: number
          created_at?: string | null
          description?: string
          id?: string
          order_id?: string | null
          partner_id?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "delivery_penalties_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "delivery_penalties_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      delivery_ratings: {
        Row: {
          created_at: string | null
          customer_id: string
          feedback: string | null
          id: string
          order_id: string
          partner_id: string
          rating: number
        }
        Insert: {
          created_at?: string | null
          customer_id: string
          feedback?: string | null
          id?: string
          order_id: string
          partner_id: string
          rating: number
        }
        Update: {
          created_at?: string | null
          customer_id?: string
          feedback?: string | null
          id?: string
          order_id?: string
          partner_id?: string
          rating?: number
        }
        Relationships: [
          {
            foreignKeyName: "delivery_ratings_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "delivery_ratings_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: true
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "delivery_ratings_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      dietary_preferences: {
        Row: {
          allergies: string[] | null
          created_at: string | null
          excluded_ingredients: string[] | null
          id: string
          is_halal: boolean | null
          is_vegan: boolean | null
          is_vegetarian: boolean | null
          spice_level: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          allergies?: string[] | null
          created_at?: string | null
          excluded_ingredients?: string[] | null
          id?: string
          is_halal?: boolean | null
          is_vegan?: boolean | null
          is_vegetarian?: boolean | null
          spice_level?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          allergies?: string[] | null
          created_at?: string | null
          excluded_ingredients?: string[] | null
          id?: string
          is_halal?: boolean | null
          is_vegan?: boolean | null
          is_vegetarian?: boolean | null
          spice_level?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "dietary_preferences_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      face_verification_history: {
        Row: {
          attempt_number: number
          created_at: string | null
          id: string
          partner_id: string
          session_id: string
          status: string
        }
        Insert: {
          attempt_number: number
          created_at?: string | null
          id?: string
          partner_id: string
          session_id: string
          status: string
        }
        Update: {
          attempt_number?: number
          created_at?: string | null
          id?: string
          partner_id?: string
          session_id?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "face_verification_history_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "face_verification_history_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "face_verification_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      face_verification_sessions: {
        Row: {
          attempts: number
          created_at: string | null
          expires_at: string
          id: string
          last_attempt_at: string | null
          partner_id: string
          status: string
          verified_at: string | null
        }
        Insert: {
          attempts?: number
          created_at?: string | null
          expires_at: string
          id?: string
          last_attempt_at?: string | null
          partner_id: string
          status: string
          verified_at?: string | null
        }
        Update: {
          attempts?: number
          created_at?: string | null
          expires_at?: string
          id?: string
          last_attempt_at?: string | null
          partner_id?: string
          status?: string
          verified_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "face_verification_sessions_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      fcm_tokens: {
        Row: {
          created_at: string | null
          device_id: string
          id: string
          token: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          device_id: string
          id?: string
          token: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          device_id?: string
          id?: string
          token?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fcm_tokens_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      fraud_blocks: {
        Row: {
          blocked_at: string | null
          id: string
          notes: string | null
          reason: string
          restaurant_id: string
          reviewed_by: string | null
          unblocked_at: string | null
        }
        Insert: {
          blocked_at?: string | null
          id?: string
          notes?: string | null
          reason: string
          restaurant_id: string
          reviewed_by?: string | null
          unblocked_at?: string | null
        }
        Update: {
          blocked_at?: string | null
          id?: string
          notes?: string | null
          reason?: string
          restaurant_id?: string
          reviewed_by?: string | null
          unblocked_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fraud_blocks_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "stores"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fraud_blocks_reviewed_by_fkey"
            columns: ["reviewed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      fraud_rules: {
        Row: {
          created_at: string | null
          description: string
          id: string
          is_active: boolean | null
          severity: string
          threshold: number
          type: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description: string
          id?: string
          is_active?: boolean | null
          severity: string
          threshold: number
          type: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string
          id?: string
          is_active?: boolean | null
          severity?: string
          threshold?: number
          type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      fraud_violations: {
        Row: {
          created_at: string | null
          id: string
          metrics: Json
          restaurant_id: string
          risk_score: number
          rule_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          metrics: Json
          restaurant_id: string
          risk_score: number
          rule_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          metrics?: Json
          restaurant_id?: string
          risk_score?: number
          rule_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fraud_violations_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "stores"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fraud_violations_rule_id_fkey"
            columns: ["rule_id"]
            isOneToOne: false
            referencedRelation: "fraud_rules"
            referencedColumns: ["id"]
          },
        ]
      }
      gst_rates: {
        Row: {
          category: string
          created_at: string | null
          description: string | null
          id: string
          rate: number
          updated_at: string | null
        }
        Insert: {
          category: string
          created_at?: string | null
          description?: string | null
          id?: string
          rate: number
          updated_at?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          description?: string | null
          id?: string
          rate?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      inventory_alerts: {
        Row: {
          created_at: string | null
          id: string
          inventory_item_id: string
          is_resolved: boolean | null
          message: string
          restaurant_id: string
          type: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          inventory_item_id: string
          is_resolved?: boolean | null
          message: string
          restaurant_id: string
          type: string
        }
        Update: {
          created_at?: string | null
          id?: string
          inventory_item_id?: string
          is_resolved?: boolean | null
          message?: string
          restaurant_id?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "inventory_alerts_inventory_item_id_fkey"
            columns: ["inventory_item_id"]
            isOneToOne: false
            referencedRelation: "inventory_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inventory_alerts_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "stores"
            referencedColumns: ["id"]
          },
        ]
      }
      inventory_items: {
        Row: {
          created_at: string | null
          id: string
          is_tracking_enabled: boolean | null
          last_updated: string | null
          low_stock_threshold: number | null
          menu_item_id: string
          quantity: number
          restaurant_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_tracking_enabled?: boolean | null
          last_updated?: string | null
          low_stock_threshold?: number | null
          menu_item_id: string
          quantity?: number
          restaurant_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_tracking_enabled?: boolean | null
          last_updated?: string | null
          low_stock_threshold?: number | null
          menu_item_id?: string
          quantity?: number
          restaurant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "inventory_items_menu_item_id_fkey"
            columns: ["menu_item_id"]
            isOneToOne: false
            referencedRelation: "menu_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inventory_items_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "stores"
            referencedColumns: ["id"]
          },
        ]
      }
      language_preferences: {
        Row: {
          created_at: string | null
          id: string
          language: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          language: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          language?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "language_preferences_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      lead_partner_onboarding: {
        Row: {
          aadhar_number: string | null
          aadhar_verified: boolean | null
          address: string | null
          bank_account_holder_name: string | null
          bank_account_number: string | null
          bank_ifsc_code: string | null
          bank_name: string | null
          bank_verified: boolean | null
          city: string | null
          created_at: string | null
          date_of_birth: string | null
          email: string | null
          email_verified: boolean | null
          id: string
          location: unknown | null
          onboarding_fee_amount: number | null
          onboarding_fee_paid: boolean | null
          pan_number: string | null
          pan_verified: boolean | null
          payment_reference: string | null
          phone_number: string | null
          phone_verified: boolean | null
          postal_code: string | null
          profile_image_url: string | null
          state: string | null
          status: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          aadhar_number?: string | null
          aadhar_verified?: boolean | null
          address?: string | null
          bank_account_holder_name?: string | null
          bank_account_number?: string | null
          bank_ifsc_code?: string | null
          bank_name?: string | null
          bank_verified?: boolean | null
          city?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          email?: string | null
          email_verified?: boolean | null
          id?: string
          location?: unknown | null
          onboarding_fee_amount?: number | null
          onboarding_fee_paid?: boolean | null
          pan_number?: string | null
          pan_verified?: boolean | null
          payment_reference?: string | null
          phone_number?: string | null
          phone_verified?: boolean | null
          postal_code?: string | null
          profile_image_url?: string | null
          state?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          aadhar_number?: string | null
          aadhar_verified?: boolean | null
          address?: string | null
          bank_account_holder_name?: string | null
          bank_account_number?: string | null
          bank_ifsc_code?: string | null
          bank_name?: string | null
          bank_verified?: boolean | null
          city?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          email?: string | null
          email_verified?: boolean | null
          id?: string
          location?: unknown | null
          onboarding_fee_amount?: number | null
          onboarding_fee_paid?: boolean | null
          pan_number?: string | null
          pan_verified?: boolean | null
          payment_reference?: string | null
          phone_number?: string | null
          phone_verified?: boolean | null
          postal_code?: string | null
          profile_image_url?: string | null
          state?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      lead_partner_onboarding_payments: {
        Row: {
          amount: number
          created_at: string | null
          id: string
          lead_partner_id: string | null
          payment_method: string | null
          payment_reference: string | null
          payment_status: string
          updated_at: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          id?: string
          lead_partner_id?: string | null
          payment_method?: string | null
          payment_reference?: string | null
          payment_status?: string
          updated_at?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          id?: string
          lead_partner_id?: string | null
          payment_method?: string | null
          payment_reference?: string | null
          payment_status?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lead_partner_onboarding_payments_lead_partner_id_fkey"
            columns: ["lead_partner_id"]
            isOneToOne: false
            referencedRelation: "lead_partner_onboarding"
            referencedColumns: ["id"]
          },
        ]
      }
      lead_partner_referrals: {
        Row: {
          available_balance: number | null
          created_at: string | null
          id: string
          lead_partner_id: string | null
          referral_code: string
          total_earnings: number | null
          updated_at: string | null
        }
        Insert: {
          available_balance?: number | null
          created_at?: string | null
          id?: string
          lead_partner_id?: string | null
          referral_code: string
          total_earnings?: number | null
          updated_at?: string | null
        }
        Update: {
          available_balance?: number | null
          created_at?: string | null
          id?: string
          lead_partner_id?: string | null
          referral_code?: string
          total_earnings?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lead_partner_referrals_lead_partner_id_fkey"
            columns: ["lead_partner_id"]
            isOneToOne: false
            referencedRelation: "lead_partner_onboarding"
            referencedColumns: ["id"]
          },
        ]
      }
      lead_partner_support_messages: {
        Row: {
          attachments: Json | null
          content: string
          created_at: string | null
          id: string
          sender_id: string
          status: Database["public"]["Enums"]["support_message_status"] | null
          ticket_id: string
        }
        Insert: {
          attachments?: Json | null
          content: string
          created_at?: string | null
          id?: string
          sender_id: string
          status?: Database["public"]["Enums"]["support_message_status"] | null
          ticket_id: string
        }
        Update: {
          attachments?: Json | null
          content?: string
          created_at?: string | null
          id?: string
          sender_id?: string
          status?: Database["public"]["Enums"]["support_message_status"] | null
          ticket_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "lead_partner_support_messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lead_partner_support_messages_ticket_id_fkey"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "lead_partner_support_tickets"
            referencedColumns: ["id"]
          },
        ]
      }
      lead_partner_support_tickets: {
        Row: {
          admin_assigned_id: string | null
          category: string
          created_at: string | null
          description: string
          id: string
          partner_id: string
          priority: string
          resolved_at: string | null
          status: string
          title: string
          updated_at: string | null
        }
        Insert: {
          admin_assigned_id?: string | null
          category?: string
          created_at?: string | null
          description: string
          id?: string
          partner_id: string
          priority?: string
          resolved_at?: string | null
          status?: string
          title: string
          updated_at?: string | null
        }
        Update: {
          admin_assigned_id?: string | null
          category?: string
          created_at?: string | null
          description?: string
          id?: string
          partner_id?: string
          priority?: string
          resolved_at?: string | null
          status?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lead_partner_support_tickets_admin_assigned_id_fkey"
            columns: ["admin_assigned_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lead_partner_support_tickets_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "lead_partner_onboarding"
            referencedColumns: ["id"]
          },
        ]
      }
      menu_categories: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
          sort_order: number | null
          store_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          sort_order?: number | null
          store_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          sort_order?: number | null
          store_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "menu_categories_store_id_fkey"
            columns: ["store_id"]
            isOneToOne: false
            referencedRelation: "stores"
            referencedColumns: ["id"]
          },
        ]
      }
      menu_items: {
        Row: {
          category_id: string | null
          created_at: string | null
          customization_options: Json | null
          description: string | null
          id: string
          image_url: string | null
          is_available: boolean | null
          is_vegetarian: boolean | null
          name: string
          preparation_time: unknown | null
          price: number
          store_id: string
          updated_at: string | null
        }
        Insert: {
          category_id?: string | null
          created_at?: string | null
          customization_options?: Json | null
          description?: string | null
          id?: string
          image_url?: string | null
          is_available?: boolean | null
          is_vegetarian?: boolean | null
          name: string
          preparation_time?: unknown | null
          price: number
          store_id: string
          updated_at?: string | null
        }
        Update: {
          category_id?: string | null
          created_at?: string | null
          customization_options?: Json | null
          description?: string | null
          id?: string
          image_url?: string | null
          is_available?: boolean | null
          is_vegetarian?: boolean | null
          name?: string
          preparation_time?: unknown | null
          price?: number
          store_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "menu_items_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "menu_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "menu_items_restaurant_id_fkey"
            columns: ["store_id"]
            isOneToOne: false
            referencedRelation: "stores"
            referencedColumns: ["id"]
          },
        ]
      }
      moderation_history: {
        Row: {
          created_at: string | null
          id: string
          moderator_id: string
          new_status: Database["public"]["Enums"]["content_status"]
          old_status: Database["public"]["Enums"]["content_status"]
          queue_id: string
          reason: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          moderator_id: string
          new_status: Database["public"]["Enums"]["content_status"]
          old_status: Database["public"]["Enums"]["content_status"]
          queue_id: string
          reason?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          moderator_id?: string
          new_status?: Database["public"]["Enums"]["content_status"]
          old_status?: Database["public"]["Enums"]["content_status"]
          queue_id?: string
          reason?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "moderation_history_moderator_id_fkey"
            columns: ["moderator_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "moderation_history_queue_id_fkey"
            columns: ["queue_id"]
            isOneToOne: false
            referencedRelation: "moderation_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      moderation_queue: {
        Row: {
          content_id: string
          content_type: Database["public"]["Enums"]["content_type"]
          created_at: string | null
          id: string
          moderated_at: string | null
          moderator_id: string | null
          priority: string
          reason: string | null
          status: Database["public"]["Enums"]["content_status"]
        }
        Insert: {
          content_id: string
          content_type: Database["public"]["Enums"]["content_type"]
          created_at?: string | null
          id?: string
          moderated_at?: string | null
          moderator_id?: string | null
          priority?: string
          reason?: string | null
          status?: Database["public"]["Enums"]["content_status"]
        }
        Update: {
          content_id?: string
          content_type?: Database["public"]["Enums"]["content_type"]
          created_at?: string | null
          id?: string
          moderated_at?: string | null
          moderator_id?: string | null
          priority?: string
          reason?: string | null
          status?: Database["public"]["Enums"]["content_status"]
        }
        Relationships: [
          {
            foreignKeyName: "moderation_queue_moderator_id_fkey"
            columns: ["moderator_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      moderation_rules: {
        Row: {
          action: Database["public"]["Enums"]["content_status"]
          created_at: string | null
          description: string | null
          id: string
          is_active: boolean | null
          is_regex: boolean | null
          name: string
          pattern: string
          updated_at: string | null
        }
        Insert: {
          action: Database["public"]["Enums"]["content_status"]
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          is_regex?: boolean | null
          name: string
          pattern: string
          updated_at?: string | null
        }
        Update: {
          action?: Database["public"]["Enums"]["content_status"]
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          is_regex?: boolean | null
          name?: string
          pattern?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      notification_logs: {
        Row: {
          channel: string
          created_at: string | null
          error: string | null
          id: string
          metadata: Json | null
          recipient_id: string | null
          status: string
          template_id: string | null
        }
        Insert: {
          channel: string
          created_at?: string | null
          error?: string | null
          id?: string
          metadata?: Json | null
          recipient_id?: string | null
          status: string
          template_id?: string | null
        }
        Update: {
          channel?: string
          created_at?: string | null
          error?: string | null
          id?: string
          metadata?: Json | null
          recipient_id?: string | null
          status?: string
          template_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notification_logs_recipient_id_fkey"
            columns: ["recipient_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notification_logs_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "notification_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      notification_preferences: {
        Row: {
          channels: Json
          created_at: string | null
          id: string
          quiet_hours: Json | null
          types: Json
          updated_at: string | null
          user_id: string
        }
        Insert: {
          channels?: Json
          created_at?: string | null
          id?: string
          quiet_hours?: Json | null
          types?: Json
          updated_at?: string | null
          user_id: string
        }
        Update: {
          channels?: Json
          created_at?: string | null
          id?: string
          quiet_hours?: Json | null
          types?: Json
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notification_preferences_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      notification_templates: {
        Row: {
          channel: string
          content: string
          created_at: string | null
          id: string
          is_active: boolean | null
          name: string
          subject: string | null
          type: string
          updated_at: string | null
          variables: string[]
        }
        Insert: {
          channel: string
          content: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          subject?: string | null
          type: string
          updated_at?: string | null
          variables?: string[]
        }
        Update: {
          channel?: string
          content?: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          subject?: string | null
          type?: string
          updated_at?: string | null
          variables?: string[]
        }
        Relationships: []
      }
      order_items: {
        Row: {
          created_at: string | null
          id: string
          menu_item_id: string
          notes: string | null
          order_id: string
          quantity: number
          unit_price: number
        }
        Insert: {
          created_at?: string | null
          id?: string
          menu_item_id: string
          notes?: string | null
          order_id: string
          quantity: number
          unit_price: number
        }
        Update: {
          created_at?: string | null
          id?: string
          menu_item_id?: string
          notes?: string | null
          order_id?: string
          quantity?: number
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_items_menu_item_id_fkey"
            columns: ["menu_item_id"]
            isOneToOne: false
            referencedRelation: "menu_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      order_queue: {
        Row: {
          created_at: string | null
          id: string
          order_id: string
          priority: number
          restaurant_id: string
          status: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          order_id: string
          priority?: number
          restaurant_id: string
          status: string
        }
        Update: {
          created_at?: string | null
          id?: string
          order_id?: string
          priority?: number
          restaurant_id?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "order_queue_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: true
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_queue_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "stores"
            referencedColumns: ["id"]
          },
        ]
      }
      order_status_history: {
        Row: {
          created_at: string | null
          id: string
          metadata: Json | null
          order_id: string
          status: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          metadata?: Json | null
          order_id: string
          status: string
        }
        Update: {
          created_at?: string | null
          id?: string
          metadata?: Json | null
          order_id?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "order_status_history_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      order_tracking: {
        Row: {
          current_location: Json | null
          delivery_partner_id: string | null
          estimated_delivery_time: string | null
          id: string
          order_id: string
          remaining_distance: Json | null
          remaining_time: Json | null
          updated_at: string | null
        }
        Insert: {
          current_location?: Json | null
          delivery_partner_id?: string | null
          estimated_delivery_time?: string | null
          id?: string
          order_id: string
          remaining_distance?: Json | null
          remaining_time?: Json | null
          updated_at?: string | null
        }
        Update: {
          current_location?: Json | null
          delivery_partner_id?: string | null
          estimated_delivery_time?: string | null
          id?: string
          order_id?: string
          remaining_distance?: Json | null
          remaining_time?: Json | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "order_tracking_delivery_partner_id_fkey"
            columns: ["delivery_partner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_tracking_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      order_tracking_history: {
        Row: {
          created_at: string | null
          estimated_delivery_time: string | null
          id: string
          location: Json
          order_id: string
        }
        Insert: {
          created_at?: string | null
          estimated_delivery_time?: string | null
          id?: string
          location: Json
          order_id: string
        }
        Update: {
          created_at?: string | null
          estimated_delivery_time?: string | null
          id?: string
          location?: Json
          order_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "order_tracking_history_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      order_transfer_requests: {
        Row: {
          created_at: string
          id: string
          location: Json
          new_partner_id: string | null
          order_id: string
          original_partner_id: string
          reason: string
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          location: Json
          new_partner_id?: string | null
          order_id: string
          original_partner_id: string
          reason: string
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          location?: Json
          new_partner_id?: string | null
          order_id?: string
          original_partner_id?: string
          reason?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "order_transfer_requests_new_partner_id_fkey"
            columns: ["new_partner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_transfer_requests_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_transfer_requests_original_partner_id_fkey"
            columns: ["original_partner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          actual_delivery_time: string | null
          auto_declined: boolean | null
          cancellation_reason: string | null
          cancelled_at: string | null
          commission_amount: number | null
          commission_rate: number | null
          created_at: string | null
          current_location: Json | null
          customer_id: string
          customer_name: string | null
          delivered_at: string | null
          delivery_address: string
          delivery_fee: number
          delivery_id: string | null
          delivery_instructions: string | null
          delivery_partner_id: string | null
          discount_amount: number | null
          estimated_delivery_time: string | null
          gst_amount: number
          id: string
          order_number: string | null
          packaging_charge: number
          packaging_gst_amount: number
          pickup_otp: string | null
          pickup_otp_attempts: number | null
          pickup_otp_generated_at: string | null
          pickup_otp_status: string | null
          pickup_otp_verified_at: string | null
          platform_fee_amount: number
          preparation_started_at: string | null
          preparation_time: number | null
          promotion_id: string | null
          ready_at: string | null
          response_deadline: string | null
          response_status: string | null
          response_time: string | null
          status: Database["public"]["Enums"]["order_status"]
          status_metadata: Json | null
          store_id: string
          subtotal: number
          total_amount: number
          updated_at: string | null
        }
        Insert: {
          actual_delivery_time?: string | null
          auto_declined?: boolean | null
          cancellation_reason?: string | null
          cancelled_at?: string | null
          commission_amount?: number | null
          commission_rate?: number | null
          created_at?: string | null
          current_location?: Json | null
          customer_id: string
          customer_name?: string | null
          delivered_at?: string | null
          delivery_address: string
          delivery_fee?: number
          delivery_id?: string | null
          delivery_instructions?: string | null
          delivery_partner_id?: string | null
          discount_amount?: number | null
          estimated_delivery_time?: string | null
          gst_amount?: number
          id?: string
          order_number?: string | null
          packaging_charge?: number
          packaging_gst_amount?: number
          pickup_otp?: string | null
          pickup_otp_attempts?: number | null
          pickup_otp_generated_at?: string | null
          pickup_otp_status?: string | null
          pickup_otp_verified_at?: string | null
          platform_fee_amount?: number
          preparation_started_at?: string | null
          preparation_time?: number | null
          promotion_id?: string | null
          ready_at?: string | null
          response_deadline?: string | null
          response_status?: string | null
          response_time?: string | null
          status?: Database["public"]["Enums"]["order_status"]
          status_metadata?: Json | null
          store_id: string
          subtotal?: number
          total_amount: number
          updated_at?: string | null
        }
        Update: {
          actual_delivery_time?: string | null
          auto_declined?: boolean | null
          cancellation_reason?: string | null
          cancelled_at?: string | null
          commission_amount?: number | null
          commission_rate?: number | null
          created_at?: string | null
          current_location?: Json | null
          customer_id?: string
          customer_name?: string | null
          delivered_at?: string | null
          delivery_address?: string
          delivery_fee?: number
          delivery_id?: string | null
          delivery_instructions?: string | null
          delivery_partner_id?: string | null
          discount_amount?: number | null
          estimated_delivery_time?: string | null
          gst_amount?: number
          id?: string
          order_number?: string | null
          packaging_charge?: number
          packaging_gst_amount?: number
          pickup_otp?: string | null
          pickup_otp_attempts?: number | null
          pickup_otp_generated_at?: string | null
          pickup_otp_status?: string | null
          pickup_otp_verified_at?: string | null
          platform_fee_amount?: number
          preparation_started_at?: string | null
          preparation_time?: number | null
          promotion_id?: string | null
          ready_at?: string | null
          response_deadline?: string | null
          response_status?: string | null
          response_time?: string | null
          status?: Database["public"]["Enums"]["order_status"]
          status_metadata?: Json | null
          store_id?: string
          subtotal?: number
          total_amount?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_delivery_partner_id_fkey"
            columns: ["delivery_partner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_promotion_id_fkey"
            columns: ["promotion_id"]
            isOneToOne: false
            referencedRelation: "store_promotions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_restaurant_id_fkey"
            columns: ["store_id"]
            isOneToOne: false
            referencedRelation: "stores"
            referencedColumns: ["id"]
          },
        ]
      }
      orders_current_month: {
        Row: {
          created_at: string
          customer_id: string
          id: string
          restaurant_id: string
          status: Database["public"]["Enums"]["order_status"]
        }
        Insert: {
          created_at?: string
          customer_id: string
          id?: string
          restaurant_id: string
          status?: Database["public"]["Enums"]["order_status"]
        }
        Update: {
          created_at?: string
          customer_id?: string
          id?: string
          restaurant_id?: string
          status?: Database["public"]["Enums"]["order_status"]
        }
        Relationships: []
      }
      orders_partitioned: {
        Row: {
          created_at: string
          customer_id: string
          id: string
          restaurant_id: string
          status: Database["public"]["Enums"]["order_status"]
        }
        Insert: {
          created_at?: string
          customer_id: string
          id?: string
          restaurant_id: string
          status?: Database["public"]["Enums"]["order_status"]
        }
        Update: {
          created_at?: string
          customer_id?: string
          id?: string
          restaurant_id?: string
          status?: Database["public"]["Enums"]["order_status"]
        }
        Relationships: [
          {
            foreignKeyName: "orders_partitioned_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_partitioned_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "stores"
            referencedColumns: ["id"]
          },
        ]
      }
      orders_previous_month: {
        Row: {
          created_at: string
          customer_id: string
          id: string
          restaurant_id: string
          status: Database["public"]["Enums"]["order_status"]
        }
        Insert: {
          created_at?: string
          customer_id: string
          id?: string
          restaurant_id: string
          status?: Database["public"]["Enums"]["order_status"]
        }
        Update: {
          created_at?: string
          customer_id?: string
          id?: string
          restaurant_id?: string
          status?: Database["public"]["Enums"]["order_status"]
        }
        Relationships: []
      }
      packaging_charges: {
        Row: {
          base_charge: number
          created_at: string | null
          description: string | null
          id: string
          per_item_charge: number | null
          restaurant_id: string
          updated_at: string | null
        }
        Insert: {
          base_charge?: number
          created_at?: string | null
          description?: string | null
          id?: string
          per_item_charge?: number | null
          restaurant_id: string
          updated_at?: string | null
        }
        Update: {
          base_charge?: number
          created_at?: string | null
          description?: string | null
          id?: string
          per_item_charge?: number | null
          restaurant_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "packaging_charges_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: true
            referencedRelation: "stores"
            referencedColumns: ["id"]
          },
        ]
      }
      partner_earnings: {
        Row: {
          available_balance: number
          base_earnings: number
          created_at: string | null
          end_date: string
          id: string
          incentives: number
          net_earnings: number
          partner_id: string
          payout_processed: boolean | null
          penalties: number
          start_date: string
          timeframe: string
          updated_at: string | null
        }
        Insert: {
          available_balance?: number
          base_earnings?: number
          created_at?: string | null
          end_date: string
          id?: string
          incentives?: number
          net_earnings?: number
          partner_id: string
          payout_processed?: boolean | null
          penalties?: number
          start_date: string
          timeframe: string
          updated_at?: string | null
        }
        Update: {
          available_balance?: number
          base_earnings?: number
          created_at?: string | null
          end_date?: string
          id?: string
          incentives?: number
          net_earnings?: number
          partner_id?: string
          payout_processed?: boolean | null
          penalties?: number
          start_date?: string
          timeframe?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "partner_earnings_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      partner_wallets: {
        Row: {
          balance: number
          created_at: string | null
          id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          balance?: number
          created_at?: string | null
          id?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          balance?: number
          created_at?: string | null
          id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "partner_wallets_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      payment_methods: {
        Row: {
          created_at: string | null
          details: Json
          id: string
          is_default: boolean | null
          type: Database["public"]["Enums"]["payment_method_type"]
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          details: Json
          id?: string
          is_default?: boolean | null
          type: Database["public"]["Enums"]["payment_method_type"]
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          details?: Json
          id?: string
          is_default?: boolean | null
          type?: Database["public"]["Enums"]["payment_method_type"]
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "payment_methods_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      payment_qr_codes: {
        Row: {
          amount: number
          created_at: string | null
          expires_at: string
          id: string
          order_id: string
          qr_url: string
          status: string
          updated_at: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          expires_at: string
          id?: string
          order_id: string
          qr_url: string
          status: string
          updated_at?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          expires_at?: string
          id?: string
          order_id?: string
          qr_url?: string
          status?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payment_qr_codes_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      payment_transactions: {
        Row: {
          amount: number
          created_at: string | null
          id: string
          metadata: Json | null
          qr_code_id: string
          status: string
          transaction_id: string
          updated_at: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          id?: string
          metadata?: Json | null
          qr_code_id: string
          status: string
          transaction_id: string
          updated_at?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          id?: string
          metadata?: Json | null
          qr_code_id?: string
          status?: string
          transaction_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payment_transactions_qr_code_id_fkey"
            columns: ["qr_code_id"]
            isOneToOne: false
            referencedRelation: "payment_qr_codes"
            referencedColumns: ["id"]
          },
        ]
      }
      payout_requests: {
        Row: {
          amount: number
          created_at: string | null
          failure_reason: string | null
          id: string
          method: string
          partner_id: string
          payment_details_id: string
          processed_at: string | null
          reference_id: string | null
          status: string
          updated_at: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          failure_reason?: string | null
          id?: string
          method: string
          partner_id: string
          payment_details_id: string
          processed_at?: string | null
          reference_id?: string | null
          status: string
          updated_at?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          failure_reason?: string | null
          id?: string
          method?: string
          partner_id?: string
          payment_details_id?: string
          processed_at?: string | null
          reference_id?: string | null
          status?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payout_requests_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      platform_categories: {
        Row: {
          commission_rate: number
          created_at: string | null
          gst_rate: number
          icon_url: string | null
          id: string
          name: string
          parent_id: string | null
          platform_fee: number
          points_expiry_days: number | null
          points_rate: number
          updated_at: string | null
        }
        Insert: {
          commission_rate: number
          created_at?: string | null
          gst_rate: number
          icon_url?: string | null
          id?: string
          name: string
          parent_id?: string | null
          platform_fee: number
          points_expiry_days?: number | null
          points_rate: number
          updated_at?: string | null
        }
        Update: {
          commission_rate?: number
          created_at?: string | null
          gst_rate?: number
          icon_url?: string | null
          id?: string
          name?: string
          parent_id?: string | null
          platform_fee?: number
          points_expiry_days?: number | null
          points_rate?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "platform_categories_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "platform_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      platform_fees: {
        Row: {
          category: string
          created_at: string | null
          description: string | null
          fee_amount: number
          id: string
          updated_at: string | null
        }
        Insert: {
          category: string
          created_at?: string | null
          description?: string | null
          fee_amount: number
          id?: string
          updated_at?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          description?: string | null
          fee_amount?: number
          id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      platform_policies: {
        Row: {
          content: string
          created_at: string | null
          created_by: string
          effective_from: string
          id: string
          type: string
          updated_at: string | null
          version: string
        }
        Insert: {
          content: string
          created_at?: string | null
          created_by: string
          effective_from: string
          id?: string
          type: string
          updated_at?: string | null
          version: string
        }
        Update: {
          content?: string
          created_at?: string | null
          created_by?: string
          effective_from?: string
          id?: string
          type?: string
          updated_at?: string | null
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: "platform_policies_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      platform_settings: {
        Row: {
          category: string
          created_at: string | null
          description: string | null
          id: string
          is_public: boolean | null
          key: string
          updated_at: string | null
          value: Json
        }
        Insert: {
          category: string
          created_at?: string | null
          description?: string | null
          id?: string
          is_public?: boolean | null
          key: string
          updated_at?: string | null
          value: Json
        }
        Update: {
          category?: string
          created_at?: string | null
          description?: string | null
          id?: string
          is_public?: boolean | null
          key?: string
          updated_at?: string | null
          value?: Json
        }
        Relationships: []
      }
      point_expiry_notifications: {
        Row: {
          created_at: string | null
          expiry_date: string
          id: string
          notification_sent: boolean | null
          points: number
          user_id: string
        }
        Insert: {
          created_at?: string | null
          expiry_date: string
          id?: string
          notification_sent?: boolean | null
          points: number
          user_id: string
        }
        Update: {
          created_at?: string | null
          expiry_date?: string
          id?: string
          notification_sent?: boolean | null
          points?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "point_expiry_notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      point_transactions: {
        Row: {
          category: string
          created_at: string | null
          description: string | null
          expired: boolean | null
          expiry_date: string | null
          id: string
          order_id: string | null
          points: number
          type: string
          user_id: string
        }
        Insert: {
          category: string
          created_at?: string | null
          description?: string | null
          expired?: boolean | null
          expiry_date?: string | null
          id?: string
          order_id?: string | null
          points: number
          type: string
          user_id: string
        }
        Update: {
          category?: string
          created_at?: string | null
          description?: string | null
          expired?: boolean | null
          expiry_date?: string | null
          id?: string
          order_id?: string | null
          points?: number
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "point_transactions_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "point_transactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      product_size_variants: {
        Row: {
          created_at: string | null
          id: string
          is_available: boolean | null
          menu_item_id: string | null
          name: string
          price_adjustment: number
          stock_quantity: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_available?: boolean | null
          menu_item_id?: string | null
          name: string
          price_adjustment?: number
          stock_quantity?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          is_available?: boolean | null
          menu_item_id?: string | null
          name?: string
          price_adjustment?: number
          stock_quantity?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "product_size_variants_menu_item_id_fkey"
            columns: ["menu_item_id"]
            isOneToOne: false
            referencedRelation: "menu_items"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          account_locked: boolean | null
          created_at: string | null
          current_location: Json | null
          email: string
          email_verified: boolean | null
          face_photo_url: string | null
          failed_login_attempts: number | null
          full_name: string | null
          id: string
          is_available: boolean | null
          last_active: string | null
          last_login: string | null
          lock_expires_at: string | null
          phone_number: string | null
          phone_verified: boolean | null
          updated_at: string | null
          vehicle_type: Database["public"]["Enums"]["vehicle_type"] | null
        }
        Insert: {
          account_locked?: boolean | null
          created_at?: string | null
          current_location?: Json | null
          email: string
          email_verified?: boolean | null
          face_photo_url?: string | null
          failed_login_attempts?: number | null
          full_name?: string | null
          id: string
          is_available?: boolean | null
          last_active?: string | null
          last_login?: string | null
          lock_expires_at?: string | null
          phone_number?: string | null
          phone_verified?: boolean | null
          updated_at?: string | null
          vehicle_type?: Database["public"]["Enums"]["vehicle_type"] | null
        }
        Update: {
          account_locked?: boolean | null
          created_at?: string | null
          current_location?: Json | null
          email?: string
          email_verified?: boolean | null
          face_photo_url?: string | null
          failed_login_attempts?: number | null
          full_name?: string | null
          id?: string
          is_available?: boolean | null
          last_active?: string | null
          last_login?: string | null
          lock_expires_at?: string | null
          phone_number?: string | null
          phone_verified?: boolean | null
          updated_at?: string | null
          vehicle_type?: Database["public"]["Enums"]["vehicle_type"] | null
        }
        Relationships: []
      }
      promotion_items: {
        Row: {
          created_at: string | null
          id: string
          menu_item_id: string
          promotion_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          menu_item_id: string
          promotion_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          menu_item_id?: string
          promotion_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "promotion_items_menu_item_id_fkey"
            columns: ["menu_item_id"]
            isOneToOne: false
            referencedRelation: "menu_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "promotion_items_promotion_id_fkey"
            columns: ["promotion_id"]
            isOneToOne: false
            referencedRelation: "store_promotions"
            referencedColumns: ["id"]
          },
        ]
      }
      promotion_usage: {
        Row: {
          created_at: string | null
          discount_amount: number
          id: string
          order_id: string
          promotion_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          discount_amount: number
          id?: string
          order_id: string
          promotion_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          discount_amount?: number
          id?: string
          order_id?: string
          promotion_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "promotion_usage_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "promotion_usage_promotion_id_fkey"
            columns: ["promotion_id"]
            isOneToOne: false
            referencedRelation: "promotions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "promotion_usage_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      promotions: {
        Row: {
          buy_one_get_one: boolean | null
          buy_one_get_one_menu_item_id: string | null
          code: string
          created_at: string | null
          current_usage: number | null
          description: string | null
          end_date: string
          id: string
          is_active: boolean | null
          max_discount_amount: number | null
          max_uses_per_user: number | null
          min_order_amount: number | null
          restaurant_id: string | null
          start_date: string
          type: string
          updated_at: string | null
          usage_limit: number | null
          value: number
        }
        Insert: {
          buy_one_get_one?: boolean | null
          buy_one_get_one_menu_item_id?: string | null
          code: string
          created_at?: string | null
          current_usage?: number | null
          description?: string | null
          end_date: string
          id?: string
          is_active?: boolean | null
          max_discount_amount?: number | null
          max_uses_per_user?: number | null
          min_order_amount?: number | null
          restaurant_id?: string | null
          start_date: string
          type: string
          updated_at?: string | null
          usage_limit?: number | null
          value: number
        }
        Update: {
          buy_one_get_one?: boolean | null
          buy_one_get_one_menu_item_id?: string | null
          code?: string
          created_at?: string | null
          current_usage?: number | null
          description?: string | null
          end_date?: string
          id?: string
          is_active?: boolean | null
          max_discount_amount?: number | null
          max_uses_per_user?: number | null
          min_order_amount?: number | null
          restaurant_id?: string | null
          start_date?: string
          type?: string
          updated_at?: string | null
          usage_limit?: number | null
          value?: number
        }
        Relationships: [
          {
            foreignKeyName: "promotions_buy_one_get_one_menu_item_id_fkey"
            columns: ["buy_one_get_one_menu_item_id"]
            isOneToOne: false
            referencedRelation: "menu_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "promotions_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "stores"
            referencedColumns: ["id"]
          },
        ]
      }
      rate_limits: {
        Row: {
          created_at: string | null
          hits: number | null
          id: string
          key: string
          reset_at: string
        }
        Insert: {
          created_at?: string | null
          hits?: number | null
          id?: string
          key: string
          reset_at: string
        }
        Update: {
          created_at?: string | null
          hits?: number | null
          id?: string
          key?: string
          reset_at?: string
        }
        Relationships: []
      }
      referral_codes: {
        Row: {
          code: string
          created_at: string | null
          id: string
          partner_id: string
          status: string
          updated_at: string | null
        }
        Insert: {
          code: string
          created_at?: string | null
          id?: string
          partner_id: string
          status?: string
          updated_at?: string | null
        }
        Update: {
          code?: string
          created_at?: string | null
          id?: string
          partner_id?: string
          status?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "referral_codes_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      referral_commission_transactions: {
        Row: {
          amount: number
          created_at: string | null
          id: string
          referral_id: string | null
          status: string
          store_referral_id: string | null
          type: string
          updated_at: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          id?: string
          referral_id?: string | null
          status: string
          store_referral_id?: string | null
          type: string
          updated_at?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          id?: string
          referral_id?: string | null
          status?: string
          store_referral_id?: string | null
          type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "referral_commission_transactions_referral_id_fkey"
            columns: ["referral_id"]
            isOneToOne: false
            referencedRelation: "lead_partner_referrals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "referral_commission_transactions_store_referral_id_fkey"
            columns: ["store_referral_id"]
            isOneToOne: false
            referencedRelation: "store_referrals"
            referencedColumns: ["id"]
          },
        ]
      }
      referral_earnings: {
        Row: {
          amount: number
          created_at: string | null
          id: string
          referral_code_id: string
          referred_partner_id: string
          status: string
          updated_at: string | null
        }
        Insert: {
          amount?: number
          created_at?: string | null
          id?: string
          referral_code_id: string
          referred_partner_id: string
          status?: string
          updated_at?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          id?: string
          referral_code_id?: string
          referred_partner_id?: string
          status?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "referral_earnings_referral_code_id_fkey"
            columns: ["referral_code_id"]
            isOneToOne: false
            referencedRelation: "referral_codes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "referral_earnings_referred_partner_id_fkey"
            columns: ["referred_partner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      restaurant_payouts: {
        Row: {
          amount: number
          created_at: string | null
          id: string
          payout_date: string | null
          reference_id: string | null
          restaurant_id: string
          status: string
          updated_at: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          id?: string
          payout_date?: string | null
          reference_id?: string | null
          restaurant_id: string
          status: string
          updated_at?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          id?: string
          payout_date?: string | null
          reference_id?: string | null
          restaurant_id?: string
          status?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "restaurant_payouts_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "stores"
            referencedColumns: ["id"]
          },
        ]
      }
      restaurant_response_logs: {
        Row: {
          auto_declined: boolean | null
          created_at: string | null
          id: string
          order_id: string | null
          response_status: string
          response_time: string | null
          restaurant_id: string | null
        }
        Insert: {
          auto_declined?: boolean | null
          created_at?: string | null
          id?: string
          order_id?: string | null
          response_status: string
          response_time?: string | null
          restaurant_id?: string | null
        }
        Update: {
          auto_declined?: boolean | null
          created_at?: string | null
          id?: string
          order_id?: string | null
          response_status?: string
          response_time?: string | null
          restaurant_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "restaurant_response_logs_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "restaurant_response_logs_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "stores"
            referencedColumns: ["id"]
          },
        ]
      }
      restaurant_transactions: {
        Row: {
          amount: number
          created_at: string | null
          description: string | null
          id: string
          order_id: string | null
          restaurant_id: string
          type: string
        }
        Insert: {
          amount: number
          created_at?: string | null
          description?: string | null
          id?: string
          order_id?: string | null
          restaurant_id: string
          type: string
        }
        Update: {
          amount?: number
          created_at?: string | null
          description?: string | null
          id?: string
          order_id?: string | null
          restaurant_id?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "restaurant_transactions_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "restaurant_transactions_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "stores"
            referencedColumns: ["id"]
          },
        ]
      }
      reviews: {
        Row: {
          comment: string | null
          created_at: string | null
          customer_id: string
          delivery_comment: string | null
          delivery_rating: number | null
          id: string
          order_id: string
          rating: number
          restaurant_id: string
          updated_at: string | null
        }
        Insert: {
          comment?: string | null
          created_at?: string | null
          customer_id: string
          delivery_comment?: string | null
          delivery_rating?: number | null
          id?: string
          order_id: string
          rating: number
          restaurant_id: string
          updated_at?: string | null
        }
        Update: {
          comment?: string | null
          created_at?: string | null
          customer_id?: string
          delivery_comment?: string | null
          delivery_rating?: number | null
          id?: string
          order_id?: string
          rating?: number
          restaurant_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reviews_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: true
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "stores"
            referencedColumns: ["id"]
          },
        ]
      }
      reward_point_rates: {
        Row: {
          category: string
          created_at: string | null
          description: string | null
          expiry_days: number | null
          id: string
          min_amount_for_points: number
          percentage_rate: number
          updated_at: string | null
        }
        Insert: {
          category: string
          created_at?: string | null
          description?: string | null
          expiry_days?: number | null
          id?: string
          min_amount_for_points?: number
          percentage_rate: number
          updated_at?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          description?: string | null
          expiry_days?: number | null
          id?: string
          min_amount_for_points?: number
          percentage_rate?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      spatial_ref_sys: {
        Row: {
          auth_name: string | null
          auth_srid: number | null
          proj4text: string | null
          srid: number
          srtext: string | null
        }
        Insert: {
          auth_name?: string | null
          auth_srid?: number | null
          proj4text?: string | null
          srid: number
          srtext?: string | null
        }
        Update: {
          auth_name?: string | null
          auth_srid?: number | null
          proj4text?: string | null
          srid?: number
          srtext?: string | null
        }
        Relationships: []
      }
      store_bank_details: {
        Row: {
          account_holder_name: string
          account_number: string
          bank_name: string
          created_at: string | null
          id: string
          ifsc_code: string
          is_verified: boolean | null
          restaurant_id: string
          updated_at: string | null
        }
        Insert: {
          account_holder_name: string
          account_number: string
          bank_name: string
          created_at?: string | null
          id?: string
          ifsc_code: string
          is_verified?: boolean | null
          restaurant_id: string
          updated_at?: string | null
        }
        Update: {
          account_holder_name?: string
          account_number?: string
          bank_name?: string
          created_at?: string | null
          id?: string
          ifsc_code?: string
          is_verified?: boolean | null
          restaurant_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "store_bank_details_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: true
            referencedRelation: "stores"
            referencedColumns: ["id"]
          },
        ]
      }
      store_business_hours: {
        Row: {
          close_time: string
          created_at: string | null
          day_of_week: number
          id: string
          is_closed: boolean | null
          open_time: string
          restaurant_id: string
          updated_at: string | null
        }
        Insert: {
          close_time: string
          created_at?: string | null
          day_of_week: number
          id?: string
          is_closed?: boolean | null
          open_time: string
          restaurant_id: string
          updated_at?: string | null
        }
        Update: {
          close_time?: string
          created_at?: string | null
          day_of_week?: number
          id?: string
          is_closed?: boolean | null
          open_time?: string
          restaurant_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "store_business_hours_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "stores"
            referencedColumns: ["id"]
          },
        ]
      }
      store_categories: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          is_active: boolean | null
          name: string
          store_type: Database["public"]["Enums"]["store_type"]
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          store_type: Database["public"]["Enums"]["store_type"]
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          store_type?: Database["public"]["Enums"]["store_type"]
          updated_at?: string | null
        }
        Relationships: []
      }
      store_holidays: {
        Row: {
          created_at: string | null
          description: string | null
          holiday_date: string
          id: string
          restaurant_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          holiday_date: string
          id?: string
          restaurant_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          holiday_date?: string
          id?: string
          restaurant_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "store_holidays_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "stores"
            referencedColumns: ["id"]
          },
        ]
      }
      store_notification_preferences: {
        Row: {
          created_at: string | null
          email_enabled: boolean | null
          id: string
          notification_types: Json | null
          push_enabled: boolean | null
          quiet_hours_end: string | null
          quiet_hours_start: string | null
          restaurant_id: string
          sms_enabled: boolean | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email_enabled?: boolean | null
          id?: string
          notification_types?: Json | null
          push_enabled?: boolean | null
          quiet_hours_end?: string | null
          quiet_hours_start?: string | null
          restaurant_id: string
          sms_enabled?: boolean | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email_enabled?: boolean | null
          id?: string
          notification_types?: Json | null
          push_enabled?: boolean | null
          quiet_hours_end?: string | null
          quiet_hours_start?: string | null
          restaurant_id?: string
          sms_enabled?: boolean | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "store_notification_preferences_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: true
            referencedRelation: "stores"
            referencedColumns: ["id"]
          },
        ]
      }
      store_notifications: {
        Row: {
          created_at: string | null
          data: Json | null
          id: string
          is_read: boolean | null
          message: string
          restaurant_id: string
          title: string
          type: Database["public"]["Enums"]["store_notification_type"]
        }
        Insert: {
          created_at?: string | null
          data?: Json | null
          id?: string
          is_read?: boolean | null
          message: string
          restaurant_id: string
          title: string
          type: Database["public"]["Enums"]["store_notification_type"]
        }
        Update: {
          created_at?: string | null
          data?: Json | null
          id?: string
          is_read?: boolean | null
          message?: string
          restaurant_id?: string
          title?: string
          type?: Database["public"]["Enums"]["store_notification_type"]
        }
        Relationships: [
          {
            foreignKeyName: "store_notifications_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "stores"
            referencedColumns: ["id"]
          },
        ]
      }
      store_operating_hours: {
        Row: {
          close_time: string
          created_at: string | null
          day_of_week: number
          id: string
          is_closed: boolean | null
          open_time: string
          registration_id: string
        }
        Insert: {
          close_time: string
          created_at?: string | null
          day_of_week: number
          id?: string
          is_closed?: boolean | null
          open_time: string
          registration_id: string
        }
        Update: {
          close_time?: string
          created_at?: string | null
          day_of_week?: number
          id?: string
          is_closed?: boolean | null
          open_time?: string
          registration_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "store_operating_hours_registration_id_fkey"
            columns: ["registration_id"]
            isOneToOne: false
            referencedRelation: "store_registrations"
            referencedColumns: ["id"]
          },
        ]
      }
      store_payment_preferences: {
        Row: {
          accepts_cod: boolean | null
          accepts_online_payments: boolean | null
          bank_account_name: string | null
          bank_account_number: string | null
          bank_ifsc_code: string | null
          created_at: string | null
          id: string
          registration_id: string
          updated_at: string | null
          upi_id: string | null
        }
        Insert: {
          accepts_cod?: boolean | null
          accepts_online_payments?: boolean | null
          bank_account_name?: string | null
          bank_account_number?: string | null
          bank_ifsc_code?: string | null
          created_at?: string | null
          id?: string
          registration_id: string
          updated_at?: string | null
          upi_id?: string | null
        }
        Update: {
          accepts_cod?: boolean | null
          accepts_online_payments?: boolean | null
          bank_account_name?: string | null
          bank_account_number?: string | null
          bank_ifsc_code?: string | null
          created_at?: string | null
          id?: string
          registration_id?: string
          updated_at?: string | null
          upi_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "store_payment_preferences_registration_id_fkey"
            columns: ["registration_id"]
            isOneToOne: false
            referencedRelation: "store_registrations"
            referencedColumns: ["id"]
          },
        ]
      }
      store_promotions: {
        Row: {
          created_at: string | null
          current_usage: number | null
          description: string | null
          end_date: string
          id: string
          is_active: boolean | null
          max_discount_amount: number | null
          min_order_amount: number | null
          name: string
          restaurant_id: string
          start_date: string
          terms_conditions: string | null
          type: Database["public"]["Enums"]["promotion_type"]
          updated_at: string | null
          usage_limit: number | null
          value: number
        }
        Insert: {
          created_at?: string | null
          current_usage?: number | null
          description?: string | null
          end_date: string
          id?: string
          is_active?: boolean | null
          max_discount_amount?: number | null
          min_order_amount?: number | null
          name: string
          restaurant_id: string
          start_date: string
          terms_conditions?: string | null
          type: Database["public"]["Enums"]["promotion_type"]
          updated_at?: string | null
          usage_limit?: number | null
          value: number
        }
        Update: {
          created_at?: string | null
          current_usage?: number | null
          description?: string | null
          end_date?: string
          id?: string
          is_active?: boolean | null
          max_discount_amount?: number | null
          min_order_amount?: number | null
          name?: string
          restaurant_id?: string
          start_date?: string
          terms_conditions?: string | null
          type?: Database["public"]["Enums"]["promotion_type"]
          updated_at?: string | null
          usage_limit?: number | null
          value?: number
        }
        Relationships: [
          {
            foreignKeyName: "store_promotions_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "stores"
            referencedColumns: ["id"]
          },
        ]
      }
      store_rating_metrics: {
        Row: {
          average_rating: number
          food_rating_avg: number
          last_updated: string | null
          packaging_rating_avg: number
          rating_distribution: Json | null
          restaurant_id: string
          total_ratings: number
        }
        Insert: {
          average_rating?: number
          food_rating_avg?: number
          last_updated?: string | null
          packaging_rating_avg?: number
          rating_distribution?: Json | null
          restaurant_id: string
          total_ratings?: number
        }
        Update: {
          average_rating?: number
          food_rating_avg?: number
          last_updated?: string | null
          packaging_rating_avg?: number
          rating_distribution?: Json | null
          restaurant_id?: string
          total_ratings?: number
        }
        Relationships: [
          {
            foreignKeyName: "store_rating_metrics_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: true
            referencedRelation: "stores"
            referencedColumns: ["id"]
          },
        ]
      }
      store_ratings: {
        Row: {
          created_at: string | null
          customer_id: string
          feedback: string | null
          food_rating: number | null
          id: string
          order_id: string
          packaging_rating: number | null
          rating: number
          response_at: string | null
          restaurant_id: string
          store_response: string | null
        }
        Insert: {
          created_at?: string | null
          customer_id: string
          feedback?: string | null
          food_rating?: number | null
          id?: string
          order_id: string
          packaging_rating?: number | null
          rating: number
          response_at?: string | null
          restaurant_id: string
          store_response?: string | null
        }
        Update: {
          created_at?: string | null
          customer_id?: string
          feedback?: string | null
          food_rating?: number | null
          id?: string
          order_id?: string
          packaging_rating?: number | null
          rating?: number
          response_at?: string | null
          restaurant_id?: string
          store_response?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "store_ratings_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "store_ratings_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: true
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "store_ratings_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "stores"
            referencedColumns: ["id"]
          },
        ]
      }
      store_referrals: {
        Row: {
          commission_amount: number
          commission_paid: boolean | null
          created_at: string | null
          id: string
          referral_id: string | null
          status:
            | Database["public"]["Enums"]["store_registration_status"]
            | null
          store_id: string | null
          updated_at: string | null
        }
        Insert: {
          commission_amount?: number
          commission_paid?: boolean | null
          created_at?: string | null
          id?: string
          referral_id?: string | null
          status?:
            | Database["public"]["Enums"]["store_registration_status"]
            | null
          store_id?: string | null
          updated_at?: string | null
        }
        Update: {
          commission_amount?: number
          commission_paid?: boolean | null
          created_at?: string | null
          id?: string
          referral_id?: string | null
          status?:
            | Database["public"]["Enums"]["store_registration_status"]
            | null
          store_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "store_referrals_referral_id_fkey"
            columns: ["referral_id"]
            isOneToOne: false
            referencedRelation: "lead_partner_referrals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "store_referrals_store_id_fkey"
            columns: ["store_id"]
            isOneToOne: false
            referencedRelation: "store_registrations"
            referencedColumns: ["id"]
          },
        ]
      }
      store_registrations: {
        Row: {
          address: string
          city: string
          created_at: string | null
          cuisine_type: string
          email: string
          email_verified: boolean | null
          id: string
          is_pure_veg: boolean | null
          legal_name: string
          owner_id: string | null
          phone: string
          phone_verified: boolean | null
          postal_code: string
          rejection_reason: string | null
          state: string
          status:
            | Database["public"]["Enums"]["store_registration_status"]
            | null
          store_name: string
          store_type: Database["public"]["Enums"]["store_type"]
          tax_id: string | null
          updated_at: string | null
        }
        Insert: {
          address: string
          city: string
          created_at?: string | null
          cuisine_type: string
          email: string
          email_verified?: boolean | null
          id?: string
          is_pure_veg?: boolean | null
          legal_name: string
          owner_id?: string | null
          phone: string
          phone_verified?: boolean | null
          postal_code: string
          rejection_reason?: string | null
          state: string
          status?:
            | Database["public"]["Enums"]["store_registration_status"]
            | null
          store_name: string
          store_type?: Database["public"]["Enums"]["store_type"]
          tax_id?: string | null
          updated_at?: string | null
        }
        Update: {
          address?: string
          city?: string
          created_at?: string | null
          cuisine_type?: string
          email?: string
          email_verified?: boolean | null
          id?: string
          is_pure_veg?: boolean | null
          legal_name?: string
          owner_id?: string | null
          phone?: string
          phone_verified?: boolean | null
          postal_code?: string
          rejection_reason?: string | null
          state?: string
          status?:
            | Database["public"]["Enums"]["store_registration_status"]
            | null
          store_name?: string
          store_type?: Database["public"]["Enums"]["store_type"]
          tax_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "store_registrations_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      store_tax_calculations: {
        Row: {
          cgst_amount: number
          created_at: string | null
          id: string
          igst_amount: number
          order_id: string
          restaurant_id: string
          sgst_amount: number
          tax_rates: Json
          taxable_amount: number
          total_tax_amount: number
        }
        Insert: {
          cgst_amount: number
          created_at?: string | null
          id?: string
          igst_amount: number
          order_id: string
          restaurant_id: string
          sgst_amount: number
          tax_rates: Json
          taxable_amount: number
          total_tax_amount: number
        }
        Update: {
          cgst_amount?: number
          created_at?: string | null
          id?: string
          igst_amount?: number
          order_id?: string
          restaurant_id?: string
          sgst_amount?: number
          tax_rates?: Json
          taxable_amount?: number
          total_tax_amount?: number
        }
        Relationships: [
          {
            foreignKeyName: "store_tax_calculations_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "store_tax_calculations_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "stores"
            referencedColumns: ["id"]
          },
        ]
      }
      store_tax_profiles: {
        Row: {
          business_type: string
          created_at: string | null
          gstin: string
          id: string
          is_verified: boolean | null
          legal_name: string
          pan_number: string
          registration_date: string
          restaurant_id: string
          tax_regime: string
          updated_at: string | null
          verification_date: string | null
        }
        Insert: {
          business_type: string
          created_at?: string | null
          gstin: string
          id?: string
          is_verified?: boolean | null
          legal_name: string
          pan_number: string
          registration_date: string
          restaurant_id: string
          tax_regime: string
          updated_at?: string | null
          verification_date?: string | null
        }
        Update: {
          business_type?: string
          created_at?: string | null
          gstin?: string
          id?: string
          is_verified?: boolean | null
          legal_name?: string
          pan_number?: string
          registration_date?: string
          restaurant_id?: string
          tax_regime?: string
          updated_at?: string | null
          verification_date?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "store_tax_profiles_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: true
            referencedRelation: "stores"
            referencedColumns: ["id"]
          },
        ]
      }
      store_tax_rates: {
        Row: {
          category: string
          cgst_rate: number
          created_at: string | null
          effective_from: string
          effective_to: string | null
          hsn_code: string
          id: string
          igst_rate: number
          restaurant_id: string
          sgst_rate: number
          updated_at: string | null
        }
        Insert: {
          category: string
          cgst_rate: number
          created_at?: string | null
          effective_from: string
          effective_to?: string | null
          hsn_code: string
          id?: string
          igst_rate: number
          restaurant_id: string
          sgst_rate: number
          updated_at?: string | null
        }
        Update: {
          category?: string
          cgst_rate?: number
          created_at?: string | null
          effective_from?: string
          effective_to?: string | null
          hsn_code?: string
          id?: string
          igst_rate?: number
          restaurant_id?: string
          sgst_rate?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "store_tax_rates_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "stores"
            referencedColumns: ["id"]
          },
        ]
      }
      store_tax_reports: {
        Row: {
          created_at: string | null
          filed_at: string | null
          generated_at: string
          id: string
          period_end: string
          period_start: string
          report_data: Json
          report_type: string
          restaurant_id: string
          status: Database["public"]["Enums"]["tax_report_status"]
          total_tax_amount: number
          total_taxable_amount: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          filed_at?: string | null
          generated_at?: string
          id?: string
          period_end: string
          period_start: string
          report_data: Json
          report_type: string
          restaurant_id: string
          status?: Database["public"]["Enums"]["tax_report_status"]
          total_tax_amount: number
          total_taxable_amount: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          filed_at?: string | null
          generated_at?: string
          id?: string
          period_end?: string
          period_start?: string
          report_data?: Json
          report_type?: string
          restaurant_id?: string
          status?: Database["public"]["Enums"]["tax_report_status"]
          total_tax_amount?: number
          total_taxable_amount?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "store_tax_reports_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "stores"
            referencedColumns: ["id"]
          },
        ]
      }
      store_temporary_closures: {
        Row: {
          created_at: string | null
          end_date: string
          id: string
          reason: string | null
          restaurant_id: string
          start_date: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          end_date: string
          id?: string
          reason?: string | null
          restaurant_id: string
          start_date: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          end_date?: string
          id?: string
          reason?: string | null
          restaurant_id?: string
          start_date?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "store_temporary_closures_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "stores"
            referencedColumns: ["id"]
          },
        ]
      }
      store_verification_codes: {
        Row: {
          code: string
          created_at: string | null
          expires_at: string
          id: string
          registration_id: string
          type: Database["public"]["Enums"]["verification_type"]
          verified_at: string | null
        }
        Insert: {
          code: string
          created_at?: string | null
          expires_at: string
          id?: string
          registration_id: string
          type: Database["public"]["Enums"]["verification_type"]
          verified_at?: string | null
        }
        Update: {
          code?: string
          created_at?: string | null
          expires_at?: string
          id?: string
          registration_id?: string
          type?: Database["public"]["Enums"]["verification_type"]
          verified_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "store_verification_codes_registration_id_fkey"
            columns: ["registration_id"]
            isOneToOne: false
            referencedRelation: "store_registrations"
            referencedColumns: ["id"]
          },
        ]
      }
      stores: {
        Row: {
          address: string
          created_at: string | null
          cuisine_type: string
          description: string | null
          id: string
          is_active: boolean | null
          location: unknown | null
          name: string
          opening_hours: Json
          owner_id: string
          phone: string
          store_type: Database["public"]["Enums"]["store_type"]
          updated_at: string | null
        }
        Insert: {
          address: string
          created_at?: string | null
          cuisine_type: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          location?: unknown | null
          name: string
          opening_hours?: Json
          owner_id: string
          phone: string
          store_type?: Database["public"]["Enums"]["store_type"]
          updated_at?: string | null
        }
        Update: {
          address?: string
          created_at?: string | null
          cuisine_type?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          location?: unknown | null
          name?: string
          opening_hours?: Json
          owner_id?: string
          phone?: string
          store_type?: Database["public"]["Enums"]["store_type"]
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "restaurants_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      support_messages: {
        Row: {
          attachments: Json | null
          content: string
          created_at: string | null
          created_by: string
          id: string
          ticket_id: string
        }
        Insert: {
          attachments?: Json | null
          content: string
          created_at?: string | null
          created_by: string
          id?: string
          ticket_id: string
        }
        Update: {
          attachments?: Json | null
          content?: string
          created_at?: string | null
          created_by?: string
          id?: string
          ticket_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "support_messages_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "support_messages_ticket_id_fkey"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "support_tickets"
            referencedColumns: ["id"]
          },
        ]
      }
      support_tickets: {
        Row: {
          category: string
          created_at: string | null
          description: string
          id: string
          order_id: string | null
          partner_id: string
          priority: string
          resolved_at: string | null
          status: string
          title: string
          updated_at: string | null
        }
        Insert: {
          category: string
          created_at?: string | null
          description: string
          id?: string
          order_id?: string | null
          partner_id: string
          priority: string
          resolved_at?: string | null
          status: string
          title: string
          updated_at?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          description?: string
          id?: string
          order_id?: string | null
          partner_id?: string
          priority?: string
          resolved_at?: string | null
          status?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "support_tickets_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "support_tickets_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      survey_answers: {
        Row: {
          answer: string
          created_at: string | null
          id: string
          question_id: string
          response_id: string
        }
        Insert: {
          answer: string
          created_at?: string | null
          id?: string
          question_id: string
          response_id: string
        }
        Update: {
          answer?: string
          created_at?: string | null
          id?: string
          question_id?: string
          response_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "survey_answers_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "survey_questions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "survey_answers_response_id_fkey"
            columns: ["response_id"]
            isOneToOne: false
            referencedRelation: "survey_responses"
            referencedColumns: ["id"]
          },
        ]
      }
      survey_distributions: {
        Row: {
          completed_at: string | null
          created_at: string | null
          id: string
          opened_at: string | null
          reminder_sent_at: string | null
          sent_at: string
          sent_via: string
          survey_id: string
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          id?: string
          opened_at?: string | null
          reminder_sent_at?: string | null
          sent_at: string
          sent_via: string
          survey_id: string
          user_id: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          id?: string
          opened_at?: string | null
          reminder_sent_at?: string | null
          sent_at?: string
          sent_via?: string
          survey_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "survey_distributions_survey_id_fkey"
            columns: ["survey_id"]
            isOneToOne: false
            referencedRelation: "surveys"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "survey_distributions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      survey_questions: {
        Row: {
          created_at: string | null
          id: string
          is_required: boolean | null
          options: Json | null
          order_index: number
          question: string
          survey_id: string
          type: Database["public"]["Enums"]["question_type"]
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_required?: boolean | null
          options?: Json | null
          order_index: number
          question: string
          survey_id: string
          type: Database["public"]["Enums"]["question_type"]
        }
        Update: {
          created_at?: string | null
          id?: string
          is_required?: boolean | null
          options?: Json | null
          order_index?: number
          question?: string
          survey_id?: string
          type?: Database["public"]["Enums"]["question_type"]
        }
        Relationships: [
          {
            foreignKeyName: "survey_questions_survey_id_fkey"
            columns: ["survey_id"]
            isOneToOne: false
            referencedRelation: "surveys"
            referencedColumns: ["id"]
          },
        ]
      }
      survey_responses: {
        Row: {
          completed_at: string
          created_at: string | null
          id: string
          survey_id: string
          user_id: string
        }
        Insert: {
          completed_at: string
          created_at?: string | null
          id?: string
          survey_id: string
          user_id: string
        }
        Update: {
          completed_at?: string
          created_at?: string | null
          id?: string
          survey_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "survey_responses_survey_id_fkey"
            columns: ["survey_id"]
            isOneToOne: false
            referencedRelation: "surveys"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "survey_responses_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      surveys: {
        Row: {
          created_at: string | null
          created_by: string
          description: string | null
          end_date: string | null
          id: string
          is_active: boolean | null
          start_date: string
          target_audience: string
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by: string
          description?: string | null
          end_date?: string | null
          id?: string
          is_active?: boolean | null
          start_date: string
          target_audience: string
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string
          description?: string | null
          end_date?: string | null
          id?: string
          is_active?: boolean | null
          start_date?: string
          target_audience?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "surveys_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      transactions: {
        Row: {
          amount: number
          created_at: string | null
          id: string
          order_id: string
          payment_intent_id: string | null
          payment_method_id: string | null
          refund_id: string | null
          status: Database["public"]["Enums"]["transaction_status"]
          updated_at: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          id?: string
          order_id: string
          payment_intent_id?: string | null
          payment_method_id?: string | null
          refund_id?: string | null
          status?: Database["public"]["Enums"]["transaction_status"]
          updated_at?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          id?: string
          order_id?: string
          payment_intent_id?: string | null
          payment_method_id?: string | null
          refund_id?: string | null
          status?: Database["public"]["Enums"]["transaction_status"]
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "transactions_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_payment_method_id_fkey"
            columns: ["payment_method_id"]
            isOneToOne: false
            referencedRelation: "payment_methods"
            referencedColumns: ["id"]
          },
        ]
      }
      upi_details: {
        Row: {
          created_at: string | null
          id: string
          is_verified: boolean | null
          partner_id: string
          updated_at: string | null
          upi_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_verified?: boolean | null
          partner_id: string
          updated_at?: string | null
          upi_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_verified?: boolean | null
          partner_id?: string
          updated_at?: string | null
          upi_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "upi_details_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_addresses: {
        Row: {
          address_line1: string
          address_line2: string | null
          city: string
          created_at: string | null
          id: string
          is_default: boolean | null
          label: string
          latitude: number | null
          longitude: number | null
          postal_code: string
          state: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          address_line1: string
          address_line2?: string | null
          city: string
          created_at?: string | null
          id?: string
          is_default?: boolean | null
          label: string
          latitude?: number | null
          longitude?: number | null
          postal_code: string
          state: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          address_line1?: string
          address_line2?: string | null
          city?: string
          created_at?: string | null
          id?: string
          is_default?: boolean | null
          label?: string
          latitude?: number | null
          longitude?: number | null
          postal_code?: string
          state?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_addresses_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_points: {
        Row: {
          created_at: string | null
          id: string
          points_balance: number
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          points_balance?: number
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          points_balance?: number
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_points_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_points_leaderboard: {
        Row: {
          id: string
          last_updated: string | null
          lifetime_points: number
          points_balance: number
          rank: number | null
          user_id: string
        }
        Insert: {
          id?: string
          last_updated?: string | null
          lifetime_points?: number
          points_balance?: number
          rank?: number | null
          user_id: string
        }
        Update: {
          id?: string
          last_updated?: string | null
          lifetime_points?: number
          points_balance?: number
          rank?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_points_leaderboard_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_sessions: {
        Row: {
          device_id: string
          id: string
          last_active: string | null
          metadata: Json | null
          user_id: string
        }
        Insert: {
          device_id: string
          id?: string
          last_active?: string | null
          metadata?: Json | null
          user_id: string
        }
        Update: {
          device_id?: string
          id?: string
          last_active?: string | null
          metadata?: Json | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_sessions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_settings: {
        Row: {
          auto_accept_orders: boolean | null
          created_at: string | null
          currency: string
          delivery_preferences: Json | null
          delivery_radius: number | null
          id: string
          language: string
          max_concurrent_orders: number | null
          preparation_buffer_time: number | null
          theme: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          auto_accept_orders?: boolean | null
          created_at?: string | null
          currency?: string
          delivery_preferences?: Json | null
          delivery_radius?: number | null
          id?: string
          language?: string
          max_concurrent_orders?: number | null
          preparation_buffer_time?: number | null
          theme?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          auto_accept_orders?: boolean | null
          created_at?: string | null
          currency?: string
          delivery_preferences?: Json | null
          delivery_radius?: number | null
          id?: string
          language?: string
          max_concurrent_orders?: number | null
          preparation_buffer_time?: number | null
          theme?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_settings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      verification_codes: {
        Row: {
          code: string
          contact: string
          created_at: string | null
          expires_at: string
          id: string
          type: string
          verified: boolean | null
        }
        Insert: {
          code: string
          contact: string
          created_at?: string | null
          expires_at: string
          id?: string
          type: string
          verified?: boolean | null
        }
        Update: {
          code?: string
          contact?: string
          created_at?: string | null
          expires_at?: string
          id?: string
          type?: string
          verified?: boolean | null
        }
        Relationships: []
      }
      wallet_transactions: {
        Row: {
          amount: number
          created_at: string | null
          id: string
          metadata: Json | null
          status: string
          type: string
          wallet_id: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          id?: string
          metadata?: Json | null
          status?: string
          type: string
          wallet_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          id?: string
          metadata?: Json | null
          status?: string
          type?: string
          wallet_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "wallet_transactions_wallet_id_fkey"
            columns: ["wallet_id"]
            isOneToOne: false
            referencedRelation: "partner_wallets"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      available_points: {
        Row: {
          available_points: number | null
          next_expiry_date: string | null
          points_expiring_soon: number | null
          user_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "point_transactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      geography_columns: {
        Row: {
          coord_dimension: number | null
          f_geography_column: unknown | null
          f_table_catalog: unknown | null
          f_table_name: unknown | null
          f_table_schema: unknown | null
          srid: number | null
          type: string | null
        }
        Relationships: []
      }
      geometry_columns: {
        Row: {
          coord_dimension: number | null
          f_geometry_column: unknown | null
          f_table_catalog: string | null
          f_table_name: unknown | null
          f_table_schema: unknown | null
          srid: number | null
          type: string | null
        }
        Insert: {
          coord_dimension?: number | null
          f_geometry_column?: unknown | null
          f_table_catalog?: string | null
          f_table_name?: unknown | null
          f_table_schema?: unknown | null
          srid?: number | null
          type?: string | null
        }
        Update: {
          coord_dimension?: number | null
          f_geometry_column?: unknown | null
          f_table_catalog?: string | null
          f_table_name?: unknown | null
          f_table_schema?: unknown | null
          srid?: number | null
          type?: string | null
        }
        Relationships: []
      }
      order_analytics: {
        Row: {
          order_count: number | null
          restaurant_id: string | null
          time_bucket: string | null
          total_revenue: number | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "stores"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      _postgis_deprecate: {
        Args: {
          oldname: string
          newname: string
          version: string
        }
        Returns: undefined
      }
      _postgis_index_extent: {
        Args: {
          tbl: unknown
          col: string
        }
        Returns: unknown
      }
      _postgis_pgsql_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      _postgis_scripts_pgsql_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      _postgis_selectivity: {
        Args: {
          tbl: unknown
          att_name: string
          geom: unknown
          mode?: string
        }
        Returns: number
      }
      _st_3dintersects: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      _st_bestsrid: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      _st_contains: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      _st_containsproperly: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      _st_coveredby:
        | {
            Args: {
              geog1: unknown
              geog2: unknown
            }
            Returns: boolean
          }
        | {
            Args: {
              geom1: unknown
              geom2: unknown
            }
            Returns: boolean
          }
      _st_covers:
        | {
            Args: {
              geog1: unknown
              geog2: unknown
            }
            Returns: boolean
          }
        | {
            Args: {
              geom1: unknown
              geom2: unknown
            }
            Returns: boolean
          }
      _st_crosses: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      _st_dwithin: {
        Args: {
          geog1: unknown
          geog2: unknown
          tolerance: number
          use_spheroid?: boolean
        }
        Returns: boolean
      }
      _st_equals: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      _st_intersects: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      _st_linecrossingdirection: {
        Args: {
          line1: unknown
          line2: unknown
        }
        Returns: number
      }
      _st_longestline: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: unknown
      }
      _st_maxdistance: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: number
      }
      _st_orderingequals: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      _st_overlaps: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      _st_pointoutside: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      _st_sortablehash: {
        Args: {
          geom: unknown
        }
        Returns: number
      }
      _st_touches: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      _st_voronoi: {
        Args: {
          g1: unknown
          clip?: unknown
          tolerance?: number
          return_polygons?: boolean
        }
        Returns: unknown
      }
      _st_within: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      addauth: {
        Args: {
          "": string
        }
        Returns: boolean
      }
      addgeometrycolumn:
        | {
            Args: {
              catalog_name: string
              schema_name: string
              table_name: string
              column_name: string
              new_srid_in: number
              new_type: string
              new_dim: number
              use_typmod?: boolean
            }
            Returns: string
          }
        | {
            Args: {
              schema_name: string
              table_name: string
              column_name: string
              new_srid: number
              new_type: string
              new_dim: number
              use_typmod?: boolean
            }
            Returns: string
          }
        | {
            Args: {
              table_name: string
              column_name: string
              new_srid: number
              new_type: string
              new_dim: number
              use_typmod?: boolean
            }
            Returns: string
          }
      box:
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
      box2d:
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
      box2d_in: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      box2d_out: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      box2df_in: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      box2df_out: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      box3d:
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
      box3d_in: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      box3d_out: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      box3dtobox: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      bytea:
        | {
            Args: {
              "": unknown
            }
            Returns: string
          }
        | {
            Args: {
              "": unknown
            }
            Returns: string
          }
      calculate_cod_deduction: {
        Args: {
          p_partner_id: string
        }
        Returns: number
      }
      calculate_commission: {
        Args: {
          p_restaurant_id: string
          p_order_amount: number
        }
        Returns: {
          commission_rate: number
          commission_amount: number
        }[]
      }
      calculate_order_taxes: {
        Args: {
          p_order_id: string
          p_restaurant_id: string
        }
        Returns: Json
      }
      calculate_partner_rankings: {
        Args: {
          p_start_date: string
          p_end_date: string
        }
        Returns: {
          partner_id: string
          full_name: string
          rank: number
          total_deliveries: number
          total_earnings: number
          average_rating: number
          points: number
        }[]
      }
      calculate_promotion_discount: {
        Args: {
          p_promotion_id: string
          p_order_amount: number
        }
        Returns: number
      }
      calculate_promotion_effectiveness: {
        Args: Record<PropertyKey, never>
        Returns: {
          promotion_id: string
          code: string
          effectiveness: number
        }[]
      }
      can_request_payout: {
        Args: {
          p_partner_id: string
        }
        Returns: boolean
      }
      check_cod_limit: {
        Args: {
          p_partner_id: string
          p_amount: number
        }
        Returns: boolean
      }
      check_points_expiry: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      check_rate_limit: {
        Args: {
          p_key: string
          p_limit: number
          p_window: unknown
        }
        Returns: boolean
      }
      cleanup_expired_codes: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      disablelongtransactions: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      dropgeometrycolumn:
        | {
            Args: {
              catalog_name: string
              schema_name: string
              table_name: string
              column_name: string
            }
            Returns: string
          }
        | {
            Args: {
              schema_name: string
              table_name: string
              column_name: string
            }
            Returns: string
          }
        | {
            Args: {
              table_name: string
              column_name: string
            }
            Returns: string
          }
      dropgeometrytable:
        | {
            Args: {
              catalog_name: string
              schema_name: string
              table_name: string
            }
            Returns: string
          }
        | {
            Args: {
              schema_name: string
              table_name: string
            }
            Returns: string
          }
        | {
            Args: {
              table_name: string
            }
            Returns: string
          }
      enablelongtransactions: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      equals: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      expire_points: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      find_nearby_delivery_partners: {
        Args: {
          p_latitude: number
          p_longitude: number
          p_radius_km?: number
          p_limit?: number
        }
        Returns: {
          partner_id: string
          full_name: string
          distance: number
          current_orders: number
        }[]
      }
      find_restaurants_in_radius: {
        Args: {
          p_latitude: number
          p_longitude: number
          p_radius_km: number
          p_limit: number
          p_offset: number
        }
        Returns: {
          id: string
          name: string
          cuisine_type: string
          distance: number
          rating: number
          total_ratings: number
          is_vegetarian: boolean
          estimated_delivery_time: number
        }[]
      }
      generate_pickup_otp: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      generate_referral_code: {
        Args: {
          partner_id: string
        }
        Returns: string
      }
      generate_verification_code: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      geography:
        | {
            Args: {
              "": string
            }
            Returns: unknown
          }
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
      geography_analyze: {
        Args: {
          "": unknown
        }
        Returns: boolean
      }
      geography_gist_compress: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      geography_gist_decompress: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      geography_out: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      geography_send: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      geography_spgist_compress_nd: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      geography_typmod_in: {
        Args: {
          "": unknown[]
        }
        Returns: number
      }
      geography_typmod_out: {
        Args: {
          "": number
        }
        Returns: unknown
      }
      geometry:
        | {
            Args: {
              "": string
            }
            Returns: unknown
          }
        | {
            Args: {
              "": string
            }
            Returns: unknown
          }
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
      geometry_above: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      geometry_analyze: {
        Args: {
          "": unknown
        }
        Returns: boolean
      }
      geometry_below: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      geometry_cmp: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: number
      }
      geometry_contained_3d: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      geometry_contains: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      geometry_contains_3d: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      geometry_distance_box: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: number
      }
      geometry_distance_centroid: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: number
      }
      geometry_eq: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      geometry_ge: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      geometry_gist_compress_2d: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      geometry_gist_compress_nd: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      geometry_gist_decompress_2d: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      geometry_gist_decompress_nd: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      geometry_gist_sortsupport_2d: {
        Args: {
          "": unknown
        }
        Returns: undefined
      }
      geometry_gt: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      geometry_hash: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      geometry_in: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      geometry_le: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      geometry_left: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      geometry_lt: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      geometry_out: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      geometry_overabove: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      geometry_overbelow: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      geometry_overlaps: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      geometry_overlaps_3d: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      geometry_overleft: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      geometry_overright: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      geometry_recv: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      geometry_right: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      geometry_same: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      geometry_same_3d: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      geometry_send: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      geometry_sortsupport: {
        Args: {
          "": unknown
        }
        Returns: undefined
      }
      geometry_spgist_compress_2d: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      geometry_spgist_compress_3d: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      geometry_spgist_compress_nd: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      geometry_typmod_in: {
        Args: {
          "": unknown[]
        }
        Returns: number
      }
      geometry_typmod_out: {
        Args: {
          "": number
        }
        Returns: unknown
      }
      geometry_within: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      geometrytype:
        | {
            Args: {
              "": unknown
            }
            Returns: string
          }
        | {
            Args: {
              "": unknown
            }
            Returns: string
          }
      geomfromewkb: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      geomfromewkt: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      get_cod_balance: {
        Args: {
          p_partner_id: string
        }
        Returns: number
      }
      get_location_promotions: {
        Args: {
          p_latitude: number
          p_longitude: number
          p_radius_km: number
        }
        Returns: {
          id: string
          restaurant_id: string
          name: string
          description: string
          type: string
          value: number
          min_order_amount: number
          max_discount_amount: number
          start_date: string
          end_date: string
          distance: number
        }[]
      }
      get_order_metrics: {
        Args: {
          p_start_date: string
          p_end_date: string
        }
        Returns: Json
      }
      get_partner_rank: {
        Args: {
          p_partner_id: string
          p_start_date: string
          p_end_date: string
        }
        Returns: {
          partner_id: string
          full_name: string
          rank: number
          total_deliveries: number
          total_earnings: number
          average_rating: number
          points: number
        }[]
      }
      get_payout_summary: {
        Args: {
          p_partner_id: string
        }
        Returns: Json
      }
      get_proj4_from_srid: {
        Args: {
          "": number
        }
        Returns: string
      }
      get_promotion_usage_stats: {
        Args: {
          p_promotion_id: string
        }
        Returns: Json
      }
      get_restaurant_order_stats: {
        Args: {
          p_restaurant_id: string
          p_start_date: string
          p_end_date: string
        }
        Returns: Json
      }
      get_restaurant_payout_summary: {
        Args: {
          p_restaurant_id: string
        }
        Returns: Json
      }
      get_restaurant_revenue_stats: {
        Args: {
          p_restaurant_id: string
          p_start_date: string
          p_end_date: string
        }
        Returns: Json
      }
      get_revenue_metrics: {
        Args: {
          p_start_date: string
          p_end_date: string
        }
        Returns: Json
      }
      get_survey_analytics: {
        Args: {
          p_survey_id: string
        }
        Returns: Json
      }
      get_top_selling_items:
        | {
            Args: {
              p_restaurant_id: string
              p_start_date: string
              p_end_date: string
              p_limit: number
            }
            Returns: {
              item_id: string
              item_name: string
              total_quantity: number
              total_revenue: number
              order_count: number
            }[]
          }
        | {
            Args: {
              p_start_date: string
              p_end_date: string
              p_limit: number
            }
            Returns: {
              item_id: string
              item_name: string
              restaurant_id: string
              restaurant_name: string
              total_orders: number
              total_revenue: number
              average_rating: number
            }[]
          }
      get_unsettled_cod_amount: {
        Args: {
          p_partner_id: string
        }
        Returns: number
      }
      get_user_metrics: {
        Args: {
          p_start_date: string
          p_end_date: string
        }
        Returns: Json
      }
      gettransactionid: {
        Args: Record<PropertyKey, never>
        Returns: unknown
      }
      gidx_in: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gidx_out: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      increment_campaign_spend: {
        Args: {
          p_campaign_id: string
          p_amount: number
        }
        Returns: undefined
      }
      json: {
        Args: {
          "": unknown
        }
        Returns: Json
      }
      jsonb: {
        Args: {
          "": unknown
        }
        Returns: Json
      }
      longtransactionsenabled: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      path: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      pgis_asflatgeobuf_finalfn: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      pgis_asgeobuf_finalfn: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      pgis_asmvt_finalfn: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      pgis_asmvt_serialfn: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      pgis_geometry_clusterintersecting_finalfn: {
        Args: {
          "": unknown
        }
        Returns: unknown[]
      }
      pgis_geometry_clusterwithin_finalfn: {
        Args: {
          "": unknown
        }
        Returns: unknown[]
      }
      pgis_geometry_collect_finalfn: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      pgis_geometry_makeline_finalfn: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      pgis_geometry_polygonize_finalfn: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      pgis_geometry_union_parallel_finalfn: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      pgis_geometry_union_parallel_serialfn: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      point: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      polygon: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      populate_geometry_columns:
        | {
            Args: {
              tbl_oid: unknown
              use_typmod?: boolean
            }
            Returns: number
          }
        | {
            Args: {
              use_typmod?: boolean
            }
            Returns: string
          }
      postgis_addbbox: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      postgis_constraint_dims: {
        Args: {
          geomschema: string
          geomtable: string
          geomcolumn: string
        }
        Returns: number
      }
      postgis_constraint_srid: {
        Args: {
          geomschema: string
          geomtable: string
          geomcolumn: string
        }
        Returns: number
      }
      postgis_constraint_type: {
        Args: {
          geomschema: string
          geomtable: string
          geomcolumn: string
        }
        Returns: string
      }
      postgis_dropbbox: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      postgis_extensions_upgrade: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_full_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_geos_noop: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      postgis_geos_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_getbbox: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      postgis_hasbbox: {
        Args: {
          "": unknown
        }
        Returns: boolean
      }
      postgis_index_supportfn: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      postgis_lib_build_date: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_lib_revision: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_lib_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_libjson_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_liblwgeom_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_libprotobuf_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_libxml_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_noop: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      postgis_proj_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_scripts_build_date: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_scripts_installed: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_scripts_released: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_svn_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_type_name: {
        Args: {
          geomname: string
          coord_dimension: number
          use_new_name?: boolean
        }
        Returns: string
      }
      postgis_typmod_dims: {
        Args: {
          "": number
        }
        Returns: number
      }
      postgis_typmod_srid: {
        Args: {
          "": number
        }
        Returns: number
      }
      postgis_typmod_type: {
        Args: {
          "": number
        }
        Returns: string
      }
      postgis_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_wagyu_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      process_cod_deposit: {
        Args: {
          p_partner_id: string
          p_amount: number
        }
        Returns: string
      }
      process_cod_settlement: {
        Args: {
          p_partner_id: string
          p_payout_request_id: string
          p_amount: number
        }
        Returns: undefined
      }
      spheroid_in: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      spheroid_out: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      st_3dclosestpoint: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: unknown
      }
      st_3ddistance: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: number
      }
      st_3dintersects: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      st_3dlength: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      st_3dlongestline: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: unknown
      }
      st_3dmakebox: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: unknown
      }
      st_3dmaxdistance: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: number
      }
      st_3dperimeter: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      st_3dshortestline: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: unknown
      }
      st_addpoint: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: unknown
      }
      st_angle:
        | {
            Args: {
              line1: unknown
              line2: unknown
            }
            Returns: number
          }
        | {
            Args: {
              pt1: unknown
              pt2: unknown
              pt3: unknown
              pt4?: unknown
            }
            Returns: number
          }
      st_area:
        | {
            Args: {
              "": string
            }
            Returns: number
          }
        | {
            Args: {
              "": unknown
            }
            Returns: number
          }
        | {
            Args: {
              geog: unknown
              use_spheroid?: boolean
            }
            Returns: number
          }
      st_area2d: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      st_asbinary:
        | {
            Args: {
              "": unknown
            }
            Returns: string
          }
        | {
            Args: {
              "": unknown
            }
            Returns: string
          }
      st_asencodedpolyline: {
        Args: {
          geom: unknown
          nprecision?: number
        }
        Returns: string
      }
      st_asewkb: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      st_asewkt:
        | {
            Args: {
              "": string
            }
            Returns: string
          }
        | {
            Args: {
              "": unknown
            }
            Returns: string
          }
        | {
            Args: {
              "": unknown
            }
            Returns: string
          }
      st_asgeojson:
        | {
            Args: {
              "": string
            }
            Returns: string
          }
        | {
            Args: {
              geog: unknown
              maxdecimaldigits?: number
              options?: number
            }
            Returns: string
          }
        | {
            Args: {
              geom: unknown
              maxdecimaldigits?: number
              options?: number
            }
            Returns: string
          }
        | {
            Args: {
              r: Record<string, unknown>
              geom_column?: string
              maxdecimaldigits?: number
              pretty_bool?: boolean
            }
            Returns: string
          }
      st_asgml:
        | {
            Args: {
              "": string
            }
            Returns: string
          }
        | {
            Args: {
              geog: unknown
              maxdecimaldigits?: number
              options?: number
              nprefix?: string
              id?: string
            }
            Returns: string
          }
        | {
            Args: {
              geom: unknown
              maxdecimaldigits?: number
              options?: number
            }
            Returns: string
          }
        | {
            Args: {
              version: number
              geog: unknown
              maxdecimaldigits?: number
              options?: number
              nprefix?: string
              id?: string
            }
            Returns: string
          }
        | {
            Args: {
              version: number
              geom: unknown
              maxdecimaldigits?: number
              options?: number
              nprefix?: string
              id?: string
            }
            Returns: string
          }
      st_ashexewkb: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      st_askml:
        | {
            Args: {
              "": string
            }
            Returns: string
          }
        | {
            Args: {
              geog: unknown
              maxdecimaldigits?: number
              nprefix?: string
            }
            Returns: string
          }
        | {
            Args: {
              geom: unknown
              maxdecimaldigits?: number
              nprefix?: string
            }
            Returns: string
          }
      st_aslatlontext: {
        Args: {
          geom: unknown
          tmpl?: string
        }
        Returns: string
      }
      st_asmarc21: {
        Args: {
          geom: unknown
          format?: string
        }
        Returns: string
      }
      st_asmvtgeom: {
        Args: {
          geom: unknown
          bounds: unknown
          extent?: number
          buffer?: number
          clip_geom?: boolean
        }
        Returns: unknown
      }
      st_assvg:
        | {
            Args: {
              "": string
            }
            Returns: string
          }
        | {
            Args: {
              geog: unknown
              rel?: number
              maxdecimaldigits?: number
            }
            Returns: string
          }
        | {
            Args: {
              geom: unknown
              rel?: number
              maxdecimaldigits?: number
            }
            Returns: string
          }
      st_astext:
        | {
            Args: {
              "": string
            }
            Returns: string
          }
        | {
            Args: {
              "": unknown
            }
            Returns: string
          }
        | {
            Args: {
              "": unknown
            }
            Returns: string
          }
      st_astwkb:
        | {
            Args: {
              geom: unknown[]
              ids: number[]
              prec?: number
              prec_z?: number
              prec_m?: number
              with_sizes?: boolean
              with_boxes?: boolean
            }
            Returns: string
          }
        | {
            Args: {
              geom: unknown
              prec?: number
              prec_z?: number
              prec_m?: number
              with_sizes?: boolean
              with_boxes?: boolean
            }
            Returns: string
          }
      st_asx3d: {
        Args: {
          geom: unknown
          maxdecimaldigits?: number
          options?: number
        }
        Returns: string
      }
      st_azimuth:
        | {
            Args: {
              geog1: unknown
              geog2: unknown
            }
            Returns: number
          }
        | {
            Args: {
              geom1: unknown
              geom2: unknown
            }
            Returns: number
          }
      st_boundary: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      st_boundingdiagonal: {
        Args: {
          geom: unknown
          fits?: boolean
        }
        Returns: unknown
      }
      st_buffer:
        | {
            Args: {
              geom: unknown
              radius: number
              options?: string
            }
            Returns: unknown
          }
        | {
            Args: {
              geom: unknown
              radius: number
              quadsegs: number
            }
            Returns: unknown
          }
      st_buildarea: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      st_centroid:
        | {
            Args: {
              "": string
            }
            Returns: unknown
          }
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
      st_cleangeometry: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      st_clipbybox2d: {
        Args: {
          geom: unknown
          box: unknown
        }
        Returns: unknown
      }
      st_closestpoint: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: unknown
      }
      st_clusterintersecting: {
        Args: {
          "": unknown[]
        }
        Returns: unknown[]
      }
      st_collect:
        | {
            Args: {
              "": unknown[]
            }
            Returns: unknown
          }
        | {
            Args: {
              geom1: unknown
              geom2: unknown
            }
            Returns: unknown
          }
      st_collectionextract: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      st_collectionhomogenize: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      st_concavehull: {
        Args: {
          param_geom: unknown
          param_pctconvex: number
          param_allow_holes?: boolean
        }
        Returns: unknown
      }
      st_contains: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      st_containsproperly: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      st_convexhull: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      st_coorddim: {
        Args: {
          geometry: unknown
        }
        Returns: number
      }
      st_coveredby:
        | {
            Args: {
              geog1: unknown
              geog2: unknown
            }
            Returns: boolean
          }
        | {
            Args: {
              geom1: unknown
              geom2: unknown
            }
            Returns: boolean
          }
      st_covers:
        | {
            Args: {
              geog1: unknown
              geog2: unknown
            }
            Returns: boolean
          }
        | {
            Args: {
              geom1: unknown
              geom2: unknown
            }
            Returns: boolean
          }
      st_crosses: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      st_curvetoline: {
        Args: {
          geom: unknown
          tol?: number
          toltype?: number
          flags?: number
        }
        Returns: unknown
      }
      st_delaunaytriangles: {
        Args: {
          g1: unknown
          tolerance?: number
          flags?: number
        }
        Returns: unknown
      }
      st_difference: {
        Args: {
          geom1: unknown
          geom2: unknown
          gridsize?: number
        }
        Returns: unknown
      }
      st_dimension: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      st_disjoint: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      st_distance:
        | {
            Args: {
              geog1: unknown
              geog2: unknown
              use_spheroid?: boolean
            }
            Returns: number
          }
        | {
            Args: {
              geom1: unknown
              geom2: unknown
            }
            Returns: number
          }
      st_distancesphere:
        | {
            Args: {
              geom1: unknown
              geom2: unknown
            }
            Returns: number
          }
        | {
            Args: {
              geom1: unknown
              geom2: unknown
              radius: number
            }
            Returns: number
          }
      st_distancespheroid: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: number
      }
      st_dump: {
        Args: {
          "": unknown
        }
        Returns: Database["public"]["CompositeTypes"]["geometry_dump"][]
      }
      st_dumppoints: {
        Args: {
          "": unknown
        }
        Returns: Database["public"]["CompositeTypes"]["geometry_dump"][]
      }
      st_dumprings: {
        Args: {
          "": unknown
        }
        Returns: Database["public"]["CompositeTypes"]["geometry_dump"][]
      }
      st_dumpsegments: {
        Args: {
          "": unknown
        }
        Returns: Database["public"]["CompositeTypes"]["geometry_dump"][]
      }
      st_dwithin: {
        Args: {
          geog1: unknown
          geog2: unknown
          tolerance: number
          use_spheroid?: boolean
        }
        Returns: boolean
      }
      st_endpoint: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      st_envelope: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      st_equals: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      st_expand:
        | {
            Args: {
              box: unknown
              dx: number
              dy: number
            }
            Returns: unknown
          }
        | {
            Args: {
              box: unknown
              dx: number
              dy: number
              dz?: number
            }
            Returns: unknown
          }
        | {
            Args: {
              geom: unknown
              dx: number
              dy: number
              dz?: number
              dm?: number
            }
            Returns: unknown
          }
      st_exteriorring: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      st_flipcoordinates: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      st_force2d: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      st_force3d: {
        Args: {
          geom: unknown
          zvalue?: number
        }
        Returns: unknown
      }
      st_force3dm: {
        Args: {
          geom: unknown
          mvalue?: number
        }
        Returns: unknown
      }
      st_force3dz: {
        Args: {
          geom: unknown
          zvalue?: number
        }
        Returns: unknown
      }
      st_force4d: {
        Args: {
          geom: unknown
          zvalue?: number
          mvalue?: number
        }
        Returns: unknown
      }
      st_forcecollection: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      st_forcecurve: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      st_forcepolygonccw: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      st_forcepolygoncw: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      st_forcerhr: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      st_forcesfs: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      st_generatepoints:
        | {
            Args: {
              area: unknown
              npoints: number
            }
            Returns: unknown
          }
        | {
            Args: {
              area: unknown
              npoints: number
              seed: number
            }
            Returns: unknown
          }
      st_geogfromtext: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_geogfromwkb: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_geographyfromtext: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_geohash:
        | {
            Args: {
              geog: unknown
              maxchars?: number
            }
            Returns: string
          }
        | {
            Args: {
              geom: unknown
              maxchars?: number
            }
            Returns: string
          }
      st_geomcollfromtext: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_geomcollfromwkb: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_geometricmedian: {
        Args: {
          g: unknown
          tolerance?: number
          max_iter?: number
          fail_if_not_converged?: boolean
        }
        Returns: unknown
      }
      st_geometryfromtext: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_geometrytype: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      st_geomfromewkb: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_geomfromewkt: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_geomfromgeojson:
        | {
            Args: {
              "": Json
            }
            Returns: unknown
          }
        | {
            Args: {
              "": Json
            }
            Returns: unknown
          }
        | {
            Args: {
              "": string
            }
            Returns: unknown
          }
      st_geomfromgml: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_geomfromkml: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_geomfrommarc21: {
        Args: {
          marc21xml: string
        }
        Returns: unknown
      }
      st_geomfromtext: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_geomfromtwkb: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_geomfromwkb: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_gmltosql: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_hasarc: {
        Args: {
          geometry: unknown
        }
        Returns: boolean
      }
      st_hausdorffdistance: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: number
      }
      st_hexagon: {
        Args: {
          size: number
          cell_i: number
          cell_j: number
          origin?: unknown
        }
        Returns: unknown
      }
      st_hexagongrid: {
        Args: {
          size: number
          bounds: unknown
        }
        Returns: Record<string, unknown>[]
      }
      st_interpolatepoint: {
        Args: {
          line: unknown
          point: unknown
        }
        Returns: number
      }
      st_intersection: {
        Args: {
          geom1: unknown
          geom2: unknown
          gridsize?: number
        }
        Returns: unknown
      }
      st_intersects:
        | {
            Args: {
              geog1: unknown
              geog2: unknown
            }
            Returns: boolean
          }
        | {
            Args: {
              geom1: unknown
              geom2: unknown
            }
            Returns: boolean
          }
      st_isclosed: {
        Args: {
          "": unknown
        }
        Returns: boolean
      }
      st_iscollection: {
        Args: {
          "": unknown
        }
        Returns: boolean
      }
      st_isempty: {
        Args: {
          "": unknown
        }
        Returns: boolean
      }
      st_ispolygonccw: {
        Args: {
          "": unknown
        }
        Returns: boolean
      }
      st_ispolygoncw: {
        Args: {
          "": unknown
        }
        Returns: boolean
      }
      st_isring: {
        Args: {
          "": unknown
        }
        Returns: boolean
      }
      st_issimple: {
        Args: {
          "": unknown
        }
        Returns: boolean
      }
      st_isvalid: {
        Args: {
          "": unknown
        }
        Returns: boolean
      }
      st_isvaliddetail: {
        Args: {
          geom: unknown
          flags?: number
        }
        Returns: Database["public"]["CompositeTypes"]["valid_detail"]
      }
      st_isvalidreason: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      st_isvalidtrajectory: {
        Args: {
          "": unknown
        }
        Returns: boolean
      }
      st_length:
        | {
            Args: {
              "": string
            }
            Returns: number
          }
        | {
            Args: {
              "": unknown
            }
            Returns: number
          }
        | {
            Args: {
              geog: unknown
              use_spheroid?: boolean
            }
            Returns: number
          }
      st_length2d: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      st_letters: {
        Args: {
          letters: string
          font?: Json
        }
        Returns: unknown
      }
      st_linecrossingdirection: {
        Args: {
          line1: unknown
          line2: unknown
        }
        Returns: number
      }
      st_linefromencodedpolyline: {
        Args: {
          txtin: string
          nprecision?: number
        }
        Returns: unknown
      }
      st_linefrommultipoint: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      st_linefromtext: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_linefromwkb: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_linelocatepoint: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: number
      }
      st_linemerge: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      st_linestringfromwkb: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_linetocurve: {
        Args: {
          geometry: unknown
        }
        Returns: unknown
      }
      st_locatealong: {
        Args: {
          geometry: unknown
          measure: number
          leftrightoffset?: number
        }
        Returns: unknown
      }
      st_locatebetween: {
        Args: {
          geometry: unknown
          frommeasure: number
          tomeasure: number
          leftrightoffset?: number
        }
        Returns: unknown
      }
      st_locatebetweenelevations: {
        Args: {
          geometry: unknown
          fromelevation: number
          toelevation: number
        }
        Returns: unknown
      }
      st_longestline: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: unknown
      }
      st_m: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      st_makebox2d: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: unknown
      }
      st_makeline:
        | {
            Args: {
              "": unknown[]
            }
            Returns: unknown
          }
        | {
            Args: {
              geom1: unknown
              geom2: unknown
            }
            Returns: unknown
          }
      st_makepolygon: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      st_makevalid:
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
        | {
            Args: {
              geom: unknown
              params: string
            }
            Returns: unknown
          }
      st_maxdistance: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: number
      }
      st_maximuminscribedcircle: {
        Args: {
          "": unknown
        }
        Returns: Record<string, unknown>
      }
      st_memsize: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      st_minimumboundingcircle: {
        Args: {
          inputgeom: unknown
          segs_per_quarter?: number
        }
        Returns: unknown
      }
      st_minimumboundingradius: {
        Args: {
          "": unknown
        }
        Returns: Record<string, unknown>
      }
      st_minimumclearance: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      st_minimumclearanceline: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      st_mlinefromtext: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_mlinefromwkb: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_mpointfromtext: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_mpointfromwkb: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_mpolyfromtext: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_mpolyfromwkb: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_multi: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      st_multilinefromwkb: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_multilinestringfromtext: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_multipointfromtext: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_multipointfromwkb: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_multipolyfromwkb: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_multipolygonfromtext: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_ndims: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      st_node: {
        Args: {
          g: unknown
        }
        Returns: unknown
      }
      st_normalize: {
        Args: {
          geom: unknown
        }
        Returns: unknown
      }
      st_npoints: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      st_nrings: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      st_numgeometries: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      st_numinteriorring: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      st_numinteriorrings: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      st_numpatches: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      st_numpoints: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      st_offsetcurve: {
        Args: {
          line: unknown
          distance: number
          params?: string
        }
        Returns: unknown
      }
      st_orderingequals: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      st_orientedenvelope: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      st_overlaps: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      st_perimeter:
        | {
            Args: {
              "": unknown
            }
            Returns: number
          }
        | {
            Args: {
              geog: unknown
              use_spheroid?: boolean
            }
            Returns: number
          }
      st_perimeter2d: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      st_pointfromtext: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_pointfromwkb: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_pointm: {
        Args: {
          xcoordinate: number
          ycoordinate: number
          mcoordinate: number
          srid?: number
        }
        Returns: unknown
      }
      st_pointonsurface: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      st_points: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      st_pointz: {
        Args: {
          xcoordinate: number
          ycoordinate: number
          zcoordinate: number
          srid?: number
        }
        Returns: unknown
      }
      st_pointzm: {
        Args: {
          xcoordinate: number
          ycoordinate: number
          zcoordinate: number
          mcoordinate: number
          srid?: number
        }
        Returns: unknown
      }
      st_polyfromtext: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_polyfromwkb: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_polygonfromtext: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_polygonfromwkb: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_polygonize: {
        Args: {
          "": unknown[]
        }
        Returns: unknown
      }
      st_project: {
        Args: {
          geog: unknown
          distance: number
          azimuth: number
        }
        Returns: unknown
      }
      st_quantizecoordinates: {
        Args: {
          g: unknown
          prec_x: number
          prec_y?: number
          prec_z?: number
          prec_m?: number
        }
        Returns: unknown
      }
      st_reduceprecision: {
        Args: {
          geom: unknown
          gridsize: number
        }
        Returns: unknown
      }
      st_relate: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: string
      }
      st_removerepeatedpoints: {
        Args: {
          geom: unknown
          tolerance?: number
        }
        Returns: unknown
      }
      st_reverse: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      st_segmentize: {
        Args: {
          geog: unknown
          max_segment_length: number
        }
        Returns: unknown
      }
      st_setsrid:
        | {
            Args: {
              geog: unknown
              srid: number
            }
            Returns: unknown
          }
        | {
            Args: {
              geom: unknown
              srid: number
            }
            Returns: unknown
          }
      st_sharedpaths: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: unknown
      }
      st_shiftlongitude: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      st_shortestline: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: unknown
      }
      st_simplifypolygonhull: {
        Args: {
          geom: unknown
          vertex_fraction: number
          is_outer?: boolean
        }
        Returns: unknown
      }
      st_split: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: unknown
      }
      st_square: {
        Args: {
          size: number
          cell_i: number
          cell_j: number
          origin?: unknown
        }
        Returns: unknown
      }
      st_squaregrid: {
        Args: {
          size: number
          bounds: unknown
        }
        Returns: Record<string, unknown>[]
      }
      st_srid:
        | {
            Args: {
              geog: unknown
            }
            Returns: number
          }
        | {
            Args: {
              geom: unknown
            }
            Returns: number
          }
      st_startpoint: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      st_subdivide: {
        Args: {
          geom: unknown
          maxvertices?: number
          gridsize?: number
        }
        Returns: unknown[]
      }
      st_summary:
        | {
            Args: {
              "": unknown
            }
            Returns: string
          }
        | {
            Args: {
              "": unknown
            }
            Returns: string
          }
      st_swapordinates: {
        Args: {
          geom: unknown
          ords: unknown
        }
        Returns: unknown
      }
      st_symdifference: {
        Args: {
          geom1: unknown
          geom2: unknown
          gridsize?: number
        }
        Returns: unknown
      }
      st_symmetricdifference: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: unknown
      }
      st_tileenvelope: {
        Args: {
          zoom: number
          x: number
          y: number
          bounds?: unknown
          margin?: number
        }
        Returns: unknown
      }
      st_touches: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      st_transform:
        | {
            Args: {
              geom: unknown
              from_proj: string
              to_proj: string
            }
            Returns: unknown
          }
        | {
            Args: {
              geom: unknown
              from_proj: string
              to_srid: number
            }
            Returns: unknown
          }
        | {
            Args: {
              geom: unknown
              to_proj: string
            }
            Returns: unknown
          }
      st_triangulatepolygon: {
        Args: {
          g1: unknown
        }
        Returns: unknown
      }
      st_union:
        | {
            Args: {
              "": unknown[]
            }
            Returns: unknown
          }
        | {
            Args: {
              geom1: unknown
              geom2: unknown
            }
            Returns: unknown
          }
        | {
            Args: {
              geom1: unknown
              geom2: unknown
              gridsize: number
            }
            Returns: unknown
          }
      st_voronoilines: {
        Args: {
          g1: unknown
          tolerance?: number
          extend_to?: unknown
        }
        Returns: unknown
      }
      st_voronoipolygons: {
        Args: {
          g1: unknown
          tolerance?: number
          extend_to?: unknown
        }
        Returns: unknown
      }
      st_within: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      st_wkbtosql: {
        Args: {
          wkb: string
        }
        Returns: unknown
      }
      st_wkttosql: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      st_wrapx: {
        Args: {
          geom: unknown
          wrap: number
          move: number
        }
        Returns: unknown
      }
      st_x: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      st_xmax: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      st_xmin: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      st_y: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      st_ymax: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      st_ymin: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      st_z: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      st_zmax: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      st_zmflag: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      st_zmin: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      text: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      unlockrows: {
        Args: {
          "": string
        }
        Returns: number
      }
      update_user_points_leaderboard: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      updategeometrysrid: {
        Args: {
          catalogn_name: string
          schema_name: string
          table_name: string
          column_name: string
          new_srid_in: number
        }
        Returns: string
      }
      validate_cod_collection: {
        Args: {
          p_order_id: string
        }
        Returns: boolean
      }
      validate_promotion: {
        Args: {
          p_promotion_id: string
          p_order_amount: number
        }
        Returns: boolean
      }
      verify_pickup_otp: {
        Args: {
          p_order_id: string
          p_otp: string
        }
        Returns: boolean
      }
      verify_store_contact:
        | {
            Args: {
              p_registration_id: string
              p_type: Database["public"]["Enums"]["verification_type"]
              p_code: string
            }
            Returns: boolean
          }
        | {
            Args: {
              p_registration_id: string
              p_type: string
              p_code: string
            }
            Returns: boolean
          }
    }
    Enums: {
      content_status: "pending" | "approved" | "rejected" | "hidden" | "flagged"
      content_type: "review" | "comment" | "report"
      order_status:
        | "pending"
        | "confirmed"
        | "preparing"
        | "ready_for_pickup"
        | "picked_up"
        | "delivered"
        | "cancelled"
      payment_method_type:
        | "credit_card"
        | "debit_card"
        | "wallet"
        | "bank_transfer"
      promotion_type:
        | "percentage"
        | "fixed_amount"
        | "buy_one_get_one"
        | "free_item"
      question_type: "multiple_choice" | "rating" | "text" | "boolean" | "scale"
      store_notification_type: "new_order" | "payout" | "rating" | "low_stock"
      store_registration_status:
        | "pending"
        | "contact_verification"
        | "document_verification"
        | "approved"
        | "rejected"
      store_type: "restaurant" | "grocery" | "pet_food" | "beverages" | "other"
      support_message_status: "sent" | "delivered" | "read"
      tax_report_status: "generated" | "verified" | "filed" | "error"
      transaction_status: "pending" | "completed" | "failed" | "refunded"
      user_role:
        | "admin"
        | "customer"
        | "delivery_partner"
        | "restaurant"
        | "lead_partner"
      vehicle_type: "bike" | "scooter" | "car"
      verification_type: "email" | "phone"
    }
    CompositeTypes: {
      geometry_dump: {
        path: number[] | null
        geom: unknown | null
      }
      valid_detail: {
        valid: boolean | null
        reason: string | null
        location: unknown | null
      }
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
