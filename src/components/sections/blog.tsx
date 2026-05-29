"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { blogPosts } from "@/content/blog/posts";

export function BlogSection() {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.05 });

  return (
    <section id="blog" ref={ref} className="section-padding relative">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-sm font-mono text-primary mb-4 tracking-wider uppercase">
                Insights
              </h2>
              <h3 className="text-3xl sm:text-4xl font-bold">
                Thinking in <span className="text-gradient">public</span>
              </h3>
            </div>
            <Link
              href="/blog"
              className="hidden sm:inline-flex items-center gap-1 text-sm text-muted hover:text-foreground transition-colors"
            >
              View all
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {blogPosts.map((post, i) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <Link href={`/blog/${post.slug}`}>
                  <article className="glass-card rounded-xl p-6 hover:border-primary/20 transition-all duration-300 group h-full flex flex-col">
                    <div className="flex items-center gap-3 mb-3 text-[11px] text-muted">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </span>
                    </div>

                    <h4 className="text-base font-semibold mb-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h4>

                    <p className="text-sm text-muted leading-relaxed mb-4 flex-1 line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="default" className="text-[10px]">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center gap-1 text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                      <span>Read article</span>
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </article>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1 text-sm text-muted hover:text-foreground transition-colors"
            >
              View all articles
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
