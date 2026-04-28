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

