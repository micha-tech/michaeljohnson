"use client";

import { motion } from "framer-motion";
import { Mail, MessageCircle } from "lucide-react";
import { socialLinks, email, whatsappHref } from "@/lib/social";

export function FooterSection() {
  return (
    <footer className="border-t border-border/20 py-8">
      <div className="container-wide">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center sm:text-left"
          >
            <a href="#" className="text-sm font-semibold tracking-tight">
              <span className="text-gradient">MJ</span>
              <span className="text-muted">.dev</span>
            </a>
            <p className="text-xs text-muted mt-1">
              Fullstack Software Engineer · Trust Infrastructure · Platform Engineering
            </p>
          </motion.div>

          <div className="flex items-center gap-4">
            {socialLinks
              .filter((link) => link.href)
              .map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href as string}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -1 }}
                  className="text-muted hover:text-primary transition-colors"
                  aria-label={link.label}
                >
                  <link.icon className="w-4 h-4" />
                </motion.a>
              ))}
            <a
              href={`mailto:${email}`}
              className="text-muted hover:text-primary transition-colors"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-primary transition-colors"
              aria-label="WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-border/20 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-[11px] text-muted">
            © {new Date().getFullYear()} Michael Johnson. All rights reserved.
          </p>
          <p className="text-[11px] text-muted flex items-center gap-1">
            Built with Next.js · Vercel
          </p>
        </div>
      </div>
    </footer>
  );
}
