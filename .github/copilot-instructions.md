## Quick orientation

This repo is a two-part (client + server) React + Express application for hotel booking.
Keep these high-level facts top-of-mind:

- Frontend: `client/` — React (Vite). Main dev script: `cd client && npm run dev`.
- Backend: `server/` — Express + MongoDB. Main dev script: `cd server && npm run dev` (uses `nodemon`).
- API base paths are mounted under `/api` (see `server/server.js`). Examples: `/api/hotel`, `/api/auth`, `/api/booking`, `/api/admin/*`, `/api/superadmin/*`.

## Architecture & data flow (concise)

- Single Node/Express server (server/server.js) exposes REST endpoints organized by route folders (`server/routes`, `server/routes/adminRoutes`, `server/routes/superAdminRoutes`).
- Controllers live under `server/controllers` and implement business logic. Models are in `server/models` (Mongoose).
- Middleware: authentication and role checks are in `server/middleware` (e.g., `adminMiddleware.js`, `authMiddleware.js`, `uploadMiddleware.js`). Admin routes are protected with `adminMiddleware` (see how routes are mounted in `server/server.js`).
- Image uploads use Cloudinary. Config: `server/config/cloudinaryConfig.js`, upload handling via `multer` + `multer-storage-cloudinary` and `uploadMiddleware.js`.
- Frontend communicates with the server using relative paths like `/api/hotel` (CORS configured in `server/server.js` for `http://localhost:5173` and the Vercel domain). Because server sets `credentials: true`, client requests that require cookies/auth should use credentials (fetch/axios) with credentials included.

## Project-specific conventions and patterns

- Route prefixes: user-facing routes often mount at `/api/user` or `/api/hotel`; admin functionality is under `/api/admin` and additionally guarded with `adminMiddleware`.
- Admin UI components are under `client/src/components/admin/`. Add/edit hotel forms and admin pages follow the pattern of calling services in `client/src/services` (e.g., `adminHotelService.js`) or `client/src/api/adminApi.js`.
- Frontend state/side-effects: uses React Contexts located in `client/src/context` (e.g., `AuthContext.jsx`, `HotelContext.jsx`, `AdminContext.jsx`) — modifying or adding features should use or extend these contexts instead of sprinkling global state.
- Authentication: server uses Passport (see `server/config/passport.js`) with multiple strategies (local, Google, Facebook). JWT and cookies are also present — review `server/controllers/authController.js` and `server/middleware/authMiddleware.js` when adding auth-sensitive routes.

## Dev & debug workflows

- Start backend: in one terminal `cd server && npm run dev` (nodemon). Server listens on port 3000 by default.
- Start frontend: in a second terminal `cd client && npm run dev` (Vite on port 5173). The server CORS config allows `http://localhost:5173`.
- To run the production server: `cd server && npm start` (starts Node on `server.js`). Frontend build: `cd client && npm run build`.

If you need to run both together in a single terminal, create a simple script or use a tool like `concurrently` — the repo currently expects two terminals.

## Key files to inspect for changes (use these as authoritative examples)

- `server/server.js` — how routes are mounted, CORS, cookie/session setup and which route prefixes are used.
- `server/config/db.js` — MongoDB connection details.
- `server/config/passport.js` — Passport strategies and session handling.
- `server/middleware/*` — auth/admin/upload middleware examples.
- `server/controllers/*` and `server/routes/*` — controller ↔ route pattern used across features.
- `client/src/context/*` — centralized state management used by UI.
- `client/src/components/admin/*` — how admin forms and pages interact with services and the API.
- `client/src/services/adminHotelService.js` and `client/src/api/adminApi.js` — example service layer wrapping API calls.

## Concrete examples to follow

- Protecting routes: mirror existing pattern — add route in `server/routes/adminRoutes`, import and mount it in `server/server.js` under `/api/admin` and apply `adminMiddleware`.
- Uploads: use `uploadMiddleware` + Cloudinary config. See `server/middleware/uploadMiddleware.js` and calls in admin controllers.
- Client requests that need auth must include credentials (cookies). Example (fetch):

  fetch('/api/auth/some-protected', { method: 'GET', credentials: 'include' })

## Notes on deployment and CI

- Client has a `vercel.json` file and is set up for Vercel deployment; ensure the frontend build is created (`npm run build`) and that environment variables for the server (DB, Cloudinary, OAuth) are provided to the hosting environment.

## What I couldn't infer (ask if needed)

- Root-level scripts to orchestrate both client and server concurrently (not present). If you want a single command, say so and I can add `concurrently` + root package.json scripts.
- Any internal API versioning or backward-compat guarantees — treat endpoints as mutable unless told otherwise.

If anything here looks incomplete or you want more/less detail (e.g., snippets for common changes, recommended code style rules, or example tests), tell me which area to expand and I will iterate.
