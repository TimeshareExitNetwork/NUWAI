"use client";

import { CSSProperties } from "react";
import { ArrowUpRight, EyebrowLabel, PillButton } from "./brand";
import { SiteFooter, SiteNav, siteInner } from "./site-chrome";

const inner: CSSProperties = siteInner;

const LEDGER: { date: string; pub: string; headline: string }[] = [
  {
    date: "12 Mar 2026",
    pub: "Condé Nast Traveler",
    headline: "The small house of travel advisors that won't sell you a hotel",
  },
  {
    date: "04 Feb 2026",
    pub: "Monocle",
    headline: "On restraint, in the year of the algorithm",
  },
  {
    date: "11 Jan 2026",
    pub: "Bloomberg",
    headline: "A private travel network you cannot quite Google",
  },
  {
    date: "16 Dec 2025",
    pub: "The New York Times",
    headline: "Trip-planning's quiet correction",
  },
  {
    date: "02 Nov 2025",
    pub: "AFAR",
    headline: "The forty-two advisors NUWAI keeps in its register",
  },
  {
    date: "21 Sept 2025",
    pub: "Wallpaper*",
    headline: "Editor's notebook · Lisbon, late September",
  },
];

const QUOTES: { body: string; source: string }[] = [
  {
    body: "If you must use the word luxury, use it the way NUWAI does — quietly, and in print.",
    source: "Monocle · No. 187",
  },
  {
    body: "A small house writing on travel the way a magazine used to. The brief is the deliverable; the trip is the consequence.",
    source: "Condé Nast Traveler · 12 March 2026",
  },
  {
    body: "An entire booking platform's worth of taste, in six questions.",
    source: "The New York Times · Travel · 16 December 2025",
  },
];

function PressHero() {
  return (
    <section
      style={{
        background: "var(--carbon)",
        paddingTop: 160,
        paddingBottom: 80,
      }}
    >
      <div style={inner}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 32,
          }}
        >
          <span style={{ width: 30, height: 1, background: "var(--gold)" }} />
          <span
            style={{
              fontFamily: "var(--mono)",
              fontSize: 11,
              letterSpacing: "0.26em",
              color: "var(--gold)",
              textTransform: "uppercase",
            }}
          >
            Press · The room across the hall
          </span>
        </div>
        <h1
          className="h-display"
          style={{
            margin: 0,
            fontSize: "clamp(64px, 8vw, 152px)",
            letterSpacing: "-0.038em",
            lineHeight: 0.94,
            maxWidth: 1180,
          }}
        >
          What the writers
          <br />
          <span className="h-italic" style={{ color: "var(--gold)" }}>
            have said.
          </span>
        </h1>
        <p
          style={{
            marginTop: 40,
            fontSize: 17,
            lineHeight: 1.6,
            color: "rgba(242,235,221,0.78)",
            maxWidth: 720,
          }}
        >
          A short ledger of mentions. We do not sit for podcasts. We do not
          write op-eds. We answer letters, on paper, when it's our turn.
        </p>
      </div>
    </section>
  );
}

