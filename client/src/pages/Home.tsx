import { useEffect } from "react";
import { useLocation } from "wouter";
import { useLibraries } from "@/hooks/useLibraries";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen } from "lucide-react";

export default function Home() {
  const [, navigate] = useLocation();
  const { data: libraries, isLoading } = useLibraries();
  
  // Redirect to the first library if available
  useEffect(() => {
    if (libraries && libraries.length > 0) {
      navigate(`/bookshelf/${libraries[0].id}`);
    }
  }, [libraries, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-white">Loading your bookshelves...</h2>
        </div>
      </div>
    );
  }
  
  if (!libraries || libraries.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-primary-light rounded-full mx-auto flex items-center justify-center mb-4">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold">Welcome to Collaborative Bookshelf</h1>
              <p className="text-gray-400 mt-2">
                Your personal and team book management platform
              </p>
            </div>
            
            <div className="space-y-4">
              <Button 
                className="w-full bg-primary-light hover:bg-primary"
                onClick={() => {
                  // In a real app, this would create a new library
                  // For now, we'll just reload the page
                  window.location.reload();
                }}
              >
                Create Your First Bookshelf
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  return null; // Will redirect to the first library
}
