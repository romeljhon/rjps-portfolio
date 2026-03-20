
'use client'

import * as React from 'react';
import { Mail, Github, Globe, Phone, MapPin, Download, ArrowLeft, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

const experience = [
  {
    role: 'Interim Manager & Technical Lead',
    company: 'CyTech International.',
    period: 'Nov 2025 - Present',
    achievements: [
      'Orchestrating cross-functional development teams to deliver high-priority enterprise solutions under tight deadlines.',
      'Developing and implementing strategic technical roadmaps for the engineering department.',
      'Optimizing departmental workflows, resulting in a 20% increase in total project throughput.',
      'Advising executive leadership on technical feasibility and long-term architectural scaling.'
    ]
  },
  {
    role: 'Senior Web Developer',
    company: 'CyTech International.',
    period: 'Dec 2024 - Present',
    achievements: [
      'Architected a high-scale e-commerce platform using microservices, reducing total page load times by 40% globally.',
      'Led the transition to server-side rendering (SSR) for enterprise-level applications, boosting SEO and performance.',
      'Mentored Jr. developers in mastering React and Node.js best practices, increasing team shipping velocity by 25%.',
      'Engineered AI-powered financial auditing modules for custom ERP solutions.'
    ]
  },
  {
    role: 'Jr. Web Developer',
    company: 'CyTech International',
    period: 'Feb 2024 - Dec 2024',
    achievements: [
      'Developed responsive SaaS modules with React/Next.js/Tailwind, ensuring 100% cross-browser compatibility.',
      'Collaborated on RESTful API integrations with Django, slashing backend response times by 15% through query optimization.',
      'Actively contributed to Agile development cycle.'
    ]
  },
  {
    role: 'Intern',
    company: 'CyTech International',
    period: 'Dec 2023 - Feb 2024',
    achievements: [
      'Fixed critical front-end bugs and established initial state management architecture for mid-sized apps.',
      'Learned and applied Python/Django to build first-pass prototypes for client demonstrations.',
      'Authored comprehensive unit tests, improving build stability across the development pipeline.'
    ]
  }
];

const selectedProjects = [
  {
    title: 'Kazupay ERP Solutions',
    description: 'A comprehensive ERP system with AI-powered financial insights and automated payroll.',
    tags: ['Next.js', 'Django']
  },
  {
    title: 'RentSnap',
    description: 'Modern rental marketplace with real-time notifications and filtering.',
    tags: ['Next.js', 'Django']
  },
  {
    title: 'Pay Ease',
    description: 'Comprehensive payroll management platform with automated workflows.',
    tags: ['Next.js', 'GenAI']
  },
  {
    title: 'Project Flow',
    description: 'Project management tool with drag-and-drop task organization.',
    tags: ['Next.js', 'Firebase']
  },
  {
    title: 'FaceID Secure',
    description: 'Biometric authentication system with real-time 3D facial mesh analysis.',
    tags: ['Python', 'OpenCV']
  },
  {
    title: 'CogniText LLM',
    description: 'Sophisticated LLM interface with neural pathway visualization.',
    tags: ['Next.js', 'OpenAI']
  },
  {
    title: 'LotBLK Logistics',
    description: 'Enterprise logistics platform for delivery route optimization.',
    tags: ['Django', 'Mapbox']
  },
  {
    title: 'Aura AI',
    description: 'Personal AI assistant with minimal floating-orb UI.',
    tags: ['Next.js', 'LangChain']
  },
  {
    title: 'PixelQuest Studio',
    description: 'Game development environment bridging retro art with modern shaders.',
    tags: ['C#', 'HLSL']
  },
  {
    title: 'Peak Performance',
    description: 'Luxury fitness tracking application with biometric data analysis.',
    tags: ['React Native', 'Firebase']
  }
];

export default function CVDocument() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-white text-black p-4 md:p-8 lg:p-12 print:p-0 print:m-4">
      <div className="max-w-4xl mx-auto flex justify-between items-center mb-12 print:hidden pb-8 border-b border-gray-100">
        <Button asChild variant="ghost" className="rounded-xl group hover:bg-gray-50">
          <Link href="/#resume" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to Journey
          </Link>
        </Button>
        <Button
          onClick={handlePrint}
          className="rounded-xl bg-black text-white hover:bg-gray-800 flex items-center gap-2 shadow-lg hover:shadow-xl transition-all"
        >
          <Download className="h-4 w-4" />
          Export to PDF
        </Button>
      </div>

      <main className="max-w-4xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000" suppressHydrationWarning>
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b-4 border-black pb-8 leading-tight">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tighter leading-none">
              Romel Jhon<br />Salvaleon
            </h1>
            <p className="text-xl font-bold uppercase tracking-widest text-gray-500">
              Creative Full-Stack Developer
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-3 text-sm font-medium">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 opacity-50" />
              <span>pajojhon@gmail.com</span>
            </div>
            <div className="flex items-center gap-2">
              <Github className="h-4 w-4 opacity-50" />
              <span>github.com/romeljhon</span>
            </div>
            <div className="flex items-center gap-2">
              <Linkedin className="h-4 w-4 opacity-50" />
              <span>linkedin.com/in/romeljhon</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 opacity-50" />
              <span>Cagayan de Oro, PH</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 opacity-50" />
              <span>rjps-work.vercel.app</span>
            </div>
          </div>
        </header>

        <section className="space-y-4">
          <h2 className="text-xl font-black uppercase tracking-widest border-l-4 border-black pl-4">Executive Summary</h2>
          <p className="text-lg leading-relaxed text-gray-700 max-w-4xl font-medium">
            Creative Full-Stack Developer and <span className="text-black font-bold">Interim Technical Manager</span> with <span className="text-black font-bold">2+ years of expertise</span> in architecting high-performance ERP systems and orchestrating engineering teams. Expert in Next.js, Django, and Cloud infrastructure, with a proven track record of <span className="underline decoration-black underline-offset-4 decoration-2 font-bold">reducing latency by 40%</span> and delivering state-of-the-art interactive experiences for global clients.
          </p>
          <div className="flex gap-4 pt-2">
            {['Management Lead', 'Next.js Specialist', 'FinTech Expert', 'UI Core Architect', 'AI Integrations'].map(badge => (
              <span key={badge} className="text-[10px] font-black uppercase bg-black text-white px-3 py-1 tracking-tighter rounded-full">{badge}</span>
            ))}
          </div>
        </section>

        <div className="space-y-16">
          <section className="space-y-8 text-sm">
            <h2 className="text-xl font-black uppercase tracking-widest border-l-4 border-black pl-4">Professional Experience</h2>
            <div className="space-y-12 border-l-2 border-gray-100 pl-8 ml-1">
              {experience.map((exp, i) => (
                <div key={i} className="relative group">
                  <div className="absolute -left-[34px] top-1 w-3 h-3 rounded-full bg-white border-2 border-black group-hover:bg-black transition-colors" />
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-black uppercase leading-none mb-1">{exp.role}</h3>
                      <p className="text-gray-500 font-bold uppercase tracking-tight text-xs">{exp.company}</p>
                    </div>
                    <span className="text-[10px] font-bold bg-black text-white px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">{exp.period}</span>
                  </div>
                  <ul className="space-y-2 text-gray-700">
                    {exp.achievements.map((ach, j) => (
                      <li key={j} className="flex gap-3 leading-relaxed">
                        <span className="text-black font-black">•</span>
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-lg font-black uppercase tracking-widest border-l-4 border-black pl-4">Technical Toolkit</h2>
            <div className="flex flex-wrap gap-2 text-sm leading-none">
              {['React', 'Next.js', 'Django', 'TypeScript', 'GenAI', 'HTML5', 'CSS3', 'Git', 'Firebase', 'PostgreSQL', 'Tailwind', 'Stripe', 'Node.js', 'Docker', 'Cloud Architecture', 'API Design', 'UI/UX'].map(skill => (
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {selectedProjects.map((project, i) => (
                <div key={i} className="space-y-2 group">
                  <h3 className="font-bold text-xs uppercase tracking-tight group-hover:text-primary transition-colors">{project.title}</h3>
                  <p className="text-[10px] text-gray-500 leading-tight line-clamp-2">{project.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-[8px] font-bold text-gray-400 uppercase">#{tag}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <footer className="pt-12 border-t border-gray-100 flex justify-between items-center text-[10px] font-bold uppercase tracking-[0.3em] text-gray-200">
          <span>RJPS // CV Document</span>
          <span>Cagayan de Oro // 2026</span>
        </footer>
      </main>
    </div>
  );
}
