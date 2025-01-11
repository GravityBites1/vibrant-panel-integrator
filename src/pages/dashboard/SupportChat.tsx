import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ChatMessage, ChatRoom } from "@/types/chat";
import { ChatList } from "@/components/chat/ChatList";
import { MessageArea } from "@/components/chat/MessageArea";
import { InfoPanel } from "@/components/chat/InfoPanel";
import { ChatHeader } from "@/components/chat/ChatHeader";
import { MessageInput } from "@/components/chat/MessageInput";

export default function SupportChat() {
  const { toast } = useToast();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<ChatRoom | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [showFiles, setShowFiles] = useState(true);
  const [showMembers, setShowMembers] = useState(true);
  const [currentUser, setCurrentUser] = useState<string | null>(null);

  useEffect(() => {
    const getCurrentUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setCurrentUser(user.id);
      }
    };
    getCurrentUser();

    fetchChatRooms();
    if (selectedRoom) {
      fetchMessages(selectedRoom.id);
      subscribeToMessages(selectedRoom.id);
    }

    return () => {
      if (selectedRoom) {
        unsubscribeFromMessages(selectedRoom.id);
      }
    };
  }, [selectedRoom]);

  const fetchChatRooms = async () => {
    const { data, error } = await supabase
      .from('chat_rooms')
      .select(`
        id,
        status,
        last_message_at,
        metadata,
        user_id,
        user:profiles!chat_rooms_user_id_fkey (
          id,
          full_name,
          email
        )
      `)
      .order('last_message_at', { ascending: false });

    if (error) {
      toast({
        title: "Error fetching chat rooms",
        description: error.message,
        variant: "destructive"
      });
      return;
    }

    // Transform the data to match ChatRoom type
    const transformedRooms = data.map(room => ({
      ...room,
      metadata: {
        title: room.metadata?.title || 'Support Chat',
        members_count: room.metadata?.members_count || 2,
        online_count: room.metadata?.online_count || 1
      }
    })) as ChatRoom[];

    setChatRooms(transformedRooms);
  };

  const fetchMessages = async (roomId: string) => {
    const { data, error } = await supabase
      .from('chat_messages')
      .select(`
        id,
        sender_id,
        content,
        created_at,
        sender:profiles!chat_messages_sender_id_fkey (
          full_name,
          avatar_url
        )
      `)
      .eq('room_id', roomId)
      .order('created_at', { ascending: true });

    if (error) {
      toast({
        title: "Error fetching messages",
        description: error.message,
        variant: "destructive"
      });
      return;
    }

    setMessages(data as ChatMessage[]);
  };

  const subscribeToMessages = (roomId: string) => {
    const channel = supabase
      .channel(`room:${roomId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_messages',
          filter: `room_id=eq.${roomId}`
        },
        (payload) => {
          console.log('New message received:', payload);
          const newMessage = payload.new as ChatMessage;
          setMessages(prev => [...prev, newMessage]);
        }
      )
      .subscribe();

    console.log(`Subscribed to messages in room ${roomId}`);
  };

  const unsubscribeFromMessages = (roomId: string) => {
    supabase.channel(`room:${roomId}`).unsubscribe();
    console.log(`Unsubscribed from messages in room ${roomId}`);
  };

  const sendMessage = async () => {
    if (!selectedRoom || !newMessage.trim() || !currentUser) return;

    const { error } = await supabase
      .from('chat_messages')
      .insert({
        room_id: selectedRoom.id,
        content: newMessage,
        sender_id: currentUser
      });

    if (error) {
      toast({
        title: "Error sending message",
        description: error.message,
        variant: "destructive"
      });
      return;
    }

    // Update last_message_at in chat_room
    await supabase
      .from('chat_rooms')
      .update({ last_message_at: new Date().toISOString() })
      .eq('id', selectedRoom.id);

    setNewMessage("");
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-background">
      <ChatList 
        chatRooms={chatRooms}
        selectedRoom={selectedRoom}
        onSelectRoom={setSelectedRoom}
      />

      <div className="flex-1 flex flex-col">
        {selectedRoom ? (
          <>
            <ChatHeader room={selectedRoom} />
            <MessageArea messages={messages} currentUser={currentUser} />
            <MessageInput 
              value={newMessage}
              onChange={setNewMessage}
              onSend={sendMessage}
            />
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            Select a chat to start messaging
          </div>
        )}
      </div>

      <InfoPanel
        showFiles={showFiles}
        showMembers={showMembers}
        onToggleFiles={() => setShowFiles(!showFiles)}
        onToggleMembers={() => setShowMembers(!showMembers)}
      />
    </div>
  );
}