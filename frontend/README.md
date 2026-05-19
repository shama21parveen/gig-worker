# Gig Worker Safety + Earnings OS Frontend

Production-oriented frontend scaffold for a worker operations product focused on gig workers in India. The app is built to demonstrate earnings visibility, shift planning, safety workflows, documents readiness, support intake, and multilingual usability while staying cleanly separable from a future MERN backend.

## Setup

```bash
cd frontend
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

## Tech stack

- React + Vite + TypeScript
- Tailwind CSS
- React Router
- Zustand
- TanStack Query
- React Hook Form + Zod
- Recharts
- Framer Motion
- Lucide React
- Leaflet + React Leaflet

## Folder structure

```text
frontend
├── public
├── src
│   ├── app
│   ├── assets
│   ├── components
│   │   ├── layout
│   │   └── ui
│   ├── features
│   │   ├── auth
│   │   ├── dashboard
│   │   ├── documents
│   │   ├── earnings
│   │   ├── grievances
│   │   ├── profile
│   │   ├── safety
│   │   └── shifts
│   ├── hooks
│   ├── lib
│   │   ├── config
│   │   ├── i18n
│   │   └── utils
│   ├── mocks
│   │   └── data
│   ├── pages
│   ├── routes
│   ├── schemas
│   ├── services
│   │   └── mock
│   ├── store
│   └── types
├── .env.example
├── index.html
├── package.json
├── tailwind.config.ts
└── vite.config.ts
```

## Architecture decisions

- Feature-first screen modules: each major domain has its own query hook and workspace component so route pages stay thin.
- Reusable operational UI: cards, badges, page headers, loading states, error states, form fields, and mobile/desktop navigation live in shared components.
- Mock API abstraction: services return async data via `mockRequest()` so TanStack Query usage already matches real API integration patterns.
- i18n-ready text model: shared UI strings live in English and Hindi dictionaries; content-heavy mock records use localized `{ en, hi }` values.
- Browser capability hooks: voice input and geolocation are isolated in hooks so browser support and fallbacks stay out of page logic.
- MERN-ready separation: backend-facing concerns are routed through `src/services`, making it easy to swap mock data for Express endpoints later.

## Mock data and services

- Mock datasets live in `src/mocks/data`.
- Service adapters live in `src/services/*.service.ts`.
- Queries are consumed through feature hooks such as `useDashboardOverview`, `useEarningsDataset`, and `useSafetyOverview`.
- Current auth, profile updates, and grievance submission are simulated locally with async responses.

## Future backend integration

Replace the local services with real API calls in:

- `src/services/auth.service.ts`
- `src/services/dashboard.service.ts`
- `src/services/earnings.service.ts`
- `src/services/shifts.service.ts`
- `src/services/safety.service.ts`
- `src/services/documents.service.ts`
- `src/services/grievances.service.ts`
- `src/services/profile.service.ts`

Expected backend shape later:

- Node.js + Express API
- MongoDB for worker, earnings, shifts, safety, documents, and support records
- Auth and OTP verification service
- File upload endpoints for grievance attachments and document vault
- AI endpoints for forecasts, shift recommendations, route risk summaries, and OCR parsing

## Future AI integration points

- Dashboard AI shift insight card
- Earnings end-of-week forecast card
- Shift suggestion panel and demand-aware scheduling
- Safety route alert and risk summary cards
- Documents OCR and expiry extraction placeholder
- Support intake enhancement from voice notes and automated ticket tagging

## Environment variables

Create a local `.env` from `.env.example` and set:

- `VITE_API_BASE_URL`
- `VITE_MAP_TILE_URL`
- `VITE_ENABLE_VOICE_INPUT`
- `VITE_ENABLE_MOCK_API`

## Notes

- Frontend only is implemented right now.
- `/backend` is intentionally left as a stub so the repo structure is ready for future API work without mixing concerns today.
