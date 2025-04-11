import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Collection } from "@/lib/types";

export function useCollections() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['/api/collections']
  });

  const addCollectionMutation = useMutation({
    mutationFn: async (newCollection: Partial<Collection>) => {
      const res = await apiRequest('POST', '/api/collections', newCollection);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/collections'] });
    }
  });

  const updateCollectionMutation = useMutation({
    mutationFn: async (updatedCollection: Partial<Collection>) => {
      const res = await apiRequest('PUT', `/api/collections/${updatedCollection.id}`, updatedCollection);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/collections'] });
    }
  });

  const deleteCollectionMutation = useMutation({
    mutationFn: async (collectionId: number) => {
      const res = await apiRequest('DELETE', `/api/collections/${collectionId}`);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/collections'] });
    }
  });

  return {
    data,
    isLoading,
    error,
    addCollection: addCollectionMutation.mutate,
    updateCollection: updateCollectionMutation.mutate,
    deleteCollection: deleteCollectionMutation.mutate
  };
}
