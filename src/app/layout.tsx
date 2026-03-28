import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { defaultClientConfig } from "@/config/client";

const inter = Inter({ subsets: ["latin"] });

const config = defaultClientConfig;

export const metadata: Metadata = {
  title: config.name,
  description: config.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme } = config;

  return (
    <html lang="en">
      <head>
        <style>{`
          :root {
            --brand-primary: ${theme.primary};
            --brand-secondary: ${theme.secondary};
            --brand-accent: ${theme.accent};
            --brand-bg: ${theme.bg};
            --brand-surface: ${theme.surface};
            --brand-text: ${theme.text};
            --brand-muted: ${theme.muted};
          }
        `}</style>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
