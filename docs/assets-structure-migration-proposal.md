# Asset Structure Analysis and Migration Proposal

Date: 2026-03-29
Scope: static assets, image paths, legacy-clone usage, and cleanup plan
Status: Phase 1 (legacy image path normalization) implemented with `_next` paths intentionally preserved

## 1) Executive summary

The project currently mixes three different static asset patterns:

1. Legacy clone assets: `/legacy-clone/assets/...`
2. Public images: `/images/...`
3. Generated artifact paths hardcoded in source: `/images/_next/image__asset__q_*.bin`

This causes confusion, brittle references, and duplicate files.

Important clarification:
- `legacy-clone` is already under `public` at `public/legacy-clone`.
- Deleting `public` is not feasible for a Next.js app that serves static assets.
- The right direction is to keep `public`, then normalize assets inside it.

## 2) What I found

### 2.1 Directory footprint

- `public/legacy-clone`: ~17 MB
- `public/images`: ~9.9 MB
- `public/images/_next`: ~7.1 MB

### 2.2 Duplicate assets exist in both locations

There are many overlapping files between:
- `public/legacy-clone/assets/images/*`
- `public/images/*`

Examples of duplicates:
- `aayush.webp`
- `projects/next-venture/screen1.jpeg`
- `projects/star-forge/screen1.jpeg`
- `site-img/icon.png`
- `uses/vscode_logo.png`
- `wings.svg`
- and many others

### 2.3 Source code references to legacy-clone

There are 20 references to `/legacy-clone/...` in source files (`app`, `components`, `lib`), including:
- Image links used in UI components
- CSS links in root layout
- RSS link in blog content

### 2.4 Source code references to generated `_next` bin files

There are 15 references to `/images/_next/image__asset__q_*.bin` in source files, located in:
- `app/about/page.tsx`
- `app/blog/page.tsx`
- `app/blog/[slug]/page.tsx`
- `app/guestbook/page.tsx`
- `app/links/page.tsx`
- `app/projects/page.tsx`
- `lib/blog-data.ts`
- `lib/project-detail-data.ts`

This is the highest-risk anti-pattern in the current setup.

## 3) Why this is a problem

1. Hardcoded `_next` bins are build artifacts, not stable source assets.
2. Duplicate files increase maintenance cost and inconsistency risk.
3. Two parallel image roots (`/legacy-clone/assets/images` and `/images`) make edits error-prone.
4. Team members cannot quickly tell the canonical source of truth.

## 4) Option analysis

## Option A: Keep both as-is

Pros:
- No migration effort.

Cons:
- Keeps all current confusion and technical debt.
- Future edits continue to break or drift.

Recommendation: Not advised.

## Option B: Remove `public` and rely on legacy-clone only

Pros:
- None in a standard Next.js static setup.

Cons:
- Breaks normal static asset serving convention.
- Incompatible with existing `/images/...` references.
- High breakage risk.

Recommendation: Reject.

## Option C: Normalize to a single canonical root under `public/images` (recommended)

Approach:
- Keep `public`.
- Use `public/images` as canonical image root.
- Stop using hardcoded `/images/_next/...` paths in source.
- Replace `/legacy-clone/assets/images/...` references with `/images/...` where equivalent files already exist.
- Keep non-image legacy assets (if still needed) separately until confirmed safe to retire.

Pros:
- Clean, standard, predictable static asset strategy.
- Removes build-artifact coupling.
- Reduces duplicates over time.

Cons:
- Requires careful path update and verification.

Recommendation: Best balance of safety and cleanup.

## 5) Proposed rollout (safe and staged)

## Phase 1: Stabilize source references (no physical move yet)

1. Replace all `/images/_next/image__asset__q_*.bin` references with stable real image paths in `/images/...`.
2. Replace `/legacy-clone/assets/images/...` references with equivalent `/images/...` paths where files already exist.
3. Keep `public/legacy-clone` folder untouched in this phase.
4. Validate all key routes: home, about, blog, projects, links, guestbook.

Outcome:
- App no longer depends on generated bin asset names.
- Main source paths are normalized without risky filesystem operations.

## Phase 2: De-duplicate and retire legacy image subtree

1. Confirm no source references remain to `/legacy-clone/assets/images`.
2. Move any missing files from legacy image subtree to `public/images`.
3. Remove duplicate files from legacy image subtree.
4. Keep other legacy folders (css/js/pages/other) only if still needed.

Outcome:
- Single image source of truth.

## Phase 3: Legacy-clone minimization

1. Re-evaluate legacy CSS/JS/doc links in:
   - `app/layout.tsx`
   - `app/blog/blog-content.tsx`
2. Migrate remaining required assets to standard locations if desired.
3. Remove unused legacy folders.

Outcome:
- Optional full cleanup, lowest long-term complexity.

## 6) Detailed migration targets (from current scan)

## 6.1 Files with hardcoded `_next` bin paths

- `app/about/page.tsx`
- `app/blog/page.tsx`
- `app/blog/[slug]/page.tsx`
- `app/guestbook/page.tsx`
- `app/links/page.tsx`
- `app/projects/page.tsx`
- `lib/blog-data.ts`
- `lib/project-detail-data.ts`

