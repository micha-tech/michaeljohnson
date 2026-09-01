"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink, Check, Shield, UserCheck, Brain, ShieldCheck,
  ShoppingCart, Radio, Building2, Store, Users,
} from "lucide-react";
import { GithubIcon } from "@/components/ui/social-icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

const projects = [
  {
    id: "trustpoint",
    title: "TrustPoint",
    tagline: "Trust-Centric Payment Protection & Escrow Infrastructure",
    href: "https://trustpoint-eight.vercel.app/",
    repo: "https://github.com/micha-tech/trustpoint",
    status: "Live",
    icon: Shield,
    color: "from-primary/20 to-primary/5",
    border: "border-primary/20",
    badge: "Fintech · Escrow",
    group: "Fintech",
    description:
      "A trust-centric payment protection and escrow infrastructure platform for freelancers and clients. Enables secure project agreements with protected payment links, virtual-account funding, and automated escrow release.",
    outcomes: [
      "Full payment lifecycle: funding, escrow hold, automated release",
      "HMAC-verified Paystack webhooks with exactly-once processing",
      "Append-only, tamper-evident signed ledger behind every money movement",
      "Job/escrow state machines and admin dispute resolution",
    ],
    workflow: [
      "Freelancer creates a project agreement",
      "Platform generates protected payment link with dedicated virtual account",
      "Client securely funds the project",
      "TrustPoint holds funds in escrow",
      "Freelancer completes the work and submits evidence",
      "Client approves delivery via one-time code",
      "Funds are released automatically",
    ],
    concepts: [
      "Trust Engineering",
      "Escrow Infrastructure",
      "Secure Payment Flows",
      "Event-Driven Architecture",
      "Transaction Lifecycle Management",
      "Payment Orchestration",
      "Idempotency & Webhooks",
      "Tamper-Evident Ledger",
    ],
    tech: ["Next.js", "Paystack", "PostgreSQL", "Prisma", "Firebase Auth", "Webhooks"],
  },
  {
    id: "collab",
    title: "V-One Collab",
    tagline: "AI-Assisted Real-Time Meeting & Collaboration Platform",
    href: "https://collab-three-alpha.vercel.app/",
    repo: "https://github.com/micha-tech/collab",
    status: "Live",
    icon: Radio,
    color: "from-secondary/20 to-secondary/5",
    border: "border-secondary/20",
    badge: "AI · Real-Time",
    group: "AI Platform",
    description:
      "A real-time meeting and collaboration platform with live AI assistance. LiveKit video meetings, collaborative notes, live speech transcription, and an AI meeting-memory engine that extracts decisions, action items, and risks.",
    outcomes: [
      "LiveKit-powered multi-party video with screen share and chat",
      "Live speech-to-text transcription via Web Worker + server API",
      "AI memory engine: embedding-based transcript retrieval and structured meeting memories",
      "Collaborative Yjs notes with Supabase persistence",
    ],
    concepts: [
      "WebRTC / LiveKit",
      "CRDT Collaborative Editing (Yjs)",
      "Speech-to-Text",
      "Embeddings & RAG",
      "Real-Time Sync",
      "Rate Limiting (Upstash Redis)",
      "Observability",
    ],
    tech: ["Next.js", "LiveKit", "Yjs", "Supabase", "OpenAI", "Upstash Redis"],
  },
  {
    id: "retail-logic",
    title: "Retail Logic",
    tagline: "Multi-Tenant Retail & POS Operating System",
    href: "https://retail-management-software.vercel.app/",
    repo: "https://github.com/micha-tech/retail_management_software",
    status: "Live",
    icon: Store,
    color: "from-accent/20 to-accent/5",
    border: "border-accent/20",
    badge: "Retail · POS",
    group: "SaaS Platform",
    description:
      "A multi-tenant, multi-branch retail operating system: point-of-sale, inventory management, and finance. Covers atomic onboarding, RBAC with tenant isolation, physical stock counting with an immutable ledger, and full reporting.",
    outcomes: [
      "Multi-tenant, multi-branch security with RBAC and tenant/branch isolation",
      "Inventory lifecycle: draft → count → review → post with immutable stock ledger",
      "Atomic idempotent POS checkout with discounts and cash management",
      "Sales, product, margin, and discrepancy reports with CSV import/export",
    ],
    concepts: [
      "Multi-Tenancy",
      "RBAC & Authorization",
      "Immutable Inventory Ledger",
      "Point of Sale",
      "Financial Reconciliation",
      "Atomic Transactions",
      "Testing (Vitest/Playwright)",
    ],
    tech: ["Next.js", "Drizzle ORM", "PostgreSQL", "TypeScript", "Zod", "Vitest", "Playwright"],
  },
  {
    id: "vcglone",
    title: "vcglOne",
    tagline: "Full HR SaaS System for Vethan Concepts Group",
    href: "https://vcglone.vercel.app/",
    status: "Live",
    icon: Users,
    color: "from-blue-500/20 to-blue-500/5",
    border: "border-blue-500/20",
    badge: "HR SaaS",
    group: "SaaS Platform",
    description:
      "A full human-resources SaaS platform where employees manage attendance, leave, tasks, and personal information while HR and admins oversee the workforce. Built as an installable web app with work-account authentication and protected areas.",
    outcomes: [
      "Attendance, leave, employee information, tasks, and reports in one place",
      "Work-account email/password authentication with HR-administered access",
      "Installable PWA with offline-ready app shell",
    ],
    concepts: [
      "HR / Workforce Management",
      "Attendance & Leave Workflows",
      "Role & Access Control",
      "Employee Self-Service",
      "Progressive Web App",
      "Reporting",
    ],
    tech: ["Next.js", "TypeScript", "Tailwind", "PWA", "Database-backed"],
  },
  {
    id: "anywork365",
    title: "AnyWork365",
    tagline: "Freelancer & Services Marketplace",
    href: "https://anywork365.ng/",
    repo: "https://github.com/micha-tech/anywork365",
    status: "Live",
    icon: UserCheck,
    color: "from-primary/20 to-primary/5",
    border: "border-primary/20",
    badge: "Marketplace",
    group: "Platform",
    description:
      "A trust-centric freelancer and services marketplace built around identity, reputation, and secure transactions, with a mobile-first experience and connection-pooled database.",
    outcomes: [
      "Identity and reputation systems underpinning marketplace trust",
      "Connection-pooled PostgreSQL for reads under concurrent load",
      "Mobile-first responsive experience across devices",
    ],
    concepts: [
      "Identity & Reputation Systems",
      "Platform Trust Mechanics",
      "Escrow Concepts",
      "Communication Architecture",
      "Mobile-First Design",
      "Scalable Infrastructure",
    ],
    tech: ["Vercel", "Firebase Auth", "Aiven PostgreSQL", "Connection Pooling", "Serverless"],
  },
  {
    id: "house-of-bp",
    title: "House of B&P",
    tagline: "Luxury Menswear E-Commerce Storefront",
    repo: "https://github.com/micha-tech/house_of_bp",
    status: "Live",
    icon: ShoppingCart,
    color: "from-amber-500/20 to-amber-500/5",
    border: "border-amber-500/20",
    badge: "E-Commerce",
    group: "E-Commerce",
    description:
      "A luxury menswear e-commerce platform with collections, product catalogue, cart and checkout, a full Supabase schema with row-level security, and Paystack payment integration.",
    outcomes: [
      "Full Supabase schema: products, variants, customers, orders, RLS policies",
      "Paystack payment init and verification flow",
      "Admin panel, blog, and newsletter signup",
    ],
    concepts: [
      "E-Commerce Architecture",
      "Database Schema Design",
      "Row-Level Security",
      "Payment Integration",
      "Cart & Checkout Flow",
    ],
    tech: ["Next.js", "Supabase", "PostgreSQL", "Paystack", "Zod"],
  },
  {
    id: "clamps-ops",
    title: "Clamps Ops",
    tagline: "Internal Business Operations Platform",
    repo: "https://github.com/micha-tech/clamps_ops",
    status: "Live",
    icon: Building2,
    color: "from-emerald-500/20 to-emerald-500/5",
    border: "border-emerald-500/20",
    badge: "Enterprise",
    group: "Platform",
    description:
      "An employee-only operations platform for an engineering firm: sales, project execution, procurement, inventory, finance, documents, notifications, and audit-controlled administration.",
    outcomes: [
      "Secured app shell with role-based access and protected routes",
      "Supabase-powered storage with signed upload/download flows",
      "Prisma-structured data mapped to database auth",
      "Structured logging and environment validation",
    ],
    concepts: [
      "Enterprise SaaS",
      "Authentication & Authorization",
      "RBAC",
      "File Storage & Signed URLs",
      "Audit-Controlled Admin",
      "Internal Tooling",
    ],
    tech: ["Next.js", "Supabase", "Prisma", "PostgreSQL", "React Hook Form", "Zod"],
  },
  {
    id: "watergate",
    title: "Watergate",
    tagline: "B2B Product Catalogue & Admin CMS",
    repo: "https://github.com/micha-tech/watergate",
    status: "Live",
    icon: ShieldCheck,
    color: "from-cyan-500/20 to-cyan-500/5",
    border: "border-cyan-500/20",
    badge: "B2B · CMS",
    group: "Platform",
    description:
      "A premium B2B catalogue and admin site for a water-utility technology company — public product catalogue with categories, enquiry intake with anti-spam throttling, and a protected admin console.",
    outcomes: [
      "Product catalogue with SEO metadata and categories",
      "Enquiry submission with anti-spam rate limiting",
      "Protected admin: products, categories, enquiries, settings",
    ],
    concepts: [
      "B2B Catalogue",
      "Content Admin (CMS)",
      "Product Data Modeling",
      "Rate Limiting",
      "Server Auth",
    ],
    tech: ["Next.js", "Prisma", "Aiven PostgreSQL", "React Hook Form", "Zod", "bcryptjs"],
  },
  {
    id: "clampsweb",
    title: "Clampsweb",
    tagline: "Corporate Engineering Services Marketing Site",
    repo: "https://github.com/micha-tech/clampsweb",
    status: "Live",
    icon: Building2,
    color: "from-blue-500/20 to-blue-500/5",
    border: "border-blue-500/20",
    badge: "Marketing Site",
    group: "Showcase",
    description:
      "A high-polish corporate marketing site for an engineering-services firm — cinematic hero, services, capabilities, industries, delivery lifecycle, safety commitments, and a request-quote page.",
    outcomes: [
      "Cinematic animated hero and section transitions",
      "Request-quote flow with form handling",
      "Service, capability, and industry breakdowns",
    ],
    concepts: [
      "Front-End Showcase",
      "Motion & Animation",
      "Marketing / Landing",
      "Performance",
    ],
    tech: ["Next.js", "React 19", "Framer Motion", "Tailwind"],
  },
  {
    id: "small-web-ai",
    title: "Web AI",
    tagline: "Streaming AI Chat Application",
    href: "https://small-web-ai.vercel.app/",
    repo: "https://github.com/micha-tech/small-web-ai",
    status: "Live",
    icon: Brain,
    color: "from-fuchsia-500/20 to-fuchsia-500/5",
    border: "border-fuchsia-500/20",
    badge: "AI",
    group: "AI Platform",
    description:
      "A streaming AI chat web app built on the Gemini SDK — multi-turn conversation with streaming responses and a server API route.",
    outcomes: [
      "Multi-turn streaming chat with user/model roles",
      "Server-side API route for AI completions",
    ],
    concepts: [
      "Streaming Responses",
      "LLM Integration",
      "API Route Design",
    ],
    tech: ["Next.js", "React 19", "Google Gemini", "Tailwind"],
  },
  {
    id: "ai-security",
    title: "AI & Security Research",
    tagline: "Engineering & Research Initiative",
    repo: undefined,
    status: "In Development",
    icon: Brain,
    color: "from-accent/20 to-accent/5",
    border: "border-accent/20",
    badge: "Research",
    group: "Research",
    description:
      "Ongoing research into AI-powered fraud prevention, identity systems, IAM, and cybersecurity tooling — ML-assisted trust scoring and computational trust models.",
    outcomes: [
      "Explored ML-assisted trust scoring and fraud detection approaches",
      "Research into IAM, identity systems, and threat modeling",
    ],
    concepts: [
      "AI-Powered Fraud Prevention",
      "Identity & IAM",
      "ML Trust Scoring",
      "Computational Trust Models",
    ],
    tech: ["Machine Learning", "Security Architecture", "Research"],
  },
];

