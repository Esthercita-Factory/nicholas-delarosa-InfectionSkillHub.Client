---
name: InfectionSkillHub
description: The participant client for InfectionSkillHub's season of short in-person workshops, set as a night cultural agenda.
colors:
  raspberry: "#b12c63"
  eggplant: "#2a0625"
  deep-purple: "#55225a"
  neon-magenta: "#fe61f8"
  electric-cyan: "#5be0f0"
  pastel-pink: "#fe8ed5"
  muted-lavender: "#9b68a5"
  coral-red: "#ca3f56"
  ink-white: "#ffffff"
  night-raised: "#310a2e"
  night-sunken: "#22041d"
  night-panel: "#340c32"
  night-rule: "#4e1e52"
  night-seat-track: "#481949"
  night-text: "#fff4fb"
  night-text-2: "#ffd3ee"
  night-text-3: "#c1a0c7"
  night-brand-hover: "#be377d"
  night-danger-text: "#e99a9f"
  night-danger-soft: "#43102f"
  night-info-soft: "#371f3a"
  stock-bg: "#fff7fc"
  stock-sunken: "#fff0f9"
  stock-rule: "#e3d3e6"
  stock-rule-strong: "#c8aace"
  stock-seat-track: "#e9ddeb"
  stock-text-3: "#77497c"
  stock-time: "#5f3f6f"
  stock-seat: "#008796"
  stock-focus: "#973491"
  stock-brand-hover: "#962557"
  stock-danger-text: "#a7334d"
  stock-danger-soft: "#fdeced"
  stock-info-soft: "#ecfbfd"
typography:
  display:
    fontFamily: "Red Hat Display, Segoe UI, sans-serif"
    fontSize: "3rem"
    fontWeight: 800
    lineHeight: 0.9
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Red Hat Display, Segoe UI, sans-serif"
    fontSize: "2rem"
    fontWeight: 800
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Red Hat Display, Segoe UI, sans-serif"
    fontSize: "1.1rem"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.005em"
  body:
    fontFamily: "Red Hat Text, Segoe UI, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.55
    fontFeature: "tnum"
  body-sm:
    fontFamily: "Red Hat Text, Segoe UI, sans-serif"
    fontSize: "0.92rem"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Red Hat Text, Segoe UI, sans-serif"
    fontSize: "0.9rem"
    fontWeight: 600
    lineHeight: 1.55
  button:
    fontFamily: "Red Hat Text, Segoe UI, sans-serif"
    fontSize: "0.95rem"
    fontWeight: 600
    lineHeight: 1
  time:
    fontFamily: "Red Hat Mono, ui-monospace, monospace"
    fontSize: "1rem"
    fontWeight: 600
    lineHeight: 1
  mono-label:
    fontFamily: "Red Hat Mono, ui-monospace, monospace"
    fontSize: "0.78rem"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "0.08em"
  code:
    fontFamily: "Red Hat Mono, ui-monospace, monospace"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "0.08em"
rounded:
  inner: "4px"
  sm: "6px"
  mark: "8px"
  pill: "999px"
spacing:
  xs: "6px"
  sm: "12px"
  md: "18px"
  lg: "24px"
  xl: "48px"
  page-top: "40px"
  page-bottom: "72px"
