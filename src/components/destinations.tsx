"use client";

import { CSSProperties, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, EyebrowLabel, PillButton } from "./brand";
import { ImageScroll, ScrollWords, useInView } from "./effects";
import { SiteFooter, SiteNav, siteInner } from "./site-chrome";
import { DESTINATIONS } from "@/lib/data";

const inner: CSSProperties = siteInner;

type Atlas = {
  id: string;
  no: string;
  name: string;
  country: string;
  region: "Mediterranean" | "Pacific" | "Americas";
  lat: string;
  light: string;
  water: string;
  best: string;
  avoid: string;
  img: string;
  note: string;
};

const ATLAS: Atlas[] = [
  {
    id: "amalfi",
    no: "01",
    name: "Amalfi",
    country: "Italy",
    region: "Mediterranean",
    lat: "40.6°N",
    light: "Mediterranean blue · soft midday",
    water: "23°C in June",
    best: "May 14 — June 28",
    avoid: "Aug 5 — Aug 28",
    img: "https://images.unsplash.com/photo-1633321702518-7feccafb94d5?w=2000&auto=format&fit=crop&q=80",
    note: "Slow lunch country. We send couples and writers — never groups of eight.",
  },
  {
    id: "lisbon",
    no: "02",
    name: "Lisbon",
    country: "Portugal",
    region: "Mediterranean",
    lat: "38.7°N",
    light: "Cool gold · sea-thinned",
    water: "18°C in June",
    best: "Mar 1 — May 30",
    avoid: "Tourist weekends, all year",
    img: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=2000&auto=format&fit=crop&q=80",
    note: "A city for the first or fourteenth visit. Skip the trams.",
  },
  {
    id: "ibiza",
    no: "03",
    name: "Ibiza",
    country: "Spain",
    region: "Mediterranean",
    lat: "38.9°N",
    light: "Bleached noon · long pink dusk",
    water: "25°C in July",
    best: "Sept 1 — Oct 14",
    avoid: "Aug, except in a villa",
    img: "https://images.unsplash.com/photo-1559628233-eb1bdacba7a1?w=2000&auto=format&fit=crop&q=80",
    note: "The north end, only. We never book Playa d'en Bossa.",
  },
  {
    id: "bali",
    no: "04",
    name: "Bali",
    country: "Indonesia",
    region: "Pacific",
    lat: "8.4°S",
    light: "Equatorial · soft after the rain",
    water: "28°C year-round",
    best: "Apr 15 — Jun 30",
    avoid: "Jan, Feb (wet)",
    img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=2000&auto=format&fit=crop&q=80",
    note: "We work in the highlands now. The south coast is over.",
  },
  {
    id: "tokyo",
    no: "05",
    name: "Tokyo",
    country: "Japan",
    region: "Pacific",
    lat: "35.7°N",
    light: "Sharp winter · diffuse summer",
    water: "—",
    best: "Mar 25 — Apr 7 (sakura)",
    avoid: "Golden Week",
    img: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=2000&auto=format&fit=crop&q=80",
    note: "Eight days is the minimum. Two for the city, six for the rest of the country.",
  },
  {
    id: "cabo",
    no: "06",
    name: "Cabo",
    country: "Mexico",
    region: "Pacific",
    lat: "22.9°N",
    light: "Hard Pacific · short twilight",
    water: "24°C in April",
    best: "Nov 15 — Apr 1",
    avoid: "Spring break weeks",
    img: "https://images.unsplash.com/photo-1597211833712-5e41faa202ea?w=2000&auto=format&fit=crop&q=80",
    note: "Esperanza on the corridor. Or a private house, only.",
  },
  {
    id: "tulum",
    no: "07",
    name: "Tulum",
    country: "Mexico",
    region: "Americas",
    lat: "20.2°N",
    light: "Yucatán soft · jungle-filtered",
    water: "26°C in March",
    best: "Jan 15 — Apr 10",
    avoid: "The strip, always",
    img: "https://images.unsplash.com/photo-1510097467424-192d713fd8b2?w=2000&auto=format&fit=crop&q=80",
    note: "Stay north of the strip, or inland. The cenotes are the point.",
  },
  {
    id: "miami",
    no: "08",
    name: "Miami",
    country: "USA",
    region: "Americas",
    lat: "25.8°N",
    light: "Theatrical · saturated dusk",
    water: "24°C in March",
    best: "Dec — Apr",
    avoid: "Art Basel week, unless invited",
    img: "https://images.unsplash.com/photo-1535498730771-e735b998cd64?w=2000&auto=format&fit=crop&q=80",
    note: "A short trip — three nights, four at most. Then leave.",
  },
];

