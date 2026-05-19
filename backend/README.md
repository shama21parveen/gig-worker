# Gig Worker Safety + Earnings OS Backend

Phase 2 backend now includes the authentication foundation on top of the original Express + TypeScript + MongoDB scaffold. This adds mock OTP-based auth flows, JWT access/refresh tokens, logout/session endpoints, and worker bootstrap for sign-up, while business modules like earnings, shifts, safety, documents, and grievances still remain deferred.

## Setup

```bash
cd backend
npm install
```

Create a local `.env` from `.env.example`, then run:

```bash
npm run dev
```

Production build:

```bash
npm run build
npm start
```

## Tech stack

- Node.js
- Express
- TypeScript
- MongoDB with Mongoose
- Zod
- JWT-ready middleware structure

## Implemented in Phase 1

- backend project scaffold
- TypeScript configuration
- environment validation
- MongoDB connection setup
- Express app + server bootstrap
- centralized error handling
- async handler utility
- API success response helper
- pagination helper
- request validation middleware
- auth-ready `User` and `Worker` base models
- auth and role middleware foundations
- health check endpoint at `/api/v1/health`

## Implemented in Phase 2

- mock OTP send endpoint
- OTP verify endpoint
- JWT access token issuing
- refresh token endpoint
- authenticated logout endpoint
- current session endpoint
- worker bootstrap on verified sign-up
- India-oriented phone normalization
- dev-friendly fixed OTP support via env

## Implemented in Phase 3

- protected worker profile fetch endpoint
- protected worker profile update endpoint
- profile response shape aligned with current frontend expectations
- user language + worker preferences update flow
- emergency contact normalization and persistence

## Implemented in Phase 4

- protected earnings dataset endpoint with `daily`, `weekly`, and `monthly` views
- protected expense creation endpoint
- protected upcoming payout endpoint
- Mongo-backed earnings, expense, and payout models
- realistic dev fallback datasets for empty accounts so frontend can integrate without blank states

## Folder structure

```text
backend
├── src
│   ├── app
│   ├── config
│   ├── constants
│   ├── controllers
│   ├── jobs
│   ├── middlewares
│   ├── models
│   ├── repositories
│   ├── routes
│   ├── services
│   ├── types
│   ├── utils
│   └── validators
├── .env.example
├── package.json
├── README.md
└── tsconfig.json
```

## Environment variables

- `NODE_ENV`
- `PORT`
- `API_PREFIX`
- `MONGODB_URI`
- `JWT_ACCESS_SECRET`
- `JWT_REFRESH_SECRET`
- `JWT_ACCESS_EXPIRES_IN`
- `JWT_REFRESH_EXPIRES_IN`
- `CORS_ORIGIN`
- `OTP_TTL_MINUTES`
- `MOCK_OTP_FIXED_CODE`

## Current API

- `GET /`
- `GET /api/v1/health`
- `POST /api/v1/auth/send-otp`
- `POST /api/v1/auth/verify-otp`
- `POST /api/v1/auth/refresh-token`
- `POST /api/v1/auth/logout`
- `GET /api/v1/auth/me`
- `GET /api/v1/workers/me`
- `PATCH /api/v1/workers/me`
- `GET /api/v1/earnings/dataset?view=weekly`
- `POST /api/v1/earnings/expenses`
- `GET /api/v1/earnings/upcoming-payout`

## Deferred to later phases

- shifts APIs
- safety APIs
- documents vault APIs
- grievance/support APIs
- uploads
- Redis integration
- AI and OCR endpoints

## Architecture notes

- Business logic is intentionally deferred so the foundation remains stable and easy to extend.
- Shared middleware/utilities are already in place for validation, auth, roles, error handling, and API responses.
- Base `User` and `Worker` schemas are designed so future auth and profile flows can be layered on cleanly.
- OTP flow is intentionally mock/dev-friendly right now. A real SMS/WhatsApp provider and Redis-backed OTP/session storage can be plugged in later without changing route contracts.