components:
  button-primary:
    backgroundColor: "{colors.raspberry}"
    textColor: "{colors.ink-white}"
    typography: "{typography.button}"
    rounded: "{rounded.sm}"
    padding: "0 18px"
    height: "42px"
  button-primary-hover:
    backgroundColor: "{colors.night-brand-hover}"
    textColor: "{colors.ink-white}"
  button-primary-disabled:
    backgroundColor: "{colors.night-rule}"
    textColor: "{colors.night-text-3}"
  button-primary-sm:
    backgroundColor: "{colors.raspberry}"
    textColor: "{colors.ink-white}"
    rounded: "{rounded.sm}"
    padding: "0 14px"
    height: "36px"
  button-quiet:
    backgroundColor: "transparent"
    textColor: "{colors.night-text}"
    typography: "{typography.button}"
    rounded: "{rounded.sm}"
    padding: "0 18px"
    height: "42px"
  button-quiet-hover:
    backgroundColor: "{colors.night-raised}"
  button-danger:
    backgroundColor: "transparent"
    textColor: "{colors.night-danger-text}"
    typography: "{typography.button}"
    rounded: "{rounded.sm}"
    padding: "0 14px"
    height: "36px"
  button-danger-hover:
    backgroundColor: "{colors.coral-red}"
    textColor: "{colors.ink-white}"
  icon-button:
    backgroundColor: "transparent"
    textColor: "{colors.night-text-2}"
    rounded: "{rounded.sm}"
    size: "38px"
  input:
    backgroundColor: "{colors.night-sunken}"
    textColor: "{colors.night-text}"
    typography: "{typography.body}"
    rounded: "{rounded.sm}"
    padding: "0 14px"
    height: "44px"
  segmented-option:
    backgroundColor: "transparent"
    textColor: "{colors.night-text-2}"
    rounded: "{rounded.inner}"
    padding: "0 14px"
    height: "34px"
  segmented-option-pressed:
    backgroundColor: "{colors.raspberry}"
    textColor: "{colors.ink-white}"
  day-rail-day:
    backgroundColor: "transparent"
    textColor: "{colors.night-text-3}"
    typography: "{typography.mono-label}"
    padding: "0 4px 0 18px"
    height: "46px"
  day-rail-count:
    backgroundColor: "{colors.night-raised}"
    textColor: "{colors.night-text-2}"
    rounded: "{rounded.pill}"
    padding: "3px 6px"
  listing-row:
    backgroundColor: "transparent"
    textColor: "{colors.night-text}"
    padding: "20px 12px"
  listing-row-hover:
    backgroundColor: "{colors.night-raised}"
  seat-meter-track:
    backgroundColor: "{colors.night-seat-track}"
    rounded: "{rounded.pill}"
    height: "6px"
  seat-meter-fill:
    backgroundColor: "{colors.electric-cyan}"
    rounded: "{rounded.pill}"
    height: "6px"
  seat-meter-fill-low:
    backgroundColor: "{colors.pastel-pink}"
  toast:
    backgroundColor: "{colors.night-raised}"
    textColor: "{colors.night-text}"
    rounded: "{rounded.sm}"
    padding: "12px 12px 12px 16px"
    width: "400px"
  notice-error:
    backgroundColor: "{colors.night-danger-soft}"
    textColor: "{colors.night-danger-text}"
    rounded: "{rounded.sm}"
    padding: "12px 14px"
---

# Design System: InfectionSkillHub

## Overview

**Creative North Star: "The Night Agenda"**

InfectionSkillHub reads like a city's cultural agenda printed for the evening: the season's workshops filed under their day, each day opened by a large day numeral over a raspberry rule, times standing in a fixed mono column at the left, seats shown as a short meter, and the action at the row's end. It is a listing, not a marketplace: there are no cards, no hero, no photography. Density is that of a printed programme, generous between days (48px) and tight within a row.

The world is nocturnal by default. Dark mode is the eggplant ground with deep purple rules; light mode is the same agenda printed on pink-tinted stock with eggplant ink, not a separate design. Both themes are derived from one pinned eight-color palette; every other color in the build is a `color-mix(in oklab, ...)` of two palette colors (or a palette color and white or black), or an `oklch(from ...)` adjustment of one. Personality lives in the details (the glyph-free calendar mark, the gliding magenta rail marker, the mono figures) and never at the cost of legibility.

Theme resolution: the saved choice in `localStorage` (`infectionskillhub.theme`), else `prefers-color-scheme`, applied on `<html data-theme>` before first paint. `:root` alone resolves to dark. Color tokens prefixed `night-` belong to dark, `stock-` to light; the palette tokens are shared.

