
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

export default function FitrahEvidence() {
  const { language } = useLanguage();

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>
          {language === 'en' ? 'The Fitrah - Natural Disposition to Believe in God' : 'Al-Fitrah - Dabeecadda Ruuxda ee Iimaanka'}
        </CardTitle>
        <CardDescription>
          {language === 'en' 
            ? 'Scientific and philosophical evidence for the innate human disposition to believe in God'
            : 'Caddaymaha cilmiga iyo falsafadda ee ku saabsan dabeecadda aadanaha ee iimaanka'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">
            {language === 'en' ? 'Key Evidence:' : 'Caddaymaha Muhiimka ah:'}
          </h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              {language === 'en'
                ? 'Developmental Psychology: Research shows children naturally form concepts of a creator without explicit teaching'
                : 'Cilmi-nafsiga Koritaanka: Cilmi-baadhista ayaa muujinaysa in carruurtu si dabiici ah u fahmaan abuuraha'}
            </li>
            <li>
              {language === 'en'
                ? 'Cross-Cultural Studies: Universal patterns of belief emergence across all human societies'
                : 'Daraasadaha Dhaqamada: Qaababka caalamiga ah ee caqiidada ee bulshada aadanaha oo dhan'}
            </li>
            <li>
              {language === 'en'
                ? 'Cognitive Science: Built-in mental faculties for recognizing divine agency and purpose'
                : 'Sayniska Maskaxda: Awoodaha maskaxda ee loo abuuray in lagu garto ujeedada ilaahiga ah'}
            </li>
            <li>
              {language === 'en'
                ? 'Historical Evidence: All ancient civilizations show original monotheistic beliefs'
                : 'Caddaynta Taariikhiga: Dhammaan dadkii hore waxay muujiyeen caqiido hal-ilaah leh'}
            </li>
          </ul>

          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">
              {language === 'en' ? 'Quranic Foundation:' : 'Aasaaska Quraanka:'}
            </h3>
            <blockquote className="border-l-4 border-primary pl-4 italic">
              {language === 'en'
                ? '"So direct your face toward the religion, inclining to truth. [Adhere to] the fitrah of Allah upon which He has created [all] people." (Quran 30:30)'
                : '"Ee u jeedi wejigaaga diinka, oo ah midka toosan. [Raac] fitrada Alle ee uu ku abuuray dadka." (Quraan 30:30)'}
            </blockquote>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
