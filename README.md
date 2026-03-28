# DePIN Growth Platform

Shared engineering platform for the DePIN growth marketing agency. Powers client campaigns: landing pages, on-chain analytics dashboards, social automation pipelines, and growth tooling.

## Stack

- **Framework**: Next.js 14 (App Router) + TypeScript
- **Deployment**: Vercel (preview per PR, production on `main`)
- **CI**: GitHub Actions (lint, typecheck, build)
- **Analytics**: Dune Analytics API + EVM RPC
- **Social**: Twitter/X API, Farcaster (Neynar)

## Environments

| Environment | Branch    | URL                                          |
| ----------- | --------- | -------------------------------------------- |
| Production  | `main`    | https://depin-growth-platform.vercel.app     |
| Staging     | `develop` | Auto-deployed by Vercel on push to `develop` |
| Preview     | Any PR    | Auto-deployed per PR, URL commented on PR    |

## Local Development

```bash
# 1. Clone the repo
git clone https://github.com/ljkhgjvchf/depin-growth-platform.git
cd depin-growth-platform

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Fill in required values (see .env.example for docs)

# 4. Run dev server
npm run dev
# → http://localhost:3000
```

## Environment Variables

Copy `.env.example` to `.env.local` and fill in values. See `.env.example` for full documentation of each variable.

Required for core functionality:
- `DUNE_API_KEY` — on-chain analytics
- `RPC_URL_*` — EVM RPC endpoints per chain

Optional (enable specific features):
- `TWITTER_*` — social automation
- `NEYNAR_*` — Farcaster distribution
- `NOTION_*` — content pipelines

## CI/CD

Three GitHub Actions workflows:

| Workflow              | Trigger                   | What it does                                 |
| --------------------- | ------------------------- | -------------------------------------------- |
| `ci.yml`              | Push/PR to main or develop | Lint → typecheck → build                     |
| `deploy-preview.yml`  | PR opened/updated         | Vercel preview deploy, URL commented on PR   |
| `deploy-production.yml` | Push to `main`          | Vercel production deploy                     |

### Required GitHub Secrets

Add these in **Settings → Secrets and variables → Actions**:

| Secret              | Description                                      |
| ------------------- | ------------------------------------------------ |
| `VERCEL_TOKEN`      | Vercel personal access token                     |
| `VERCEL_ORG_ID`     | Vercel org/team ID (`vercel env ls` to find it)  |
| `VERCEL_PROJECT_ID` | Vercel project ID (`.vercel/project.json`)       |

### Setting Up Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Link project (creates .vercel/project.json with VERCEL_PROJECT_ID/ORG_ID)
vercel link

# Add env vars to Vercel (staging and production)
vercel env add NEXT_PUBLIC_APP_ENV staging
vercel env add NEXT_PUBLIC_APP_ENV production
vercel env add DUNE_API_KEY production
# ... repeat for other env vars
```

## Project Structure

```
src/
  app/               # Next.js App Router pages and layouts
    layout.tsx       # Root layout
    page.tsx         # Home page
    globals.css      # Global styles
.github/
  workflows/
    ci.yml                   # Lint/typecheck/build CI
    deploy-preview.yml       # PR preview deployments
    deploy-production.yml    # Production deploy on main push
.env.example                 # Environment variable template
vercel.json                  # Vercel deployment config
next.config.js               # Next.js config
tsconfig.json                # TypeScript config
```

## Branching Strategy

- `main` — production, protected, requires PR + CI pass
- `develop` — staging, merge feature branches here first
- `feature/<name>` — individual features
- `client/<slug>/<feature>` — client-specific campaign work

## Adding a New Client Campaign

1. Create `src/app/clients/<client-slug>/` for landing pages
2. Add client-specific env vars to Vercel for that environment
3. Open a PR from `feature/` → `develop` for staging review
4. Merge `develop` → `main` for production launch
