# ScoutVerse — Player Role: Full Operations & Feature Roadmap

**Document Version:** 1.0  
**Last Updated:** February 2026  
**Status:** Active Development  

---

## 1. Player Role Overview

The Player is the **beating heart** of the ScoutVerse ecosystem. Every scout is looking for them, every club wants to sign them, every agent wants to represent them. The player's experience must be **empowering**, **transparent**, and **addictive** — giving them tools no other platform provides to take control of their career.

A player on ScoutVerse is not a passive profile waiting to be found — they are an **active career builder** with real-time intelligence about who is watching them, what opportunities exist, and how they compare to the competition.

---

## 2. Core Operations (Built)

| Feature | Route | Status |
|---|---|---|
| Dashboard | `/player/dashboard` | ✅ Complete |
| Player Profile | `/player/profile` | ✅ Complete |
| Videos & AI Analysis | `/player/videos` | ✅ Complete |
| Statistics | `/player/stats` | ✅ Complete |
| Opportunities | `/player/opportunities` | ✅ Complete |
| Training Planner | `/player/training` | ✅ Complete |
| Settings | `/player/settings` | ✅ Complete |

---

## 3. Enhanced Operations (Current Sprint)

### 3.1 Scout Interest Feed ("Who's Watching Me?")
**Route:** Widget on `/player/dashboard`  
**Purpose:** Real-time visibility into scout and club activity on the player's profile.

**Features:**
- **Scout Interest Signals** — When a scout adds the player to their watchlist, the player sees: *"A scout from [Organisation] is watching you"*
- **Club Interest Alerts** — When a club views the player's profile or adds them to a shortlist
- **Agent Connection Nudge** — Suggested agents who represent players in similar positions/regions
- Timeline view of all interest activity (last 30 days)
- Option to respond: "Open to Contact" or "Not Interested"

**Why it matters:** Players feel *discovered* — this drives retention. No scouting app currently gives players this direct feedback loop.

**Connects:** Scout → Player, Club → Player

---

### 3.2 Trial & Showcase Finder
**Route:** `/player/trials`  
**Purpose:** Aggregated feed of all open trials, showcases, and clinics posted by clubs and scouts.

**Features:**
- Filter by region, position, age group, level (professional/semi-pro/academy)
- One-click "Express Interest" application
- Calendar integration — trials sync to Training Schedule
- Status tracker: Applied → Invited → Attended → Feedback Received
- Distance/travel estimation

**Why it matters:** Players (especially unrepresented ones) currently have no centralized way to find trials. This solves a massive pain point.

**Connects:** Player → Club, Player → Scout

---

### 3.3 Agent Discovery & Connection
**Route:** `/player/agents`  
**Purpose:** Browse and connect with verified agents on the platform.

**Features:**
- Agent directory with filters: region, specialization, track record
- Agent profile cards: verified status, client count, successful transfers
- "Request Representation" button — sends structured inquiry to the agent
- Agent compatibility score (based on position, region, experience level)
- Current agent relationship display (if linked)

**Why it matters:** Finding a trustworthy agent is one of the biggest challenges for young players. This provides a vetted marketplace.

**Connects:** Player → Agent

---

### 3.4 Career Timeline
**Route:** Widget on `/player/profile`  
**Purpose:** Visual timeline of the player's career journey.

**Features:**
- Milestones: clubs joined, contracts signed, awards, transfers
- Auto-populated from platform data (opportunities accepted, matches logged)
- Manual entries for off-platform achievements
- Shareable career CV (professional PDF/link generation)

**Connects:** All roles — scouts and clubs can view the player's career history

---

### 3.5 Performance Comparison Tool
**Route:** `/player/compare`  
**Purpose:** Compare yourself against other players in the same position.

**Features:**
- Select players from search or suggested similar profiles
- Side-by-side attribute comparison (AI-generated ratings)
- Radar chart overlays
- Position-specific benchmarks ("Top 25% in Pace for U21 Strikers")
- Identify strengths and areas for improvement

**Connects:** Player data ← Scout Reports, AI Analysis

---

## 4. Cross-Role Connection Features

### 4.1 Scout Watchlist Signal (Scout → Player)
When a scout adds a player to their watchlist:
1. Player dashboard shows: *"A scout from [Organisation] has added you to their watchlist"*
2. Player sees scout's name, organisation, and specialization
3. Player can respond: "Open to Contact" / "Not Interested"
4. If "Open to Contact" → opens conversation thread in Messages

