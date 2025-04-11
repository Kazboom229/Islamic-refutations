import React from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
  language: 'en' | 'so';
}

export default function Hero({ language }: HeroProps) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-primary/10 to-background py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8"> {/* Added sm:px-6 and lg:px-8 for better responsiveness */}
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6 text-center md:text-left"> {/* Added text-center and md:text-left for better alignment */}
            {language === 'en' ? (
              <>
                <span className="block">Truth has come,</span>
                <span className="bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-transparent">
                  and falsehood has vanished
                </span>
              </>
            ) : (
              <>
                <span className="block">Runtu way timid,</span>
                <span className="bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-transparent">
                  beentiina way baaba'day
                </span>
              </>
            )}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground md:text-left"> {/* Added md:text-left for better alignment */}
            {language === 'en' 
              ? 'A comprehensive resource for Islamic teachings, evidence, and refutations of misconceptions. Find answers to your questions about Islam and gain a deeper understanding of the truth.'
              : 'Isha dhammaystiran ee waxbarashada Islaamka, caddaymaha, iyo diidmada qalad-fahamyada. Ka hel jawaabaha su\'aalaha kaa haysta ee ku saabsan Islaamka oo hel faham qoto dheer oo ku saabsan runta.'}
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6 flex-wrap md:flex-nowrap"> {/* Added flex-wrap for better responsiveness */}
            <Link href="/category/why-islam">
              <Button size="lg">
                {language === 'en' ? 'Explore Evidence' : 'Sahmin Caddaynta'}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" asChild>
              <Link href="/refutations">
                {language === 'en' ? 'Browse Refutations' : 'Fiiri Diidmooyinka'}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}