import React, { useContext } from 'react';
import MainNavbar from './MainNavbar';
import Footer from './Footer';
import { Toaster } from '@/components/ui/toaster';
import { LanguageContext } from '@/contexts/LanguageContext';
import { ThemeContext } from '@/contexts/ThemeContext';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const { language, setLanguage } = useContext(LanguageContext);
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  
  return (
    <div className={`flex flex-col min-h-screen ${darkMode ? 'dark' : ''}`}>
      <MainNavbar 
        language={language} 
        setLanguage={setLanguage} 
        darkMode={darkMode} 
        setDarkMode={setDarkMode} 
      />
      
      <main className="flex-grow">
        {children}
      </main>
      
      <Footer language={language} />
      
      <Toaster />
    </div>
  );
}