'use client';

import * as React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Mail, Facebook, Linkedin, Copy, Check } from 'lucide-react';

export function Contact() {
  const [copied, setCopied] = React.useState(false);
  const email = 'romeljhonsalvaleon@gmail.com';

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); 
  };

  return (
    <section id="contact" className="w-full py-24 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl">Get In Touch</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Have a project in mind or just want to say hello? My inbox is always open.
            </p>
          </div>
        </div>
        <div className="mx-auto w-full max-w-md py-12">
          <Card>
            <CardHeader>
              <CardTitle>Contact Me</CardTitle>
              <CardDescription>You can reach me through these platforms.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="flex items-center justify-between rounded-lg border p-3">
                 <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                    <span className="text-sm font-medium">{email}</span>
                 </div>
                 <Button variant="ghost" size="icon" onClick={handleCopy}>
                    {copied ? <Check className="h-5 w-5 text-green-500" /> : <Copy className="h-5 w-5 text-muted-foreground" />}
                    <span className="sr-only">{copied ? 'Copied' : 'Copy email'}</span>
                 </Button>
               </div>
               <div className="space-y-2">
                 <Link href="https://www.facebook.com/romel.jhon.5/" target="_blank" className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors">
                   <Facebook className="mr-2 h-5 w-5 text-muted-foreground" />
                   <span className="text-sm font-medium hover:text-primary">Facebook</span>
                 </Link>
                 <Link href="https://www.linkedin.com/in/romel-jhon-salvaleon-1b1b1b1b1/" target="_blank" className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors">
                   <Linkedin className="mr-2 h-5 w-5 text-muted-foreground" />
                   <span className="text-sm font-medium hover:text-primary">LinkedIn</span>
                 </Link>
               </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