**Key Characteristics:**
- Agenda rows under day headings; hairline dividers instead of containers.
- One eggplant-and-raspberry world in two printings (night and pink stock).
- Scarce accents with fixed jobs: cyan for times, seats and confirmation, magenta for the active day and focus, coral for full, cancelled and error.
- Red Hat superfamily: Display for headings, Text for reading, Mono for every figure.
- Flat print surfaces; the only shadow belongs to the floating toast.
- One motion moment (the rail marker), one settle (seat meters), all removed under reduced motion.

## Colors

Eight owner-pinned inks, eggplant dominant and raspberry as the brand voice, with two neon accents kept scarce enough to stay meaningful.

### Primary
- **Raspberry** (raspberry): the brand. Primary buttons, the pressed segmented option, the 3px rule under every day heading, the empty-state top rule, the active nav underline, the checked switch, text selection, and the wordmark's calendar sheet. In light mode it is also the day-heading color and the low-seat meter fill.
- **Raspberry Hover** (night-brand-hover / stock-brand-hover): raspberry mixed 82% with neon magenta at night, 82% with eggplant on stock. Hover only.

### Secondary
- **Electric Cyan** (electric-cyan): at night, workshop start times and the seat meter fill; the seat color also marks confirmation (the success toast icon, the info notice stroke and wash). On stock it would fail contrast, so the seat fill uses **Deep Cyan** (stock-seat, `oklch(from cyan 0.56 c h)`, same hue darkened to hold 3:1 on pink stock) and times use **Dusk Purple** (stock-time, deep purple 85% with cyan 15%).
- **Pastel Pink** (pastel-pink): at night, the heading accent (day numerals and labels, links, the "Hub" of the wordmark, the excerpt masthead) and the low-seat meter fill. It also tints every night text tone toward warm white.

### Tertiary
- **Neon Magenta** (neon-magenta): the active day (rail marker and its count pill tint, the active chip border on the date strip), the focus ring, and the input caret. On stock it becomes **Stock Magenta** (stock-focus, magenta 55% with eggplant) for both roles.
- **Coral Red** (coral-red): full meters, cancelled status and strikethrough, error notices, field errors, invalid inputs, the destructive button, and error toasts. Text uses the lightened or darkened **Danger Text** (night-danger-text / stock-danger-text); backgrounds use **Danger Wash** (night-danger-soft / stock-danger-soft).

### Neutral
- **Eggplant** (eggplant): the night ground and the stock ink. Also `theme-color`.
- **Night Raised** (night-raised, eggplant 82% / deep purple): row hover, quiet hover, toasts, rail count pills.
- **Night Sunken** (night-sunken, eggplant 88% / black): inputs and the segmented track.
- **Night Panel** (night-panel): the season excerpt panel on sign in and sign up.
- **Deep Purple** (deep-purple): the strong rule at night (rail spine, input stroke, quiet button stroke, scrollbar thumb); secondary text on stock.
- **Night Rule** (night-rule): hairline dividers between rows and around the top bar and footer.
- **Night Text / Text 2 / Text 3** (night-text, night-text-2, night-text-3): primary, secondary, and tertiary text; the first two are pastel pink in white, the third muted lavender in white.
- **Pink Stock** (stock-bg, stock-sunken, ink-white for raised surfaces): the light ground is pastel pink 7% in white; sunken surfaces 14%.
- **Stock Rules** (stock-rule, stock-rule-strong): muted lavender at 28% and 55% in white.
- **Muted Lavender** (muted-lavender): only as a mixing source for tertiary text, rules and tracks.
- **Ink White** (ink-white): text on raspberry and on the hovered destructive button, the switch knob when on, the wordmark rings and day square, and the raised surface on stock.

### Named Rules
**The Eight Inks Rule.** Every color is one of the eight pinned palette colors or a `color-mix(in oklab, ...)` / `oklch(from ...)` derivation of them, with white and black allowed only as mixing endpoints and as ink on raspberry or coral. No new hue enters the system.

