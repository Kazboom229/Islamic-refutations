import { Book, User } from "@/lib/types";
import { useUsers } from "@/hooks/useUsers";
import { useState } from "react";
import Rating from "@/components/ui/rating";
import { 
  MessageSquare, 
  Bookmark, 
  MoreHorizontal,
  UserCheck
} from "lucide-react";

interface BookCardProps {
  book: Book;
}

export default function BookCard({ book }: BookCardProps) {
  const { data: users } = useUsers();
  const [isHovered, setIsHovered] = useState(false);
  
  // Find the user who added this book
  const addedByUser = users?.find((user: User) => user.id === book.addedBy);

  return (
    <div 
      className="group bg-background-card rounded-lg overflow-hidden border border-gray-800 flex flex-col transition hover:shadow-lg hover:border-gray-700"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-56 overflow-hidden">
        {book.coverImage ? (
          <img 
            src={book.coverImage} 
            alt={`Book cover: ${book.title}`} 
            className={`w-full h-full object-cover transition duration-300 ${isHovered ? 'scale-105' : ''}`}
          />
        ) : (
          <div className="w-full h-full bg-gray-800 flex items-center justify-center">
            <span className="text-lg text-gray-400">{book.title}</span>
          </div>
        )}
        <div className="absolute top-2 right-2 bg-primary-light text-white text-xs px-2 py-1 rounded">
          {book.category}
        </div>
        <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-black/80 to-transparent"></div>
      </div>
      
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-semibold text-white text-lg mb-1 group-hover:text-primary-light transition">{book.title}</h3>
        <p className="text-gray-400 text-sm mb-2">{book.author}</p>
        
        <Rating value={book.rating} className="mb-2" />
        
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">{book.description}</p>
        
        <div className="mt-auto flex justify-between items-center">
          <div className="flex items-center text-xs text-gray-400">
            <UserCheck className="mr-1 h-3 w-3" />
            <span>Added by {addedByUser?.name || 'Unknown'}</span>
          </div>
          
          <div className="flex space-x-1">
            <button className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded">
              <MessageSquare className="h-4 w-4" />
            </button>
            <button className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded">
              <Bookmark className="h-4 w-4" />
            </button>
            <button className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded">
              <MoreHorizontal className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