### 4.2 Club Interest Signal (Club → Player)
When a club views a player profile or adds to shortlist:
1. Player dashboard shows: *"A club ([Club Name]) has shown interest in your profile"*
2. Player sees the club name, league, and country
3. If the club sends a formal opportunity → appears in Opportunities page

### 4.3 Agent Representation Flow (Player ↔ Agent)
1. Player browses Agent Directory → sends "Request Representation"
2. Agent receives structured inquiry with player's CV, video analysis, stats
3. Agent reviews and responds: Accept / Decline / Request Meeting
4. If accepted → Agent appears in player's "My Agent" section
5. Player's profile now shows "Represented by [Agent]"
6. Agent gains access to manage player's deals through their CRM

### 4.4 Broadcast Response (Player → Scout/Club)
When a scout/club publishes a "Talent Wanted" broadcast:
1. Matching players receive notification: *"A scout is looking for your profile type"*
2. Player can view broadcast details and respond
3. Response creates a thread visible to the broadcasting scout/club

### 4.5 Deal Room Transparency (Club ↔ Agent → Player)
When a deal room is created involving the player:
1. Player sees a "Deal In Progress" card on dashboard
2. Player can view basic status: Initial → Negotiating → Terms Agreed → Completed
3. Player does NOT see sensitive financial details (agent handles that)
4. Player can approve/reject the final terms

---

## 5. Retention & Engagement Features

### 5.1 Profile Completeness Score
- Gamified progress bar: "Your profile is 72% complete"
- Suggestions: "Add a highlight video to increase visibility by 40%"
- Milestones unlock features (e.g., 90%+ unlocks "Featured Player" status)

### 5.2 Weekly Performance Digest
- Email/in-app notification every Monday
- Contains: profile views this week, new scout interests, AI rating changes
- Comparison: "Your views are up 23% vs last week"

### 5.3 Achievement Badges
- "First AI Analysis" — completed first video upload
- "Scout Magnet" — 10+ scouts viewed profile
- "Rising Star" — AI rating improved by 5+ points
- "Career Builder" — 5+ career timeline entries
- "In Demand" — 3+ opportunity offers received

### 5.4 Recommended Content Feed
- Personalized tips: "Players in your position should focus on [skill]"
- Success stories: "Player [X] was discovered through ScoutVerse and signed with [Club]"
- Training suggestions based on AI analysis weaknesses

---

## 6. Menu Structure (Final)

```
Player Sidebar
├── Dashboard          — Overview + Scout Interest + AI Summary
├── Profile            — Full profile view + Career Timeline
├── Videos             — Upload & AI Analysis
├── Statistics         — Season stats + Monthly trends + Attributes
├── Opportunities      — Club offers + Trial invitations
├── Training           — Schedule & planner
├── Trials             — Open trials & showcases (NEW)
├── Find Agent         — Agent directory & connection (NEW)
├── Messages           — Real-time conversations
├── Notifications      — All platform alerts
└── Settings           — Account & profile editor
```

---

## 7. Data Flow Summary

```
[PLAYER]
   │
   ├─ Uploads Video ────────────────────────► [AI Analysis generates ratings + attributes]
   │                                              │
   │                                              └─ Scouts can search/filter by these ratings
   │
   ├─ Receives Scout Watchlist Signal ──────► [Player sees "Scout is watching you"]
   │                                              │
   │                                              └─ Player can respond → opens thread
   │
   ├─ Receives Club Interest ───────────────► [Player sees opportunity in Offers]
   │                                              │
   │                                              └─ Player accepts → Deal Room created
   │
   ├─ Requests Agent Representation ────────► [Agent reviews → Accept/Decline]
   │                                              │
   │                                              └─ Accepted → Agent manages player's deals
   │
   ├─ Responds to Scout Broadcast ──────────► [Scout/Club receives player response]
   │
   └─ Views Trial Listings ─────────────────► [Player applies → Club reviews application]
```

---

## 8. Connected Role Summary

| Role | How Player Connects | Direction |
|---|---|---|
| **Scout** | Watchlist signals, broadcast responses, AI profile visibility | Scout → Player |
| **Club** | Interest signals, opportunities/offers, trial listings | Club → Player (and Player → Club apply) |
| **Agent** | Representation requests, deal transparency, career management | Player ↔ Agent |
| **Other Players** | Performance comparison tool, position benchmarks | Player ↔ Player |

---

*This document is the single source of truth for Player role development on ScoutVerse.*
