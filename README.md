# Desk Customizer (MVP)

Minimal MVP web app for designing a custom desk.

## Tech stack

- Next.js (App Router)
- React
- Tailwind CSS
- Zustand (state)
- React Three Fiber (+ Drei) for 3D preview

## Features (MVP only)

- Adjust **desk width / depth / height**
- Choose **desk color**
- Toggle **drawers** (left/right)
- **Live 3D preview** updates instantly
- **Save / load / delete** designs via API routes (no auth, no DB)

## Create Your Own Design (`/own-design`)

A Flash-free replacement for the "Create Your Own Design" tool on
uniteddesk.com, whose `program_v3.swf` no longer runs in any modern browser.
It lives at `/own-design` to match their existing `own-design.html` URL.

- Independent **top** and **base/pedestal** finishes (two-tone combinations)
- 20 real laminate finishes with maker and code, split into Standard and
  Designer (+5%) tiers, plus 14 hardware pulls
- Live SVG preview with wood-grain / speckle textures; left or right pedestal
- **Shareable links** — the design is encoded in the URL (`?top=…&base=…&hw=…&ped=…`)
- Copyable **spec sheet** (finish makers/codes) and an email-this-design button
- Responsive: the controls stack under the preview on phones

The catalog is data, not code: add or change finishes and hardware in
`lib/desk2d/catalog.ts`. Finish colors are sampled from the site's palette
image, so they are approximations of the real laminates. Not yet built: other
series/shapes, edge profiles, cable caps, and live pricing from the price book.

## Setup

### Requirements

- Node.js 18+ (recommended)

### Install

```bash
npm install
```

### Run locally

```bash
npm run dev
```

Then open `http://localhost:3000`.

## API

- `GET /api/designs` → `{ designs: DeskDesign[] }`
- `POST /api/designs` → `{ design: DeskDesign }`
- `GET /api/designs/:id` → `{ design: DeskDesign }`
- `PUT /api/designs/:id` → `{ design: DeskDesign }`
- `DELETE /api/designs/:id` → `{ ok: true }`

## Persistence

Designs are stored in a simple JSON file at:

- `lib/data/designs.json`

This file is created automatically on first save.

## Testing

```bash
npm test
```

Runs the Vitest suite: unit tests for the validation/clamping logic and CRUD
lifecycle in `lib/designRepo.ts`, plus smoke tests for the `/api/designs` route
handlers. Tests point `designRepo` at a throwaway temp directory (via the
`DESK_DATA_DIR` env var) instead of the real `lib/data/designs.json`, so
running them never touches your saved designs.

## Architecture

- **UI shell** — `app/layout.tsx` renders a fixed-height, non-scrolling page
  with a collapsible `Sidebar` (desk controls) beside the main content area.
- **State** — a single Zustand store (`store/useDeskStore.ts`) holds every
  desk parameter (dimensions, color, desk type, drawers) plus the
  save/load/delete design list and UI state (sidebar open/closed, busy/error
  flags). Both the controls panel and the 3D preview read from this store, so
  changing a slider updates the model instantly with no prop drilling.
- **3D preview** — `components/DeskPreview.tsx` wraps a react-three-fiber
  `Canvas` and swaps between three interchangeable desk models
  (`components/desk-models/*`) based on the selected desk type. Each model is
  built from procedural boxes (top, legs/pedestals, drawer fronts) computed
  from the store's cm dimensions.
- **Shared UI primitives** — `components/ui/` holds the generic building
  blocks (`Section`, `Field`, `Button`, `ToggleGroup`, `SliderField`) used to
  assemble the controls panel in `components/DeskControls.tsx`.
- **Validation limits** — `lib/deskLimits.ts` is the single source of truth
  for width/depth/height ranges and the color format, shared by both the
  client-side store (so sliders can't be dragged out of range) and the
  server-side API validation in `lib/designRepo.ts` (so a direct API call
  can't bypass those limits either).
- **Persistence** — `lib/designRepo.ts` reads/writes the flat JSON file
  described above; the `app/api/designs/**` route handlers are thin wrappers
  around it.

## Known limitations

This is an MVP, and the persistence layer in particular is intentionally
minimal:

- **Single flat JSON file, no database.** Every read does a full file parse
  and every write rewrites the whole file — fine for local/single-user use,
  but it won't scale to concurrent writers or many designs.
- **No concurrency control.** Two simultaneous saves can race and clobber
  each other's write, since there's no locking around the read-modify-write
  cycle in `designRepo.ts`.
- **No authentication.** Anyone with access to the server can list, load, or
  delete any saved design — there's no per-user scoping.
- **No automated UI/visual tests.** The Vitest suite covers the data layer
  and API routes only; 3D rendering and interactive controls are verified
  manually in a browser.

