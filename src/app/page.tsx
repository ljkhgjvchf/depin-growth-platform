import { defaultClientConfig } from "@/config/client";
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { Metrics } from "@/components/landing/Metrics";
import { CTA } from "@/components/landing/CTA";
import { Footer } from "@/components/landing/Footer";

export default function CampaignPage() {
  const config = defaultClientConfig;

  return (
    <main className="min-h-screen bg-[var(--brand-bg)] text-[var(--brand-text)]">
      <Hero config={config.hero} brandName={config.name} />
      <Metrics items={config.metrics} />
      <Features items={config.features} />
      <CTA config={config.cta} />
      <Footer config={config.footer} brandName={config.name} />
    </main>
  );
}
