---
version: alpha
name: RE:WASTE AI Design System
description: Stark monochrome design system for RE:WASTE AI — hyper-minimalist, pitch-black canvas, neon green accent, terminal-inspired aesthetic. Single vibrant accent color #00FF66 / Neon Green for AI scans and positive environmental metrics.
---

# RE:WASTE AI Design System

## Philosophy

> **"Clean. Black. Alive."**

RE:WASTE AI embraces a hyper-minimalist, stark monochrome aesthetic inspired by terminal interfaces and scientific instrumentation. The design is built on a foundation of absolute restraint: black canvas, dark grey borders, crisp white typography, and a single vibrant accent that signals success and positive impact.

All color, spacing, and typographic decisions serve one purpose: making the AI waste analysis immediately legible and emotionally resonant without visual noise.

## Color System

| Token | Value | Usage |
|---|---|---|
| `--color-canvas` | `#000000` | Page background; the "blackboard" of the interface |
| `--color-ink` | `#ffffff` | Primary text; highest contrast against canvas |
| `--color-body` | `#a3a3a3` | Secondary body text; muted but legible |
| `--color-mute` | `#737373` | Tertiary text; captions, metadata, disabled states |
| `--color-card` | `#111111` | Card/surface background; slightly elevated from canvas |
| `--color-border` | `#262626` | Card borders, input borders, dividers; 1px structural line |
| `--color-accent` | `#00FF66` | **Single accent** — used exclusively for successful AI scan results, positive environmental metrics, and interactive hover states |
| `--color-accent-dim` | `rgba(0, 255, 102, 0.15)` | Subtle accent overlay for hover states, active shadows |
| `--color-accent-glow` | `rgba(0, 255, 102, 0.3)` | Glow effect around successful scan indicators |

### Semantic Color Rules

