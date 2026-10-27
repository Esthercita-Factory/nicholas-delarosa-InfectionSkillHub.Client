---
version: 1
slug: "src-app"
primary_target: "src/app"
related_targets: []
---

# Participant client surface

Scope: the whole participant client (catalog, sign in, sign up, my enrollments). Visitor mode: Operate.
Job: find an upcoming workshop, read its real seats, enroll, manage and prove enrollments. Used on phone and laptop alike, mostly in the evening.
Constraints: keep every route, behavior and API integration; UI copy in English; workshop data in Spanish as delivered; light and dark modes.

## Direction contract

THESIS: The season read like the city's cultural agenda: workshops filed under their day, times in a fixed column, seats as a short meter. Refuses the default marketplace grid of identical cards.

OWN-WORLD: Night agenda print. Eggplant ground with deep purple rules; raspberry carries day headings and the primary action; cyan only for times and free seats; magenta only for the active day and focus; coral only for full, cancelled and errors. Red Hat Display headings, Red Hat Text body, Red Hat Mono for times, codes and seat figures. Light mode is the same agenda printed on pink-tinted stock with eggplant ink.

STORY: The participant sees what happens next and when, judges seats at a glance, enrolls in one press, and finds the same agenda grammar in their own enrollments.

FIRST VIEWPORT: Top bar (wordmark, Workshops, My enrollments, theme toggle, account). Left: sticky day rail of season Saturdays with workshop counts, active day marked in magenta. Right: page heading, search and seats filter, then the nearest day's heading and its rows: time, code, title and description, instructor, seat meter, Enroll at the row's end.

FORM: grounded candidate "Cultural Agenda", position 4 on the ordered list, chosen from the safer hand. seed:384587a2b41cc0a6

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

Signature move: the day rail is live wayfinding: it lists every season day with its workshop count, highlights the day in view while scrolling, and jumps to a day on press; on phones it becomes a sticky horizontal date strip.
Motion grammar: one moment, the rail's active marker gliding between days; seat meters settle once on load; reduced motion removes both.
