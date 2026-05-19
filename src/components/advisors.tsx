"use client";

import { CSSProperties, useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, EyebrowLabel, PillButton } from "./brand";
import { ScrollWords, useInView } from "./effects";
import { SiteFooter, SiteNav, siteInner } from "./site-chrome";

const inner: CSSProperties = siteInner;

type Specialism =
  | "Latin America"
  | "Mediterranean"
  | "Asia & Pacific"
  | "Private Islands"
  | "Rail"
  | "Sailing"
  | "Pilgrimage";

type Advisor = {
  no: string;
  name: string;
  city: string;
  region: string;
  years: number;
  languages: string[];
  specialisms: Specialism[];
  portrait: string;
  obsession: { place: string; body: string; dated: string };
  q: { q: string; a: string }[];
};

const ADVISORS: Advisor[] = [
  {
    no: "01",
    name: "Sofía Marín",
    city: "Mexico City",
    region: "Mexico · Yucatán · Pacific Mexico",
    years: 14,
    languages: ["Spanish", "English", "Portuguese"],
    specialisms: ["Latin America", "Private Islands"],
    portrait:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=1200&auto=format&fit=crop&q=80",
    obsession: {
      place: "Holbox in November",
      body: "The island has eight weeks a year that feel like nobody else has arrived yet. November is the second of them. We are sending three clients there before Christmas.",
      dated: "Filed · 4 February 2026",
    },
    q: [
      {
        q: "A room you return to.",
        a: "Tent fourteen at Habitas. The corner one — the staff know.",
      },
      {
        q: "A meal worth the flight.",
        a: "Kin Toh, Tulum, eight courses, before the bar opens.",
      },
      {
        q: "What you refuse to book.",
        a: "Spring break weeks. All-inclusives. The strip after 6pm.",
      },
    ],
  },
  {
    no: "02",
    name: "Daniel Okafor",
    city: "New York",
    region: "Mediterranean · Caribbean · USA",
    years: 11,
    languages: ["English", "French", "Italian"],
    specialisms: ["Mediterranean", "Sailing", "Private Islands"],
    portrait:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&auto=format&fit=crop&q=80",
    obsession: {
      place: "The north of Ibiza in late September",
      body: "Three villas above San Joan, no clubs after midnight, the sea still seventy-six degrees. The exact opposite of August.",
      dated: "Filed · 18 January 2026",
    },
    q: [
      {
        q: "A room you return to.",
        a: "Five Hotel, Athens, the corner room on the roof.",
      },
      {
        q: "A meal worth the flight.",
        a: "Lo Scoglio on the Amalfi coast, Sunday lunch.",
      },
      {
        q: "What you refuse to book.",
        a: "Anything in Mykonos after the 14th of August.",
      },
    ],
  },
  {
    no: "03",
    name: "Priya Ramesh",
    city: "London",
    region: "South Asia · East Africa · Southern Europe",
    years: 18,
    languages: ["English", "Tamil", "Hindi", "French"],
    specialisms: ["Asia & Pacific", "Pilgrimage", "Rail"],
    portrait:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=1200&auto=format&fit=crop&q=80",
    obsession: {
      place: "The Konkan railway, monsoon week",
      body: "Eleven hours from Mumbai to Mangaluru in the second week of June, when the coast is impossible by road. Three couples this year. One on the way back.",
      dated: "Filed · 11 March 2026",
    },
    q: [
      {
        q: "A room you return to.",
        a: "Wildflower Hall, Shimla, room 308.",
      },
      {
        q: "A meal worth the flight.",
        a: "Lunch in Goa with two specific families. I won't name them.",
      },
      {
        q: "What you refuse to book.",
        a: "The Maldives between November and February.",
      },
    ],
  },
  {
    no: "04",
    name: "Yuki Tanaka",
    city: "Kyoto",
    region: "Japan · Korea · Eastern China",
    years: 9,
    languages: ["Japanese", "English", "Mandarin"],
    specialisms: ["Asia & Pacific", "Pilgrimage", "Rail"],
    portrait:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1200&auto=format&fit=crop&q=80",
    obsession: {
      place: "The seventy-one-temple pilgrimage on Shikoku",
      body: "Twelve days walking, three nights driven between. Four briefs this year, three of them solo travelers — which is how it should be done.",
      dated: "Filed · 24 January 2026",
    },
    q: [
      {
        q: "A room you return to.",
        a: "Tawaraya, Kyoto. Always the same room. Always the same season.",
      },
      {
        q: "A meal worth the flight.",
        a: "Sushi Saito, Roppongi, the 11am sitting.",
      },
      {
        q: "What you refuse to book.",
        a: "Tokyo during Golden Week. Anywhere in Japan, really.",
      },
    ],
  },
  {
    no: "05",
    name: "Halldór Magnússon",
    city: "Reykjavík",
    region: "Iceland · Faroes · Norwegian Coast",
    years: 13,
    languages: ["Icelandic", "Danish", "English", "Norwegian"],
    specialisms: ["Sailing", "Private Islands"],
    portrait:
      "https://images.unsplash.com/photo-1463453091185-61582044d556?w=1200&auto=format&fit=crop&q=80",
    obsession: {
      place: "The Westfjords in June",
      body: "Four hours of darkness a day, no other guests in the village, a fisherman who'll take you out on Wednesday mornings.",
      dated: "Filed · 2 February 2026",
    },
    q: [
      {
        q: "A room you return to.",
        a: "Deplar Farm — the small lodge, not the main house.",
      },
      {
        q: "A meal worth the flight.",
        a: "Dinner at a friend's kitchen table in Ísafjörður.",
      },
      {
        q: "What you refuse to book.",
        a: "The Blue Lagoon. Sorry.",
      },
    ],
  },
  {
    no: "06",
    name: "Aïcha Benali",
    city: "Marrakech",
    region: "Morocco · Algeria · Atlantic Africa",
    years: 16,
    languages: ["Arabic", "French", "English", "Spanish"],
    specialisms: ["Pilgrimage", "Mediterranean"],
    portrait:
      "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?w=1200&auto=format&fit=crop&q=80",
    obsession: {
      place: "The Atlas range, two nights, off-grid",
      body: "Two nights in a stone house above Imlil, no signal, a guide who used to walk Saharan caravans. Best Tuesday-to-Thursday in March.",
      dated: "Filed · 8 March 2026",
    },
    q: [
      {
        q: "A room you return to.",
        a: "The blue suite at Riad Joya, in the medina.",
      },
      {
        q: "A meal worth the flight.",
        a: "A tagine in someone's courtyard. I'll arrange it.",
      },
      {
        q: "What you refuse to book.",
        a: "Anything that touches Jemaa el-Fnaa after sunset.",
      },
    ],
  },
];

