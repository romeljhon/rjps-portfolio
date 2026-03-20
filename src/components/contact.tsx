'use client';

import * as React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Mail, Facebook, Linkedin, Copy, Check } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';

import { motion } from 'framer-motion';

export function Contact() {
  const [mounted, setMounted] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  const email = 'pajojhon@gmail.com';

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!mounted) {
    return <section id="contact" className="w-full py-32" />;
  }

  return (
    <section id="contact" className="w-full py-32">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center space-y-6 text-center mb-12"
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            Let&apos;s <span className="text-gradient">Connect</span>
          </h2>
          <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed">
            I&apos;m currently open to new opportunities. Whether you have a question or just want to say hi, I&apos;ll get back to you!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto w-full max-w-xl"
        >
          <Card className="glass-card border-white/5 overflow-hidden">
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-2xl font-bold">Contact Details</CardTitle>
              <CardDescription>Reach out through any of these channels</CardDescription>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <div className="flex items-center justify-between glass-card p-4 rounded-xl border-white/5 group hover:border-primary/30 transition-all">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Email Address</p>
                    <p className="font-semibold">{email}</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={handleCopy} className="rounded-full hover:bg-white/5">
                  {copied ? <Check className="h-5 w-5 text-green-500" /> : <Copy className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />}
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link href="https://www.facebook.com/romel.jhon.p.salvaleon" target="_blank">
                  <div className="flex items-center gap-4 p-4 glass-card rounded-xl border-white/5 hover:border-blue-500/30 transition-all group">
                    <div className="p-3 rounded-lg bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors">
                      <Facebook className="h-6 w-6 text-blue-500" />
                    </div>
                    <span className="font-semibold">Facebook</span>
                  </div>
                </Link>
                <Link href="https://www.linkedin.com/in/romel-jhon-pacala-salvaleon-08765a292/" target="_blank">
                  <div className="flex items-center gap-4 p-4 glass-card rounded-xl border-white/5 hover:border-blue-400/30 transition-all group">
                    <div className="p-3 rounded-lg bg-blue-400/10 group-hover:bg-blue-400/20 transition-colors">
                      <Linkedin className="h-6 w-6 text-blue-400" />
                    </div>
                    <span className="font-semibold">LinkedIn</span>
                  </div>
                </Link>
              </div>

              <div className="pt-4 text-center">
                <Button asChild size="lg" className="w-full rounded-xl bg-primary hover:bg-primary/90">
                  <Link href={`mailto:${email}`}>Send me a direct message</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
