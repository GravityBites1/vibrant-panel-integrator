import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

interface MessageInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
}

export function MessageInput({ value, onChange, onSend }: MessageInputProps) {
  return (
    <div className="p-4 border-t">
      <div className="flex items-center gap-2">
        <Input
          placeholder="Type a message..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && onSend()}
        />
        <Button onClick={onSend}>
          <Send className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}