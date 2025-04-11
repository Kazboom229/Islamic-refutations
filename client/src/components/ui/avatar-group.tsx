import * as React from "react";
import { cn } from "@/lib/utils";
import { User } from "@/lib/types";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface AvatarGroupProps {
  users: User[];
  maxCount?: number;
  className?: string;
}

export default function AvatarGroup({ 
  users, 
  maxCount = 3, 
  className 
}: AvatarGroupProps) {
  const displayUsers = users.slice(0, maxCount);
  const remaining = users.length - maxCount;

  return (
    <div className={cn("flex -space-x-2", className)}>
      {displayUsers.map((user) => (
        <Avatar 
          key={user.id} 
          className="border-2 border-background-lighter w-8 h-8" 
          title={user.name}
        >
          <AvatarFallback
            style={{ backgroundColor: user.avatarColor }}
            className="text-xs font-medium text-white"
          >
            {user.avatarInitials}
          </AvatarFallback>
        </Avatar>
      ))}
      
      {remaining > 0 && (
        <div className="relative w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-white text-xs border-2 border-background-lighter">
          +{remaining}
        </div>
      )}
    </div>
  );
}
