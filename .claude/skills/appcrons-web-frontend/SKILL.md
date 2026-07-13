---
name: appcrons-web-frontend
description: Use when working in this repo (the appcrons-web Next.js frontend) — adding or changing pages, components, forms, API calls, or state. Covers App Router structure, component conventions, styling, data-fetching, auth, and build conventions actually used here.
---

# Appcrons web frontend (Next.js)

Frontend for the Appcrons SaaS: a tool that optimizes uptime of free-tier backend instances
(e.g. on Render) by making periodic HTTP requests at defined intervals. Talks to the Go backend
in the sibling `appcrons` repo.

- Next.js `14.2.3`, **App Router** (no `src/pages` dir), React `18.3.1`, TypeScript `5.5.4`
  (`strict: true`), package manager **pnpm**.
- Backend base URL is **hardcoded per `NODE_ENV`** in `src/constants/index.ts`, not
  env-configurable:
  ```ts
  // development & test -> http://localhost:8080/api/v1, client http://localhost:3000
  // everything else     -> https://keep-active-backend-v2.onrender.com/api/v1,
  //                        client https://appcrons.netlify.app
  ```
  Don't add a `NEXT_PUBLIC_API_URL` env var expecting it to be read — it won't be.

## Directory map

```
src/
  app/                       App Router — routes AND most components live here (see note below)
    admin/                    admin-only pages (user list/detail, admin view of a user's app)
    app/                      "My Applications": list, detail, create/update/enable/disable/delete
    auth/                     login, signup, forgot/reset password; actions/ (server actions),
                               api/ (route handlers: sets/clears the session cookie)
    dashboard/                main dashboard page
    docs/                     public docs pages
    feedback/                 feedback submission
    home/                     marketing/landing sections used by root page.tsx
    layouts/                  shared layout COMPONENTS (DashboardLayout, DocsLayout, etc.) —
                               these are plain components, not Next.js layout.tsx route files
    request/                  "Request Time Frame" feature: schedule cards, list/table, chart
    settings/                 account settings page
    shared/                   reusable UI primitives (Button, Card, Modal, InputField, ...),
                               Icons/ (one SVG component per file), loader/
    layout.tsx                the ONLY real layout.tsx in the tree (root)
    page.tsx                  "/" landing page
    globals.css                Tailwind + CSS custom properties for theming
  constants/                 backendURL / clientURL derived from NODE_ENV
  hooks/                     typed Redux hooks, live-request polling, window width, isClient, logout
  lib/
    router-events/            wraps next/link + next/navigation to fire page-load-progress events
    session.ts                 server-side Session class (cookie mgmt via next/headers)
  middleware.ts              route protection + auth redirects
  providers/                 ReactQuery, Redux, Theme, PostHog, IsClient providers + root composer
  routes/                    static route-group definitions (conceptual only, not read by middleware.ts)
  services/                  one API client class per backend resource (fetch wrappers)
  store/                     Redux Toolkit: reducers/, actions/, index.ts (makeStore, typed hooks)
  styles/                    scrollbar.css (extra global CSS)
  types/                     one file per domain, exported type aliases prefixed `T`
  utils/                     small pure utility functions, one per file
public/                      static assets, docs screenshots
testsprite_tests/            TestSprite-MCP-generated Python E2E tests (see Testing below)
```

**Important:** there is no `src/components` directory in actual use, even though
`tailwind.config.ts`'s content globs still reference `./src/components/**/*` and
`./src/pages/**/*`. Reusable components live in `src/app/shared/`; feature-specific components
live directly inside their feature folder next to that route's `page.tsx`. Follow this when
adding new components — don't create a `src/components` dir.

## Routing (App Router)

Full route inventory:

| Route | File |
|---|---|
| `/` | `src/app/page.tsx` |
| `/dashboard` | `src/app/dashboard/page.tsx` |
| `/settings` | `src/app/settings/page.tsx` |
| `/app/[appId]` | `src/app/app/[appId]/page.tsx` (uses `generateMetadata`, server-side fetch via `Session`+`AppService`) |
| `/admin/users` | `src/app/admin/users/page.tsx` |
| `/admin/users/[userId]` | `src/app/admin/users/[userId]/page.tsx` |
| `/admin/users/[userId]/app/[appId]` | nested dynamic route |
| `/auth/login`, `/auth/signup` | `src/app/auth/{login,signup}/page.tsx` |
| `/auth/forgot-password` | `src/app/auth/forgot-password/page.tsx` |
| `/auth/reset-password/[resetToken]` | dynamic route |
| `/auth/api` (GET, route handler) | `src/app/auth/api/route.ts` — sets httpOnly `session` cookie |
| `/auth/api/logout` (POST, route handler) | `src/app/auth/api/logout/route.ts` — clears cookie |
| `/docs`, `/docs/get-started`, `/docs/add-application`, `/docs/add-request-time-frame`, `/docs/how-appcrons-works` | `src/app/docs/...` (middleware redirects `/docs` → `/docs/get-started`) |

