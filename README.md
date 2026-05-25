# Thriveee Backend

Backend API for Thriveee, built with NestJS, TypeScript, TypeORM, PostgreSQL, and Supabase. The service manages the core marketplace data model for suburbs, services, providers, customers, pricing, bookings, orders, and Supabase Auth profile sync.

## Tech Stack

- NestJS 11
- TypeScript
- PostgreSQL with TypeORM
- Supabase Auth integration
- Jest for unit and e2e tests
- ESLint and Prettier for code quality

## Requirements

- Node.js 22 or newer
- npm
- PostgreSQL database URL, currently expected to point at Supabase/Postgres
- Supabase project URL and service role key for auth sync

## Getting Started

Install dependencies:

```bash
npm install
```

Create a local environment file:

```bash
cp .env.local .env
```

Update `.env` with your local or Supabase values:

```env
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE=your-service-role-key
PORT=3000
NODE_ENV=development
```

Start the API in watch mode:

```bash
npm run start:dev
```

The API runs at:

```text
http://localhost:3000/api
```

## Available Scripts

```bash
npm run start       # Start the Nest application
npm run start:dev   # Start in watch mode
npm run start:debug # Start in debug watch mode
npm run build       # Compile TypeScript into dist/
npm run start:prod  # Run the compiled production build
npm run lint        # Run ESLint with auto-fix
npm run format      # Format source and test files
npm run test        # Run unit tests
npm run test:watch  # Run unit tests in watch mode
npm run test:cov    # Run tests with coverage
npm run test:e2e    # Run e2e tests
```

## Project Structure

```text
src/
  app.module.ts                  # Root module and database configuration
  main.ts                        # API bootstrap, /api prefix, CORS, validation
  suburbs/                       # Suburb catalog and search
  service-categories/            # Top-level service categories
  service-subcategories/         # Nested service categories
  services/                      # Sellable services
  service-components/            # Pricing components for services
  service-component-rates/       # Component rate records
  service-multipliers/           # Pricing multipliers
  pricing/                       # Pricing configuration and calculation
  providers/                     # Provider profiles
  provider-services/             # Provider-to-service mappings
  provider-suburbs/              # Provider service areas
  customers/                     # Customer records
  customer-addresses/            # Customer address records
  bookings/                      # Booking lifecycle and checkout orchestration
  booking-items/                 # Items attached to bookings
  orders/                        # Order lifecycle
  profiles/                      # User profile records
  supabase-sync/                 # Supabase Auth webhook handling
```

## API Overview

All routes are prefixed with `/api`.

| Area | Endpoints |
| --- | --- |
| Health/root | `GET /api` |
| Suburbs | `GET /api/suburbs`, `GET /api/suburbs/search?q=`, `GET /api/suburbs/:id` |
| Service catalog | CRUD routes for `/api/service-categories`, `/api/service-subcategories`, and `/api/services` |
| Service configuration | CRUD routes for `/api/service-components`, `/api/service-component-rates`, and `/api/service-multipliers` |
| Pricing | `GET /api/pricing/services/:serviceId/config`, `POST /api/pricing/calculate` |
| Providers | CRUD routes for `/api/providers`, `/api/provider-services`, and `/api/provider-suburbs` |
| Service explorer | `GET /api/service-explorer/suburb/:suburbId`, `GET /api/service-explorer/suburb-name/:suburbName` |
| Customers | CRUD routes for `/api/customers` and `/api/customer-addresses` |
| Bookings | CRUD routes for `/api/bookings`, plus `POST /api/bookings/checkout` |
| Booking items | CRUD routes for `/api/booking-items` |
| Orders | CRUD routes for `/api/orders` |
| Profiles | CRUD routes for `/api/profiles` |
| Supabase sync | `POST /api/supabase-hooks` |

## Environment Notes

- `DATABASE_URL` is required by TypeORM.
- `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE` are required by the Supabase sync service.
- `PORT` defaults to `3000` when not set.
- CORS allows `https://www.thriveee.com.au` in production.
- CORS allows `http://localhost:5173` and `http://localhost:5174` outside production.
- TypeORM entity auto-loading is enabled, but schema synchronization is disabled.

## Validation

The app uses a global Nest `ValidationPipe` with:

- unknown request fields stripped
- non-whitelisted fields rejected
- implicit DTO type conversion enabled

Keep DTOs up to date when changing request payloads, because incoming data is validated globally before it reaches controllers.

## Supabase Webhook

Supabase Auth events should be sent to:

```text
POST /api/supabase-hooks
```

The controller accepts the `x-supabase-signature` header, but signature verification is not implemented yet. Treat that as a security follow-up before relying on the webhook in production.

## Testing

Run the unit test suite:

```bash
npm run test
```

Run e2e tests:

```bash
npm run test:e2e
```

Generate coverage:

```bash
npm run test:cov
```

## Build and Production

Compile the application:

```bash
npm run build
```

Run the compiled output:

```bash
npm run start:prod
```

Before deploying, make sure production environment variables are configured, database SSL requirements match the target database, and Supabase webhook security is reviewed.