**The Fixed Jobs Rule.** Cyan means time, open seats and confirmation; magenta means "you are here" (active day, focus); coral means stopped (full, cancelled, error, destructive). An accent never decorates.

**The One World, Two Printings Rule.** Light mode is the night agenda reprinted on pink stock with eggplant ink. Every role token exists in both themes; never style a component for one theme only.

## Typography

**Display Font:** Red Hat Display (with Segoe UI, sans-serif), weights 500 to 900, self-hosted woff2.
**Body Font:** Red Hat Text (with Segoe UI, sans-serif), weights 400 to 600.
**Label/Mono Font:** Red Hat Mono (with ui-monospace, monospace), weights 400 to 600.

**Character:** One superfamily in three voices: a heavy, tightly tracked Display for the day numerals and headings, a calm Text for reading Spanish workshop data, and a Mono that makes every time, code and seat figure line up like a printed timetable. Body text runs tabular numerals throughout.

### Hierarchy
- **Display** (800, 3rem, 0.9, -0.04em; 2.4rem on phones): the day numeral at the head of each agenda day. The excerpt masthead on auth pages uses the same voice at `clamp(2.4rem, 4.4vw, 3.6rem)` / 0.95 / -0.035em.
- **Headline** (800, 2rem, 1.15, -0.02em; 1.6rem on phones): one h1 per page ("This season's agenda", "My enrollments").
- **Title** (700, 1.1rem, 1.15): the workshop title in a row. The day's weekday sits beside the numeral at 700 / 1.05rem; the empty-state heading at 1.25rem.
- **Body** (400, 1rem, 1.55, tabular numerals): running text; the lede is capped at 62ch in secondary text. Row descriptions and instructor names use 0.92rem.
- **Label** (600, 0.9rem): form field labels; buttons at 600 / 0.95rem / 1 (0.875rem small).
- **Time** (Mono 600, 1rem, 1): the start time; the end time sits under it in Mono 400 / 0.8rem tertiary.
- **Mono Label** (Mono 500, 0.78rem, 0.08em, uppercase): the month under the weekday, the day's workshop count, the rail dates (0.82rem, 0.04em).
- **Code** (Mono 500, 0.75rem, 0.08em): workshop codes (FOT-001) in tertiary text.

### Named Rules
**The Mono For Figures Rule.** Times, workshop codes, seat numbers, counts and rail dates are set in Red Hat Mono. Words are never set in Mono except the uppercase date and count labels that belong to a figure.

**The Heavy Numeral Rule.** Display weight 800 is reserved for day numerals, the page h1, the wordmark and the auth masthead. Everything else stays at 700 or lighter.

## Layout

A centered container of `min(1240px, 100% - 48px)` (100% - 32px on phones) under a sticky 64px top bar (60px on phones). Pages pad 40px above and 72px below (28px top on phones). The catalog is a two-column agenda: a 196px sticky day rail and the listing column, 48px apart. The page header puts the h1 and lede on the left and filters (search at up to 300px, the seats switch, or the segmented status filter) on the right, wrapping as needed, 36px above the first day.

Rows are a five-track grid: time (76px), what (1.6fr), who (1fr), seat meter (190px), action (112px), with a 24px gap and 20px by 12px padding. Enrollment rows use time, what (1.3fr), state (1.3fr), and a 316px actions track. Consecutive days sit 48px apart. Sign in and sign up split the viewport: the season excerpt panel (0.9fr) and a centered 400px form (1.1fr).

Responsive behavior:
- **At 1080px and below**, the rail becomes a sticky horizontal date strip of pill chips under the top bar (blurred, translucent ground); rows collapse to time, content (1fr) and a 200px column holding meter and action; enrollment actions stack. Auth goes single column with the excerpt below the form and the wordmark pinned top left.
- **At 680px and below**, every row becomes a 58px time column plus one stacked content column (12px by 16px gaps); the nav wraps onto its own line; the segmented filter goes full width; the day count hides.

