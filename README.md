# MINOAN ROBOTSPORTS GHANA 2027 (MRC GHANA 2027)

> **Where robotics becomes sport—and young makers become competitors.**  
> Presented by **The MakersPlace Ghana** • Official National Championship Series  
> **Date:** Saturday, January 30, 2027 | **Location:** Accra, Ghana

---

## 🏆 Overview

**MINOAN ROBOTSPORTS GHANA 2027 (MRC GHANA 2027)** is Ghana's official national qualifying championship for the prestigious **Minoan World RobotSports Series**. Hosted by **The MakersPlace**, the tournament gathers primary, junior/senior high school, university, and independent makers from across Ghana and West Africa to design, build, program, and compete across **seven technical disciplines**.

Top podium finishers in each discipline secure direct seedings to the **African Continental Qualifiers** and advance toward the **International Minoan RobotSports Finals**.

---

## ⚡ Tech Stack & Architecture

- **Core Framework:** React 18 with TypeScript (`strict: true`)
- **Build Tooling:** Vite 5 with hot-module replacement (HMR)
- **Styling:** Tailwind CSS with custom cyber HUD theme, custom scanline overlays, neon glow utilities, and clip paths
- **Micro-Interactions & Animations:** Framer Motion 11
- **Icons:** Lucide-React
- **UI & Primitives:** Radix UI / Accessible Modals, Dropdowns & Drawers
- **Celebration Effects:** Canvas-Confetti
- **Calendar Integration:** RFC 5545 iCalendar (`.ics`) generation & Google Calendar / Outlook web intents
- **Persistence:** Client-side LocalStorage for team registrations

---

## 🚀 Key Features

### 1. Cyberpunk / Esports Tournament HUD Theme
- Deep space slate canvas (`#070a12`, `bg-slate-950`) with frosted glass surfaces (`backdrop-blur-xl bg-slate-950/85`).
- High-energy neon highlights: Electric Cyan (`#00f0ff`), Cyber Amber/Gold (`#f59e0b`), and Vivid Emerald (`#10b981`).
- Custom interactive canvas particle mesh background with scanline overlays and HUD corner tick marks (`hud-corner-tl`, `hud-corner-br`).
- Geometric display typography (**Orbitron**, **Rajdhani**, **JetBrains Mono**, **Plus Jakarta Sans**).

### 2. Header & Sticky Quick-Action Bar
- **Brand Lockup:** High-resolution official **The MakersPlace** emblem set in an illuminated cyber bezel with a pulsing live beacon.
- **Illuminated Tournament Pill:** Glowing `MRC GHANA 2027` badge.
- **Add to Calendar Dropdown:** Direct links for Google Calendar, Outlook 365, and direct download of an RFC 5545 compliant `.ics` calendar reminder for January 30, 2027.
- **Neon CTA:** Glowing `Register Team` button with pulse effects.
- **Responsive Navigation Drawer:** Mobile navigation menu with quick anchors.

### 3. 5-Slide Animated Hero Section
- Dynamic **5-slide Framer Motion carousel** showcasing the marquee tournament disciplines:
  1. **Championship Anthem:** Overview across 7 disciplines, 3 divisions, and continental pathway.
  2. **Drone Soccer 3×3:** High-octane caged aerial clash with 200mm spherical exoskeletons.
  3. **Autonomous Marathon:** Zero wireless radios, 100% closed-loop PID speed race on a 45m circuit.
  4. **Robot Football 3×3:** Holonomic omni-drive strikers and keepers hunting an active 360° IR pulse ball.
  5. **Ballistics & Open Innovation:** Computer vision pan/tilt gimbal rovers paired with real-world student engineering solutions.
- **Live Linear Progress Indicators:** Segmented `01`–`05` HUD selector pills with automatic 6-second progress fill bars.
- **Interactive Carousel Controls:** Play/Pause slideshow toggle and Next/Previous navigation buttons.
- **Live Scrutineering Clock:** Real-time ticking countdown to January 30, 2027 in monospaced HUD cards (`DAYS`, `HOURS`, `MINUTES`, `SECONDS`).
- **Metrics Strip:** `07` RobotSports Disciplines, `03` Competing Divisions, `01` Global Pathway.

### 4. Infinite Ticker & "Rule Zero" Warning HUD
- Continuous marquee ticker ribbon: `ENGINEERING ✦ AUTONOMY ✦ PRECISION ✦ TEAMWORK ✦ ROBOTICS ✦ INNOVATION ✦`.
- **Rule Zero Warning HUD Card:** Monospaced index `[RULE 00]` emphasizing that *"If you are not sure whether something is allowed, then it is probably not allowed."* Common sense, safety, and educational spirit take absolute priority.

