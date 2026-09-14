# Milestone 2 — Admin application shell

Implemented locally on `feat/admin-shell-milestone-2`, ready for review.
No commit, push, deployment, merge, or pull request was made. The pre-existing
README local-run instructions were preserved.

## Starting point

The inspected checkout rendered the dashboard at `/` and used `href="#"` sidebar
links. It did not yet contain the `/admin` layout or planned section routes
described in the task. The existing dashboard and blue/slate styling were reused.

## Completed

- `/` redirects to `/admin`. Only `/admin` receives the admin shell, leaving future
  employee/public portals outside that layout.
- Desktop navigation collapses to an icon rail with accessible link names and
  native hover titles. The preference survives refresh where storage is available.
- Below 1024px, a modal navigation drawer provides every admin link. It closes on
  navigation, Escape, the close control, backdrop click, or a resize to desktop.
- Active route indications, breadcrumbs, a skip link, and visible keyboard focus.
- A demo account disclosure with working links to planned settings and user pages.
  It supports Tab, arrows, Home/End, Escape, and outside dismissal. It has no fake
  sign-in/sign-out action and explicitly says no permissions are enforced.
- **Find a page** filters page names and navigation groups. Ctrl+K / Cmd+K opens
  it; arrows select; Enter navigates; Escape closes. Empty search results are
  announced. Dialogs contain Tab/Shift+Tab focus and restore the opening control.
- System/light/dark themes, browser preference persistence, system-change updates,
  cross-tab preference synchronization, and safe blocked-storage fallbacks.
  An inline bootstrap applies theme and sidebar state before page content paints;
  React subscribes through hydration-safe external-store snapshots.
- Shared page headings, button links, planned empty states, loading UI, route/root
  error boundaries, and not-found recovery links. Global errors offer full reload.
- Demo labels replace the misleading live/security claims. Dashboard actions link
  to feature plans; inactive per-record action buttons were removed.
- Shared semantic shell colours, reduced-motion support, and responsive sizing.

## Changed files

| Area | Files |
| --- | --- |
| Routing | `src/app/page.tsx`, `src/app/admin/layout.tsx`, `src/app/admin/page.tsx`, `src/app/admin/[section]/page.tsx` |
| Recovery/loading | `src/app/error.tsx`, `src/app/global-error.tsx`, `src/app/not-found.tsx`, `src/app/admin/error.tsx`, `src/app/admin/not-found.tsx`, `src/app/admin/loading.tsx` |
| Shell | `src/components/admin-shell.tsx`, `src/components/admin-navigation.tsx`, `src/components/account-dropdown.tsx`, `src/components/page-finder.tsx`, `src/components/theme-toggle.tsx` |
| Shared UI/state | `src/components/ui/modal.tsx`, `src/components/ui/page.tsx`, `src/lib/admin-navigation.ts`, `src/lib/preferences.ts` |
| Appearance/demo | `src/app/layout.tsx`, `src/app/globals.css`, `src/features/dashboard/dashboard.tsx` |
| Tooling | `package.json`, `package-lock.json`, `playwright.config.ts`, `tests/admin-shell.spec.ts` |
| Documentation | `README.md`, `docs/ROADMAP.md`, `docs/MILESTONE-2.md` |

## Verification

- `npm run lint`: passes.
- `npm run build`: passes, including TypeScript and route prerendering. The build
  script uses Webpack after repeated local Turbopack worker-port permission errors.
- `npm run test:e2e`: 21 Chrome tests pass against the local production server.
- Every sidebar destination was clicked and directly loaded. Root redirect,
  breadcrumbs, active links, dashboard destinations, account links, unknown admin
  routes, unknown global routes, and return-to-overview links were checked.
- Page finder filtering, no results, both keyboard shortcuts, arrow selection,
  Enter navigation, focus containment/restoration, and account focus were checked.
- Explicit theme and sidebar preferences survive refresh. System theme follows
  browser changes. Invalid stored values and unavailable storage were tested.
- The saved dark theme was present on the first animation frame containing page
  content under a light system preference. Tested routes showed no hydration or
  browser console errors during the theme/layout checks.
- Light and dark screenshots were reviewed at 768, 1024, 1280, 1440, and 1920px.
  Tests assert no horizontal document overflow at each width, including collapsed
  desktop navigation. A 375px/reduced-motion check also passes.
- Screenshots are generated under `test-results/`; failures retain screenshots
  and traces. This directory remains ignored by Git.

## Limitations

- Chrome was tested. Safari, Firefox, physical touch devices, and screen-reader
  behaviour have not been verified. This is not a full accessibility audit.
- Loading and error fallbacks compile and were reviewed in code, but no artificial
  latency or application failure was injected to exercise them in the browser.
- Cross-tab synchronization is implemented but is not covered by the browser suite.
- When storage is blocked, preferences apply for the current document but cannot
  persist across a full reload; the app safely returns to the system default.
- Google fonts retain the foundation's network requirement for uncached builds.
- Dashboard values are fictional. There is no CRUD, upload, authentication,
  permission enforcement, backend, cloud service, AI integration, or Terraform.
- Milestone 3 and all later milestones remain out of scope and unstarted.

## Local commands

```bash
cd /Volumes/Sabari/cloudpress-ai-secure
npm ci
npm run dev
```

Open `http://localhost:3000/admin` (use the port printed by Next.js if 3000 is busy).
Stop the server with `Ctrl+C`. If the observed Turbopack worker error occurs in
development, use `npm run dev -- --webpack`.

```bash
npm run lint
npm run build
npm run test:e2e
```

The browser suite expects installed Google Chrome and owns port 3100 during its
run. To use Playwright's Chromium instead:

```bash
npx playwright install chromium
PW_CHANNEL=chromium npm run test:e2e
```

To review the built application on a separate local port:

```bash
npm start -- --hostname 127.0.0.1 --port 3100
```

Open `http://127.0.0.1:3100/admin`. Stop this server before rerunning browser tests.
