import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import Rating from "@/components/ui/rating";
import { X, CloudUpload } from "lucide-react";
import { Book } from "@/lib/types";

interface AddBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddBook: (book: Partial<Book>) => void;
}

export default function AddBookModal({ isOpen, onClose, onAddBook }: AddBookModalProps) {
  const [bookData, setBookData] = useState<Partial<Book>>({
    title: '',
    author: '',
    description: '',
    category: 'Fiction',
    rating: 4,
    status: 'to-read'
  });
  const [notifyTeam, setNotifyTeam] = useState(true);

  const handleChange = (field: string, value: any) => {
    setBookData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddBook(bookData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-background-lighter border border-gray-800 text-white max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-white">Add New Book</DialogTitle>
          <DialogDescription>
            Add a new book to your collaborative bookshelf
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title" className="text-gray-300">Book Title</Label>
              <Input
                id="title"
                value={bookData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                className="bg-background border-gray-700 text-white"
              />
            </div>
            
            <div>
              <Label htmlFor="author" className="text-gray-300">Author</Label>
              <Input
                id="author"
                value={bookData.author}
                onChange={(e) => handleChange('author', e.target.value)}
                className="bg-background border-gray-700 text-white"
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="description" className="text-gray-300">Description</Label>
            <Textarea
              id="description"
              rows={3}
              value={bookData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              className="bg-background border-gray-700 text-white"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="category" className="text-gray-300">Category</Label>
              <Select 
                value={bookData.category} 
                onValueChange={(value) => handleChange('category', value)}
              >
                <SelectTrigger className="bg-background border-gray-700 text-white">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent className="bg-background border-gray-700 text-white">
                  <SelectItem value="Fiction">Fiction</SelectItem>
                  <SelectItem value="Non-Fiction">Non-Fiction</SelectItem>
                  <SelectItem value="Self-Help">Self-Help</SelectItem>
                  <SelectItem value="Business">Business</SelectItem>
                  <SelectItem value="Science">Science</SelectItem>
                  <SelectItem value="History">History</SelectItem>
                  <SelectItem value="Psychology">Psychology</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="rating" className="text-gray-300">Rating</Label>
              <div className="flex items-center bg-background border border-gray-700 rounded-md py-2 px-3 text-yellow-500">
                <Rating
                  value={bookData.rating || 0}
                  onChange={(value) => handleChange('rating', value)}
                  max={5}
                  editable
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="status" className="text-gray-300">Status</Label>
              <Select 
                value={bookData.status} 
                onValueChange={(value) => handleChange('status', value as any)}
              >
                <SelectTrigger className="bg-background border-gray-700 text-white">
                  <SelectValue placeholder="Select a status" />
                </SelectTrigger>
                <SelectContent className="bg-background border-gray-700 text-white">
                  <SelectItem value="to-read">To Read</SelectItem>
                  <SelectItem value="reading">Reading</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="recommended">Recommended</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div>
            <Label className="text-gray-300">Cover Image</Label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-700 border-dashed rounded-md bg-background">
              <div className="space-y-1 text-center">
                <CloudUpload className="mx-auto h-12 w-12 text-gray-500" />
                <div className="flex text-sm text-gray-400">
                  <label className="relative cursor-pointer bg-background-lighter px-3 py-1 rounded-md text-primary-light hover:text-primary-foreground hover:bg-primary-light font-medium">
                    <span>Upload a file</span>
                    <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                  </label>
                  <p className="pl-1 pt-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between pt-4 border-t border-gray-800">
            <div className="flex items-center">
              <Checkbox 
                id="notify-team" 
                checked={notifyTeam}
                onCheckedChange={(checked) => setNotifyTeam(checked as boolean)}
                className="h-4 w-4 bg-background border-gray-700 rounded text-primary-light focus:ring-primary-light"
              />
              <label htmlFor="notify-team" className="ml-2 block text-sm text-gray-300">
                Notify team members
              </label>
            </div>
            
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="bg-background text-gray-300 border-gray-700 hover:bg-gray-800"
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-primary-light text-white hover:bg-primary">
                Add Book
              </Button>
            </DialogFooter>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
