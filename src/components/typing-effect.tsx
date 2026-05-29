"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const specialties = [
  "Fullstack Engineering",
  "Web Applications",
  "Trust Systems",
  "Platform Architecture",
  "Scalable Infrastructure",
  "Backend Engineering",
  "AI-Assisted Systems",
  "Application Security",
];

export function TypingEffect() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = specialties[currentIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting) {
      if (displayText.length < current.length) {
        timeout = setTimeout(() => {
          setDisplayText(current.slice(0, displayText.length + 1));
        }, 60);
      } else {
        timeout = setTimeout(() => setIsDeleting(true), 2000);
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 30);
      } else {
        setIsDeleting(false);
        setCurrentIndex((prev) => (prev + 1) % specialties.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentIndex]);

  return (
    <span className="inline-flex items-center">
      <span className="text-gradient">{displayText}</span>
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        className="ml-1 w-[2px] h-5 bg-primary inline-block"
      />
    </span>
  );
}
