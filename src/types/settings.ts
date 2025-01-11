export interface NotificationChannels {
  email: boolean;
  push: boolean;
  sms: boolean;
}

export interface NotificationTypes {
  payout: boolean;
  rating: boolean;
  low_stock: boolean;
  new_order: boolean;
}

export interface UserSettings {
  id: string;
  user_id: string;
  language: string;
  currency: string;
  theme: string;
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
}