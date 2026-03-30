

## Plan: Add Login Type Popup to Platform Login Button

### What changes

Replace the direct `window.open` on the "Platform Login" button (both desktop and mobile) with a dialog popup offering two choices:

- **Account Login** → opens `https://dashboard.paytap.co.in/login` in new tab
- **Business Login** → opens `https://dashboard.myfleetai.in/login` in new tab

### File: `src/components/Navbar.tsx`

1. Import `Dialog, DialogContent, DialogHeader, DialogTitle` from `@/components/ui/dialog`
2. Add state: `const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false)`
3. Replace `onClick` on desktop button (line 248) and mobile button (line 257) to open the dialog instead of redirecting
4. Add a `<Dialog>` at the end of the component with:
   - Title: "Choose Login Type"
   - Two styled buttons stacked vertically:
     - **Account Login** (brand pink `bg-paytap-light`) — subtitle "Paytap Dashboard" — opens `https://dashboard.paytap.co.in/login`
     - **Business Login** (outline style) — subtitle "MyFleet AI Dashboard" — opens `https://dashboard.myfleetai.in/login`
   - Both buttons close the dialog after click

Single file change only.

