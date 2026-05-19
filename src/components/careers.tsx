"use client";

import { CSSProperties } from "react";
import { ArrowUpRight, EyebrowLabel, PillButton } from "./brand";
import { ScrollWords } from "./effects";
import { SiteFooter, SiteNav, siteInner } from "./site-chrome";

const inner: CSSProperties = siteInner;

const ROLES: {
  no: string;
  title: string;
  city: string;
  team: string;
  note: string;
}[] = [
  {
    no: "01",
    title: "Travel advisor, Pacific Mexico",
    city: "Mexico City",
    team: "Register",
    note: "By application and two interviews.",
  },
  {
    no: "02",
    title: "Concierge lead, GMT",
    city: "Lisbon",
    team: "Passage",
    note: "Eight years in luxury hospitality or equivalent.",
  },
  {
    no: "03",
    title: "Editorial associate, the Journal",
    city: "London",
    team: "Editorial",
    note: "Send three filed pieces with your letter.",
  },
  {
    no: "04",
    title: "Designer, brand & print",
    city: "Anywhere · Europe",
    team: "Studio",
    note: "Print fluency required. No portfolio sites.",
  },
  {
    no: "05",
    title: "Engineer, full-stack",
    city: "New York",
    team: "Tools",
    note: "We write small software, slowly.",
  },
];

const OFFERS: { rule: string; body: string }[] = [
  {
    rule: "A four-week sabbatical, every year, from year two.",
    body: "Not a benefit. A standard. The work requires it.",
  },
  {
    rule: "An annual travel allowance, paid against a brief.",
    body: "You write the brief like a client. We send it through the register.",
  },
  {
    rule: "The right to refuse a brief.",
    body: "If a brief is not for you, you are not for that brief. We take it seriously.",
  },
  {
    rule: "An office in three cities, none of which are open plan.",
    body: "Doors, drawers, real desks. We work alone, together.",
  },
];

function CareersHero() {
  return (
    <section
      style={{
        background: "var(--carbon)",
        paddingTop: 160,
        paddingBottom: 100,
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
            Careers · By way of invitation
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
          The work,
          <br />
          <span className="h-italic" style={{ color: "var(--gold)" }}>
            and what it asks of you.
          </span>
        </h1>
        <p
          style={{
            margin: "40px 0 0",
            fontFamily: "var(--display)",
            fontSize: 24,
            lineHeight: 1.45,
            color: "rgba(242,235,221,0.82)",
            maxWidth: 880,
          }}
        >
          <ScrollWords
            text="Working at NUWAI requires three things, in roughly this order — discretion, taste, and stamina. Discretion, because most of what we do is private. Taste, because it cannot be taught quickly enough to be hired for. Stamina, because the work is slower than it looks and the lunches are real."
            baseColor="rgba(242,235,221,0.22)"
            activeColor="var(--ink)"
            accentWord="taste,"
            accentColor="var(--gold)"
          />
        </p>
      </div>
    </section>
  );
}

function OpenRoles() {
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
            Open positions · By application
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
            {ROLES.length} roles · Filed Q2 2026
          </span>
        </div>
        <div style={{ borderTop: "1px solid var(--hair)" }}>
          {ROLES.map((r) => (
            <a
              key={r.no}
              href="mailto:hello@nuwai.travel"
              style={{
                display: "grid",
                gridTemplateColumns:
                  "60px 1.6fr 1fr 1fr 1.4fr 28px",
                gap: 24,
                padding: "26px 4px",
                borderBottom: "1px solid var(--hair)",
                alignItems: "center",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 11,
                  letterSpacing: "0.18em",
                  color: "var(--gold)",
                }}
              >
                {r.no}
              </span>
              <span
                className="h-display"
                style={{
                  fontSize: 28,
                  letterSpacing: "-0.012em",
                  lineHeight: 1.1,
                  color: "var(--ink)",
                }}
              >
                {r.title}
              </span>
              <span
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 12,
                  letterSpacing: "0.14em",
                  color: "var(--mute)",
                  textTransform: "uppercase",
                }}
              >
                {r.city}
              </span>
              <span
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 12,
                  letterSpacing: "0.14em",
                  color: "var(--ink)",
                  textTransform: "uppercase",
                }}
              >
                {r.team}
              </span>
              <span
                style={{
                  fontSize: 14,
                  color: "var(--mute)",
                  lineHeight: 1.4,
                }}
              >
                {r.note}
              </span>
              <span style={{ color: "var(--mute)" }}>
                <ArrowUpRight size={14} />
              </span>
            </a>
          ))}
        </div>
        <div
          style={{
            marginTop: 36,
            paddingTop: 24,
            borderTop: "1px solid var(--hair)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontFamily: "var(--mono)",
            fontSize: 11,
            letterSpacing: "0.18em",
            color: "var(--mute)",
            textTransform: "uppercase",
            gap: 24,
            flexWrap: "wrap",
          }}
        >
          <span>
            Send a letter, not a CV — to <span style={{ color: "var(--ink)" }}>hello@nuwai.travel</span>
          </span>
          <span style={{ color: "var(--gold)" }}>
            One submission per applicant, ever
          </span>
        </div>
      </div>
    </section>
  );
}

