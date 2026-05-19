"use client";

import { CSSProperties, useEffect, useRef } from "react";
import { ArrowRight, EyebrowLabel, PillButton } from "./brand";
import { ScrollWords, SplitText, useInView } from "./effects";
import { SiteFooter, SiteNav, siteInner } from "./site-chrome";

const inner: CSSProperties = siteInner;

const MOVEMENTS = [
  {
    no: "I",
    name: "Brief",
    sub: "Three minutes, in your own words",
    body: "We don't ask twenty questions. We ask six, and we read what you write between them. The brief is the most important document we'll exchange. We treat it as a draft, not a form.",
    img: "https://images.unsplash.com/photo-1517842645767-c639042777db?w=1600&auto=format&fit=crop&q=80",
  },
  {
    no: "II",
    name: "Research",
    sub: "Three advisors, working in parallel",
    body: "Three vetted advisors read the brief independently. Each writes a complete week — not a quote, not a list — without seeing the others' work. They are paid for the time regardless of outcome.",
    img: "https://images.unsplash.com/photo-1488972685288-c3fd157d7c7a?w=1600&auto=format&fit=crop&q=80",
  },
  {
    no: "III",
    name: "Provisioning",
    sub: "What the hotels do not advertise",
    body: "Once chosen, the trip leaves the marketplace and enters a small back office. Tent #14, not 'a tent.' The corner table at Hartwood. Sunrise at the ruins, because the gate-keeper owes us a coffee.",
    img: "https://images.unsplash.com/photo-1568084680786-a84f91d1153c?w=1600&auto=format&fit=crop&q=80",
  },
  {
    no: "IV",
    name: "Passage",
    sub: "Concierge on, by name, in your timezone",
    body: "From the moment you leave the front door until the moment you return to it, a real person is on call. We do not use bots, we do not use shared inboxes. Sofía answers when you write Sofía.",
    img: "https://images.unsplash.com/photo-1564671165093-20688ff1fffa?w=1600&auto=format&fit=crop&q=80",
  },
  {
    no: "V",
    name: "Aftercare",
    sub: "Two letters, one month apart",
    body: "When you come home we ask one question. When the month is up we ask another. Everything you tell us becomes private margin notes on the next brief. We will know what to refuse on your behalf in 2027.",
    img: "https://images.unsplash.com/photo-1531425300797-d5dc8b021c84?w=1600&auto=format&fit=crop&q=80",
  },
];

const STANDARDS: { rule: string; body: string }[] = [
  {
    rule: "We do not work with properties of more than sixty keys.",
    body: "Scale is a tax on attention. Above sixty rooms, the difference between a guest and a transaction starts to compound. We have made exceptions twice in five years.",
  },
  {
    rule: "We do not accept commission from operators.",
    body: "Advisors are paid by NUWAI, against the brief. Hotels and operators are paid by the client, at rate. No kickbacks reach the desk. This is the line.",
  },
  {
    rule: "We do not book during a destination's worst week.",
    body: "If the season is wrong, we'll move the dates or refuse the brief. We have turned down a $42,000 Tulum brief in late August. The client thanked us in November.",
  },
  {
    rule: "We do not optimise for response time.",
    body: "Our average is twenty-two hours, not twenty-two minutes. A good brief deserves a long lunch's worth of thought, not a notification.",
  },
  {
    rule: "We do not publish what we book.",
    body: "Every itinerary is private. No social tagging, no testimonials with location data, no public reviews. Discretion is a deliverable.",
  },
];

