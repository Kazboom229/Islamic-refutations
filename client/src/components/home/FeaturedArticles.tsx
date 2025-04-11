import React from 'react';
import { Link } from 'wouter';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Article } from '@/lib/types';
import { ArrowRight, ExternalLink, Eye } from 'lucide-react';

interface FeaturedArticlesProps {
  language: 'en' | 'so';
  articles?: Article[];
  isLoading?: boolean;
}

export default function FeaturedArticles({ language, articles = [], isLoading = false }: FeaturedArticlesProps) {
  // Placeholder data in case articles haven't loaded yet
  const placeholderArticles = [
    {
      id: 1,
      title_en: 'The Contingency Argument for God',
      title_so: 'Doodda Suurtogalnimada ee Ilaahay',
      excerpt_en: 'A logical proof for God based on the contingent nature of the universe',
      excerpt_so: 'Caddayn caqli ah oo Ilaahay ku salaysan dabeecadda suurtogalnimada ee koonka',
      slug: 'contingency-argument-for-god',
      type: 'evidence',
      views: 124,
      tags: ['philosophy', 'logic', 'existence of God']
    },
    {
      id: 2,
      title_en: 'The Problem of Evil - A Muslim Response',
      title_so: 'Dhibaatada Sharka - Jawaab Muslim ah',
      excerpt_en: 'Understanding why the existence of evil does not contradict belief in God',
      excerpt_so: 'Fahamka sababta jiritaanka sharka uusan khilaafin rumaysanka Ilaah',
      slug: 'problem-of-evil-muslim-response',
      type: 'refutation',
      views: 97,
      tags: ['philosophy', 'evil', 'theodicy']
    },
    {
      id: 3,
      title_en: 'Common Misconceptions about Islamic History',
      title_so: 'Qalad-fahamyada Caadiga ah ee ku saabsan Taariikhda Islaamka',
      excerpt_en: 'Addressing historical inaccuracies about Islam and Muslims',
      excerpt_so: 'Wax ka qabashada khaladaadka taariikheed ee ku saabsan Islaamka iyo Muslimiinta',
      slug: 'common-misconceptions-islamic-history',
      type: 'refutation',
      views: 85,
      tags: ['history', 'misconceptions']
    }
  ];

  const displayArticles = articles.length > 0 ? articles : placeholderArticles;

  return (
    <section className="py-16 bg-accent/30">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-bold">
            {language === 'en' ? 'Featured Articles' : 'Maqaallada La Soo Jeediyay'}
          </h2>
          <Button variant="outline" asChild>
            <Link href="/articles">
              <a className="flex items-center">
                {language === 'en' ? 'View All' : 'Eeg Dhammaan'}
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Link>
          </Button>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="border shadow-sm h-full opacity-70 animate-pulse">
                <CardHeader className="h-28 bg-muted"></CardHeader>
                <CardContent className="mt-4">
                  <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-muted rounded w-1/2"></div>
                </CardContent>
                <CardFooter className="h-10 bg-muted mt-4"></CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayArticles.map((article) => (
              <Link key={article.id} href={`/article/${article.slug}`}>
                <a className="group h-full">
                  <Card className="border shadow-sm h-full hover:shadow-md transition-shadow">
                    <CardHeader>
                      <Badge className="self-start mb-2" variant={article.type === 'evidence' ? 'default' : 'secondary'}>
                        {article.type === 'evidence' 
                          ? (language === 'en' ? 'Evidence' : 'Caddayn') 
                          : (language === 'en' ? 'Refutation' : 'Diidmo')}
                      </Badge>
                      <CardTitle className="group-hover:text-primary transition-colors">
                        {language === 'en' ? article.title_en : article.title_so}
                      </CardTitle>
                      <CardDescription>
                        {language === 'en' ? article.excerpt_en : article.excerpt_so}
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
                        {article.views}
                      </div>
                      <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </CardFooter>
                  </Card>
                </a>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}