### 5. The Four Pillars of RobotSports
- Interactive 4-card grid:
  - `01 Precision Engineering` (Chassis CAD, ducted fans, gear fabrication)
  - `02 Autonomous Coding` (PID algorithms, sensor fusion, computer vision)
  - `03 Dynamic Strategy` (Game theory, defensive spacing, risk management)
  - `04 Synergistic Teamwork` (Pilot, programmer, pit manager, and captain coordination)

### 6. The 7 Official RobotSports Disciplines
Interactive challenge grid with dynamic division filtering (`All Sports`, `Junior Friendly (10-14)`, `Senior Division (15-18)`, `University / Open (18+)`):

| Code | Discipline | Max Points / Format | Team Size | Core Tech |
|---|---|---|---|---|
| **DRN-01** | **Drone Precision Obstacle** | 230 PTS • 2 Attempts | 1–3 Members | 360° Prop Guards, Betaflight/STM32, Optical Touchdown |
| **DRS-02** | **Drone Soccer 3×3** | Match Score • 4 Min | 3–5 Members | 200mm Spherical Cage, Suspended Hoops, Fast Pit Battery Swap |
| **MRT-03** | **Autonomous Marathon** | Timed Run • 180s Limit | 1–3 Members | 45m Track, 16-ch Photodiode Array, Autonomous E-Stop |
| **SOC-04** | **Robot Football 3×3** | Match Score • 7 Min | 3–5 Members | Holonomic Omni Wheels, Active 360° IR Ball, Passing Bonus |
| **SHT-05** | **Autonomous Target Shooting** | 170 PTS • 2 Distances | 1–3 Members | Computer Vision ArUco Targeting, Soft Foam Rounds, Chrono Check |
| **ARC-06** | **Precision Robot Archery** | 40 PTS • 4 Distances | 1–3 Members | Mechanical Tension Servo Release, Laser Range Triangulation |
| **EXH-07** | **Open Innovation & Future Challenge** | 100 PTS • 10m Defense | 2–5 Members | Open Platform (ROS2, SBCs, Micro:bit), Real-World Civic/Agri Impact |

- **Instant Rulebook PDF Preview:** Modal presenting scoring rubrics, arena dimension schematics, and simulated instant PDF download.
- **Tech Specs Slide-Out Drawer:** Detailed technical inspection parameters (allowed MCUs, max weight, voltage caps, and mandatory failsafes).
- **Quick Register Action:** Pre-fills the registration modal directly with that sport.

### 7. Interactive Media Hub & Arena Visualizer
- Horizontal discipline switcher for all 7 sports.
- **Visualizer Viewport:** Toggle between **Video Explainer HUD** and the **360° Radar Grid Mode** with simulated telemetry and playback controls.
- **4-Slot Technical Gallery:** High-resolution zoomable lightbox viewports for CAD layouts, pit inspections, and chassis mechanics.

### 8. Global Pathway Roadmap
- **Step 01:** Ghana National Championship (Accra • Jan 30, 2027)
- **Step 02:** African Continental Qualifiers (Pan-African Stage • May 2027)
- **Step 03:** International Minoan RobotSports Finals (Autumn 2027)

### 9. Pre-Flight Inspection Checklist Tool
- Interactive self-assessment accordion for team coaches and makers.
- Categories: *Structural & Dimensions*, *Electrical & Batteries*, *Software & Failsafes*, *Safety & Environment*.
- Real-time **Compliance Score Meter** with pass/fail tracking, "Pass All", and "Reset" features.

### 10. Official Downloads Center & Resource Library
- Tabbed resource library: *Rulebooks*, *Field CAD & Dimensions*, *Score Sheets*, *Safety Protocols*.
- Search bar filter, file formats (`PDF`, `CAD/DXF`, `XLSX`), version badges, and direct simulated download triggers with toast notifications.
- Complete 18.4 MB Team Dossier bundle download.

### 11. Multi-Step Team Registration Portal
- **Step 1:** Team Name, Institution Type (School, University, Club, Independent), and Multi-Select Category Chips with badges.
- **Step 2:** Age Division (`Junior 10–14`, `Senior 15–18`, `University/Open 18+`), Team Size Counter (1–5 members), and Experience Level.
- **Step 3:** Lead Contact Name, Role, Email, Phone (+233 Ghana format), and Ghanaian Administrative Region selector (16 regions).
- **Step 4:** Review summary, **`canvas-confetti`** celebration burst, persistent LocalStorage record, unique confirmation code (e.g. `MRC27-GH-8492`), downloadable digital pass slip (`.txt`), and **WhatsApp Direct Share** link.

