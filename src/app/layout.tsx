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
    default: "Michael Johnson | Senior Full-Stack Engineer",
    template: "%s | Michael Johnson",
  },
  description:
    "Senior software engineer across React, API design, PostgreSQL, Linux, Docker, data engineering, graph systems, machine learning, and production operations.",
  keywords: [
    "Senior Software Engineer",
    "Software Engineer",
    "Trust Systems",
    "Fintech",
    "Next.js",
    "Platform Engineering",
    "Nigeria",
    "Web Development",
    "Application Security",
    "PostgreSQL",
    "Docker",
    "Linux",
    "Data Engineering",
    "Machine Learning",
    "Neo4j",
  ],
  authors: [{ name: "Michael Johnson" }],
  creator: "Michael Johnson",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Michael Johnson",
    title: "Michael Johnson | Senior Full-Stack Engineer",
    description:
      "Production-minded engineering across frontend systems, APIs, data, infrastructure, and applied machine learning.",
    url: "https://michaeljohnson.dev",
  },
  twitter: {
    card: "summary_large_image",
    title: "Michael Johnson | Senior Software Engineer",
    description:
      "Production-minded engineering across frontend systems, APIs, data, infrastructure, and applied machine learning.",
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
  jobTitle: "Senior Full-Stack Engineer",
  description:
    "Senior software engineer working across frontend systems, APIs, PostgreSQL, Linux infrastructure, data engineering, graph intelligence, and applied machine learning.",
  knowsAbout: [
    "Frontend and Backend Engineering",
    "Trust Systems",
    "Application Security",
    "Platform Architecture",
    "Fintech Infrastructure",
    "Applied Machine Learning",
    "Linux and Docker",
    "PostgreSQL Performance",
    "Data Engineering",
    "Neo4j and Graph Intelligence",
    "Machine Learning",
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