Spacing rhythm in use: 6, 12, 18, 24, 48px, with 8, 10, 14, 16, 20, 28, 36px for local fits.

## Elevation & Depth

Flat print. Depth comes from tonal steps of the ground (sunken for fields, raised for hover and pills, panel for the auth excerpt) and from rules, not from shadows. Two exceptions, both functional: sticky bars (top bar, mobile date strip) use a translucent ground (92% and 94% of the background) with `backdrop-filter: blur(10px)`, and the toast, which floats over content, carries the system's single shadow.

### Shadow Vocabulary
- **Toast lift** (`box-shadow: 0 12px 32px -12px color-mix(in oklab, black 70%, transparent)` at night; `0 12px 32px -14px color-mix(in oklab, eggplant 35%, transparent)` on stock): floating notices only.
- **Focus halo** (`box-shadow: 0 0 0 3px color-mix(in oklab, focus 30%, transparent)`): text inputs on focus, together with a focus-colored border.

### Named Rules
**The Flat Print Rule.** Nothing on the page surface casts a shadow. A shadow means the element floats above the agenda (a toast); a blur means it is pinned (a sticky bar).

## Shapes

Small, even corners: 6px for buttons, inputs, notices, toasts, skeletons and the segmented track; 4px for anything nested inside a padded container (segmented options, toast close). Pills (999px) for rail counts, the date strip chips, the switch, seat meter tracks and scrollbar thumbs. The wordmark sheet and favicon are an 8px-rounded square. Structure is drawn with rules: 1px hairlines between rows and around chrome, a 3px raspberry rule under each day heading and the excerpt list, a 2px raspberry rule above empty states, and the rail's 1px deep purple spine with a 3px magenta marker.

Icons are one stroked family drawn inline as SVG: 24px grid, 1.8 stroke, round caps and joins, 18px default and 14 to 16px inline with text.

## Components

### Buttons
Confident, compact and print-flat.
- **Shape:** gently squared (6px), 42px tall (36px small), 600 weight text.
- **Primary:** raspberry with white ink, 0 18px padding. Used for Enroll, Certificate, Create account, form submit.
- **Hover / Focus / Active:** hover moves to Raspberry Hover; press nudges down 1px; focus is the 2px magenta outline at 2px offset. Disabled primary drops to the rule color with tertiary text ("Full").
- **Quiet:** transparent with a strong-rule stroke and primary text; hover fills raised. Secondary actions (Sign in, Try again, Clear filters).
- **Danger:** outlined in coral at 60% with Danger Text; fills solid coral with white only on hover or focus. Kept 28px from any sibling action.
- **Loading:** a 14px current-color ring spins after the label.
- **Icon button:** 38px square, hairline stroke, secondary text; theme toggle and sign out.

### Chips
- **Segmented filter:** a sunken 6px track with 3px inset holding 4px-rounded options in secondary text with a Mono count; the pressed option is raspberry with white ink.
- **Date strip chips (tablet and phone):** pill outlines in the rule color, Mono uppercase dates; the active day takes a magenta border.

### Cards / Containers
There are no cards. The agenda row is the container.
- **Corner Style:** square rows; 6px only on notices and toasts.
- **Background:** transparent rows that fill raised on hover; the participant's own enrollment row tints raspberry at 9% with a raspberry divider at 55%.
- **Shadow Strategy:** none (see Elevation & Depth).
- **Border:** a 1px hairline under each row.
- **Internal Padding:** 20px by 12px.

### Inputs / Fields
- **Style:** 44px tall, sunken ground, strong-rule 1px stroke, 6px corners, magenta caret; search inputs carry a 16px leading icon at 38px left padding.
- **Focus:** border turns the focus color with a 3px 30% focus halo; no outline.
- **Hover:** border moves to tertiary text.
- **Error / Disabled:** invalid fields take a coral border and a Danger Text message with a 14px alert icon; hints sit below in tertiary 0.82rem.
- **Switch:** a 36 by 20px pill track in the seat-track color with a 14px knob; on, the track turns raspberry and the white knob glides 16px.

