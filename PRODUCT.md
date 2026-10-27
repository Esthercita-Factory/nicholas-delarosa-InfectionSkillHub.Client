# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Participants of InfectionSkillHub, a training center that runs short in-person workshops (photography, cooking, public
speaking, graphic design, music, digital marketing). They browse what is coming up, enroll, check their
enrollments, cancel when plans change and download a certificate proving they are enrolled. They use the client
on phones and computers equally. Visitors who have not signed up can browse the catalog too.

Employees (the instructors) do not use this client: they work on the API through its Scalar reference.

## Product Purpose

Replace the form plus spreadsheets InfectionSkillHub used, which produced overbooked workshops, duplicated enrollments
and participants booked in two workshops at the same time. Success: a participant finds a workshop, sees the
real available seats, enrolls in a few seconds and gets a clear answer when a rule stops them.

## Positioning

The seats and every rule (capacity, duplicates, schedule overlaps, future-only enrollment, 24 hour cancellation
window) are enforced by the InfectionSkillHub API, so what the client shows is always the real state.

## Operating Context

- Angular 21 single page application consuming the InfectionSkillHub REST API (`/api/v1`) with a JWT.
- Routes: `/workshops` (public catalog), `/login`, `/register`, `/my-enrollments` (participants only).
- Times are shown in Bogotá time (UTC-05:00), the time zone of InfectionSkillHub.
- Part of a graded .NET performance test; the backend repository holds the README with credentials.

## Capabilities and Constraints

- Sign up (always as participant) and sign in; employee accounts are rejected by this client.
- Catalog of workshops that have not started, with code, title, description, instructor, date, schedule,
  capacity and available seats.
- Enroll; see active and cancelled enrollments; cancel up to 24 hours before the start; download the PDF
  certificate of an active enrollment.
- All UI copy and code in English. Workshop data (titles, descriptions, specialties, names) comes in Spanish
  from InfectionSkillHub and is shown as it is.
- No new runtime dependencies without a concrete need.

## Brand Commitments

- Name: InfectionSkillHub. Product/repository name: InfectionSkillHub.
- Binding palette chosen by the owner: eggplant `#2A0625`, deep purple `#55225A`, raspberry `#B12C63`,
  neon magenta `#FE61F8`, electric cyan `#5BE0F0`, pastel pink `#FE8ED5`, muted lavender `#9B68A5`,
  coral red `#CA3F56`. Eggplant dominant, raspberry as brand color, magenta and cyan as scarce accents.
- Desired character: nocturnal, elegant, technological, slightly mysterious, memorable.
- Light and dark modes, switchable by the user.

## Evidence on Hand

- Real catalog data from `InfectionSkillHub_Data.xlsx` through the API: 6 instructors, 30 participants, 15 workshops.
- No photography, testimonials or logos exist; do not fabricate them.

## Product Principles

1. The real state comes first: seats, deadlines and statuses are always visible and never decorative.
2. Every rule the API enforces is explained in plain words when it blocks the participant.
3. The participant flow stays short: browse, enroll, manage, prove.
4. Personality lives in details, never at the cost of legibility.

## Accessibility & Inclusion

Keyboard operable, visible focus, readable contrast in both themes, `prefers-reduced-motion` respected, status
never communicated by color alone.
