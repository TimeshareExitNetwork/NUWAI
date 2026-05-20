"use client";

import { CSSProperties, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, PillButton, Wordmark } from "./brand";

export const siteInner: CSSProperties = {
  maxWidth: 1320,
  margin: "0 auto",
  padding: "0 48px",
};

const NAV_LINKS = [
  { label: "Stays", href: "/destinations" },
  { label: "Collections", href: "/atelier" },
  { label: "Membership", href: "/membership" },
  { label: "Concierge", href: "/concierge" },
  { label: "Journal", href: "/journal" },
];

export function SiteNav({
  variant = "auto",
}: {
  variant?: "auto" | "solid";
}) {
  const [scrolled, setScrolled] = useState(variant === "solid");
  useEffect(() => {
    if (variant === "solid") {
      setScrolled(true);
      return;
    }
    const onScroll = () => setScrolled(window.scrollY > 380);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [variant]);
  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: scrolled ? "rgba(10,11,15,0.78)" : "transparent",
        backdropFilter: scrolled ? "blur(24px) saturate(140%)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(24px) saturate(140%)" : "none",
        borderBottom: scrolled
          ? "1px solid var(--hair)"
          : "1px solid transparent",
        transition:
          "background 0.4s ease, border-color 0.4s ease, backdrop-filter 0.4s ease",
      }}
    >
      <div
        style={{
          ...siteInner,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 78,
        }}
      >
        <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Wordmark size={26} color="var(--ink)" />
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: 36 }}>
          {NAV_LINKS.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              style={{
                color: "var(--ink)",
                textDecoration: "none",
                fontSize: 13.5,
                fontWeight: 400,
                opacity: 0.78,
                letterSpacing: "0.01em",
              }}
            >
              {l.label}
            </Link>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <Link
            href="/sign-in"
            style={{
              color: "var(--ink)",
              textDecoration: "none",
              fontSize: 13.5,
              opacity: 0.78,
            }}
          >
            Sign in
          </Link>
          <PillButton size="sm" as="a" href="/membership">
            Join NUWAI <ArrowRight size={12} />
          </PillButton>
        </div>
      </div>
    </nav>
  );
}

const FOOTER_COLS: [string, { label: string; href: string }[]][] = [
  [
    "Platform",
    [
      { label: "Stays", href: "/destinations" },
      { label: "Collections", href: "/atelier" },
      { label: "Concierge", href: "/concierge" },
      { label: "Membership", href: "/membership" },
    ],
  ],
  [
    "Company",
    [
      { label: "About", href: "/about" },
      { label: "Journal", href: "/journal" },
      { label: "Press", href: "/press" },
      { label: "Careers", href: "/careers" },
    ],
  ],
  [
    "Support",
    [
      { label: "Help", href: "/help" },
      { label: "Sign in", href: "/sign-in" },
      { label: "Terms", href: "/terms" },
      { label: "Privacy", href: "/privacy" },
    ],
  ],
];

export function SiteFooter() {
  return (
    <footer
      style={{
        background: "var(--carbon)",
        color: "var(--ink)",
        padding: "64px 0 48px",
        borderTop: "1px solid var(--hair)",
      }}
    >
      <div
        style={{
          ...siteInner,
          display: "grid",
          gridTemplateColumns: "1.5fr 1fr 1fr 1fr",
          gap: 48,
        }}
      >
        <div>
          <Wordmark size={32} color="var(--ink)" />
          <p
            style={{
              marginTop: 14,
              color: "rgba(250,246,240,0.55)",
              fontSize: 14,
              maxWidth: 360,
              lineHeight: 1.5,
            }}
          >
            A members-only travel platform. Curated stays, member rates,
            and a concierge in your pocket.
          </p>
        </div>
        {FOOTER_COLS.map(([h, items]) => (
          <div key={h}>
            <div
              style={{
                fontFamily: "var(--mono)",
                fontSize: 10.5,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "rgba(250,246,240,0.45)",
                marginBottom: 16,
              }}
            >
              {h}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {items.map((i) => (
                <Link
                  key={i.label}
                  href={i.href}
                  style={{
                    color: "var(--ink)",
                    textDecoration: "none",
                    opacity: 0.78,
                    fontSize: 14,
                  }}
                >
                  {i.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div
        style={{
          ...siteInner,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 56,
          paddingTop: 24,
          borderTop: "1px solid rgba(250,246,240,0.12)",
          fontFamily: "var(--mono)",
          fontSize: 11,
          letterSpacing: "0.08em",
          color: "rgba(250,246,240,0.5)",
          textTransform: "uppercase",
        }}
      >
        <span>© NUWAI Travel, Inc. 2026</span>
        <span>Made for the next ten years of travel</span>
      </div>
    </footer>
  );
}
