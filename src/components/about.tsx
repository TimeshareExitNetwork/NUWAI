"use client";

import { CSSProperties, useEffect, useRef } from "react";
import { ArrowRight, EyebrowLabel, PillButton } from "./brand";
import { ImageScroll, ScrollWords, useInView } from "./effects";
import { SiteFooter, SiteNav, siteInner } from "./site-chrome";

const inner: CSSProperties = siteInner;

const TIMELINE: { year: string; body: string }[] = [
  {
    year: "2023",
    body: "Three founders, three flights, one dinner in Lisbon. The first brief written on the back of a Pingo Doce receipt.",
  },
  {
    year: "Spring 2024",
    body: "A private trial of nineteen briefs across Mexico and Italy. Twelve advisors interviewed; four kept.",
  },
  {
    year: "Oct 2024",
    body: "First brief filed publicly. Maya L., Tulum, $8–12k. Sofía's tent fourteen, held by hand.",
  },
  {
    year: "Spring 2025",
    body: "Forty-two advisors on the register. The Journal launches with No. 01 — Spring 2025.",
  },
  {
    year: "Winter 2026",
    body: "The Atlas, Edition 04. Six hundred and seventy briefs in the desk drawer. Same six questions, every time.",
  },
];

const NOT: string[] = [
  "We are not an OTA.",
  "We are not a search engine.",
  "We are not a booking platform.",
  "We are not a TikTok concierge.",
  "We are not a points programme.",
  "We are not a network of \"creators\".",
  "We are not asking what kind of traveller you are.",
];

function AboutHero() {
  const bgRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let raf: number | null = null;
    const tick = () => {
      raf = null;
      const y = window.scrollY;
      if (bgRef.current) {
        bgRef.current.style.transform = `translate3d(0, ${y * 0.3}px, 0)`;
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
        background: "var(--carbon)",
        overflow: "hidden",
        paddingTop: 160,
        paddingBottom: 96,
        minHeight: "70vh",
      }}
    >
      <div
        ref={bgRef}
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(900px 600px at 30% 30%, rgba(74,110,125,0.16), transparent 60%), radial-gradient(700px 500px at 80% 70%, rgba(201,168,106,0.14), transparent 65%)",
          willChange: "transform",
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
            A house pamphlet · By way of introduction
          </span>
        </div>
        <h1
          className="h-display"
          style={{
            margin: 0,
            fontSize: "clamp(72px, 9vw, 168px)",
            letterSpacing: "-0.04em",
            lineHeight: 0.94,
            maxWidth: 1180,
          }}
        >
          Why we built
          <br />
          <span className="h-italic" style={{ color: "var(--gold)" }}>
            this house.
          </span>
        </h1>
      </div>
    </section>
  );
}

