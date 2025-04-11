import { useQuery } from '@tanstack/react-query';
import { Category } from '@/lib/types';

interface CategoryQueryParams {
  parentId?: number;
}

export function useCategories(params?: CategoryQueryParams) {
  const queryParams = new URLSearchParams();
  
  if (params?.parentId !== undefined) {
    queryParams.append('parentId', params.parentId.toString());
  }
  
  const queryString = queryParams.toString() 
    ? `?${queryParams.toString()}` 
    : '';
  
  return useQuery({
    queryKey: ['/api/categories', params],
    queryFn: async () => {
      const response = await fetch(`/api/categories${queryString}`);
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      return await response.json() as Category[];
    },
  });
}

export function useCategory(slug: string) {
  return useQuery({
    queryKey: ['/api/categories', slug],
    queryFn: async () => {
      const response = await fetch(`/api/categories/${slug}`);
      if (!response.ok) {
        throw new Error('Failed to fetch category');
      }
      return await response.json() as Category;
    },
    enabled: !!slug,
  });
}