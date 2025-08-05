
import { blogPosts } from '@/lib/blog-data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const getPostContent = (slug: string) => {
    switch (slug) {
      case 'server-components-nextjs-14':
        return (
          <>
            <p>
              Server Components are a paradigm shift in how we think about building web applications with React. Unlike traditional client-side components, Server Components execute on the server, generating HTML that is sent directly to the browser. This dramatically reduces the amount of JavaScript that needs to be downloaded and parsed, leading to significantly faster initial page loads and a better user experience, especially on slower networks or less powerful devices.
            </p>
            <h3 className="text-2xl font-bold pt-4">Why is this important?</h3>
            <p>
              By moving rendering logic to the server, we can pre-fetch data and render components in an environment that is close to our data sources. This eliminates the need for client-side data fetching waterfalls, which often slow down applications. The result is a seamless experience where the content is available almost instantly. Furthermore, Server Components can securely access server-side resources like databases or internal APIs without exposing sensitive keys to the client.
            </p>
          </>
        );
      case 'styling-with-tailwind-css':
        return (
          <>
            <p>
              Tailwind CSS has gained immense popularity for its utility-first approach. Instead of writing custom CSS classes, you build designs directly in your HTML by applying pre-existing utility classes. This might seem counterintuitive at first, but it leads to a highly efficient workflow. You no longer need to switch between your markup and stylesheets, and you avoid the common problem of bloated, hard-to-maintain CSS files.
            </p>
            <h3 className="text-2xl font-bold pt-4">The Benefits of a Utility-First Workflow</h3>
            <p>
              With Tailwind, you can rapidly prototype and build custom designs without ever leaving your HTML. The constraints of a design system are built-in, which helps maintain visual consistency across your entire application. Because you're using a standard set of utilities, a new developer can jump into a project and understand the styling without having to decipher custom CSS class names. It's a game-changer for team collaboration and long-term project maintainability.
            </p>
          </>
        );
      case 'getting-started-generative-ai':
        return (
          <>
            <p>
              Generative AI is no longer a futuristic concept; it's a tool that developers can integrate into their applications today. By leveraging powerful Large Language Models (LLMs) through APIs, you can add intelligent features like natural language understanding, text generation, and content summarization to your projects. This opens up a world of possibilities for creating more dynamic, interactive, and personalized user experiences.
            </p>
            <h3 className="text-2xl font-bold pt-4">Practical First Steps</h3>
            <p>
              Getting started is easier than you might think. Frameworks like Genkit provide a streamlined way to connect to models like Gemini. You can start by building a simple feature, such as an AI-powered chatbot or a tool that generates project descriptions based on a URL. The key is to start small, experiment with different prompts, and gradually build more complex functionalities as you become more comfortable with the technology.
            </p>
          </>
        );
      default:
        return <p>This is a placeholder for the full blog post content. In a real application, you would fetch this content from a CMS or a markdown file.</p>;
    }
  };

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
            <p className="font-semibold text-xl">{post.description}</p>
            {getPostContent(post.slug)}
          </div>
        </article>
      </main>
    </div>
  );
}
