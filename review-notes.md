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

## Final checks

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
