import React, { createContext, useState, useEffect, ReactNode } from 'react';

interface LanguageContextType {
  language: 'en' | 'so';
  setLanguage: (lang: 'en' | 'so') => void;
}

export const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {}
});

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<'en' | 'so'>('en');
  
  useEffect(() => {
    // Load language preference from localStorage on initial render
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage === 'en' || storedLanguage === 'so') {
      setLanguage(storedLanguage);
    }
  }, []);
  
  const handleSetLanguage = (lang: 'en' | 'so') => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};