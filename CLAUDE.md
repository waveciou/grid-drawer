# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — Start the Vite dev server (root is `src/`). The dev entry `src/index.html` immediately redirects to `example.html`, which is the actual demo page.
- `npm run build` — Type-check (`tsc --noEmit`) then produce the distributable bundle in `dist/` (`dist/js/grid-drawer.js`, `dist/css/grid-drawer.css`, images under `dist/img/`).
- `npm run preview` — Serve the built bundle.

There is no test suite, no `lint` script, and no linter installed. ESLint config exists in `.eslintrc.js` (2-space indent, single quotes, semicolons required) but must be run manually if needed.

## Architecture

Grid Drawer is a **vanilla TypeScript browser plugin** distributed as a single JS + CSS pair. It is not consumed as an npm package — the build emits files that pages load via `<script>` tags.

### Runtime contract

- Exposes a single global: `window.GridDrawer`, instantiated as `new GridDrawer(selector, options)`.
- **Depends on `window.Velocity`** (velocity.js) being loaded before the plugin script. `src/main.ts` is wrapped in an IIFE that receives `window.Velocity`; if it is undefined the plugin bails with a console error. Velocity is *not* bundled — the demo loads it from `src/public/js/velocity-2.0.6.min.js`.
- All animations (insides expanding, sides shifting) are driven through `window.Velocity`, so any change to the open/close flow must integrate with Velocity's queue (`queue: false` is used throughout to avoid stacking).

### The `GridDrawer` class (`src/main.ts`)

The class is intentionally thin: the constructor stores config + DOM references on `this`, then delegates almost every behavior to a free function imported from `components/`, `events/`, or `functions/`. Those functions are invoked with `.call(this)` so they read state from the instance. When editing them, treat `this: any` as the `GridDrawer` instance — they are effectively methods that live in separate files.

Key instance fields populated in the constructor:
- `GD_CONTAINER`, `GD_GROUPS`, `GD_SIDES`, `GD_ITEMS`, `GD_INSIDES`, `GD_OUTSIDES` — cached `NodeList`s used by every component.
- `GD_ORIGINAL_DOM` — snapshot of the container's HTML so `destroy()` can restore it.
- `CONFIG` — defaults from `src/config.ts` merged with user options.

### Layout pipeline (DOM construction)

The grid is built once at construction time and is the most non-obvious part of the codebase:

1. `components/buildElement` — if `options.data` was supplied, render `.gd__item` markup from it; otherwise the existing children of the container are used as-is.
2. `components/creatElement` — wraps `.gd__outside`/`.gd__inside` content in `.gd__wrap` (and insides additionally in `.gd__content`), injects a `.close-btn` into every inside, then:
   - Groups items in batches of **5** (`functions/domGroupHandler`, `ITEMS_NUMBER = 5`).
   - For each group, calls `functions/directionGroupHandler` with `direction = index % 2` to split the 5 items into "sides". The first side gets 1 item (large), subsequent sides get 2 items (small). The direction parameter alternates which side is large between rows — this is what creates the mirrored layout in adjacent groups.
   - Each side becomes a `.gd__side` with class `gd__size-l` or `gd__size-s` based on its position; sides are appended into `.gd__group` wrappers.
3. `components/setPosition` — only above 1024px viewport: absolutely positions each `.gd__side` horizontally inside its group. Below 1024px it strips inline styles and `is-open` classes so CSS falls back to the stacked mobile layout.

The 5-items-per-group + alternating direction invariant is load-bearing for the visual layout. Changing the group size requires updating the size logic in `creatElement` (`size = param === '00' || param === '12' ? 'l' : 's'`) and the SCSS rules for `gd__size-l` / `gd__size-s`.

### Interaction split: desktop vs. mobile

`events/clickHandler` branches on `window.innerWidth > 1024`:
- **Desktop**: `components/controlAnimation` runs the full choreography — Velocity-animates the inside open, calls `setSidePosition` to slide sibling sides out of the way (with hard-coded offset tables for index 1/2/3), and `closeInside` on every other item.
- **Mobile**: `components/controlSlide` just toggles `display: block/none` on the matching `.gd__inside`.

The same 1024px breakpoint appears in `setPosition`, `clickHandler`, and `controlAnimation`, and matches `$desktop: 1025px` in `src/scss/grid-drawer.scss`. Keep these in sync.

`events/resizeHandler` reruns `setPosition` through a 600ms `utils/throttle`.

### Folder roles

- `src/components/` — instance methods invoked via `.call(this)`. They read `this.CONFIG` and `this.GD_*` node lists.
- `src/events/` — same `.call(this)` pattern; these are the handlers attached in the constructor.
- `src/functions/` — **pure** DOM helpers (no `this`); reusable layout primitives like grouping, wrapping, and injecting close buttons.
- `src/utils/` — small generic utilities (`throttle`, `getParents`, `getIndex`, `getNotElements`, `excludeString`). `excludeString` is used to strip the leading `.` from class-name config values when generating markup.
- `src/scss/` — `grid-drawer.scss` is the *published* stylesheet; `_mixin.scss` holds the `min-width` media-query mixin.
- `src/public/` — Vite static assets (the demo `example.html`, favicons, reset.css, the bundled copy of velocity.js used by the demo).

### Build output shape

`vite.config.js` pins the bundle filenames so downstream consumers can `<script src="./js/grid-drawer.js">` predictably:
- JS entry → `dist/js/grid-drawer.js`
- CSS → `dist/css/grid-drawer.css`
- Images → `dist/img/[name].[ext]`
- `assetsInlineLimit: 0` — no inlining; every asset emits as a file.

If you rename the entry or add CSS files, this naming logic in `rollupOptions.output` is what controls where they land.
