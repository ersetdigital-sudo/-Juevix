export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          id: number;
          name: string;
          slug: string;
          icon: string;
          sort_order: number;
          created_at: string;
        };
      };
      platforms: {
        Row: {
          id: number;
          name: string;
          slug: string;
          icon: string;
          sort_order: number;
          created_at: string;
        };
      };
      games: {
        Row: {
          id: number;
          slug: string;
          name: string;
          category: string;
          platform: string[];
          rating: number;
          reviews: string;
          developer: string | null;
          image: string | null;
          gradient: string | null;
          label: string | null;
          is_featured: boolean;
          sort_order: number;
          created_at: string;
        };
      };
      topup_nominals: {
        Row: {
          id: number;
          game_slug: string;
          label: string;
          price: number;
          badge: string | null;
          badge_type: string | null;
          original_price: number | null;
          sort_order: number;
          created_at: string;
        };
      };
      payment_methods: {
        Row: {
          id: number;
          category: string;
          name: string;
          label: string;
          code: string;
          color: string;
          sort_order: number;
          created_at: string;
        };
      };
      hero_slides: {
        Row: {
          id: number;
          image: string;
          alt: string;
          href: string;
          sort_order: number;
          is_active: boolean;
          created_at: string;
        };
      };
    };
  };
}
