import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  Phone, 
  MoreVertical, 
  X, 
  ChevronDown,
  ChevronUp,
  Image as ImageIcon,
  Video,
  File,
  Link as LinkIcon,
  Mic,
  Users,
  Send
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface ChatMessage {
  id: string;
  sender_id: string;
  content: string;
  created_at: string;
  sender: {
    full_name: string;
    avatar_url?: string | null;
  };
}

interface ChatRoom {
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
    // Get current user
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
    }
  }, [selectedRoom]);

  const fetchChatRooms = async () => {
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

    if (error) {
      toast({
        title: "Error fetching chat rooms",
        description: error.message,
        variant: "destructive"
      });
      return;
    }

    setChatRooms(data as ChatRoom[]);
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

    setNewMessage("");
    fetchMessages(selectedRoom.id);
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-background">
      {/* Chat List Sidebar */}
      <div className="w-80 border-r">
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search chats..."
              className="pl-9"
            />
          </div>
        </div>
        <ScrollArea className="h-[calc(100vh-8rem)]">
          {chatRooms.map((room) => (
            <div
              key={room.id}
              className={`p-4 cursor-pointer hover:bg-accent ${
                selectedRoom?.id === room.id ? "bg-accent" : ""
              }`}
              onClick={() => setSelectedRoom(room)}
            >
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={`https://avatar.vercel.sh/${room.user.id}`} />
                  <AvatarFallback>{room.user.full_name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <p className="font-medium truncate">{room.metadata.title}</p>
                    <span className="text-xs text-muted-foreground">
                      {new Date(room.last_message_at).toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">
                    {room.status}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </ScrollArea>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedRoom ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div>
                  <h2 className="font-semibold">{selectedRoom.metadata.title}</h2>
                  <p className="text-sm text-muted-foreground">
                    {selectedRoom.metadata.members_count} members, {selectedRoom.metadata.online_count} online
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon">
                  <Phone className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Messages Area */}
            <ScrollArea className="flex-1 p-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 mb-4 ${
                    message.sender_id === currentUser
                      ? "flex-row-reverse"
                      : ""
                  }`}
                >
                  <Avatar>
                    <AvatarImage src={message.sender.avatar_url || undefined} />
                    <AvatarFallback>{message.sender.full_name[0]}</AvatarFallback>
                  </Avatar>
                  <div
                    className={`flex flex-col ${
                      message.sender_id === currentUser
                        ? "items-end"
                        : ""
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{message.sender.full_name}</span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(message.created_at).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                    <div className="mt-1 bg-accent rounded-lg p-3">
                      <p>{message.content}</p>
                    </div>
                  </div>
                </div>
              ))}
            </ScrollArea>

            {/* Message Input */}
            <div className="p-4 border-t">
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
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

      {/* Info Sidebar */}
      <div className="w-80 border-l">
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="font-semibold">Group Info</h3>
          <Button variant="ghost" size="icon">
            <X className="h-5 w-5" />
          </Button>
        </div>
        <div className="p-4">
          {/* Files Section */}
          <div className="mb-6">
            <div
              className="flex items-center justify-between mb-2 cursor-pointer"
              onClick={() => setShowFiles(!showFiles)}
            >
              <h4 className="font-medium">Files</h4>
              {showFiles ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </div>
            {showFiles && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ImageIcon className="h-4 w-4" />
                    <span>265 photos</span>
                  </div>
                  <ChevronDown className="h-4 w-4" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Video className="h-4 w-4" />
                    <span>13 videos</span>
                  </div>
                  <ChevronDown className="h-4 w-4" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <File className="h-4 w-4" />
                    <span>378 files</span>
                  </div>
                  <ChevronDown className="h-4 w-4" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Mic className="h-4 w-4" />
                    <span>21 audio files</span>
                  </div>
                  <ChevronDown className="h-4 w-4" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <LinkIcon className="h-4 w-4" />
                    <span>45 shared links</span>
                  </div>
                  <ChevronDown className="h-4 w-4" />
                </div>
              </div>
            )}
          </div>

          {/* Members Section */}
          <div>
            <div
              className="flex items-center justify-between mb-2 cursor-pointer"
              onClick={() => setShowMembers(!showMembers)}
            >
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <h4 className="font-medium">23 members</h4>
              </div>
              {showMembers ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </div>
            {showMembers && (
              <ScrollArea className="h-[200px]">
                {/* Sample members - replace with actual data */}
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-3 mb-3">
                    <Avatar>
                      <AvatarImage src={`https://avatar.vercel.sh/${i}`} />
                      <AvatarFallback>U{i}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">User Name {i + 1}</p>
                      <p className="text-sm text-muted-foreground">
                        {i === 0 ? "admin" : "member"}
                      </p>
                    </div>
                  </div>
                ))}
              </ScrollArea>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
