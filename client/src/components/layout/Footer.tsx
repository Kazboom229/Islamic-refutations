import React from 'react';
import { Link } from 'wouter';

interface FooterProps {
  language: 'en' | 'so';
}

export default function Footer({ language }: FooterProps) {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-secondary py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Site Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">
              {language === 'en' ? 'Islamic Education' : 'Waxbarasho Islaam'}
            </h3>
            <p className="text-muted-foreground">
              {language === 'en' 
                ? 'A resource for authentic Islamic knowledge and education'
                : 'Isha aqoonta Islaamka ee rasmiga ah iyo waxbarashada'}
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {language === 'en' ? 'Quick Links' : 'Xiriiriyayaal Degdeg ah'}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {language === 'en' ? 'Home' : 'Bogga Hore'}
                </Link>
              </li>
              <li>
                <Link 
                  href="/category/why-islam" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {language === 'en' ? 'Why Islam' : 'Maxay Islaamku'}
                </Link>
              </li>
              <li>
                <Link 
                  href="/refutations" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {language === 'en' ? 'Refutations' : 'Diidmooyin'}
                </Link>
              </li>
              <li>
                <Link 
                  href="/ask" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {language === 'en' ? 'Ask a Question' : 'Weydii Su\'aal'}
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {language === 'en' ? 'Categories' : 'Qaybaha'}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/category/philosophical-misconceptions"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {language === 'en' ? 'Philosophical' : 'Falsafadeed'}
                </Link>
              </li>
              <li>
                <Link 
                  href="/category/historical-misconceptions"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {language === 'en' ? 'Historical' : 'Taariikheed'}
                </Link>
              </li>
              <li>
                <Link 
                  href="/category/quranic-misconceptions"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {language === 'en' ? 'Quranic' : 'Quraanka'}
                </Link>
              </li>
              <li>
                <Link 
                  href="/category/modern-ideological-debates"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {language === 'en' ? 'Modern Debates' : 'Doodaha Casriga ah'}
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {language === 'en' ? 'Contact' : 'La Xidhiidh'}
            </h3>
            <ul className="space-y-2">
              <li className="text-muted-foreground">
                {language === 'en' ? 'Email:' : 'Emailka:'} info@islamiceducation.org
              </li>
              <li className="text-muted-foreground">
                {language === 'en' ? 'Phone:' : 'Taleefonka:'} +1 (123) 456-7890
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-muted-foreground/20">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground mb-4 md:mb-0">
              &copy; {currentYear} {language === 'en' ? 'Islamic Education. All rights reserved.' : 'Waxbarashada Islaamiga. Xuquuqda oo dhan waa xafidan yihiin.'}
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                {language === 'en' ? 'Privacy Policy' : 'Siyaasadda Arrimaha Gaarka ah'}
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                {language === 'en' ? 'Terms of Service' : 'Shuruudaha Adeegga'}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}