export function ProjectsSection() {
  const { ref, isVisible } = useIntersectionObserver();
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  const selectedProjects = projects.slice(0, 4);

  return (
    <section id="projects" ref={ref} className="section-padding relative">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-sm font-mono text-primary mb-4 tracking-wider uppercase">
            Selected work
          </h2>
          <h3 className="text-3xl sm:text-4xl font-bold mb-4">
            Production systems I&apos;ve <span className="text-gradient">owned end to end</span>
          </h3>
          <p className="text-muted max-w-xl mb-8">
            A representative set of platforms where I led implementation across product
            workflows, data design, integrations, security, and production delivery.
          </p>

          <div className="space-y-6">
            <AnimatePresence mode="wait">
              {selectedProjects.map((project, i) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                >
                  <div
                    className={`glass-card border ${project.border} overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5`}
                  >
                    <div className="p-6 sm:p-8">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                        <div className="flex items-center gap-3">
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${project.color} flex items-center justify-center shrink-0`}>
                            <project.icon className="w-6 h-6 text-foreground" />
                          </div>
                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2 mb-1">
                              <h4 className="text-xl font-bold">{project.title}</h4>
                              <Badge variant="primary" className="text-[10px]">{project.badge}</Badge>
                              {project.status === "Live" && (
                                <Badge variant="accent" className="text-[10px]">
                                  Live
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted">{project.tagline}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0 flex-wrap">
                          {project.repo && (
                            <a
                              href={project.repo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-4 py-2.5 sm:px-3 sm:py-2 text-sm sm:text-xs font-medium rounded-lg border border-border/30 text-muted hover:text-foreground hover:border-border/50 transition-all"
                              aria-label={`${project.title} source code`}
                            >
                              <GithubIcon className="w-3.5 h-3.5 sm:w-3 sm:h-3" />
                              Code
                            </a>
                          )}
                          {project.href ? (
                            <a
                              href={project.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-4 py-2.5 sm:px-3 sm:py-2 text-sm sm:text-xs font-medium rounded-lg border border-border/30 text-muted hover:text-foreground hover:border-border/50 transition-all"
                            >
                              Visit Site
                              <ExternalLink className="w-3.5 h-3.5 sm:w-3 sm:h-3" />
                            </a>
                          ) : null}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setExpandedProject(expandedProject === project.id ? null : project.id)}
                          >
                            {expandedProject === project.id ? "Less" : "Details"}
                          </Button>
                        </div>
                      </div>

                      <p className="text-muted text-sm leading-relaxed mb-6">
                        {project.description}
                      </p>

                      {project.outcomes && (
                        <ul className="space-y-1.5 mb-6">
                          {project.outcomes.map((o) => (
                            <li key={o} className="flex items-start gap-2 text-sm text-muted">
                              <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                              <span>{o}</span>
                            </li>
                          ))}
                        </ul>
                      )}

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
                            <div className="pt-6 border-t border-border/20">
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
