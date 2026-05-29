"use client";

import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import {
  Globe, Server, Cloud, Shield, Brain, Code2, Database, Lock,
  Network, Workflow, Cpu, Blocks, Box, CheckSquare, Users, Zap,
} from "lucide-react";

const skillGroups = [
  {
    title: "Frontend",
    icon: Globe,
    color: "from-blue-500/20 to-blue-500/5",
    skills: [
      { name: "Next.js", level: 95, icon: Code2 },
      { name: "React", level: 95, icon: Code2 },
      { name: "TypeScript", level: 90, icon: Code2 },
      { name: "TailwindCSS", level: 90, icon: Zap },
      { name: "Framer Motion", level: 85, icon: Zap },
    ],
  },
  {
    title: "Backend",
    icon: Server,
    color: "from-purple-500/20 to-purple-500/5",
    skills: [
      { name: "Node.js", level: 90, icon: Server },
      { name: "PostgreSQL", level: 85, icon: Database },
      { name: "Auth Systems", level: 85, icon: Lock },
      { name: "API Architecture", level: 90, icon: Network },
      { name: "Event-Driven Systems", level: 80, icon: Workflow },
    ],
  },
  {
    title: "Infrastructure",
    icon: Cloud,
    color: "from-emerald-500/20 to-emerald-500/5",
    skills: [
      { name: "Vercel", level: 90, icon: Cloud },
      { name: "Aiven", level: 80, icon: Database },
      { name: "CI/CD", level: 85, icon: Workflow },
      { name: "Deployment Pipelines", level: 85, icon: Box },
      { name: "Scaling Concepts", level: 80, icon: Cpu },
    ],
  },
  {
    title: "Security & Systems",
    icon: Shield,
    color: "from-rose-500/20 to-rose-500/5",
    skills: [
      { name: "Trust Systems", level: 90, icon: Shield },
      { name: "IAM Concepts", level: 80, icon: Users },
      { name: "Fraud Prevention", level: 85, icon: Shield },
      { name: "Secure Payment Flows", level: 85, icon: Lock },
      { name: "System Architecture", level: 90, icon: Blocks },
      { name: "Application Security", level: 85, icon: Lock },
      { name: "Threat Modeling", level: 80, icon: Shield },
    ],
  },
  {
    title: "AI & Research",
    icon: Brain,
    color: "from-amber-500/20 to-amber-500/5",
    skills: [
      { name: "ML Concepts", level: 75, icon: Brain },
      { name: "AI-Assisted Systems", level: 80, icon: Cpu },
      { name: "Detection Systems", level: 75, icon: CheckSquare },
      { name: "Computational Thinking", level: 90, icon: Brain },
    ],
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
            Full-stack. Deep. <span className="text-gradient">Production-ready.</span>
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
                <div className="space-y-3">
                  {group.skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-muted">{skill.name}</span>
                        <span className="text-[10px] font-mono text-muted">{skill.level}%</span>
                      </div>
                      <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={isVisible ? { width: `${skill.level}%` } : {}}
                          transition={{ duration: 0.8, delay: gi * 0.1 + 0.3, ease: "easeOut" }}
                          className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                        />
                      </div>
                    </div>
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
