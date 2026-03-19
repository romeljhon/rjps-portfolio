
'use client'
import Link from "next/link"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { blogPosts } from "@/lib/blog-data"

import { motion } from 'framer-motion';
 
const RESPONSIVE_SIZES = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw";

export function Blog() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="blog" className="w-full py-32">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-4 text-center mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            Latest <span className="text-gradient">Insights</span>
          </h2>
          <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl">
            Exploring the frontiers of web development and design through my personal lens.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {blogPosts.map((post) => (
            <motion.div key={post.title} variants={itemVariants}>
              <Card className="group flex flex-col h-full glass-card overflow-hidden border-white/5 hover:translate-y-[-8px] transition-all duration-500">
                <CardHeader className="p-0 relative aspect-[16/10] overflow-hidden">
                  <Link href={`/blog/${post.slug}`} className="block w-full h-full relative">
                    <Image
                      sizes={RESPONSIVE_SIZES}
                      src={post.image}
                      fill
                      priority={blogPosts.indexOf(post) === 0}
                      alt={post.title}
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background to-transparent opacity-60" />
                  </Link>
                </CardHeader>
                <CardContent className="p-6 space-y-3 flex-grow">
                  <div className="flex items-center gap-3 text-xs text-primary font-semibold uppercase tracking-widest">
                    <span className="w-8 h-[1px] bg-primary/30" />
                    {post.date}
                  </div>
                  <CardTitle className="text-xl font-bold leading-tight group-hover:text-primary transition-colors">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </CardTitle>
                  <CardDescription className="text-muted-foreground line-clamp-2 leading-relaxed">
                    {post.description}
                  </CardDescription>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <Button asChild variant="link" className="p-0 h-auto font-bold text-primary group-hover:translate-x-2 transition-transform">
                    <Link href={`/blog/${post.slug}`} className="flex items-center gap-2">
                      Read Entire Post <span className="text-lg">→</span>
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-20 text-center">
          <Button asChild size="lg" variant="outline" className="rounded-full glass border-white/10 px-10">
            <Link href="/blog">View All Articles</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
