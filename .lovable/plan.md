

## Revamp PayTap FAQ Section — Onboarding-Style Learning Journey

### What Changes

Complete rewrite of the FAQ page from a tab-based layout to a vertical scrollable learning journey with 8 sections, new content, rich answers with bullet points/steps, and section icons using Lucide.

### Files Modified

| File | Change |
|------|--------|
| `src/data/faqData.ts` | Replace all FAQ content with 8 new sections and rich HTML-like answer strings |
| `src/components/FAQSection.tsx` | Replace tabs with vertical scrollable sections, sticky side nav on desktop, section icons |
| `src/components/FAQCategory.tsx` | Update to support rich answers (paragraphs, bullet lists, numbered steps) via JSX rendering |
| `src/pages/FAQ.tsx` | Update meta description/keywords to match new content |

### New FAQ Data Structure

```typescript
export type FAQ = {
  id: string;
  question: string;
  answer: string; // supports \n for paragraphs, • for bullets
};

export type FAQSection = {
  id: string;
  title: string;
  description: string;
  icon: string; // Lucide icon name
  faqs: FAQ[];
};
```

8 sections in order:
1. **Understanding PayTap** (Lightbulb) — 4 questions: What is PayTap, FASTag comparison, How it works, Why it was created
2. **Getting Started** (Rocket) — 3 questions: How to get tag, Where to place, Do I need an app
3. **Payments & Usage** (CreditCard) — 2 questions: Where to use, Do drivers need cash
4. **Security & Safety** (ShieldCheck) — 6 questions: External tapping, Bank account linked, Payment info safety, Worst case, Payment limits, Disable contactless
5. **Managing Your Account** (Settings) — 2 questions: Load money, Spending limits
6. **Fleet & Business Use** (Building2) — 2 questions: Multiple vehicles, Track by vehicle
7. **Troubleshooting** (Wrench) — 1 question: Payment fails at pump
8. **Support & Account Closure** (Headphones) — 2 questions: Contact support, Close account

### New Layout (replacing tabs)

- **Hero header** with title "Everything You Need to Know About PayTap" + subtitle about the learning journey
- **Desktop**: Sticky left sidebar nav (section links) + right content area with all sections stacked vertically
- **Mobile**: Horizontal scrollable section chips at top (sticky), then vertical sections
- Each section renders as a card with icon + title + description + accordion of questions
- Answers rendered with proper paragraph breaks, bullet points (•), and numbered steps using a simple parser

### Answer Rendering

Replace plain text `answer` string with a renderer that:
- Splits on `\n\n` for paragraphs
- Detects lines starting with `•` and renders as `<ul><li>`
- Detects lines starting with numbers (1., 2.) and renders as `<ol><li>`
- Wraps remaining text in `<p>` tags

All content comes directly from the user's brief — no invention.

