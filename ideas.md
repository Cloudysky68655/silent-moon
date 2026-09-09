# Silent Moon — Design Direction

## Ground-truth reference

This is a recreation task. The supplied `MeditationappUI(Community).zip` is the visual source of truth. Fidelity to the reference overrides generic design advice: the website should preserve the reference’s distinctive pastel wellness illustrations, lavender active states, light Home theme, deep navy Sleep theme, rounded card system, generous whitespace, and bottom navigation language while adapting the product deliberately for desktop and mobile.

## Chosen approach: Quiet illustrated wellness

### Design Movement

Contemporary editorial wellness UI with a soft illustrated product language: warm minimalism, rounded geometry, friendly flat vector art, and a calm night/day contrast inspired by modern mindfulness applications.

### Core Principles

1. **Calm hierarchy.** Spacious compositions, restrained copy, and clear visual emphasis should make the next action obvious without feeling urgent.
2. **Illustration as atmosphere.** Artwork is not decoration added after layout; it supplies mood, category recognition, and the emotional entry point for each card.
3. **Day-to-night continuity.** The light Home experience and deep navy Sleep experience should feel like the same product viewed at different times of day.
4. **Responsive belonging.** Desktop is not a stretched phone screen. It receives wider editorial framing, richer side-by-side groupings, and comfortable content density while retaining the mobile card rhythm.

### Color Philosophy

Lavender is the ownable emotional anchor: it signals quiet focus and appears in active states, primary course artwork, and the brand mark. Warm cream and butter yellow keep the light theme human and optimistic. Deep navy creates a visual room for sleep content, while muted blue-violet surfaces keep the night theme soft instead of stark. Charcoal text is used on light surfaces and pale text on night surfaces to keep contrast stable.

### Layout Paradigm

A responsive editorial canvas with a narrow reading rail on mobile and a broad, asymmetric content frame on desktop. The Home view uses a greeting-led column, a two-card feature split, an offset daily-thought banner, and horizontally scrolling recommendation rails. The Sleep view uses a full-bleed atmospheric header followed by a featured story and staggered content grid. Desktop navigation becomes a slim persistent side rail; mobile navigation remains a bottom dock.

### Signature Elements

- A lavender moon/pebble mark paired with a widely tracked Silent Moon wordmark.
- Organic blob silhouettes behind featured content, used as a quiet visual motif rather than a generic gradient.
- Thin outlined line icons inside filled rounded-square active states, echoed across category selectors and navigation.

### Interaction Philosophy

Interactions should feel like settling into a comfortable ritual. Taps and clicks respond with a small physical press, cards lift only slightly, and selected states become clearer through color and icon changes rather than noisy effects. Audio controls use familiar play/pause/progress language. On desktop, hover adds a restrained lift and artwork scale; on touch devices, all key actions remain reachable without hover dependence.

### Animation

Use short ease-out transitions under 280ms for buttons, cards, navigation states, and category selection. Featured artwork can drift by a few pixels on initial reveal, while decorative stars and blobs should remain mostly still to preserve calm. Page changes use a subtle opacity/translate transition rather than a dramatic route animation. Respect `prefers-reduced-motion` by disabling non-essential entrance and hover motion.

### Typography System

Use `Manrope` for body copy, controls, and interface labels because its geometric forms keep small text friendly and legible. Use `DM Sans` for large headings and branded moments, with weight 700–800 for greeting and section titles and weight 500 for supporting copy. The Silent Moon wordmark uses custom tracking and a small illustrated mark rather than plain text alone. Typography should preserve the reference hierarchy: bold charcoal headline, light gray/blue-gray supporting line, uppercase metadata, and short pill labels.

### Brand Essence

**A gentle library of guided stillness for people who want a calmer daily rhythm, distinguished by illustrated rituals that make meditation feel approachable.**

Personality: **soothing, curious, quietly optimistic**.

### Brand Voice

Headlines should sound personal and present, CTAs should feel like invitations rather than commands, and microcopy should use simple sensory language. Avoid generic filler such as “Welcome to our website” or “Get started today.”

Example headline: “A softer start to your day.”

Example CTA: “Begin a quiet moment.”

### Wordmark & Logo

The mark is a rounded lavender moon-stone with a small inner crescent and soft atmospheric highlight, paired with a widely tracked wordmark. The symbol must be usable alone in navigation and as a favicon; the wordmark should appear as a designed lockup rather than a default browser font treatment.

### Signature Brand Color

**Moon Lavender — `#8F8CF3`**. This color owns the active-state system and connects the light Home surface to the muted blue-violet language of Sleep.

## Implementation reminder

Every CSS/component/page file should begin with a short comment that points back to this reference-faithful direction and states the file-specific visual responsibility. Ask before each design choice: “Does this reinforce or dilute the quiet illustrated wellness direction?”
