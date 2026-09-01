"use client";

import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import {
  Globe, Server, Cloud, Shield, Brain,
} from "lucide-react";

const skillGroups = [
  {
    title: "Frontend",
    icon: Globe,
    color: "from-blue-500/20 to-blue-500/5",
    skills: ["Next.js", "React", "TypeScript", "TailwindCSS", "Framer Motion"],
  },
  {
    title: "Backend",
    icon: Server,
    color: "from-purple-500/20 to-purple-500/5",
    skills: ["Node.js", "PostgreSQL", "Auth & IAM", "API Architecture", "Event-Driven Systems"],
  },
  {
    title: "Infrastructure",
    icon: Cloud,
    color: "from-emerald-500/20 to-emerald-500/5",
    skills: ["Vercel", "Aiven", "CI/CD", "Deployment Pipelines", "Scaling & Reliability"],
  },
  {
    title: "Security & Systems",
    icon: Shield,
    color: "from-rose-500/20 to-rose-500/5",
    skills: [
      "Escrow & Trust Systems",
      "Security Architecture",
      "Fraud Prevention",
      "Secure Payment Flows",
      "System Architecture",
      "Application Security",
      "Threat Modeling",
    ],
  },
  {
    title: "Product & Delivery",
    icon: Brain,
    color: "from-amber-500/20 to-amber-500/5",
    skills: ["Technical Discovery", "System Design", "Testing Strategy", "Performance & Reliability"],
  },
];

export function SkillsSection() {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.05 });

  return (
    <section id="skills" ref={ref} className="section-padding relative">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-sm font-mono text-primary mb-4 tracking-wider uppercase">
            Technical Skills
          </h2>
          <h3 className="text-3xl sm:text-4xl font-bold mb-8">
            Technical range, with a focus on <span className="text-gradient">practical delivery.</span>
          </h3>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {skillGroups.map((group, gi) => (
              <motion.div
                key={group.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: gi * 0.1 }}
                className="glass-card rounded-xl p-5"
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${group.color} flex items-center justify-center`}>
                    <group.icon className="w-4 h-4 text-foreground" />
                  </div>
                  <h4 className="text-sm font-semibold">{group.title}</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs px-2.5 py-1 rounded-lg bg-foreground/5 text-muted border border-border/20"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
