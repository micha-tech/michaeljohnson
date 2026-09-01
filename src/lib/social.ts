import { GithubIcon, LinkedinIcon, XIcon } from "@/components/ui/social-icons";

export interface SocialLink {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  href: string | null;
  label: string;
}

export const email = "hello@michaeljohnson.dev";

/**
 * Set each href to your actual profile URL (e.g. "https://github.com/yourname").
 * A null href hides the icon so you never ship broken links.
 */
export const socialLinks: SocialLink[] = [
  { icon: GithubIcon, href: "https://github.com/micha-tech", label: "GitHub" },
  { icon: LinkedinIcon, href: null, label: "LinkedIn" },
  { icon: XIcon, href: null, label: "X/Twitter" },
];
