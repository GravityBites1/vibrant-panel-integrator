import { Button } from "@/components/ui/button";
import { MoreVertical, Phone } from "lucide-react";
import { ChatRoom } from "@/types/chat";

interface ChatHeaderProps {
  room: ChatRoom;
}

export function ChatHeader({ room }: ChatHeaderProps) {
  return (
    <div className="p-4 border-b flex justify-between items-center">
      <div className="flex items-center gap-3">
        <div>
          <h2 className="font-semibold">{room.metadata.title}</h2>
          <p className="text-sm text-muted-foreground">
            {room.metadata.members_count} members, {room.metadata.online_count} online
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
  );
}