- **Success/positive**: `--color-accent` (#00FF66) — AI scan complete, item recyclable, carbon offset earned
- **Organic/Compost**: `#22c55e` — muted sage green for organic materials (category only, no accent fill)
- **Landfill/Trash**: `#ef4444` — muted red for landfill items (category only, no accent fill)
- **E-Waste**: `#f59e0b` — muted amber for electronic waste (category only, no accent fill)
- **Hazardous**: `#8b5cf6` — muted purple for hazardous materials (category only, no accent fill)

> **CRITICAL**: Accent color `#00FF66` must appear ONLY in:
> - Successful AI scan result highlights
> - Carbon offset telemetry (+ values, offset amounts)
> - Progress bar fills for waste diverted from landfill
> - Checkmark/check animations for completed challenges
> - Never as background fill for large surfaces, nav, or body text

## Typography Hierarchy

| Token | Font Size | Line Height | Letter Spacing | Weight | Usage |
|---|---|---|---|---|---|
| `display-xxl` | 48px | 48px | -4px | 600 | Hero headline, main page title |
| `heading-lg` | 32px | 40px | -2px | 600 | Major section headings |
| `heading-md` | 20px | 28px | -1px | 600 | Card headings, component titles |
| `body-lg` | 16px | 24px | 0 | 400 | Lead paragraphs, KPI labels |
| `body-md` | 14px | 20px | 0 | 400 | Default body, table cells, metadata |
| `body-sm` | 12px | 16px | 0 | 400 | Captions, footnotes, small print |
| `mono-display` | 12px | 16px | 0 | 500 | Telemetry numbers, scan terminal output |
| `mono-sm` | 10px | 12px | 0 | 500 | Small tags, category labels, badges |

### Font Stack

- **Sans**: `"Inter", "Geist", system-ui, -apple-system, sans-serif`
- **Mono**: `"JetBrains Mono", "Geist Mono", "SF Mono", ui-monospace, monospace`

> **Letter-spacing principle**: Display headings (-4px to -2px tracking) tighten as size increases. Body copy uses natural spacing (0). Mono always uses slight positive tracking (0–2px) for readability at small sizes.

## Border & Elevation System

### Border Radius Scale

| Token | Value | Usage |
|---|---|---|
| `rounded-none` | 0px | Full-bleed bands, dividers |
| `rounded-sm` | 6px | Nav/app buttons, small inputs |
| `rounded-md` | 12px | Feature cards, code blocks, scanner cards |
| `rounded-lg` | 16px | Scanner workspace cards, dashboard panels |
| `rounded-full` | 9999px | Circular avatars, pill-shaped category tags |

### Elevation Levels

| Level | Treatment | Usage |
|---|---|---|
| `level-0` | 1px solid var(--color-border), no shadow | Default surfaces, scanner drop zone outline |
| `level-1` | 1px solid var(--color-border) + `0px 1px 2px rgba(0,0,0,0.3)` micro-shadow | Interactive cards on hover, active state |
| `level-2` | `0px 2px 8px rgba(0,0,0,0.4)` + level-1 border | Focused/selected scanner card, modal |
| `level-3` | `0px 4px 24px rgba(0,0,0,0.5)` | Rare: modal backdrops, toast notifications |

> **Default**: All cards use level-0 (flat). Level-1 appears only on hover/focus. No heavy drop shadows.

### Border Pattern

- **1px solid var(--color-border)** (#262626) is the universal border weight
- No decorative borders, gradients, or 2px+ borders on interactive elements
- Accent color `#00FF66` appears ONLY as text color or 0.15-dimmed overlay, never as border

## Layout System

### Spacing Scale

| Token | Value | Usage |
|---|---|---|
| `spacing-xxs` | 4px | Tight inline spacing |
| `spacing-xs` | 8px | Inline horizontal spacing |
| `spacing-sm` | 12px | Section padding, card gutters |
| `spacing-md` | 16px | Standard card/panel padding |
| `spacing-lg` | 24px | Scanner workspace padding, section gaps |
| `spacing-xl` | 32px | Dashboard panel padding |
| `spacing-2xl` | 40px | Section spacing above/below hero |
| `spacing-3xl` | 64px | Page-level vertical rhythm |

### Container / Max-Width

- Centered container with max-width: 1400px
- Horizontal padding: var(--spacing-lg) on desktop, var(--spacing-xl) on wide screens
- Gutters between grid items: var(--spacing-sm)

### Breakpoints

| Name | Width | Changes |
|---|---|---|
| `mobile` | ≤ 640px | Single-column layout; scanner drops to full-width; challenges stack vertically |
| `tablet` | 768px | 2-up card grids; challenges in 2 columns |
| `laptop` | 1024px | 3-up grids; sidebar navigation appears |
| `desktop` | 1200px+ | Full 4-up grid; dual-pane layout with sidebar |

### Responsive Strategy

- **Stack-first approach**: Everything stacks on mobile, then reflows upward
- **Never scale text below 12px** — keep mono telemetry readable at all widths
- **Accent color remains visible**: Ensure 4.5:1 contrast ratio even on small screens

## Component Specifications

### 1. AI Waste Scanner Workspace (Component A)

**Structural Rules:**
- Drop zone: `border: 2px dashed var(--color-border)` on idle; `border-color: var(--color-accent)` when drag-over or hover
- Card background: `rgba(17, 17, 17, 0.95)` with `backdrop-filter: blur(8px)`
- Category tags: Rounded-full pills with 64px radius, text var(--color-accent) on dim background
- Terminal output area: Monospace font, slight blink cursor animation
- Accent usage: Only on scan-success highlights, carbon offset values

**Component hierarchy:**
```
.scan-wrapper (padding: var(--spacing-lg))
  ├── .drop-zone (border: 2dashed var(--color-border))
  │   └── [drag-over state: border var(--color-accent)]
  ├── .terminal-boot (font-family: mono, font-size: var(--mono-sm), animation: blink)
  │   ├── "Initializing Neural Vision Network..."
  │   └── "Analyzing Material Density..."
  ├── .scan-results (margin-top: var(--spacing-md))
  │   ├── .category-tag (pill, rounded-full, var(--spacing-xs) horizontal)
  │   ├── .item-name (display-xxl, margin: var(--spacing-xs) 0)
  │   ├── .sort-destination (body-md)
  │   ├── .handling-steps (list, no-bullets, var(--spacing-xs))
  │   ├── .circular-metric (accent-glow, mono-display)
  │   └── .carbon-offset (mono-display, accent text)
  └── .scan-progress (progress bar, var(--spacing-xs) height)
```

### 2. Live Telemetry Analytics (Component B)

**Panel Grid Structure:**
- Total items processed: Card, icon (number), value (display-xxl)
- % diverted from landfill: Progress bar + percentage label
- Total carbon saved: Mono display, accent-colored value
- Layout: 3-column on desktop, 1-column on mobile

**Data visualization rules:**
- Use clean Tailwind layout boxes, not external canvas libraries
- Progress bars use `animation: progress-fill 1.5s ease-out`
- Sparkline trends use inline SVG with `--color-accent` for positive trends
- Carbon offset shows as delta: `-0.24 kg CO₂` (accent-colored minus sign)

### 3. Gamified Infrastructure & Community Tracker (Component C)

**Eco-Challenges Checklist:**
- Each challenge: Checkbox + label text (body-md)
- Toggling a checkbox instantly updates the telemetry counter
- Completed challenges have `text-decoration: line-through var(--color-accent)`
- Uncompleted challenges have `color: var(--color-mute)`

**Achievement Badges:**
- Row of pill-shaped badges (rounded-full, 64px radius)
- Badges unlock based on milestones
- Unlocked badges: background `rgba(0, 255, 102, 0.1)`, text `--color-accent`
- Locked badges: `color: var(--color-mute)`, subtle disabled appearance

**Smart Bin Capacity Guidance:**
- Accordion-style layout with category rule sets
- Each bin type: `border: 1px solid var(--color-border)`, padding `var(--spacing-sm)`
- Icon + label + rule text (body-sm)
- Hover state: `border-color: var(--color-accent)`

### 4. Global Interaction States

| State | Treatment |
|---|---|
| `hover` | `border-color: var(--color-accent)` on cards, inputs; `background: var(--color-accent-dim)` |
| `focus` | `outline: 2px solid var(--color-accent)`; `outline-offset: 2px` |
| `active` | Slight scale: `transform: scale(0.98)` on buttons; pressed state on drop zone |
| `disabled` | `opacity: 0.5`; `color: var(--color-mute)`; no hover/focus interactions |
| `success` | `color: var(--color-accent)` + `text-shadow: 0 0 12px var(--color-accent-glow)` |
| `error` | `color: #ff5f57` (system red for errors only, not accent) |

### 5. Accessibility

- **Contrast**: Minimum 4.5:1 for all text; 3:1 for large text (18pt+ or 14pt bold)
- **Focus**: Visible focus outline using `--color-accent` (2px solid)
- **Keyboard**: All interactive elements reachable via Tab; Space/Enter activates checkboxes/buttons
- **Reduced motion**: Disable animations if `prefers-reduced-motion` is set (use `animation: none` on root)
- **Screen readers**: Semantic HTML; category tags have `aria-label` with full name; carbon offset has `aria-live="polite"`

### 6. Dark Mode / High Contrast

- This design system is **optimized for dark mode** (canvas #000000)
- No light-mode variant needed — the black canvas is the intended state
- If high-contrast mode is detected, increase `--color-border` to `#ffffff` and `--color-ink` to `#000000`
- Accent `#00FF66` maintains contrast in all modes

## Architectural Rules

1. **Single accent only**: `--color-accent` (#00FF66) is the ONLY permitted vibrant color. All other hues must be from the grayscale system (ink, body, mute).

2. **No heavy shadows by default**: Elevation is limited to level-1 micro-shadow. Level-2+ requires explicit justification (modal, toast).

3. **Typography contrast over decoration**: Tight letter-spacing on display type is non-negotiable. Do not loosen tracking for "readability" — the -4px on display is a design system constraint.

4. **Border is structure**: Every card, input, and divider has `1px solid var(--color-border)`. Removing borders requires explicit architectural approval.

5. **Accent containment**: Any component that might render `--color-accent` as a fill must have a whitelist review before shipping. Unexpected accent usage blocks the release.

6. **Mobile-first by necessity**: The design degrades gracefully — on mobile, the 4-column grid becomes 1-column, the hero headline stacks, and the scanner full-width. No feature is lost, only reflowed.

7. **Zero generic placeholders**: Every number, label, and piece of placeholder text must be replaced with high-fidelity mock data before commit. No `// TODO: add mock data` comments.

## Do's and Don'ts

### Do
- Keep the canvas absolutely black (`#000000`) and let ink-white carry all information
- Use `--color-accent` (#00FF66) as a sparing signal — 1–3 instances per screen maximum
- Set display headings in Inter/Geist with -4px negative tracking
- Use JetBrains Mono/Geist Mono for all telemetry, scan terminal, and numeric display
- Step the grey text ladder: `ink` → `body` → `mute` → `faint`
- Keep borders at 1px solid `#262626` — the structural workhorse
- Use category tags as rounded-full pills (64px radius) with accent text on rgba(dim)
- Design for keyboard navigation: visible focus, logical tab order
- Test contrast on real devices — simulated contrast often lies

### Don't
- Fill large surfaces with accent color — it lives on text, tiny tags, and 1px highlights
- Mix button shapes — pills for CTAs/categories, 6px squares for nav/app controls (if any)
- Pile on shadows — depth is 1px border + micro-shadow; nothing heavier without cause
- Set body copy in pure black (`#000000`) — the brand's ink is `#ffffff` on canvas `#000000`
- Add a second decorative system — the design language is ink-on-black, nothing else
- Loosen the display tracking — large headings carry -4px tracking by design
- Use external chart libraries — build with Tailwind layout boxes and inline SVG sparklines only
- Leave placeholder text or `// TODO` comments in shipped code