'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export function Hero() {
  const handleScrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative w-full min-h-screen flex items-center justify-center pt-32 pb-20 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 z-10">
        <div key="hero-main" className="flex flex-col items-center text-center space-y-12">

          <motion.div
            key="hero-status"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-white/10 text-primary text-xs font-bold uppercase tracking-[0.2em] mb-4"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Available for new projects
          </motion.div>

          <div className="space-y-6">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-5xl font-black tracking-tight sm:text-7xl md:text-8xl lg:text-9xl max-w-5xl leading-[0.9] uppercase"
            >
              Architecting <br />
              <span className="text-gradient">Experiences</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-[700px] mx-auto text-lg text-muted-foreground md:text-xl font-sans opacity-90 leading-relaxed"
            >
              Creative Web Developer specialized in building
              high-performance, beautiful, and accessible web applications.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center gap-6 sm:flex-row pt-8"
          >
            <Button asChild size="lg" className="h-16 rounded-2xl px-12 bg-primary hover:bg-primary/90 text-lg font-bold transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_-5px_hsla(var(--primary),0.3)]">
              <Link href="#contact" onClick={handleScrollToContact}>
                Let&apos;s Connect
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-16 rounded-2xl px-12 glass border-white/20 text-lg font-bold transition-all hover:bg-white/5 active:scale-95">
              <Link href="#projects">View Works</Link>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Cinematic Glows */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[160px]" />
        <div className="absolute top-[-5%] right-[-5%] w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-5%] left-[-5%] w-[400px] h-[400px] bg-violet-600/10 rounded-full blur-[100px]" />
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-muted-foreground/40 hidden md:block"
      >
        <div className="w-5 h-9 border-2 border-current rounded-full flex justify-center pt-2">
          <div className="w-1 h-1 bg-current rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}
