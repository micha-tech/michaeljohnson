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
  ],
  authors: [{ name: "Michael Johnson" }],
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
      <body className="min-h-screen bg-background text-foreground font-sans antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
