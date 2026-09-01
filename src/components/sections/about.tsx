"use client";

import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { Code2, Shield, Brain, Cpu, Lock, Fingerprint } from "lucide-react";

const focusAreas = [
  {
    icon: Code2,
    label: "Fullstack Engineering",
    desc: "Scalable web platforms & distributed systems",
  },
  {
    icon: Shield,
    label: "Trust Infrastructure",
    desc: "Escrow systems, IAM, fraud prevention",
  },
  {
    icon: Lock,
    label: "Application Security",
    desc: "Secure architecture, threat modeling, CSP, audit",
  },
  {
    icon: Brain,
    label: "AI-Assisted Systems",
    desc: "ML-powered trust scoring & detection",
  },
  {
    icon: Cpu,
    label: "Platform Architecture",
    desc: "Event-driven, serverless, production-grade",
  },
  {
    icon: Fingerprint,
    label: "Security Engineering",
    desc: "IAM, cryptography, secure SDLC, zero trust",
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
                A product-minded engineer with a <span className="text-gradient">systems mindset.</span>
              </h3>
              <div className="space-y-4 text-muted text-base leading-relaxed">
                <p>
                  I am a Nigeria-based full-stack engineer who takes products from ambiguous
                  requirements to dependable production systems. I work across the stack:
                  shaping domain models, building interfaces and APIs, integrating third-party
                  services, and improving the reliability of what ships.
                </p>
                <p>
                  My strongest work sits where correctness matters: payments and escrow,
                  identity and access, multi-tenant business software, and collaborative
                  real-time products. I care about clear operational workflows, secure defaults,
                  and software teams can evolve confidently.
                </p>
                <p>
                  I am open to senior remote roles where thoughtful engineering, ownership,
                  and collaboration have a direct impact on customers and the business.
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
