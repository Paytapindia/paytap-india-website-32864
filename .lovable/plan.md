

## Plan: Update Solution Names in Navbar

Rename "Myfleet AI" → "Paytap Myfleet AI" and "ExpensePro" → "Paytap ExpensePro" in both desktop and mobile navigation menus.

### Changes

**`src/components/Navbar.tsx`** — Update the display text in 4 places:
1. Desktop dropdown: Myfleet AI link text
2. Desktop dropdown: ExpensePro link text
3. Mobile menu: Myfleet AI link text
4. Mobile menu: ExpensePro link text

**`src/i18n/locales/en.json`** — Update translation keys:
- `nav.myfleetAi`: "Myfleet AI" → "Paytap Myfleet AI"
- `nav.expensePro`: "ExpensePro" → "Paytap ExpensePro"

Also update `hi.json` and `kn.json` locale files if they contain these keys.

