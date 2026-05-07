import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { getAllPosts, formatDate } from "@/lib/mdx";

export const metadata = {
  title: "Blog — NovaWerk",
  description: "Field notes and build logs from the NovaWerk community.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <section className="pt-20 pb-16 md:pt-32">
        <Container>
          <Reveal>
            <span className="text-xs uppercase tracking-[0.2em] text-muted">
              Blog
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-4 font-display text-5xl leading-[0.95] md:text-7xl">
              Notes from the{" "}
              <span className="italic text-accent">workshop</span>.
            </h1>
          </Reveal>
          <Reveal delay={0.25}>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
              Field notes, build logs, and thinking from inside the community.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="pb-32">
        <Container>
          {posts.length === 0 ? (
            <div className="rounded-2xl border border-border bg-card p-10 text-center md:p-16">
              <p className="font-display text-2xl text-muted md:text-3xl">
                No posts yet — check back soon.
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-border border-y border-border">
              {posts.map((post, i) => (
                <Reveal key={post.slug} as="li" delay={i * 0.06}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group flex flex-col gap-4 py-8 transition-colors md:flex-row md:items-baseline md:justify-between md:gap-12"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-muted">
                        <time dateTime={post.date}>{formatDate(post.date)}</time>
                        {post.tags?.map((tag) => (
                          <span key={tag} className="rounded-full border border-border px-2.5 py-0.5">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h2 className="mt-3 font-display text-3xl leading-tight transition-colors group-hover:text-accent md:text-4xl">
                        {post.title}
                      </h2>
                      {post.excerpt && (
                        <p className="mt-3 max-w-2xl text-muted leading-relaxed">
                          {post.excerpt}
                        </p>
                      )}
                    </div>
                    <ArrowUpRight className="size-5 shrink-0 text-muted transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-accent" />
                  </Link>
                </Reveal>
              ))}
            </ul>
          )}
        </Container>
      </section>
    </>
  );
}
