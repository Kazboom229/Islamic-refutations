import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Moon, Sun, Menu, X, Search, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface MainNavbarProps {
  language: 'en' | 'so';
  setLanguage: (lang: 'en' | 'so') => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
}

export default function MainNavbar({ language, setLanguage, darkMode, setDarkMode }: MainNavbarProps) {
  const [location] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const mainLinks = [
    { 
      href: '/', 
      label: language === 'en' ? 'Home' : 'Bogga Hore' 
    },
    { 
      href: '/category/why-islam', 
      label: language === 'en' ? 'Why Islam' : 'Maxay Islaamku' 
    },
    { 
      href: '/refutations', 
      label: language === 'en' ? 'Refutations' : 'Diidmooyin' 
    },
    { 
      href: '/category/multimedia', 
      label: language === 'en' ? 'Multimedia' : 'Warbaahinta' 
    },
    { 
      href: '/ask', 
      label: language === 'en' ? 'Ask a Question' : 'Weydii Su\'aal' 
    },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo & Title */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
                <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-transparent">
                  {language === 'en' ? 'Islamic Education' : 'Waxbarasho Islaam'}
                </span>
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex space-x-6">
            {mainLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${location === link.href ? 'text-primary' : 'text-foreground'}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            {/* Search Button */}
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Search className="h-5 w-5" />
            </Button>

            {/* Language Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Globe className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setLanguage('en')} className={language === 'en' ? 'bg-accent' : ''}>
                  English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage('so')} className={language === 'so' ? 'bg-accent' : ''}>
                  Somali
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Theme Toggle */}
            <Button variant="ghost" size="icon" onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>

            {/* Mobile Menu Button */}
            <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}>
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden p-4 pt-0 bg-background border-b border-border">
          <div className="space-y-2 py-4">
            {mainLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                className={`block py-2.5 px-3 rounded-md transition-colors ${
                  location === link.href
                    ? 'bg-primary/10 text-primary'
                    : 'text-foreground hover:bg-accent'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            {/* Search in Mobile Menu */}
            <div className="py-2.5 px-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="search"
                  placeholder={language === 'en' ? 'Search...' : 'Raadi...'}
                  className="w-full rounded-md border border-input px-9 py-2 text-sm bg-background placeholder:text-muted-foreground"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}