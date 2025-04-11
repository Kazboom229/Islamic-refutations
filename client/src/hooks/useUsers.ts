import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { User } from "@/lib/types";

export function useUsers() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['/api/users']
  });

  const updateUserMutation = useMutation({
    mutationFn: async (updatedUser: Partial<User>) => {
      const res = await apiRequest('PUT', `/api/users/${updatedUser.id}`, updatedUser);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/users'] });
    }
  });

  const updateUserStatusMutation = useMutation({
    mutationFn: async ({ userId, online }: { userId: number; online: boolean }) => {
      const res = await apiRequest('PATCH', `/api/users/${userId}/status`, { online });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/users'] });
    }
  });

  return {
    data,
    isLoading,
    error,
    updateUser: updateUserMutation.mutate,
    updateUserStatus: updateUserStatusMutation.mutate
  };
}
