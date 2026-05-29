"use client";

import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { Code2, Shield, Brain, Cpu } from "lucide-react";

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
    icon: Brain,
    label: "AI-Assisted Systems",
    desc: "ML-powered trust scoring & detection",
  },
  {
    icon: Cpu,
    label: "Platform Architecture",
    desc: "Event-driven, serverless, production-grade",
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
                Building the infrastructure for{" "}
                <span className="text-gradient">digital trust</span>
              </h3>
              <div className="space-y-4 text-muted text-base leading-relaxed">
                <p>
                  I am a Nigerian-based software engineer focused on building scalable and
                  trust-centric digital systems. My work is driven by a strong systems-thinking
                  mindset, approaching engineering challenges through the lens of architecture,
                  reliability, and long-term sustainability.
                </p>
                <p>
                  I am deeply interested in fintech infrastructure and trust systems, exploring
                  identity systems, fraud prevention, IAM, cybersecurity, and machine learning
                  applications. Every system I build is designed for production-grade engineering
                  excellence.
                </p>
                <p>
                  Beyond code, I am curious about computational systems, the economics of trust,
                  and the mathematics that underpin secure, scalable architectures. I believe
                  that great engineering is about solving real infrastructure and platform
                  problems that enable others to build with confidence.
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
