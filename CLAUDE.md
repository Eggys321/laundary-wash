# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project status (read this first)

This is a **frontend-only build phase**. `server/` exists but is an empty placeholder — no backend has been started. Everything in `client/` runs on mock data held in Zustand stores with `persist` (i.e. localStorage standing in for a database). Every store is deliberately shaped like a future real API client (`login`, `register`, `addOrder`, `updateOrderStatus`, ...) so that migrating to a real backend later means swapping store internals for `axios`/React Query calls — not rewriting pages or components.

Do not `git add`/commit unless explicitly asked — the user commits their own work.

## Commands

All commands run from `client/` (there is no root-level package.json script runner):

```
cd client
npm run dev       # Vite dev server
npm run build     # tsc -b && vite build — treat a clean build as the acceptance bar
npm run lint      # eslint .
```

No test suite is configured. There is no `npm test`. When verifying a change works, prefer: `npx tsc -b`, `npx eslint .`, `npm run build`, and if UI/visual correctness matters, drive it with Playwright (install into the session scratchpad, not the project — see "Verifying UI changes" below).

## Tech stack: documented vs. actual

Root `README.md` documents a MERN stack (Yup, `services/`/`types/`/`utils/` folders). **The actual implementation deviates** — this was a real gap found mid-project, not a deliberate redesign, so don't "fix" the deviation without asking:

- Validation is **Zod** (not Yup), paired with `react-hook-form` + `@hookform/resolvers/zod`.
- Utilities live in `src/lib/` (not `services/`/`utils/`); there is no dedicated `types/` folder — types are colocated with the schema/store/data file that owns them.
- Everything else (React 19, TypeScript, Vite, Tailwind v4, React Router v7, Zustand, `react-hot-toast`, `dayjs`, `lucide-react`) matches the README.
- Coding/naming conventions from the README **are** followed: PascalCase components, camelCase hooks/utils, `<Name>Props` interfaces, UPPER_SNAKE_CASE constants.

## Hard project rule: no comments

The codebase intentionally has **zero comments** anywhere in `src/` — not even section-header JSX comments. The only exception is the `/// <reference types="vite/client" />` triple-slash directive in `vite-env.d.ts`, which is a required TypeScript directive, not a comment. New code must follow the same rule. Periodically re-verify with:

```
rg "\{/\*|^\s*//|/\*[\s\S]*?\*/" src --multiline
```

## Architecture

