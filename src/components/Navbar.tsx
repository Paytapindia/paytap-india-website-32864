import { Link } from "react-router-dom";
import { useState, memo } from "react";
import { Menu, X, ChevronDown, LogIn, Sparkles } from "lucide-react";
import LanguageSelector from "@/components/LanguageSelector";
import { Button } from "@/components/ui/button";
import { useModal } from "@/contexts/ModalContext";
import paytapLogo from "@/assets/paytap-logo-navbar.png";

const navGroups = [
  {
    label: "Platform",
    items: [
      { label: "Paytap Platform Overview", to: "/platform", desc: "Connected fleet, driver, payment & expense OS" },
      { label: "AI Fleet Manager", to: "/ai-fleet-manager", desc: "Available in Elite · Interactive AI command centre" },
      { label: "Trust & Security", to: "/security", desc: "Governance, permissions & RBI-compliant infrastructure" },
    ],
  },
  {
    label: "Solutions",
    items: [
      { label: "All Industry Solutions", to: "/solutions", desc: "Transport, last-mile, distribution & enterprise fleets" },
      { label: "Pay at Pump", to: "/pay-at-pump", desc: "Contactless vehicle-linked fuel payments" },
      { label: "Order Paytap Tags", to: "/checkout", desc: "Activate vehicle payment tags for your fleet" },
    ],
  },
  {
    label: "Resources",
    items: [
      { label: "How It Works", to: "/how-it-works", desc: "Step-by-step operational walkthrough" },
      { label: "Help Centre & FAQ", to: "/faq", desc: "Common onboarding and operational questions" },
      { label: "Support", to: "/support", desc: "Reach our support team" },
    ],
  },
  {
    label: "Company",
    items: [
      { label: "About Paytap", to: "/about", desc: "Our mission, evolution and company profile" },
      { label: "Newsroom", to: "/newsroom", desc: "Press coverage and announcements" },
    ],
  },
];

const Navbar = memo(() => {
  const { openContactForm } = useModal();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileGroup, setMobileGroup] = useState<string | null>(null);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-paytap-navy/95 backdrop-blur-md border-b border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 lg:h-18 items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center shrink-0" onClick={() => setIsMenuOpen(false)}>
            <img src={paytapLogo} alt="Paytap" className="h-7 sm:h-8 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {navGroups.map((group) => (
              <div
                key={group.label}
                className="relative"
                onMouseEnter={() => setOpenDropdown(group.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button
                  type="button"
                  onClick={() => setOpenDropdown(openDropdown === group.label ? null : group.label)}
                  className="inline-flex items-center gap-1 rounded-lg px-3.5 py-2 text-sm font-medium text-white/85 hover:text-white hover:bg-white/5 transition-colors"
                >
                  {group.label}
                  <ChevronDown className="h-3.5 w-3.5 opacity-70" />
                </button>

                {openDropdown === group.label && (
                  <div className="absolute left-0 top-full pt-2 w-80">
                    <div className="rounded-xl border border-white/15 bg-paytap-navy p-2 shadow-2xl">
                      {group.items.map((item) => (
                        <Link
                          key={item.to}
                          to={item.to}
                          onClick={() => setOpenDropdown(null)}
                          className="block rounded-lg px-3.5 py-2.5 hover:bg-white/10 transition-colors"
                        >
                          <div className="text-sm font-semibold text-white">{item.label}</div>
                          <div className="text-xs text-white/65 mt-0.5">{item.desc}</div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-2.5">
            <LanguageSelector />
            <Button
              variant="outline"
              size="sm"
              asChild
              className="border-white/25 bg-transparent text-white hover:bg-white/10 hover:text-white rounded-lg h-9 px-3.5"
            >
              <a
                href="https://business.paytap.co.in/login"
                target="_blank"
                rel="noopener noreferrer"
              >
                <LogIn className="mr-1.5 h-3.5 w-3.5" />
                Platform Login
              </a>
            </Button>
            <Button
              size="sm"
              onClick={openContactForm}
              className="bg-paytap-light hover:bg-paytap-light/90 text-white font-semibold rounded-lg h-9 px-4"
            >
              <Sparkles className="mr-1.5 h-3.5 w-3.5" />
              Book a Demo
            </Button>
          </div>

          {/* Mobile Controls */}
          <div className="flex lg:hidden items-center gap-2">
            <LanguageSelector />
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle navigation menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-white hover:bg-white/10"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMenuOpen && (
        <div className="lg:hidden border-t border-white/10 bg-paytap-navy px-4 pb-6 pt-3 max-h-[82vh] overflow-y-auto">
          <div className="space-y-1">
            {navGroups.map((group) => (
              <div key={group.label} className="border-b border-white/10 py-1">
                <button
                  type="button"
                  onClick={() => setMobileGroup(mobileGroup === group.label ? null : group.label)}
                  className="flex w-full items-center justify-between py-2.5 text-sm font-semibold text-white"
                >
                  {group.label}
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      mobileGroup === group.label ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {mobileGroup === group.label && (
                  <div className="space-y-1 pb-2 pl-2">
                    {group.items.map((item) => (
                      <Link
                        key={item.to}
                        to={item.to}
                        onClick={() => setIsMenuOpen(false)}
                        className="block rounded-lg px-3 py-2 text-sm text-white/80 hover:bg-white/10 hover:text-white"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-4 flex flex-col gap-2.5">
            <Button
              onClick={() => {
                setIsMenuOpen(false);
                openContactForm();
              }}
              className="w-full bg-paytap-light hover:bg-paytap-light/90 text-white font-semibold h-11 rounded-xl"
            >
              Book a Personalised Demo
            </Button>
            <Button
              variant="outline"
              asChild
              className="w-full border-white/25 bg-transparent text-white hover:bg-white/10 h-11 rounded-xl"
            >
              <a
                href="https://business.paytap.co.in/login"
                target="_blank"
                rel="noopener noreferrer"
              >
                <LogIn className="mr-2 h-4 w-4" />
                Platform Login
              </a>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
});

Navbar.displayName = "Navbar";

export default Navbar;