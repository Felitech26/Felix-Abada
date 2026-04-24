# ScoutVerse — Scout Role: Full Operations & Feature Roadmap

**Document Version:** 1.0
**Last Updated:** February 2026
**Status:** Active Development

---

## 1. Scout Role Overview

The Scout is the intelligence engine of the ScoutVerse ecosystem. They sit at the intersection of all four roles — discovering players, delivering intelligence to clubs, working with agents, and potentially collaborating with other scouts. Their experience on the platform must be professional, data-driven, and efficient.

A scout on ScoutVerse is not just a profile — they are an active node in a living football network.

---

## 2. Core Operations (Built)

| Feature | Route | Status |
|---|---|---|
| Dashboard | `/scout/dashboard` | ✅ Complete |
| AI-Powered Player Search | `/scout/search` | ✅ Complete |
| Scouting Reports (Create + View) | `/scout/reports` | ✅ Complete |
| Watchlist / Favorites | `/scout/favorites` | ✅ Complete |
| Trip Planner | `/scout/trip-planner` | ✅ Complete |
| Player Analysis (Deep Dive) | `/scout/player/:id` | ✅ Complete |

---

## 3. Extended Operations (In Progress)

### 3.1 Scout Settings / Profile Editor
**Route:** `/scout/settings`
**Purpose:** Allows the scout to build and maintain their professional profile.

**Sections:**
- **Account Info** — First name, last name, phone, country
- **Professional Info** — Job title, organisation, scouting experience (years)
- **Coverage** — Regions covered, leagues covered, age group specialization
- **Specializations** — Position focus (multi-select), general specializations
- **Qualifications** — Scouting licenses, languages spoken, willing to travel toggle
- **Network** — Associated clubs/agencies
- **Bio** — Professional biography (free text)
- **Profile Picture** — Upload via Cloudinary (base64)
- **Track Record** — Players scouted (count), successful transfers (count)

**Connects to:** All roles — scouts are discoverable by clubs, agents, and players.

---

### 3.2 Player Comparison Tool
**Route:** `/scout/compare`
**Purpose:** Select 2–4 players from watchlist or search results and compare them side by side.

**Sections:**
- Player selector (from watchlist or search)
- Side-by-side attribute bars (Technical, Tactical, Physical, Mental)
- AI rating comparison
- Career stats (goals, assists, market value, age, position)
- Radar chart (visual overlay)
- Recommendation tags per player
- Export-ready layout (for presenting to clubs)

**Connects to:** Players, Clubs (scout presents comparison before recommending a player)

---

## 4. Tier 2 — Cross-Role Connection Features (Planned)

### 4.1 Report → Club Delivery System
**Purpose:** When a scout submits a report, they can tag a club they work for or recommend a player to. The club receives a real-time notification with the full report.

**Flow:**
1. Scout creates report → selects target club from their network
2. Report submitted → club dashboard receives notification
3. Club reviews report → responds: Accept / Reject / Request More Info
4. Scout sees the response on their reports page

**Why it matters:** This closes the loop that no scouting tool does today. Scouts currently submit reports with no feedback. Here they get real accountability and track record building.

**Connects:** Scout → Club (bidirectional)

---

### 4.2 "We're Watching You" — Player Interest Signal
**Purpose:** Scout adds a player to their watchlist → player's dashboard shows: *"A scout from [Organisation] has you on their watchlist."*

**Flow:**
1. Scout adds player to watchlist (already built)
2. Backend triggers a notification record on the player's account
3. Player dashboard shows a "Scout Interest" card with scout's name, org, and position specialization
4. Player can optionally respond: "Open to contact" or "Not interested"

**Why it matters:** Players feel discovered — this drives player retention and platform engagement. No scouting app currently does this direct player feedback loop.

**Connects:** Scout → Player (one-way signal, optional two-way)

---

### 4.3 Scout Broadcast — Talent Request
**Purpose:** Scout publishes a structured "Looking For" notice. Matching players and their agents are notified.

**Structure of a Broadcast:**
```
Position: Left Back
Age Range: U21 (under 21)
Region: West Africa
Availability: January 2025
Transfer Status: Free Agent or Open to Offers
Notes: Must have highlight video. Trial opportunity available.
```

**Flow:**
1. Scout creates a broadcast from a dedicated section or dashboard widget
2. System matches against all player profiles and their agents
3. Matching players + agents receive a notification: *"A scout is looking for a player matching your profile"*
4. Players/agents can respond directly — opening a conversation thread
5. Scout sees all responses in a unified "Broadcast Responses" inbox

**Why it matters:** Turns scouting from reactive (searching) to proactive (talent comes to the scout). World-first feature in football scouting apps.

**Connects:** Scout → Players + Agents (broadcast out, responses in)

---

### 4.4 Agent ↔ Scout Direct Connection
**Purpose:** When a scout views a player who has a registered agent on ScoutVerse, they can directly contact the agent.

**Flow:**
1. Scout views player profile — sees agent name with "Contact Agent" button (if agent is on platform)
2. Scout initiates a conversation thread tagged to that specific player
3. Agent receives notification: *"Scout [Name] from [Org] is interested in your client [Player]"*
4. Conversation continues in the Messages module
5. Agent can share contract terms, availability, trial conditions

