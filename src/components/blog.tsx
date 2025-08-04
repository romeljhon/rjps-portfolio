import Link from "next/link"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const blogPosts = [
  {
    title: "The Power of Server Components in Next.js 14",
    description: "A deep dive into how Next.js Server Components are changing the way we build React applications, improving performance and developer experience.",
    date: "March 15, 2024",
    slug: "#",
    image: "https://placehold.co/600x400.png",
    dataAiHint: "server components",
  },
  {
    title: "Styling with Tailwind CSS: A Practical Guide",
    description: "Discover utility-first CSS and how Tailwind can dramatically speed up your styling workflow while maintaining a consistent design system.",
    date: "February 28, 2024",
    slug: "#",
    image: "https://placehold.co/600x400.png",
    dataAiHint: "abstract design",
  },
  {
    title: "Getting Started with Generative AI in Web Apps",
    description: "An introduction to integrating large language models (LLMs) into your web projects using modern frameworks and APIs.",
    date: "January 10, 2024",
    slug: "#",
    image: "https://placehold.co/600x400.png",
    dataAiHint: "artificial intelligence",
  },
]

export function Blog() {
  return (
    <section id="blog" className="w-full py-24 md:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl">Development Blog</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Sharing my thoughts on technology, web development, and everything in between.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-start gap-8 py-12 sm:grid-cols-2 md:gap-12 lg:max-w-none lg:grid-cols-3">
          {blogPosts.map((post) => (
            <Card key={post.title} className="group flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-card">
                <CardHeader className="p-0">
                  <Link href={post.slug}>
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
                  <CardTitle className="font-headline text-xl leading-snug group-hover:text-primary transition-colors">
                    <Link href={post.slug}>{post.title}</Link>
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">{post.date}</p>
                  <CardDescription className="pt-2">{post.description}</CardDescription>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                    <Button asChild variant="link" className="p-0 h-auto">
                        <Link href={post.slug}>Read More &rarr;</Link>
                    </Button>
                </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
