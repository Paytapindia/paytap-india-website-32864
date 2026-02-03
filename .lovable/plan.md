

## Plan: Add Featured Articles Carousel with Two Story Cards

### Problem
Currently, only the "RuPay NFC Tag" article is displayed as the featured story. The original "Contactless Payment Tags" article has been pushed out of view. You want both featured stories visible via a sliding carousel.

### Solution Overview
Add an Embla Carousel slider with two featured article cards and navigation dots/arrows on:
1. **Landing Page** (PressSection.tsx) - Featured Coverage section
2. **Newsroom Page** (Newsroom.tsx) - Featured Story section

---

### Featured Articles Data

| Slide | Title | Date | Link |
|-------|-------|------|------|
| **1** | "Beyond Personal Payments: Paytap Debuts India's First RuPay NFC Tag" | February 3, 2026 | Republic News India Business |
| **2** | "Contactless Payment Tags Get Their Moment in India" | January 24, 2026 | Republic News India |

---

### Changes to PressSection.tsx (Landing Page)

#### 1. Define Featured Articles Array

```tsx
const featuredArticles = [
  {
    title: "Beyond Personal Payments: Paytap Debuts India's First RuPay NFC Tag",
    description: "Paytap launches India's first RuPay NFC tag for integrated vehicle enterprise management—transforming fleet payments, fuel transactions, and operational expenses.",
    publication: "Republic News India Business",
    date: "February 3, 2026",
    url: "https://business.republicnewsindia.com/beyond-personal-payments-paytap-debuts-indias-first-rupay-nfc-tag-for-integrated-vehicle-enterprise-management/"
  },
  {
    title: "Contactless Payment Tags Get Their Moment in India",
    description: "India's contactless payment revolution gains momentum as NFC tags transform how businesses handle fleet payments, toll transactions, and operational expenses.",
    publication: "Republic News India",
    date: "January 24, 2026",
    url: "https://republicnewsindia.com/contactless-payment-tags-get-their-moment-in-india/"
  }
];
```

#### 2. Replace Static Featured Card with Carousel

```tsx
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";

// Inside the component, replace the single featured card:
<div className="max-w-4xl mx-auto px-6">
  <Carousel opts={{ loop: true }} className="relative">
    <CarouselContent>
      {featuredArticles.map((article, index) => (
        <CarouselItem key={index}>
          <div className="bg-paytap-navy rounded-3xl p-8 md:p-12 text-center shadow-2xl shadow-paytap-navy/15 relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-paytap-light/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10">
              <p className="text-white/50 text-sm uppercase tracking-widest mb-4">
                Featured Coverage • {article.date}
              </p>
              
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-5 leading-tight">
                "{article.title}"
              </h3>
              
              <p className="text-white/60 text-base md:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
                {article.description}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="bg-paytap-light hover:bg-paytap-light/90 text-white rounded-xl px-8 gap-2 shadow-lg shadow-paytap-light/25">
                    Read Coverage
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </a>
                
                <Link to="/newsroom">
                  <Button variant="ghost" size="lg" className="text-white/80 hover:text-white hover:bg-white/10 rounded-xl px-6 gap-2">
                    View All Press
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </CarouselItem>
      ))}
    </CarouselContent>
    
    {/* Navigation arrows */}
    <CarouselPrevious className="left-2 md:-left-4 bg-white/20 hover:bg-white/30 border-0 text-white" />
    <CarouselNext className="right-2 md:-right-4 bg-white/20 hover:bg-white/30 border-0 text-white" />
    
    {/* Dot indicators */}
    <div className="flex justify-center gap-2 mt-6">
      {featuredArticles.map((_, index) => (
        <button
          key={index}
          className="w-2 h-2 rounded-full bg-paytap-navy/30 data-[active=true]:bg-paytap-light transition-colors"
          data-active={currentSlide === index}
          onClick={() => api?.scrollTo(index)}
        />
      ))}
    </div>
  </Carousel>
</div>
```

#### 3. Add State for Active Slide Indicator

