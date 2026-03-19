'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
 
const RESPONSIVE_SIZES = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw";

const projects = [
  {
    title: 'Kazupay ERP Solutions',
    description: 'A comprehensive Enterprise Resource Planning (ERP) platform for retail and hospitality brands. Featuring HR management, automated payroll, real-time inventory tracking, and AI-powered financial insights.',
    image: '/img/kazupay_erp.png',
    dataAiHint: 'enterprise software dashboard',
    tags: ['Next.js', 'Django', 'PostgreSQL', 'Firebase', 'GenAI'],
    features: ['AI Financial Insights', 'Automated Payroll', 'HR Management', 'Inventory Tracker'],
    liveUrl: 'https://kazupay-solutions.vercel.app/',
    sourceUrl: 'https://github.com/romeljhon/KazupayUnified',
  },
  {
    title: 'RentSnap',
    description: 'RentSnap is a modern platform where users can list items for rent and browse available listings. Built with real-time notifications, messaging, and smart filtering.',
    image: '/img/rentsnap.png',
    dataAiHint: 'rental platform interface',
    tags: ['Next.js', 'Django', 'PostgreSQL', 'Tailwind CSS', 'Radix UI'],
    features: ['Real-time Messaging', 'Smart Filtering', 'Secure Checkout', 'Map Integration'],
    liveUrl: 'https://rental-chi-one.vercel.app/',
    sourceUrl: 'https://github.com/romeljhon/Rental-',
  },
  {
    title: 'Project Flow',
    description: 'Intuitive project management tool featuring drag-and-drop task organization, progress analytics via charts, and real-time collaboration for efficient team workflows.',
    image: '/img/project_flow.png',
    dataAiHint: 'project management kanban board',
    tags: ['Next.js', 'Firebase', 'DND Kit', 'Chart.js', 'Framer Motion'],
    features: ['Kanban Drag & Drop', 'Team Analytics', 'Live Collaboration', 'Role Management'],
    liveUrl: 'https://projectmanagement-phi.vercel.app/',
    sourceUrl: 'https://github.com/romeljhon/ProjectManagement',
  },
  {
    title: 'Pay Ease',
    description: 'This project, PayEase, is a comprehensive payroll management system designed to streamline and simplify payroll processes for businesses.',
    image: '/img/payease.png',
    dataAiHint: 'laptop code',
    tags: ['Next.js', 'Tailwind CSS', 'GenAI', 'Shadcn/UI'],
    features: ['Automated Tax Logic', 'Direct Deposits', 'AI Document Parsing', 'Cloud Sync'],
    liveUrl: 'https://frontendv1-navy.vercel.app/login',
    sourceUrl: 'https://github.com/romeljhon/frontendv1',
  },
  {
    title: 'Chrono Blog',
    description: 'A sleek blogging platform with a clean UI, allowing users to create, manage, and discover posts through a seamless reading experience.',
    image: '/img/Blog.jpeg',
    dataAiHint: 'blog writing app',
    tags: ['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL'],
    features: ['Stripe Payments', 'Markdown Support', 'SEO Optimized', 'Member-only Content'],
    liveUrl: 'https://blog-ebon-three-81.vercel.app/',
    sourceUrl: 'https://github.com/romeljhon/Blog',
  },
];

