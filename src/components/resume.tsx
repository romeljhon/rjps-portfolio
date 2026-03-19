
'use client'

import { Briefcase, GraduationCap, Code2, Database, Brush, Sparkles, Flame, CreditCard, Zap, Download, FileCode, GitBranch } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import Link from 'next/link';

const experience = [
  {
    role: 'Senior Web Developer',
    company: 'CyTech International.',
    period: 'Dec 2025 - Present',
    description:
      'Led the architecture and development of a scalable e-commerce platform using a microservices-based approach with Node.js and React. Optimized application performance, reducing page load times by 40% through code splitting and server-side rendering. Mentored a team of four junior developers, fostering their growth in modern web technologies and best practices.',
  },
  {
    role: 'Jr. Web Developer',
    company: 'CyTech International',
    period: 'Feb 2024 - Dec 2024',
    description:
      'Developed and maintained responsive user interfaces for a client-facing SaaS application using Vue.js and Tailwind CSS. Collaborated with backend developers to integrate RESTful APIs, and contributed to the design and implementation of new features. Actively participated in an Agile development process, including daily stand-ups, sprint planning, and code reviews.',
  },
  {
    role: 'Intern',
    company: 'CyTech International',
    period: 'Dec 2023 - Feb 2024',
    description:
      'Gained hands-on experience by assisting the development team in fixing bugs and implementing minor features on a large-scale web application. Developed a solid foundation in React and state management, and learned to work with Python/Django APIs under the guidance of senior developers. Contributed to improving code quality by writing unit tests.',
  },
];

const education = [
  {
    degree: 'Bachelor of Science in Information Technology',
    institution: 'Phinma Cagayan De oro Collage',
    period: '2020 - 2023',
  },
];

const skills = [
  { name: 'React / Next.js', icon: <Code2 className="h-5 w-5 text-primary" /> },
  { name: 'TypeScript', icon: <Code2 className="h-5 w-5 text-primary" /> },
  { name: 'Python / Django', icon: <Code2 className="h-5 w-5 text-primary" /> },
  { name: 'GenAI & LLMs', icon: <Sparkles className="h-5 w-5 text-primary" /> },
  { name: 'HTML5 & CSS3', icon: <FileCode className="h-5 w-5 text-primary" /> },
  { name: 'Firebase & Real-time', icon: <Flame className="h-5 w-5 text-primary" /> },
  { name: 'PostgreSQL / SQL', icon: <Database className="h-5 w-5 text-primary" /> },
  { name: 'Stripe & Fintech', icon: <CreditCard className="h-5 w-5 text-primary" /> },
  { name: 'Tailwind & Shadcn', icon: <Brush className="h-5 w-5 text-primary" /> },
  { name: 'Git & Collaboration', icon: <GitBranch className="h-5 w-5 text-primary" /> },
  { name: 'Framer & Animation', icon: <Zap className="h-5 w-5 text-primary" /> },
];

import { motion } from 'framer-motion';

export function Resume() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <section id="resume" className="w-full py-32">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-4 text-center mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            My <span className="text-gradient">Journey</span>
          </h2>
          <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl">
            Professional experience, education, and the skills I&apos;ve mastered along the way.
          </p>
          <div className="pt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild variant="outline" size="lg" className="rounded-2xl glass border-primary/20 hover:bg-primary/10 group transition-all duration-300">
              <a href="/cv.pdf" download className="flex items-center gap-2">
                <Download className="h-5 w-5 group-hover:translate-y-1 transition-transform" />
                Download CV
              </a>
            </Button>
            <Button asChild variant="ghost" size="lg" className="rounded-2xl border border-white/5 hover:border-primary/20 transition-all duration-300">
              <Link href="/cv" className="flex items-center gap-2">
                Generate CV <span className="text-xl">↗</span>
              </Link>
            </Button>
          </div>
        </motion.div>

        <div className="mx-auto max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-12">
            <div>
              <h3 className="text-2xl font-bold mb-8 flex items-center gap-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
                Experience
              </h3>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="relative border-l-2 border-primary/20 ml-4 pl-8 space-y-12"
              >
                {experience.map((exp, index) => (
                  <motion.div key={index} variants={itemVariants} className="relative">
                    <div className="absolute -left-[41px] top-1.5 h-5 w-5 rounded-full bg-primary shadow-[0_0_10px_rgba(124,58,237,0.5)] border-4 border-background"></div>
                    <div className="space-y-2 p-6 glass-card rounded-2xl border-white/5 hover:border-primary/20 transition-all">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <h4 className="font-bold text-xl">{exp.role}</h4>
                        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 uppercase tracking-wider">
                          {exp.period}
                        </span>
                      </div>
                      <p className="font-medium text-primary/80">{exp.company}</p>
                      <p className="text-muted-foreground text-sm leading-relaxed">{exp.description}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>

          <div className="space-y-12">
            <div>
              <h3 className="text-2xl font-bold mb-8 flex items-center gap-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <GraduationCap className="h-6 w-6 text-primary" />
                </div>
                Education
              </h3>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="relative border-l-2 border-primary/20 ml-4 pl-8 space-y-12"
              >
                {education.map((edu, index) => (
                  <motion.div key={index} variants={itemVariants} className="relative">
                    <div className="absolute -left-[41px] top-1.5 h-5 w-5 rounded-full bg-primary shadow-[0_0_10px_rgba(124,58,237,0.5)] border-4 border-background"></div>
                    <div className="space-y-2 p-6 glass-card rounded-2xl border-white/5">
                      <h4 className="font-bold text-xl">{edu.degree}</h4>
                      <p className="font-medium text-primary/80">{edu.institution}</p>
                      <p className="text-sm text-muted-foreground">{edu.period}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-8 flex items-center gap-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Code2 className="h-6 w-6 text-primary" />
                </div>
                Technical Toolkit
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center gap-3 p-4 rounded-xl glass-card border-white/5 group hover:border-primary/50 transition-all"
                  >
                    <div className="group-hover:scale-110 transition-transform duration-300">
                      {skill.icon}
                    </div>
                    <span className="font-medium text-sm">{skill.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
