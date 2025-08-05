
import { blogPosts } from '@/components/blog';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="bg-background min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
          <Button asChild variant="outline">
            <Link href="/#blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Portfolio
            </Link>
          </Button>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8 md:px-6 md:py-12">
        <article className="prose prose-invert mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">{post.title}</h1>
          <p className="text-muted-foreground">{post.date}</p>
          <Image
            src={post.image}
            alt={post.title}
            width={800}
            height={450}
            className="my-8 rounded-lg object-cover"
            data-ai-hint={post.dataAiHint}
          />
          <div className="space-y-4 text-lg text-foreground">
            <p>{post.description}</p>
            <p>
              This is a placeholder for the full blog post content. In a real application, you would fetch this content
              from a CMS or a markdown file. For now, we're just showing the description again.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
              ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
              fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
              deserunt mollit anim id est laborum.
            </p>
          </div>
        </article>
      </main>
    </div>
  );
}
