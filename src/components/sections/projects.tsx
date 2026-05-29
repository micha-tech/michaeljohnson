"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Check, Shield, UserCheck, Brain, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

const projects = [
  {
    id: "trustpoint",
    title: "TrustPoint",
    tagline: "Trust-Centric Payment Protection & Escrow Infrastructure",
    icon: Shield,
    color: "from-primary/20 to-primary/5",
    border: "border-primary/20",
    badge: "Fintech Infrastructure",
    description:
      "A trust-centric payment protection and escrow infrastructure platform designed for freelancers and clients. TrustPoint enables secure project agreements with protected payment links, virtual account funding, and automated escrow release workflows.",
    workflow: [
      "Freelancer creates a project agreement",
      "Platform generates protected payment link with dedicated virtual account",
      "Client securely funds the project",
      "TrustPoint securely holds funds in escrow",
      "Freelancer completes the work",
      "Client approves delivery",
      "Funds are released automatically",
    ],
    concepts: [
      "Trust Engineering",
      "Escrow Infrastructure",
      "Secure Payment Flows",
      "Event-Driven Architecture",
      "Transaction Lifecycle Management",
      "Payment Orchestration",
      "Fraud Reduction Mechanisms",
      "Serverless Backend",
    ],
    tech: ["Next.js", "Paystack", "Webhooks", "Virtual Accounts", "Serverless"],
  },
  {
    id: "anywork365",
    title: "AnyWork365",
    tagline: "Trust-Centric Freelancer & Services Marketplace",
    icon: UserCheck,
    color: "from-secondary/20 to-secondary/5",
    border: "border-secondary/20",
    badge: "Platform Engineering",
    description:
      "A trust-centric freelancer and services marketplace platform focused on identity and reputation systems, platform trust mechanics, and scalable marketplace infrastructure with mobile-first design.",
    concepts: [
      "Identity & Reputation Systems",
      "Platform Trust Mechanics",
      "Escrow Concepts",
      "Communication Architecture",
      "Mobile-First Marketplace Design",
      "Gamification of Trust",
      "Scalable Infrastructure",
    ],
    tech: ["Vercel", "Firebase Auth", "Aiven PostgreSQL", "Connection Pooling", "Serverless"],
  },
  {
    id: "ai-security",
    title: "AI & Security Research",
    tagline: "Forward-Looking Engineering & Research Initiative",
    icon: Brain,
    color: "from-accent/20 to-accent/5",
    border: "border-accent/20",
    badge: "Research & Development",
    description:
      "An advanced engineering research initiative exploring AI-powered fraud prevention, identity systems, IAM, cybersecurity tooling, and ML-assisted trust scoring with applications in Nigerian fintech and drone-based AI detection systems.",
    concepts: [
      "AI-Powered Fraud Prevention",
      "Identity & IAM Systems",
      "Cybersecurity Tooling",
      "ML-Assisted Trust Scoring",
      "Nigerian Fintech Applications",
      "Drone-Based AI Detection",
      "Computational Trust Models",
    ],
    tech: ["Machine Learning", "Python", "Computer Vision", "Security Architecture", "Research"],
  },
  {
    id: "appsec",
    title: "Application Security Framework",
    tagline: "Security Engineering & Architecture Framework",
    icon: ShieldCheck,
    color: "from-rose-500/20 to-rose-500/5",
    border: "border-rose-500/20",
    badge: "Security Engineering",
    description:
      "A comprehensive application security framework encompassing threat modeling, secure development lifecycle practices, CSP implementation, dependency auditing, and production-grade security hardening patterns for modern web applications.",
    concepts: [
      "Threat Modeling (STRIDE/LINDDUN)",
      "Secure Development Lifecycle",
      "Content Security Policy Architecture",
      "Dependency Auditing & SBOM",
      "OWASP Top 10 Mitigation",
      "Zero Trust Architecture Patterns",
      "Security Headers & Hardening",
      "Incident Response Planning",
    ],
    tech: ["Next.js", "Security Headers", "CSP", "ZAP", "SonarQube", "Snyk"],
  },
];

const filters = ["All", "Fintech", "Platform", "Security", "Research"];

export function ProjectsSection() {
  const { ref, isVisible } = useIntersectionObserver();
  const [activeFilter, setActiveFilter] = useState("All");
  const [expandedProject, setExpandedProject] = useState<string | null>(null);

  const filtered = activeFilter === "All"
    ? projects
    : projects.filter((p) => {
        if (activeFilter === "Fintech") return p.id === "trustpoint";
        if (activeFilter === "Platform") return p.id === "anywork365";
        if (activeFilter === "Security") return p.id === "appsec";
        if (activeFilter === "Research") return p.id === "ai-security";
        return true;
      });

  return (
    <section id="projects" ref={ref} className="section-padding relative">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-sm font-mono text-primary mb-4 tracking-wider uppercase">
            Featured Projects
          </h2>
          <h3 className="text-3xl sm:text-4xl font-bold mb-4">
            Building systems that{" "}
            <span className="text-gradient">engineer trust</span>
          </h3>
          <p className="text-muted max-w-xl mb-8">
            Production-grade platforms and research initiatives at the intersection of
            fintech, trust infrastructure, and AI-powered systems.
          </p>

          <div className="flex gap-2 mb-10 flex-wrap">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-4 py-2 rounded-lg text-sm transition-all duration-200 ${
                  activeFilter === f
                    ? "bg-primary/10 text-primary border border-primary/20"
                    : "text-muted hover:text-foreground border border-transparent hover:border-white/10"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="space-y-6">
            <AnimatePresence mode="wait">
              {filtered.map((project, i) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <div
                    className={`glass-card rounded-2xl border ${project.border} overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5`}
                  >
                    <div className="p-6 sm:p-8">
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center gap-3">
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${project.color} flex items-center justify-center`}>
                            <project.icon className="w-6 h-6 text-foreground" />
                          </div>
                          <div>
                            <div className="flex items-center gap-3 mb-1">
                              <h4 className="text-xl font-bold">{project.title}</h4>
                              <Badge variant="primary" className="text-[10px]">{project.badge}</Badge>
                            </div>
                            <p className="text-sm text-muted">{project.tagline}</p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setExpandedProject(expandedProject === project.id ? null : project.id)}
                        >
                          {expandedProject === project.id ? "Less" : "Details"}
                        </Button>
                      </div>

                      <p className="text-muted text-sm leading-relaxed mb-6">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tech.map((t) => (
                          <Badge key={t} variant="default" className="text-[11px]">
                            {t}
                          </Badge>
                        ))}
                      </div>

                      <AnimatePresence>
                        {expandedProject === project.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="pt-6 border-t border-white/5">
                              {"workflow" in project && project.workflow && (
                                <div className="mb-6">
                                  <h5 className="text-sm font-semibold mb-3">Core Workflow</h5>
                                  <div className="grid sm:grid-cols-2 gap-2">
                                    {project.workflow.map((step, si) => (
                                      <div key={si} className="flex items-start gap-2 text-sm text-muted">
                                        <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                                        <span>{step}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                              <div>
                                <h5 className="text-sm font-semibold mb-3">Engineering Concepts</h5>
                                <div className="flex flex-wrap gap-2">
                                  {project.concepts.map((c) => (
                                    <Badge key={c} variant="secondary" className="text-[11px]">
                                      {c}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
