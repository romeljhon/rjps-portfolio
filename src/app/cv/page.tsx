
'use client'

import { Mail, Github, Globe, Phone, MapPin, Download, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

const experience = [
  {
    role: 'Senior Web Developer',
    company: 'CyTech International.',
    period: 'Dec 2025 - Present',
    description: 'Led the architecture and development of a scalable e-commerce platform using a microservices-based approach with Node.js and React. Optimized application performance, reducing page load times by 40% through code splitting and server-side rendering.'
  },
  {
    role: 'Jr. Web Developer',
    company: 'CyTech International',
    period: 'Feb 2024 - Dec 2024',
    description: 'Developed and maintained responsive user interfaces for a client-facing SaaS application using Vue.js and Tailwind CSS. Collaborated with backend developers to integrate RESTful APIs.'
  },
  {
    role: 'Intern',
    company: 'CyTech International',
    period: 'Dec 2023 - Feb 2024',
    description: 'Assisting in implementation of minor features on a large-scale web application. Developed a solid foundation in React and state management, and learned to work with Python/Django APIs.'
  }
];

const selectedProjects = [
  {
    title: 'Kazupay ERP Solutions',
    description: 'Full-stack ERP system with AI-powered financial insights and automated payroll.',
    tags: ['Next.js', 'Django', 'GenAI', 'Firebase']
  },
  {
    title: 'RentSnap',
    description: 'Modern rental marketplace with real-time notifications and filtering.',
    tags: ['Next.js', 'Django', 'Tailwind', 'PostgreSQL']
  },
  {
    title: 'Pay Ease',
    description: 'Comprehensive payroll management platform with automated workflows.',
    tags: ['Next.js', 'GenAI', 'Shadcn/UI']
  }
];

export default function CVPage() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-white text-black p-4 md:p-8 lg:p-12 print:p-0">
      <div className="max-w-4xl mx-auto flex justify-between items-center mb-12 print:hidden pb-8 border-b border-gray-100">
        <Button asChild variant="ghost" className="rounded-xl group hover:bg-gray-50">
          <Link href="/#resume" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to Journey
          </Link>
        </Button>
        <Button onClick={handlePrint} className="rounded-xl bg-black text-white hover:bg-gray-800 flex items-center gap-2">
          <Download className="h-4 w-4" />
          Print / Export PDF
        </Button>
      </div>

      <main className="max-w-4xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b-4 border-black pb-8 leading-tight">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tighter leading-none">
              Romel Jhon<br />Salvaleon
            </h1>
            <p className="text-xl font-bold uppercase tracking-widest text-gray-500">
              Creative Full-Stack Developer
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-sm font-medium">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 opacity-50" />
              <span>romeljhon.work@gmail.com</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 opacity-50" />
              <span>+63 9xx xxx xxxx</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 opacity-50" />
              <span>Cagayan de Oro, PH</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 opacity-50" />
              <span>kazupay-solutions.vercel.app</span>
            </div>
          </div>
        </header>

        <section className="space-y-4">
          <h2 className="text-xl font-black uppercase tracking-widest border-l-4 border-black pl-4">Summary</h2>
          <p className="text-lg leading-relaxed text-gray-700 max-w-4xl">
            Versatile Full-Stack Developer with a background in building large-scale ERP systems and AI-driven applications. Specializing in Next.js, Django, and Cloud architecture, I thrive on turning complex business requirements into seamless, performant digital products.
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-8 space-y-12">
            <section className="space-y-8 text-sm">
              <h2 className="text-xl font-black uppercase tracking-widest border-l-4 border-black pl-4">Experience</h2>
              <div className="space-y-10 border-l border-gray-100 pl-8 ml-1">
                {experience.map((exp, i) => (
                  <div key={i} className="relative">
                    <div className="absolute -left-[33px] top-1.5 w-2 h-2 rounded-full bg-black ring-4 ring-white" />
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold">{exp.role}</h3>
                      <span className="text-[10px] font-bold bg-gray-100 px-3 py-1 rounded-full uppercase tracking-widest">{exp.period}</span>
                    </div>
                    <p className="text-gray-500 font-bold mb-3">{exp.company}</p>
                    <p className="text-gray-700 leading-relaxed italic">{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="md:col-span-4 space-y-12">
            <section className="space-y-6">
              <h2 className="text-lg font-black uppercase tracking-widest border-l-4 border-black pl-4">Technical Toolkit</h2>
              <div className="flex flex-wrap gap-2 text-sm leading-none">
                {['React', 'Next.js', 'Django', 'TypeScript', 'GenAI', 'HTML5', 'CSS3', 'Git', 'Firebase', 'PostgreSQL', 'Tailwind', 'Stripe', 'Node.js'].map(skill => (
                  <Badge key={skill} variant="outline" className="border-black/20 text-black font-bold uppercase text-[9px] tracking-widest py-1 px-3">
                    {skill}
                  </Badge>
                ))}
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="text-lg font-black uppercase tracking-widest border-l-4 border-black pl-4">Education</h2>
              <div>
                <h3 className="font-bold text-md leading-tight">BS in Information Technology</h3>
                <p className="text-gray-500 text-xs font-bold mt-1 uppercase tracking-wider">Phinma COC // 2020 - 2023</p>
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="text-lg font-black uppercase tracking-widest border-l-4 border-black pl-4">Core Projects</h2>
              <div className="space-y-6">
                {selectedProjects.map((project, i) => (
                  <div key={i} className="space-y-2">
                    <h3 className="font-bold text-xs uppercase tracking-tight">{project.title}</h3>
                    <p className="text-[10px] text-gray-500 leading-tight">{project.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {project.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="text-[8px] font-bold text-gray-300 uppercase">#{tag}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>

        <footer className="pt-12 border-t border-gray-100 flex justify-between items-center text-[10px] font-bold uppercase tracking-[0.3em] text-gray-200">
          <span>RJPS // CV Document</span>
          <span>Cagayan de Oro // 2026</span>
        </footer>
      </main>
    </div>
  );
}
