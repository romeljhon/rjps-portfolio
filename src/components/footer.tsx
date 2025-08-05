import Link from 'next/link';
import { Github, Linkedin, Twitter } from 'lucide-react';

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
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: 'rgb(236, 72, 153)', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: 'rgb(245, 158, 11)', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      <rect x="3" y="3" width="18" height="18" rx="4" ry="4" stroke="url(#logoGradient)" />
      <path d="M10 9l-2 3 2 3" stroke="currentColor" />
      <path d="M14 15l2-3-2-3" stroke="currentColor" />
    </svg>
);


export function Footer() {
  return (
    <footer className="w-full bg-secondary py-6">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row md:px-6">
        <div className="flex items-center gap-2">
          <Logo className="h-6 w-6 text-primary" />
          <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} Romel Jhon Salvaleon. All rights reserved.</p>
        </div>
        <div className="flex items-center gap-4">
          <Link href="#" aria-label="GitHub">
            <Github className="h-5 w-5 text-muted-foreground transition-colors hover:text-primary" />
          </Link>
          <Link href="#" aria-label="LinkedIn">
            <Linkedin className="h-5 w-5 text-muted-foreground transition-colors hover:text-primary" />
          </Link>
          <Link href="#" aria-label="Twitter">
            <Twitter className="h-5 w-5 text-muted-foreground transition-colors hover:text-primary" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
