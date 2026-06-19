import type { ArticleContent } from "@/lib/types";

/* ─────────────────────────────────────────────────────────
   Article bodies

   Metadata (title, category, date, excerpt) lives in
   site.json → articles[]; the long-form body lives here,
   keyed by slug. The block model maps 1:1 onto a CMS
   rich-text / portable-text field, so this file can later
   be swapped for a GROQ query without touching the renderer.
   ───────────────────────────────────────────────────────── */

export const ARTICLE_CONTENT: Record<string, ArticleContent> = {
  "warm-up-mistakes-hamstring-injuries": {
    slug: "warm-up-mistakes-hamstring-injuries",
    author: "Marios Liasides",
    reviewedBy: "the Liasides Physio team",
    intro:
      "Hamstring strains are the single most common non-contact injury in running and field sports — and the most likely to come back. The frustrating part? A large share of them are preventable. More often than not, the problem isn't the sprint itself; it's how the body was (or wasn't) prepared in the ten minutes beforehand. Here are five warm-up mistakes we see week after week, and what the evidence says to do instead.",
    body: [
      {
        type: "heading",
        text: "Mistake 1: Static stretching as the main event",
      },
      {
        type: "paragraph",
        text: "Holding a long hamstring stretch before you train feels productive, but pre-exercise static stretching does little to prevent strains and can briefly reduce force output. It's not that stretching is bad — it's that a 30-second hold is not a warm-up. The goal before sport is to raise muscle temperature and rehearse the movements you're about to perform, not to chase end-range flexibility while the tissue is still cold.",
      },
      {
        type: "paragraph",
        text: "Replace passive holds with dynamic mobility: leg swings, walking lunges, A-skips, and progressively faster strides. These move the hamstring through range under light, active control and prime it for speed.",
      },
      { type: "heading", text: "Mistake 2: Skipping the high-speed rehearsal" },
      {
        type: "paragraph",
        text: "Most hamstring strains happen during high-speed running, in the late swing phase when the muscle is lengthening and decelerating the lower leg. If your warm-up tops out at a gentle jog, you've never exposed the hamstring to the demand that actually injures it. The fix is to build up — not jump straight — to near-maximal effort with a few graded strides (for example 60%, 75%, 90%) before your first real sprint or hard rep.",
      },
      {
        type: "callout",
        variant: "info",
        title: "Why late swing matters",
        text: "In late swing the hamstring is both lengthening and producing high force — the riskiest combination. A warm-up that never approaches that speed leaves the most vulnerable moment completely unrehearsed.",
      },
      {
        type: "heading",
        text: "Mistake 3: No eccentric strength in the program",
      },
      {
        type: "paragraph",
        text: "This is the big one, and it lives outside the warm-up itself. The strongest evidence in hamstring injury prevention points to eccentric strengthening — loading the muscle as it lengthens. The Nordic hamstring exercise is the standout: across studies, programs including it have reported roughly 50–70% fewer hamstring injuries, and when performed both before and after training the reductions climb higher still.",
      },
      {
        type: "list",
        items: [
          "Start with 1–2 sessions per week, low volume, and expect soreness at first.",
          "Progress the range you can control before adding reps.",
          "Pair it with hip-hinge strength (Romanian deadlifts, hip thrusts) for full-range capacity.",
        ],
      },
      {
        type: "heading",
        text: "Mistake 4: Treating every player the same",
      },
      {
        type: "paragraph",
        text: "The biggest single predictor of a hamstring strain is a previous hamstring strain. An athlete returning from injury, or one with a known history, needs more preparation — not the same generic circuit as everyone else. A short, individualised top-up (extra eccentric work, more high-speed exposure, attention to the specific leg) is where prevention is won.",
      },
      {
        type: "heading",
        text: "Mistake 5: A warm-up with no structure",
      },
      {
        type: "paragraph",
        text: "Structured warm-up programs work. The FIFA 11+ — a standardised 15-minute routine of running drills, strength, plyometrics and balance — has been shown to cut overall injuries by 20–50%, with high adherence reducing risk further and meaningfully lowering hamstring injuries specifically. The lesson isn't that you must use that exact program; it's that a deliberate, progressive sequence beats a few random stretches every time.",
      },
      {
        type: "quote",
        text: "A good warm-up isn't a ritual — it's the first set of your session. Build temperature, rehearse speed, and respect the athletes who need more.",
      },
      {
        type: "paragraph",
        text: "If you've had a hamstring strain before, or you keep tightening up in the same spot, that's worth a proper look. A short assessment can tell us whether the issue is strength, high-speed exposure, running mechanics, or load management — and which of these five fixes will give you the most return.",
      },
    ],
    keyTakeaways: [
      "Swap pre-training static stretches for dynamic mobility and graded strides.",
      "Rehearse high speed in the warm-up — that's where strains actually happen.",
      "Eccentric work (Nordic hamstring curls) is the most evidence-backed prevention tool.",
      "Past injury is the strongest risk factor — those athletes need individualised prep.",
      "A structured program like the FIFA 11+ beats random stretching.",
    ],
    references: [
      {
        label:
          "Effect of Pre- and Post-training Nordic Exercise on Hamstring Injury Prevention (PMC)",
        url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6734023/",
      },
      {
        label:
          "FIFA 11+ reduces the incidence of hamstring injury: systematic review & meta-analysis",
        url: "https://www.researchgate.net/publication/365438594_The_FIFA_11_injury_prevention_program_reduces_the_incidence_of_hamstring_injury_among_soccer_players_a_systematic_review_and_meta-analysis",
      },
    ],
  },

  "acl-recovery-timeline-week-by-week": {
    slug: "acl-recovery-timeline-week-by-week",
    author: "Marios Liasides",
    reviewedBy: "the Liasides Physio team",
    intro:
      "An ACL reconstruction isn't a single event with a fixed end date — it's a staged rehabilitation that typically spans nine to twelve months. Knowing the milestones helps you stay patient when progress feels slow and confident when it's time to push. Here is a realistic, phase-by-phase look at what good ACL rehab actually involves. Treat the weeks as guides; the criteria are what really decide when you move on.",
    body: [
      {
        type: "callout",
        variant: "info",
        title: "Criteria, not the calendar",
        text: "Modern ACL rehab is criterion-based. You progress when you meet objective targets for strength, swelling and control — not simply because a certain number of weeks have passed.",
      },
      {
        type: "heading",
        text: "Phase 1 — Weeks 0–2: Calm it down",
      },
      {
        type: "paragraph",
        text: "The early priorities are settling swelling, restoring full knee extension (getting the knee fully straight), and switching the quadriceps back on — they tend to shut down after surgery. Expect to work on straight-leg raises, gentle range-of-motion, and walking pattern. Full extension early matters: losing it now is hard to recover later.",
      },
      {
        type: "heading",
        text: "Phase 2 — Weeks 2–6: Restore motion and control",
      },
      {
        type: "paragraph",
        text: "Range of motion is progressed toward full flexion, gait is normalised so you can walk without a limp, and basic strengthening begins. Most people are off crutches in this window. The graft is at its biologically weakest around this time as it remodels, so loading is purposeful and controlled rather than aggressive.",
      },
      {
        type: "heading",
        text: "Phase 3 — Months 2–4: Build strength",
      },
      {
        type: "paragraph",
        text: "This is the strength-building block: progressive resistance training for the quads, hamstrings, glutes and calves, plus single-leg work to close the gap between the operated and healthy side. Stationary cycling and other low-impact conditioning maintain fitness. The target is symmetry — getting the surgical leg back toward the strength of the other.",
      },
      {
        type: "heading",
        text: "Phase 4 — Months 4–6: Running, agility and power",
      },
      {
        type: "paragraph",
        text: "Once strength and control allow, running is reintroduced, followed by landing mechanics, plyometrics and change-of-direction drills. This phase rebuilds the spring and confidence the knee needs for sport. Return to running is earned with adequate quad strength and good single-leg control — not just a date on the calendar.",
      },
      {
        type: "heading",
        text: "Phase 5 — Months 6–9+: Return to sport",
      },
      {
        type: "paragraph",
        text: "The final phase is sport-specific: high-speed running, cutting, contact (where relevant) and full training load, then a graded return to competition. Before clearing an athlete, we look for a battery of objective markers.",
      },
      {
        type: "list",
        items: [
          "Quadriceps strength symmetry of at least 90% versus the other leg.",
          "Hop-test battery (single, triple, crossover, timed) at 90% or better.",
          "Minimal to no swelling under load.",
          "Psychological readiness — feeling genuinely confident to compete (often measured with the ACL-RSI scale).",
        ],
      },
      {
        type: "callout",
        variant: "warning",
        title: "Why the nine-month line matters",
        text: "Returning to sport before nine months — and before meeting strength and hop criteria — is associated with a sharply higher risk of re-tearing the graft. Patience here is genuinely protective, not just cautious.",
      },
      {
        type: "quote",
        text: "The athletes who do best aren't the ones who rush back fastest — they're the ones who hit every milestone before moving on.",
      },
      {
        type: "paragraph",
        text: "Timelines vary with graft type, any meniscus or cartilage work done at the same time, and how your knee responds week to week. A structured, criterion-based plan keeps your recovery honest and your knee protected — and gets you back to sport as strong as, or stronger than, before.",
      },
    ],
    keyTakeaways: [
      "ACL rehab is a staged 9–12 month process, not a fixed countdown.",
      "Restore full extension and quad activation in the first two weeks.",
      "Strength symmetry (≥90%) is the gateway to running and sport.",
      "Returning before 9 months sharply raises re-injury risk.",
      "Clearance is based on objective tests plus psychological readiness.",
    ],
    references: [
      {
        label:
          "ACL Reconstruction Rehabilitation: Criterion-Based Milestones (PMC)",
        url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9460090/",
      },
      {
        label: "ACL Rehabilitation: Return to Sport Tests (Physiopedia)",
        url: "https://www.physio-pedia.com/ACL_Rehabilitation:_Re-injury_and_Return_to_Sport_Tests",
      },
    ],
  },

  "disc-bulge-vs-herniation-surgery": {
    slug: "disc-bulge-vs-herniation-surgery",
    author: "Marios Liasides",
    reviewedBy: "the Liasides Physio team",
    intro:
      "Few scan results cause more panic than the words \"disc bulge\" or \"herniation.\" Many patients arrive convinced surgery is inevitable. For the large majority, it isn't. Understanding what these terms actually mean — and what the evidence says about recovery — usually turns a frightening diagnosis into a manageable plan.",
    body: [
      { type: "heading", text: "Bulge vs herniation: what's the difference?" },
      {
        type: "paragraph",
        text: "A spinal disc has a tough outer ring and a softer gel-like centre. A bulge is when the outer ring presses outward broadly — common, often age-related, and frequently seen on scans of people with no pain at all. A herniation is when the inner material pushes through the outer ring. Herniations are more likely to irritate a nearby nerve and cause leg symptoms (sciatica), but — and this surprises people — they often have a better natural recovery than the name suggests.",
      },
      {
        type: "callout",
        variant: "info",
        title: "Scans don't equal pain",
        text: "Disc bulges and even herniations show up routinely on the MRIs of people who feel completely fine. A finding on imaging is one piece of the picture — not a sentence, and rarely the whole story.",
      },
      { type: "heading", text: "The body is better at this than you'd think" },
      {
        type: "paragraph",
        text: "Here's the part rarely explained in the imaging room: herniated discs frequently shrink on their own. The body recognises the displaced material and gradually reabsorbs it. Most symptomatic herniations settle substantially within six to eight weeks, and conservative (non-surgical) care leads to good improvement in a high proportion of patients — commonly cited around 90%. Larger herniations, somewhat counter-intuitively, can be among the most likely to resorb.",
      },
      { type: "heading", text: "What good conservative treatment looks like" },
      {
        type: "paragraph",
        text: "\"Conservative\" doesn't mean \"do nothing and hope.\" It's an active plan: staying as mobile as your symptoms allow, short-term pain management so you can move, and progressive physiotherapy that restores confidence, controls load, and rebuilds the strength and movement patterns around the spine. Prolonged bed rest is unhelpful; graded activity is the goal.",
      },
      {
        type: "list",
        items: [
          "Education and reassurance — understanding the favourable natural history reduces fear and guarding.",
          "Movement and graded loading rather than rest.",
          "Targeted strengthening for the trunk, hips and legs.",
          "Short-term analgesia where needed, to enable activity.",
        ],
      },
      { type: "heading", text: "When surgery genuinely earns its place" },
      {
        type: "paragraph",
        text: "Surgery has a clear and important role in a minority of cases. It's typically considered when severe, disabling leg pain persists despite a fair trial of conservative care (often around six weeks or more), or when there is significant or progressive nerve compression. In those situations a surgical opinion is the right next step, not a failure.",
      },
      {
        type: "callout",
        variant: "warning",
        title: "Red flags — seek urgent medical care",
        text: "Some symptoms need emergency assessment, not a wait-and-see approach: numbness around the saddle/groin area, loss of bladder or bowel control, or rapidly worsening weakness in a leg. These can indicate cauda equina syndrome — a rare emergency. Don't wait; get seen urgently.",
      },
      {
        type: "quote",
        text: "Most disc herniations are a storm that passes. The job of good rehab is to keep you moving, keep you calm, and let the body do what it's designed to do.",
      },
      {
        type: "paragraph",
        text: "If you've been told a disc is to blame for your pain, the most useful next step is usually a thorough assessment — confirming what the symptoms are actually doing, ruling out red flags, and building a plan that matches the (often very good) prognosis rather than the scary label.",
      },
    ],
    keyTakeaways: [
      "A bulge is broad outer pressing; a herniation is inner material pushing through.",
      "Disc findings appear on scans of plenty of pain-free people.",
      "Most symptomatic herniations improve in 6–8 weeks and often resorb on their own.",
      "Active conservative care helps the large majority avoid surgery.",
      "Saddle numbness, bladder/bowel changes or progressive weakness are emergencies.",
    ],
    references: [
      {
        label:
          "Non-Surgical Management of Lumbar Disc Herniation with Radiculopathy (PMC)",
        url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10888666/",
      },
      {
        label:
          "Indications for surgery vs conservative treatment in lumbar disc herniation: systematic review",
        url: "https://www.sciencedirect.com/science/article/pii/S2772529425014389",
      },
    ],
  },

  "strength-training-for-runners": {
    slug: "strength-training-for-runners",
    author: "Marios Liasides",
    reviewedBy: "the Liasides Physio team",
    intro:
      "Many runners treat the gym as optional — or avoid it entirely, worried it'll make them heavy and slow. The evidence says the opposite. Done well, strength training makes runners more economical, more durable, and often faster, without adding the bulk they fear. Here's why it works and how to start.",
    body: [
      { type: "heading", text: "Mileage alone doesn't make you resilient" },
      {
        type: "paragraph",
        text: "Running loads the same tissues in the same way, thousands of times per run. That repetition builds aerobic fitness brilliantly, but it doesn't build much maximal strength or tissue capacity — which is why runners are prone to overuse injuries like Achilles tendinopathy, shin pain and runner's knee. Strength training adds the capacity that miles alone can't, and consistent strength work has been associated with markedly lower injury rates in runners.",
      },
      { type: "heading", text: "It makes you more economical (read: faster)" },
      {
        type: "paragraph",
        text: "Running economy — how much energy you burn to hold a given pace — is one of the best predictors of distance performance. Adding strength and power training improves running economy by roughly 2–8% in middle- and long-distance runners. Better economy at the same fitness means the same pace costs less, or a faster pace costs the same. Notably, strength work does this without meaningfully changing VO₂max or lactate threshold — it makes you more efficient, not just fitter.",
      },
      {
        type: "callout",
        variant: "info",
        title: "Won't lifting heavy make me bulky?",
        text: "No. Heavy, low-rep strength training primarily improves how your nervous system recruits muscle — it builds force and stiffness with very little size gain, especially alongside high running volume. You get stronger springs, not bigger legs.",
      },
      { type: "heading", text: "What actually works: heavy and explosive" },
      {
        type: "paragraph",
        text: "Two ingredients carry most of the benefit. Heavy resistance training — think squats, deadlifts and calf raises in low rep ranges with challenging loads — drives force production. Plyometrics — hops, bounds and pogos — train the tendons and muscles to store and return energy quickly, which is exactly what running rewards. Combining both tends to beat either alone.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Heavy lower-body lifts: squat, hip hinge/deadlift, and loaded calf raises.",
          "Single-leg work: split squats, step-ups — running is a single-leg sport.",
          "Plyometrics: start low (pogos, skips) and progress to bounds.",
          "Keep it brief: 2 sessions a week of 20–40 minutes is plenty for most runners.",
        ],
      },
      { type: "heading", text: "How to fit it in without wrecking your runs" },
      {
        type: "paragraph",
        text: "Two short sessions a week is enough to see the benefits. Where possible, lift on harder running days (or after a quality run) so easy days stay genuinely easy, and avoid heavy legs right before a key session. Start lighter than you think, prioritise good technique, and progress the load gradually over weeks. The aim is consistency, not heroics.",
      },
      {
        type: "callout",
        variant: "warning",
        title: "Returning from injury?",
        text: "If you're building strength around a current or recent injury, get the starting point and progression checked. The right exercises loaded too soon — or the wrong ones — can stall recovery.",
      },
      {
        type: "quote",
        text: "Runners don't get injured because they're weak by definition — but stronger, springier runners get injured far less and run more efficiently. Strength is the cheapest performance gain most runners are leaving on the table.",
      },
      {
        type: "paragraph",
        text: "If you're not sure where to begin, or you keep breaking down at a certain mileage, a quick assessment can map your strengths, your weak links, and a simple two-day plan that fits around your training rather than fighting it.",
      },
    ],
    keyTakeaways: [
      "Mileage builds fitness but not the strength that prevents overuse injury.",
      "Strength and power work improves running economy by about 2–8%.",
      "Heavy lifting builds force without bulk — it's mostly neural.",
      "Combine heavy resistance with plyometrics for the biggest gain.",
      "Two short sessions a week, progressed gradually, is enough.",
    ],
    references: [
      {
        label:
          "Strength training programs and running economy: systematic review with meta-analysis (PubMed)",
        url: "https://pubmed.ncbi.nlm.nih.gov/38165636/",
      },
      {
        label:
          "Effects of strength training on distance running performance and injury prevention",
        url: "https://trackandfieldnews.com/track-coach/the-effects-of-strength-training-on-distance-running-performance-and-running-injury-prevention/",
      },
    ],
  },
};

export function getArticleContent(slug: string): ArticleContent | undefined {
  return ARTICLE_CONTENT[slug];
}
