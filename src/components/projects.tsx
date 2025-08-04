import Image from 'next/image';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const projects = [
  {
    title: 'E-Commerce Platform',
    description: 'A full-featured e-commerce site with a modern frontend, robust backend, and secure payment processing.',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'commerce website',
    tags: ['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL'],
    liveUrl: '#',
    sourceUrl: '#',
  },
  {
    title: 'Task Management App',
    description: 'A collaborative task management application designed for teams to organize, track, and complete projects efficiently.',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'task app',
    tags: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
    liveUrl: '#',
    sourceUrl: '#',
  },
  {
    title: 'Portfolio Website',
    description: 'My personal portfolio site built to showcase my skills and projects, featuring this very AI description generator.',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'portfolio website',
    tags: ['Next.js', 'Tailwind CSS', 'GenAI', 'Shadcn/UI'],
    liveUrl: '#',
    sourceUrl: '#',
  },
];

export function Projects() {
  return (
    <section id="projects" className="w-full py-24 md:py-32 bg-card">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl">Featured Projects</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              A selection of my work. Each project is a testament to my commitment to quality and my passion for development.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-start gap-8 py-12 sm:grid-cols-2 md:gap-12 lg:max-w-none lg:grid-cols-3">
          {projects.map((project) => (
            <Card key={project.title} className="group overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <CardHeader className="p-0">
                <Image
                  src={project.image}
                  width={600}
                  height={400}
                  alt={project.title}
                  className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  data-ai-hint={project.dataAiHint}
                />
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <CardTitle className="font-headline text-2xl">{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                </div>
              </CardContent>
              <CardFooter className="p-6 flex justify-between">
                <Button asChild variant="outline">
                  <Link href={project.liveUrl} target="_blank">Live Demo</Link>
                </Button>
                <Button asChild variant="ghost">
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
