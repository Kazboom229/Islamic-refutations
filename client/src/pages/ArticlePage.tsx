import React, { useContext } from 'react';
import { useRoute, Link } from 'wouter';
import MainLayout from '@/components/layout/MainLayout';
import { LanguageContext } from '@/contexts/LanguageContext';
import { useArticle } from '@/hooks/useArticle';
import { useCategory } from '@/hooks/useCategories';
import { useArticles } from '@/hooks/useArticles';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, Calendar, Book, Share2, Eye } from 'lucide-react';

export default function ArticlePage() {
  const { language } = useContext(LanguageContext);
  const [, params] = useRoute('/article/:slug');
  const slug = params?.slug || '';

  const { data: article, isLoading } = useArticle(slug);
  const { data: category } = useCategory(article?.categoryId ? article.slug : '');
  const { data: relatedArticles } = useArticles({
    categoryId: article?.categoryId,
    limit: 3
  });

  if (isLoading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <Skeleton className="h-8 w-1/2 mb-2" />
            <Skeleton className="h-6 w-full mb-8" />
            <Skeleton className="h-64 w-full mb-8" />
            <div className="space-y-4">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-5/6" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-4/5" />
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!article) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-3xl font-bold mb-4">
            {language === 'en' ? 'Article Not Found' : 'Maqaalka Lama Helin'}
          </h1>
          <p className="text-muted-foreground mb-8">
            {language === 'en'
              ? 'The article you are looking for does not exist or has been removed.'
              : 'Maqaalka aad raadinayso ma jirto ama waa la qaaday.'}
          </p>
          <Button asChild>
            <Link href="/">
              <a>
                {language === 'en' ? 'Go to Homepage' : 'Aad Bogga Hore'}
              </a>
            </Link>
          </Button>
        </div>
      </MainLayout>
    );
  }

  // Format date if available
  const formattedDate = article.createdAt
    ? new Date(article.createdAt).toLocaleDateString(language === 'en' ? 'en-US' : 'so-SO', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : '';

  return (
    <MainLayout>
      <div className="bg-primary/10 py-10">
        <div className="container mx-auto px-4">
          <Button variant="ghost" asChild className="mb-6">
            <Link href={category ? `/category/${category.slug}` : '/articles'}>
              <a className="flex items-center">
                <ArrowLeft className="mr-2 h-4 w-4" />
                {language === 'en'
                  ? `Back to ${category ? category.name_en : 'Articles'}`
                  : `Ku laabo ${category ? (category.name_so || category.name_en) : 'Maqaallada'}`}
              </a>
            </Link>
          </Button>

          <Badge className="mb-4" variant={article.type === 'evidence' ? 'default' : 'secondary'}>
            {article.type === 'evidence'
              ? (language === 'en' ? 'Evidence' : 'Caddayn')
              : (language === 'en' ? 'Refutation' : 'Diidmo')}
          </Badge>

          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {language === 'en' ? article.title_en : (article.title_so || article.title_en)}
          </h1>

          <div className="flex flex-wrap items-center text-sm text-muted-foreground gap-4 mb-6">
            {formattedDate && (
              <div className="flex items-center">
                <Calendar className="mr-1 h-4 w-4" />
                {formattedDate}
              </div>
            )}
            {article.views && (
              <div className="flex items-center">
                <Eye className="mr-1 h-4 w-4" />
                {article.views} {language === 'en' ? 'views' : 'muuqaalka'}
              </div>
            )}
            <div className="flex flex-wrap gap-2">
              {article.tags?.map((tag) => (
                <Badge key={tag} variant="outline">{tag}</Badge>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <article className="prose prose-lg dark:prose-invert max-w-none">
              <div dangerouslySetInnerHTML={{
                __html: language === 'en' 
                  ? article.content_en 
                  : (article.content_so || article.content_en)
              }} />
            </article>

            <div className="mt-8 flex justify-between items-center pt-6 border-t">
              <Button variant="outline" size="sm" onClick={() => window.print()}>
                <Book className="mr-2 h-4 w-4" />
                {language === 'en' ? 'Print Article' : 'Daabac Maqaalka'}
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="mr-2 h-4 w-4" />
                {language === 'en' ? 'Share' : 'La wadaag'}
              </Button>
            </div>
          </div>

          <div className="lg:w-1/3">
            <Card>
              <CardHeader>
                <CardTitle>
                  {language === 'en' ? 'Related Articles' : 'Maqaallada La Xiriira'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {relatedArticles && relatedArticles.length > 0 ? (
                  <div className="space-y-4">
                    {relatedArticles
                      .filter(relatedArticle => relatedArticle.id !== article.id)
                      .slice(0, 3)
                      .map(relatedArticle => (
                        <Link key={relatedArticle.id} href={`/article/${relatedArticle.slug}`}>
                          <a className="block group">
                            <h3 className="font-semibold group-hover:text-primary transition-colors">
                              {language === 'en' 
                                ? relatedArticle.title_en 
                                : (relatedArticle.title_so || relatedArticle.title_en)}
                            </h3>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {language === 'en'
                                ? relatedArticle.excerpt_en
                                : (relatedArticle.excerpt_so || relatedArticle.excerpt_en)}
                            </p>
                          </a>
                        </Link>
                      ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-sm">
                    {language === 'en'
                      ? 'No related articles found.'
                      : 'Ma laha maqaallo la xiriira oo la helay.'}
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}