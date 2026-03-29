

## Plan: Install Google Tag Manager and GA4

The user wants to add two new tracking scripts from the screenshots:
1. **Google Tag Manager** (GTM-P5NSDGRN)
2. **Google Analytics 4** (G-EG7NBT85R6)

### Current State
- `index.html` already has Google Ads gtag.js (`AW-17870924773`) on lines 7-14
- Meta Pixel is on lines 56-68
- The existing gtag.js setup only configs `AW-17870924773`

### Changes in `index.html`

**1. Add GTM script in `<head>` (after line 7, before the existing gtag.js)**
```html
<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-P5NSDGRN');</script>
<!-- End Google Tag Manager -->
```

**2. Add GA4 config to existing gtag.js block (line 13)**
Add `gtag('config', 'G-EG7NBT85R6');` right after the existing `gtag('config', 'AW-17870924773');` line. This shares the same gtag.js loader — no need for a second script tag.

**3. Add GTM noscript in `<body>` (line 321, right after `<body>`)**
```html
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-P5NSDGRN"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->
```

### File
- `index.html` — 3 insertions, no deletions

