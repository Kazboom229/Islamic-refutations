import { useQuery } from '@tanstack/react-query';
import { Article } from '@/lib/types';

interface ArticleQueryParams {
  categoryId?: number;
  type?: string;
  limit?: number;
  featuredOnly?: boolean;
}

export function useArticles(params?: ArticleQueryParams) {
  const queryParams = new URLSearchParams();
  
  if (params?.categoryId) {
    queryParams.append('categoryId', params.categoryId.toString());
  }
  
  if (params?.type) {
    queryParams.append('type', params.type);
  }
  
  if (params?.limit) {
    queryParams.append('limit', params.limit.toString());
  }
  
  if (params?.featuredOnly) {
    queryParams.append('featured', 'true');
  }
  
  const queryString = queryParams.toString() 
    ? `?${queryParams.toString()}` 
    : '';
  
  return useQuery({
    queryKey: ['/api/articles', params],
    queryFn: async () => {
      const response = await fetch(`/api/articles${queryString}`);
      if (!response.ok) {
        throw new Error('Failed to fetch articles');
      }
      return await response.json() as Article[];
    },
  });
}