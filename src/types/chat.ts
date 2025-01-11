export interface ChatMessage {
  id: string;
  sender_id: string;
  content: string;
  created_at: string;
  sender: {
    full_name: string;
    avatar_url?: string | null;
  };
}

export interface ChatRoom {
  id: string;
  user_id: string;
  status: string;
  last_message_at: string;
  metadata: {
    title: string;
    members_count: number;
    online_count: number;
  };
  user: {
    id: string;
    full_name: string;
    email: string;
  };
}