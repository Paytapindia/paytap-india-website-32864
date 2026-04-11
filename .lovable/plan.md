

## Plan: Update CTA and Business Login URLs

### File: `src/components/CTASection.tsx`

**Line 25** — Change `onClick={() => navigate('/checkout')}` to `onClick={() => window.open('https://business.paytap.co.in/login', '_blank')}` so the "Activate Paytap Platform" button redirects to the new URL.

### File: `src/components/Navbar.tsx`

**Line 451** — Change `window.open("https://dashboard.myfleetai.in/login", "_blank")` to `window.open("https://business.paytap.co.in/login", "_blank")` for the Business Login button in the login dialog.

Two files, two one-line edits.

