
import { useState, useContext } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { LanguageContext } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';

export default function AddRefutationForm() {
  const { language } = useContext(LanguageContext);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    title_en: '',
    title_so: '',
    content_en: '',
    content_so: '',
    excerpt_en: '',
    excerpt_so: '',
    tags: ''
  });

  const addRefutationMutation = useMutation({
    mutationFn: async (data) => {
      const response = await fetch('/api/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          type: 'refutation',
          tags: data.tags.split(',').map(tag => tag.trim()),
          published: true
        })
      });
      if (!response.ok) throw new Error('Failed to add refutation');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['articles']);
      toast({
        title: language === 'en' ? 'Success' : 'Guul',
        description: language === 'en' ? 'Refutation added successfully' : 'Diidmada si guul leh ayaa loo daray'
      });
      setFormData({
        title_en: '',
        title_so: '',
        content_en: '',
        content_so: '',
        excerpt_en: '',
        excerpt_so: '',
        tags: ''
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addRefutationMutation.mutate(formData);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>
          {language === 'en' ? 'Add New Refutation' : 'Ku dar Diidmo Cusub'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              placeholder={language === 'en' ? 'English Title' : 'Cinwaanka Ingiriisiga'}
              value={formData.title_en}
              onChange={(e) => setFormData({ ...formData, title_en: e.target.value })}
            />
          </div>
          <div>
            <Input
              placeholder={language === 'en' ? 'Somali Title' : 'Cinwaanka Soomaaliga'}
              value={formData.title_so}
              onChange={(e) => setFormData({ ...formData, title_so: e.target.value })}
            />
          </div>
          <div>
            <Textarea
              placeholder={language === 'en' ? 'English Content' : 'Qoraalka Ingiriisiga'}
              value={formData.content_en}
              onChange={(e) => setFormData({ ...formData, content_en: e.target.value })}
              rows={6}
            />
          </div>
          <div>
            <Textarea
              placeholder={language === 'en' ? 'Somali Content' : 'Qoraalka Soomaaliga'}
              value={formData.content_so}
              onChange={(e) => setFormData({ ...formData, content_so: e.target.value })}
              rows={6}
            />
          </div>
          <div>
            <Input
              placeholder={language === 'en' ? 'English Excerpt' : 'Soo-koobidda Ingiriisiga'}
              value={formData.excerpt_en}
              onChange={(e) => setFormData({ ...formData, excerpt_en: e.target.value })}
            />
          </div>
          <div>
            <Input
              placeholder={language === 'en' ? 'Somali Excerpt' : 'Soo-koobidda Soomaaliga'}
              value={formData.excerpt_so}
              onChange={(e) => setFormData({ ...formData, excerpt_so: e.target.value })}
            />
          </div>
          <div>
            <Input
              placeholder={language === 'en' ? 'Tags (comma-separated)' : 'Calaamadaha (kala saar comma)'}
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            />
          </div>
          <Button type="submit" className="w-full">
            {language === 'en' ? 'Add Refutation' : 'Ku dar Diidmada'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
