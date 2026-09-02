"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, Mail, AlertCircle, Loader2, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { socialLinks, email, whatsapp, whatsappHref } from "@/lib/social";

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

function validateName(name: string): string | undefined {
  const trimmed = name.trim();
  if (!trimmed) return "Name is required";
  if (trimmed.length < 2) return "Name must be at least 2 characters";
  if (trimmed.length > 100) return "Name is too long";
  if (/[<>{}\\n]/.test(trimmed)) return "Name contains invalid characters";
  return undefined;
}

function validateEmail(email: string): string | undefined {
  const trimmed = email.trim();
  if (!trimmed) return "Email is required";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmed)) return "Please enter a valid email address";
  if (trimmed.length > 254) return "Email is too long";
  return undefined;
}

function validateMessage(message: string): string | undefined {
  const trimmed = message.trim();
  if (!trimmed) return "Message is required";
  if (trimmed.length < 10) return "Message must be at least 10 characters";
  if (trimmed.length > 5000) return "Message is too long (max 5000 characters)";
  return undefined;
}

function sanitizeInput(value: string): string {
  return value
    .replace(/[<]/g, "&lt;")
    .replace(/[>]/g, "&gt;")
    .replace(/["]/g, "&quot;")
    .replace(/[']/g, "&#x27;");
}

export function ContactSection() {
  const { ref, isVisible } = useIntersectionObserver();
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [submitError, setSubmitError] = useState<string | undefined>(undefined);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleChange = useCallback(
    (field: string, value: string) => {
      const sanitized = sanitizeInput(value);
      setFormData((prev) => ({ ...prev, [field]: sanitized }));
      if (touched[field]) {
        let error: string | undefined;
        if (field === "name") error = validateName(sanitized);
        if (field === "email") error = validateEmail(sanitized);
        if (field === "message") error = validateMessage(sanitized);
        setErrors((prev) => ({ ...prev, [field]: error }));
      }
    },
    [touched]
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const nameError = validateName(formData.name);
    const emailError = validateEmail(formData.email);
    const messageError = validateMessage(formData.message);
    const newErrors: FormErrors = {};
    if (nameError) newErrors.name = nameError;
    if (emailError) newErrors.email = emailError;
    if (messageError) newErrors.message = messageError;
    setErrors(newErrors);
    setTouched({ name: true, email: true, message: true });
    if (Object.keys(newErrors).length > 0) return;

    setSending(true);
    setSubmitError(undefined);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setSubmitError(data?.error?.form || "Failed to send message. Please try again.");
        return;
      }
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: "", email: "", message: "" });
        setErrors({});
        setTouched({});
      }, 4000);
    } catch {
      setSubmitError("Network error. Please try again or email me directly.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" ref={ref} className="section-padding relative">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-2xl mx-auto"
        >
          <div className="text-center mb-12">
            <h2 className="text-sm font-mono text-primary mb-4 tracking-wider uppercase">
              Contact
            </h2>
            <h3 className="text-3xl sm:text-4xl font-bold mb-4">
              Let&apos;s build something <span className="text-gradient">trustworthy</span>
            </h3>
            <p className="text-muted">
              Open to engineering opportunities, collaborations, and conversations about
              trust infrastructure and platform engineering.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3 text-sm">
              <a href={`mailto:${email}`} className="inline-flex items-center justify-center gap-2 border border-border/60 px-4 py-3 text-foreground transition-colors hover:border-primary hover:text-primary">
                <Mail className="w-4 h-4" /> {email}
              </a>
              <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-primary px-4 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90">
                <MessageCircle className="w-4 h-4" /> WhatsApp: {whatsapp}
              </a>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="glass-card p-12 text-center"
              >
                <CheckCircle className="w-16 h-16 text-accent mx-auto mb-4" />
                <h4 className="text-xl font-semibold mb-2">Message sent!</h4>
                <p className="text-muted text-sm">I&apos;ll get back to you soon.</p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                noValidate
                className="glass-card p-6 sm:p-8 space-y-5"
              >
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-medium mb-2 text-muted">
                      Name <span className="text-primary">*</span>
                    </label>
                    <input
                      id="contact-name"
                      required
                      aria-required="true"
                      aria-invalid={errors.name ? "true" : undefined}
                      aria-describedby={errors.name ? "name-error" : undefined}
                      value={formData.name}
                      onBlur={() => handleBlur("name")}
                      onChange={(e) => handleChange("name", e.target.value)}
                      className={`w-full px-4 py-3 bg-foreground/5 border rounded-xl text-sm text-foreground placeholder:text-muted/50 focus:outline-none focus:bg-foreground/[0.07] transition-all ${
                        errors.name && touched.name
                          ? "border-red-500/50 focus:border-red-500/70"
                          : "border-border/30 focus:border-primary/30"
                      }`}
                      placeholder="Your name"
                    />
                    {errors.name && touched.name && (
                      <p id="name-error" className="flex items-center gap-1 text-xs text-red-400 mt-1.5">
                        <AlertCircle className="w-3 h-3" />
                        {errors.name}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-medium mb-2 text-muted">
                      Email <span className="text-primary">*</span>
                    </label>
                    <input
                      id="contact-email"
                      required
                      type="email"
                      aria-required="true"
                      aria-invalid={errors.email ? "true" : undefined}
                      aria-describedby={errors.email ? "email-error" : undefined}
                      value={formData.email}
                      onBlur={() => handleBlur("email")}
                      onChange={(e) => handleChange("email", e.target.value)}
                      className={`w-full px-4 py-3 bg-foreground/5 border rounded-xl text-sm text-foreground placeholder:text-muted/50 focus:outline-none focus:bg-foreground/[0.07] transition-all ${
                        errors.email && touched.email
                          ? "border-red-500/50 focus:border-red-500/70"
                          : "border-border/30 focus:border-primary/30"
                      }`}
                      placeholder="your@email.com"
                    />
                    {errors.email && touched.email && (
                      <p id="email-error" className="flex items-center gap-1 text-xs text-red-400 mt-1.5">
                        <AlertCircle className="w-3 h-3" />
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <label htmlFor="contact-message" className="block text-xs font-medium mb-2 text-muted">
                    Message <span className="text-primary">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    aria-required="true"
                    aria-invalid={errors.message ? "true" : undefined}
                    aria-describedby={errors.message ? "message-error" : undefined}
                    rows={5}
                    value={formData.message}
                    onBlur={() => handleBlur("message")}
                    onChange={(e) => handleChange("message", e.target.value)}
                    className={`w-full px-4 py-3 bg-foreground/5 border rounded-xl text-sm text-foreground placeholder:text-muted/50 focus:outline-none focus:bg-foreground/[0.07] transition-all resize-none ${
                      errors.message && touched.message
                        ? "border-red-500/50 focus:border-red-500/70"
                        : "border-border/30 focus:border-primary/30"
                    }`}
                    placeholder="Tell me about your project or opportunity..."
                  />
                  {errors.message && touched.message && (
                    <p id="message-error" className="flex items-center gap-1 text-xs text-red-400 mt-1.5">
                      <AlertCircle className="w-3 h-3" />
                      {errors.message}
                    </p>
                  )}
                </div>
                {submitError && (
                  <div className="flex items-center gap-2 text-sm text-red-400">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    {submitError}
                  </div>
                )}
                <Button type="submit" variant="primary" size="lg" className="w-full" disabled={sending}>
                  {sending ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4 mr-2" />
                  )}
                  {sending ? "Sending..." : "Send Message"}
                </Button>
              </motion.form>
            )}
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="flex items-center justify-center gap-6 mt-10"
          >
            {socialLinks
              .filter((link) => link.href)
              .map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href as string}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-12 h-12 rounded-xl glass-card flex items-center justify-center text-muted hover:text-primary hover:border-primary/20 transition-all"
                  aria-label={link.label}
                >
                  <link.icon className="w-5 h-5" />
                </motion.a>
              ))}
            <motion.a
              href={`mailto:${email}`}
              whileHover={{ scale: 1.1, y: -2 }}
              className="w-12 h-12 rounded-xl glass-card flex items-center justify-center text-muted hover:text-primary hover:border-primary/20 transition-all"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </motion.a>
            <motion.a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -2 }}
              className="w-12 h-12 rounded-xl glass-card flex items-center justify-center text-muted hover:text-primary hover:border-primary/20 transition-all"
              aria-label="WhatsApp"
            >
              <MessageCircle className="w-5 h-5" />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
