# Nano Banana Template Image Strategy

This project has four landing page templates with distinct visual personalities. The safest automation pattern is:

1. Prefer real uploaded assets when the client has them.
2. Fill missing visual slots with cached AI renders.
3. Cache both the prompt recipe and the generated asset so later rebuilds can reuse either.

## Shared Workflow Model

Use each template as a small set of visual slots instead of "generate random images for the page."

Recommended slots:

- `hero_primary`
- `about_supporting`
- `services_supporting`

Recommended asset source priority:

1. Client-uploaded real image
2. Previously approved cached AI image
3. Fresh AI generation from cached prompt recipe
4. Template-safe abstract fallback

## Suggested Cache Shape

Store both prompt metadata and image metadata together.

```json
{
  "submissionId": "sub_123",
  "templateId": "1",
  "slot": "hero_primary",
  "promptVersion": "v1",
  "promptHash": "sha256(...)",
  "promptTitle": "Dark editorial project leadership portrait",
  "promptText": "full generation prompt here",
  "sourceType": "generated",
  "approved": true,
  "brandTone": "luxury-minimal",
  "aspectRatio": "4:5",
  "seed": 12345,
  "imageUrl": "https://...",
  "thumbUrl": "https://...",
  "createdAt": "2026-03-11T00:00:00.000Z"
}
```

Useful cache keys:

- `templateId + slot + promptHash`
- `submissionId + slot`
- `businessType + brandTone + templateId + slot`

That gives you:

- exact render reuse
- cross-client reuse for generic non-personal imagery
- rebuild stability when the same prompt recipe is chosen again

## What To Generate Vs. What To Keep Real

Use real images for:

- founder headshots
- actual projects
- office/building exteriors if they belong to the client
- logos

Use AI images for:

- mood-setting hero art
- abstract architectural details
- aspirational but non-literal business scenes
- neutral supporting imagery for about/services sections

Best hybrid setup:

- cache real uploaded images as `sourceType: "uploaded"`
- cache AI prompt recipes as reusable style building blocks
- cache approved AI outputs for instant reuse on re-runs

## Prompt Variable Inputs

Build prompts from these intake fields where available:

- company type
- service focus
- location or region
- target clientele
- brand tone
- preferred palette
- whether the brand should feel luxury, corporate, bold, or classic

Avoid putting exact company names into reusable prompt recipes unless the image is meant to be one-off and client-specific.

## Template 1

Template 1 reads like quiet luxury, dark editorial, serious advisory.

Best image style:

- cinematic architectural photography
- premium boardroom or site-visit moments
- dark, textured, understated wealth cues

Best slots:

- `hero_primary`: moody architectural or executive advisory image
- `about_supporting`: close crop detail, documents, materials, site plans
- `services_supporting`: subtle development/planning support image

Prompt ideas:

### Hero

```text
Luxury editorial photograph for a real estate advisory landing page, sophisticated executive atmosphere, refined architectural setting, dark neutral palette, soft bronze highlights, natural window light, high-end magazine composition, understated wealth, no text, generous negative space, premium commercial photography, 4:5 vertical
```

### About

```text
Close-up editorial image of architectural plans, premium material samples, leather folio, gold pen, warm shadows, refined real estate advisory brand aesthetic, cinematic detail photography, muted earth tones, no people, no text, premium magazine style, 3:2 landscape
```

### Services

```text
Professional advisory scene with two senior real estate professionals reviewing development plans in an elegant office, calm confident mood, dark wood, bronze accents, soft directional light, luxury business editorial style, no text, 16:10 landscape
```

## Template 2

Template 2 feels polished, modern, trustworthy, clear, and business-forward.

Best image style:

- crisp corporate photography
- planning tables, renderings, laptops, site maps
- bright but premium professional imagery

Best slots:

- `hero_primary`: polished project/planning visual
- `about_supporting`: operations or coordination image
- `services_supporting`: clean business support scenes

Prompt ideas:

### Hero

```text
Modern commercial photograph for a consulting and project advisory website, confident business environment, development plans and project documents on a clean table, daylight, blue and white palette, sharp professional composition, polished but human, no text, premium corporate photography, 16:10 landscape
```

