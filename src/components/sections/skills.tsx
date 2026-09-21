"use client";

import { motion } from "framer-motion";
import { Brain, Code2, Database, GitBranch, Globe, LineChart, Network, Server, ShieldCheck, Terminal } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

const capabilityGroups = [
  {
    title: "Frontend systems", icon: Globe,
    summary: "Interfaces treated as long-lived systems, with explicit state, data, and rendering boundaries.",
    skills: ["React 19 & Next.js", "TypeScript", "Component API design", "State ownership & reducers", "TanStack Query", "Cache invalidation", "React Hook Form", "Zod resolvers", "RSC, SSR & streaming", "Design systems", "Accessibility", "Core Web Vitals", "PWA & offline flows", "Framer Motion"],
  },
  {
    title: "Backend & API design", icon: Server,
    summary: "Clear contracts, secure boundaries, predictable failure modes, and workflows that remain correct under retries.",
    skills: ["Node.js & TypeScript", "REST & GraphQL", "Schema-first contracts", "Auth, IAM & RBAC", "Multi-tenancy", "Idempotency", "Webhooks", "Queues & workers", "Transactions", "Rate limiting", "Caching", "Payment orchestration", "Audit trails", "OpenAPI concepts"],
  },
  {
    title: "PostgreSQL & data access", icon: Database,
    summary: "Data models and query paths designed from workload, consistency, and operational constraints.",
    skills: ["PostgreSQL", "SQL modelling", "Prisma & Drizzle", "Indexes & query plans", "EXPLAIN / ANALYZE", "Query optimization", "Connection pooling", "PgBouncer concepts", "Isolation levels", "Migrations", "Partitioning concepts", "Backups & restore drills", "Redis", "Data integrity"],
  },
  {
    title: "Data engineering & retrieval", icon: Network,
    summary: "Pipelines that turn operational data into reliable analytical and retrieval-ready assets.",
    skills: ["ETL / ELT pipelines", "Data validation", "Batch & event processing", "Feature-store concepts", "Vector databases", "Embeddings", "Semantic search", "RAG pipelines", "Neo4j", "Cypher", "Graph modelling", "Graph intelligence", "Entity relationships", "Data lineage"],
  },
  {
    title: "Applied machine learning", icon: Brain,
    summary: "Models built around sound features, baselines, evaluation, monitoring, and business usefulness.",
    skills: ["Python", "Pandas & NumPy", "scikit-learn", "Feature engineering", "XGBoost", "Hidden Markov Models", "Classification & ranking", "Anomaly detection", "Time-series features", "Train/validation design", "Leakage prevention", "Model evaluation", "Inference APIs", "Drift-monitoring concepts"],
  },
  {
    title: "Linux, Docker & VPS", icon: Terminal,
    summary: "Servers provisioned for repeatable deployment, secure access, observability, and recovery.",
    skills: ["Linux administration", "Docker & Compose", "VPS provisioning", "Nginx reverse proxy", "TLS & certificates", "DNS configuration", "SSH hardening", "Users & permissions", "systemd", "Firewalls", "Environment & secrets", "Volumes & persistence", "Backups", "Resource monitoring"],
  },
  {
    title: "Reliability & operations", icon: ShieldCheck,
    summary: "Production health made visible through useful signals, documented responses, and controlled change.",
    skills: ["Structured logging", "Metrics & dashboards", "Tracing concepts", "Health checks", "SLIs, SLOs & alerts", "Error tracking", "Synthetic monitoring", "Incident response", "Runbooks", "Capacity planning", "Graceful degradation", "Retry & backoff", "Disaster recovery", "Post-incident reviews"],
  },
  {
    title: "Delivery & engineering process", icon: GitBranch,
    summary: "Small, reviewable changes backed by automation, risk controls, and a clear route to production.",
    skills: ["Git & GitHub", "CI/CD", "Docker build pipelines", "Vitest", "Playwright", "Contract testing", "Static analysis", "Code review", "Feature flags", "Environment promotion", "Zero-downtime releases", "Rollback planning", "Dependency hygiene", "Technical documentation"],
  },
  {
    title: "Business & systems thinking", icon: LineChart,
    summary: "Technical decisions framed by flow, economics, risk, and the constraint limiting the system today.",
    skills: ["Theory of Constraints", "Value-stream mapping", "Cost of delay", "Unit economics", "Build vs buy", "Opportunity cost", "Operational KPIs", "Service economics", "Risk registers", "Stakeholder discovery", "Domain modelling", "Process mapping", "Incremental delivery", "Technical debt strategy"],
  },
];

export function SkillsSection() {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.03 });

  return (
    <section id="skills" ref={ref} className="section-padding relative">
      <div className="container-wide">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={isVisible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, ease: "easeOut" }}>
          <h2 className="text-sm font-mono text-primary mb-4 tracking-wider uppercase">Engineering capability</h2>
          <h3 className="text-3xl sm:text-4xl font-bold max-w-3xl mb-4">
            From product interface to <span className="text-gradient">production infrastructure.</span>
          </h3>
          <p className="text-muted max-w-3xl leading-relaxed mb-10">
            I work across the whole delivery system: requirements, architecture, frontend, APIs,
            databases, data and ML workloads, deployment, observability, and the business feedback
            loop that decides what should be built next.
          </p>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
            {capabilityGroups.map((group, index) => (
              <motion.article key={group.title} initial={{ opacity: 0, y: 20 }} animate={isVisible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.35, delay: Math.min(index * 0.05, 0.3) }} className="glass-card rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center"><group.icon className="w-4 h-4 text-primary" /></div>
                  <h4 className="font-semibold">{group.title}</h4>
                </div>
                <p className="text-xs text-muted leading-relaxed mb-5 min-h-12">{group.summary}</p>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => <span key={skill} className="text-[11px] px-2.5 py-1 rounded-lg bg-foreground/5 text-muted border border-border/30">{skill}</span>)}
                </div>
              </motion.article>
            ))}
          </div>

          <div className="mt-8 glass-card rounded-2xl p-6 sm:p-8 grid sm:grid-cols-[auto_1fr] gap-4 sm:gap-6 items-start">
            <div className="w-11 h-11 rounded-xl bg-primary text-primary-foreground flex items-center justify-center"><Code2 className="w-5 h-5" /></div>
            <div>
              <h4 className="font-semibold text-lg mb-2">The operating standard</h4>
              <p className="text-sm text-muted leading-relaxed max-w-4xl">
                Define the constraint. Make the contract explicit. Measure before optimizing. Keep
                state ownership clear. Design retries and recovery before failure happens. Automate
                the repeatable path, document the exceptional one, and leave the system easier to
                observe and change than it was before.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
