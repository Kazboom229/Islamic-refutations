import React, { useContext, useState } from 'react';
import { Link } from 'wouter';
import MainLayout from '@/components/layout/MainLayout';
import { LanguageContext } from '@/contexts/LanguageContext';
import { useArticles } from '@/hooks/useArticles';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowRight, ChevronRight, ExternalLink, Eye, Search } from 'lucide-react';

export default function RefutationsPage() {
  const { language } = useContext(LanguageContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'philosophical', 'historical', 'quranic', 'modern'
  
  const { data: articles, isLoading } = useArticles({
    type: 'refutation'
  });

  // Filter articles based on search query and active tab
  const filteredArticles = articles?.filter(article => {
    const matchesSearch = searchQuery 
      ? (article.title_en.toLowerCase().includes(searchQuery.toLowerCase()) ||
         (article.title_so && article.title_so.toLowerCase().includes(searchQuery.toLowerCase())) ||
         (article.excerpt_en && article.excerpt_en.toLowerCase().includes(searchQuery.toLowerCase())) ||
         (article.excerpt_so && article.excerpt_so.toLowerCase().includes(searchQuery.toLowerCase()))) 
      : true;
    
    const matchesTab = activeTab === 'all' 
      ? true 
      : article.tags?.includes(activeTab);
    
    return matchesSearch && matchesTab;
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // The filtering happens in the filteredArticles derivation above
  };

  const tabs = [
    { id: 'all', label: language === 'en' ? 'All Refutations' : 'Dhammaan Diidmooyinka' },
    { id: 'philosophical', label: language === 'en' ? 'Philosophical' : 'Falsafadeed' },
    { id: 'historical', label: language === 'en' ? 'Historical' : 'Taariikheed' },
    { id: 'quranic', label: language === 'en' ? 'Quranic' : 'Quraanka' },
    { id: 'modern', label: language === 'en' ? 'Modern' : 'Casriga ah' },
  ];

  return (
    <MainLayout>
      <div className="bg-primary/10 py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">
            {language === 'en' ? 'Refutations' : 'Diidmooyinka'}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mb-8">
            {language === 'en'
              ? 'Well-researched answers to common misconceptions and criticisms about Islam.'
              : 'Jawaabo si fiican loo baadhay oo ku saabsan qalad-fahamyada iyo dhaleeceynta caadiga ah ee Islaamka.'}
          </p>

          <form onSubmit={handleSearch} className="max-w-lg">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder={language === 'en' ? 'Search refutations...' : 'Raadi diidmooyinka...'}
                className="pl-10 py-6"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid grid-cols-2 md:grid-cols-5">
            {tabs.map(tab => (
              <TabsTrigger key={tab.id} value={tab.id}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {isLoading ? (
          <div className="grid grid-cols-1 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-64 w-full" />
            ))}
          </div>
        ) : filteredArticles && filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 gap-6">
            {filteredArticles.map((article) => (
              <Link key={article.id} href={`/article/${article.slug}`}>
                <a className="block group">
                  <Card className="transition-shadow hover:shadow-md">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
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
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                </a>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">
              {language === 'en'
                ? 'No refutations match your search criteria.'
                : 'Ma jiraan diidmooyin ku habboon shuruudahaaga raadinta.'}
            </p>
            {searchQuery && (
              <Button variant="outline" onClick={() => setSearchQuery('')}>
                {language === 'en' ? 'Clear Search' : 'Tirtir Raadinta'}
              </Button>
            )}
          </div>
        )}
      </div>
    </MainLayout>
  );
}