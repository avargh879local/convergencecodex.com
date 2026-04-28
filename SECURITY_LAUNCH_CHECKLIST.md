# Public Launch Security Checklist

Use this before removing Cloudflare Access and making the site public.

## Already handled in the repo

- Security headers are served from `public/_headers`.
- The only public output directory is `public/`.
- The hidden Deep Excavation notes were moved to `research/hidden-treasures.html`, outside the Cloudflare Pages output directory.
- JavaScript was moved to `public/assets/site.js` so the CSP can block inline scripts.

## Must do before public launch

1. Revoke the exposed GitHub token.
   - Create a new fine-grained token only when needed.
   - Limit it to this one repository.
   - Give it the shortest practical expiration.
   - Give it only Contents read/write.

2. Keep the GitHub repository private.
   - Do not make the repo public if it contains research drafts, helper scripts, or local workflow notes.
   - Cloudflare Pages can publish the website while the repo stays private.

3. Protect the GitHub `main` branch.
   - Enable a branch protection rule or ruleset for `main`.
   - Require pull request review before merge if collaborators are added later.
   - Block force pushes and branch deletion.

4. Confirm Cloudflare Pages publishes only:

   ```text
   Build command: bash build.sh
   Build output directory: public
   Production branch: main
   ```

5. Confirm Cloudflare DNS and HTTPS.
   - DNS records for `convergencecodex.com` and `www.convergencecodex.com` should be proxied through Cloudflare.
   - SSL/TLS should be active.
   - Always Use HTTPS should be enabled.
   - HSTS is now also sent by the site headers. Do not disable HTTPS while HSTS is active.

6. Cloudflare security settings.
   - Keep DDoS protection enabled. Cloudflare applies this by default.
   - Enable Browser Integrity Check if available.
   - Use Bot Fight Mode carefully. If Cloudflare injects bot-detection JavaScript, the CSP may need an update.
   - Do not enable Cloudflare Web Analytics, Zaraz, Rocket Loader, or Turnstile unless the CSP is updated for those tools.

7. Remove Cloudflare Access only when ready.
   - Current Cloudflare Access login protects the site.
   - To make the site public, remove the Access application hostnames or disable the Access application.
   - Test in a private/incognito browser window.

## After public launch

- Test these URLs:

  ```text
  https://convergencecodex.com
  https://www.convergencecodex.com
  https://convergencecodex.pages.dev
  ```

- Check response headers:

  ```bash
  curl -I https://convergencecodex.com
  ```

- Confirm the page source does not contain private notes:

  ```bash
  curl -L https://convergencecodex.com | grep -i "Hidden Treasures"
  ```

- Watch Cloudflare Analytics and Security Events for unusual traffic.
