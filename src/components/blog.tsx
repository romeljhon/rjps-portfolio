
'use client'
import Link from "next/link"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

export const blogPosts = [
  {
    title: "The Power of Server Components in Next.js 14",
    description: "A deep dive into how Next.js Server Components are changing the way we build React applications, improving performance and developer experience.",
    date: "March 15, 2024",
    slug: "server-components-nextjs-14",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=600&h=400&fit=crop",
    dataAiHint: "server components",
  },
  {
    title: "Styling with Tailwind CSS: A Practical Guide",
    description: "Discover utility-first CSS and how Tailwind can dramatically speed up your styling workflow while maintaining a consistent design system.",
    date: "February 28, 2024",
    slug: "styling-with-tailwind-css",
    image: "https://images.unsplash.com/photo-1555099962-4199c345e546?q=80&w=600&h=400&fit=crop",
    dataAiHint: "abstract design",
  },
  {
    title: "Getting Started with Generative AI in Web Apps",
    description: "An introduction to integrating large language models (LLMs) into your web projects using modern frameworks and APIs.",
    date: "January 10, 2024",
    slug: "getting-started-generative-ai",
    image: "https://images.unsplash.com/photo-1677756119517-756a188d2d94?q=80&w=600&h=400&fit=crop",
    dataAiHint: "artificial intelligence",
  },
]

export function Blog() {
  const { ref, inView } = useScrollAnimation();
  return (
    <section id="blog" ref={ref} className={`w-full py-24 md:py-32 bg-background transition-opacity duration-1000 ${inView ? 'animate-fade-in-down' : 'opacity-0'}`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Development Blog</h2>
            <p className="max-w-[900px] mx-auto text-muted-foreground md:text-xl/relaxed">
              Sharing my thoughts on technology, web development, and everything in between.
            </p>
        </div>
        <div className="mx-auto grid max-w-5xl items-start gap-8 py-12 sm:grid-cols-2 md:gap-12 lg:max-w-none lg:grid-cols-3">
          {blogPosts.map((post) => (
            <Card key={post.title} className="group flex flex-col h-full overflow-hidden rounded-lg transition-all duration-300 hover:shadow-xl bg-card border">
                <CardHeader className="p-0">
                  <Link href={`/blog/${post.slug}`} className="block overflow-hidden">
                    <Image
                      src={post.image}
                      width={600}
                      height={400}
                      alt={post.title}
                      className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      data-ai-hint={post.dataAiHint}
                    />
                  </Link>
                </CardHeader>
                <CardContent className="p-6 space-y-2 flex-grow">
                  <p className="text-sm text-muted-foreground">{post.date}</p>
                  <CardTitle className="text-xl font-bold leading-snug group-hover:text-primary transition-colors">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </CardTitle>
                  <CardDescription className="pt-2">{post.description}</CardDescription>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                    <Button asChild variant="link" className="p-0 h-auto font-semibold">
                        <Link href={`/blog/${post.slug}`}>Read More &rarr;</Link>
                    </Button>
                </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
