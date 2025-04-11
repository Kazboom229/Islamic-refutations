import { useState } from "react";
import BookCard from "./BookCard";
import AddBookModal from "./AddBookModal";
import { Book } from "@/lib/types";
import { 
  LayoutGrid, 
  List, 
  Table2, 
  Plus 
} from "lucide-react";

interface BookGridProps {
  books: Book[];
  onAddBook: (book: Partial<Book>) => void;
  viewType: 'grid' | 'list' | 'table';
  onViewChange: (view: 'grid' | 'list' | 'table') => void;
  sortOption: string;
  onSortChange: (sort: string) => void;
}

export default function BookGrid({ 
  books, 
  onAddBook,
  viewType,
  onViewChange,
  sortOption,
  onSortChange
}: BookGridProps) {
  const [isAddBookModalOpen, setIsAddBookModalOpen] = useState(false);

  const handleAddBook = (bookData: Partial<Book>) => {
    onAddBook(bookData);
    setIsAddBookModalOpen(false);
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 bg-background">
      {/* Shelf Navigation */}
      <div className="flex mb-6 space-x-1">
        <button 
          className={`px-3 py-2 ${viewType === 'grid' ? 'bg-primary text-white' : 'bg-background-lighter text-gray-300 hover:bg-gray-800'} rounded-md flex items-center text-sm font-medium`}
          onClick={() => onViewChange('grid')}
        >
          <LayoutGrid className="mr-2 h-4 w-4" />
          Grid
        </button>
        <button 
          className={`px-3 py-2 ${viewType === 'list' ? 'bg-primary text-white' : 'bg-background-lighter text-gray-300 hover:bg-gray-800'} rounded-md flex items-center text-sm font-medium`}
          onClick={() => onViewChange('list')}
        >
          <List className="mr-2 h-4 w-4" />
          List
        </button>
        <button 
          className={`px-3 py-2 ${viewType === 'table' ? 'bg-primary text-white' : 'bg-background-lighter text-gray-300 hover:bg-gray-800'} rounded-md flex items-center text-sm font-medium`}
          onClick={() => onViewChange('table')}
        >
          <Table2 className="mr-2 h-4 w-4" />
          Table
        </button>
        
        <div className="ml-auto flex items-center space-x-2">
          <span className="text-sm text-gray-400">Sort by:</span>
          <select 
            className="bg-background-lighter text-gray-300 border border-gray-700 rounded py-1.5 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary-light"
            value={sortOption}
            onChange={(e) => onSortChange(e.target.value)}
          >
            <option value="createdAt-desc">Recently Added</option>
            <option value="title-asc">Title</option>
            <option value="author-asc">Author</option>
            <option value="category-asc">Category</option>
            <option value="rating-desc">Rating (High to Low)</option>
          </select>
        </div>
      </div>
      
      {/* Book Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {books.map(book => (
          <BookCard key={book.id} book={book} />
        ))}
        
        {/* "Add Book" Card */}
        <div 
          className="bg-background-card bg-opacity-50 rounded-lg border border-dashed border-gray-700 flex flex-col items-center justify-center p-6 h-full min-h-[336px] hover:bg-background-lighter hover:border-primary-light transition cursor-pointer"
          onClick={() => setIsAddBookModalOpen(true)}
        >
          <div className="w-16 h-16 bg-primary-light bg-opacity-20 rounded-full flex items-center justify-center mb-4">
            <Plus className="text-primary-light h-8 w-8" />
          </div>
          <h3 className="font-medium text-white text-lg mb-2">Add New Book</h3>
          <p className="text-gray-400 text-sm text-center mb-2">Add a book to your collaborative bookshelf</p>
          <button className="mt-2 px-4 py-2 bg-primary-light text-white rounded-md text-sm hover:bg-primary">
            <Plus className="inline-block mr-2 h-4 w-4" />Add Book
          </button>
        </div>
      </div>

      <AddBookModal 
        isOpen={isAddBookModalOpen} 
        onClose={() => setIsAddBookModalOpen(false)}
        onAddBook={handleAddBook}
      />
    </div>
  );
}
