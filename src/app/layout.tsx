import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://michaeljohnson.dev"),
  title: {
    default: "Michael Johnson | Fullstack Software Engineer",
    template: "%s | Michael Johnson",
  },
  description:
    "Fullstack Software Engineer specializing in scalable web platforms, trust systems, fintech infrastructure, and AI-powered applications. Building the infrastructure for digital trust.",
  keywords: [
    "Fullstack Engineer",
    "Software Engineer",
    "Trust Systems",
    "Fintech",
    "Next.js",
    "Platform Engineering",
    "Nigeria",
    "Web Development",
    "Application Security",
  ],
  authors: [{ name: "Michael Johnson" }],
  creator: "Michael Johnson",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Michael Johnson",
    title: "Michael Johnson | Fullstack Software Engineer",
    description:
      "Building scalable web applications, trust systems, fintech-inspired infrastructure, and AI-powered systems.",
    url: "https://michaeljohnson.dev",
  },
  twitter: {
    card: "summary_large_image",
    title: "Michael Johnson | Fullstack Software Engineer",
    description:
      "Building scalable web applications, trust systems, fintech-inspired infrastructure, and AI-powered systems.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Michael Johnson",
  url: "https://michaeljohnson.dev",
  jobTitle: "Fullstack Software Engineer",
  description:
    "Fullstack Software Engineer specializing in scalable web platforms, trust systems, fintech infrastructure, and AI-powered applications.",
  knowsAbout: [
    "Fullstack Engineering",
    "Trust Systems",
    "Application Security",
    "Platform Architecture",
    "Fintech Infrastructure",
    "AI-Assisted Systems",
  ],
  sameAs: ["https://github.com/michaeljohnson", "https://linkedin.com/in/michaeljohnson"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${geistMono.variable} dark`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-background text-foreground font-sans antialiased">
        <a
          href="#main-content"
          className="fixed -top-20 left-4 z-[100] px-4 py-2 bg-primary text-primary-foreground text-sm rounded-lg transition-all focus:top-4"
        >
          Skip to content
        </a>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
