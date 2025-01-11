import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronDown, ChevronUp, File, Image as ImageIcon, Link as LinkIcon, Mic, Users, Video, X } from "lucide-react";

interface InfoPanelProps {
  showFiles: boolean;
  showMembers: boolean;
  onToggleFiles: () => void;
  onToggleMembers: () => void;
}

export function InfoPanel({ showFiles, showMembers, onToggleFiles, onToggleMembers }: InfoPanelProps) {
  return (
    <div className="w-80 border-l">
      <div className="p-4 border-b flex justify-between items-center">
        <h3 className="font-semibold">Group Info</h3>
        <Button variant="ghost" size="icon">
          <X className="h-5 w-5" />
        </Button>
      </div>
      <div className="p-4">
        <div className="mb-6">
          <div
            className="flex items-center justify-between mb-2 cursor-pointer"
            onClick={onToggleFiles}
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

        <div>
          <div
            className="flex items-center justify-between mb-2 cursor-pointer"
            onClick={onToggleMembers}
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
  );
}