### About

```text
Professional team in a modern office reviewing construction schedules, planning boards, and financial documents, collaborative but high-end atmosphere, clean natural light, crisp blue-gray palette, realistic business photography, no text, 3:2 landscape
```

### Services

```text
Minimal premium business image showing hands marking up project drawings beside a laptop and coffee, precise operational mood, bright office light, clean composition, consulting brand photography, no text, 4:3 landscape
```

## Template 3

Template 3 feels bold, assertive, directional, and high-contrast.

Best image style:

- strong executive portraiture
- commanding construction/development imagery
- dramatic contrast with dark greens and gold accents

Best slots:

- `hero_primary`: bold leadership or large-scale project image
- `about_supporting`: confident team or on-site leadership image
- `services_supporting`: dramatic infrastructure or operations visual

Prompt ideas:

### Hero

```text
Bold high-contrast commercial image for a capital advisory homepage, confident executive energy, large-scale development backdrop, deep green and gold color harmony, dramatic lighting, premium modern brand campaign photography, powerful composition, no text, 4:5 vertical
```

### About

```text
Senior project advisor walking an active development site with clipboard and architectural drawings, confident leadership posture, dramatic directional light, premium commercial realism, dark green neutral palette, no text, 3:2 landscape
```

### Services

```text
Large-scale construction and planning control room aesthetic, monitors, plans, structured decision-making mood, bold professional tone, dramatic shadows, polished campaign-style business photography, no text, 16:9 landscape
```

## Template 4

Template 4 feels classic, refined, heritage, and relationship-driven.

Best image style:

- timeless editorial interiors
- classical architectural details
- warm cream and burgundy luxury imagery

Best slots:

- `hero_primary`: timeless lifestyle/business portrait or architecture
- `about_supporting`: heritage detail image
- `services_supporting`: elegant discussion or planning image

Prompt ideas:

### Hero

```text
Elegant editorial photograph for a heritage-inspired advisory website, timeless architecture, warm cream and burgundy palette, refined professional atmosphere, soft natural light, classic luxury magazine feel, no text, generous negative space, 4:5 vertical
```

### About

```text
Refined close-up of classical architectural details, textured stone, warm paper documents, rich burgundy accents, heritage luxury tone, soft shadows, premium editorial still life, no text, 3:2 landscape
```

### Services

```text
Sophisticated meeting scene with senior advisors in a refined interior, warm cream walls, burgundy and brass accents, composed and trustworthy mood, timeless commercial photography, no text, 16:10 landscape
```

## Reusable Prompt Fragments

These are good modifiers to append based on the selected template.

Template 1 fragments:

- `dark editorial realism`
- `understated luxury`
- `bronze-accented palette`
- `architectural magazine photography`

Template 2 fragments:

- `clean corporate realism`
- `bright professional daylight`
- `polished consulting brand photography`
- `blue-gray palette`

Template 3 fragments:

- `bold campaign-style realism`
- `dramatic contrast`
- `executive authority`
- `deep green and gold palette`

Template 4 fragments:

- `timeless editorial photography`
- `heritage luxury mood`
- `warm cream and burgundy palette`
- `classic architectural refinement`

## Good Automation Rules

- Generate at most one hero image and one supporting image per build unless the user asks for more.
- Reuse the same approved hero across rebuilds for brand consistency.
- Keep prompts template-specific, but keep subject variables dynamic.
- If a client uploads real project photos, keep AI images out of the hero by default.
- For regulated or credibility-sensitive brands, prefer architecture/details over AI people.

## Safe Fallbacks

If generation fails or a prompt is too generic, use:

- abstract architectural detail
- project plans on desk
- refined office interior
- materials and documents still life

Those fit all four templates better than generic smiling business team photos.

## Recommended Next Implementation Step

Create a small prompt registry in code shaped like:

```ts
templateImageRecipes[templateId][slot] = {
  title,
  aspectRatio,
  basePrompt,
  fragments,
  prefersRealImageFirst
}
```

Then let the workflow:

1. select template
2. select visual slots
3. merge intake data into prompt recipe
4. check cache
5. reuse or generate
6. save output and prompt metadata
7. inject chosen asset URLs into the page payload

