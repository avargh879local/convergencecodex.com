# The Convergence Codex

A public static research site for a comparative eschatological study of Al-Mahdi, the Biblical Antichrist, Dajjal, and related end-times traditions.

## Website

Cloudflare Pages should publish only:

```text
public/
```

The production homepage is:

```text
public/index.html
```

## Local Preview

```bash
cd /Users/adam/Downloads/mahdi
python3 -m http.server 7000 -d public
```

Then open:

```text
http://localhost:7000
```

## Private Files

The repo may contain helper scripts and archive files, but Cloudflare should not publish them because the build output directory is `public`.

Never commit `.env` or `env.txt`; those contain local API keys.

Before making the website public, follow:

```text
SECURITY_LAUNCH_CHECKLIST.md
```

## Cloudflare Pages Settings

Use these settings:

```text
Production branch: main
Build command: bash build.sh
Build output directory: public
Root directory: /
```

After GitHub is connected, every push to `main` deploys the website automatically.
