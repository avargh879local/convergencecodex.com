# Deployment Plan

## Recommended Setup

- GitHub repo: private
- Cloudflare Pages project: public website, connected to the private GitHub repo
- Build output directory: `public`
- Domain registrar/DNS: Cloudflare

This keeps source files private while making only the static website public.

## Domain

`convergencecodex.com` appears unregistered from a Verisign RDAP check, but confirm in Cloudflare immediately before purchase because domain availability can change.

## GitHub

Create a private repo named:

```text
convergence-codex
```

Then push this folder to it.

## Cloudflare Pages

In Cloudflare:

1. Go to Workers & Pages.
2. Create a Pages application.
3. Import the GitHub repository.
4. Select the `convergence-codex` repo.
5. Use:

```text
Production branch: main
Build command: exit 0
Build output directory: public
```

Cloudflare will publish the `public` folder and automatically redeploy when `main` receives a new commit.

## Custom Domain

After the first Pages deployment works on `*.pages.dev`:

1. Buy/register the domain in Cloudflare Registrar.
2. Open the Pages project.
3. Go to Custom domains.
4. Add `convergencecodex.com`.
5. Optionally add `www.convergencecodex.com`.

Cloudflare will handle DNS and HTTPS.
