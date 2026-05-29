"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AnimatedGrid } from "@/components/animated-grid";
import { ScrollProgress } from "@/components/scroll-progress";
import { Navigation } from "@/components/navigation";
import { CommandPalette } from "@/components/command-palette";
import { ErrorBoundary } from "@/components/error-boundary";
import { HeroSection } from "@/components/sections/hero";
import { AboutSection } from "@/components/sections/about";
import { ProjectsSection } from "@/components/sections/projects";
import { PhilosophySection } from "@/components/sections/philosophy";
import { SkillsSection } from "@/components/sections/skills";
import { ArchitectureSection } from "@/components/sections/architecture";
import { ExperienceSection } from "@/components/sections/experience";
import { BlogSection } from "@/components/sections/blog";
import { TerminalSection } from "@/components/sections/terminal";
import { ContactSection } from "@/components/sections/contact";
import { FooterSection } from "@/components/sections/footer";

function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="fixed inset-0 z-[200] bg-background flex items-center justify-center"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="text-center"
      >
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center border border-white/10">
          <span className="text-xl font-bold text-gradient">MJ</span>
        </div>
        <div className="h-[2px] bg-white/10 rounded-full w-32 mx-auto overflow-hidden">
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "0%" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="h-full w-full bg-gradient-to-r from-primary to-secondary rounded-full"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [paletteOpen, setPaletteOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("keydown", handleKey);
    };
  }, []);

  return (
    <>
      <AnimatePresence mode="popLayout">
        {loading ? (
          <LoadingScreen key="loader" />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <AnimatedGrid />
            <ScrollProgress />
            <Navigation onOpenPalette={() => setPaletteOpen(true)} />
            <CommandPalette isOpen={paletteOpen} onClose={() => setPaletteOpen(false)} />

            <main id="main-content" className="relative z-10">
              <ErrorBoundary><HeroSection /></ErrorBoundary>
              <ErrorBoundary><AboutSection /></ErrorBoundary>
              <ErrorBoundary><ProjectsSection /></ErrorBoundary>
              <ErrorBoundary><PhilosophySection /></ErrorBoundary>
              <ErrorBoundary><SkillsSection /></ErrorBoundary>
              <ErrorBoundary><ArchitectureSection /></ErrorBoundary>
              <ErrorBoundary><ExperienceSection /></ErrorBoundary>
              <ErrorBoundary><BlogSection /></ErrorBoundary>
              <ErrorBoundary><TerminalSection /></ErrorBoundary>
              <ErrorBoundary><ContactSection /></ErrorBoundary>
            </main>

            <ErrorBoundary><FooterSection /></ErrorBoundary>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
