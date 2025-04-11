import { useState, useEffect } from "react";
import { useRoute } from "wouter";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import BookGrid from "@/components/book/BookGrid";
import CollaborationIndicator from "@/components/common/CollaborationIndicator";
import { Book } from "@/lib/types";
import { useBooks } from "@/hooks/useBooks";

export default function BookshelfPage() {
  const [, params] = useRoute("/bookshelf/:id");
  const libraryId = params ? parseInt(params.id, 10) : 0;
  
  const [viewType, setViewType] = useState<'grid' | 'list' | 'table'>('grid');
  const [sortOption, setSortOption] = useState('createdAt-desc');
  
  const { data: books, isLoading, addBook } = useBooks(libraryId);
  const [sortedBooks, setSortedBooks] = useState<Book[]>([]);
  
  // Sort books whenever the sort option or books changes
  useEffect(() => {
    if (!books) return;
    
    const [field, direction] = sortOption.split('-');
    
    const sorted = [...books].sort((a: any, b: any) => {
      if (direction === 'asc') {
        return a[field] > b[field] ? 1 : -1;
      } else {
        return a[field] < b[field] ? 1 : -1;
      }
    });
    
    setSortedBooks(sorted);
  }, [books, sortOption]);
  
  const handleAddBook = (bookData: Partial<Book>) => {
    addBook({
      ...bookData,
      libraryId
    });
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        <Header 
          libraryId={libraryId}
          onAddBook={() => {}} // This will be handled by the "Add Book" card
          viewType={viewType}
          onViewChange={setViewType}
          onSortChange={setSortOption}
        />
        
        {isLoading ? (
          <div className="flex-1 flex items-center justify-center bg-background">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <h2 className="text-xl font-semibold text-white">Loading books...</h2>
            </div>
          </div>
        ) : (
          <BookGrid 
            books={sortedBooks}
            onAddBook={handleAddBook}
            viewType={viewType}
            onViewChange={setViewType}
            sortOption={sortOption}
            onSortChange={setSortOption}
          />
        )}
        
        <CollaborationIndicator />
      </main>
    </div>
  );
}
