"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import { Download, ExternalLink, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

export function HeroSection() {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2 });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-[760px] flex items-center section-padding overflow-hidden"
    >
      <div className="container-wide w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center"
        >
          <div className="relative z-10">
            <motion.div variants={itemVariants} className="mb-6 flex flex-wrap items-center gap-2">
              <Badge variant="primary" className="text-xs tracking-wider uppercase">
                Senior Full-Stack Engineer
              </Badge>
              <Badge variant="secondary" className="text-xs tracking-wider uppercase">
                Remote-ready · UTC+1
              </Badge>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.05] tracking-tight mb-6"
            >
              Building reliable
              <br />
              software for
              <br />
              <span className="text-gradient">complex businesses.</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-muted leading-relaxed max-w-xl mb-8"
            >
              I design and ship secure, scalable web platforms—from payment and marketplace
              workflows to real-time collaboration and multi-tenant SaaS.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-3 mb-10">
              <Button variant="primary" size="lg" onClick={() => document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })}>
                View selected work
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
              <Button variant="secondary" size="lg" onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}>
                Start a conversation
              </Button>
              <a
                href="/resume/resume.pdf"
                download
                className="inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50 h-12 px-8 text-base text-muted hover:text-foreground hover:bg-foreground/5"
              >
                Download Resume
                <Download className="w-4 h-4 ml-2" />
              </a>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted">
              <span className="inline-flex items-center gap-1.5"><MapPin className="w-4 h-4" /> Nigeria · UTC+1</span>
              <span>Open to remote senior engineering roles</span>
            </motion.div>
          </div>

          <motion.div
            variants={itemVariants}
            className="relative flex items-center justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-md aspect-[3/4]">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/5 rounded-3xl blur-3xl animate-pulse" />
              <div className="absolute inset-2 bg-gradient-to-tr from-primary/10 via-secondary/5 to-transparent rounded-3xl" />

              <motion.div
                animate={{
                  boxShadow: [
                    "0 0 0 0 rgba(96, 165, 250, 0.3)",
                    "0 0 0 20px rgba(96, 165, 250, 0)",
                    "0 0 0 0 rgba(96, 165, 250, 0)",
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 rounded-3xl border border-border/30"
              />

              <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-br from-primary/40 via-secondary/20 to-accent/10 opacity-40 blur-sm" />

              <div className="relative w-full h-full rounded-3xl overflow-hidden glass-card">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center p-4">
                  <Image
                    src="/images/michaeljohnson.png"
                    alt="Michael Johnson"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover rounded-2xl"
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-background/80 to-transparent" />
              </div>

            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