**Routing** (`src/routes/index.tsx`): a single `createBrowserRouter` wraps everything in one pathless `RootLayout` (which renders `<ScrollRestoration />` — required because data routers don't reset scroll on navigation by default). Under it, three sibling branches:
- `/` → `CustomerLayout` (public Navbar/Footer) → public pages, plus a nested `AccountLayout` branch (`/profile`, `/orders`, `/notifications`, `/settings`, `/payments`, `/support`) and `/book`, all wrapped in `<ProtectedRoute>`.
- Pathless `AuthLayout` branch → `/login`, `/register`, `/forgot-password`.
- `/admin/*` → `AdminLayout`, wrapped in `<ProtectedRoute role="admin">`.

Every page component is `React.lazy`-loaded and wrapped in a shared `withSuspense` helper (`<Suspense fallback={<PageLoader />}>`) for route-level code splitting.

**Auth & roles** (`store/authStore.ts`, `data/mockUsers.ts`): one unified `AuthUser`/`RegisteredAccount` shape with a `role: "customer" | "admin"` field — there is deliberately **no separate admin auth system**. `ProtectedRoute` takes an optional `role` prop to gate by role; everything else (login redirect target, which dropdown links show) branches on `user.role` at render time. The persisted store has a `merge` function (not just `partialize`) that backfills any seed accounts missing from a user's existing localStorage by id — this exists because adding the admin seed account after some users already had the customer-only shape persisted silently broke admin login until this was added. Any future change to `SEED_ACCOUNTS` needs this same backfill to not repeat that bug.

**Shared account dropdown** (`layouts/components/AccountMenuLinks.tsx`): the single source of truth for the account nav list (Personal Information/Orders/Notification/Settings/Payments/Support/Logout, plus **Dashboard prepended when `role === "admin"`**). It is rendered identically in three places — desktop customer `DesktopUserMenu`, mobile customer `MobileUserMenu`, and the admin `Topbar` dropdown — so a change to the list only needs to happen once. The admin's mobile drawer (`AdminMobileDrawer`) also reuses `MobileUserMenu` directly (not a copy) for its bottom profile section, mirroring the customer `MobileDrawer` structure exactly (single hamburger on the right, drawer slides from the right, profile/account section pinned at the bottom).

**Admin section** (`pages/admin/*`, `components/admin/*`): Dashboard/Orders/Revenue/Users/Deliveries all share `AdminPageHeader` (title + Export CSV), `StatCard`, and `ActivityTable` (status filter chips + pagination + the `RowActionsMenu` popover for View Details/Accept/Reject — Accept/Reject only render when the order is `pending`). `lib/adminData.ts` builds the "Recent Activity" feed by merging registrations (from `authStore.accounts`) and orders (from `ordersStore.orders`) into one sorted list — Dashboard shows both; Orders/Deliveries show order-derived entries only. Admin reads the *same* `ordersStore` the customer booking flow writes to — there's only one shared order list in this mock phase (not yet scoped per-user), so a booking made as the customer account is visible to the admin account and vice versa. CSV export (`lib/csv.ts`) is a real client-side Blob download, not a stub — it exports whatever rows are currently on screen (i.e. post-search-filter).

**Booking flow** (`pages/BookingPage.tsx`, `features/booking/*`): a single-route multi-step wizard (Pick-Up → Details → Summary → Payment), not separate routes per step — state lives in `BookingPage` and is passed down as props. Payment is Paystack Inline JS (`lib/paystack.ts`, loaded via a dynamically-injected script tag, not an npm package) for card, or Cash on Delivery. Cash orders are created with `paymentStatus: "pending"` and the success screen shows a "pay on delivery" reminder — cash and Paystack are not treated as equivalent "paid" states; don't collapse that distinction back together.

**Mock data layer** (`data/*.ts` + `store/*.ts`): `data/` holds seed/shape definitions (`mockUsers`, `mockOrders`, `mockNotifications`, `mockTestimonials`, `siteData`), `store/` holds the Zustand wrappers around them (`authStore`, `ordersStore`, `contactStore`, `adminSearchStore`). `adminSearchStore` is a small unpersisted store so the Topbar's single search input can filter whichever admin page/table is currently mounted without prop drilling.

## Environment variables

`client/.env` (gitignored) holds `VITE_PAYSTACK_PUBLIC_KEY` — a real Paystack **test** public key is already configured there. `client/.env.example` is the committed template (kept blank intentionally — never put a real value in the example file). The Paystack **secret** key must never be added to this project at all; it only has meaning once a real backend exists to hold it.

## Demo credentials

- Customer: `customer@demo.com` / `Demo1234`
- Admin: `admin@demo.com` / `Demo1234`

## Verifying UI changes

For anything visual or interaction-dependent (responsive layout, dropdown behavior, contrast), don't rely on reading JSX alone — code-level reasoning has missed real bugs in this project before (an invisible-text contrast bug, a mobile sidebar overflow bug). The effective pattern used throughout this project: install Playwright into the session's scratchpad directory (`npm install playwright` there, `npx playwright install chromium`) rather than as a project dependency, start `npm run dev`, and script a headless Chromium session to screenshot and measure `document.documentElement.scrollWidth` vs `clientWidth` (a mismatch means horizontal overflow) at both desktop and mobile viewports. Always stop the dev server and remove the generated `dist/` afterward.

## Known deliberate gaps (not bugs)

- `home-img-hero.png` is ~1.5MB, unoptimized, flagged repeatedly as the top pre-launch performance item — not yet fixed because it requires re-exporting the asset, not a code change.
- Orders are not scoped per-user yet (see "Admin section" above) — expected to be fixed once a real backend models per-user orders.
- `README.md`'s "Revenue/Users/Deliveries" admin pages, the Paystack secret-key flow, and real email delivery (password reset, contact form) are all designed for but not implemented — see the backend plan discussed in conversation history for the intended approach (Express + MongoDB/Mongoose + JWT + bcrypt, in the README's documented folder structure) before starting that work.
