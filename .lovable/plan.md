

## Update Mobile Control Center - Android App Link

**File: `src/components/MobileAppSection.tsx`**

### Changes:
1. **Google Play button**: Remove the "Coming Soon" badge, remove `opacity-80 cursor-not-allowed`, and wrap it in an anchor tag linking to `https://play.google.com/store/apps/details?id=com.paytap.app&pcampaignid=web_share` (opens in new tab).

2. **iOS App Store button**: Keep as-is with "Coming Soon" badge and disabled styling.

