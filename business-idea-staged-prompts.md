# Converging Business Idea Prompt Sequence (5 Stages)

Run these one at a time, in order. Each stage's job is to shrink the amount of raw material the next stage has to reason over — that's what actually produces convergence, instead of one prompt trying to hold your whole research site in its head at once and guessing at the end.

Do not skip a stage or merge them back into one mega-prompt — the narrowing *is* the mechanism.

Create a new tab for each stage's output. Never modify existing tabs.

---

## STAGE 1 — Converge the Research Into a Map (no ideas yet)

```
Analyze this entire website — all pages, research, user insights, frameworks,
questions, answers. Do not generate business ideas in this step.

Your only job is to convert scattered research into a structured map:

1. USER SEGMENTS
   For each distinct user segment you find: name it, list defining traits,
   goals, behaviors, frustrations, and unmet needs. Merge duplicate/overlapping
   segments from different pages into one entry.

2. RECURRING PROBLEMS
   List every real problem/pain point mentioned, and note how many separate
   places on the site mention it and how strongly it's expressed. Rank by
   frequency + intensity, most-evidenced first. Cite the source page for each.

3. OPPORTUNITY THEMES
   Group the ranked problems into 4-8 broad themes (clusters of related
   problems/segments). This is the level you'll generate ideas from next —
   not too broad ("people need help"), not too narrow (one single quote).

4. BUSINESS Q&A LOG
   Every business-related question already asked or answered anywhere on the
   site. For each: question, answer found (or "Needs Answer"), source,
   related segment/problem. For every "Needs Answer" item, tag it CRITICAL
   (blocks understanding the customer, the problem, or willingness to pay) or
   MINOR (a detail like exact price or channel).

Do not invent answers or evidence. If something is unclear, say so rather
than filling the gap. Output as a new tab titled "Stage 1 — Insight Map."
```

**Output of this stage becomes the ONLY input to Stage 2** — copy the Stage 1 tab content into the next prompt rather than re-pointing the AI at the whole site again.

---

## STAGE 2 — Generate Bounded Candidate Ideas

```
Using ONLY the Insight Map below (not the original site), generate 10-15
candidate business ideas. Each idea must trace directly to a specific
opportunity theme, problem, and segment from the map — no ideas from outside
this material.

For each candidate, give:
- One-line pitch
- Target segment (from the map)
- Problem being solved (from the map)
- Evidence tag: EVIDENCE-BASED (2+ distinct data points from the map support
  it) or INFERRED (plausible extrapolation, fewer than 2 direct points)

Keep pitches short — one line each. Do not develop these further yet.

[PASTE STAGE 1 OUTPUT HERE]
```

---

## STAGE 3 — Filter and Score (Converge to Top 3)

```
Take the candidate ideas below and run them through this exact process.

STAGE A — HARD FILTERS (must pass ALL; reject and log why if any fail):
1. Addresses a problem that's evidenced or plausible from the research — no
   outside ideas.
2. Can be realistically tested/validated within 5-15 hours/week and a
   $500-2,000 budget for a FIRST validation step, not a full build.
3. Has a plausible first-customer path that doesn't require resources
   (existing audience, funding, proprietary access) not shown to exist in
   the research.
No filters on business model type — subscriptions, services, inventory,
cold outreach, regulated industries, marketplaces are all in scope if they
clear the three filters above.

STAGE B — SCORING (1-10 each, then weight):
| Criterion                     | Weight |
|--------------------------------|--------|
| Problem strength / evidence    | 25%    |
| Feasibility for 5-15hrs/$500-2k| 25%    |
| Market opportunity             | 15%    |
| Differentiation potential      | 15%    |
| Business model viability       | 20%    |

STAGE C — PENALTY:
Each unresolved CRITICAL question tied to the idea (from the Business Q&A
log): -1 to -2 points off the weighted total. MINOR unresolved questions:
flag only, no penalty. When two ideas land within 1 point, the
EVIDENCE-BASED one ranks higher than an INFERRED one.

OUTPUT: Rank everything. Show the TOP 3 with full score breakdown and
evidence tag. For every idea NOT in the top 3, one line on why it was cut
or scored lower — nothing disappears silently.

[PASTE STAGE 2 OUTPUT HERE]
```

---

## STAGE 4 — Side-by-Side Comparison (so you can choose)

```
For each of these top 3 ideas, build a compact one-page lean comparison
canvas — enough detail to compare them against each other, not yet a full
plan:

- Problem
- Target customer
- Value proposition (one sentence)
- Revenue model
- Biggest single risk
- Key costs to get started
- First validation step, sized to 5-15 hrs/week and $500-2,000
- Evidence tag and score from Stage 3

Present all 3 side-by-side in a comparison table so the trade-offs between
them are visible at a glance. Do not recommend one over another — this
stage is for me to choose from, not to be chosen for me.

[PASTE STAGE 3 TOP-3 OUTPUT HERE]
```

**Stop here and pick one yourself.** Then run Stage 5 on just that one.

---

## STAGE 5 — Full Lean Business Plan (run only on the ONE you picked)

```
Build a full lean business plan for this single idea, using everything
known about it from prior stages plus reasonable inference where the
research doesn't cover something (mark inferred sections clearly).

Cover:
- Target customer profile (who, specifically)
- Core problem and value proposition
- Offer / product-service definition
- Pricing (model + starting price point, with reasoning)
- Distribution / channels to reach the first customers
- Acquisition approach and retention approach
- Cost structure (what it actually costs to run)
- Revenue model and path to first revenue
- MVP scope — the smallest version worth building first
- 30-60-90 day roadmap with concrete milestones
- Key risks and how to mitigate each
- Validation milestones — what result at each stage means "keep going" vs
  "stop and rethink"

Where the underlying research doesn't answer something, say so and mark it
"Needs Validation" rather than inventing a confident number.

[PASTE THE CHOSEN IDEA'S STAGE 3/4 DETAIL HERE]
```

---

### Why this structure fixes the "scattered, can't converge" problem

Each stage only sees the *output* of the one before it, not the whole site again — so the amount of material to reason over shrinks every step: whole site → insight map → 10-15 ideas → top 3 → 1 chosen idea → full plan. That shrinking is what convergence actually looks like. A single mega-prompt asks an AI to hold all of that at once and jump straight to a confident final answer, which is exactly what tends to produce either a huge undifferentiated idea dump or a shallow, hand-wavy pick.
