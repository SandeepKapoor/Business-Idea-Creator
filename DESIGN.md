---
name: Business Idea Map
description: A foundry specimen ledger for 114 business-idea plates — ivory stock, foundry ink, one oxblood accent reserved for "live or selected."
colors:
  stock: "#F7F1E4"
  band: "#EFE3D0"
  ink-1: "#1A1712"
  ink-2: "#453D31"
  ink-3: "#726650"
  slate: "#6B5F4F"
  plane: "#FDFAF3"
  raise: "#F1E7D6"
  sunken: "#ECE0CB"
  oxblood: "#8A2A1F"
  good: "#3A6B3F"
  warn: "#8A6512"
  crit: "#7A2A1C"
typography:
  display:
    fontFamily: "Fraunces, ui-serif, Georgia, 'Times New Roman', serif"
    fontSize: "40px"
    fontWeight: 600
    lineHeight: 1.02
    letterSpacing: "-.01em"
  headline:
    fontFamily: "Fraunces, ui-serif, Georgia, 'Times New Roman', serif"
    fontSize: "32px"
    fontWeight: 600
    lineHeight: 1.08
    letterSpacing: "-.01em"
  title:
    fontFamily: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "18px"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "-.014em"
  body:
    fontFamily: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.68
  label:
    fontFamily: "ui-monospace, 'SF Mono', SFMono-Regular, Menlo, Consolas, 'Liberation Mono', monospace"
    fontSize: "11px"
    fontWeight: 700
    letterSpacing: ".08em"
rounded:
  none: "0px"
  full: "999px"
spacing:
  sp-0: "2px"
  sp-1: "4px"
  sp-2: "8px"
  sp-3: "12px"
  sp-4: "16px"
  sp-5: "20px"
  sp-6: "24px"
  sp-7: "32px"
  sp-8: "40px"
  sp-9: "56px"
  sp-10: "80px"
components:
  button-primary:
    backgroundColor: "{colors.oxblood}"
    textColor: "{colors.stock}"
    rounded: "{rounded.none}"
    padding: "12px 20px"
  button-primary-hover:
    backgroundColor: "{colors.oxblood}"
    textColor: "{colors.stock}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink-1}"
    rounded: "{rounded.none}"
  cluster-badge:
    backgroundColor: "{colors.raise}"
    textColor: "{colors.ink-2}"
    rounded: "{rounded.none}"
    size: "24px"
  nav-tab:
    backgroundColor: "transparent"
    textColor: "{colors.ink-3}"
    rounded: "{rounded.none}"
  nav-tab-current:
    backgroundColor: "{colors.oxblood}"
    textColor: "{colors.oxblood}"
    rounded: "{rounded.none}"
---

# Design System: Business Idea Map

## Overview

**Creative North Star: "The Foundry Specimen Ledger"**

This is a working type foundry's own ledger, not a dashboard. The 114 ideas it holds are specimens — numbered plates proved by being set at genuine scale, the way a real specimen book proves a face by showing it work rather than by a swatch. Everything on the page follows from that: ivory book stock and near-black foundry ink stand in for paper and print, one reserved oxblood accent behaves like a proof-stamp marking a live correction, and the display face (Fraunces, shown at real specimen scale) carries the personality that a coloured UI would otherwise supply.

The ledger replaced an earlier "Vermillion Broadsheet" world — correct for a newsprint-style report, but wrong once the page's actual density (114 numbered items, ten score columns, four axes) made it read as argument rather than as the catalogue it actually is. Confirmed visual rejections carried forward from that replacement: no grey neutrals (ivory/near-black only), no second accent hue, no shadows with blur or colour, no rounded corners anywhere chrome lives, no gradient "glow" painted onto the background.

**Key Characteristics:**
- Flat ink on stock — no lighting effects, no gradients, no blur-shadows.
- Square corners everywhere except one full-pill radius reserved for data-viz (a Gantt-style timeline bar), never for chrome.
- One accent color, oxblood, used only to mark "this is live or selected" — never as decoration.
- Rank and score are shown as ink-weight (light-to-black), never as a second hue.
- One self-hosted display serif (Fraunces) carries every heading at genuine scale; everything else, including all tabulated data, is set in platform sans or platform mono.

## Colors

