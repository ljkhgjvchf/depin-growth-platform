import type { ClientConfig } from "@/config/client";

interface FooterProps {
  config: ClientConfig["footer"];
  brandName: string;
}

export function Footer({ config, brandName }: FooterProps) {
  return (
    <footer className="border-t border-[var(--brand-surface)] bg-[var(--brand-bg)] py-12">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          {/* Brand */}
          <span className="text-xl font-bold text-[var(--brand-text)]">
            {brandName}
          </span>

          {/* Links */}
          <nav className="flex flex-wrap justify-center gap-6">
            {config.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-[var(--brand-muted)] transition hover:text-[var(--brand-text)]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Social */}
          <div className="flex items-center gap-4">
            {config.twitterHandle && (
              <a
                href={`https://twitter.com/${config.twitterHandle}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="text-[var(--brand-muted)] transition hover:text-[var(--brand-text)]"
              >
                𝕏
              </a>
            )}
            {config.discordUrl && (
              <a
                href={config.discordUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Discord"
                className="text-[var(--brand-muted)] transition hover:text-[var(--brand-text)]"
              >
                Discord
              </a>
            )}
            {config.telegramUrl && (
              <a
                href={config.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram"
                className="text-[var(--brand-muted)] transition hover:text-[var(--brand-text)]"
              >
                Telegram
              </a>
            )}
          </div>
        </div>

        {config.legal && (
          <p className="mt-8 text-center text-xs text-[var(--brand-muted)]">
            {config.legal}
          </p>
        )}
      </div>
    </footer>
  );
}
