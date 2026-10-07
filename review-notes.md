# CV review — local draft

Repository: https://github.com/d1urno/profile (verified against local origin).
Baseline: c0ad855, master; original checkout was clean.

## Content decisions pending

- Current timeline is verified from the user's LinkedIn screenshot: Switch Energy, Senior Full Stack Developer, October 2025–Present (Cape Town, hybrid); Defijn September 2024–August 2025; TROOP December 2021–February 2024; Airbank February–August 2021; CTRL.365 January 2019–February 2020. Exact visible titles are reflected in the content. No end date is inferred for Switch.
- The user subsequently confirmed exact Switch copy: contribution to prototyping, building and shipping an energy trading application with diagnostic metrics and energy allocation forecasting; maintaining production meter data management dashboards across React, Material UI, TypeScript, Recharts, NestJS, MongoDB and AWS; technical support and product feedback from new clients. The English description is preserved verbatim, with faithful Spanish/Portuguese translations. Switch remains current; past-tense responsibility wording does not imply departure.
- Confirm concrete outcomes and scope (team sizes, user/customer impact, delivery or reliability improvements) for Troop, Airbank and recent work before adding metrics.
- Confirm which recent projects can be described publicly, and personal ownership of the Trace CDR demo.
- Confirm practical remote-working constraints and preferred employment/contract arrangement. Salary target belongs in the private search, not the public CV.
- MongoDB is now verified through the user's Switch description. SQLite remains a target preference and is not listed as professional experience.
- The user confirms 15+ years of development, work from prototypes through production maintenance, and finance/energy/AI applications. Detailed earlier roles before 2019 remain missing.

## Evidence

- Existing CV source supplies the retained project responsibilities and historical Matera/Paraná dates. The LinkedIn screenshot supplies the updated role titles and month/year dates, and the user supplies Switch responsibilities and stack.
- https://github.com/d1urno/nuxt-image-extractor is public and archived. README documents downloading CMS images into generated Nuxt sites and rewriting their references. Present as historical open source, not an actively maintained module.
- Trace CDR and two frontend challenges were already linked publicly in the CV. Keep their scope clearly labeled as demos/challenges.
- LinkedIn browser access was unavailable (supported laptop browser inventory returned no browsers). The user's LinkedIn screenshot supplies the visible titles/dates that supersede the stale site timeline.

## Compact-tab follow-up — verified in the running preview

The first padding reduction reached the existing localhost:4321 server: computed padding was 8px vertically, label font remained 20px, and widths were unchanged. Desktop tabs measured 49px high because flex rows stretched the unselected tabs to the selected tab's height. No stale output or competing size rule was found.

The correction uses 16px labels, a 20px line height, 4px vertical padding and vertically centered text within 44px targets. Gaps, weight, uppercase labels, selected bottom highlight, 1s reveal, 25px glow and trailing cursor gap are preserved. The animation layer shares the centered text geometry.

Measured directly at http://localhost:4321 across 320/390/768/1440px and English/Spanish/Portuguese: all tab widths reduced by 20%; all heights are 44px; smallest width is 49.75px. At 390px and 1440px, English Overview changed from 103.03 × 49px to 82.42 × 44px, and Experience from 116.05 × 49px to 92.84 × 44px. Spanish/Portuguese Experiencia/Experiência changed from 125.81 × 49px to 100.64 × 44px. Thirty live-preview tab glyph comparisons across mobile/desktop and locales had zero base/animated position or size deviation. Before/after crops were visually reviewed.

Lint, Astro check, Vue type checking/build and full browser/PDF QA passed again: 60 route/viewport cases plus dark accessibility, no runtime errors or automated WCAG violations; all targets are at least 44px wide and exactly 44px high. Hover/leave/re-entry, keyboard focus, reduced motion, arrow alignment and exterior glow checks passed. All three PDFs retain identical text, two-page count and raster rendering; public/Library PDFs were preserved. No dependency changes; the previous zero-vulnerability audit remains applicable.

Evidence: ignored `.qa/live-tabs-before.json`, `live-tabs-after.json`, `live-tabs-comparison.json`, `live-tab-alignment.json`, before/after screenshot crops, and the refreshed browser/animation/glow/PDF reports. Existing server was not stopped or reconfigured. The unrelated local photo-sizing edit remains outside this commit.

## Visual restoration and final verification — 7 October 2026

