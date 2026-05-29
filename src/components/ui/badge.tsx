import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "primary" | "secondary" | "accent";
  className?: string;
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium backdrop-blur-sm border transition-colors",
        variant === "default" && "bg-white/5 text-muted border-white/10",
        variant === "primary" && "bg-primary/10 text-primary border-primary/20",
        variant === "secondary" && "bg-secondary/10 text-secondary border-secondary/20",
        variant === "accent" && "bg-accent/10 text-accent border-accent/20",
        className
      )}
    >
      {children}
    </span>
  );
}