function AtelierHero() {
  const bgRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let raf: number | null = null;
    const tick = () => {
      raf = null;
      const y = window.scrollY;
      if (bgRef.current) {
        bgRef.current.style.transform = `translate3d(0, ${y * 0.28}px, 0)`;
        bgRef.current.style.opacity = String(
          Math.max(0.2, 1 - y / 900),
        );
      }
    };
    const onScroll = () => {
      if (raf == null) raf = requestAnimationFrame(tick);
    };
    tick();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf != null) cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        minHeight: "88vh",
        background: "var(--carbon)",
        overflow: "hidden",
        paddingTop: 160,
        paddingBottom: 120,
      }}
    >
      <div
        ref={bgRef}
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(900px 600px at 70% 30%, rgba(201,168,106,0.16), transparent 60%), radial-gradient(700px 500px at 20% 80%, rgba(74,110,125,0.16), transparent 65%)",
          willChange: "transform, opacity",
        }}
      />
      <div style={{ ...inner, position: "relative", zIndex: 2 }}>
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
            The Atelier · A house pamphlet
          </span>
        </div>
        <h1
          className="h-display"
          style={{
            margin: 0,
            fontSize: "clamp(64px, 8vw, 152px)",
            letterSpacing: "-0.038em",
            lineHeight: 0.94,
            maxWidth: 1100,
          }}
        >
          <SplitText text="On the making" by="word" stagger={0.08} />
          <br />
          <SplitText
            text="of a journey."
            by="word"
            stagger={0.1}
            accentWord="journey"
            accentColor="var(--gold)"
          />
        </h1>
        <div
          style={{
            marginTop: 56,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 64,
            maxWidth: 1080,
          }}
        >
          <p
            style={{
              margin: 0,
              fontFamily: "var(--display)",
              fontSize: 26,
              lineHeight: 1.4,
              color: "var(--ink)",
              letterSpacing: "-0.005em",
            }}
          >
            <ScrollWords
              text="A trip designed for you is a quiet act of restraint. We refuse more than we accept. We choose advisors slowly, hotels carefully, and weeks of the year almost ruthlessly. What follows is the method — written down because we use it on every brief."
              baseColor="rgba(242,235,221,0.22)"
              activeColor="var(--ink)"
              accentWord="restraint."
              accentColor="var(--gold)"
            />
          </p>
          <div
            style={{
              alignSelf: "flex-end",
              fontFamily: "var(--mono)",
              fontSize: 11,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--mute)",
              lineHeight: 1.8,
            }}
          >
            <div>Edition · MMXXVI</div>
            <div>For internal and member reference</div>
            <div>Set in Instrument Serif &amp; Geist</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Movement({
  m,
  idx,
}: {
  m: (typeof MOVEMENTS)[number];
  idx: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref);
  const flip = idx % 2 === 1;
  return (
    <section
      ref={ref}
      style={{
        background:
          idx % 2 === 0 ? "var(--linen)" : "var(--bone)",
        borderTop: idx === 0 ? "1px solid var(--hair)" : "0",
        padding: "120px 0",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(40px)",
        transition:
          "opacity 1.4s cubic-bezier(0.2, 0.8, 0.2, 1), transform 1.4s cubic-bezier(0.2, 0.8, 0.2, 1)",
      }}
    >
      <div style={inner}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.2fr",
            gap: 80,
            alignItems: "center",
            flexDirection: flip ? "row-reverse" : "row",
            direction: flip ? "rtl" : "ltr",
          }}
        >
          <div style={{ direction: "ltr" }}>
            <div
              style={{
                fontFamily: "var(--mono)",
                fontSize: 11,
                letterSpacing: "0.22em",
                color: "var(--gold)",
                textTransform: "uppercase",
                marginBottom: 18,
              }}
            >
              Movement · {m.no}
            </div>
            <h3
              className="h-display"
              style={{
                margin: 0,
                fontSize: "clamp(56px, 7vw, 112px)",
                letterSpacing: "-0.03em",
                lineHeight: 0.92,
              }}
            >
              {m.name}
              <span style={{ color: "var(--gold)" }}>.</span>
            </h3>
            <div
              style={{
                marginTop: 18,
                fontFamily: "var(--display)",
                fontStyle: "italic",
                fontSize: 22,
                color: "var(--mute)",
                lineHeight: 1.4,
              }}
            >
              {m.sub}
            </div>
            <p
              style={{
                marginTop: 28,
                fontSize: 17,
                lineHeight: 1.6,
                color: "var(--ink)",
                maxWidth: 540,
              }}
            >
              {m.body}
            </p>
          </div>
          <div
            style={{
              direction: "ltr",
              height: 560,
              borderRadius: 6,
              overflow: "hidden",
              position: "relative",
              background: "var(--carbon)",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage: `url(${m.img})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                filter: "grayscale(0.45) saturate(0.9) contrast(1.05)",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(180deg, rgba(10,11,15,0.0) 40%, rgba(10,11,15,0.55) 100%)",
              }}
            />
            <div
              style={{
                position: "absolute",
                left: 18,
                right: 18,
                bottom: 18,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                fontFamily: "var(--mono)",
                fontSize: 10,
                letterSpacing: "0.18em",
                color: "rgba(242,235,221,0.85)",
                textTransform: "uppercase",
              }}
            >
              <span style={{ color: "var(--gold)" }}>
                Plate · {m.no}
              </span>
              <span>Movement {m.no} — {m.name}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HouseStandards() {
  return (
    <section style={{ background: "var(--carbon)", padding: "140px 0" }}>
      <div style={inner}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.4fr",
            gap: 80,
            alignItems: "flex-start",
            marginBottom: 56,
          }}
        >
          <div>
            <EyebrowLabel color="var(--gold)">
              The house standards
            </EyebrowLabel>
            <h2
              className="h-display"
              style={{
                fontSize: "clamp(48px, 5.6vw, 84px)",
                margin: "20px 0 0",
                letterSpacing: "-0.02em",
                lineHeight: 0.98,
              }}
            >
              A ledger of
              <br />
              <span className="h-italic" style={{ color: "var(--gold)" }}>
                refusals.
              </span>
            </h2>
          </div>
          <p
            style={{
              margin: 0,
              paddingTop: 18,
              fontFamily: "var(--display)",
              fontSize: 22,
              lineHeight: 1.4,
              color: "rgba(242,235,221,0.78)",
              maxWidth: 580,
            }}
          >
            We keep the rules where they belong — in writing, in front of the
            client, in front of the advisor. Most of what we know about
            taste, we have learned by saying no.
          </p>
        </div>
        <div
          style={{
            borderTop: "1px solid var(--hair)",
          }}
        >
          {STANDARDS.map((s, i) => (
            <div
              key={i}
              style={{
                display: "grid",
                gridTemplateColumns: "100px 1fr 1.2fr",
                gap: 48,
                padding: "44px 0",
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
                  fontSize: 30,
                  lineHeight: 1.15,
                  letterSpacing: "-0.012em",
                  fontWeight: 400,
                  color: "var(--ink)",
                }}
              >
                {s.rule}
              </h4>
              <p
                style={{
                  margin: 0,
                  fontSize: 15.5,
                  lineHeight: 1.6,
                  color: "rgba(242,235,221,0.72)",
                }}
              >
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Colophon() {
  const rows: [string, string][] = [
    ["Display type", "Instrument Serif — set in italics where italics are due"],
    ["Body & mono", "Geist, Geist Mono"],
    ["Print edition", "Munken Pure 120gsm · Mohn Media, Berlin"],
    ["First brief filed", "Oct 2024"],
    ["Founding members", "Sofía Marín · Daniel Okafor · Priya Ramesh · J.M."],
    ["Headquartered", "Lisbon · Mexico City · New York"],
    ["Carbon ledger", "Audited annually by Atmosfair"],
    ["Edition", "MMXXVI · IV"],
  ];
  return (
    <section style={{ background: "var(--bone)", padding: "120px 0" }}>
      <div style={inner}>
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBottom: 56,
            gap: 32,
          }}
        >
          <EyebrowLabel color="var(--gold)">Colophon</EyebrowLabel>
          <span
            style={{
              fontFamily: "var(--mono)",
              fontSize: 10.5,
              letterSpacing: "0.2em",
              color: "var(--mute)",
              textTransform: "uppercase",
            }}
          >
            The back page
          </span>
        </div>
        <div
          style={{
            borderTop: "1px solid var(--hair)",
            borderBottom: "1px solid var(--hair)",
          }}
        >
          {rows.map(([k, v], i) => (
            <div
              key={k}
              style={{
                display: "grid",
                gridTemplateColumns: "260px 1fr",
                padding: "20px 0",
                borderBottom:
                  i < rows.length - 1 ? "1px solid var(--hair)" : "0",
                alignItems: "baseline",
                gap: 32,
              }}
            >
              <span
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 10.5,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--mute)",
                }}
              >
                {k}
              </span>
              <span
                style={{
                  fontFamily: "var(--display)",
                  fontSize: 22,
                  letterSpacing: "-0.005em",
                  color: "var(--ink)",
                  lineHeight: 1.3,
                }}
              >
                {v}
              </span>
            </div>
          ))}
        </div>
        <div
          style={{
            marginTop: 56,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 32,
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              fontFamily: "var(--display)",
              fontStyle: "italic",
              fontSize: 26,
              color: "var(--mute)",
              maxWidth: 540,
              lineHeight: 1.4,
            }}
          >
            “We are not in the business of selling holidays. We are in the
            business of attention.”
          </div>
          <PillButton size="lg" as="a" href="/trip-request">
            Begin a brief <ArrowRight />
          </PillButton>
        </div>
      </div>
    </section>
  );
}

export default function AtelierScreen() {
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
      <AtelierHero />
      {MOVEMENTS.map((m, i) => (
        <Movement key={m.no} m={m} idx={i} />
      ))}
      <HouseStandards />
      <Colophon />
      <SiteFooter />
    </div>
  );
}
