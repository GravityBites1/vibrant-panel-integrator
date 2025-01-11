export interface NotificationChannels {
  email: boolean;
  push: boolean;
  sms: boolean;
}

export interface NotificationTypes {
  new_order: boolean;
  payout: boolean;
  rating: boolean;
  low_stock: boolean;
}

export interface UserSettings {
  id: string;
  user_id: string;
  language: string;
  currency: string;
  theme: string;
  delivery_preferences: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  max_concurrent_orders: number;
  auto_accept_orders: boolean;
  preparation_buffer_time: number;
  delivery_radius: number;
}

export interface NotificationPreferences {
  id: string;
  user_id: string;
  channels: NotificationChannels;
  types: NotificationTypes;
  created_at: string;
  updated_at: string;
}