### Navigation
- **Top bar:** sticky, translucent and blurred, hairline below. Wordmark at left, links in secondary text (500 weight, 8px by 12px, 6px corners) that brighten and fill raised on hover; the current page gets primary text and a 2px raspberry underline seated on the bar's bottom edge. Account cluster at right (theme toggle, first name with user icon, sign out; or Sign in and Create account). On phones the links wrap to a second line and the name and Create account hide.
- **Skip link:** raspberry, revealed at top left on focus.

### Day Rail (signature)
Live wayfinding for the season. A sticky column of every season day in Mono uppercase (EEE MMM D) with a pill count, on a 1px deep purple spine. A single 3px magenta marker glides between 46px rows (0.35s, `cubic-bezier(0.16, 1, 0.3, 1)`) to the day in view; pressing a day jumps to it. The active day's text brightens and its count pill tints magenta at 22%. Below 1080px it becomes the sticky date strip described under Chips.

### Day Heading (signature)
A Display numeral (800, 3rem) beside the weekday (Display 700) over the month in Mono uppercase, the day's count right-aligned in Mono, all in the heading accent, standing on a 3px raspberry rule.

### Seat Meter (signature)
A 6px pill track with a fill proportional to seats left (cyan; pastel pink at night or raspberry on stock when 2 or fewer, or 20% or less, remain), under a label "**12** of 15 seats left" with the figure in Mono 600. Full reads "Full · 15 seats taken" in Danger Text, 600 weight. The text always carries the state; the bar repeats it. The fill settles once from zero (0.6s, ease-out).

### Status
An icon plus word in 600 / 0.875rem: check and "Enrolled" or "Active" in primary text; ban icon and "Cancelled" in Danger Text, with the row's title struck through in coral and its time dimmed.

### Notices and Toasts
Notices are inline 6px bars (12px by 14px) with a leading icon: error on Danger Wash with a coral stroke at 45%, info on a cyan wash. Toasts stack bottom right (400px max), raised with the toast shadow, rise 8px into place over 0.3s, and close with a 30px ghost button; success icons in the seat color, error toasts with a coral stroke.

### Wordmark
A raspberry 8px-rounded square drawn as a calendar sheet (two white binding rings, a header line, and a white day square), followed by "Skill**Hub**" in Display 800 with "Hub" in the heading accent. The favicon is the same mark.

## Do's and Don'ts

### Do:
- **Do** file every list of workshops or enrollments under day headings as rows: Mono time column at left, content, then state and action at the row's end.
- **Do** derive any new color as `color-mix(in oklab, ...)` of two palette colors (or a palette color with white or black) and define it for both `[data-theme='dark']` and `[data-theme='light']`.
- **Do** set times, codes, counts and seat figures in Red Hat Mono, and keep body text on tabular numerals.
- **Do** pair every status color with a word and an icon (Full, Enrolled, Active, Cancelled); color repeats state, it never carries it alone.
- **Do** keep destructive actions outlined in coral until hovered or focused, and at least 28px from the nearest sibling action.
- **Do** use the 2px magenta focus outline at 2px offset on every interactive element; inputs use the focus border plus 3px halo instead.
- **Do** confine motion to the rail marker glide, the seat settle, the switch knob and the toast rise, all on `cubic-bezier(0.16, 1, 0.3, 1)`, and keep the global `prefers-reduced-motion` override.

### Don't:
- **Don't** introduce a grid of identical workshop cards; the agenda row is the only listing container.
- **Don't** add a ninth hue or a raw hex outside the palette; white and black appear only as mixing endpoints and as ink on raspberry or coral.
- **Don't** use cyan, magenta or coral decoratively; each has one job (time, seats and confirmation; active day and focus; stopped).
- **Don't** put shadows on page surfaces; only floating toasts cast one.
- **Don't** fabricate photography, testimonials or logos; the calendar mark is the only image.
- **Don't** style a component for one theme only; light is the same agenda on pink stock.