function OffersSection() {
  return (
    <section style={{ background: "var(--bone)", padding: "100px 0" }}>
      <div style={inner}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.4fr",
            gap: 64,
            alignItems: "flex-start",
            marginBottom: 36,
          }}
        >
          <div>
            <EyebrowLabel color="var(--gold)">
              What we offer
            </EyebrowLabel>
            <h3
              className="h-display"
              style={{
                margin: "16px 0 0",
                fontSize: "clamp(40px, 4.6vw, 64px)",
                letterSpacing: "-0.018em",
                lineHeight: 1,
              }}
            >
              Standards,
              <br />
              <span className="h-italic" style={{ color: "var(--gold)" }}>
                not perks.
              </span>
            </h3>
          </div>
          <p
            style={{
              margin: 0,
              fontFamily: "var(--display)",
              fontSize: 22,
              lineHeight: 1.4,
              color: "var(--mute)",
              paddingTop: 18,
              maxWidth: 620,
            }}
          >
            We do not list ping-pong tables. We will not be a family. We are
            a small house, with the rituals and the working conditions of
            one.
          </p>
        </div>
        <div
          style={{
            borderTop: "1px solid var(--hair)",
          }}
        >
          {OFFERS.map((o, i) => (
            <div
              key={i}
              style={{
                display: "grid",
                gridTemplateColumns: "80px 1fr 1.2fr",
                gap: 40,
                padding: "32px 0",
                borderBottom: "1px solid var(--hair)",
                alignItems: "flex-start",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 11,
                  letterSpacing: "0.18em",
                  color: "var(--gold)",
                }}
              >
                § {String(i + 1).padStart(2, "0")}
              </span>
              <h4
                className="h-display"
                style={{
                  margin: 0,
                  fontSize: 26,
                  lineHeight: 1.15,
                  letterSpacing: "-0.01em",
                  fontWeight: 400,
                  color: "var(--ink)",
                }}
              >
                {o.rule}
              </h4>
              <p
                style={{
                  margin: 0,
                  fontSize: 15,
                  lineHeight: 1.6,
                  color: "var(--mute)",
                }}
              >
                {o.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ApplyCTA() {
  return (
    <section style={{ background: "var(--carbon)", padding: "120px 0" }}>
      <div
        style={{ ...inner, textAlign: "center" }}
      >
        <EyebrowLabel color="var(--gold)">
          On applying
        </EyebrowLabel>
        <h3
          className="h-display"
          style={{
            margin: "20px auto 18px",
            fontSize: "clamp(40px, 5vw, 80px)",
            letterSpacing: "-0.025em",
            lineHeight: 0.98,
            maxWidth: 1080,
          }}
        >
          Write us a letter.
          <br />
          <span className="h-italic" style={{ color: "var(--gold)" }}>
            One page is plenty.
          </span>
        </h3>
        <p
          style={{
            margin: "0 auto 28px",
            fontSize: 16,
            lineHeight: 1.6,
            color: "rgba(242,235,221,0.78)",
            maxWidth: 620,
          }}
        >
          Tell us which role, and tell us why you. We will answer everyone we
          take seriously. We will not answer everyone.
        </p>
        <PillButton size="lg" as="a" href="mailto:hello@nuwai.travel">
          hello@nuwai.travel
        </PillButton>
      </div>
    </section>
  );
}

export default function CareersScreen() {
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
      <CareersHero />
      <OpenRoles />
      <OffersSection />
      <ApplyCTA />
      <SiteFooter />
    </div>
  );
}