const REGIONS: {
  id: Atlas["region"];
  title: string;
  italic: string;
  body: string;
}[] = [
  {
    id: "Mediterranean",
    title: "The Mediterranean Triangle",
    italic: "Triangle",
    body: "Three coasts that share one rhythm — late lunches, three-hour dinners, the sea taken seriously. We send most of our first-time clients here in May and again in late September.",
  },
  {
    id: "Pacific",
    title: "The Pacific Crescent",
    italic: "Crescent",
    body: "From Bali to Baja, a different patience: thinner crowds, weather that asks for attention, food that takes care of the rest. The Pacific is a place for second visits.",
  },
  {
    id: "Americas",
    title: "The Americas, briefly",
    italic: "briefly",
    body: "We list two. Tulum is for couples who want jungle and cenote, not the strip. Miami is for three nights, never more. The rest of this continent we book privately, by referral.",
  },
];

function DestinationsHero() {
  const bgRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let raf: number | null = null;
    const tick = () => {
      raf = null;
      const y = window.scrollY;
      if (bgRef.current) {
        bgRef.current.style.transform = `translate3d(0, ${y * 0.32}px, 0) scale(${1 + Math.min(0.08, y * 0.00018)})`;
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
        height: "92vh",
        minHeight: 720,
        overflow: "hidden",
        background: "var(--carbon)",
      }}
    >
      <div
        ref={bgRef}
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "url(https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=2400&auto=format&fit=crop&q=80)",
          backgroundSize: "cover",
          backgroundPosition: "center 40%",
          filter: "saturate(0.86) contrast(1.04) brightness(0.78)",
          willChange: "transform",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(10,11,15,0.6) 0%, rgba(10,11,15,0.1) 28%, rgba(10,11,15,0.0) 56%, rgba(10,11,15,0.94) 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 132,
          left: 48,
          right: 48,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          zIndex: 2,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ width: 30, height: 1, background: "var(--gold)" }} />
          <span
            style={{
              fontFamily: "var(--mono)",
              fontSize: 11,
              letterSpacing: "0.26em",
              color: "var(--gold)",
              textTransform: "uppercase",
              fontWeight: 500,
            }}
          >
            The Atlas · Edition 04
          </span>
        </div>
        <span
          style={{
            fontFamily: "var(--mono)",
            fontSize: 10.5,
            letterSpacing: "0.22em",
            color: "rgba(242,235,221,0.55)",
            textTransform: "uppercase",
          }}
        >
          Eight places · 220 in the private register
        </span>
      </div>

      <div
        style={{
          position: "absolute",
          left: 48,
          right: 48,
          bottom: 96,
          zIndex: 2,
          color: "var(--ink)",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          gap: 48,
        }}
      >
        <h1
          className="h-display"
          style={{
            margin: 0,
            fontSize: "clamp(72px, 9vw, 168px)",
            letterSpacing: "-0.038em",
            lineHeight: 0.92,
            maxWidth: 1080,
          }}
        >
          The places we
          <br />
          <span className="h-italic" style={{ color: "var(--gold)" }}>
            return to.
          </span>
        </h1>
        <div
          style={{
            maxWidth: 360,
            paddingBottom: 12,
            color: "rgba(242,235,221,0.78)",
            fontSize: 16,
            lineHeight: 1.5,
          }}
        >
          Eight destinations — the public list. Another two hundred and twenty
          we book by referral. A ledger updated four times a year, never on
          algorithm.
        </div>
      </div>
    </section>
  );
}

