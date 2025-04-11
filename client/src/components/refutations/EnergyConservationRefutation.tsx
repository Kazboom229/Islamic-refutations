
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

export const EnergyConservationRefutation = () => {
  const { language } = useLanguage();

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>
          {language === 'en' 
            ? 'The Absolutism of Energy Conservation: A Scientific and Philosophical Analysis'
            : 'Mutlaqa ah ee Joogtaynta Tamarta: Falanqayn Sayniseed iyo Falsafadeed'}
        </CardTitle>
      </CardHeader>
      <CardContent className="prose dark:prose-invert max-w-none">
        <h3>{language === 'en' ? 'Introduction' : 'Hordhac'}</h3>
        <p>
          {language === 'en'
            ? 'While energy conservation remains a powerful principle in physics, emerging evidence from quantum mechanics, cosmology, and theoretical physics suggests scenarios where strict energy conservation may not hold absolutely.'
            : 'In kasta oo joogtaynta tamarta ay tahay mabda\' xoog leh oo physics ah, caddaymaha soo baxaya ee ka imanaya mikaniikada quantum, cilmiga cosmic-ka, iyo physics-ka theoretical-ka ayaa tilmaamaya xaalado ay joogtaynta adag ee tamarta aysan si mutlaq ah u taagnaan karin.'}
        </p>

        <h3>{language === 'en' ? 'Scientific Evidence' : 'Caddaynta Sayniska'}</h3>
        <ul>
          <li>
            {language === 'en'
              ? 'Quantum mechanics permits temporary violations through uncertainty principle'
              : 'Mikaniikada quantum waxay u ogolaataa ku-xadgudubyo ku-meel-gaar ah iyada oo loo marayo mabda\'a hubanti la\'aanta'}
          </li>
          <li>
            {language === 'en'
              ? 'Virtual particles appear and disappear in quantum vacuum'
              : 'Qeybaha virtual-ka ah ayaa ka muuqda oo ka libdha vacuum-ka quantum-ka'}
          </li>
          <li>
            {language === 'en'
              ? 'Dark energy maintains constant density despite spatial expansion'
              : 'Tamarta madow waxay joogtaynaysaa cufnaanta joogtada ah inkasta oo ay ballaadhayso meesha'}
          </li>
        </ul>

        <h3>{language === 'en' ? 'Philosophical Analysis' : 'Falanqaynta Falsafadeed'}</h3>
        <p>
          {language === 'en'
            ? 'Energy conservation is better understood as a contextual principle valid within specific domains rather than an absolute metaphysical truth.'
            : 'Joogtaynta tamarta waxaa si wanaagsan loo fahmi karaa inay tahay mabda\' xaaladeed oo ansax ah gudaha domains gaar ah halkii ay ka ahaan lahayd run metaphysical oo mutlaq ah.'}
        </p>
      </CardContent>
    </Card>
  );
};