- Restored the Score navigation tab in all three languages, its site notes and original saved PageSpeed image. The local image's caption identifies it as a saved snapshot rather than a fresh performance claim.
- Restored GitHub, LinkedIn and Twitter/X icons using the checked-in SVG component. Links retain their destinations, accessible names and 44px targets, with hover/focus scaling and reduced-motion support.
- Tabs and ordinary links use the original shared reveal/cursor/glow layer: a one-second transition, cubic-bezier(0.4, 0, 0.2, 1), zero delay and 25px drop shadow. Glow remains visible beyond the link bounds. Accessible light-theme colors and keyboard focus treatment complement the original behavior.
- Preserved the approved inter-tab gaps, uppercase typography and selected bottom highlight. Selected tabs have no idle vertical line; they animate on hover/focus like other tabs. Final tab padding is 0.5rem vertically and zero horizontally, with measured 46–49px heights.
- The animated line ends 0.2rem (3.2px at the site's base font size) after the complete label, including trailing arrows. Text and arrow share one inline layout inside the flex link; this fixes the offset caused by separate flex items trimming the base text's trailing whitespace. Decorative arrows and the animated copy are excluded from accessible names.
- Restored mobile tab scrolling after navigation; repeated clicks, page swaps and back/forward navigation retain the correct active tab and locale.
- Preserved verified CV facts, role positioning, dependency versions, DevCLI configuration and public PDF files. The real DevCLI validator and target plan accepted the configuration; the user confirmed project startup. The existing development server/port was left running.

Final checks:

- `pnpm lint`: passed.
- `pnpm check`: 28 files, zero errors/warnings/hints.
- `pnpm build`: passed, including Vue type checking; 28 static pages.
- `pnpm audit`: zero known vulnerabilities.
- `pnpm cv:pdf` with `CV_PDF_DIR=.qa`: passed. 60 route/locale/viewport combinations plus dark home accessibility; zero browser runtime errors and zero automated WCAG A/AA violations. Keyboard skip link, theme persistence, navigation, touch targets, local Score image, social icons, aliases and print metadata passed.
- 90 base/animated arrow geometry comparisons across locales, viewports, focus and re-entry: maximum deviation 0.015625px. Eight animation cycle sets sampled 1,641 frames; reveal width and glow remained synchronized through entry, exit and interrupted re-entry. Timing/blur and trailing-gap assertions passed.
- Eight light/dark tab, ordinary-link and arrow-link screenshot comparisons proved the glow renders outside the bounds (7,152–14,698 changed exterior pixels per comparison). Desktop/mobile, idle selection, hover/focus and Score screenshots visually reviewed.
- All three PDF candidates: two pages, identical extracted text/order and identical rasterized page rendering to the delivered PDFs. Candidate bytes differ because of generation metadata; existing public downloads and Library copies were preserved.
- `git diff --check`: passed. No push, PR, deployment or fresh production performance audit performed.

Evidence is in ignored `.qa/browser-report.json`, `arrow-geometry.json`, `animation-cycles.json`, `glow-proof.json`, `glow-exterior-results.json` and `pdf-dependency-comparison.json`, alongside screenshots and temporary PDF candidates.

## Initial CV checks (before dependency modernization and visual restoration)

- `pnpm run lint`: passed, no warnings after flat-config repair.
- `pnpm run check`: passed, no errors/warnings/hints.
- `pnpm run build`: passed. The existing i18n integration emits an informational warning about the non-translatable robots.txt endpoint.
- `pnpm run cv:pdf`: passed, 48 locale/route/viewport cases, keyboard skip link, theme persistence, no browser runtime errors, no automated WCAG A/AA violations on the checked routes.
- All three regenerated PDFs: two pages each, text extracted and all six pages rasterized and visually reviewed. Existing public PDF URLs preserved; role and download names updated.
- Mobile, desktop, dark theme and print screenshots are in ignored `.qa/` with `browser-report.json`.
- No standalone unit test suite existed; browser regression checks were added for the changed behavior. No deployment, remote push or production performance audit was run.

## Baseline checks

- `pnpm run build`: passed (Node 24.15.0, pnpm 10.17.0).
- `pnpm run lint`: failed before linting; obsolete `--ignore-path` flag under flat ESLint configuration.
- No automated test suite configured.

No push, PR, deployment or public availability announcement is authorized.