function AtlasIndex() {
  const [hover, setHover] = useState<string | null>(null);
  const active = ATLAS.find((a) => a.id === hover) || ATLAS[0];
  return (
    <section style={{ background: "var(--linen)", padding: "140px 0 120px" }}>
      <div style={inner}>
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: 32,
            marginBottom: 64,
          }}
        >
          <div>
            <EyebrowLabel color="var(--gold)">
              The Index · 01 — 08
            </EyebrowLabel>
            <h2
              className="h-display"
              style={{
                fontSize: "clamp(48px, 6vw, 84px)",
                margin: "20px 0 0",
                maxWidth: 920,
                letterSpacing: "-0.02em",
              }}
            >
              Hover a name. The place answers.
            </h2>
          </div>
          <span
            style={{
              fontFamily: "var(--mono)",
              fontSize: 10.5,
              letterSpacing: "0.2em",
              color: "var(--mute)",
              textTransform: "uppercase",
            }}
          >
            By latitude, north to south
          </span>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.05fr 1fr",
            gap: 56,
            alignItems: "flex-start",
          }}
        >
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              borderTop: "1px solid var(--hair)",
            }}
          >
            {ATLAS.map((a) => {
              const on = active.id === a.id;
              return (
                <li
                  key={a.id}
                  onMouseEnter={() => setHover(a.id)}
                  style={{
                    borderBottom: "1px solid var(--hair)",
                  }}
                >
                  <Link
                    href={`/trip-request`}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "64px 1fr 130px 28px",
                      alignItems: "baseline",
                      padding: "26px 4px",
                      textDecoration: "none",
                      color: on ? "var(--ink)" : "var(--mute)",
                      transition: "color 0.3s ease",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--mono)",
                        fontSize: 11,
                        letterSpacing: "0.18em",
                        color: on ? "var(--gold)" : "var(--mute)",
                      }}
                    >
                      No. {a.no}
                    </span>
                    <span
                      className="h-display"
                      style={{
                        fontSize: 48,
                        lineHeight: 1,
                        letterSpacing: "-0.02em",
                        fontStyle: on ? "italic" : "normal",
                        color: on ? "var(--ink)" : undefined,
                      }}
                    >
                      {a.name}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--mono)",
                        fontSize: 11,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                      }}
                    >
                      {a.country}
                    </span>
                    <ArrowUpRight size={14} />
                  </Link>
                </li>
              );
            })}
          </ul>
          <div
            style={{
              position: "sticky",
              top: 110,
            }}
          >
            <div
              style={{
                position: "relative",
                height: 540,
                borderRadius: 6,
                overflow: "hidden",
                background: "var(--carbon)",
              }}
            >
              {ATLAS.map((a) => (
                <div
                  key={a.id}
                  style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage: `url(${a.img})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    opacity: a.id === active.id ? 1 : 0,
                    transition: "opacity 0.7s cubic-bezier(0.2, 0.8, 0.2, 1)",
                    filter: "saturate(0.92)",
                  }}
                />
              ))}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(180deg, rgba(10,11,15,0.0) 50%, rgba(10,11,15,0.85) 100%)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  left: 20,
                  right: 20,
                  bottom: 22,
                  color: "var(--ink)",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: 10,
                    letterSpacing: "0.18em",
                    color: "var(--gold)",
                    textTransform: "uppercase",
                  }}
                >
                  {active.region}
                </div>
                <div
                  className="h-display"
                  style={{
                    fontSize: 60,
                    lineHeight: 0.96,
                    letterSpacing: "-0.02em",
                    marginTop: 6,
                  }}
                >
                  {active.name}
                </div>
              </div>
            </div>
            <p
              style={{
                margin: "18px 0 0",
                fontFamily: "var(--display)",
                fontStyle: "italic",
                fontSize: 19,
                lineHeight: 1.4,
                color: "var(--mute)",
                maxWidth: 480,
              }}
            >
              “{active.note}”
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function RegionalCluster({
  region,
  idx,
}: {
  region: (typeof REGIONS)[number];
  idx: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const items = ATLAS.filter((a) => a.region === region.id);
  const layouts = [
    [560, 380, 480],
    [400, 540, 420],
    [500, 460, 380],
  ];
  const heights = layouts[idx % layouts.length];
  return (
    <section
      ref={ref}
      style={{
        background:
          idx % 2 === 0 ? "var(--linen)" : "var(--carbon)",
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
            gridTemplateColumns: "1fr 1.4fr",
            gap: 56,
            alignItems: "flex-start",
            marginBottom: 56,
          }}
        >
          <div>
            <EyebrowLabel color="var(--gold)">
              Cluster · {String(idx + 1).padStart(2, "0")}
            </EyebrowLabel>
            <h3
              className="h-display"
              style={{
                fontSize: "clamp(40px, 4.4vw, 64px)",
                margin: "18px 0 0",
                lineHeight: 1.04,
                letterSpacing: "-0.018em",
              }}
            >
              {region.title.replace(region.italic, "")}
              <span className="h-italic" style={{ color: "var(--gold)" }}>
                {region.italic}
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
              maxWidth: 620,
              paddingTop: 18,
            }}
          >
            <ScrollWords
              text={region.body}
              baseColor="rgba(242,235,221,0.22)"
              activeColor="var(--ink)"
            />
          </p>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${items.length}, 1fr)`,
            gap: 18,
            alignItems: "flex-start",
          }}
        >
          {items.map((a, i) => (
            <Link
              key={a.id}
              href="/trip-request"
              style={{
                textDecoration: "none",
                color: "inherit",
                display: "block",
                marginTop: i % 2 === 1 ? 56 : 0,
              }}
            >
              <ImageScroll
                src={a.img}
                height={heights[i] || 460}
                style={{ borderRadius: 6 }}
                filter="saturate(0.94)"
                max={1.18}
              />
              <div
                style={{
                  marginTop: 14,
                  paddingTop: 12,
                  borderTop: "1px solid var(--hair)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  fontFamily: "var(--mono)",
                  fontSize: 10.5,
                  letterSpacing: "0.16em",
                  color: "var(--mute)",
                  textTransform: "uppercase",
                }}
              >
                <span style={{ color: "var(--gold)" }}>
                  No. {a.no} · {a.name}
                </span>
                <span>{a.country}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function WeatherLedger() {
  return (
    <section style={{ background: "var(--bone)", padding: "120px 0" }}>
      <div style={inner}>
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBottom: 48,
            gap: 32,
          }}
        >
          <div>
            <EyebrowLabel color="var(--gold)">
              The Weather & Season Table
            </EyebrowLabel>
            <h3
              className="h-display"
              style={{
                fontSize: "clamp(40px, 4.4vw, 64px)",
                margin: "18px 0 0",
                lineHeight: 1.04,
                letterSpacing: "-0.018em",
                maxWidth: 720,
              }}
            >
              The light, the water,
              <br />
              <span className="h-italic">and when to refuse</span> a booking.
            </h3>
          </div>
          <span
            style={{
              fontFamily: "var(--mono)",
              fontSize: 10.5,
              letterSpacing: "0.2em",
              color: "var(--mute)",
              textTransform: "uppercase",
            }}
          >
            Updated quarterly · Winter 2026
          </span>
        </div>

        <div
          style={{
            borderTop: "1px solid var(--hair)",
            borderBottom: "1px solid var(--hair)",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "60px 1.2fr 1.6fr 1fr 1.2fr 1.4fr",
              padding: "14px 0",
              borderBottom: "1px solid var(--hair)",
              fontFamily: "var(--mono)",
              fontSize: 10,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--mute)",
            }}
          >
            <span>No.</span>
            <span>Place</span>
            <span>Light</span>
            <span>Water</span>
            <span>Best window</span>
            <span>Avoid</span>
          </div>
          {ATLAS.map((a) => (
            <div
              key={a.id}
              style={{
                display: "grid",
                gridTemplateColumns:
                  "60px 1.2fr 1.6fr 1fr 1.2fr 1.4fr",
                padding: "22px 0",
                borderBottom: "1px solid var(--hair)",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 11,
                  letterSpacing: "0.16em",
                  color: "var(--gold)",
                }}
              >
                {a.no}
              </span>
              <span>
                <span
                  className="h-display"
                  style={{
                    fontSize: 28,
                    letterSpacing: "-0.01em",
                    display: "block",
                    lineHeight: 1,
                  }}
                >
                  {a.name}
                </span>
                <span
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: 10.5,
                    letterSpacing: "0.14em",
                    color: "var(--mute)",
                    textTransform: "uppercase",
                  }}
                >
                  {a.lat}
                </span>
              </span>
              <span style={{ fontSize: 14, color: "var(--ink)" }}>
                {a.light}
              </span>
              <span
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 13,
                  color: "var(--ink)",
                }}
              >
                {a.water}
              </span>
              <span
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 12.5,
                  color: "var(--ink)",
                }}
              >
                {a.best}
              </span>
              <span
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 12.5,
                  color: "var(--mute)",
                }}
              >
                {a.avoid}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function OverlookedFooter() {
  const overlooked =
    DESTINATIONS.find((d) => d.id === "lisbon") || DESTINATIONS[0];
  return (
    <section style={{ background: "var(--carbon)", padding: "140px 0" }}>
      <div style={inner}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.4fr",
            gap: 64,
            alignItems: "center",
          }}
        >
          <div
            style={{
              position: "relative",
              height: 520,
              borderRadius: 6,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage: `url(${overlooked.img}&w=1400)`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                filter: "saturate(0.88)",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(180deg, transparent 50%, rgba(5,6,9,0.7))",
              }}
            />
            <span
              style={{
                position: "absolute",
                top: 22,
                left: 22,
                fontFamily: "var(--mono)",
                fontSize: 10.5,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--gold)",
              }}
            >
              Currently overlooked
            </span>
          </div>
          <div>
            <EyebrowLabel color="var(--gold)">
              Quietly recommended
            </EyebrowLabel>
            <h3
              className="h-display"
              style={{
                fontSize: "clamp(48px, 5.6vw, 88px)",
                margin: "18px 0 24px",
                letterSpacing: "-0.025em",
                lineHeight: 0.98,
              }}
            >
              Go to{" "}
              <span className="h-italic" style={{ color: "var(--gold)" }}>
                {overlooked.name}
              </span>{" "}
              this March.
            </h3>
            <p
              style={{
                margin: 0,
                fontSize: 17,
                lineHeight: 1.55,
                color: "rgba(242,235,221,0.78)",
                maxWidth: 520,
              }}
            >
              Cool light, three-hour lunches, and a hotel scene that has
              quietly outgrown the rest of southern Europe. We've sent
              fourteen briefs here this quarter — none of them said the word
              Lisbon out loud.
            </p>
            <div style={{ marginTop: 32, display: "flex", gap: 12 }}>
              <PillButton size="md" as="a" href="/trip-request">
                Plan {overlooked.name} <ArrowRight />
              </PillButton>
              <PillButton size="md" variant="ghost" as="a" href="/atelier">
                How we choose
              </PillButton>
            </div>
            <div
              style={{
                marginTop: 56,
                paddingTop: 24,
                borderTop: "1px solid var(--hair)",
                display: "flex",
                gap: 36,
                fontFamily: "var(--mono)",
                fontSize: 11,
                letterSpacing: "0.14em",
                color: "var(--mute)",
                textTransform: "uppercase",
              }}
            >
              <span>Light · {ATLAS.find((a) => a.id === "lisbon")?.light}</span>
              <span>Best · {ATLAS.find((a) => a.id === "lisbon")?.best}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function DestinationsScreen() {
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
      <DestinationsHero />
      <AtlasIndex />
      {REGIONS.map((r, i) => (
        <RegionalCluster key={r.id} region={r} idx={i} />
      ))}
      <WeatherLedger />
      <OverlookedFooter />
      <SiteFooter />
    </div>
  );
}
