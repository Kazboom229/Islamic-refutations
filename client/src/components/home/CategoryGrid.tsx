import React from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Book, Brain, Landmark, MessageCircle, Video, Globe, Users, FileText } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const categories = [
  { icon: Brain, titleEn: 'Islamic Theology', titleSo: 'Cilmiga Diinta', path: '/category/theology' },
  { icon: Book, titleEn: 'Sacred Texts', titleSo: 'Qoraallada Qudduuska', path: '/category/texts' },
  { icon: Landmark, titleEn: 'Islamic History', titleSo: 'Taariikhda Islaamka', path: '/category/history' },
  { icon: MessageCircle, titleEn: 'Discussions', titleSo: 'Doodo', path: '/category/discussions' },
  { icon: Video, titleEn: 'Video Lectures', titleSo: 'Muhaadaro Video', path: '/category/lectures' },
  { icon: Globe, titleEn: 'Global Islam', titleSo: 'Islaamka Aduunka', path: '/category/global' },
  { icon: Users, titleEn: 'Community', titleSo: 'Bulsho', path: '/category/community' },
  { icon: FileText, titleEn: 'Resources', titleSo: 'Ilaha', path: '/category/resources' }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 }
};

export const CategoryGrid = () => {
  const { language } = useLanguage();

  return (
    <section className="py-12">
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 max-w-7xl mx-auto px-4" // Modified class for responsiveness
      >
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <motion.div key={category.path} variants={item}>
              <Link href={category.path}>
                <Card className="cursor-pointer hover:scale-105 transition-transform duration-200 bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                  <CardHeader>
                    <Icon className="h-6 w-6 mb-2 text-primary" /> {/* Reduced icon size for better mobile view */}
                    <CardTitle>{language === 'en' ? category.titleEn : category.titleSo}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="line-clamp-2 text-sm md:text-base"> {/* Added text-sm for mobile */}
                      {language === 'en' 
                        ? 'Explore comprehensive resources and discussions'
                        : 'Sahminta ilaha iyo doodaha dhammaystiran'}
                    </CardDescription>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
};