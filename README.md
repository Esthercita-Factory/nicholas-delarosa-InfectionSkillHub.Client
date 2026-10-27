# InfectionSkillHub.Client

Participant application of **InfectionSkillHub**, built with Angular. It consumes the
[InfectionSkillHub API](https://github.com/Esthercita-Factory/nicholas-delarosa-InfectionSkillHub) with the JWT
returned on sign in (presentation option B).

It covers the whole participant flow:

- Sign up and sign in.
- Browse the upcoming workshops and their available seats (also without signing in).
- Enroll in a workshop.
- See their enrollments, active and cancelled.
- Cancel an enrollment (up to 24 hours before the workshop starts).
- Download the PDF enrollment certificate of an active enrollment.
- Switch between dark and light mode (remembered per browser; the system preference is the default).

Employee operations (create workshops, list enrollments, Excel import, reports) are performed on the API through
its Scalar reference. An employee account cannot sign in here.

## Technologies

- Angular 21 (standalone components, signals, reactive forms, lazy loaded routes)
- RxJS
- Vitest (unit tests)
- Nginx + Docker
- Red Hat Display, Red Hat Text and Red Hat Mono, self-hosted in `public/fonts` (SIL Open Font License)

## Design

The catalog reads like a cultural agenda: workshops are filed under their day, with times in a fixed column and
seats shown as a short meter. A sticky day rail follows the scroll and jumps to any day; on phones it becomes a
horizontal date strip. The palette is InfectionSkillHub's eight brand colors (eggplant, deep purple, raspberry, neon magenta,
electric cyan, pastel pink, muted lavender and coral red), defined as CSS variables in `src/styles.css`, with a
dark and a light theme derived from them. `PRODUCT.md` and `DESIGN.md` document the product context and the
design system.

## Structure

```
src/app/
├── Guards/         authGuard (participant pages) and guestGuard (sign in / sign up)
├── Interceptors/   Adds the Bearer token and signs out on 401
├── Models/         API contracts
├── router/         Routes
├── Services/       Auth session, theme, workshops, enrollments, toasts, agenda grouping and API helpers
└── Views/          Auth, Layout, Workshops, Enrollments and Shared components (icons, wordmark, seat meter...)
```

## Getting started

Prerequisites: Node.js 20.19+ or 22.12+ and the API running.

```bash
npm install
npm start
```

The client opens at http://localhost:4200 and calls the API at `http://localhost:5180/api/v1`
(`src/environments/environment.development.ts`), which is the `http` profile of the API
(`dotnet run --project src/InfectionSkillHub.Api --launch-profile http`). The API already allows that origin in CORS.

Other commands:

```bash
npm run build   # production build in dist/infectionskillhub-client
npm test        # unit tests
```

## Docker

The image builds the application and serves it with Nginx, which also forwards `/api` to the API, so the browser
sees a single origin and the production build uses `apiUrl = '/api/v1'`.

The usual way to run it is through the API repository: its `docker-compose.yml` builds this repository from
`../InfectionSkillHub.Client` and serves the client at http://localhost:8667 next to the API (8666). Clone both
repositories side by side and run `docker compose up -d --build` in the API one; the deployment on the esthercita
server is described in the API README.

To run only this image against an API already running in that compose:

```bash
docker build -t infectionskillhub-client .
docker run -p 8667:8080 --network infectionskillhub_default -e API_UPSTREAM=http://api:8080 infectionskillhub-client
```

## Test accounts

Participants loaded from `InfectionSkillHub_Data.xlsx` use the password `Skillhub2026*`, for example
`jorge.perez@correo.com` / `Skillhub2026*`. New accounts can be created from the sign up page.

Dates are shown in Bogotá time (UTC-05:00), the time zone of InfectionSkillHub.

## Author

- **Full name:** Nicholas Andres De la Rosa Rivera
- **Clan:** Esthercita
- **Email:** nicholasandresdelarosarivera@hotmail.com
- **ID document:** 1044630341
