
'use client'
import dynamic from 'next/dynamic';
import { LandingHeader } from '@/components/landing-header';
import { Hero } from '@/components/hero';
import { Services } from '@/components/services';
import { Blog } from '@/components/blog';
import { Footer } from '@/components/footer';

import { ThreeScene } from '@/components/ui/ThreeScene';

const ProjectGallery = dynamic(() => import('@/components/gallery'), { ssr: false });

const Resume = dynamic(() => import('@/components/resume').then(mod => mod.Resume), { ssr: false });
const Contact = dynamic(() => import('@/components/contact').then(mod => mod.Contact), { ssr: false });

export default function Home() {
  return (
    <div className="flex flex-col min-h-dvh">
      <LandingHeader />
      <main className="flex-1">
        <Hero />
        <section className="container mx-auto px-4 py-20 overflow-hidden">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-black uppercase tracking-tighter sm:text-5xl">3D <span className="text-primary italic">Sandbox</span></h2>
            <p className="text-muted-foreground mt-4">Interactive physics world (Work in Progress inspired by Bruno Simon)</p>
          </div>
          <ThreeScene />
        </section>
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
