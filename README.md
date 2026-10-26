# richbothe.com

Personal portfolio for Rich Bothe. Vue 3, Vite, TypeScript and Tailwind CSS, pre-rendered to static HTML with `vite-ssg` and deployed to A2 Hosting by GitHub Actions.

## Develop

```sh
npm install
npm run dev          # local dev server
npm run build        # type-check + pre-render to dist/
npm run preview      # serve dist/ at http://localhost:4173
npx vitest run       # unit tests
npx playwright test  # end-to-end tests (needs a build first)
npm run check:lint   # lint without auto-fixing
```

## Brand

The Blueprint brand tokens (colors, fonts, the grid background) live in `src/assets/main.css` under `@theme`. Use the token utilities (`bg-brand`, `text-accent-deep`, `font-display`, `blueprint-grid`) instead of raw hex values.

## CI/CD

`.github/workflows/ci-cd.yml`

- **Every pull request and push:** lint, type-check, unit tests, build, end-to-end tests (Chromium), and an advisory Lighthouse run.
- **Push to `main`:** the same checks, then `rsync` over SSH to A2 Hosting.
- **Manual run** (Actions tab, "Run workflow"): defaults to a dry run that lists what would change without touching the server.

### Required GitHub settings

| Kind | Name | Value |
| --- | --- | --- |
| Secret | `SSH_PRIVATE_KEY` | Private half of the deploy-only key |
| Secret | `SSH_HOST` | A2 server host name |
| Secret | `SSH_USER` | cPanel username |
| Secret | `SSH_PORT` | SSH port (A2 shared hosting uses 7822) |
| Variable | `DEPLOY_PATH` | Document root of richbothe.com, relative to the home folder |

The deploy refuses to run if `DEPLOY_PATH` is missing, absolute, or contains `..`, and it checks the server's SSH fingerprint before sending anything. `--delete` keeps the server in sync with `dist/` but skips `.well-known/` (AutoSSL) and `cgi-bin/`.

## Still to add

- The full case study write-ups (the pages currently show the summary only)