Two ink tones on one stock color, plus exactly one reserved accent — this is a two-role palette (Primary + Neutral), not a three- or four-color system.

### Primary
- **Foundry Oxblood** (`#8A2A1F` light / `#E2795F` dark): the ledger's one accent. Appears only as (1) the full fill on the primary action button, (2) a tint-wash or underline marking "current location / live / selected" (never a solid fill on anything permanent), and as the tinted base for the five-step ink-weight rank ladder, where it is treated as ink density rather than as hue.

### Neutral
- **Ivory Book Stock** (`#F7F1E4` light / `#1C1712` dark): the page background (`--field`/`--stock`). Never grey — the world is explicitly built on warm ivory paper and warm dark "proof room" stock, not a neutral-grey UI base.
- **Foundry Ink** (`#1A1712` light / `#EFE6D6` dark): primary text color (`--ink-1`). Measured at 14.4:1 against stock in both themes.
- **Ink, Second Weight** (`#453D31` light / `#C9BDA5` dark): body copy and secondary text (`--ink-2`).
- **Ink, Third Weight** (`#726650` light / `#9A8D72` dark): captions, labels, deck text, tertiary annotation (`--ink-3`).
- **Raised Plane** (`#FDFAF3` light / `#241E17` dark): cards, panels, the search box — anything sitting above the stock (`--plane`).
- **Raise** (`#F1E7D6` light / `#332A20` dark): hover state for buttons, nav items, chips (`--raise`).
- **Sunken** (`#ECE0CB` light / `#171310` dark): recessed surfaces, e.g. the "stuck" bad-state box (`--sunken`).
- **Verdict Good** (`#3A6B3F` light / `#78B07D` dark), **Verdict Warn** (`#8A6512` light / `#D1A53F` dark), **Verdict Critical** (`#7A2A1C` light / `#E2795F` dark): the only non-neutral, non-accent hues on the page, reserved for the errata/kill-criterion callouts and named verdict states — never used for rank or decoration.

### Named Rules
**The One Accent Rule.** Oxblood appears in exactly three places: the primary button's full fill, the "live/selected/current-location" tint-wash or underline, and nowhere else. It never decorates chrome, and it never fills a permanently-visible element (a badge, a tag that's always on screen) with a solid color.

**The Ink-Weight Rank Rule.** Score and rank are never colored with a second hue. They're shown as ink density — a five-step ramp from pale oxblood wash to near-black (light theme) or from dark to bright (dark theme) — so "the strongest idea" and "the darkest type" are the same fact, and rank still reads correctly in greyscale.

**The Neutral Badge Rule.** Cluster-identity badges (`.cletter`) are ink-on-raise, not oxblood. A specimen ledger identifies its plates by letter and number, not by color; filling twelve permanently-visible badges with the one reserved accent would turn a live-signal into ambient decoration.

## Typography

**Display Font:** Fraunces (self-hosted, base64-inlined variable font, weight range 300–900, `opsz` 9–144)
**Body Font:** platform sans stack (`ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`)
**Label/Mono Font:** platform mono stack (`ui-monospace, "SF Mono", SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace`)

**Character:** One sourced display serif, shown at genuine specimen scale, carries almost all of the page's personality; everything else — prose, headings below h2, and all tabulated or typed content — stays on the system faces. The contrast between "specimen" (Fraunces) and "annotation" (mono) is the whole point: it has to read as two different kinds of text, not one voice at two sizes.

### Hierarchy
- **Display** (weight 600, `font-variation-settings: "opsz" 144, "wght" 600`, 40px / line-height 1.02): h1 — the title plate and top-level headings, Fraunces only.
- **Headline** (weight 600, same variation settings, 32px / line-height 1.08): h2 — section headings, Fraunces.
- **Title** (weight 700, 18px / line-height 1.3, `-.014em`): h3 — subsection headings, platform sans.
- **Body** (weight 400, 16px / line-height 1.68, max 68ch): running prose — paragraphs, list items, the argument. Platform sans.
- **Label** (weight 700, 11px, `.08em` tracked, uppercase): `.lbl` — field names, index numbers, tracked-caps annotation. Platform mono, tabular numerals.

