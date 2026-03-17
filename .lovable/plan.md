

## Plan: Activate iOS App Store Button

The iOS app is now live. Two changes needed in `src/components/MobileAppSection.tsx`:

1. **Update subtitle** — Change "Launching Soon on iOS" to "Available on iOS & Android"
2. **Activate iOS button** — Convert the disabled `<div>` (lines 99-106) to an active `<a>` link pointing to `https://apps.apple.com/in/app/paytap-app/id6755413911`, removing `opacity-60` and `cursor-not-allowed`, and adding the same hover style as the Google Play button

Single file change, no backend work needed.

