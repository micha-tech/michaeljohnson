"use client";

import { useState } from "react";
import Image from "next/image";
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
    problem: "Freelance agreements, approvals, evidence, and payment decisions were scattered across chat threads and informal records. That made scope drift, non-payment, premature release, and dispute resolution difficult to control.",
    engineering: "Modelled the engagement as explicit project, milestone, funding, evidence, approval, dispute, and release states. Money-adjacent events pass through idempotent handlers and an append-only signed ledger so retries cannot silently create a second outcome.",
    challenge: "Preserving a defensible chronology while handling delayed callbacks, duplicated events, partial failures, competing actions, and administrator intervention without corrupting the transaction lifecycle.",
    utility: "Gives both parties one verifiable operating record: what was agreed, what was funded, what was delivered, who approved it, and why funds became releasable.",
    description:
      "A trust-centric payment protection and escrow infrastructure platform for freelancers and clients. Enables secure project agreements with protected payment links, virtual-account funding, and automated escrow release.",
    outcomes: [
      "Full payment lifecycle: funding, escrow hold, automated release",
      "HMAC-verified webhooks with idempotent processing",
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
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Zod", "Webhooks", "Signed ledgers"],
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
    problem: "Remote meetings lose decisions in conversation, fragment notes across participants, and leave teams reconstructing actions after the call. Real-time media, shared state, transcription, and memory also fail in very different ways.",
    engineering: "Separated the media plane, collaborative document state, transcription pipeline, and meeting-memory pipeline. Web workers isolate continuous speech processing; CRDT-backed notes resolve concurrent edits; transcript chunks are indexed for semantic retrieval and converted into structured decisions, risks, and actions.",
    challenge: "Keeping the interface responsive while coordinating participant presence, media state, concurrent notes, partial transcripts, reconnects, permissions, and asynchronous AI work without allowing one subsystem to stall the meeting.",
    utility: "Turns a live conversation into a durable workspace with video, shared notes, searchable context, decisions, risks, and accountable follow-up in one flow.",
    description:
      "A real-time meeting and collaboration platform combining multi-party video, shared notes, live transcription, and a meeting-memory engine that extracts decisions, action items, and risks.",
    outcomes: [
      "Multi-party WebRTC video with screen share and chat",
      "Live speech-to-text transcription via Web Worker + server API",
      "AI memory engine: embedding-based transcript retrieval and structured meeting memories",
      "Collaborative Yjs notes with durable datastore persistence",
    ],
    concepts: [
      "Real-Time Media Architecture",
      "CRDT Collaborative Editing (Yjs)",
      "Speech-to-Text",
      "Embeddings & RAG",
      "Real-Time Sync",
      "Rate Limiting & Backpressure",
      "Observability",
    ],
    tech: ["Next.js", "TypeScript", "WebRTC", "Yjs / CRDTs", "Web Workers", "Vector retrieval", "Redis"],
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
    problem: "Retail teams often reconcile sales, stock, expenses, staff activity, and branch performance across disconnected spreadsheets. That produces stock drift, weak accountability, and reports that cannot be traced back to operational events.",
    engineering: "Designed tenant and branch boundaries into authorization and every data access path. Checkout is atomic and idempotent; inventory moves through draft, count, review, and posting states; an immutable stock ledger keeps each adjustment, transfer, sale, and discrepancy explainable.",
    challenge: "Maintaining quantity and financial consistency across concurrent checkout, stock counts, transfers, discounts, cash movements, imports, and corrections while ensuring users only see the branches and actions their role permits.",
    utility: "Creates a single operating picture for tills, inventory, margins, discrepancies, people, and branches, with reports backed by traceable source events.",
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
    problem: "Attendance, leave, employee records, tasks, and approvals were handled as separate administrative activities, making workforce status difficult to see and routine requests expensive to coordinate.",
    engineering: "Built a protected employee and administrator workspace around role-aware routes, workflow states, server-validated forms, reporting views, and an installable application shell for consistent access across devices.",
    challenge: "Balancing employee self-service with HR control, keeping sensitive workforce data scoped correctly, and making multi-step attendance and leave workflows understandable on small screens.",
    utility: "Moves recurring workforce administration into a shared system where employees can act directly and HR can review exceptions, records, and operational status.",
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
    problem: "Local service discovery is fragmented: customers struggle to assess providers, while skilled workers lack a structured channel for reputation, enquiries, bookings, communication, and payment-linked work.",
    engineering: "Designed provider discovery, profile and reputation data, messaging, booking states, and transaction-linked workflows around a mobile-first application. Read-heavy paths use pooled database connections and deliberate query shapes to remain stable under concurrent serverless traffic.",
    challenge: "Connecting identity, trust signals, location-aware discovery, conversations, bookings, and status changes without letting inconsistent state undermine confidence between customer and provider.",
    utility: "Creates a practical marketplace journey from finding and comparing a provider through agreement, booking, communication, delivery, and reputation.",
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
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Authentication", "Connection pooling", "Serverless architecture"],
  },
  {
    id: "clamps-ops",
    title: "Clamps Ops",
    tagline: "Internal business operations platform",
    href: "https://clamps-ops.vercel.app/login?next=%2Fapp%2Fdashboard",
    repo: "https://github.com/micha-tech/clamps_ops",
    status: "Live",
    icon: Building2,
    color: "from-emerald-500/20 to-emerald-500/5",
    border: "border-emerald-500/20",
    badge: "Enterprise",
    group: "Platform",
    problem: "Operational work across sales, project execution, procurement, inventory, finance, and documents was difficult to coordinate when every team maintained a separate view of the business.",
    engineering: "Built a secured application shell with role-scoped modules, shared domain records, structured forms, signed document flows, server-side validation, and traceable administrative actions.",
    challenge: "Representing cross-department workflows without creating a monolith of tightly coupled screens, while protecting documents and ensuring each role sees the correct operational boundary.",
    utility: "Provides one internal control surface for moving work from commercial intake through execution, procurement, inventory, finance, and audit.",
    description: "An employee-only operations platform for an engineering firm covering sales, project execution, procurement, inventory, finance, documents, notifications, and controlled administration.",
    outcomes: [
      "Protected workspaces with role-based access",
      "Signed upload and download flows for operational documents",
      "Structured data, logging, and environment validation",
    ],
    concepts: ["Enterprise SaaS", "RBAC", "Internal Tooling", "Auditability"],
    tech: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Zod", "Signed file access"],
  },
  {
    id: "educe",
    title: "Educe Studio",
    tagline: "Creative studio portfolio and services site",
    href: "https://educe-zeta.vercel.app/",
    status: "Live",
    icon: Building2,
    color: "from-orange-500/20 to-orange-500/5",
    border: "border-orange-500/20",
    badge: "Creative Platform",
    group: "Showcase",
    preview: "desktop",
    problem: "A multidisciplinary creative studio needed one coherent digital identity for photography, cinematography, music, and event coverage without flattening the work into a conventional gallery template.",
    engineering: "Created a cinematic long-form interface with distinct visual worlds, responsive art direction, semantic section navigation, controlled motion, layered typography, and image loading tuned around large editorial assets.",
    challenge: "Preserving composition, pacing, contrast, and narrative continuity across very different viewport shapes while preventing animation and high-resolution media from degrading usability or performance.",
    utility: "Lets prospective clients understand the studio's point of view, explore its disciplines and selected work, and move naturally from emotional impact to a project enquiry.",
    description: "An editorial studio site for cinematography, photography, music, and visual coverage, with immersive storytelling, selected work, and studio enquiries.",
    outcomes: ["Motion-led responsive storytelling", "Service and portfolio sections", "Accessible navigation and contact flow"],
    concepts: ["Creative Direction", "Responsive UI", "Motion Design", "Content Architecture"],
    tech: ["Next.js", "React", "Tailwind", "Framer Motion"],
  },
  {
    id: "educemusic",
    title: "Educe Music",
    tagline: "Music production and recording studio site",
    href: "https://educemusic.vercel.app/",
    status: "Live",
    icon: Radio,
    color: "from-fuchsia-500/20 to-fuchsia-500/5",
    border: "border-fuchsia-500/20",
    badge: "Music Studio",
    group: "Showcase",
    preview: "desktop",
    problem: "The music arm needed its own focused journey through recording, production, mixing, mastering, and performance while remaining visibly connected to the wider Educe brand.",
    engineering: "Built a chapter-based experience with responsive editorial layouts, reusable scene components, progressive media loading, accessible controls, persistent navigation, and clear pathways into services and booking.",
    challenge: "Making a long, expressive page feel intentional rather than heavy: synchronizing visual rhythm, typography, media, motion, and navigation without losing keyboard access or mobile clarity.",
    utility: "Translates an abstract creative service into an understandable process, helping artists see how an idea moves from first signal to finished release.",
    description: "A dedicated Educe music studio experience covering recording, production, mixing, mastering, performance, services, and booking enquiries.",
    outcomes: ["Service-led studio presentation", "Selected work and process storytelling", "Responsive navigation across a long-form page"],
    concepts: ["Music Production", "Service Design", "Long-form Storytelling", "Responsive UI"],
    tech: ["Next.js", "React", "Tailwind", "Framer Motion"],
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
      "A luxury menswear e-commerce platform with collections, product catalogue, cart and checkout, a relational commerce schema with row-level access controls, and a verified payment workflow.",
    outcomes: [
      "Relational schema for products, variants, customers, orders, and row-level policies",
      "Idempotent payment initialization and server-side verification flow",
      "Admin panel, blog, and newsletter signup",
    ],
    concepts: [
      "E-Commerce Architecture",
      "Database Schema Design",
      "Row-Level Security",
      "Payment Integration",
      "Cart & Checkout Flow",
    ],
    tech: ["Next.js", "PostgreSQL", "Row-Level Security", "Payment APIs", "Zod"],
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
    tech: ["Next.js", "Prisma", "PostgreSQL", "React Hook Form", "Zod", "bcryptjs"],
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
  const selectedProjects = projects.filter((project) =>
    ["trustpoint", "collab", "retail-logic", "vcglone", "anywork365", "clamps-ops", "educe", "educemusic"].includes(project.id)
  );

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

          <div className="space-y-10">
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
                    className={`glass-card rounded-3xl border ${project.border} overflow-hidden ${"preview" in project && project.preview === "desktop" ? "block" : `grid ${i % 2 === 1 ? "lg:grid-cols-[minmax(0,1fr)_340px]" : "lg:grid-cols-[340px_minmax(0,1fr)]"}`} transition-all duration-300 hover:shadow-xl hover:shadow-primary/10`}
                  >
                    <figure className={`relative flex flex-col items-center justify-center gap-4 sm:gap-6 overflow-hidden bg-gradient-to-br ${project.color} ${"preview" in project && project.preview === "desktop" ? "px-4 sm:px-8 py-8 border-b" : `px-5 sm:px-7 py-6 sm:py-10 border-b lg:border-b-0 lg:border-r ${i % 2 === 1 ? "lg:order-2 lg:border-r-0 lg:border-l" : ""}`} border-white/5`}>
                      <span aria-hidden="true" className="absolute top-6 left-6 text-xs font-mono tracking-[0.2em] text-muted">0{i + 1}</span>
                      {"preview" in project && project.preview === "desktop" ? (
                        <div className="w-full max-w-5xl rounded-xl border border-white/15 bg-[#111113] p-2 shadow-[0_30px_80px_-24px_rgba(0,0,0,0.75)] transition-transform duration-500 motion-safe:hover:-translate-y-1">
                          <div aria-hidden="true" className="h-7 px-2 flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-400/70" /><span className="w-2.5 h-2.5 rounded-full bg-amber-300/70" /><span className="w-2.5 h-2.5 rounded-full bg-emerald-400/70" /></div>
                          <div className="relative aspect-[16/10] overflow-hidden rounded-md bg-black">
                            <Image src={`/images/projects/${project.id}.png`} alt={`${project.title} desktop website preview`} fill loading="eager" sizes="(max-width: 1280px) 90vw, 1024px" className="object-cover object-top" />
                          </div>
                        </div>
                      ) : (
                        <div className="relative w-full max-w-[180px] sm:max-w-[238px] rounded-[2.5rem] border border-white/25 bg-[#111113] p-[7px] shadow-[0_24px_50px_-12px_rgba(0,0,0,0.65)] transition-transform duration-500 motion-safe:hover:-translate-y-2">
                          <div aria-hidden="true" className="h-6 flex items-center justify-center"><span className="h-1.5 w-12 rounded-full bg-white/15" /></div>
                          <div className="relative aspect-[390/844] overflow-hidden rounded-[1.65rem] bg-white">
                            <Image src={`/images/projects/${project.id}.png`} alt={`${project.title} mobile ${project.id === "vcglone" ? "sign-in screen" : project.id === "collab" ? "group call" : "app preview"}`} fill loading="eager" sizes="(max-width: 640px) 166px, 224px" className="object-cover object-top" />
                          </div>
                          <div aria-hidden="true" className="h-5 flex items-center justify-center"><span className="h-1 w-16 rounded-full bg-white/35" /></div>
                        </div>
                      )}
                      <figcaption className="text-[10px] text-muted uppercase tracking-[0.18em] text-center">
                        {"preview" in project && project.preview === "desktop" ? "Desktop experience" : project.id === "vcglone" ? "Workforce portal · Sign in" : project.id === "collab" ? "Video collaboration · Group call" : "Mobile experience"}
                      </figcaption>
                    </figure>
                    <div className={`p-6 sm:p-8 ${"preview" in project && project.preview === "desktop" ? "max-w-6xl mx-auto" : ""}`}>
                      <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-4 mb-6">
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
                            aria-expanded={expandedProject === project.id}
                            onClick={() => setExpandedProject(expandedProject === project.id ? null : project.id)}
                          >
                            {expandedProject === project.id ? "Less" : "Details"}
                          </Button>
                        </div>
                      </div>

                      <p className="text-muted text-sm leading-relaxed mb-6 max-w-4xl">
                        {project.description}
                      </p>

                      {"problem" in project && "engineering" in project && "challenge" in project && "utility" in project && (
                        <div className="grid md:grid-cols-2 gap-px bg-white/10 border border-white/10 rounded-2xl overflow-hidden mb-7">
                          {[
                            ["The problem", project.problem],
                            ["Engineering approach", project.engineering],
                            ["The hard part", project.challenge],
                            ["Delivered utility", project.utility],
                          ].map(([label, copy]) => (
                            <div key={label} className="bg-card/90 p-5 sm:p-6">
                              <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-primary mb-2">{label}</p>
                              <p className="text-sm text-muted leading-relaxed">{copy}</p>
                            </div>
                          ))}
                        </div>
                      )}

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
