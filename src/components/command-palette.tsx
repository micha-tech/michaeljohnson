"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowRight, X } from "lucide-react";

const commands = [
  { label: "View Projects", action: "#projects" },
  { label: "About Me", action: "#about" },
  { label: "Engineering Philosophy", action: "#philosophy" },
  { label: "Technical Skills", action: "#skills" },
  { label: "Contact", action: "#contact" },
  { label: "Download Resume", action: "download_resume" },
];

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const filtered = commands.filter((cmd) =>
    cmd.label.toLowerCase().includes(query.toLowerCase())
  );

  const execute = useCallback(
    (action: string) => {
      onClose();
      if (action === "download_resume") {
        const a = document.createElement("a");
        a.href = "/resume/resume.pdf";
        a.download = "Michael_Johnson_CV.pdf";
        a.click();
        return;
      }
      const el = document.querySelector(action);
      el?.scrollIntoView({ behavior: "smooth" });
    },
    [onClose]
  );

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => Math.min(prev + 1, filtered.length - 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
      }
      if (e.key === "Enter" && filtered[selectedIndex]) {
        execute(filtered[selectedIndex].action);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, filtered, selectedIndex, execute]);

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-start justify-center pt-[15vh] px-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg glass rounded-2xl border border-white/10 shadow-2xl overflow-hidden"
          >
            <div className="flex items-center gap-3 px-4 py-3 border-b border-white/5">
              <Search className="w-4 h-4 text-muted" />
              <input
                autoFocus
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                placeholder="Navigate..."
                className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted outline-none"
              />
              <button onClick={onClose} className="p-1 text-muted hover:text-foreground">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-2 max-h-64 overflow-y-auto scrollbar-hide">
              {filtered.map((cmd, i) => (
                <button
                  key={cmd.label}
                  onClick={() => execute(cmd.action)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-colors ${
                    i === selectedIndex
                      ? "bg-primary/10 text-primary"
                      : "text-muted hover:text-foreground hover:bg-white/5"
                  }`}
                >
                  <span>{cmd.label}</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              ))}
              {filtered.length === 0 && (
                <p className="text-center text-muted text-sm py-8">No results found</p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