## 6.2 Files with `/legacy-clone/assets/images` references

- `components/sections/my-site-section.tsx`
- `components/sections/about-section.tsx`
- `components/sections/site-header.tsx`
- `components/sections/about-experience-section.tsx`
- `components/sections/contact-cta-section.tsx`
- `components/sections/hero-section.tsx`
- `components/sections/links-main-section.tsx`
- `components/sections/feature-grid-section.tsx`
- `lib/home-data.ts`

## 6.3 Files with non-image legacy references

- `app/layout.tsx` (legacy CSS links)
- `app/blog/blog-content.tsx` (legacy rss.xml link)

## 7) Risks and mitigations

Risk: broken images during path rewrite
- Mitigation: batch update by route, then run route-by-route verification

Risk: missing equivalent file in `/images`
- Mitigation: copy specific missing file first, then update path

Risk: accidental deletion of required legacy assets
- Mitigation: no deletion in Phase 1; delete only after zero-reference check

Risk: cache confusion in dev
- Mitigation: restart dev server after path rewrites and verify with fresh reload

## 8) Recommendation to approve

Approve Option C with phased rollout.

Approval scope I suggest for implementation:

1. Phase 1 only (safe):
   - Rewrite source paths to stable `/images/...`
   - Remove hardcoded `_next` bin paths from code
   - No folder deletion yet

2. Optional follow-up Phase 2:
   - De-duplicate and remove legacy image duplicates

If you approve, I will implement Phase 1 first and provide a per-file change report.

## 9) Execution update (implemented)

Implemented scope (approved):
1. Replaced source references from `/legacy-clone/assets/images/...` to `/images/...` in source code.
2. Kept all `_next` hardcoded image links unchanged for now, as requested.
3. Kept all `_next` files on disk unchanged (no deletion).
4. Copied missing profile assets to canonical location:
   - `public/images/trinhhao.webp`
   - `public/images/trinhhao.png`

Updated files:
- `components/sections/my-site-section.tsx`
- `components/sections/about-section.tsx`
- `components/sections/site-header.tsx`
- `components/sections/about-experience-section.tsx`
- `components/sections/contact-cta-section.tsx`
- `components/sections/hero-section.tsx`
- `components/sections/links-main-section.tsx`
- `components/sections/feature-grid-section.tsx`
- `lib/home-data.ts`

Verification summary:
- No remaining `/legacy-clone/assets/images` references in `app`, `components`, `lib` source files.
- `_next` references remain in code by design (temporary compatibility mode).
- No TypeScript errors found in checked critical files after migration.

## 10) Execution update (continued)

Implemented scope (safe dedup without breaking links):
1. Verified every file in `public/legacy-clone/assets/images` has an equivalent in `public/images`.
2. Moved the legacy image directory to external backup (outside repo):
   - `/home/nhannv/Hello/TrinhHao/Temp/aayushbharti-nextjs-recode-backup/legacy-images-20260329_214623`
3. Replaced `public/legacy-clone/assets/images` with a symlink to canonical image root:
   - `public/legacy-clone/assets/images -> ../../images`
4. Kept all `_next` paths and files unchanged as requested.

Why this is safe:
- Existing legacy paths continue to resolve because symlink preserves path compatibility.
- New/modern source paths already point to `/images/...`.
- No destructive deletion was applied inside the repository.

Rollback:
1. Remove symlink `public/legacy-clone/assets/images`.
2. Move backup folder back to `public/legacy-clone/assets/images`.

## 11) Execution update (structure cleanup)

Implemented scope:
1. Added Next.js compatibility rewrite in `next.config.ts`:
   - `/legacy-clone/assets/documents/blog/rss.xml` -> `/assets/other/rss`
   - `/legacy-clone/assets/images/:path*` -> `/images/:path*`
   - `/legacy-clone/assets/:path*` -> `/assets/:path*`
2. Removed `public/legacy-clone/assets/images` symlink folder so legacy-clone no longer contains an `images` subtree.
3. Moved non-image legacy asset folders from `public/legacy-clone/assets/*` into `public/assets/*`:
   - `css`, `fonts`, `js`, `other`, `videos`
4. Updated app runtime CSS references to canonical paths in `app/layout.tsx`:
   - `/assets/css/_next/static/chunks/42bc346dfa57e75d.css`
   - `/assets/css/_next/static/chunks/fdd8e3b6d7ffc309.css`
5. Kept `public/images` as the single canonical image storage.
6. Kept all `_next` links unchanged as requested.

Current structure result:
- Canonical images: `public/images/*`
- Canonical legacy bundle assets: `public/assets/{css,fonts,js,other,videos}`
- Legacy URL compatibility: handled by Next rewrites
- `public/legacy-clone/assets` is now empty (no duplicated asset tree)

Why this is cleaner:
- Removes duplicate image roots from the filesystem view.
- Keeps old links alive without needing physical duplicate folders.
- Makes future cleanup incremental and safer.
