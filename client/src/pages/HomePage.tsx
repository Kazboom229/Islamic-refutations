import React, { useContext } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import Hero from '@/components/home/Hero';
import CategoryGrid from '@/components/home/CategoryGrid';
import FeaturedArticles from '@/components/home/FeaturedArticles';
import AskQuestion from '@/components/home/AskQuestion';
import { useArticles } from '@/hooks/useArticles';
import { LanguageContext } from '@/contexts/LanguageContext';

export default function HomePage() {
  const { language } = useContext(LanguageContext);
  const { data: articlesData, isLoading } = useArticles({
    featuredOnly: true,
    limit: 3
  });

  return (
    <MainLayout>
      <Hero language={language} />
      <CategoryGrid language={language} />
      <FeaturedArticles
        language={language}
        articles={articlesData}
        isLoading={isLoading}
      />
      <AskQuestion language={language} />
    </MainLayout>
  );
}