

## Plan: Optimize Newsroom Page for Mobile View

### Current Issues Identified

Based on reviewing the code, here are the mobile alignment and optimization issues:

1. **Featured Carousel Card**: Large padding (`p-8 md:p-12`) may cause content overflow on very small screens
2. **Carousel Navigation Arrows**: Positioned at `left-4` on mobile - may overlap with card content
3. **Hero Section Typography**: `text-4xl` may be too large for small phones
4. **Featured Article Headline**: `text-2xl md:text-4xl` could wrap poorly on narrow screens
5. **Article Grid Cards**: Padding and text sizing need mobile optimization
6. **Background Blur Elements**: Heavy decorations (`blur-3xl`) can impact mobile performance

---

### Optimizations to Apply

#### 1. Hero Section - Mobile Typography

**File:** `src/pages/Newsroom.tsx` (lines 301-311)

| Element | Current | Mobile Optimized |
|---------|---------|------------------|
| Hero Title | `text-4xl md:text-6xl` | `text-3xl sm:text-4xl md:text-6xl` |
| Hero Description | `text-xl` | `text-lg md:text-xl` |
| Padding | `py-12 md:py-20` | `py-8 md:py-20` |

```tsx
{/* Hero content */}
<div className="text-center py-8 md:py-20">
  <span className="inline-block px-3 py-1 md:px-4 md:py-1.5 bg-white/10 text-white/90 text-xs font-semibold uppercase tracking-widest rounded-full mb-4 md:mb-6">
    Press & Media
  </span>
  <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 md:mb-6 tracking-tight">
    Paytap Newsroom
  </h1>
  <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto px-4">
    Latest news, press coverage, and media resources about India's innovative contactless payment solution.
  </p>
</div>
```

---

#### 2. Featured Carousel Section - Mobile Layout

**File:** `src/pages/Newsroom.tsx` (lines 316-381)

**Changes:**
- Reduce section padding on mobile
- Smaller card padding on mobile
- Reduce/hide background blur decorations on mobile (performance)
- Adjust headline sizing for mobile
- Hide carousel arrows on mobile (rely on swipe)

```tsx
{/* Featured Article Carousel */}
<section className="py-12 md:py-24 bg-muted/30">
  <div className="max-w-7xl mx-auto px-4 md:px-6">
    <span className="inline-block px-3 py-1 md:px-4 md:py-1.5 bg-paytap-light/10 text-paytap-light text-xs font-semibold uppercase tracking-widest rounded-full mb-6 md:mb-8">
      Featured Stories
    </span>

    <Carousel opts={{ loop: true }} setApi={setApi} className="relative">
      <CarouselContent>
        {featuredArticles.map((article, index) => (
          <CarouselItem key={index}>
            <div className="bg-paytap-navy rounded-2xl md:rounded-3xl p-5 sm:p-8 md:p-12 text-white shadow-2xl shadow-paytap-navy/20 relative overflow-hidden">
              {/* Hide heavy blur effects on mobile for performance */}
              <div className="hidden md:block absolute top-0 right-0 w-64 h-64 bg-paytap-light/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="hidden md:block absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />

              <div className="relative z-10">
                <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-4 md:mb-6">
                  <span className="text-xs md:text-sm text-white/60">{article.publication}</span>
                  <span className="w-1 h-1 bg-white/40 rounded-full" />
                  <span className="text-xs md:text-sm text-white/60">{article.date}</span>
                </div>
                
                <h2 className="text-xl sm:text-2xl md:text-4xl font-bold mb-4 md:mb-6 leading-tight">
                  "{article.headline}"
                </h2>
                
                <p className="text-sm md:text-lg text-white/70 max-w-3xl mb-6 md:mb-8 leading-relaxed">
                  {article.description}
                </p>

                <a href={article.url} target="_blank" rel="noopener noreferrer">
                  <Button 
                    size="default"
                    className="bg-paytap-light hover:bg-paytap-light/90 text-white rounded-xl px-6 md:px-8 gap-2 text-sm md:text-base"
                  >
                    Read Full Article
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </a>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      
      {/* Hide arrows on mobile - users can swipe */}
      <CarouselPrevious className="hidden md:flex -left-6 bg-paytap-navy hover:bg-paytap-navy/90 border-0 text-white shadow-lg" />
      <CarouselNext className="hidden md:flex -right-6 bg-paytap-navy hover:bg-paytap-navy/90 border-0 text-white shadow-lg" />
    </Carousel>

    {/* Dot indicators - larger touch target on mobile */}
    <div className="flex justify-center gap-3 mt-4 md:mt-6">
      {featuredArticles.map((_, index) => (
        <button
          key={index}
          className={`w-3 h-3 md:w-2.5 md:h-2.5 rounded-full transition-colors ${
            currentSlide === index 
              ? "bg-paytap-light" 
              : "bg-paytap-navy/30 hover:bg-paytap-navy/50"
          }`}
          onClick={() => api?.scrollTo(index)}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  </div>
</section>
```

