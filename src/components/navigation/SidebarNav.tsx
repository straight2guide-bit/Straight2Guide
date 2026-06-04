"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { DestinationMegaMenu } from "./DestinationMegaMenu";
import { LanguageCurrencySelector } from "./LanguageCurrencySelector";
import { MobileDestinationAccordion } from "./MobileDestinationAccordion";

type NavItem = { label: string; href: string } | { label: string; action: "destinations" };

const NAV_LINKS: NavItem[] = [
  { label: "DESTINATIONS", action: "destinations" },
  { label: "DISCOVER", href: "/explore" },
  { label: "DEALS", href: "/deals" },
  { label: "ABOUT US", href: "/about" },
  { label: "FOR GUIDES", href: "/become-a-guide" },
  { label: "LOG IN", href: "/auth/sign-in" },
];

export function SidebarNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [showDestinations, setShowDestinations] = useState(false);

  function close() {
    setIsOpen(false);
    setShowDestinations(false);
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        if (showDestinations) setShowDestinations(false);
        else close();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [showDestinations]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* Hamburger */}
      <button
        className="fixed top-4 left-4 z-50 rounded border-2 border-violet-500 bg-white/90 p-1 backdrop-blur-sm"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        onClick={() => (isOpen ? close() : setIsOpen(true))}
      >
        {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
      </button>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-30 bg-black/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={close}
            aria-hidden
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            aria-label="Main navigation"
            className="fixed top-0 left-0 z-40 flex h-screen w-[80vw] max-w-[320px] flex-col overflow-y-auto rounded-br-2xl bg-[#0E7A45]/70 backdrop-blur-md md:w-[220px]"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.25 }}
          >
            <div className="flex items-center px-4 pt-8 pb-4">
              <Link href="/" onClick={close} aria-label="Go to homepage">
                <Image
                  src="/logo-white-notext.png"
                  alt="Straight2Guide"
                  width={72}
                  height={72}
                  className="transition-opacity hover:opacity-80"
                />
              </Link>
            </div>

            <ul className="mt-2 flex flex-col">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  {"action" in link ? (
                    <>
                      <button
                        className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-semibold tracking-wider text-white hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
                        onClick={() => setShowDestinations((v) => !v)}
                        aria-expanded={showDestinations}
                      >
                        {link.label}
                        <span className="text-[10px] text-white/50">
                          {showDestinations ? "▲" : "▼"}
                        </span>
                      </button>
                      <div className="md:hidden">
                        {showDestinations && <MobileDestinationAccordion />}
                      </div>
                    </>
                  ) : (
                    <Link
                      href={link.href}
                      className="block px-4 py-3 text-sm font-semibold tracking-wider text-white hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
                      onClick={close}
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>

            <div className="mt-auto">
              <LanguageCurrencySelector />
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Desktop mega menu */}
      <AnimatePresence>
        {isOpen && showDestinations && (
          <motion.div
            className="fixed top-0 right-0 left-[220px] z-40 hidden h-screen overflow-y-auto rounded-br-2xl bg-[#0E7A45]/70 backdrop-blur-md md:block"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ type: "tween", duration: 0.2 }}
          >
            <DestinationMegaMenu onClose={() => setShowDestinations(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
