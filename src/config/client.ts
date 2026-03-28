/**
 * Client campaign config — one object per client/campaign.
 * Swap this out (or load from env/CMS) to white-label the template.
 */

export interface MetricItem {
  label: string;
  value: string;
  delta?: string; // e.g. "+12% MoM"
}

export interface FeatureItem {
  icon: string; // emoji or URL
  title: string;
  description: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface ClientConfig {
  // Brand
  name: string;
  tagline: string;
  description: string;
  logoUrl?: string;
  faviconUrl?: string;

  // Theme CSS variables (injected into :root)
  theme: {
    primary: string;   // e.g. "#6366f1"
    secondary: string; // e.g. "#818cf8"
    accent: string;    // e.g. "#38bdf8"
    bg: string;        // e.g. "#0f172a"
    surface: string;   // e.g. "#1e293b"
    text: string;      // e.g. "#f8fafc"
    muted: string;     // e.g. "#94a3b8"
  };

  // Content
  hero: {
    headline: string;
    subheadline: string;
    ctaLabel: string;
    ctaHref: string;
    secondaryCtaLabel?: string;
    secondaryCtaHref?: string;
    badgeText?: string;
  };
  features: FeatureItem[];
  metrics: MetricItem[];
  cta: {
    headline: string;
    body: string;
    ctaLabel: string;
    ctaHref: string;
  };
  footer: {
    links: NavLink[];
    legal?: string;
    twitterHandle?: string;
    discordUrl?: string;
    telegramUrl?: string;
  };
}

// Default / demo config — replace per client
export const defaultClientConfig: ClientConfig = {
  name: "HeliosNet",
  tagline: "The Decentralized Wireless Infrastructure",
  description:
    "HeliosNet is building the world's largest community-owned wireless network, powered by token incentives.",
  theme: {
    primary: "#6366f1",
    secondary: "#818cf8",
    accent: "#38bdf8",
    bg: "#0f172a",
    surface: "#1e293b",
    text: "#f8fafc",
    muted: "#94a3b8",
  },
  hero: {
    headline: "Own the Network. Earn the Rewards.",
    subheadline:
      "Deploy a node, provide coverage, and earn $HLS tokens. HeliosNet turns your location into passive income.",
    ctaLabel: "Deploy a Node",
    ctaHref: "#deploy",
    secondaryCtaLabel: "Read the Whitepaper",
    secondaryCtaHref: "#docs",
    badgeText: "Now live on Mainnet",
  },
  features: [
    {
      icon: "📡",
      title: "Deploy Anywhere",
      description:
        "Set up a hotspot in minutes. Our hardware works out of the box — no technical expertise required.",
    },
    {
      icon: "🪙",
      title: "Earn $HLS Daily",
      description:
        "Nodes earn tokens for every byte of coverage they provide. Rewards are distributed on-chain every 24 hours.",
    },
    {
      icon: "🔐",
      title: "Fully On-Chain",
      description:
        "All coverage proofs and reward distributions happen transparently on-chain. No middlemen.",
    },
    {
      icon: "🌐",
      title: "Global Coverage Map",
      description:
        "See network density in real time. Find high-value deployment zones with our live coverage explorer.",
    },
  ],
  metrics: [
    { label: "Active Nodes", value: "24,800+", delta: "+18% MoM" },
    { label: "Countries Covered", value: "62", delta: "+4 this quarter" },
    { label: "Total $HLS Distributed", value: "$4.2M", delta: "+31% QoQ" },
    { label: "Avg. Node APY", value: "34%", delta: "Last 30 days" },
  ],
  cta: {
    headline: "Ready to Earn?",
    body: "Join 24,800+ node operators already earning $HLS. Order your hardware kit and start earning in under 48 hours.",
    ctaLabel: "Order Your Kit",
    ctaHref: "#order",
  },
  footer: {
    links: [
      { label: "Docs", href: "#docs" },
      { label: "Coverage Map", href: "#map" },
      { label: "Explorer", href: "#explorer" },
      { label: "Blog", href: "#blog" },
      { label: "Careers", href: "#careers" },
    ],
    legal: `© ${new Date().getFullYear()} HeliosNet Foundation. All rights reserved.`,
    twitterHandle: "heliosnet",
    discordUrl: "#discord",
    telegramUrl: "#telegram",
  },
};
