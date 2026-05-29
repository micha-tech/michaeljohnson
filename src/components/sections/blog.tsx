"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

const articles = [
  {
    title: "Engineering Trust Into Digital Platforms",
    excerpt: "Trust is not a feature — it is an engineering discipline. Exploring how computational trust models, verification systems, and secure infrastructure create trustworthy digital platforms.",
    date: "Coming Soon",
    readTime: "5 min",
    tags: ["Trust Engineering", "Systems Design"],
  },
  {
    title: "Serverless Architecture and Connection Pooling",
    excerpt: "Scaling PostgreSQL connections in serverless environments requires careful architectural decisions. A deep dive into connection pooling strategies for modern web applications.",
    date: "Coming Soon",
    readTime: "7 min",
    tags: ["Architecture", "Database"],
  },
  {
    title: "Designing Escrow Systems for Freelance Commerce",
    excerpt: "The engineering behind trust-centric payment protection: virtual accounts, webhook processing, event-driven state machines, and secure fund release mechanisms.",
    date: "Coming Soon",
    readTime: "6 min",
    tags: ["Fintech", "Payments"],
  },
  {
    title: "Trust Systems as Computational Systems",
    excerpt: "Viewing trust through the lens of computation: reputation algorithms, fraud detection models, and the mathematics of secure multi-party interactions.",
    date: "Coming Soon",
    readTime: "8 min",
    tags: ["Research", "Mathematics"],
  },
  {
    title: "Scaling Modern Web Applications",
    excerpt: "From monolith to distributed systems: patterns for scaling web applications while maintaining reliability, observability, and developer velocity.",
    date: "Coming Soon",
    readTime: "6 min",
    tags: ["Architecture", "Scaling"],
  },
];

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
          <h2 className="text-sm font-mono text-primary mb-4 tracking-wider uppercase">
            Insights
          </h2>
          <h3 className="text-3xl sm:text-4xl font-bold mb-4">
            Thinking in <span className="text-gradient">public</span>
          </h3>
          <p className="text-muted max-w-xl mb-10">
            Articles on engineering, architecture, trust systems, and the infrastructure
            that powers modern digital platforms.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {articles.map((article, i) => (
              <motion.article
                key={article.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="glass-card rounded-xl p-6 hover:border-primary/20 transition-all duration-300 group cursor-pointer"
              >
                <div className="flex items-center gap-3 mb-3 text-[11px] text-muted">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {article.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {article.readTime}
                  </span>
                </div>

                <h4 className="text-base font-semibold mb-2 group-hover:text-primary transition-colors">
                  {article.title}
                </h4>

                <p className="text-sm text-muted leading-relaxed mb-4 line-clamp-3">
                  {article.excerpt}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {article.tags.map((tag) => (
                    <Badge key={tag} variant="default" className="text-[10px]">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center gap-1 text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Read article</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
