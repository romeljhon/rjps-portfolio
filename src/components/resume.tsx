
'use client'

import { Briefcase, GraduationCap, Code2, Database, Brush } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';

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
  { name: 'JavaScript (ES6+)', icon: <Code2 className="h-5 w-5 text-primary" /> },
  { name: 'TypeScript', icon: <Code2 className="h-5 w-5 text-primary" /> },
  { name: 'React / Next.js', icon: <Code2 className="h-5 w-5 text-primary" /> },
  { name: 'Node.js / Express', icon: <Code2 className="h-5 w-5 text-primary" /> },
  { name: 'Python / Django', icon: <Code2 className="h-5 w-5 text-primary" /> },
  { name: 'PostgreSQL / MongoDB', icon: <Database className="h-5 w-5 text-primary" /> },
  { name: 'Tailwind CSS', icon: <Brush className="h-5 w-5 text-primary" /> },
];

export function Resume() {
    const { ref, inView } = useScrollAnimation();
  return (
    <section id="resume" ref={ref} className={`w-full py-24 md:py-32 bg-background transition-opacity duration-1000 ${inView ? 'animate-fade-in-down' : 'opacity-0'}`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">My Journey</h2>
            <p className="max-w-[900px] mx-auto text-muted-foreground md:text-xl/relaxed">
              Explore my professional journey, education, and technical skills in a timeline format.
            </p>
        </div>
        <div className="mx-auto max-w-4xl py-12 space-y-16">
          <div>
              <h3 className="text-2xl font-bold mb-8 flex items-center gap-3"><Briefcase className="h-6 w-6" /> Work Experience</h3>
              <div className="relative border-l-2 border-primary/20 pl-6 space-y-10">
                  {experience.map((exp, index) => (
                      <div key={index} className="relative">
                          <div className="absolute -left-[34px] top-1.5 h-4 w-4 rounded-full bg-primary border-2 border-background"></div>
                          <div className="space-y-1">
                              <h4 className="font-semibold text-xl">{exp.role}</h4>
                              <p className="font-medium text-primary">{exp.company}</p>
                              <p className="text-sm text-muted-foreground">{exp.period}</p>
                              <p className="pt-2 text-base">{exp.description}</p>
                          </div>
                      </div>
                  ))}
              </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-3"><GraduationCap className="h-6 w-6" /> Education</h3>
              <div className="relative border-l-2 border-primary/20 pl-6 space-y-10">
                  {education.map((edu, index) => (
                      <div key={index} className="relative">
                           <div className="absolute -left-[34px] top-1.5 h-4 w-4 rounded-full bg-primary border-2 border-background"></div>
                          <div className="space-y-1">
                              <h4 className="font-semibold text-xl">{edu.degree}</h4>
                              <p className="font-medium text-primary">{edu.institution}</p>
                              <p className="text-sm text-muted-foreground">{edu.period}</p>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-3"><Code2 className="h-6 w-6" /> Skills</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 p-4">
                {skills.map(skill => (
                    <div key={skill.name} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                        {skill.icon}
                        <span className="font-medium">{skill.name}</span>
                    </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
