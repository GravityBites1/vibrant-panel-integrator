import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";
import { Send, FileIcon, Phone, MoreVertical, Search, Users } from "lucide-react";

interface ChatRoom {
  id: string;
  status: string;
  last_message_at: string;
  metadata: {
    last_message?: string;
  };
  user: {
    id: string;
    full_name: string;
    email: string;
  }
}

interface ChatMessage {
  id: string;
  content: string;
  created_at: string;
  sender: {
    id: string;
    full_name: string;
    email: string;
  };
  attachments: string[];
}

const SupportChat = () => {
  const [message, setMessage] = useState("");
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => {
    // Get current user ID on component mount
    const getCurrentUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setCurrentUserId(user?.id || null);
    };
    getCurrentUser();
  }, []);

  const { data: chats, isLoading: chatsLoading } = useQuery({
    queryKey: ['chat_rooms'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('chat_rooms')
        .select(`
          id,
          status,
          last_message_at,
          metadata,
          user:user_id (
            id,
            full_name,
            email
          )
        `)
        .order('last_message_at', { ascending: false });

      if (error) throw error;
      return data as ChatRoom[];
    }
  });

  const { data: messages, isLoading: messagesLoading } = useQuery({
    queryKey: ['chat_messages', selectedChat],
    queryFn: async () => {
      if (!selectedChat) return [];
      
      const { data, error } = await supabase
        .from('chat_messages')
        .select(`
          id,
          content,
          created_at,
          sender:sender_id (
            id,
            full_name,
            email
          ),
          attachments
        `)
        .eq('room_id', selectedChat)
        .order('created_at', { ascending: true });

      if (error) throw error;
      return data as ChatMessage[];
    },
    enabled: !!selectedChat
  });

  const sendMessage = async () => {
    if (!message.trim() || !selectedChat || !currentUserId) return;

    const { error } = await supabase
      .from('chat_messages')
      .insert({
        room_id: selectedChat,
        content: message,
        sender_id: currentUserId
      });

    if (!error) {
      setMessage("");
    }
  };

  return (
    <div className="flex h-[calc(100vh-120px)]">
      {/* Left Sidebar - Chat List */}
      <div className="w-80 border-r bg-background">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Support Chat</h2>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-5 w-5" />
            </Button>
          </div>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search chats..." className="pl-8" />
          </div>
        </div>
        <ScrollArea className="h-[calc(100vh-200px)]">
          {chats?.map((chat) => (
            <div
              key={chat.id}
              onClick={() => setSelectedChat(chat.id)}
              className={`p-4 cursor-pointer hover:bg-accent ${
                selectedChat === chat.id ? "bg-accent" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${chat.user.id}`} />
                  <AvatarFallback>
                    {chat.user.full_name?.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <p className="font-medium truncate">{chat.user.full_name}</p>
                    <span className="text-xs text-muted-foreground">
                      {chat.last_message_at && format(new Date(chat.last_message_at), 'HH:mm')}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">
                    {chat.metadata?.last_message || "No messages yet"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </ScrollArea>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedChat ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b bg-background">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${
                      chats?.find(c => c.id === selectedChat)?.user.id
                    }`} />
                    <AvatarFallback>
                      {chats?.find(c => c.id === selectedChat)?.user.full_name
                        ?.split(' ')
                        .map(n => n[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">
                      {chats?.find(c => c.id === selectedChat)?.user.full_name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {chats?.find(c => c.id === selectedChat)?.status}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Phone className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <FileIcon className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Users className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages?.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${
                      msg.sender.id === currentUserId ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[70%] ${
                        msg.sender.id === currentUserId
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      } rounded-lg p-3`}
                    >
                      <p>{msg.content}</p>
                      <span className="text-xs opacity-70">
                        {format(new Date(msg.created_at), 'HH:mm')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Message Input */}
            <div className="p-4 border-t bg-background">
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Type a message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                />
                <Button onClick={sendMessage}>
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            Select a chat to start messaging
          </div>
        )}
      </div>

      {/* Right Sidebar - Group Info */}
      <div className="w-80 border-l bg-background p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Chat Info</h3>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </div>
        {selectedChat && (
          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-medium mb-2">Attachments</h4>
              <div className="grid grid-cols-2 gap-2">
                {messages?.filter(m => Array.isArray(m.attachments) && m.attachments.length > 0)
                  .slice(0, 4)
                  .map((msg, i) => (
                    <div key={i} className="aspect-square bg-muted rounded-lg" />
                  ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-2">Shared Files</h4>
              <div className="space-y-2">
                {messages?.filter(m => Array.isArray(m.attachments) && m.attachments.length > 0)
                  .slice(0, 3)
                  .map((msg, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <FileIcon className="h-4 w-4" />
                      <span className="text-sm">Document {i + 1}</span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SupportChat;