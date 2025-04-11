import { useState, useEffect } from "react";
import { Settings } from "lucide-react";
import { useUsers } from "@/hooks/useUsers";

export default function UserProfile() {
  const { data: users, isLoading } = useUsers();
  const [currentUser, setCurrentUser] = useState<any>(null);

  // Get the current user (in this case, we'll assume the first user in the list)
  useEffect(() => {
    if (users && users.length > 0) {
      setCurrentUser(users[0]);
    }
  }, [users]);

  if (isLoading || !currentUser) {
    return (
      <div className="flex items-center">
        <div className="w-9 h-9 rounded-full bg-gray-700 animate-pulse"></div>
        <div className="ml-3">
          <div className="h-4 w-24 bg-gray-700 rounded animate-pulse"></div>
          <div className="h-3 w-32 bg-gray-800 rounded mt-1 animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center">
      <div className="relative">
        <div 
          className="w-9 h-9 rounded-full bg-primary-light flex items-center justify-center text-white font-medium"
          style={{ backgroundColor: currentUser.avatarColor }}
        >
          {currentUser.avatarInitials}
        </div>
        <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-green-500 border-2 border-sidebar"></div>
      </div>
      <div className="ml-3">
        <p className="text-sm font-medium text-white">{currentUser.name}</p>
        <p className="text-xs text-gray-400">{currentUser.email}</p>
      </div>
      <button className="ml-auto text-gray-400 hover:text-white">
        <Settings className="h-4 w-4" />
      </button>
    </div>
  );
}
