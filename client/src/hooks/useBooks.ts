import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Book } from "@/lib/types";

export function useBooks(libraryId?: number) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['/api/books', libraryId],
    enabled: !!libraryId
  });

  const addBookMutation = useMutation({
    mutationFn: async (newBook: Partial<Book>) => {
      const res = await apiRequest('POST', '/api/books', newBook);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/books', libraryId] });
    }
  });

  const updateBookMutation = useMutation({
    mutationFn: async (updatedBook: Partial<Book>) => {
      const res = await apiRequest('PUT', `/api/books/${updatedBook.id}`, updatedBook);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/books', libraryId] });
    }
  });

  const deleteBookMutation = useMutation({
    mutationFn: async (bookId: number) => {
      const res = await apiRequest('DELETE', `/api/books/${bookId}`);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/books', libraryId] });
    }
  });

  return {
    data,
    isLoading,
    error,
    addBook: addBookMutation.mutate,
    updateBook: updateBookMutation.mutate,
    deleteBook: deleteBookMutation.mutate
  };
}