---

#### 3. Article Grid Section - Mobile Layout

**File:** `src/pages/Newsroom.tsx` (lines 384-419)

**Changes:**
- Reduce section padding on mobile
- Smaller card padding on mobile
- Stack cards in single column on very small screens
- Optimize text sizes

```tsx
{/* All Coverage Grid */}
<section className="py-12 md:py-24 bg-background">
  <div className="max-w-7xl mx-auto px-4 md:px-6">
    <span className="inline-block px-3 py-1 md:px-4 md:py-1.5 bg-paytap-navy/5 text-paytap-navy text-xs font-semibold uppercase tracking-widest rounded-full mb-6 md:mb-8">
      Also Featured In
    </span>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {otherArticles.map((article, index) => (
        <a
          key={index}
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group bg-card border border-border rounded-xl md:rounded-2xl p-4 md:p-6 hover:border-paytap-light/50 hover:shadow-lg hover:shadow-paytap-light/5 transition-all duration-300"
        >
          <div className="flex items-center justify-between mb-3 md:mb-4">
            <span className="text-xs md:text-sm font-semibold text-foreground">
              {article.publication}
            </span>
            <ExternalLink className="w-3.5 h-3.5 md:w-4 md:h-4 text-muted-foreground group-hover:text-paytap-light transition-colors" />
          </div>
          
          <h3 className="text-base md:text-lg font-medium text-foreground mb-2 md:mb-3 line-clamp-2 group-hover:text-paytap-light transition-colors">
            {article.headline}
          </h3>
          
          <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
            <Clock className="w-3 h-3 md:w-3.5 md:h-3.5" />
            {article.date}
          </div>
        </a>
      ))}
    </div>
  </div>
</section>
```

---

#### 4. Back Button - Mobile Spacing

**File:** `src/pages/Newsroom.tsx` (lines 291-298)

```tsx
{/* Back button */}
<Link 
  to="/" 
  className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-8 md:mb-12 group"
>
  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
  Back to Home
</Link>
```

---

### Summary of Mobile Optimizations

| Area | Optimization |
|------|--------------|
| **Hero** | Smaller title (3xl), reduced padding (py-8), tighter margins |
| **Carousel Card** | Reduced padding (p-5), smaller headline (xl), hide blur effects on mobile |
| **Carousel Arrows** | Hidden on mobile (swipe to navigate), visible from `md:` breakpoint |
| **Dot Indicators** | Larger touch targets on mobile (w-3 h-3) |
| **Article Grid** | Single column on mobile, smaller padding (p-4), reduced text sizes |
| **Performance** | Hide `blur-3xl` decorations on mobile with `hidden md:block` |

---

### Files to Modify

| File | Changes |
|------|---------|
| `src/pages/Newsroom.tsx` | Full mobile optimization across hero, carousel, and grid sections |

