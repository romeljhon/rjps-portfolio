import { LandingHeader } from '@/components/landing-header';
import { Hero } from '@/components/hero';
import { Projects } from '@/components/projects';
import { Resume } from '@/components/resume';
import { Blog } from '@/components/blog';
import { Contact } from '@/components/contact';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-[100dvh] bg-background">
      <LandingHeader />
      <main className="flex-1">
        <Hero />
        <Projects />
        <Resume />
        <Blog />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
