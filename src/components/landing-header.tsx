'use client';

import * as React from 'react';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ThemeToggle } from './theme-toggle';

const navLinks = [
  { href: '#projects', label: 'Projects' },
  { href: '#resume', label: 'Resume' },
  { href: '#blog', label: 'Blog' },
  { href: '#contact', label: 'Contact' },
];

const Logo = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M7 10.625l5-3.125 5 3.125-5 3.125-5-3.125z"></path>
    <path d="M7 14.375l5-3.125 5 3.125-5 3.125-5-3.125z"></path>
    <path d="M7 18.125l5-3.125 5 3.125-5 3.125-5-3.125z"></path>
  </svg>
);


export function LandingHeader() {
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl transition-all duration-300 rounded-2xl ${isScrolled ? 'glass-card py-2' : 'bg-transparent py-4'
        }`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        <Link href="#" className="flex items-center gap-3 group" onClick={(e: React.MouseEvent<HTMLAnchorElement>) => handleLinkClick(e, '#home')}>
          <div className="p-2.5 rounded-2xl bg-primary/10 group-hover:bg-primary/20 transition-all duration-500 group-hover:rotate-12">
            <Logo className="h-6 w-6 text-primary" />
          </div>
          <span className="text-xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70 uppercase">
            RJPS
          </span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex glass px-6 py-2.5 rounded-2xl border-white/[0.05]">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={(e: React.MouseEvent<HTMLAnchorElement>) => handleLinkClick(e, link.href)}
              className="text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-xl text-muted-foreground transition-all hover:text-primary hover:bg-white/5"
            >
              {link.label}
            </Link>
          ))}
          <div className="w-[1px] h-4 bg-white/10 mx-2" />
          <ThemeToggle />
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="hidden md:flex rounded-full border-primary/50 hover:bg-primary/10" asChild>
            <Link href="#contact" onClick={(e: React.MouseEvent<HTMLAnchorElement>) => handleLinkClick(e, '#contact')}>Hire Me</Link>
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden rounded-xl">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="glass border-l border-white/10">
              <div className="grid gap-8 p-4 mt-8">
                <Link href="#" className="flex items-center gap-2" onClick={(e: React.MouseEvent<HTMLAnchorElement>) => handleLinkClick(e, '#home')}>
                  <Logo className="h-8 w-8 text-primary" />
                  <span className="text-xl font-bold">RJPS</span>
                </Link>
                <nav className="grid gap-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={(e: React.MouseEvent<HTMLAnchorElement>) => handleLinkClick(e, link.href)}
                      className="text-lg font-medium py-2 border-b border-white/5 transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
                <div className="flex items-center justify-between pt-4">
                  <span className="text-sm text-muted-foreground">Dark Mode</span>
                  <ThemeToggle />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
