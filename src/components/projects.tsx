'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const projects = [
  {
    title: 'Chrono Blog',
    description: 'A modern blogging platform with a clean interface, allowing users to create, read, and manage their posts seamlessly.',
    image: '/img/Blog.jpeg',
    dataAiHint: 'blog writing',
    tags: ['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL'],
    liveUrl: 'https://blog-ebon-three-81.vercel.app/',
    sourceUrl: 'https://github.com/romeljhon/Blog',
  },
  {
    title: 'Rental Ease',
    description: 'From everyday essentials to unique experiences, find what you need, when you need it.',
    image: '/img/rental.png',
    dataAiHint: 'task app',
    tags: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
    liveUrl: 'https://rental-chi-one.vercel.app/',
    sourceUrl: 'https://github.com/romeljhon/Rental-',
  },
  {
    title: 'Pay Ease',
    description: 'This project, PayEase, is a comprehensive payroll management system designed to streamline and simplify payroll processes for businesses.',
    image: '/img/payease.png',
    dataAiHint: 'laptop code',
    tags: ['Next.js', 'Tailwind CSS', 'GenAI', 'Shadcn/UI'],
    liveUrl: 'https://frontendv1-navy.vercel.app/login',
    sourceUrl: 'https://github.com/romeljhon/frontendv1',
  },
];



export function Projects() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any } }
  };

  return (
    <section id="projects" className="w-full py-32 relative">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20"
        >
          <div className="space-y-4">
            <h2 className="text-4xl font-black tracking-tight sm:text-6xl md:text-7xl uppercase italic">
              Selected <span className="text-gradient">Works</span>
            </h2>
            <p className="max-w-[500px] text-muted-foreground text-lg font-sans opacity-80">
              A curated collection of digital products where design meets engineering excellence.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="h-[1px] w-20 bg-white/10 hidden md:block" />
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Scroll to explore</span>
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-12 gap-6"
        >
          {/* Project 1 - Featured (Big) */}
          <motion.div variants={itemVariants} className="md:col-span-8 group">
            <Card className="glass-card h-full min-h-[500px] border-white/5 overflow-hidden flex flex-col group/project">
              <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-primary/10 to-transparent pointer-events-none opacity-0 group-hover/project:opacity-100 transition-opacity duration-700" />
              <CardHeader className="p-8 pb-0 z-20">
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <CardTitle className="text-4xl font-black uppercase tracking-tighter">
                      {projects[0].title}
                    </CardTitle>
                    <div className="flex flex-wrap gap-2">
                      {projects[0].tags.slice(0, 3).map(tag => (
                        <Badge key={tag} className="glass text-[10px] font-bold uppercase tracking-widest border-white/5 py-1">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="rounded-full glass border-white/10" asChild>
                    <Link href={projects[0].liveUrl} target="_blank"><span className="text-xl">↗</span></Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-8 pt-6 z-20 flex-1">
                <CardDescription className="text-lg text-muted-foreground/80 max-w-md leading-relaxed mb-8">
                  {projects[0].description}
                </CardDescription>
              </CardContent>
              <div className="relative h-64 md:h-80 w-full overflow-hidden mt-auto">
                <Image
                  src={projects[0].image}
                  fill
                  alt={projects[0].title}
                  className="object-cover object-top grayscale group-hover/project:grayscale-0 group-hover/project:scale-110 transition-all duration-1000 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
              </div>
            </Card>
          </motion.div>

          {/* Project 2 & 3 - Side Stack */}
          <div className="md:col-span-4 flex flex-col gap-6">
            {projects.slice(1).map((project) => (
              <motion.div key={project.title} variants={itemVariants} className="flex-1 group/item">
                <Card className="glass-card h-full border-white/5 overflow-hidden flex flex-col p-6 group-hover/item:border-primary/30 transition-colors duration-500">
                  <div className="flex flex-col h-full gap-4">
                    <div className="relative aspect-[16/6] rounded-2xl overflow-hidden grayscale group-hover/item:grayscale-0 duration-500">
                      <Image
                        src={project.image}
                        fill
                        alt={project.title}
                        className="object-cover transition-transform duration-700 group-hover/item:scale-110"
                      />
                    </div>
                    <div className="space-y-2">
                      <CardTitle className="text-2xl font-black uppercase tracking-tight group-hover/item:text-primary transition-colors">
                        {project.title}
                      </CardTitle>
                      <CardDescription className="text-sm line-clamp-2 opacity-70">
                        {project.description}
                      </CardDescription>
                      <div className="flex justify-between items-center pt-4">
                        <Link href={project.sourceUrl} target="_blank" className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground hover:text-white underline underline-offset-4">
                          Codebase
                        </Link>
                        <Link href={project.liveUrl} target="_blank" className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary hover:opacity-80">
                          Launch ↗
                        </Link>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