export function Projects() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.98 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as any } }
  };

  return (
    <section id="projects" className="w-full py-32 relative">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-24"
        >
          <div className="space-y-6">
            <h2 className="text-5xl font-black tracking-tight sm:text-7xl md:text-8xl lg:text-9xl uppercase italic leading-none">
              Selected <br /><span className="text-gradient">Portfolio</span>
            </h2>
            <p className="max-w-[500px] text-muted-foreground text-xl font-sans opacity-70 leading-relaxed">
              Curated architectural builds where deep engineering meets fluid high-end design.
            </p>
          </div>
          <div className="flex items-center gap-6">
            <div className="h-[1px] w-32 bg-gradient-to-r from-transparent via-white/20 to-transparent hidden md:block" />
            <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-[0.4em] font-bold">Showcase v2.0</span>
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-12 gap-10 group/grid"
        >
          {projects.map((project, index) => {
            const itemIndex = index % 4;
            const isFeatured = itemIndex === 0 || itemIndex === 3;
            const colSpan = isFeatured ? 'md:col-span-8' : 'md:col-span-4';

            return (
              <motion.div 
                key={project.title} 
                variants={itemVariants} 
                className={`${colSpan} group/container transition-all duration-1000 hover:!opacity-100 group-hover/grid:opacity-30 group-hover/grid:grayscale-[0.8]`}
              >
                <ProjectCard project={project} index={index} isFeatured={isFeatured} />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index, isFeatured = false }: { project: typeof projects[0], index: number, isFeatured?: boolean }) {
  const displayIndex = (index + 1).toString().padStart(2, '0');
  
  // 3D Tilt Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      className={`relative glass-card h-full min-h-[500px] border border-white/5 overflow-hidden flex flex-col group/project transition-all duration-700 hover:border-primary/40 active:scale-[0.99] rounded-[2rem] shadow-2xl ${isFeatured ? 'p-0' : 'p-10'}`}
    >
      {/* Radial Glow Effect */}
      <div className="absolute inset-0 z-10 pointer-events-none opacity-0 group-hover/project:opacity-100 transition-opacity duration-700 bg-[radial-gradient(circle_at_var(--mouse-x)_var(--mouse-y),rgba(124,58,237,0.15),transparent_40%)]" 
        style={{ 
          // @ts-ignore
          "--mouse-x": `${(x.get() + 0.5) * 100}%`,
          "--mouse-y": `${(y.get() + 0.5) * 100}%` 
        }} 
      />

      <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none" />

      {isFeatured ? (
        <>
          <div className="absolute top-10 right-10 text-9xl font-black text-white/[0.02] select-none pointer-events-none group-hover/project:text-primary/10 transition-all duration-1000 italic transform translate-z-20">
            {displayIndex}
          </div>
          <div className="absolute inset-x-0 top-0 h-2/3 bg-gradient-to-b from-primary/10 via-transparent to-transparent pointer-events-none opacity-0 group-hover/project:opacity-100 transition-opacity duration-1000" />
          
          <div className="p-12 pb-0 z-20 flex-1 flex flex-col">
            <div className="flex justify-between items-start mb-10 translate-z-50">
              <div className="space-y-6">
                <h3 className="text-6xl font-black uppercase tracking-tighter group-hover/project:text-primary transition-all duration-700 leading-none max-w-xl">
                  {project.title}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {project.tags.map(tag => (
                    <Badge key={tag} className="glass text-[9px] font-black uppercase tracking-[0.2em] border-white/10 py-1.5 px-4 rounded-full">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              <Button variant="ghost" size="icon" className="h-16 w-16 rounded-full glass border-white/5 hover:bg-primary/20 hover:text-primary transition-all duration-500 hover:scale-110 active:scale-90" asChild>
                <Link href={project.liveUrl} target="_blank"><span className="text-3xl">↗</span></Link>
              </Button>
            </div>
            
            <p className="text-xl text-muted-foreground/70 max-w-xl leading-relaxed mb-6 translate-z-30">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-x-8 gap-y-4 mb-12 translate-z-40">
              {project.features.map(feature => (
                 <div key={feature} className="flex items-center gap-2">
                   <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                   <span className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">{feature}</span>
                 </div>
              ))}
            </div>

            <div className="relative h-[400px] w-full rounded-t-[3rem] overflow-hidden mt-auto border-t border-x border-white/5 group-hover/project:border-primary/20 transition-colors duration-700">
              <Image
                sizes={RESPONSIVE_SIZES}
                src={project.image}
                fill
                priority={index === 0}
                alt={project.title}
                className="object-cover object-top grayscale group-hover/project:grayscale-0 group-hover/project:scale-110 transition-all duration-1000 ease-out translate-z-10"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col h-full gap-8 z-20">
          <div className="relative aspect-[4/3] rounded-[1.5rem] overflow-hidden grayscale group-hover/project:grayscale-0 transition-all duration-1000 ring-1 ring-white/10 group-hover/project:ring-primary/40 translate-z-40">
            <Image
              sizes={RESPONSIVE_SIZES}
              src={project.image}
              fill
              alt={project.title}
              className="object-cover transition-transform duration-1000 group-hover/project:scale-110"
            />
          </div>
          <div className="flex-1 flex flex-col space-y-6">
            <div className="flex justify-between items-start">
              <h3 className="text-3xl font-black uppercase tracking-tight group-hover/project:text-primary transition-all duration-700 leading-tight translate-z-30">
                {project.title}
              </h3>
              <span className="text-[10px] font-mono text-muted-foreground/30 font-black tracking-widest">{displayIndex}</span>
            </div>
            <p className="text-md line-clamp-4 opacity-50 leading-relaxed group-hover/project:opacity-80 transition-opacity">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              {project.tags.slice(0, 3).map(tag => (
                <span key={tag} className="text-[9px] font-black uppercase tracking-[0.3em] text-primary/50 group-hover:text-primary/80 transition-colors">#{tag}</span>
              ))}
            </div>
            
            <div className="space-y-2 pt-4 border-t border-white/5 group-hover/project:border-primary/10 transition-colors">
               {project.features.slice(0, 2).map(feature => (
                 <div key={feature} className="flex items-center gap-2">
                   <div className="h-1 w-1 rounded-full bg-white/20 group-hover/project:bg-primary/40 transition-colors" />
                   <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/50">{feature}</span>
                 </div>
               ))}
            </div>

            <div className="flex justify-between items-center pt-10 mt-auto translate-z-50">
              <Link href={project.sourceUrl} target="_blank" className="group/link text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground hover:text-white transition-all flex items-center gap-2">
                <span className="h-[1px] w-4 bg-white/20 group-hover/link:w-8 transition-all" />
                Codebase
              </Link>
              <Link href={project.liveUrl} target="_blank" className="text-[10px] font-black uppercase tracking-[0.3em] text-primary hover:opacity-80 flex items-center gap-2 animate-pulse">
                System Launch <span>↗</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}

