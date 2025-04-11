import { Library } from "@/lib/types";
import { useState } from "react";
import { Search, Plus, Filter, MoreVertical } from "lucide-react";
import AvatarGroup from "@/components/ui/avatar-group";
import { useUsers } from "@/hooks/useUsers";
import { useLibraries } from "@/hooks/useLibraries";

interface HeaderProps {
  libraryId: number;
  onAddBook: () => void;
  viewType: 'grid' | 'list' | 'table';
  onViewChange: (view: 'grid' | 'list' | 'table') => void;
  onSortChange: (sort: string) => void;
}

export default function Header({ 
  libraryId, 
  onAddBook, 
  viewType,
  onViewChange,
  onSortChange
}: HeaderProps) {
  const { data: users } = useUsers();
  const { data: libraries } = useLibraries();
  const [searchQuery, setSearchQuery] = useState("");
  
  const library = libraries?.find((lib: Library) => lib.id === libraryId);
  const activeUsers = users?.filter(user => user.online) || [];
  
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSortChange(e.target.value);
  };

  return (
    <header className="bg-background-lighter border-b border-gray-800 py-3 px-6 flex items-center justify-between">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold text-white">{library?.name || 'Bookshelf'}</h1>
        <div className="ml-4 flex space-x-1">
          {library?.type === 'team' && (
            <span className="inline-flex items-center justify-center text-xs font-medium rounded-full px-2.5 py-0.5 bg-primary-light text-white">
              <i className="fas fa-users text-xs mr-1"></i> Collaborative
            </span>
          )}
          {activeUsers.length > 0 && (
            <span className="inline-flex items-center justify-center text-xs font-medium rounded-full px-2.5 py-0.5 bg-background text-gray-300 border border-gray-700">
              <i className="fas fa-eye text-xs mr-1"></i> {activeUsers.length} viewing
            </span>
          )}
        </div>
      </div>
      
      <div className="flex items-center space-x-3">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search books..." 
            className="bg-background border border-gray-700 rounded-lg py-1.5 pl-9 pr-3 text-sm text-gray-300 focus:outline-none focus:ring-1 focus:ring-primary-light focus:border-primary-light w-60"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-3 top-2 h-4 w-4 text-gray-500" />
        </div>
        
        <AvatarGroup users={activeUsers} maxCount={4} />
        
        <div className="flex items-center space-x-1">
          <button 
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-md"
            onClick={onAddBook}
          >
            <Plus className="h-5 w-5" />
          </button>
          <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-md">
            <Filter className="h-5 w-5" />
          </button>
          <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-md">
            <MoreVertical className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