const SPECIALISMS: { id: Specialism | "All"; label: string }[] = [
  { id: "All", label: "All practices" },
  { id: "Latin America", label: "Latin America" },
  { id: "Mediterranean", label: "Mediterranean" },
  { id: "Asia & Pacific", label: "Asia & Pacific" },
  { id: "Private Islands", label: "Private Islands" },
  { id: "Rail", label: "Rail" },
  { id: "Sailing", label: "Sailing" },
  { id: "Pilgrimage", label: "Pilgrimage" },
];

function AdvisorsHero() {
  const bgRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let raf: number | null = null;
    const tick = () => {
      raf = null;
      const y = window.scrollY;
      if (bgRef.current) {
        bgRef.current.style.transform = `translate3d(0, ${y * 0.28}px, 0)`;
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
      }}
    >
      <div
        ref={bgRef}
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(900px 600px at 75% 30%, rgba(201,168,106,0.14), transparent 60%)",
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
            The Register · Six in public, forty-two in private
          </span>
        </div>
        <h1
          className="h-display"
          style={{
            margin: 0,
            fontSize: "clamp(72px, 8.6vw, 168px)",
            letterSpacing: "-0.038em",
            lineHeight: 0.94,
            maxWidth: 1180,
          }}
        >
          The people who
          <br />
          <span className="h-italic" style={{ color: "var(--gold)" }}>
            design the trips.
          </span>
        </h1>
        <div
          style={{
            marginTop: 40,
            display: "grid",
            gridTemplateColumns: "1.2fr 1fr",
            gap: 64,
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: 17.5,
              lineHeight: 1.55,
              color: "rgba(242,235,221,0.78)",
              maxWidth: 720,
            }}
          >
            <ScrollWords
              text="Each advisor is interviewed twice, references three deep, and admitted on a one-year probation. They are paid against the brief, never on commission. Forty-two work with us in total — six are listed here. The rest reach you by referral."
              baseColor="rgba(242,235,221,0.22)"
              activeColor="var(--ink)"
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
              lineHeight: 1.9,
              borderLeft: "1px solid var(--hair)",
              paddingLeft: 24,
            }}
          >
            <div>2025 admit rate · 3 of 87</div>
            <div>Average tenure · 12.4 years in trade</div>
            <div>Average client NPS · 9.4</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AdvisorsIndex() {
  const [active, setActive] = useState<Specialism | "All">("All");
  const items =
    active === "All"
      ? ADVISORS
      : ADVISORS.filter((a) => a.specialisms.includes(active));
  return (
    <section style={{ background: "var(--linen)", padding: "100px 0 64px" }}>
      <div style={inner}>
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBottom: 36,
            gap: 24,
            flexWrap: "wrap",
          }}
        >
          <EyebrowLabel color="var(--gold)">
            By practice · The roster, in plain order
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
            {items.length} of {ADVISORS.length}
          </span>
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 8,
            marginBottom: 40,
          }}
        >
          {SPECIALISMS.map((s) => {
            const on = active === s.id;
            return (
              <button
                key={s.id}
                onClick={() => setActive(s.id)}
                style={{
                  all: "unset",
                  cursor: "pointer",
                  padding: "10px 16px",
                  borderRadius: 999,
                  background: on ? "var(--ink)" : "transparent",
                  color: on ? "var(--linen)" : "var(--ink)",
                  border: "1px solid " + (on ? "var(--ink)" : "var(--hair)"),
                  fontSize: 13,
                  letterSpacing: "0.01em",
                }}
              >
                {s.label}
              </button>
            );
          })}
        </div>
        <div
          style={{
            borderTop: "1px solid var(--hair)",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "60px 1.4fr 1.6fr 0.6fr 1.2fr 28px",
              padding: "14px 4px",
              borderBottom: "1px solid var(--hair)",
              fontFamily: "var(--mono)",
              fontSize: 10,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--mute)",
            }}
          >
            <span>No.</span>
            <span>Name &amp; city</span>
            <span>Region</span>
            <span>Years</span>
            <span>Languages</span>
            <span></span>
          </div>
          {items.map((a) => (
            <a
              key={a.no}
              href={`#advisor-${a.no}`}
              style={{
                display: "grid",
                gridTemplateColumns:
                  "60px 1.4fr 1.6fr 0.6fr 1.2fr 28px",
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
                  fontSize: 11,
                  letterSpacing: "0.18em",
                  color: "var(--gold)",
                }}
              >
                {a.no}
              </span>
              <span>
                <span
                  className="h-display"
                  style={{
                    display: "block",
                    fontSize: 26,
                    letterSpacing: "-0.012em",
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
                  {a.city}
                </span>
              </span>
              <span style={{ fontSize: 14, color: "var(--ink)" }}>
                {a.region}
              </span>
              <span
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 13,
                  color: "var(--ink)",
                }}
              >
                {a.years}
              </span>
              <span
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 12,
                  color: "var(--mute)",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                }}
              >
                {a.languages.join(" · ")}
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

function AdvisorProfile({ a, idx }: { a: Advisor; idx: number }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref);
  const flip = idx % 2 === 1;
  return (
    <section
      id={`advisor-${a.no}`}
      ref={ref}
      style={{
        background: idx % 2 === 0 ? "var(--bone)" : "var(--linen)",
        padding: "120px 0",
        scrollMarginTop: 100,
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
            gap: 64,
            alignItems: "flex-start",
            direction: flip ? "rtl" : "ltr",
          }}
        >
          <div
            style={{
              direction: "ltr",
              position: "relative",
              height: 620,
              borderRadius: 4,
              overflow: "hidden",
              background: "var(--carbon)",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage: `url(${a.portrait})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                filter:
                  "grayscale(0.7) contrast(1.05) brightness(0.92) saturate(0.85)",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(180deg, rgba(10,11,15,0.0) 50%, rgba(10,11,15,0.6) 100%)",
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
                fontFamily: "var(--mono)",
                fontSize: 10,
                letterSpacing: "0.18em",
                color: "rgba(242,235,221,0.85)",
                textTransform: "uppercase",
              }}
            >
              <span style={{ color: "var(--gold)" }}>Plate · {a.no}</span>
              <span>Portrait — {a.name}</span>
            </div>
          </div>

          <div style={{ direction: "ltr", paddingTop: 4 }}>
            <div
              style={{
                fontFamily: "var(--mono)",
                fontSize: 11,
                letterSpacing: "0.2em",
                color: "var(--gold)",
                textTransform: "uppercase",
                marginBottom: 14,
              }}
            >
              No. {a.no} · {a.city}
            </div>
            <h3
              className="h-display"
              style={{
                margin: 0,
                fontSize: "clamp(48px, 5.4vw, 80px)",
                lineHeight: 0.96,
                letterSpacing: "-0.025em",
              }}
            >
              {a.name}
              <span style={{ color: "var(--gold)" }}>.</span>
            </h3>
            <div
              style={{
                marginTop: 12,
                fontFamily: "var(--display)",
                fontStyle: "italic",
                fontSize: 20,
                color: "var(--mute)",
                lineHeight: 1.4,
              }}
            >
              {a.region}
            </div>

            <div
              style={{
                marginTop: 28,
                display: "flex",
                gap: 8,
                flexWrap: "wrap",
              }}
            >
              {a.specialisms.map((s) => (
                <span
                  key={s}
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: 10.5,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    padding: "6px 12px",
                    borderRadius: 999,
                    border: "1px solid var(--hair)",
                    color: "var(--mute)",
                  }}
                >
                  {s}
                </span>
              ))}
            </div>

            <div
              style={{
                marginTop: 36,
                borderTop: "1px solid var(--hair)",
              }}
            >
              {a.q.map((qa, i) => (
                <div
                  key={i}
                  style={{
                    padding: "22px 0",
                    borderBottom: "1px solid var(--hair)",
                    display: "grid",
                    gridTemplateColumns: "minmax(220px, 1.2fr) 1.6fr",
                    gap: 28,
                    alignItems: "baseline",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--display)",
                      fontStyle: "italic",
                      fontSize: 22,
                      color: "var(--mute)",
                      lineHeight: 1.3,
                    }}
                  >
                    {qa.q}
                  </span>
                  <span
                    style={{
                      fontSize: 16.5,
                      color: "var(--ink)",
                      lineHeight: 1.55,
                    }}
                  >
                    {qa.a}
                  </span>
                </div>
              ))}
            </div>

            <div
              style={{
                marginTop: 32,
                padding: "20px 22px",
                borderRadius: 6,
                background: "var(--carbon)",
                color: "var(--ink)",
                display: "flex",
                gap: 18,
                alignItems: "flex-start",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 10.5,
                  letterSpacing: "0.18em",
                  color: "var(--gold)",
                  textTransform: "uppercase",
                  flexShrink: 0,
                  paddingTop: 4,
                }}
              >
                Current obsession
              </span>
              <div>
                <div
                  style={{
                    fontFamily: "var(--display)",
                    fontSize: 22,
                    fontStyle: "italic",
                    lineHeight: 1.3,
                  }}
                >
                  {a.obsession.place}.
                </div>
                <p
                  style={{
                    margin: "8px 0 10px",
                    fontSize: 14.5,
                    lineHeight: 1.55,
                    color: "rgba(242,235,221,0.78)",
                  }}
                >
                  {a.obsession.body}
                </p>
                <div
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: 10,
                    letterSpacing: "0.18em",
                    color: "var(--mute)",
                    textTransform: "uppercase",
                  }}
                >
                  {a.obsession.dated}
                </div>
              </div>
            </div>

            <div
              style={{
                marginTop: 24,
                display: "flex",
                gap: 10,
              }}
            >
              <PillButton size="md" as="a" href="/trip-request">
                Brief {a.name.split(" ")[0]} <ArrowRight />
              </PillButton>
              <PillButton size="md" variant="ghost" as="a" href="/atelier">
                How we work
              </PillButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AdvisorsFooterNote() {
  return (
    <section style={{ background: "var(--carbon)", padding: "100px 0" }}>
      <div style={inner}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 64,
            alignItems: "center",
          }}
        >
          <div>
            <EyebrowLabel color="var(--gold)">
              The forty-two not listed
            </EyebrowLabel>
            <h3
              className="h-display"
              style={{
                margin: "16px 0 20px",
                fontSize: "clamp(40px, 4.4vw, 64px)",
                letterSpacing: "-0.02em",
                lineHeight: 1,
              }}
            >
              On <span className="h-italic">referral</span>, and on request.
            </h3>
            <p
              style={{
                margin: 0,
                fontSize: 17,
                lineHeight: 1.6,
                color: "rgba(242,235,221,0.78)",
                maxWidth: 520,
              }}
            >
              The rest of the register is matched to a brief, not advertised
              to a name. If you would like to work with an advisor we have
              not listed publicly, write a brief and tell us so.
            </p>
          </div>
          <div
            style={{
              fontFamily: "var(--mono)",
              fontSize: 11,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--mute)",
              lineHeight: 2.2,
              borderLeft: "1px solid var(--hair)",
              paddingLeft: 32,
            }}
          >
            <div>Patagonia · 4 advisors</div>
            <div>Kenya &amp; East Africa · 3 advisors</div>
            <div>Antarctic Peninsula · 1 advisor</div>
            <div>Trans-Siberian · 1 advisor</div>
            <div style={{ color: "var(--gold)" }}>+ thirty-three more</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function AdvisorsScreen() {
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
      <AdvisorsHero />
      <AdvisorsIndex />
      {ADVISORS.map((a, i) => (
        <AdvisorProfile key={a.no} a={a} idx={i} />
      ))}
      <AdvisorsFooterNote />
      <SiteFooter />
    </div>
  );
}
