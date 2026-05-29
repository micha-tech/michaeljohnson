import Link from "next/link";
import { Metadata } from "next";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import { blogPosts } from "@/content/blog/posts";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Articles on engineering, architecture, trust systems, and the infrastructure that powers modern digital platforms.",
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container-wide py-20 sm:py-28">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm text-muted hover:text-foreground transition-colors mb-12"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>

        <header className="mb-16">
          <h1 className="text-sm font-mono text-primary mb-4 tracking-wider uppercase">
            Insights
          </h1>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Thinking in <span className="text-gradient">public</span>
          </h2>
          <p className="text-muted text-lg max-w-xl leading-relaxed">
            Articles on engineering, architecture, trust systems, and the infrastructure
            that powers modern digital platforms.
          </p>
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <article className="glass-card rounded-xl p-6 hover:border-primary/20 transition-all duration-300 group h-full flex flex-col">
                <div className="flex items-center gap-3 mb-3 text-xs text-muted">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                  </span>
                </div>

                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>

                <p className="text-sm text-muted leading-relaxed mb-4 flex-1 line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="flex flex-wrap gap-1.5 mt-auto">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-medium bg-white/5 text-muted border border-white/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
