"use client";

import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { Briefcase, Code2, Shield, Cpu, Blocks, Workflow, Brain } from "lucide-react";

const experiences = [
  {
    role: "Platform Engineer & Systems Architect",
    period: "Present",
    icon: Cpu,
    description:
      "Designing and building scalable platform infrastructure, trust systems, and fintech-inspired architectures. Focused on production-grade engineering, event-driven systems, and security-first design patterns.",
    highlights: [
      "Platform architecture & infrastructure design",
      "Trust & escrow system engineering",
      "Scalable backend & API design",
      "Production deployment & monitoring",
    ],
  },
  {
    role: "Fullstack Engineer — TrustPoint",
    period: "Featured Project",
    icon: Shield,
    description:
      "Built a trust-centric payment protection and escrow platform. Architected the full payment lifecycle with virtual accounts, webhook processing, and secure fund release mechanisms.",
    highlights: [
      "Escrow infrastructure & payment orchestration",
      "Virtual account integration & webhook processing",
      "Event-driven transaction lifecycle",
      "Serverless backend architecture",
    ],
  },
  {
    role: "Marketplace Engineer — AnyWork365",
    period: "Featured Project",
    icon: Blocks,
    description:
      "Developed a trust-centric freelancer marketplace with identity systems, reputation mechanics, and mobile-first design. Implemented scalable infrastructure with connection pooling and serverless deployment.",
    highlights: [
      "Identity & reputation system design",
      "Mobile-first marketplace architecture",
      "PostgreSQL connection pooling & scaling",
      "Serverless deployment strategy",
    ],
  },
  {
    role: "Security & AI Researcher",
    period: "Ongoing",
    icon: Brain,
    description:
      "Exploring AI-powered fraud prevention, identity systems, IAM, and cybersecurity tooling. Researching ML-assisted trust scoring and computational approaches to digital trust.",
    highlights: [
      "AI-assisted fraud detection research",
      "Identity & IAM system exploration",
      "ML trust scoring models",
      "Computational trust frameworks",
    ],
  },
];

export function ExperienceSection() {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.05 });

  return (
    <section id="experience" ref={ref} className="section-padding relative">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-sm font-mono text-primary mb-4 tracking-wider uppercase">
            Experience
          </h2>
          <h3 className="text-3xl sm:text-4xl font-bold mb-8">
            Engineering <span className="text-gradient">journey</span>
          </h3>

          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-secondary/30 to-transparent hidden sm:block" />

            <div className="space-y-6">
              {experiences.map((exp, i) => (
                <motion.div
                  key={exp.role}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="relative pl-0 sm:pl-16"
                >
                  <div className="hidden sm:flex absolute left-4 top-6 -translate-x-1/2 w-5 h-5 rounded-full bg-background border-2 border-primary/30 items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>

                  <div className="glass-card rounded-xl p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <exp.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="text-base font-semibold">{exp.role}</h4>
                        <span className="text-xs text-muted font-mono">{exp.period}</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted leading-relaxed mb-4">{exp.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {exp.highlights.map((h) => (
                        <span
                          key={h}
                          className="text-[11px] px-2.5 py-1 rounded-md bg-white/5 text-muted border border-white/5"
                        >
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
