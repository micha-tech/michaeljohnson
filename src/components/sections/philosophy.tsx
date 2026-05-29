"use client";

import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { Shield, Scale, Network, Eye, Database, Key, Activity, Layers, Lock, Bug } from "lucide-react";

const principles = [
  {
    icon: Shield,
    title: "Trust as a Systems Problem",
    desc: "Trust is not abstract—it is engineered through verification, transparency, and computational guarantees embedded in every layer of the stack.",
  },
  {
    icon: Scale,
    title: "Trust as an Economic Mechanism",
    desc: "Trust reduces transaction costs. Well-designed systems align incentives so that honest behavior is the rational choice.",
  },
  {
    icon: Network,
    title: "Infrastructure-Driven Trust",
    desc: "Trust must be infrastructure-native, not bolted on. Every database write, every API call, every event is an opportunity to verify.",
  },
  {
    icon: Eye,
    title: "Verification Systems",
    desc: "Identity verification, transaction validation, and reputation scoring form the verification layer that makes digital trust possible.",
  },
  {
    icon: Database,
    title: "Reliability Engineering",
    desc: "Trust requires reliability. Systems must be observable, resilient, and predictable under load. Predictability builds confidence.",
  },
  {
    icon: Key,
    title: "Security & Observability",
    desc: "Security is continuous verification. Observability is the window into system behavior. Together they create accountable infrastructure.",
  },
  {
    icon: Activity,
    title: "Reputation Systems",
    desc: "Reputation is the currency of trust. Distributed, verifiable, and resistant to manipulation—reputation systems are the backbone of marketplace trust.",
  },
  {
    icon: Layers,
    title: "Scalability & Resilience",
    desc: "A system that fails under pressure cannot be trusted. Scalability and resilience are not features—they are trust requirements.",
  },
  {
    icon: Lock,
    title: "Application Security",
    desc: "Security is not a layer — it is a property of every component. Threat modeling, secure defaults, defense in depth, and continuous verification create systems that withstand attack.",
  },
  {
    icon: Bug,
    title: "Secure SDLC",
    desc: "Security must be integrated into the development lifecycle: design review, static analysis, dependency scanning, penetration testing, and incident response planning.",
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
              Trust is the most important primitive in digital systems. It is not a feature
              or a feeling—it is an engineering discipline, an economic mechanism, and a
              computational construct that must be architected, built, and maintained.
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
