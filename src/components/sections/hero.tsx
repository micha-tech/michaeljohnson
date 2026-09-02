"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import { ExternalLink, MapPin } from "lucide-react";
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
      className="relative min-h-screen flex items-center overflow-hidden pt-28 pb-16"
    >
      <div className="container-wide w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-16 items-center min-h-[650px]"
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
              className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.8rem] xl:text-[7rem] font-bold leading-[0.92] tracking-[-0.06em] mb-8"
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
              workflows to real-time collaboration and multi-tenant SaaS products.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-3 mb-10">
              <Button variant="primary" size="lg" onClick={() => document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })}>
                View selected work
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
              <Button variant="secondary" size="lg" onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}>
                Start a conversation
              </Button>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted">
              <span className="inline-flex items-center gap-1.5"><MapPin className="w-4 h-4" /> Nigeria · UTC+1</span>
              <span>Open to remote senior engineering roles</span>
            </motion.div>
          </div>

          <motion.div
            variants={itemVariants}
            className="relative flex items-center justify-center lg:justify-end self-stretch min-h-[510px]"
          >
            <div className="relative w-full max-w-[520px] h-full min-h-[560px] overflow-hidden bg-card">
              <div className="absolute inset-0 opacity-40 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
              <div className="absolute inset-0 flex items-center justify-center">
                  <Image
                    src="/images/michaeljohnson.png"
                    alt="Michael Johnson"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-center grayscale-[15%] contrast-110"
                  />
              </div>
              <div className="absolute left-6 bottom-6 z-20 border-l-2 border-primary pl-3 text-xs font-mono uppercase tracking-[0.16em] text-foreground/80">
                Systems · Product · Delivery
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
