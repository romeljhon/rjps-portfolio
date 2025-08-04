import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Briefcase, GraduationCap, Code2, Database, Cloud, Brush, BrainCircuit } from 'lucide-react';

const experience = [
  {
    role: 'Senior Full Stack Developer',
    company: 'Tech Solutions Inc.',
    period: 'Jan 2020 - Present',
    description: 'Lead development of enterprise-level web applications. Architected and implemented microservices, optimized database performance, and mentored junior developers. Key technologies: React, Node.js, Kubernetes, AWS.',
  },
  {
    role: 'Software Engineer',
    company: 'Innovate Co.',
    period: 'Jun 2017 - Dec 2019',
    description: 'Developed and maintained features for a SaaS platform. Worked across the full stack, from UI components in Vue.js to RESTful APIs in Python/Django.',
  },
];

const education = [
  {
    degree: 'B.S. in Computer Science',
    institution: 'University of Technology',
    period: '2013 - 2017',
    description: 'Graduated with honors. Focused on algorithms, data structures, and software engineering principles. Active member of the coding club.',
  },
];

const skills = [
  { name: 'JavaScript (ES6+)', icon: <Code2 className="h-5 w-5 text-primary" /> },
  { name: 'TypeScript', icon: <Code2 className="h-5 w-5 text-primary" /> },
  { name: 'React / Next.js', icon: <Code2 className="h-5 w-5 text-primary" /> },
  { name: 'Node.js / Express', icon: <Code2 className="h-5 w-5 text-primary" /> },
  { name: 'Python / Django', icon: <Code2 className="h-5 w-5 text-primary" /> },
  { name: 'PostgreSQL / MongoDB', icon: <Database className="h-5 w-5 text-primary" /> },
  { name: 'Docker / Kubernetes', icon: <Cloud className="h-5 w-5 text-primary" /> },
  { name: 'Tailwind CSS', icon: <Brush className="h-5 w-5 text-primary" /> },
  { name: 'GenAI Integration', icon: <BrainCircuit className="h-5 w-5 text-primary" /> },
];

export function Resume() {
  return (
    <section id="resume" className="w-full py-24 md:py-32 bg-background">
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
                      <p className="pt-1 text-base">{edu.description}</p>
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
