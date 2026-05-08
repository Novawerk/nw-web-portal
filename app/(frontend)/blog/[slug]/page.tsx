import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { getAllPostSlugs, getPostBySlug, formatDate } from "@/lib/mdx";

export async function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} — NovaWerk`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <article className="pt-20 pb-32 md:pt-32">
      <Container>
        <Reveal>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-3.5" />
            Back to blog
          </Link>
        </Reveal>

        <header className="mt-10 max-w-3xl">
          <Reveal delay={0.05}>
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-muted">
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              {post.tags?.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border px-2.5 py-0.5"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <h1 className="mt-6 font-display text-4xl leading-[1.05] md:text-6xl">
              {post.title}
            </h1>
          </Reveal>
          {post.excerpt && (
            <Reveal delay={0.25}>
              <p className="mt-6 text-lg text-muted md:text-xl">{post.excerpt}</p>
            </Reveal>
          )}
        </header>

        <Reveal delay={0.35}>
          <div className="mx-auto mt-16 max-w-3xl">
            <div className="prose prose-lg prose-stone max-w-none prose-headings:font-display prose-headings:tracking-tight prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-4 prose-h3:text-2xl prose-a:text-foreground prose-a:underline-offset-4 hover:prose-a:text-accent prose-strong:text-foreground prose-blockquote:border-accent prose-blockquote:text-foreground prose-ol:marker:text-muted prose-ul:marker:text-muted prose-code:text-accent prose-code:before:content-none prose-code:after:content-none">
              <MDXRemote source={post.content} />
            </div>
          </div>
        </Reveal>
      </Container>
    </article>
  );
}
