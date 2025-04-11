import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Library } from "@/lib/types";

export function useLibraries() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['/api/libraries']
  });

  const addLibraryMutation = useMutation({
    mutationFn: async (newLibrary: Partial<Library>) => {
      const res = await apiRequest('POST', '/api/libraries', newLibrary);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/libraries'] });
    }
  });

  const updateLibraryMutation = useMutation({
    mutationFn: async (updatedLibrary: Partial<Library>) => {
      const res = await apiRequest('PUT', `/api/libraries/${updatedLibrary.id}`, updatedLibrary);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/libraries'] });
    }
  });

  const deleteLibraryMutation = useMutation({
    mutationFn: async (libraryId: number) => {
      const res = await apiRequest('DELETE', `/api/libraries/${libraryId}`);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/libraries'] });
    }
  });

  return {
    data,
    isLoading,
    error,
    addLibrary: addLibraryMutation.mutate,
    updateLibrary: updateLibraryMutation.mutate,
    deleteLibrary: deleteLibraryMutation.mutate
  };
}
