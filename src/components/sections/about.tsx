"use client";

import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { Code2, Shield, Brain, Database, Terminal, LineChart } from "lucide-react";

const focusAreas = [
  {
    icon: Code2,
    label: "Product Engineering",
    desc: "React systems, APIs, domain models, testing, and delivery",
  },
  {
    icon: Shield,
    label: "Reliable Platforms",
    desc: "Payments, multi-tenancy, IAM, audit trails, and workflows",
  },
  {
    icon: Database,
    label: "Data Systems",
    desc: "PostgreSQL, pooling, query plans, vectors, graphs, and pipelines",
  },
  {
    icon: Brain,
    label: "Applied ML",
    desc: "Feature engineering, XGBoost, HMMs, retrieval, and evaluation",
  },
  {
    icon: Terminal,
    label: "Linux & Infrastructure",
    desc: "Docker, VPS operations, reverse proxies, CI/CD, and monitoring",
  },
  {
    icon: LineChart,
    label: "Business Systems",
    desc: "Constraints, unit economics, delivery risk, and operational metrics",
  },
];

export function AboutSection() {
  const { ref, isVisible } = useIntersectionObserver();

  return (
    <section id="about" ref={ref} className="section-padding relative">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            <div className="lg:col-span-3">
              <h2 className="text-sm font-mono text-primary mb-4 tracking-wider uppercase">
                About
              </h2>
              <h3 className="text-3xl sm:text-4xl font-bold mb-6 leading-tight">
                Built across the stack. Accountable <span className="text-gradient">through production.</span>
              </h3>
              <div className="space-y-4 text-muted text-base leading-relaxed">
                <p>
                  I am a Nigeria-based senior software engineer who turns ambiguous business
                  problems into systems that can be operated, measured, and changed safely. I
                  work through discovery, domain modelling, architecture, implementation,
                  deployment, monitoring, incident diagnosis, and the unglamorous maintenance
                  that keeps a product useful after launch.
                </p>
                <p>
                  My range is deliberately deep. On the frontend that means component APIs,
                  state ownership, TanStack Query caching and invalidation, accessible interaction,
                  Zod-backed forms, rendering strategy, performance budgets, and design-system
                  discipline. On the backend it means explicit API contracts, authorization,
                  idempotency, queues, webhooks, transactional boundaries, failure recovery,
                  PostgreSQL indexing, query optimization, connection pooling, and data integrity.
                </p>
                <p>
                  I also build and operate the substrate: Linux servers, Docker images and
                  Compose stacks, VPS provisioning, Nginx, TLS, DNS, secrets, backups, deployment
                  pipelines, logs, metrics, alerts, and capacity planning. For data-intensive work,
                  I use vector search, Neo4j and graph intelligence, feature pipelines, XGBoost,
                  Hidden Markov Models, and evaluation loops where they solve a real problem.
                </p>
                <p>
                  Engineering decisions are business decisions. I use the Theory of Constraints,
                  value-stream thinking, cost of delay, unit economics, service-level objectives,
                  risk reduction, and build-versus-buy analysis to find the bottleneck and spend
                  complexity where it creates measurable value.
                </p>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {focusAreas.map((area, i) => (
                  <motion.div
                    key={area.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                    className="glass-card rounded-xl p-5 hover:border-primary/20 transition-all duration-300"
                  >
                    <area.icon className="w-5 h-5 text-primary mb-3" />
                    <h4 className="text-sm font-semibold mb-1">{area.label}</h4>
                    <p className="text-xs text-muted">{area.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
