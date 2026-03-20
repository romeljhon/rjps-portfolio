
'use client'
import dynamic from 'next/dynamic';
import { LandingHeader } from '@/components/landing-header';
import { Hero } from '@/components/hero';
import { Services } from '@/components/services';
import { Blog } from '@/components/blog';
import { Footer } from '@/components/footer';

const ProjectGallery = dynamic(() => import('@/components/gallery'), { ssr: false });
const Resume = dynamic(() => import('@/components/resume').then(mod => mod.Resume), { ssr: false });
const Contact = dynamic(() => import('@/components/contact').then(mod => mod.Contact), { ssr: false });

export default function Home() {
  return (
    <div className="flex flex-col min-h-dvh">
      <LandingHeader />
      <main className="flex-1">
        <Hero />
        <Services />
        <ProjectGallery />
        <Resume />
        <Blog />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