**Connects:** Scout → Agent (player-contextual messaging)

---

## 5. Tier 3 — World-First Differentiators (Roadmap)

### 5.1 Talent Radar — Live Discovery Feed
**Purpose:** A live, push-based feed on the scout's dashboard showing new talent matching their criteria.

**Feed Events:**
- New player registered matching scout's position + region + age group criteria
- Watched player uploaded a new highlight video
- Watched player's AI rating improved
- Watched player's transfer status changed to "Free Agent" or "Available"
- Player with scout views has just been signed (shows scout's discovery led to outcome)

**Implementation:** Polling (short term) → Socket.io push (full real-time)

**Connects:** Scout ← Players (passive intelligence stream)

---

### 5.2 Scout-to-Scout Network
**Purpose:** Scouts can follow other scouts, share discovery credits, and collaborate on co-scouting missions.

**Features:**
- Follow / unfollow other scouts
- Co-scout flag: "Recommended by Scout X" on a player card
- Shared watchlists (with permission)
- Trip collaboration: invite another scout to join a trip

**Connects:** Scout ↔ Scout

---

### 5.3 Match Intelligence Log
**Purpose:** Scouts log every match they attend — not just players observed, but the full contextual record.

**Fields per Match Log:**
- Date, competition, venue
- Teams playing
- Players observed (link to their ScoutVerse profiles)
- Conditions (weather, pitch quality)
- Notes and highlights
- Outcome / next steps

**Why it matters:** Builds an auditable, professional history of scouting activity. Clubs can verify a scout's methodology and coverage before hiring them.

**Connects:** Scout → Club (credibility building)

---

### 5.4 Report Analytics Dashboard
**Purpose:** A data view showing the scout's performance and impact over time.

**Metrics:**
- Total reports written
- Recommendation breakdown (Sign / Shortlist / Monitor / Discard %)
- Transfer success rate (how many "Sign" recommendations resulted in a signing)
- Regions most scouted
- Positions most reported on
- Average rating given vs. actual player outcomes
- Most active months / trips

**Connects:** Scout → Club (proof of ROI and scouting methodology)

---

## 6. Real-Time Architecture

| Feature | Method | Timeline |
|---|---|---|
| Report → Club notification | REST + DB notification record | Phase 1 |
| "We're Watching You" signal | REST + DB notification record | Phase 1 |
| Watchlist activity alerts | Polling (5s interval) | Phase 1 |
| Messages (all roles) | Socket.io persistent connection | Phase 2 |
| Talent Radar live feed | Socket.io room subscriptions | Phase 2 |
| Scout Broadcast responses | Socket.io + REST | Phase 2 |

---

## 7. Design Principles for Scout UI

- **Clean, not colorful** — Professional tool, not entertainment. Minimal color accents (emerald for actions, gray for structure).
- **Data-first** — Numbers, ratings, and names should be immediately readable. No decorative elements that don't carry information.
- **Well-structured menus** — Clear section hierarchy with labels, no ambiguity on where something lives.
- **Consistent card patterns** — All player cards, report cards, and trip cards follow the same structural logic.
- **Mobile to desktop** — All pages fully responsive. Bottom nav on mobile, sidebar on desktop/tablet.
- **Actions are always visible** — Create Report, Add to Watchlist, Contact — never buried in dropdowns.

---

## 8. Menu Structure (Final)

```
Scout Sidebar
├── Dashboard          — Overview of all activity + stats
├── Search Players     — AI-powered + filtered player discovery
├── Reports            — Create, view, filter all scouting reports
├── Watchlist          — Tracked players with priority and notes
├── Trip Planner       — Plan and manage scouting missions
├── Compare            — Side-by-side player comparison tool
├── Messages           — Real-time conversations (Players, Clubs, Agents)
├── Notifications      — All platform alerts
└── Settings           — Professional profile editor
```

---

## 9. Data Flow Summary

```
[SCOUT]
   │
   ├─ Creates Report ──────────────────────► [CLUB receives notification]
   │                                              │
   │                                              └─ Club responds → Scout sees feedback
   │
   ├─ Adds to Watchlist ───────────────────► [PLAYER sees "Scout is watching you"]
   │                                              │
   │                                              └─ Player can respond → opens thread
   │
   ├─ Publishes Broadcast ─────────────────► [PLAYERS + AGENTS matching criteria notified]
   │                                              │
   │                                              └─ Responses feed into Scout inbox
   │
   ├─ Views Player with Agent ─────────────► [Can contact AGENT directly]
   │
   └─ Talent Radar ────────────────────────► [Platform pushes matching new players to Scout]
```

---

## 10. Connected Role Summary

| Role | How Scout Connects | Direction |
|---|---|---|
| **Player** | Watchlist signal, Broadcast target, Direct messaging, Analysis view | Scout → Player |
| **Club** | Report delivery, Player recommendation, Scout profile visibility | Scout → Club (and Club → Scout hire) |
| **Agent** | Player-contextual messaging, Broadcast responses | Scout ↔ Agent |
| **Other Scouts** | Network, co-scouting, shared watchlists | Scout ↔ Scout |

---

*This document is the single source of truth for Scout role development on ScoutVerse.*
