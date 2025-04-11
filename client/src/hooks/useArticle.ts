import { useQuery } from '@tanstack/react-query';
import { Article } from '@/lib/types';

export function useArticle(slug: string) {
  return useQuery({
    queryKey: ['/api/articles', slug],
    queryFn: async () => {
      const response = await fetch(`/api/articles/${slug}`);
      if (!response.ok) {
        throw new Error('Failed to fetch article');
      }
      return await response.json() as Article;
    },
    enabled: !!slug,
  });
}