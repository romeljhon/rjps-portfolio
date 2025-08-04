'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

export function Hero() {
  const handleScrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <section id="home" className="w-full py-24 md:py-32 lg:py-40 xl:py-48">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl xl:text-7xl/none">
                Creative Web Developer
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                I craft beautiful and functional websites, bringing ideas to life with code.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild size="lg">
                <Link href="#contact" onClick={handleScrollToContact}>
                  Get in Touch
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="#projects">View My Work</Link>
              </Button>
            </div>
          </div>
           <Image
            src="https://placehold.co/600x600.png"
            alt="Hero Portrait"
            width={600}
            height={600}
            className="mx-auto aspect-square overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
            data-ai-hint="portrait developer"
          />
        </div>
      </div>
    </section>
  );
}
