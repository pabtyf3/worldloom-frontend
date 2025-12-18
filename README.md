# WorldLoom Front-End

This repository contains the **WorldLoom front-end application**, implemented in **React + TypeScript**, and designed to ship from a **single codebase** as:

- 🌐 Web application (PWA)
- 📱 Mobile apps (Android first, iOS later)
- 🖥 Desktop apps (Tauri preferred)

The front-end is intentionally **offline-first**, **engine-driven**, and **schema-led**, acting as a pure consumer of the WorldLoom canonical domain and runtime packages.

---

## Repository Purpose

This repo is responsible for:

- Rendering interactive story experiences (Player UI)
- Providing tooling to create, validate, and playtest stories (Creator UI)
- Packaging the same React application for web, mobile, and desktop
- Managing local persistence, offline assets, and sync boundaries

This repo **does not** contain:
- Story execution logic (runtime engine)
- Canonical schemas or validators
- Backend services

Those live in shared packages or separate repos and are consumed as dependencies.

---

## Design Principles

1. **Single Source of Truth**  
   All story behavior is driven by canonical schemas and runtime output. The UI never re-implements rules.

2. **Offline-First by Default**  
   Playing and creating stories must work with no network connection.

3. **Platform-Agnostic Core**  
   Domain, runtime, and persistence logic are isolated from platform concerns.

4. **Deterministic Rendering**  
   The runtime produces a structured render model; the UI renders it verbatim.

5. **Progressive Enhancement**  
   Web (PWA) is the baseline; mobile and desktop add native capabilities where available.

---

## High-Level Architecture

```
worldloom-frontend/
├── apps/
│   ├── web/        # Web + PWA entry (Player + Creator unified)
│   ├── mobile/     # Capacitor wrapper (Player-focused)
│   └── desktop/    # Tauri wrapper (Creator-focused)
│
├── packages/
│   ├── ui/         # Shared design system & components
│   ├── domain/     # Canonical types (from worldloom-engine)
│   ├── runtime/    # Engine wrapper & session management
│   ├── persistence/# IndexedDB + filesystem abstraction
│   ├── player/     # Player-specific features & components
│   ├── creator/    # Creator-specific features & components
│   ├── api-client/ # Typed backend API client (optional)
│   └── telemetry/  # Offline event buffering (opt-in)
│
└── shared/
    └── assets/     # Images, icons, fonts
```

> ⚠️ Rule: `domain` and `runtime` packages must never import browser, Node, or native APIs.

**Dependencies:**
- `domain` imports types from `worldloom-engine`
- `runtime` wraps `worldloom-engine` for session management
- `player` and `creator` are surface-specific feature packages
- Both surfaces share `ui`, `domain`, `runtime`, and `persistence`

---

## Application Surfaces

This monorepo provides **two user-facing surfaces** in a single unified codebase:

### Player Application (Mobile-First)

**Route Prefix:** `/`

The Player UI renders interactive fiction experiences.

**Core Responsibilities:**
- Story library and downloads
- Scene rendering (prose, choices, dice, audio)
- Character sheet and inventory
- Journal and save/load
- Multiple presentation profiles (interactive, audiobook, reading)

**Design Focus:**
- Mobile-first responsive design
- Large touch targets (44x44px minimum)
- Immersive fullscreen mode
- Bottom navigation, swipe gestures

**Key Constraint:**
> The Player UI **only** reacts to the runtime render model and never mutates game state directly.

---

### Creator Application (Desktop-First)

**Route Prefix:** `/creator`

The Creator UI is a structured editor for WorldLoom content.

**Core Responsibilities:**
- Project management (local-first)
- World building (lore, factions, locations, NPCs)
- Scene and choice authoring with visual tools
- AI-assisted content generation
- Playtesting with debug state inspection
- Real-time validation and diagnostics
- Bundle export

**Design Focus:**
- Desktop-first layout with multi-panel views
- Keyboard shortcuts and context menus
- Drag-and-drop interactions
- Native file system integration (desktop)

**Key Constraint:**
> The Creator UI enforces canonical correctness but does not invent schema.

---

### Surface Integration

- **Preview Mode:** Creator playtest uses actual Player components
- **Shared Infrastructure:** Both surfaces use same runtime, persistence, and UI packages
- **Routing:** Web app serves both surfaces with route-based switching
- **Platform Optimization:** Mobile prioritizes Player, Desktop prioritizes Creator

