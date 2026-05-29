"use client";

import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import {
  Globe, Shield, Server, Database, Workflow, Activity,
  ArrowRight, Lock, BarChart3, RefreshCw,
} from "lucide-react";

const layers = [
  {
    name: "Client",
    icon: Globe,
    desc: "Next.js, React, Edge",
    color: "from-primary/20 to-primary/5",
    border: "border-primary/30",
  },
  {
    name: "Edge",
    icon: Shield,
    desc: "CDN, Auth, Rate Limit",
    color: "from-secondary/20 to-secondary/5",
    border: "border-secondary/30",
  },
  {
    name: "API",
    icon: Server,
    desc: "REST, Webhooks, Events",
    color: "from-accent/20 to-accent/5",
    border: "border-accent/30",
  },
  {
    name: "Database",
    icon: Database,
    desc: "PostgreSQL, Connection Pool",
    color: "from-primary/20 to-primary/5",
    border: "border-primary/30",
  },
  {
    name: "Queue",
    icon: Workflow,
    desc: "Event Processing",
    color: "from-secondary/20 to-secondary/5",
    border: "border-secondary/30",
  },
  {
    name: "Events",
    icon: Activity,
    desc: "Streaming, Analytics",
    color: "from-accent/20 to-accent/5",
    border: "border-accent/30",
  },
];

const capabilities = [
  {
    icon: Lock,
    title: "Security Layers",
    desc: "Authentication, authorization, encryption, and audit logging at every boundary.",
  },
  {
    icon: BarChart3,
    title: "Observability",
    desc: "Structured logging, metrics, tracing, and alerting for production confidence.",
  },
  {
    icon: RefreshCw,
    title: "Reliability",
    desc: "Retry logic, circuit breakers, graceful degradation, and zero-downtime deployments.",
  },
  {
    icon: Globe,
    title: "Distributed Thinking",
    desc: "Stateless services, horizontal scaling, event-driven communication, and data consistency.",
  },
];

export function ArchitectureSection() {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.05 });

  return (
    <section id="architecture" ref={ref} className="section-padding relative">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-sm font-mono text-primary mb-4 tracking-wider uppercase">
            Systems Architecture
          </h2>
          <h3 className="text-3xl sm:text-4xl font-bold mb-4">
            How I think about <span className="text-gradient">systems</span>
          </h3>
          <p className="text-muted max-w-xl mb-12">
            Every system is designed with clear boundaries, observable behavior, and
            reliability as a first-class concern.
          </p>

          <div className="glass-card rounded-2xl p-6 sm:p-8 mb-12 overflow-x-auto">
            <div className="flex items-center gap-2 sm:gap-4 min-w-max justify-center">
              {layers.map((layer, i) => (
                <div key={layer.name} className="flex items-center gap-2 sm:gap-4">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    className={`flex flex-col items-center gap-2 p-3 sm:p-4 rounded-xl border ${layer.border} bg-gradient-to-br ${layer.color} min-w-[80px] sm:min-w-[100px]`}
                  >
                    <layer.icon className="w-5 h-5 text-foreground" />
                    <span className="text-xs font-semibold">{layer.name}</span>
                    <span className="text-[10px] text-muted text-center leading-tight">{layer.desc}</span>
                  </motion.div>
                  {i < layers.length - 1 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={isVisible ? { opacity: 1 } : {}}
                      transition={{ duration: 0.3, delay: i * 0.08 + 0.2 }}
                    >
                      <ArrowRight className="w-4 h-4 text-muted shrink-0" />
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {capabilities.map((cap, i) => (
              <motion.div
                key={cap.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                className="glass-card rounded-xl p-5 hover:border-primary/20 transition-all"
              >
                <cap.icon className="w-5 h-5 text-primary mb-3" />
                <h4 className="text-sm font-semibold mb-1">{cap.title}</h4>
                <p className="text-xs text-muted leading-relaxed">{cap.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