Only one `layout.tsx` exists in the whole tree (root, `src/app/layout.tsx`). "Layouts" like
`DashboardLayout`/`DocsLayout` are plain components imported into each `page.tsx`, not Next.js
route-segment layout files. No `error.tsx`/`not-found.tsx` anywhere, no route groups.

## Component conventions

- File name is PascalCase and matches the exported component name (`Button.tsx` exports
  `Button`). No barrel `index.tsx`. No co-located test or CSS-module files — styling is 100%
  Tailwind utility classes inline in JSX.
- `"use client"` on files that use hooks/browser APIs/interactivity. Server components for simple
  async wrappers — e.g. `DashboardLayout.tsx` is `async` and calls `await new
  Session().getSync()` server-side with no `"use client"`; `app/[appId]/page.tsx` uses
  `generateMetadata` (server-only).
- Props typed as `interface <Component>Props extends React.HTMLAttributes<...>`, components
  declared as `const X: React.FC<Props> = (props) => {...}`, often root-wrapped in `<Fragment>`.
  Example (`Button.tsx`):
  ```ts
  interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
    className?: string;
    label: ReactNode;
    type: "submit" | "reset" | "button";
    onClick?: () => void;
    disabled?: boolean;
  }
  const Button: React.FC<ButtonProps> = (props) => { ... };
  ```
- HOC auth-gating pattern for pages, e.g. `src/app/auth/PageAuthWrapper.tsx`:
  ```ts
  export const PageAuthWrapper = (PageComponent: React.FC) => {
    const AuthComponent: React.FC = (props) => {
      const isLoggedIn = useAppSelector((state) => !!state.auth.accessToken);
      return <div>{isLoggedIn && <PageComponent {...props} />}</div>;
    };
    return AuthComponent;
  };
  // usage: export default PageAuthWrapper(App);
  ```
- Icons: one SVG per file under `src/app/shared/Icons/`, named `<Name>Icon.tsx`.

## Styling

- Tailwind CSS only. No shadcn/ui or Radix — primitives (`Modal`, `Card`, etc.) are hand-rolled,
  except `@headlessui/react` (used for dropdowns/menus in `NavDropDown.tsx`,
  `MobileNavMenu.tsx`).
- Custom theme colors in `tailwind.config.ts`: `primary` (#087f5b), `primary-light`, `secondary`,
  plus a set of `color-*` tokens (`color-text-primary`, `color-bg-primary`, etc.) that map to CSS
  custom properties defined in `src/app/globals.css`. Dark mode works by overriding those CSS
  vars under `[data-theme="dark"]`, driven by `next-themes`. Semantic colors: `success`, `error`,
  `info`, `warning`.
- `twMerge` (from `tailwind-merge`) is used in shared components to merge default classes with a
  `className` prop — follow this pattern for new shared components that accept `className`.
- No Tailwind plugins registered.
- **Installed but not actually used — don't reach for these**: `@material-tailwind/react`, the
  MDX packages (`@mdx-js/*`, `@next/mdx` — no `.mdx` files exist and `next.config.mjs` has no MDX
  wiring), and `zustand` (only wired up in one file, `src/store/notification.ts`, which appears
  to be legacy/unused — Redux Toolkit is the real store).

## State & data fetching

- **Redux Toolkit** is the canonical client-side store. `src/store/index.ts`'s `makeStore()`
  combines slices: `auth`, `notification`, `app`, `request`, `appLiveRequest`, `pageLoader`,
  `sidebar`. Each domain has `store/reducers/<domain>.ts` (createSlice) and
  `store/actions/<domain>.ts` (thin thunk-style dispatch wrapper functions). Typed hooks
  (`useAppDispatch`, `useAppSelector`, `useAppStore`) live in `src/hooks/redux.ts`.
- **React Query** (`@tanstack/react-query`) handles fetching/caching. The established
  two-step pattern for a new data-driven feature: call the API via `useQuery`/`useMutation` in a
  client component, then push the result into Redux via `dispatch(...)` inside a `useEffect` —
  React Query owns fetch/cache, Redux is the app-wide source of truth afterward. Example:
  ```ts
  const { data } = useQuery({
    queryKey: [`app-${appId}`],
    queryFn: () => new AppService().get(appId),
  });
  useEffect(() => { if (data) dispatch(addOneApp(data)); }, [data]);
  ```
  `ReactQueryProvider` sets `staleTime: 2000` for queries, `networkMode: "always"` for mutations.
- **API client layer**: `src/services/*.service.ts`, one class per backend resource
  (`AuthService`, `AppService`, `AdminService`, `FeedbackService`, `RequestService`). Each method
  is a hand-written `fetch()` call: check `response.ok`, `throw new Error(error.message)` on
  failure, else return parsed JSON. No axios, no shared fetch wrapper/interceptor — follow this
  same hand-rolled pattern for new service methods, and attach
  `Authorization: Bearer ${accessToken}` manually where needed.
- Live/real-time updates use SSE (`event-source-polyfill` + `src/hooks/UseGetAppLiveRequest.tsx`),
  feeding the `appLiveRequest` Redux slice.
- Provider composition (`src/providers/Index.tsx`): `ReactQueryProvider > ReduxProvider >
  IsClientCtxProvider`, applied around `<html>` in `src/app/layout.tsx` alongside separate
  `PHProvider` (PostHog) and `ThemeAppProvider` (next-themes).

## Auth

- Server-side session cookie management via `src/lib/session.ts`'s `Session` class (`create`,
  `get`, `getSync`, `getBearerToken`, `clear`) — decodes the JWT with `jwt-decode` and sets an
  httpOnly `session` cookie via `next/headers`.
