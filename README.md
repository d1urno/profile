# Pablo Miceli — online CV

CV built with Astro, Vue, TypeScript and Tailwind CSS. Repository: https://github.com/d1urno/profile. Production URL: https://pablomiceli.dev.

## Development

Use Node.js 24.15.0 (`.nvmrc`) and pnpm 10.17.0. Supported Node versions are 22.13+ on the 22 line, or 24+.

| Command                          | Purpose                                       |
| -------------------------------- | --------------------------------------------- |
| `pnpm install --frozen-lockfile` | Install locked dependencies                   |
| `pnpm dev`                       | Start development server                      |
| `pnpm build`                     | Type-check and build static pages into dist   |
| `pnpm check`                     | Check Astro templates and content types       |
| `pnpm lint`                      | Run ESLint without changing files             |
| `pnpm lint:fix`                  | Apply automatic ESLint fixes                  |
| `pnpm format`                    | Format source files                           |
| `pnpm preview`                   | Preview the production build                  |
| `pnpm qa`                        | Run browser/accessibility checks against dist |
| `pnpm cv:pdf`                    | Run QA and regenerate all three CV PDFs       |

QA requires Chromium. Run `pnpm exec playwright install chromium`, or set `CV_BROWSER_PATH` to an existing executable. On this laptop, QA used `C:\Users\Pablo\AppData\Local\ms-playwright\chromium-1223\chrome-win64\chrome.exe`. The script starts and closes its own local server; it does not deploy.

## DevCLI

`.dev-cli.jsonc` follows the supplied Spentier schema version 1, with a single `astro-app` service for `my-profile` at the repository root. Open this repository in that DevCLI and select **App: Pablo Miceli CV**. It uses the reference's `{{pnpm}}` placeholder, starts on `http://localhost:4321`, and allows 60 seconds for readiness. There are no service dependencies, setup tasks or template generators.

The same command can run directly:

```sh
pnpm exec astro dev --host localhost --port 4321 --strictPort
```

Stop a direct run with Ctrl+C. `--strictPort` fails if another application owns 4321; stop or reconfigure that application deliberately. DevCLI state/logs under `.dev-cli/` are ignored by Git.

Validated on 7 October 2026: strict JSON parsing, package/target references, exact command startup on an available 4321, readiness in about eight seconds, English/Spanish/Portuguese responses, and shutdown of only the created process. The generic Project Framework DevCLI was subsequently located; its real config validator and target plan accepted this file and resolved `{{pnpm}}` to `pnpm.cmd`. The user confirmed successful project startup in their DevCLI.

## Content

- `src/content/locales/{en,es,pt}`: profiles and shared labels.
- `src/content/experiences/{en,es,pt}`: employment titles, dates and descriptions; lower order values appear first.
- `src/partials/ProjectsSection.astro`: public work samples. Label demos and challenges accurately.
- `src/pages/print.astro`: compact CV source for PDFs.
- Overview contains the full approved experience timeline after the profile and contact actions. The English actions are “Email me” (the existing public mailto) and “View projects” (the matching locale’s `/projects` page), with faithful Spanish/Portuguese labels.
- `/experience`, `/en/experience`, `/es/experience` and `/pt/experience` redirect to the matching Overview experience section. Astro returns 301 in development and emits instant refresh/fallback pages in this static build; `.html` inbound paths also work.
- `/projects`: work samples; `/tests` still renders these samples for existing links.
- `/score`: restored navigation tab, site notes and the original saved PageSpeed screenshot. The image is historical, not a fresh performance measurement.

`scripts/localized-routes.mjs` explicitly registers English, Spanish and Portuguese pages, including legacy `/en` aliases. Add new translated page names to its route list. Language links retain the current section. Canonical and alternate metadata refer to the same section; print pages are excluded from indexing and the sitemap; legacy Experience redirects are also excluded from the sitemap.

## PDFs and QA

Run `pnpm build`, then `pnpm cv:pdf`, and visually review the PDF pages. Run `pnpm build` again to copy regenerated public PDFs into dist. Existing public filenames containing `Senior_Product_Engineer` preserve download URLs; PDF contents and browser download names use Full-Stack Engineer positioning.

QA writes ignored screenshots and a JSON report under `.qa/`. It checks 60 combinations of locale, route and viewport (320, 390, 768 and 1440px), including Score and legacy Experience redirects, plus complete Overview experience content, redirect history with/without JavaScript, localized CTA destinations and keyboard activation, dark theme, the keyboard skip link, repeated and back/forward navigation, social icons, hover/focus animations, base/animated arrow geometry in every locale, compact tab touch targets, reduced motion, runtime errors, print output, 21 localized aliases and robots/sitemap responses. Animation samples, arrow geometry, and glow proof screenshots are also saved in `.qa/`. Set `CV_PDF_DIR` to write temporary PDF candidates without replacing the public downloads. Automated accessibility checks complement visual and keyboard review; they do not establish complete conformance.

See `review-notes.md` for evidence, verification and remaining content decisions. Keep salary expectations and unpublished client work out of public content. Local changes do not authorize a push or deployment.

See `dependency-review.md` for the dependency security update, compatibility decisions and verification.
