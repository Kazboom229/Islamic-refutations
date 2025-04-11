import React from 'react';
import { Link } from 'wouter';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Book, Brain, Landmark, MessageCircle, Video } from 'lucide-react';

interface CategoryGridProps {
  language: 'en' | 'so';
}

export default function CategoryGrid({ language }: CategoryGridProps) {
  const categories = [
    {
      title: language === 'en' ? 'Why Islam' : 'Maxay Islaamku',
      description: language === 'en' 
        ? 'Evidence and arguments for the truth of Islamic teachings'
        : 'Caddaymaha iyo doodaha runta waxbarashada Islaamka',
      icon: <Book className="h-10 w-10 text-primary" />,
      href: '/category/why-islam',
    },
    {
      title: language === 'en' ? 'Philosophical Misconceptions' : 'Qalad-fahamka Falsafadeed',
      description: language === 'en'
        ? 'Addressing philosophical objections to Islamic beliefs'
        : 'Wax ka qabashada diidmada falsafadeed ee caqiidada Islaamka',
      icon: <Brain className="h-10 w-10 text-primary" />,
      href: '/category/philosophical-misconceptions',
    },
    {
      title: language === 'en' ? 'Historical Misconceptions' : 'Qalad-fahamka Taariikheed',
      description: language === 'en'
        ? 'Correcting historical errors about Islam and Muslims'
        : 'Saxitaanka khaladaadka taariikheed ee ku saabsan Islaamka iyo Muslimiinta',
      icon: <Landmark className="h-10 w-10 text-primary" />,
      href: '/category/historical-misconceptions',
    },
    {
      title: language === 'en' ? "Qur'anic Misconceptions" : 'Qalad-fahamka Quraanka',
      description: language === 'en'
        ? 'Addressing misunderstandings about the Quran'
        : 'Wax ka qabashada khalad-fahamka ku saabsan Quraanka',
      icon: <Book className="h-10 w-10 text-primary" />,
      href: '/category/quranic-misconceptions',
    },
    {
      title: language === 'en' ? 'Modern Ideological Debates' : 'Doodaha Fikradeed ee Casriga ah',
      description: language === 'en'
        ? 'Islamic responses to modern ideological challenges'
        : 'Jawaabaha Islaamiga ah ee caqabadaha fikradeed ee casriga ah',
      icon: <MessageCircle className="h-10 w-10 text-primary" />,
      href: '/category/modern-ideological-debates',
    },
    {
      title: language === 'en' ? 'Multimedia Resources' : 'Ilaha Warbaahinta',
      description: language === 'en'
        ? 'Videos, presentations, and interactive resources'
        : 'Fiidiyowyada, soo-bandhigyada, iyo ilaha wada-dhismeed',
      icon: <Video className="h-10 w-10 text-primary" />,
      href: '/category/multimedia',
    },
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">
          {language === 'en' ? 'Explore Categories' : 'Sahmin Qaybaha'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link href={category.href} key={category.href}>
              <a className="group transition-all duration-300 h-full">
                <Card className="h-full border-2 hover:border-primary transition-colors group-hover:shadow-lg">
                  <CardHeader className="flex flex-row items-center gap-4">
                    <div>
                      {category.icon}
                    </div>
                    <div>
                      <CardTitle className="text-xl group-hover:text-primary transition-colors">{category.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">{category.description}</CardDescription>
                  </CardContent>
                </Card>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}