'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Mail, Facebook, Linkedin } from 'lucide-react';

export function Contact() {
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
               <Button asChild className="w-full" variant="outline">
                 <Link href="mailto:romeljhonsalvaleon@gmail.com" target="_blank">
                   <Mail className="mr-2 h-5 w-5" />
                   Gmail
                 </Link>
               </Button>
               <Button asChild className="w-full" variant="outline">
                 <Link href="https://www.facebook.com/romel.jhon.5/" target="_blank">
                   <Facebook className="mr-2 h-5 w-5" />
                   Facebook
                 </Link>
               </Button>
               <Button asChild className="w-full" variant="outline">
                 <Link href="https://www.linkedin.com/in/romel-jhon-salvaleon-1b1b1b1b1/" target="_blank">
                   <Linkedin className="mr-2 h-5 w-5" />
                   LinkedIn
                 </Link>
               </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
