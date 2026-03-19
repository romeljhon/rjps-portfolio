'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Code2, Sparkles, CreditCard, Layout } from 'lucide-react';

const services = [
  {
    title: 'Full-Stack Engineering',
    description: 'Specializing in high-performance, scalable web architecture using the Next.js and Django ecosystem. Building robust backends for complex business logic.',
    icon: <Code2 className="h-8 w-8 text-primary" />,
    capabilities: ['Next.js 15+', 'Django Rest Framework', 'PostgreSQL', 'Cloud Architecture'],
    color: 'from-blue-500/10 to-transparent'
  },
  {
    title: 'AI & Intelligent Systems',
    description: 'Transforming businesses with GenAI and Large Language Models. Implementing RAG architectures and automated AI agents for smarter workflows.',
    icon: <Sparkles className="h-8 w-8 text-primary" />,
    capabilities: ['GenAI Integration', 'Custom LLM Agents', 'Automation', 'Semantic Search'],
    color: 'from-purple-500/10 to-transparent'
  },
  {
    title: 'FinTech & ERP Design',
    description: 'Architecting secure payment systems and comprehensive ERP solutions. Focused on automated payroll, tax logic, and real-time financial tracking.',
    icon: <CreditCard className="h-8 w-8 text-primary" />,
    capabilities: ['Stripe Integration', 'Payroll Automation', 'Financial Analytics', 'Secure Ledgers'],
    color: 'from-emerald-500/10 to-transparent'
  },
  {
    title: 'Product & UI Experience',
    description: 'Crafting premium, high-conversion digital experiences. Combining motion design with functional UX to build products that feel alive.',
    icon: <Layout className="h-8 w-8 text-primary" />,
    capabilities: ['Framer Motion', 'Modern UI Patterns', 'Prototyping', 'Design Systems'],
    color: 'from-orange-500/10 to-transparent'
  }
];

export function Services() {
  return (
    <section id="services" className="w-full py-32 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-6 mb-20 md:w-2/3"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-[10px] font-black uppercase tracking-widest text-primary w-fit">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Capabilities
          </div>
          <h2 className="text-4xl font-black tracking-tight sm:text-6xl md:text-7xl uppercase italic leading-none">
            Architecting <br /><span className="text-gradient">Digital Solutions</span>
          </h2>
          <p className="max-w-[600px] text-muted-foreground text-xl font-sans opacity-70 leading-relaxed">
            I bridge the gap between complex engineering requirements and elegant, high-impact user experiences.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className={`group relative glass-card p-10 rounded-[2.5rem] border border-white/5 hover:border-primary/30 transition-all duration-700 h-full flex flex-col overflow-hidden bg-gradient-to-b ${service.color}`}
            >
              <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none" />
              
              <div className="mb-10 p-4 rounded-2xl glass w-fit group-hover:scale-110 group-hover:bg-primary/10 transition-all duration-500">
                {service.icon}
              </div>

              <h3 className="text-2xl font-black uppercase tracking-tighter mb-4 group-hover:text-primary transition-colors duration-500">
                {service.title}
              </h3>

              <p className="text-muted-foreground/60 text-sm leading-relaxed mb-10 flex-1">
                {service.description}
              </p>

              <div className="space-y-3 pt-6 border-t border-white/5">
                {service.capabilities.map(cap => (
                  <div key={cap} className="flex items-center gap-2">
                    <div className="h-1 w-1 rounded-full bg-primary/40" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/40 group-hover:text-muted-foreground transition-colors">{cap}</span>
                  </div>
                ))}
              </div>
              
              <div className="absolute -bottom-10 -right-10 h-32 w-32 bg-primary/5 blur-3xl group-hover:bg-primary/20 transition-all duration-1000" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
