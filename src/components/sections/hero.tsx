"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowDown, Download, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TypingEffect } from "@/components/typing-effect";
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
      className="relative min-h-screen flex items-center section-padding overflow-hidden"
    >
      <div className="container-wide w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center"
        >
          <div className="relative z-10">
            <motion.div variants={itemVariants} className="mb-6">
              <Badge variant="primary" className="text-xs tracking-wider uppercase">
                Fullstack Software Engineer
              </Badge>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.05] tracking-tight mb-6"
            >
              Engineering{" "}
              <span className="text-gradient">Trust</span>
              <br />
              Into Modern{" "}
              <span className="text-gradient-blue">Digital</span>
              <br />
              Platforms
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-muted leading-relaxed max-w-xl mb-8"
            >
              Fullstack Software Engineer building scalable web applications, trust systems,
              fintech-inspired infrastructure, and AI-powered systems.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-3 mb-10">
              <Button variant="primary" size="lg" onClick={() => document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })}>
                View Projects
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
              <Button variant="secondary" size="lg" onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}>
                Contact Me
              </Button>
              <Button variant="ghost" size="lg">
                Download Resume
                <Download className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-center gap-2 text-sm text-muted">
              <span className="hidden sm:inline">Specializing in</span>
              <TypingEffect />
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
                className="absolute inset-0 rounded-3xl border border-white/10"
              />

              <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-br from-primary/40 via-secondary/20 to-accent/10 opacity-40 blur-sm" />

              <div className="relative w-full h-full rounded-3xl overflow-hidden glass-card">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center p-4">
                  <img
                    src="/images/michaeljohnson.jpeg"
                    alt="Michael Johnson"
                    loading="lazy"
                    className="w-full h-full object-cover rounded-2xl"
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-background/80 to-transparent" />
              </div>

              {["Fullstack", "Trust", "Scale", "Build"].map((word, i) => (
                <motion.div
                  key={word}
                  className="absolute text-xs font-mono text-primary/30"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: [0.2, 0.5, 0.2],
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 4,
                    delay: i * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  style={{
                    top: `${15 + i * 20}%`,
                    right: i % 2 === 0 ? "-20px" : "auto",
                    left: i % 2 === 1 ? "-20px" : "auto",
                  }}
                >
                  {word}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <ArrowDown className="w-5 h-5 text-muted" />
      </motion.div>
    </section>
  );
}
