import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChatMessage } from "@/types/chat";

interface MessageAreaProps {
  messages: ChatMessage[];
  currentUser: string | null;
}

export function MessageArea({ messages, currentUser }: MessageAreaProps) {
  return (
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
  );
}