"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ScrollProgress } from "@/components/scroll-progress";
import { Navigation } from "@/components/navigation";
import { CommandPalette } from "@/components/command-palette";
import { ErrorBoundary } from "@/components/error-boundary";
import { HeroSection } from "@/components/sections/hero";
import { AboutSection } from "@/components/sections/about";
import { ProjectsSection } from "@/components/sections/projects";
import { SkillsSection } from "@/components/sections/skills";
import { ContactSection } from "@/components/sections/contact";
import { FooterSection } from "@/components/sections/footer";

export default function Home() {
  const [paletteOpen, setPaletteOpen] = useState(false);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      window.removeEventListener("keydown", handleKey);
    };
  }, []);

  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
            <ScrollProgress />
            <Navigation onOpenPalette={() => setPaletteOpen(true)} />
            <CommandPalette isOpen={paletteOpen} onClose={() => setPaletteOpen(false)} />

            <main id="main-content" className="relative z-10">
              <ErrorBoundary><HeroSection /></ErrorBoundary>
              <ErrorBoundary><AboutSection /></ErrorBoundary>
              <ErrorBoundary><ProjectsSection /></ErrorBoundary>
              <ErrorBoundary><SkillsSection /></ErrorBoundary>
              <ErrorBoundary><ContactSection /></ErrorBoundary>
            </main>

            <ErrorBoundary><FooterSection /></ErrorBoundary>
      </motion.div>
    </>
  );
}
