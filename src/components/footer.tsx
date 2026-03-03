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
    <path d="M7 10.625l5-3.125 5 3.125-5 3.125-5-3.125z"></path>
    <path d="M7 14.375l5-3.125 5 3.125-5 3.125-5-3.125z"></path>
    <path d="M7 18.125l5-3.125 5 3.125-5 3.125-5-3.125z"></path>
  </svg>
);


export function Footer() {
  return (
    <footer className="w-full py-12 border-t border-white/5">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 bg-card/30 backdrop-blur-sm p-8 rounded-3xl border border-white/5">
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="flex items-center gap-2 group">
              <div className="p-2 rounded-lg bg-primary/10 transition-colors">
                <Logo className="h-5 w-5 text-primary" />
              </div>
              <span className="text-lg font-bold tracking-tight">RJPS</span>
            </div>
            <p className="text-sm text-muted-foreground text-center md:text-left">
              &copy; {new Date().getFullYear()} Romel Jhon Salvaleon. <br className="sm:hidden" />
              Built with Next.js & Framer Motion.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-4">
            <div className="flex items-center gap-6">
              <Link href="https://github.com/romeljhon" target="_blank" aria-label="GitHub" className="p-3 rounded-full glass hover:bg-primary/10 transition-colors group">
                <Github className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </Link>
              <Link href="https://www.linkedin.com/in/romel-jhon-pacala-salvaleon-08765a292/" target="_blank" aria-label="LinkedIn" className="p-3 rounded-full glass hover:bg-primary/10 transition-colors group">
                <Linkedin className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </Link>
              <Link href="#" aria-label="Twitter" className="p-3 rounded-full glass hover:bg-primary/10 transition-colors group">
                <Twitter className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </Link>
            </div>
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-[0.2em]">
              Philippines &bull; Remote
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