function PressLedger() {
  return (
    <section style={{ background: "var(--linen)", padding: "100px 0" }}>
      <div style={inner}>
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBottom: 36,
            gap: 24,
          }}
        >
          <EyebrowLabel color="var(--gold)">
            The pressroom ledger
          </EyebrowLabel>
          <span
            style={{
              fontFamily: "var(--mono)",
              fontSize: 10.5,
              letterSpacing: "0.2em",
              color: "var(--mute)",
              textTransform: "uppercase",
            }}
          >
            Most recent first · {LEDGER.length} mentions
          </span>
        </div>
        <div style={{ borderTop: "1px solid var(--hair)" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "160px 1.2fr 2fr 28px",
              padding: "14px 4px",
              borderBottom: "1px solid var(--hair)",
              fontFamily: "var(--mono)",
              fontSize: 10,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--mute)",
            }}
          >
            <span>Date</span>
            <span>Publication</span>
            <span>Headline</span>
            <span></span>
          </div>
          {LEDGER.map((l, i) => (
            <a
              key={i}
              href="#"
              style={{
                display: "grid",
                gridTemplateColumns: "160px 1.2fr 2fr 28px",
                padding: "22px 4px",
                borderBottom: "1px solid var(--hair)",
                alignItems: "center",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 12,
                  letterSpacing: "0.14em",
                  color: "var(--mute)",
                  textTransform: "uppercase",
                }}
              >
                {l.date}
              </span>
              <span
                style={{
                  fontFamily: "var(--display)",
                  fontStyle: "italic",
                  fontSize: 20,
                  color: "var(--ink)",
                }}
              >
                {l.pub}
              </span>
              <span
                style={{
                  fontFamily: "var(--display)",
                  fontSize: 22,
                  letterSpacing: "-0.01em",
                  color: "var(--ink)",
                  lineHeight: 1.25,
                }}
              >
                {l.headline}
              </span>
              <span style={{ color: "var(--mute)" }}>
                <ArrowUpRight size={14} />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function PressQuotes() {
  return (
    <section style={{ background: "var(--bone)", padding: "100px 0" }}>
      <div style={inner}>
        <EyebrowLabel color="var(--gold)">Selected quotes</EyebrowLabel>
        <div
          style={{
            marginTop: 40,
            display: "flex",
            flexDirection: "column",
            gap: 56,
          }}
        >
          {QUOTES.map((q, i) => (
            <figure
              key={i}
              style={{
                margin: 0,
                paddingBottom: 32,
                borderBottom:
                  i < QUOTES.length - 1 ? "1px solid var(--hair)" : "0",
              }}
            >
              <blockquote
                style={{
                  margin: 0,
                  fontFamily: "var(--display)",
                  fontStyle: "italic",
                  fontSize: "clamp(28px, 3.6vw, 56px)",
                  lineHeight: 1.2,
                  letterSpacing: "-0.012em",
                  color: "var(--ink)",
                  maxWidth: 1080,
                }}
              >
                <span style={{ color: "var(--gold)" }}>“</span>
                {q.body}
                <span style={{ color: "var(--gold)" }}>”</span>
              </blockquote>
              <figcaption
                style={{
                  marginTop: 18,
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  fontFamily: "var(--mono)",
                  fontSize: 11,
                  letterSpacing: "0.18em",
                  color: "var(--mute)",
                  textTransform: "uppercase",
                }}
              >
                <span
                  style={{
                    width: 28,
                    height: 1,
                    background: "var(--gold)",
                  }}
                />
                {q.source}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function PressContact() {
  return (
    <section style={{ background: "var(--carbon)", padding: "100px 0" }}>
      <div style={inner}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 64,
            alignItems: "flex-start",
          }}
        >
          <div>
            <EyebrowLabel color="var(--gold)">Media kit</EyebrowLabel>
            <h3
              className="h-display"
              style={{
                margin: "16px 0 16px",
                fontSize: "clamp(40px, 4.6vw, 64px)",
                letterSpacing: "-0.02em",
                lineHeight: 1,
              }}
            >
              One document.
              <br />
              <span className="h-italic" style={{ color: "var(--gold)" }}>
                A logo.
              </span>{" "}
              That's it.
            </h3>
            <p
              style={{
                margin: 0,
                fontSize: 16,
                lineHeight: 1.6,
                color: "rgba(242,235,221,0.78)",
                maxWidth: 480,
              }}
            >
              The PDF includes a brand brief, three editorial photographs,
              and the NUWAI lockup in two colourways. No brand portal, no
              login.
            </p>
            <div
              style={{ marginTop: 28, display: "flex", gap: 10 }}
            >
              <PillButton size="md" as="a" href="#">
                Download media kit (4.2 MB)
              </PillButton>
              <PillButton size="md" variant="ghost" as="a" href="#">
                Logo only (SVG)
              </PillButton>
            </div>
          </div>
          <div
            style={{
              padding: "32px 32px",
              border: "1px solid var(--hair)",
              borderRadius: 6,
              background: "var(--linen)",
              color: "var(--ink)",
            }}
          >
            <div
              style={{
                fontFamily: "var(--mono)",
                fontSize: 10.5,
                letterSpacing: "0.2em",
                color: "var(--gold)",
                textTransform: "uppercase",
                marginBottom: 14,
              }}
            >
              For press enquiries, write to —
            </div>
            <div
              className="h-display"
              style={{
                fontSize: 32,
                letterSpacing: "-0.012em",
                marginBottom: 6,
                lineHeight: 1.1,
              }}
            >
              Priya Ramesh
            </div>
            <div
              style={{
                fontFamily: "var(--mono)",
                fontSize: 13,
                letterSpacing: "0.04em",
                color: "var(--mute)",
                marginBottom: 22,
              }}
            >
              press@nuwai.travel · +44 20 7946 0142
            </div>
            <p
              style={{
                margin: 0,
                fontSize: 14.5,
                lineHeight: 1.55,
                color: "var(--mute)",
              }}
            >
              We answer within three working days. We do not arrange phone
              briefings without a published angle in advance.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function PressScreen() {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: "100%",
        overflowX: "clip",
        background: "var(--linen)",
        color: "var(--ink)",
      }}
    >
      <SiteNav />
      <PressHero />
      <PressLedger />
      <PressQuotes />
      <PressContact />
      <SiteFooter />
    </div>
  );
}
