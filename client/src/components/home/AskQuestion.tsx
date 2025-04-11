import React from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquareText } from 'lucide-react';

interface AskQuestionProps {
  language: 'en' | 'so';
}

export default function AskQuestion({ language }: AskQuestionProps) {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <Card className="max-w-4xl mx-auto bg-gradient-to-r from-primary/10 to-primary/5 border-2 border-primary/20">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl mb-2">
              {language === 'en' ? 'Have a Question?' : 'Su\'aal ma qabtaa?'}
            </CardTitle>
            <CardDescription className="text-lg">
              {language === 'en' 
                ? 'Submit your questions about Islam, and our team will provide a well-researched response.'
                : 'Soo gudbi su\'aalahaaga ku saabsan Islaamka, kooxdayadana waxay ku siin doontaa jawaab si fiican loo baadhay.'}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <Link href="/ask">
              <Button size="lg" className="mt-4">
                <div className="flex items-center gap-2">
                  <MessageSquareText className="h-5 w-5" />
                  {language === 'en' ? 'Ask a Question' : 'Su\'aal Weydii'}
                </div>
              </Button>
            </Link>
            <div className="mt-8 text-sm text-muted-foreground max-w-2xl text-center">
              {language === 'en'
                ? 'Our team of scholars and researchers reviews each question and provides a comprehensive answer based on authentic Islamic sources. Your question might also help others seeking similar information.'
                : 'Kooxdeena culimada iyo cilmi-baadhayaasha waxay dib u eegaan su\'aal kasta waxayna bixiyaan jawaab dhammaystiran oo ku saleysan ilaha Islaamiga ee rasmiga ah. Su\'aashaadu waxay sidoo kale caawin kartaa kuwa kale ee raadinaya macluumaad la mid ah.'}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}