import React, { useContext, useState } from 'react';
import { useLocation } from 'wouter';
import { LanguageContext } from '@/contexts/LanguageContext';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useSubmitQuestion } from '@/hooks/useQuestions';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

export default function AskQuestionPage() {
  const { language } = useContext(LanguageContext);
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const submitQuestionMutation = useSubmitQuestion();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [questionEn, setQuestionEn] = useState('');
  const [questionSo, setQuestionSo] = useState('');
  const [activeTab, setActiveTab] = useState<'en' | 'so'>(language);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!questionEn && activeTab === 'en') {
      toast({
        title: language === 'en' ? 'Error' : 'Khalad',
        description: language === 'en' 
          ? 'Please enter your question in English' 
          : 'Fadlan geli su\'aashaada af Ingiriisi',
        variant: 'destructive',
      });
      return;
    }
    
    if (!questionSo && activeTab === 'so') {
      toast({
        title: language === 'en' ? 'Error' : 'Khalad',
        description: language === 'en' 
          ? 'Please enter your question in Somali' 
          : 'Fadlan geli su\'aashaada af Soomaali',
        variant: 'destructive',
      });
      return;
    }
    
    try {
      await submitQuestionMutation.mutateAsync({
        name: name || undefined,
        email: email || undefined,
        question_en: questionEn || questionSo, // Use Somali if English is not provided
        question_so: questionSo || undefined,
      });
      
      toast({
        title: language === 'en' ? 'Success' : 'Guul',
        description: language === 'en' 
          ? 'Your question has been submitted successfully. We will review it soon.' 
          : 'Su\'aashaada si guul leh ayaa loo gudbiyay. Waxaan dhawaan dib u eegi doonaa.',
      });
      
      // Reset form
      setName('');
      setEmail('');
      setQuestionEn('');
      setQuestionSo('');
      
      // Navigate to home page after submission
      setTimeout(() => {
        navigate('/');
      }, 2000);
      
    } catch (error) {
      toast({
        title: language === 'en' ? 'Error' : 'Khalad',
        description: language === 'en' 
          ? 'Failed to submit your question. Please try again.' 
          : 'Waxaa ku guul darreystay in aad u gudbiso su\'aashaada. Fadlan isku day mar kale.',
        variant: 'destructive',
      });
    }
  };
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              {language === 'en' ? 'Ask a Question' : 'Weydii Su\'aal'}
            </CardTitle>
            <CardDescription>
              {language === 'en' 
                ? 'Submit your questions about Islam, and our team will provide a well-researched response.'
                : 'Soo gudbi su\'aalahaaga ku saabsan Islaamka, kooxdayadana waxay ku siin doontaa jawaab si fiican loo baadhay.'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">
                  {language === 'en' ? 'Name (Optional)' : 'Magaca (Ikhtiyaari)'}
                </Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={language === 'en' ? 'Your name' : 'Magacaaga'}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">
                  {language === 'en' ? 'Email (Optional)' : 'Email (Ikhtiyaari)'}
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={language === 'en' ? 'Your email address' : 'Cinwaankaaga emailka'}
                />
                <p className="text-xs text-muted-foreground">
                  {language === 'en'
                    ? 'We will only use your email to notify you when your question is answered.'
                    : 'Waxaan adeegsan doonaa emailkaaga oo keliya si aan kuugu soo ogaysiiyo marka su\'aashaada la jawaabo.'}
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="question">
                  {language === 'en' ? 'Your Question' : 'Su\'aashaada'}
                </Label>
                
                <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'en' | 'so')}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="en">English</TabsTrigger>
                    <TabsTrigger value="so">Somali</TabsTrigger>
                  </TabsList>
                  <TabsContent value="en">
                    <Textarea
                      id="question-en"
                      value={questionEn}
                      onChange={(e) => setQuestionEn(e.target.value)}
                      placeholder="Type your question in English"
                      className="min-h-[120px]"
                    />
                  </TabsContent>
                  <TabsContent value="so">
                    <Textarea
                      id="question-so"
                      value={questionSo}
                      onChange={(e) => setQuestionSo(e.target.value)}
                      placeholder="Qor su'aashaada af Soomaali"
                      className="min-h-[120px]"
                    />
                  </TabsContent>
                </Tabs>
              </div>
              
              <Button type="submit" className="w-full" disabled={submitQuestionMutation.isPending}>
                {submitQuestionMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {language === 'en' ? 'Submitting...' : 'Waa la gudbinayaa...'}
                  </>
                ) : (
                  language === 'en' ? 'Submit Question' : 'Gudbi Su\'aasha'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}