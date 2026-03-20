# Sandlers Partners Intake Landing Page

## What This Repo Is

This repo is a focused intake microsite for the broader OpenClaw delivery product.

Its job is not to be the whole OpenClaw system. Its job is to collect structured intake data from a specific ICP, turn that into a normalized submission, and hand that submission into the larger delivery pipeline.

Current ICP:

- Sandler agents
- Sandler sub-agents
- agents with sub-agents
- agency owners / sales leaders
- newer agents building their workflow

Current product shape:

- a landing page at `/`
- a quiz-style intake flow at `/intake`
- a lightweight backend submission path that stores the intake for downstream ops

## How It Fits Into OpenClaw

Think of OpenClaw as the parent delivery system and this repo as one specialized front-door.

This project sits at the top of the workflow:

1. A prospect lands here.
2. They complete the intake.
3. The intake captures business context, workflow reality, systems, file flow, quoting/paperwork, commissions, trust boundaries, and contact info.
4. The submission is normalized and stored.
5. OpenClaw can use that structured data for qualification, scoping, onboarding, internal prep, and later agent-assisted delivery.

In other words: this repo is the intake and framing layer, not the fulfillment engine.

## What This Repo Is Not

This repo is not:

- the main OpenClaw dashboard
- the internal operator console
- the long-term CRM or source of truth
- the actual execution engine for delivery
- the generalized multi-client product shell

It is a single-purpose intake surface for one offer / one funnel stage.

## Current Active Experience

Right now the active experience is a landing page at `/` that hands into the Sandler Agent Intake quiz at `/intake`.

Important current behavior:

- `/` renders the landing page
- `/intake` renders the quiz and should stay stable
- the homepage CTA should hand users into `/intake`
- the quiz is defined in `src/intake/sandlerIntakeConfig.js`
- the UI shell and submission behavior live in `src/components/IntakeApp.jsx`
- submissions post to `/api/intake`
- the server normalizes the submission in `api/intakeFlow.js`
- the normalized record is appended to Google Sheets in `api/googleSheetsDrive.js`

## Legacy Context Still In The Repo

This repo started life as a different intake/product flow.

Legacy artifacts still present:

- website template preview routes
- template gallery assets
- image-generation strategy docs
- old Stripe-related helpers
- old Twilio / payment-adjacent code

These files are not the current product center of gravity.

Do not assume those older paths represent the current business logic. The active product is the Sandler intake flow unless the user explicitly says otherwise.

## The Most Important Files

- `src/App.jsx`
  Routing. Keep `/intake` intact for the future homepage handoff.

- `src/components/IntakeApp.jsx`
  The quiz shell, step transitions, validation, success state, and submission payload creation.

- `src/intake/sandlerIntakeConfig.js`
  Source of truth for the current Sandler intake questions and contact step.

- `api/intake.js`
  HTTP entrypoint for intake submissions.

- `api/intakeFlow.js`
  Submission normalization and server-side intake shaping.

- `api/googleSheetsDrive.js`
  Current persistence layer.

- `vite.config.js`
  Local dev middleware for `/api/intake`.

## Working Rules For Future Agents

- Treat this as an intake product, not a template showcase.
- If the quiz copy or steps change, update `src/intake/sandlerIntakeConfig.js` first.
- If the submission shape changes, update both the frontend payload builder and `api/intakeFlow.js`.
- If stored fields change materially, review `api/googleSheetsDrive.js` too.
- Do not reintroduce Stripe, checkout, template selection, or old website-intake logic unless the user explicitly asks for it.
- Preserve the quiz feel: step-based progression, clean validation, fast transitions, and clear completion state.
- Keep the route contract simple so a future homepage can hand off to `/intake` cleanly.

## Product Intent

The point of this project is to help OpenClaw start delivery with context instead of guesswork.

The intake should answer questions like:

- What kind of operator is this?
- How do they actually work today?
- Where do deals stall?
- Which systems and accounts matter first?
- What kind of quoting and paperwork support matters most?
- What actions require explicit approval?

If the repo evolves, future agents should keep that framing updated here so this file stays useful as the orientation layer for the project.

## Assumption Note

This document is based on the current codebase plus the stated product direction that this project is part of a larger OpenClaw delivery product. If the broader architecture changes, update this file so future agents do not inherit stale assumptions.