### Named Rules
**The Content-Not-Container Rule.** Mono is assigned by what the content IS, not by what element it's in: score grids, matrices, field labels, index numbers, and anything the reader types into or picks from are mono; a table of running prose (even if visually tabular) stays in the sans reading face. A table is not automatically "tabulated data."
- **The One Sourced Face Rule.** Fraunces is display-only. Body, UI chrome, and tabular text never reference `--serif` — no system-installed serif reads as a foundry face worth showcasing, so the one licensed exception exists solely for display plates.

## Layout

The reading measure is capped at 68ch (roughly 560px at body size), inside the 65–75ch band where the eye finds the next line without hunting. Above 720px, navigation collapses into a fixed left sidebar (`--sidew: 248px`): identity, the four mode tabs, and (in report mode) an eleven-item section rail, stacked vertically so nothing wraps or competes for horizontal space. The content column (`.wrap`, max-width 1240px) reserves `--sidew + --sp-6` of left padding to match. At and below 720px the fixed sidebar has nowhere to go, so the header reverts to a two-tier sticky top bar: identity/tabs/theme-switch in one row, the section rail scrolling horizontally in a second row beneath it. Mobile reads at 16px body size rather than a smaller mobile size, because density (side-by-side comparison) is a desktop-only requirement; a narrow column has nothing to compare side by side, so the reason for shrinking the type isn't present.

## Elevation & Depth

Flat ink on stock — a specimen ledger has no lighting effect painted onto its paper, so there is no blur, no glow, no colored shadow anywhere in the system. Where a shadow exists at all, it's offset-only with no blur and no hue: a "printed" flat-ink depth model rather than a lit one. Cards at rest carry the smallest offset; deeper overlays (the search modal) carry a larger offset, but the vocabulary never grows a blur radius or a tint.

### Shadow Vocabulary
- **e-1** (`0 1px 0 rgba(26,23,18,.06)` light / `0 1px 0 rgba(0,0,0,.4)` dark): resting cards, chips, buttons at rest.
- **e-2** (`0 2px 0 rgba(26,23,18,.08)` light / `0 2px 0 rgba(0,0,0,.5)` dark): raised controls, hover states, the primary button at rest.
- **e-3** (`0 4px 0 rgba(26,23,18,.1)` light / `0 4px 0 rgba(0,0,0,.6)` dark): the search overlay, the primary button on hover — the deepest offset in the system.

### Named Rules
**The Offset-Only Rule.** Every shadow in this system is a flat vertical offset with zero blur and zero color tint. A shadow that blurs or tints is describing light; this system only describes ink sitting slightly above stock.

## Shapes

Square corners everywhere: `--r-xs` through `--r-lg` are all `0px`. The only exception is `--r-full` (999px), reserved for true pills and data-viz elements (a Gantt-style timeline bar) — never for chrome, buttons, cards, or badges. Borders are hairline (1px) throughout, drawn in a soft ink-tinted rgba (`--ring`, `--ring-2`) rather than a hard neutral grey. The one exception to flat borders is `.mast`'s bottom edge, a 3px solid oxblood rule under the title plate — a printed rule, not a UI accent.

## Components

### Buttons
- **Shape:** square corners (0px), hairline border (1px `--ring` on ghost variants), no border on the filled primary.
- **Primary (`.rollbtn`):** solid oxblood fill (`background: var(--mark)`), stock-colored text, padding `12px 20px`, offset shadow `e-2` at rest rising to `e-3` on hover with a 1px lift (`translateY(-1px)`). This is the one place the accent gets a full permanent fill — reserved for the single primary action per region (running the scoring engine).
- **Hover / Focus:** primary lifts and deepens its shadow; focus-visible everywhere uses a 2px ink ring (`color-mix(in srgb, var(--mark) 72%, white)`) plus a stock-colored spread ring, because a vermillion ring disappears against a full-vermillion filled cell.
- **Secondary / Ghost (`.rollbtn.ghost`):** same box and padding, unfilled; hover fills with `--raise` and ink text. No tertiary button variant exists.

### Chips
- **Style (`.chip`):** hairline border, plane background, ink-2 text, square-ish corners (`--r-md`, 0px).
- **State:** `.chip.on` gets the tint-wash treatment (oxblood-tinted background, oxblood text, oxblood-tinted border) — the same selection idiom used everywhere else, never a solid fill.

