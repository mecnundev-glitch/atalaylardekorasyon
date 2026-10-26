export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      services: {
        Row: {
          id: string
          slug: string
          title: string
          subtitle: string
          short_description: string
          description: string
          scope: Json
          process_steps: Json
          technical_standards: Json
          icon_name: string
          cover_image_url: string
          features: Json
          faqs: Json | null
          related_slugs: Json | null
          is_active: boolean
          display_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          slug: string
          title: string
          subtitle: string
          short_description: string
          description: string
          scope?: Json
          process_steps?: Json
          technical_standards?: Json
          icon_name?: string
          cover_image_url: string
          features?: Json
          faqs?: Json | null
          related_slugs?: Json | null
          is_active?: boolean
          display_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          slug?: string
          title?: string
          subtitle?: string
          short_description?: string
          description?: string
          scope?: Json
          process_steps?: Json
          technical_standards?: Json
          icon_name?: string
          cover_image_url?: string
          features?: Json
          faqs?: Json | null
          related_slugs?: Json | null
          is_active?: boolean
          display_order?: number
          created_at?: string
          updated_at?: string
        }
      }
      projects: {
        Row: {
          id: string
          slug: string
          title: string
          service_id: string | null
          service_slug: string
          service_title: string
          category: string
          location: string
          completion_duration: string
          completion_date: string | null
          before_image_url: string | null
          after_image_url: string
          summary: string
          details: string
          materials_used: Json
          is_featured: boolean
          is_published: boolean
          is_demo: boolean
          display_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          slug: string
          title: string
          service_id?: string | null
          service_slug: string
          service_title: string
          category: string
          location: string
          completion_duration: string
          completion_date?: string | null
          before_image_url?: string | null
          after_image_url: string
          summary: string
          details: string
          materials_used?: Json
          is_featured?: boolean
          is_published?: boolean
          is_demo?: boolean
          display_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          slug?: string
          title?: string
          service_id?: string | null
          service_slug?: string
          service_title?: string
          category?: string
          location?: string
          completion_duration?: string
          completion_date?: string | null
          before_image_url?: string | null
          after_image_url?: string
          summary?: string
          details?: string
          materials_used?: Json
          is_featured?: boolean
          is_published?: boolean
          is_demo?: boolean
          display_order?: number
          created_at?: string
          updated_at?: string
        }
      }
      project_images: {
        Row: {
          id: string
          project_id: string
          image_url: string
          alt_text: string
          caption: string | null
          image_type: 'gallery' | 'before' | 'after'
          display_order: number
          created_at: string
        }
        Insert: {
          id?: string
          project_id: string
          image_url: string
          alt_text: string
          caption?: string | null
          image_type?: 'gallery' | 'before' | 'after'
          display_order?: number
          created_at?: string
        }
        Update: {
          id?: string
          project_id?: string
          image_url?: string
          alt_text?: string
          caption?: string | null
          image_type?: 'gallery' | 'before' | 'after'
          display_order?: number
          created_at?: string
        }
      }
      testimonials: {
        Row: {
          id: string
          client_name: string
          district: string
          service_title: string
          comment: string
          rating: number
          is_approved: boolean
          display_order: number
          created_at: string
        }
        Insert: {
          id?: string
          client_name: string
          district: string
          service_title: string
          comment: string
          rating?: number
          is_approved?: boolean
          display_order?: number
          created_at?: string
        }
        Update: {
          id?: string
          client_name?: string
          district?: string
          service_title?: string
          comment?: string
          rating?: number
          is_approved?: boolean
          display_order?: number
          created_at?: string
        }
      }
      quote_requests: {
        Row: {
          id: string
          full_name: string
          phone: string
          district: string
          service_id: string | null
          service_slug: string | null
          service_title: string | null
          estimated_area: number | null
          notes: string | null
          attachment_urls: Json
          status: 'new' | 'contacted' | 'scheduled' | 'completed' | 'cancelled'
          ip_hash: string | null
          user_agent: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          full_name: string
          phone: string
          district: string
          service_id?: string | null
          service_slug?: string | null
          service_title?: string | null
          estimated_area?: number | null
          notes?: string | null
          attachment_urls?: Json
          status?: 'new' | 'contacted' | 'scheduled' | 'completed' | 'cancelled'
          ip_hash?: string | null
          user_agent?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string
          phone?: string
          district?: string
          service_id?: string | null
          service_slug?: string | null
          service_title?: string | null
          estimated_area?: number | null
          notes?: string | null
          attachment_urls?: Json
          status?: 'new' | 'contacted' | 'scheduled' | 'completed' | 'cancelled'
          ip_hash?: string | null
          user_agent?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      site_settings: {
        Row: {
          key: string
          value: Json
          description: string | null
          updated_at: string
        }
        Insert: {
          key: string
          value: Json
          description?: string | null
          updated_at?: string
        }
        Update: {
          key?: string
          value?: Json
          description?: string | null
          updated_at?: string
        }
      }
      admin_profiles: {
        Row: {
          id: string
          email: string
          full_name: string
          role: 'superadmin' | 'admin' | 'editor'
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name: string
          role?: 'superadmin' | 'admin' | 'editor'
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string
          role?: 'superadmin' | 'admin' | 'editor'
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
