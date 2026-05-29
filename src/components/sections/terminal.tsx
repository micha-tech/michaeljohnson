"use client";

import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

const lines = [
  { text: "> system.check_integrity()", delay: 0 },
  { text: "✓ All systems operational", delay: 0.4 },
  { text: "> trust_score = compute_trust(user)", delay: 0.8 },
  { text: "✓ Trust score: 0.97", delay: 1.2 },
  { text: "> deploy(infrastructure)", delay: 1.6 },
  { text: "✓ Deployment complete (zero downtime)", delay: 2.0 },
  { text: "> verify(security_layer)", delay: 2.4 },
  { text: "✓ All security checks passed", delay: 2.8 },
  { text: "> build(trust)", delay: 3.2 },
  { text: "✓ Engineering trust into digital platforms", delay: 3.6 },
];

export function TerminalSection() {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2 });

  return (
    <section ref={ref} className="section-padding relative">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-sm font-mono text-primary mb-4 tracking-wider uppercase text-center">
            Terminal
          </h2>

          <div className="max-w-2xl mx-auto glass rounded-2xl overflow-hidden border border-white/10">
            <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-white/5">
              <div className="w-3 h-3 rounded-full bg-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-green-500/50" />
              <span className="text-xs text-muted ml-2 font-mono">trust_engine.sh</span>
            </div>
            <div className="p-4 sm:p-6 font-mono text-xs sm:text-sm leading-relaxed">
              {lines.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.3, delay: line.delay }}
                  className={`mb-1 ${line.text.startsWith("✓") ? "text-accent" : "text-foreground"}`}
                >
                  {line.text}
                </motion.div>
              ))}
              <motion.span
                initial={{ opacity: 0 }}
                animate={isVisible ? { opacity: [1, 0] } : {}}
                transition={{ duration: 0.5, delay: 4, repeat: Infinity, repeatType: "reverse" }}
                className="inline-block w-2 h-4 bg-primary ml-1"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
