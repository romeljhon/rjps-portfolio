
'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Briefcase, GraduationCap, Code2, Database, Cloud, Brush, BrainCircuit } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';

const experience = [
  {
    role: 'Senior Web Developer',
    company: 'CyTech International.',
    period: 'Dec 2025 - Present',
    description:
      'Designed and deployed a microservices architecture using Contract-Driven Development (CDD) to ensure reliable service integration. Mentored junior developers through code reviews, pair programming, and architectural discussions. Technologies used: React, Node.js, and RESTful APIs',
  },
  {
    role: 'Jr. Web Developer',
    company: 'CyTech International',
    period: 'Feb 2024 - Dec 2024',
    description:
      'Contributed to the development of a  SaaS platform. Built responsive UI components using Vue.js and integrated them with backend services developed in Python/Django. Participated in daily standups, code reviews, ',
  },
  {
    role: 'Intern',
    company: 'CyTech International',
    period: 'Dec 2023 - Feb 2024',
    description:
      'Assisted in developing new features and fixing bugs for a cloud-based SaaS platform. Focused on learning best practices in frontend development with React and gained foundational experience with Python/Django APIs.',
  },
];

const education = [
  {
    degree: 'Bachelor of Science in Information Technology',
    institution: 'Phinma Cagayan De oro Collage',
    period: '2020 - 2023',
    // description: 'Graduated with honors. Focused on algorithms, data structures, and software engineering principles. Active member of the coding club.',
  },
];

const skills = [
  { name: 'JavaScript (ES6+)', icon: <Code2 className="h-5 w-5 text-primary" /> },
  { name: 'TypeScript', icon: <Code2 className="h-5 w-5 text-primary" /> },
  { name: 'React / Next.js', icon: <Code2 className="h-5 w-5 text-primary" /> },
  { name: 'Node.js / Express', icon: <Code2 className="h-5 w-5 text-primary" /> },
  { name: 'Python / Django', icon: <Code2 className="h-5 w-5 text-primary" /> },
  { name: 'PostgreSQL / MongoDB', icon: <Database className="h-5 w-5 text-primary" /> },
  // { name: 'Docker / Kubernetes', icon: <Cloud className="h-5 w-5 text-primary" /> },
  { name: 'Tailwind CSS', icon: <Brush className="h-5 w-5 text-primary" /> },
  // { name: 'GenAI Integration', icon: <BrainCircuit className="h-5 w-5 text-primary" /> },
];

export function Resume() {
    const { ref, inView } = useScrollAnimation();
  return (
    <section id="resume" ref={ref} className={`w-full py-24 md:py-32 bg-background transition-opacity duration-1000 ${inView ? 'animate-fade-in-down' : 'opacity-0'}`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Interactive Resume</h2>
            <p className="max-w-[900px] mx-auto text-muted-foreground md:text-xl/relaxed">
              Explore my professional journey, education, and technical skills.
            </p>
        </div>
        <div className="mx-auto max-w-4xl py-12">
          <Accordion type="single" collapsible defaultValue="item-1" className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-2xl font-bold">
                <div className="flex items-center gap-3">
                  <Briefcase className="h-6 w-6" /> Work Experience
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-8 pt-4 pl-9">
                  {experience.map((exp, index) => (
                    <div key={index} className="space-y-2">
                      <h3 className="font-semibold text-xl">{exp.role}</h3>
                      <p className="font-medium text-primary">{exp.company}</p>
                      <p className="text-sm text-muted-foreground">{exp.period}</p>
                      <p className="pt-1 text-base">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-2xl font-bold">
                <div className="flex items-center gap-3">
                  <GraduationCap className="h-6 w-6" /> Education
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-8 pt-4 pl-9">
                  {education.map((edu, index) => (
                    <div key={index} className="space-y-2">
                      <h3 className="font-semibold text-xl">{edu.degree}</h3>
                      <p className="font-medium text-primary">{edu.institution}</p>
                      <p className="text-sm text-muted-foreground">{edu.period}</p>
                      {/* <p className="pt-1 text-base">{edu.description}</p> */}
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-2xl font-bold">
                <div className="flex items-center gap-3">
                  <Code2 className="h-6 w-6" /> Skills
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 p-4 pl-9 pt-6">
                    {skills.map(skill => (
                        <div key={skill.name} className="flex items-center gap-3">
                            {skill.icon}
                            <span className="font-medium">{skill.name}</span>
                        </div>
                    ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
}