```tsx
import { useState, useCallback, useEffect } from "react";
import type { CarouselApi } from "@/components/ui/carousel";

const PressSection = memo(() => {
  const [api, setApi] = useState<CarouselApi>();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!api) return;
    
    setCurrentSlide(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrentSlide(api.selectedScrollSnap());
    });
  }, [api]);

  // ... rest of component
});
```

---

### Changes to Newsroom.tsx (Newsroom Page)

Apply the same carousel pattern to the "Featured Story" section:

#### 1. Define Two Featured Articles

```tsx
const featuredArticles = [
  {
    publication: "Republic News India Business",
    url: "https://business.republicnewsindia.com/beyond-personal-payments-paytap-debuts-indias-first-rupay-nfc-tag-for-integrated-vehicle-enterprise-management/",
    headline: "Beyond Personal Payments: Paytap Debuts India's First RuPay NFC Tag for Integrated Vehicle Enterprise Management",
    description: "Paytap launches India's first RuPay NFC tag designed for integrated vehicle and enterprise management. From fleet operators to businesses, the contactless solution offers secure, app-free payment experiences backed by RBI-compliant technology.",
    date: "February 3, 2026"
  },
  {
    publication: "Republic News India",
    url: "https://republicnewsindia.com/contactless-payment-tags-get-their-moment-in-india/",
    headline: "Contactless Payment Tags Get Their Moment in India",
    description: "India's contactless payment revolution gains momentum as NFC tags emerge as a game-changer for businesses. Paytap leads the charge with innovative payment solutions for fleet management and operational expenses.",
    date: "January 24, 2026"
  }
];
```

#### 2. Replace Single Featured Card with Carousel

Same carousel structure as PressSection, with matching dark navy card styling and navigation dots.

---

### Visual Result

```text
Landing Page (PressSection):
┌────────────────────────────────────────────────────────────────┐
│                     ✦ In The Newsroom ✦                        │
│                                                                │
│  ←  Publication1 • Publication2 • Publication3 • ...  →       │  (marquee)
│                                                                │
│  ┌────────────────────────────────────────────────────────┐   │
│  │ ◄                Featured Coverage                   ► │   │
│  │                February 3, 2026                        │   │
│  │                                                        │   │
│  │  "Beyond Personal Payments: Paytap Debuts India's     │   │
│  │   First RuPay NFC Tag"                                │   │
│  │                                                        │   │
│  │  [Read Coverage]  [View All Press]                    │   │
│  │                                                        │   │
│  │                    ● ○                                │   │  ← Dots (slide 1/2)
│  └────────────────────────────────────────────────────────┘   │
└────────────────────────────────────────────────────────────────┘

After sliding to second card:
┌────────────────────────────────────────────────────────────────┐
│  ┌────────────────────────────────────────────────────────┐   │
│  │ ◄                Featured Coverage                   ► │   │
│  │               January 24, 2026                         │   │
│  │                                                        │   │
│  │  "Contactless Payment Tags Get Their Moment in India" │   │
│  │                                                        │   │
│  │  [Read Coverage]  [View All Press]                    │   │
│  │                                                        │   │
│  │                    ○ ●                                │   │  ← Dots (slide 2/2)
│  └────────────────────────────────────────────────────────┘   │
└────────────────────────────────────────────────────────────────┘
```

---

### Files to Modify

| File | Changes |
|------|---------|
| `src/components/PressSection.tsx` | Add Embla Carousel with 2 featured article cards, navigation arrows, and dot indicators |
| `src/pages/Newsroom.tsx` | Add same carousel pattern to Featured Story section with 2 cards |

---

### Technical Details

**Carousel Configuration:**
- `opts={{ loop: true }}` - Enables infinite looping
- Auto-play can be added later with `embla-carousel-autoplay` plugin
- Touch/swipe support built-in for mobile

**Styling:**
- Navigation arrows: Semi-transparent white, positioned at card edges
- Dot indicators: Small circles below the card, active dot uses brand color (`paytap-light`)
- Cards maintain existing dark navy gradient design

**State Management:**
- `CarouselApi` from Embla tracks current slide
- `useEffect` listens for slide changes to update dot indicators
- Dots are clickable to jump to specific slides