### 12. Sponsors & Community Ecosystem
- Host credits: **The MakersPlace Ghana**
- Affiliations: **Minoan RobotSports World Series**, Ghana STEM & Technical Hubs, African Drone & Robotics Alliance.
- Direct partnership inquiry CTA and newsletter alert subscription for venue announcements.

---

## 📁 Directory Structure

```text
MINOAN/
├── public/
│   ├── images/
│   │   ├── logo.png                       # Official MakersPlace source logo
│   │   ├── makersplace_icon.png          # Cropped emblem
│   │   ├── makersplace_icon_hires.png    # Enhanced high-res emblem
│   │   └── makersplace_dark.png          # Dark-mode logo variant
│   └── logo.svg                          # Cyberpunk tournament favicon
├── src/
│   ├── components/
│   │   ├── CalendarDropdown.tsx          # iCal .ics, Google & Outlook calendar dropdown
│   │   ├── CircuitBackground.tsx         # Canvas particle mesh & scanline overlay
│   │   ├── Footer.tsx                    # Branding, venue updates signup, back-to-top
│   │   ├── Hero.tsx                      # 5-Slide animated hero & live countdown clock
│   │   ├── ImageLightboxModal.tsx        # High-res image zoom lightbox
│   │   ├── InspectionChecklist.tsx       # Pre-flight inspection self-assessment tool
│   │   ├── MediaHub.tsx                  # Arena visualizer (Video/Radar) & 4-slot gallery
│   │   ├── Navbar.tsx                    # Frosted glass cyber header with enhanced logo
│   │   ├── PathwaySection.tsx            # Ghana -> Continental -> World Finals roadmap
│   │   ├── PillarsSection.tsx            # 4 pillars of RobotSports excellence
│   │   ├── RegistrationModal.tsx         # 4-step registration modal with confetti & pass
│   │   ├── ResourcesSection.tsx          # Official download center with toast feedback
│   │   ├── RulebookModal.tsx             # Interactive PDF rulebook & rubric preview
│   │   ├── SponsorsSection.tsx           # Partner ecosystem & sponsorship CTA
│   │   ├── SportsGrid.tsx                # 7 sports cards with dynamic division filters
│   │   └── TechSpecsDrawer.tsx           # Technical specifications slide-out drawer
│   ├── data/
│   │   ├── checklistData.ts              # Pre-flight scrutineering inspection items
│   │   ├── resourcesData.ts              # Downloadable CAD, score sheets, rulebooks
│   │   └── sportsData.ts                 # Full technical specs & rubrics for all 7 sports
│   ├── lib/
│   │   └── utils.ts                      # Tailwind clsx/twMerge utility
│   ├── types/
│   │   └── index.ts                      # TypeScript definitions
│   ├── App.tsx                           # Main application assembler
│   ├── index.css                         # Custom cyber styles, glow utilities, and scrollbars
│   └── main.tsx                          # React 18 DOM mount
├── index.html                            # HTML entry point with preloaded Google Fonts
├── package.json                          # Dependencies & NPM scripts
├── postcss.config.js                     # PostCSS config
├── tailwind.config.js                    # Cyber HUD Tailwind extensions
├── tsconfig.json                         # Strict TypeScript configuration
└── vite.config.ts                        # Vite configuration
```

---

## 🛠️ Getting Started

### Prerequisites
- **Node.js:** v18.0.0 or higher (v20+ recommended)
- **NPM:** v9.0.0 or higher

### Installation

1. Navigate to the project root:
   ```bash
   cd /home/brightnsarko/projects/MINOAN
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```
   Open your browser to **`http://localhost:5173`**.

4. Build for production:
   ```bash
   npm run build
   ```

5. Preview production build:
   ```bash
   npm run preview
   ```

---

## 📜 Official Tournament Regulations Summary

All participants, coaches, pilots, and pit mechanics must adhere to **Rule Zero**:
> *"If you are not sure whether something is allowed, then it is probably not allowed. Common sense, participant safety, fair play, and the educational spirit of RobotSports always take absolute priority."*

- **Eye Protection:** ANSI Z87.1 / EN166 safety goggles are mandatory in all arenas and pit areas.
- **Battery Safety:** All LiPo batteries must be charged inside fire-retardant LiPo bags in designated paddocks.
- **Failsafes:** Emergency cut-off switches and radio loss fail-safes are strictly audited prior to match clearing.

---

## 📬 Contact & Inquiries

- **Official Host:** The MakersPlace Ghana
- **Email:** [info@makersplacegh.com](mailto:info@makersplacegh.com)
- **Website:** [https://minoanrobotsports.org.gh](https://minoanrobotsports.org.gh)
- **Location:** Accra, Ghana

*© 2027 The MakersPlace Ghana. All rights reserved. MINOAN RobotSports is an international mark.*
