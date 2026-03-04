

## Plan: Add MyFleet AI Article to Newsroom & PressSection

Add the new "MYFLEET AI Builds India's First Vehicle-Level Financial Operating System for Fleet Owners" article (published Dec 19, 2025 on DailyHunt/R News India) to both data sources.

### Changes

**1. `src/pages/Newsroom.tsx`**
- Add new entry to `pressArticles` array (at top, as newest featured article)
- Add new entry to `featuredArticles` carousel array (first position) with title, description, date, and URL

**2. `src/components/PressSection.tsx`**
- Add new entry to `pressArticles` marquee array
- Add new entry to `featuredArticles` carousel array (first position)

### Data for the new article

| Field | Value |
|-------|-------|
| Title | MyFleet AI Builds India's First Vehicle-Level Financial Operating System for Fleet Owners |
| Description | Drivetap Innovation India introduces MyFleet AI — a unified vehicle-level operating system that lets fleet owners track, control, and manage all vehicle expenses from fuel to tolls through a single dashboard. |
| Publication | DailyHunt |
| Date | December 19, 2025 |
| datePublished | 2025-12-19 |
| URL | https://m.dailyhunt.in/news/india/english/republicnewsindia-epaper-dhfacc36dfce9c4bb68db0e89d033c921b/myfleet+ai+builds+indias+first+vehiclelevel+financial+operating+system+for+fleet+owners-newsid-dhfacc36dfce9c4bb68db0e89d033c921b_09cf84e0dc9811f09fff8ea76b3d216e |

Both files maintain existing article order. The new article will appear as the first featured story in the carousel and in the coverage grid on the Newsroom page.

