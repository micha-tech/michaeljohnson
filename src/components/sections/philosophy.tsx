"use client";

import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { Shield, Scale, Network, Eye, Database, Key, Activity, Layers, Lock, Bug } from "lucide-react";

const principles = [
  {
    icon: Shield,
    title: "Trust as a Systems Problem",
    desc: "Confidence in digital systems is engineered through verification, transparency, and computational guarantees embedded in every layer of the stack.",
  },
  {
    icon: Scale,
    title: "Incentives & Economics",
    desc: "Good design reduces transaction costs. Well-built systems align incentives so that the honest choice is also the rational one.",
  },
  {
    icon: Network,
    title: "Infrastructure-Native Security",
    desc: "Security must be a property of the platform, not an add-on. Every database write, API call, and event is an opportunity to verify.",
  },
  {
    icon: Eye,
    title: "Verification & Auditability",
    desc: "Identity verification, transaction validation, and reputation scoring form the layer that makes online exchange dependable.",
  },
  {
    icon: Database,
    title: "Reliability Engineering",
    desc: "Systems must be observable, resilient, and predictable under load. Predictability is what makes users confident enough to depend on them.",
  },
  {
    icon: Key,
    title: "Observability & Accountability",
    desc: "Observability is the window into system behavior; accountability is what turns that visibility into responsible infrastructure.",
  },
  {
    icon: Activity,
    title: "Reputation Systems",
    desc: "Reputation is how platforms confer confidence at scale. Distributed, verifiable, and manipulation-resistant — it is the backbone of marketplaces.",
  },
  {
    icon: Layers,
    title: "Scalability & Resilience",
    desc: "A system that fails under pressure cannot be relied upon. Scalability and resilience are not features — they are requirements.",
  },
  {
    icon: Lock,
    title: "Application Security",
    desc: "Security is a property of every component, not a layer. Threat modeling, secure defaults, and defense in depth create systems that withstand attack.",
  },
  {
    icon: Bug,
    title: "Secure Development Lifecycle",
    desc: "Security is integrated through design review, static analysis, dependency scanning, penetration testing, and incident response planning.",
  },
];

export function PhilosophySection() {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.05 });

  return (
    <section id="philosophy" ref={ref} className="section-padding relative">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="text-center mb-16">
            <h2 className="text-sm font-mono text-primary mb-4 tracking-wider uppercase">
              Engineering Philosophy
            </h2>
            <h3 className="text-4xl sm:text-5xl font-bold mb-4">
              Engineering <span className="text-gradient">Trust</span>
            </h3>
            <p className="text-muted max-w-2xl mx-auto text-base leading-relaxed">
              Confidence is the most important primitive in digital systems. It is not a
              feature or a feeling — it is an engineering discipline grounded in verification,
              economics, and security that must be architected, built, and maintained.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {principles.map((principle, i) => (
              <motion.div
                key={principle.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.05 }}
                className="glass-card rounded-xl p-6 hover:border-primary/20 transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <principle.icon className="w-5 h-5 text-primary" />
                </div>
                <h4 className="text-sm font-semibold mb-2">{principle.title}</h4>
                <p className="text-xs text-muted leading-relaxed">{principle.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