### Cards / Containers
- **Corner Style:** 0px radius (`--r-lg` resolves to 0), consistent across `.card`, `.idea`, `.ob`, `.fw`, `.marg`.
- **Background:** `--plane` (raised surface color) against the `--field`/`--stock` page background.
- **Shadow Strategy:** `e-1` at rest (see Elevation & Depth); no hover lift except on `.idea`, which lifts 2px and steps up to `e-2`.
- **Border:** 1px hairline in `--ring`.
- **Internal Padding:** `--sp-4`–`--sp-5` (16–20px).

### Navigation
- **Tabs (`.tab`):** stacked vertically in the sidebar, transparent background, ink-3 text at rest. The selected state is an underline-on-select pattern, not a fill: a 1px left border in oxblood plus an oxblood tint-wash background and oxblood text — never a solid color block.
- **Section rail (`.nav a`):** a ruled list of tracked-caps links, not pills. The current-location state (`.nav a.here`) is marked twice — oxblood text AND heavier weight, on top of the tint-wash and left rule — because nothing on the page is allowed to rest on hue alone.
- **Mobile treatment:** below 720px, tabs go horizontal with a bottom-border underline instead of a left-border underline; the section rail becomes a horizontally scrolling row of bordered pill-like buttons with a fade mask signaling more content off-screen.

### The Ink-Weight Rank Ladder (signature component)
`.den-1` through `.den-5` are the specimen-book device for score and rank: five densities of oxblood-tinted ink, from a pale wash to near-black, applied via `.denfield` to score cells, funnel stages, and any other element needing five ordered steps. The step between `.den-3` and `.den-4` is deliberately uneven — at this hue, lightness 50–58% clears neither the dark ink nor the stock-toned ink at WCAG AA 4.5:1, so steps 1–3 sit above that dead zone and 4–5 sit below it. In dark theme the ladder mirrors and ascends (more ink = more light on dark stock, not less). The CSS values in `01a-field.css` and the JS ramp arrays in `06-scorecard.data.js` are asserted identical by the build's verify step.

### Axis Identity Markers (signature component)
`.axw`, `.axo`, `.axh`, `.axp` mark "which of four axes" using four distinct underline styles — solid (2px), dashed (1.5px), dotted (2px), double (1px) — instead of four colors, because the system has exactly one reserved accent and needed a second way to distinguish four things without borrowing hue.

## Do's and Don'ts

### Do:
- **Do** treat oxblood as a signal, not a color choice: use it only for the primary button's full fill, or a tint-wash/underline marking "live, selected, or current location."
- **Do** express rank and score as ink-weight (the five-step `.den-N` ladder), never as a second hue.
- **Do** use square corners (0px) for every UI element; reserve `--r-full` (999px) exclusively for true pills and data-viz (e.g. a timeline bar).
- **Do** keep shadows offset-only with zero blur and zero color tint (`0 Npx 0 rgba(ink, alpha)`).
- **Do** restrict Fraunces to display headings (h1/h2); keep body copy, UI chrome, and all tabulated data on the platform sans/mono stacks.
- **Do** mark state twice when the primary signal is color (e.g. current-location links get oxblood text AND heavier weight AND a tint-wash) — nothing may rest on hue alone, per this product's WCAG AA accessibility commitment.
- **Do** use distinct underline styles (solid/dashed/dotted/double), not additional colors, when four parallel categories need to be told apart.

### Don't:
- **Don't** introduce a Secondary or Tertiary accent color. This system has exactly one accent (oxblood); everything else is Primary + Neutral.
- **Don't** fill a permanently-visible element (a badge, a persistent tag, cluster chrome) with a solid oxblood — that's reserved for transient/live/selected states and the one primary button.
- **Don't** add blur or color tint to any shadow, or use it to simulate ambient light — this is a flat, printed depth model.
- **Don't** round any corner beyond 0px outside the one `--r-full` pill/data-viz exception.
- **Don't** reintroduce grey as a neutral; the palette is ivory stock and foundry ink, warm in both themes, never neutral grey.
- **Don't** set running prose (paragraphs, list items, section decks) in the mono face — mono is reserved for tabulated data, labels, index numbers, and typed/picked controls.