- `src/middleware.ts` protects `/dashboard`, `/app`, `/settings` — redirects to `/auth/login` if
  there's no session cookie or the JWT is expired (checked via `jwt-decode`'s `exp` claim); also
  redirects away from `/auth/*` back to `/dashboard` if already logged in with a valid token;
  special-cases `/docs` → `/docs/get-started`; exempts `/auth/api*`.
- Client-side: after login/signup, `AuthService.authenticateClient()` calls the internal
  `/auth/api` route (GET) to set the httpOnly cookie server-side, and separately mirrors
  `{ accessToken, user }` into `localStorage` for client reads.

## Forms

- **Formik** + **Yup** for all forms. Example (`Login.tsx`):
  ```ts
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: Yup.object({
      email: Yup.string().max(255).required("email is required"),
      password: Yup.string().min(5).max(30).required("password is required"),
    }),
    onSubmit: async (values, helpers) => { /* mutate(values) via React Query */ },
  });
  ```
- Shared `InputField`/`InputSelect`/`InputTextArea` components take the `formik` object as a
  **prop** (`formik={formik}`) and read `formik.values/errors/touched/handleChange/handleBlur`
  internally — do not switch to Formik's `<Field>`/`<Formik>` context components, follow the
  prop-passing convention already in place.
- Form submit handlers are typically paired with a React Query `useMutation`, with
  success/error surfaced via Redux notification actions (`showCardNotification`/
  `hideCardNotification`, auto-hidden after 5s).

## Router wrapper

Import `Link` and `useRouter` from `@/lib/router-events` (not `next/link` / `next/navigation`
directly) — this wrapper fires page-load-progress events consumed by `OnPageLoadComplete` in the
root layout. Use Next's native `useParams`/`useSearchParams` directly from `next/navigation`
where needed (those aren't wrapped).

## TypeScript conventions

- `strict: true`. Single path alias `@/*` → `./src/*`, used pervasively.
- Types live in `src/types/<domain>.ts`, one file per domain (`admin`, `app`, `auth`, `date`,
  `feedback`, `notification`, `page`, `pageLoader`, `sidebar`). Exported type aliases (not
  interfaces) are prefixed `T`, e.g. `TApp`, `TAuth`, `TUser`, `TSigninInPut`, `TPostApp`.
  Component prop types are the exception — they're `interface <Component>Props`, declared inline
  in the component file, not in `src/types/`.
- `resolveJsonModule: true` — some feature data is imported directly as `.json` (e.g. `apps.json`,
  `times.json`, `timezone.json`).

## Testing

**No unit/component test framework is configured** — no Jest, Vitest, React Testing Library,
Playwright, or Cypress in `package.json`. The only test coverage is `testsprite_tests/`: Python
E2E scripts (`TC001`...`TC013`) generated by TestSprite MCP, covering signup/login/create app/
enable-disable/update/delete/request-time-frame flows, plus a `standard_prd.json` spec. These are
not run via any npm script — don't assume `pnpm test` exists.

## Build / lint / deploy

```
pnpm dev     # next --turbo
pnpm build   # next build
pnpm start   # next start
pnpm lint    # next lint
```
`.eslintrc.json` extends `next/core-web-vitals` with `react-hooks/exhaustive-deps` **disabled** —
this is intentional (the codebase has `useEffect` deps arrays that don't list every referenced
value), don't "fix" those warnings unasked.

Deployed on **Netlify** (`netlify.toml`; production `clientURL` = `https://appcrons.netlify.app`
per `src/constants/index.ts`). The Netlify config is close to the default Next.js template — no
custom redirects are active.

## Env vars

No `.env*` file is committed. The only two `process.env` reads in `src/` are
`NEXT_PUBLIC_POSTHOG_KEY` / `NEXT_PUBLIC_POSTHOG_HOST` (in `src/providers/PostHog.tsx`) plus the
built-in `NODE_ENV` (used only to branch `backendURL`/`clientURL` in `src/constants/index.ts`, as
noted above). There is no configurable API base URL env var.
