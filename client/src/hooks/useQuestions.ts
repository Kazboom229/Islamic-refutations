import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Question } from '@/lib/types';

interface SubmitQuestionParams {
  name?: string;
  email?: string;
  question_en: string;
  question_so?: string;
}

export function useSubmitQuestion() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: SubmitQuestionParams) => {
      const response = await fetch('/api/questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit question');
      }
      
      return response.json() as Promise<Question>;
    },
    onSuccess: () => {
      // Invalidate the questions cache
      queryClient.invalidateQueries({ queryKey: ['/api/questions'] });
    },
  });
}