---

## State Model

State is divided into three layers:

1. **UI State**  
   Routing, layout, panels, modals

2. **Session State**  
   Immutable runtime execution state

3. **Persistence State**  
   Bundles, projects, saves, assets, telemetry

Recommended tooling:
- Zustand or Redux Toolkit for UI orchestration
- Pure functions for runtime transitions

---

## Offline & Persistence

### Storage
- Primary store: **IndexedDB** (all platforms)
- Assets cached locally with hash verification

### File Access
- Web: File System Access API (fallback to import/export)
- Mobile: Capacitor filesystem
- Desktop: Native filesystem via Tauri

### Sync (Phase 1)
- Optional catalog downloads
- Optional telemetry upload (opt-in)
- No cloud saves or project sync by default

---

## Platform Targets

### Web (PWA)

- Built with Vite
- Service worker for offline support
- Installable PWA

### Mobile (Capacitor)

- Android first
- Wraps web build
- Native plugins for filesystem, audio focus, haptics

### Desktop (Tauri)

- Preferred over Electron for footprint and security
- Enables local project folders and drag/drop import

---

## Development Workflow

### Prerequisites
- Node.js 22+ (LTS)
- pnpm (recommended) or npm
- Rust toolchain (for Tauri desktop builds)
- Android SDK (for mobile builds)

### Install

```bash
pnpm install
```

### Run Web App (Development)

```bash
# Serves both Player and Creator surfaces
pnpm dev

# Player: http://localhost:5173/
# Creator: http://localhost:5173/creator
```

### Run Mobile (Android)

```bash
pnpm build
pnpm cap sync android
pnpm cap run android
```

### Run Desktop (Tauri)

```bash
pnpm tauri dev
```

### Build for Production

```bash
# Web + PWA
pnpm build

# Desktop (all platforms)
pnpm tauri build

# Mobile
pnpm cap sync
pnpm cap build android
```

---

## Testing Strategy

### Unit Tests (Vitest)
- All packages (`domain`, `runtime`, `persistence`, `player`, `creator`)
- UI logic and persistence adapters
- Pure functions and utilities

### Component Tests (React Testing Library)
- React components in `ui`, `player`, `creator`
- User interaction flows
- State management

### Integration Tests
- Full Player workflow (load → play → save)
- Full Creator workflow (create → author → export)
- Cross-surface integration (create in Creator → play in Player)

### E2E Tests (Playwright)
- Complete user journeys
- Multi-browser testing
- Platform-specific tests

**Note:** Runtime correctness is validated in the `worldloom-engine` repo, not here.

---

## Versioning

- App version: **SemVer**
- Story bundles: independent versioning
- Asset cache busting via content hashes

---

## Security & Privacy

- Telemetry is opt-in
- Events buffered locally before upload
- Minimal identifiers by default
- Creator projects remain local unless explicitly exported



## Contribution Guidelines

- Do not bypass canonical schemas
- Do not add story logic to UI
- Prefer pure functions and explicit state transitions
- Keep platform-specific code isolated in wrappers
- Surface-specific code goes in `packages/player` or `packages/creator`
- Shared code goes in `packages/ui`, `packages/domain`, `packages/runtime`, `packages/persistence`

---

## Related Documentation

This repository implements the specifications defined in:
- [Frontend Technical Specification](../worldloom-frontend-spec/01_Frontend_Technical_Specification.md)
- [Implementation Approach](../worldloom-frontend-spec/IMPLEMENTATION_APPROACH.md)
- [Integration Notes](../worldloom-frontend-spec/INTEGRATION_NOTES.md)
- [Unified Task List](../implementation/worldloom-frontend/tasks/UNIFIED_TASK_LIST.md)

---

## Project Status

This repository represents **Phase 2** of WorldLoom (unified Player + Creator):

**Current (Phase 1):**
- Web-first PWA
- Offline-first architecture
- Deterministic engine-driven UI
- Two surfaces: Player (mobile-first) + Creator (desktop-first)
- Monorepo with shared infrastructure

**Future Phases:**
- Account sync
- Cloud project storage
- Marketplace
- On-device AI assistants
- Enhanced mobile app features