function FoundersLetter() {
  return (
    <section style={{ background: "var(--linen)", padding: "120px 0" }}>
      <div style={inner}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 320px",
            gap: 80,
            alignItems: "flex-start",
          }}
        >
          <article
            style={{
              maxWidth: 760,
              fontFamily: "var(--display)",
              fontSize: 24,
              lineHeight: 1.45,
              color: "var(--ink)",
              letterSpacing: "-0.005em",
            }}
          >
            <EyebrowLabel color="var(--gold)">
              A letter from the founders
            </EyebrowLabel>
            <p style={{ marginTop: 28 }}>
              <ScrollWords
                text="NUWAI began the way most quiet things do — over a long dinner that had nothing to do with what came next. We were three travel advisors in three cities, comparing notes on the same problem: clients we admired were sending us briefs that deserved more thought than the industry was prepared to give them."
                baseColor="rgba(242,235,221,0.20)"
                activeColor="var(--ink)"
              />
            </p>
            <p style={{ marginTop: 18 }}>
              <ScrollWords
                text="Travel had become a search problem. We thought it was an attention problem. We still do. The web has more flights and more hotels than anyone could read in a lifetime, and almost none of the patience required to choose between them. We started NUWAI to give back that patience, in the form of a small house of advisors who write fewer briefs per year, more slowly, for clients who do not need to be sold a holiday."
                baseColor="rgba(242,235,221,0.20)"
                activeColor="var(--ink)"
                accentWord="patience,"
                accentColor="var(--gold)"
              />
            </p>
            <p style={{ marginTop: 18 }}>
              <ScrollWords
                text="We are not very interested in growth, and not very interested in disruption. We are interested in the trip you would never have planned for yourself — and in being the people who can write it down. If we ever stop being good at that, please tell us, and we will stop."
                baseColor="rgba(242,235,221,0.20)"
                activeColor="var(--ink)"
              />
            </p>
            <p
              style={{
                marginTop: 32,
                fontStyle: "italic",
                color: "var(--mute)",
                fontSize: 20,
              }}
            >
              — Sofía Marín, Daniel Okafor, Priya Ramesh
              <br />
              Lisbon · Mexico City · New York
              <br />
              The third Friday of October, MMXXIV
            </p>
          </article>

          <aside
            style={{
              borderLeft: "1px solid var(--hair)",
              paddingLeft: 28,
            }}
          >
            <div
              style={{
                fontFamily: "var(--mono)",
                fontSize: 10.5,
                letterSpacing: "0.2em",
                color: "var(--mute)",
                textTransform: "uppercase",
                marginBottom: 18,
              }}
            >
              The margin · A short timeline
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {TIMELINE.map((t, i) => (
                <div
                  key={t.year}
                  style={{
                    padding: "16px 0",
                    borderBottom:
                      i < TIMELINE.length - 1 ? "1px solid var(--hair)" : "0",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--mono)",
                      fontSize: 11,
                      letterSpacing: "0.18em",
                      color: "var(--gold)",
                      textTransform: "uppercase",
                      marginBottom: 6,
                    }}
                  >
                    {t.year}
                  </div>
                  <div
                    style={{
                      fontSize: 14,
                      lineHeight: 1.5,
                      color: "var(--ink)",
                    }}
                  >
                    {t.body}
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function ThreePlates() {
  const plates = [
    {
      img: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=1600&auto=format&fit=crop&q=80",
      cap: "Year founded · MMXXIV",
    },
    {
      img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1600&auto=format&fit=crop&q=80",
      cap: "Place founded · Lisbon",
    },
    {
      img: "https://images.unsplash.com/photo-1517842645767-c639042777db?w=1600&auto=format&fit=crop&q=80",
      cap: "Question founded on · what to refuse",
    },
  ];
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  return (
    <section
      ref={ref}
      style={{
        background: "var(--bone)",
        padding: "100px 0",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(40px)",
        transition:
          "opacity 1.2s cubic-bezier(0.2, 0.8, 0.2, 1), transform 1.2s cubic-bezier(0.2, 0.8, 0.2, 1)",
      }}
    >
      <div style={inner}>
        <EyebrowLabel color="var(--gold)">Three plates</EyebrowLabel>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 20,
            alignItems: "flex-start",
            marginTop: 28,
          }}
        >
          {plates.map((p, i) => (
            <figure
              key={i}
              style={{
                margin: 0,
                marginTop: i === 1 ? 48 : 0,
              }}
            >
              <ImageScroll
                src={p.img}
                height={i === 1 ? 580 : 480}
                style={{ borderRadius: 6 }}
                filter="grayscale(0.5) saturate(0.85)"
                max={1.16}
              />
              <figcaption
                style={{
                  marginTop: 14,
                  paddingTop: 12,
                  borderTop: "1px solid var(--hair)",
                  display: "flex",
                  justifyContent: "space-between",
                  fontFamily: "var(--mono)",
                  fontSize: 10.5,
                  letterSpacing: "0.18em",
                  color: "var(--mute)",
                  textTransform: "uppercase",
                }}
              >
                <span style={{ color: "var(--gold)" }}>
                  Plate · 0{i + 1}
                </span>
                <span>{p.cap}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function NotList() {
  return (
    <section style={{ background: "var(--carbon)", padding: "140px 0" }}>
      <div style={inner}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.4fr",
            gap: 80,
            alignItems: "flex-start",
          }}
        >
          <div>
            <EyebrowLabel color="var(--gold)">
              What we are not
            </EyebrowLabel>
            <h3
              className="h-display"
              style={{
                margin: "16px 0 0",
                fontSize: "clamp(40px, 4.6vw, 72px)",
                lineHeight: 1,
                letterSpacing: "-0.02em",
              }}
            >
              A short
              <br />
              <span className="h-italic" style={{ color: "var(--gold)" }}>
                refusal.
              </span>
            </h3>
          </div>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              borderTop: "1px solid var(--hair)",
            }}
          >
            {NOT.map((n, i) => (
              <li
                key={i}
                style={{
                  display: "grid",
                  gridTemplateColumns: "60px 1fr",
                  padding: "24px 0",
                  borderBottom: "1px solid var(--hair)",
                  alignItems: "baseline",
                  gap: 24,
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
                  No. {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className="h-display"
                  style={{
                    fontSize: 28,
                    lineHeight: 1.2,
                    letterSpacing: "-0.012em",
                    color: "var(--ink)",
                  }}
                >
                  {n}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function AboutCTA() {
  return (
    <section style={{ background: "var(--linen)", padding: "120px 0" }}>
      <div
        style={{
          ...inner,
          textAlign: "center",
        }}
      >
        <EyebrowLabel color="var(--gold)">
          On the way out
        </EyebrowLabel>
        <h3
          className="h-display"
          style={{
            margin: "20px auto 24px",
            fontSize: "clamp(48px, 6vw, 96px)",
            letterSpacing: "-0.025em",
            lineHeight: 0.98,
            maxWidth: 1080,
          }}
        >
          Write the brief.
          <br />
          <span className="h-italic">We will do the rest.</span>
        </h3>
        <PillButton size="lg" as="a" href="/trip-request">
          Begin a brief <ArrowRight />
        </PillButton>
        <div
          style={{
            marginTop: 18,
            fontFamily: "var(--mono)",
            fontSize: 11,
            letterSpacing: "0.18em",
            color: "var(--mute)",
            textTransform: "uppercase",
          }}
        >
          Free to plan · No commitment until you book
        </div>
      </div>
    </section>
  );
}

export default function AboutScreen() {
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
      <AboutHero />
      <FoundersLetter />
      <ThreePlates />
      <NotList />
      <AboutCTA />
      <SiteFooter />
    </div>
  );
}
