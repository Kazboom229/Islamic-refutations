import React, { useContext } from 'react';
import { useRoute } from 'wouter';
import MainLayout from '@/components/layout/MainLayout';
import { LanguageContext } from '@/contexts/LanguageContext';
import { useCategory } from '@/hooks/useCategories';
import { useArticles } from '@/hooks/useArticles';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { ArrowRight, Eye, ExternalLink } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function CategoryPage() {
  const { language } = useContext(LanguageContext);
  const [, params] = useRoute('/category/:slug');
  const slug = params?.slug || '';

  const { data: category, isLoading: isCategoryLoading } = useCategory(slug);
  const { data: articles, isLoading: isArticlesLoading } = useArticles({
    categoryId: category?.id
  });

  if (isCategoryLoading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-12">
          <div className="space-y-4 max-w-4xl mx-auto">
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-5/6" />
            <div className="mt-12 grid grid-cols-1 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-64 w-full" />
              ))}
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!category) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-3xl font-bold mb-4">
            {language === 'en' ? 'Category Not Found' : 'Qaybta Lama Helin'}
          </h1>
          <p className="text-muted-foreground mb-8">
            {language === 'en'
              ? 'The category you are looking for does not exist or has been removed.'
              : 'Qaybta aad raadinayso ma jirto ama waa la qaaday.'}
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

  return (
    <MainLayout>
      <div className="bg-primary/10 py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">
            {language === 'en' ? category.name_en : (category.name_so || category.name_en)}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            {language === 'en'
              ? category.description_en
              : category.description_so || category.description_en}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold">
            {language === 'en' ? 'Articles' : 'Maqaallada'}
          </h2>
          <div className="flex items-center gap-2">
            {/* Filter/Sort options could go here */}
          </div>
        </div>

        {isArticlesLoading ? (
          <div className="grid grid-cols-1 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-64 w-full" />
            ))}
          </div>
        ) : articles && articles.length > 0 ? (
          <div className="grid grid-cols-1 gap-6">
            {articles.map((article) => (
              <Link key={article.id} href={`/article/${article.slug}`}>
                <a className="block group">
                  <Card className="transition-shadow hover:shadow-md">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <Badge className="mb-2" variant={article.type === 'evidence' ? 'default' : 'secondary'}>
                            {article.type === 'evidence'
                              ? (language === 'en' ? 'Evidence' : 'Caddayn')
                              : (language === 'en' ? 'Refutation' : 'Diidmo')}
                          </Badge>
                          <CardTitle className="text-xl group-hover:text-primary transition-colors">
                            {language === 'en' ? article.title_en : (article.title_so || article.title_en)}
                          </CardTitle>
                        </div>
                        <ExternalLink className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                      <CardDescription className="text-base mt-2">
                        {language === 'en'
                          ? article.excerpt_en
                          : article.excerpt_so || article.excerpt_en}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {article.tags?.map((tag) => (
                          <Badge key={tag} variant="outline">{tag}</Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <div className="flex items-center text-muted-foreground text-sm">
                        <Eye className="h-4 w-4 mr-1" />
                        {article.views || 0}
                      </div>
                      <Button variant="ghost" size="sm" className="group-hover:text-primary transition-colors">
                        {language === 'en' ? 'Read More' : 'Akhri Wax Badan'}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                </a>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              {language === 'en'
                ? 'No articles found in this category.'
                : 'Maqaallo kuma jiraan qaybtan.'}
            </p>
          </div>
        )}
      </div>
    </MainLayout>
  );
}