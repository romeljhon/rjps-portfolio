
'use client'

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';

const projects = [
  {
    title: 'E-Commerce Platform',
    description: 'A full-featured e-commerce site with a modern frontend, robust backend, and secure payment processing.',
    image: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?q=80&w=600&h=400&fit=crop',
    dataAiHint: 'commerce website',
    tags: ['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL'],
    liveUrl: '#',
    sourceUrl: '#',
  },
  {
    title: 'Task Management App',
    description: 'A collaborative task management application designed for teams to organize, track, and complete projects efficiently.',
    image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=600&h=400&fit=crop',
    dataAiHint: 'task app',
    tags: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
    liveUrl: '#',
    sourceUrl: '#',
  },
  {
    title: 'Portfolio Website',
    description: 'My personal portfolio site built to showcase my skills and projects, featuring this very AI description generator.',
    image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=600&h=400&fit=crop',
    dataAiHint: 'portfolio website',
    tags: ['Next.js', 'Tailwind CSS', 'GenAI', 'Shadcn/UI'],
    liveUrl: '#',
    sourceUrl: '#',
  },
];

export function Projects() {
  const { ref, inView } = useScrollAnimation();
  return (
    <section id="projects" ref={ref} className={`w-full py-24 md:py-32 bg-secondary/50 transition-opacity duration-1000 ${inView ? 'animate-fade-in-down' : 'opacity-0'}`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Featured Projects</h2>
          <p className="max-w-[900px] mx-auto text-muted-foreground md:text-xl/relaxed">
            A selection of my work. Each project is a testament to my commitment to quality and my passion for development.
          </p>
        </div>
        <div className="mx-auto grid max-w-5xl items-start gap-8 py-12 sm:grid-cols-2 md:gap-12 lg:max-w-none lg:grid-cols-3">
          {projects.map((project) => (
            <Card key={project.title} className="group overflow-hidden rounded-lg transition-all duration-300 hover:shadow-xl bg-card border">
              <CardHeader className="p-0">
                 <Link href={project.liveUrl} className="block overflow-hidden">
                    <Image
                      src={project.image}
                      width={600}
                      height={400}
                      alt={project.title}
                      className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      data-ai-hint={project.dataAiHint}
                    />
                 </Link>
              </CardHeader>
              <CardContent className="p-6 space-y-3">
                <CardTitle className="text-xl font-bold">{project.title}</CardTitle>
                 <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                </div>
                <CardDescription>{project.description}</CardDescription>
              </CardContent>
              <CardFooter className="p-6 flex justify-start gap-4">
                <Button asChild>
                  <Link href={project.liveUrl} target="_blank">Live Demo</Link>
                </Button>
                <Button asChild variant="secondary">
                  <Link href={project.sourceUrl} target="_blank">Source Code</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
