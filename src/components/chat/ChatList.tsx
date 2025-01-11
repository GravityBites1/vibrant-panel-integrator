import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ChatRoom } from "@/types/chat";

interface ChatListProps {
  chatRooms: ChatRoom[];
  selectedRoom: ChatRoom | null;
  onSelectRoom: (room: ChatRoom) => void;
}

export function ChatList({ chatRooms, selectedRoom, onSelectRoom }: ChatListProps) {
  return (
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
            onClick={() => onSelectRoom(room)}
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
  );
}