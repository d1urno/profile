# Dependency review — 7 October 2026

The GitHub API returned 183 open Dependabot alerts covering 153 distinct advisories and 33 package names on the remote default branch. The local baseline audit returned 197 distinct advisories (212 vulnerable dependency occurrences: 4 critical, 105 high, 82 moderate, 21 low). These counts represent different dependency snapshots and counting methods.

## Changes

- Upgrade Astro 5.12.8 to 7.3.6 and Vue integration 5.1.0 to 7.0.3. The critical [AVIF advisory](https://github.com/withastro/astro/security/advisories/GHSA-26w7-cxv4-gfx2) requires Astro 7.2.8 or newer. Follow the official [v6](https://docs.astro.build/en/guides/upgrade-to/v6/) and [v7](https://docs.astro.build/en/guides/upgrade-to/v7/) migrations: glob content loaders, `render(entry)`, Zod import, unified Markdown processor and explicit HTML whitespace compatibility.
- Upgrade Vue 3.5.18 to 3.5.43, Vite 7.0.6 to 8.3.3, Tailwind 4.1.11 to 4.3.3, ESLint to 10.12.0 and maintained compatible tooling. Keep TypeScript on supported 5.9.3 because typescript-eslint supports TypeScript below 6.1; keep Node types on the actual runtime's 24 line.
- Remove unused VueUse, legacy ESLint/TypeScript configs and patches. Replace npm-run-all with maintained npm-run-all2, retaining the same build command.
- Replace astro-icon with a small component rendering checked-in SVG assets. This removes the unused icon download/archive extraction chain, including unpatched extract-zip advisories.
- Replace astro-i18n-aut with explicit local Astro routes and locale detection. This removes its unpatched [braces stack exhaustion](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm) dependency chain, preserving all localized and legacy URLs.
- Use a narrow `@tailwindcss/typography>postcss-selector-parser` override to 7.1.6. The [upstream changelog](https://github.com/postcss/postcss-selector-parser/blob/main/CHANGELOG.md) identifies the security fix and v7's safe insertion change. Typography's selector processing was inspected, then exercised by the full build and visual/PDF checks. Remove the override when typography adopts the patched version itself.
- Set safe direct dependency minimums, a pnpm version, Node runtime requirements and the explicit esbuild installation-script allowlist. No audit advisories are ignored or suppressed.

## Verification

- Frozen-lockfile forced reinstall: passed, including esbuild's installation check.
- Final `pnpm audit`: **zero known vulnerabilities**, all severities. Locked graph: 762 dependency occurrences.
- `pnpm lint`: passed. `pnpm check`: 28 files, zero errors, warnings or hints. `pnpm build`: passed, 28 static pages; no previous translation warning or Markdown deprecation remains.
- Browser QA: 48 viewport/locale/main-route checks plus dark theme, zero automated WCAG violations and runtime errors; keyboard skip link and navigation/theme persistence passed. All 21 locale aliases, robots and sitemap respond successfully. QA caught an Astro 7 URL normalization difference, fixed centrally for navigation, locale detection and canonical URLs.
- Desktop and mobile screenshots reviewed. All three temporary PDF candidates remain two pages; extracted text and rendered pixels match the previously delivered PDFs exactly. Only generated PDF metadata differs, so the original public PDF bytes and existing Library artifacts are preserved.

This is a static site. Astro's server/island/image-service findings and most transitive dependencies concern development or build execution rather than code running on the deployed static host. Vue and its browser output are shipped; Node lint, glob, archive and CSS tools are not shipped as server processes. The dependencies were still fixed or removed rather than relying on that distinction.

GitHub alerts remain open on the remote repository until an authorized push updates its analyzed lockfile. Nothing was pushed, published or deployed. A clear audit is a point-in-time registry check, not a guarantee against future advisories.
