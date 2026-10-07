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

## Content

- `src/content/locales/{en,es,pt}`: profiles and shared labels.
- `src/content/experiences/{en,es,pt}`: employment titles, dates and descriptions; lower order values appear first.
- `src/partials/ProjectsSection.astro`: public work samples. Label demos and challenges accurately.
- `src/pages/print.astro`: compact CV source for PDFs.
- `/projects`: work samples; `/tests` still renders these samples for existing links.
- `/score` remains as a legacy route outside the main recruiter navigation.

`scripts/localized-routes.mjs` explicitly registers English, Spanish and Portuguese pages, including legacy `/en` aliases. Add new translated page names to its route list. Language links retain the current section. Canonical and alternate metadata refer to the same section; print pages are excluded from indexing and the sitemap.

## PDFs and QA

Run `pnpm build`, then `pnpm cv:pdf`, and visually review the PDF pages. Run `pnpm build` again to copy regenerated public PDFs into dist. Existing public filenames containing `Senior_Product_Engineer` preserve download URLs; PDF contents and browser download names use Full-Stack Engineer positioning.

QA writes ignored screenshots and a JSON report under `.qa/`. It checks 48 combinations of locale, route and viewport (320, 390, 768 and 1440px), plus dark theme, the keyboard skip link, navigation persistence, runtime errors, print output, 21 localized aliases and robots/sitemap responses. Set `CV_PDF_DIR` to write temporary PDF candidates without replacing the public downloads. Automated accessibility checks complement visual and keyboard review; they do not establish complete conformance.

See `review-notes.md` for evidence, verification and remaining content decisions. Keep salary expectations and unpublished client work out of public content. Local changes do not authorize a push or deployment.

See `dependency-review.md` for the dependency security update, compatibility decisions and verification.
