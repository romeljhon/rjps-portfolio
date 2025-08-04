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
    <section id="home" className="w-full py-32 md:py-48 lg:py-56 xl:py-64">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-12">
          <div className="space-y-6">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
              Romel Jhon Salvaleon
            </h1>
            <p className="max-w-[600px] text-lg text-muted-foreground md:text-xl">
              A passionate Web Developer creating seamless and engaging digital experiences. I bring ideas to life with clean code and modern design.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button asChild size="lg">
                <Link href="#contact" onClick={handleScrollToContact}>
                  Get in Touch
                </Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link href="#projects">View My Work</Link>
              </Button>
            </div>
          </div>
           <Image
            src="https://placehold.co/600x600.png"
            alt="Hero Portrait"
            width={600}
            height={600}
            className="mx-auto aspect-square overflow-hidden rounded-full object-cover sm:w-full"
            data-ai-hint="portrait developer"
            priority
          />
        </div>
      </div>
    </section>
  );
}
