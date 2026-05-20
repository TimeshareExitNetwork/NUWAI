"use client";

import { CSSProperties, useEffect, useRef } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  EyebrowLabel,
  PillButton,
  Star,
} from "./brand";
import {
  AnimatedCounter,
  CursorSpot,
  ImageScroll,
  Marquee,
  ScrollWords,
  SplitText,
  TiltCard,
  useInView,
} from "./effects";
import { SiteFooter, SiteNav, siteInner } from "./site-chrome";
import { DESTINATIONS, PROPOSALS, Proposal, TESTIMONIALS } from "@/lib/data";

const inner: CSSProperties = siteInner;

function HomeHero() {
  const bgRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);
  const mastRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf: number | null = null;
    const tick = () => {
      raf = null;
      const y = window.scrollY;
      if (bgRef.current) {
        const s = 1 + Math.min(0.1, y * 0.0002);
        bgRef.current.style.transform = `translate3d(0, ${y * 0.34}px, 0) scale(${s})`;
      }
      const fadeMid = Math.max(0, 1 - y / 720);
      const fadeFast = Math.max(0, 1 - y / 520);
      if (headlineRef.current) {
        headlineRef.current.style.transform = `translate3d(0, ${y * -0.14}px, 0)`;
        headlineRef.current.style.opacity = String(fadeMid);
      }
      if (captionRef.current) {
        captionRef.current.style.transform = `translate3d(0, ${y * -0.07}px, 0)`;
        captionRef.current.style.opacity = String(fadeMid);
      }
      if (mastRef.current) {
        mastRef.current.style.transform = `translate3d(0, ${y * -0.22}px, 0)`;
        mastRef.current.style.opacity = String(fadeFast);
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
        height: "100vh",
        minHeight: 780,
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
            "url(https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=2400&auto=format&fit=crop&q=80)",
          backgroundSize: "cover",
          backgroundPosition: "center 45%",
          filter: "saturate(0.92) contrast(1.02) brightness(0.94)",
          willChange: "transform",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(10,11,15,0.55) 0%, rgba(10,11,15,0.0) 22%, rgba(10,11,15,0.0) 50%, rgba(10,11,15,0.95) 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(90deg, rgba(10,11,15,0.0) 50%, rgba(10,11,15,0.42) 100%)",
        }}
      />

      <div
        ref={mastRef}
        style={{
          position: "absolute",
          top: 110,
          left: 48,
          right: 48,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          zIndex: 2,
          willChange: "transform, opacity",
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
            No. 01 — Winter 2026
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
          The Stone-House Issue
        </span>
      </div>

      <CursorSpot color="rgba(201,168,106,0.16)" size={520} />

      <div
        style={{
          position: "absolute",
          left: 48,
          right: 48,
          bottom: 110,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          gap: 56,
          zIndex: 2,
        }}
      >
        <div
          ref={headlineRef}
          style={{
            maxWidth: 920,
            color: "var(--ink)",
            willChange: "transform, opacity",
          }}
        >
          <span
            style={{
              fontFamily: "var(--mono)",
              fontSize: 11,
              letterSpacing: "0.18em",
              color: "rgba(242,235,221,0.82)",
              textTransform: "uppercase",
              display: "inline-flex",
              alignItems: "center",
              gap: 9,
            }}
          >
            <span
              style={{
                width: 5,
                height: 5,
                borderRadius: "50%",
                background: "var(--gold)",
              }}
            />
            A private commission
          </span>
          <h1
            className="h-display"
            style={{
              fontSize: "clamp(76px, 9.4vw, 172px)",
              lineHeight: 0.92,
              letterSpacing: "-0.038em",
              margin: "26px 0 0",
              color: "var(--ink)",
              overflow: "hidden",
              display: "block",
            }}
          >
            <SplitText text="The new way" by="word" stagger={0.08} duration={1.1} />
            <br />
            <SplitText
              text="to travel."
              by="word"
              stagger={0.1}
              duration={1.1}
              accentWord="travel."
              accentColor="var(--gold)"
            />
          </h1>
          <p
            style={{
              margin: "32px 0 0",
              maxWidth: 560,
              fontSize: 17.5,
              lineHeight: 1.55,
              color: "rgba(242,235,221,0.82)",
            }}
          >
            A members-only travel platform. Curated stays, exclusive perks,
            and concierge-level support — without the friction of traditional
            luxury travel.
          </p>
          <div style={{ marginTop: 40, display: "flex", gap: 12 }}>
            <PillButton size="lg" variant="solid" as="a" href="/membership">
              Join NUWAI <ArrowRight />
            </PillButton>
            <PillButton size="lg" variant="ghost" as="a" href="/destinations">
              Explore stays
            </PillButton>
          </div>
        </div>

        <div
          ref={captionRef}
          style={{
            textAlign: "right",
            display: "flex",
            flexDirection: "column",
            gap: 18,
            paddingBottom: 8,
            color: "var(--ink)",
            flexShrink: 0,
            willChange: "transform, opacity",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              justifyContent: "flex-end",
            }}
          >
            <span
              style={{
                width: 20,
                height: 1,
                background: "rgba(242,235,221,0.4)",
              }}
            />
            <span
              style={{
                fontFamily: "var(--mono)",
                fontSize: 9.5,
                letterSpacing: "0.2em",
                color: "rgba(242,235,221,0.55)",
                textTransform: "uppercase",
              }}
            >
              The Property
            </span>
          </div>
          <div>
            <div
              style={{
                fontFamily: "var(--display)",
                fontStyle: "italic",
                fontSize: 26,
                color: "var(--ink)",
                letterSpacing: "-0.01em",
                lineHeight: 1,
              }}
            >
              Casa Tola
            </div>
            <div
              style={{
                fontFamily: "var(--mono)",
                fontSize: 10,
                letterSpacing: "0.18em",
                color: "rgba(242,235,221,0.65)",
                textTransform: "uppercase",
                marginTop: 6,
              }}
            >
              Costa Careyes · México
            </div>
          </div>
          <div
            style={{
              height: 1,
              background: "rgba(242,235,221,0.15)",
              width: 200,
              marginLeft: "auto",
              marginTop: 4,
            }}
          />
          <div>
            <div
              style={{
                fontFamily: "var(--mono)",
                fontSize: 9.5,
                letterSpacing: "0.18em",
                color: "rgba(242,235,221,0.55)",
                textTransform: "uppercase",
                marginBottom: 4,
              }}
            >
              Curated by
            </div>
            <div
              style={{
                fontFamily: "var(--display)",
                fontStyle: "italic",
                fontSize: 18,
                color: "var(--ink)",
              }}
            >
              Sofía Marín
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HomeManifesto() {
  const stats: { n: number; suf?: string; pre?: string; l: string }[] = [
    { n: 240, suf: "+", l: "NUWAI Approved stays" },
    { n: 24, suf: "/7", l: "concierge access" },
    { n: 0, pre: "$", l: "to start browsing" },
  ];
  return (
    <section style={{ background: "var(--linen)", padding: "180px 0 140px" }}>
      <div style={inner}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.55fr 1fr",
            gap: 96,
            alignItems: "flex-start",
          }}
        >
          <div>
            <EyebrowLabel color="var(--gold)">A new way to travel</EyebrowLabel>
            <p
              style={{
                fontFamily: "var(--display)",
                fontSize: "clamp(32px, 3.4vw, 52px)",
                lineHeight: 1.25,
                letterSpacing: "-0.012em",
                margin: "32px 0 0",
                maxWidth: 920,
              }}
            >
              <ScrollWords
                text="NUWAI is a private members club for modern travelers. Join, and unlock a curated catalog of NUWAI Approved stays, member rates you won't find anywhere else, and a concierge who knows your taste better than your group chat."
                baseColor="rgba(242,235,221,0.20)"
                activeColor="var(--ink)"
                accentWord="NUWAI"
              />
            </p>
          </div>
          <div
            style={{
              paddingTop: 12,
              display: "flex",
              flexDirection: "column",
            }}
          >
            {stats.map((s) => (
              <div
                key={s.l}
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: "space-between",
                  padding: "24px 0",
                  borderBottom: "1px solid var(--hair)",
                  gap: 16,
                }}
              >
                <AnimatedCounter
                  value={s.n}
                  prefix={s.pre || ""}
                  suffix={s.suf || ""}
                  duration={1600}
                  style={{
                    fontFamily: "var(--display)",
                    fontSize: 88,
                    lineHeight: 1,
                    color: "var(--gold)",
                    letterSpacing: "-0.02em",
                    display: "inline-block",
                  }}
                />
                <span
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: 11,
                    letterSpacing: "0.16em",
                    color: "var(--mute)",
                    textTransform: "uppercase",
                    textAlign: "right",
                    maxWidth: 160,
                  }}
                >
                  {s.l}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function HomeVignettes() {
  const ref = useRef<HTMLDivElement>(null);
  const r1 = useRef<HTMLElement>(null);
  const r2 = useRef<HTMLElement>(null);
  const r3 = useRef<HTMLElement>(null);
  const plates = [r1, r2, r3];

  useEffect(() => {
    let raf: number | null = null;
    const rates = [0.08, -0.1, 0.12];
    const tick = () => {
      raf = null;
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const vh = window.innerHeight;
      const center = (rect.top + rect.height / 2 - vh / 2) / vh;
      plates.forEach((pr, i) => {
        if (pr.current) {
          pr.current.style.transform = `translate3d(0, ${center * 120 * rates[i]}px, 0)`;
        }
      });
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
  }, [plates]);

  const items = [
    {
      img: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1600&auto=format&fit=crop&q=80",
      cap: "Stone interior, first light",
      mt: 0,
      h: 540,
    },
    {
      img: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1600&auto=format&fit=crop&q=80",
      cap: "The terrace, hour of the white horse",
      mt: 72,
      h: 620,
    },
    {
      img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&auto=format&fit=crop&q=80",
      cap: "Approach to the cove",
      mt: 32,
      h: 560,
    },
  ];

  return (
    <section
      ref={ref}
      style={{ padding: "40px 0 160px", background: "var(--linen)" }}
    >
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
          <div>
            <EyebrowLabel color="var(--gold)">
              Plates · from the trip
            </EyebrowLabel>
            <h3
              className="h-display"
              style={{
                margin: "18px 0 0",
                fontSize: 56,
                letterSpacing: "-0.015em",
                maxWidth: 640,
              }}
            >
              The world they <span className="h-italic">build</span> for you.
            </h3>
          </div>
          <span
            style={{
              fontFamily: "var(--mono)",
              fontSize: 10.5,
              letterSpacing: "0.2em",
              color: "var(--mute)",
              textTransform: "uppercase",
              flexShrink: 0,
            }}
          >
            01 — 03
          </span>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 20,
            alignItems: "flex-start",
          }}
        >
          {items.map((v, i) => (
            <figure
              key={i}
              style={{ margin: 0, marginTop: v.mt, willChange: "transform" }}
              ref={plates[i]}
            >
              <ImageScroll
                src={v.img}
                height={v.h}
                style={{ borderRadius: 6 }}
                filter="saturate(0.94)"
                max={1.22}
              />
              <figcaption
                style={{
                  marginTop: 16,
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
                  Plate · 0{i + 1}
                </span>
                <span style={{ textAlign: "right" }}>{v.cap}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function HomeBylines() {
  const items = [
    "CONDÉ NAST TRAVELER",
    "MONOCLE",
    "BLOOMBERG",
    "CN PURSUITS",
    "AFAR",
    "THE NEW YORK TIMES",
    "WALLPAPER*",
    "TRAVEL + LEISURE",
    "KINFOLK",
  ];
  return (
    <section
      style={{
        borderTop: "1px solid var(--hair)",
        borderBottom: "1px solid var(--hair)",
        padding: "32px 0",
        background: "var(--carbon)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 36 }}>
        <span
          style={{
            fontFamily: "var(--mono)",
            fontSize: 11,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--mute)",
            flexShrink: 0,
            paddingLeft: 48,
            paddingRight: 24,
            borderRight: "1px solid var(--hair)",
          }}
        >
          Press
        </span>
        <Marquee speed={50} gap={64}>
          {items.map((l, i) => (
            <span
              key={i}
              style={{
                fontFamily: "var(--display)",
                fontStyle: "italic",
                fontSize: 22,
                color: "var(--ink)",
                opacity: 0.55,
                letterSpacing: "0.01em",
              }}
            >
              {l}
              <span
                style={{
                  marginLeft: 64,
                  color: "var(--gold)",
                  opacity: 0.5,
                  fontStyle: "normal",
                }}
              >
                ★
              </span>
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}

function HowStep({
  s,
  idx,
}: {
  s: { n: string; t: string; b: string };
  idx: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  return (
    <div
      ref={ref}
      style={{
        background: "var(--bone)",
        padding: "52px 36px 56px",
        minHeight: 380,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(48px)",
        transition: `opacity 1.4s cubic-bezier(0.2, 0.8, 0.2, 1) ${idx * 0.18}s, transform 1.4s cubic-bezier(0.2, 0.8, 0.2, 1) ${idx * 0.18}s`,
      }}
    >
      <div
        style={{
          fontFamily: "var(--mono)",
          fontSize: 11,
          letterSpacing: "0.14em",
          color: "var(--gold)",
        }}
      >
        {s.n}
      </div>
      <div>
        <h3
          style={{
            fontFamily: "var(--display)",
            fontSize: 44,
            margin: "0 0 16px",
            lineHeight: 1,
            letterSpacing: "-0.015em",
            fontWeight: 400,
          }}
        >
          {s.t}
        </h3>
        <p
          style={{
            margin: 0,
            fontSize: 15.5,
            lineHeight: 1.5,
            color: "var(--mute)",
            maxWidth: 320,
          }}
        >
          {s.b}
        </p>
      </div>
    </div>
  );
}

function HomeHow() {
  const steps = [
    {
      n: "01",
      t: "Join NUWAI",
      b: "Three-minute onboarding. Tell us your destinations, vibe, and how you like to travel.",
    },
    {
      n: "02",
      t: "Unlock the catalog",
      b: "A curated collection of NUWAI Approved stays — member rates, perks, and quiet upgrades.",
    },
    {
      n: "03",
      t: "Concierge does the rest",
      b: "Refine, book, and travel. Your concierge handles upgrades, reservations, and edge cases.",
    },
  ];
  return (
    <section style={{ ...inner, padding: "120px 48px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          marginBottom: 60,
        }}
      >
        <div>
          <EyebrowLabel>How it works</EyebrowLabel>
          <h2
            className="h-display"
            style={{ fontSize: 72, margin: "20px 0 0", maxWidth: 720 }}
          >
            Three steps between
            <br />
            <span className="h-italic">a feeling</span> and a flight.
          </h2>
        </div>
        <PillButton variant="ghost" size="md" as="a" href="/membership">
          Become a member <ArrowRight />
        </PillButton>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 1,
          background: "var(--hair)",
          borderRadius: 24,
          overflow: "hidden",
          border: "1px solid var(--hair)",
        }}
      >
        {steps.map((s, i) => (
          <HowStep key={s.n} s={s} idx={i} />
        ))}
      </div>
    </section>
  );
}

function DestCardEditorial({
  d,
  idx,
}: {
  d: (typeof DESTINATIONS)[number];
  idx: number;
}) {
  const sizes = [
    { w: 420, h: 560 },
    { w: 340, h: 460 },
    { w: 380, h: 520 },
    { w: 320, h: 440 },
  ];
  const s = sizes[idx % sizes.length];
  const imgRef = useRef<HTMLDivElement>(null);
  return (
    <article
      onMouseEnter={() => {
        if (imgRef.current) imgRef.current.style.transform = "scale(1.10)";
      }}
      onMouseLeave={() => {
        if (imgRef.current) imgRef.current.style.transform = "scale(1)";
      }}
      style={{
        flexShrink: 0,
        width: s.w,
        height: s.h,
        borderRadius: 6,
        position: "relative",
        overflow: "hidden",
        cursor: "pointer",
      }}
    >
      <div
        ref={imgRef}
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${d.img})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transition: "transform 1.4s cubic-bezier(0.2, 0.8, 0.2, 1)",
          willChange: "transform",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(10,11,15,0.0) 38%, rgba(10,11,15,0.88) 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 18,
          left: 20,
          right: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          color: "var(--ink)",
        }}
      >
        <span
          style={{
            fontFamily: "var(--mono)",
            fontSize: 9.5,
            letterSpacing: "0.22em",
            color: "var(--gold)",
            textTransform: "uppercase",
          }}
        >
          No. {String(idx + 1).padStart(2, "0")}
        </span>
        <span
          style={{
            width: 28,
            height: 28,
            borderRadius: "50%",
            background: "rgba(242,235,221,0.14)",
            border: "0.5px solid rgba(242,235,221,0.18)",
            backdropFilter: "blur(10px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--ink)",
          }}
        >
          <ArrowUpRight size={11} />
        </span>
      </div>
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
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "rgba(242,235,221,0.75)",
            marginBottom: 8,
          }}
        >
          {d.country} · {d.tag}
        </div>
        <div
          style={{
            fontFamily: "var(--display)",
            fontSize: s.w > 380 ? 64 : 48,
            lineHeight: 0.96,
            letterSpacing: "-0.02em",
          }}
        >
          {d.name}
        </div>
      </div>
    </article>
  );
}

function HomeDestinations() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf: number | null = null;
    const tick = () => {
      raf = null;
      if (!sectionRef.current || !trackRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const vh = window.innerHeight;
      const sectionH = sectionRef.current.offsetHeight;
      const scrollable = sectionH - vh;
      const p = Math.max(0, Math.min(1, -rect.top / scrollable));

      const tw = trackRef.current.scrollWidth;
      const vw = window.innerWidth;
      const maxX = Math.max(0, tw - vw + 96);
      trackRef.current.style.transform = `translate3d(${-p * maxX}px, 0, 0)`;
      if (progressRef.current) {
        progressRef.current.style.width = `${Math.round(p * 100)}%`;
      }
    };
    const onScroll = () => {
      if (raf == null) raf = requestAnimationFrame(tick);
    };
    tick();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf != null) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        height: "480vh",
        position: "relative",
        background: "var(--carbon)",
        color: "var(--ink)",
      }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <div style={{ padding: "110px 48px 32px", flexShrink: 0 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              gap: 48,
            }}
          >
            <div>
              <EyebrowLabel color="var(--gold)">
                In season · Winter 2026
              </EyebrowLabel>
              <h2
                className="h-display"
                style={{
                  fontSize: "clamp(56px, 7vw, 96px)",
                  margin: "20px 0 0",
                  maxWidth: 880,
                  color: "var(--ink)",
                  letterSpacing: "-0.025em",
                  lineHeight: 0.95,
                }}
              >
                Eight places
                <br />
                <span
                  className="h-italic"
                  style={{ color: "var(--gold)" }}
                >
                  we love right now.
                </span>
              </h2>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                gap: 16,
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 10.5,
                  letterSpacing: "0.22em",
                  color: "var(--mute)",
                  textTransform: "uppercase",
                }}
              >
                Scroll →
              </span>
              <div
                style={{
                  width: 160,
                  height: 2,
                  background: "var(--hair)",
                  overflow: "hidden",
                  borderRadius: 999,
                }}
              >
                <div
                  ref={progressRef}
                  style={{
                    width: "0%",
                    height: "100%",
                    background: "var(--gold)",
                    transition: "width 0.05s linear",
                  }}
                />
              </div>
              <span
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 10,
                  letterSpacing: "0.18em",
                  color: "var(--mute)",
                  textTransform: "uppercase",
                }}
              >
                01 / 08
              </span>
            </div>
          </div>
        </div>

        <div
          ref={trackRef}
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            gap: 24,
            paddingLeft: 48,
            paddingRight: 48,
            willChange: "transform",
            minHeight: 0,
          }}
        >
          {DESTINATIONS.map((d, i) => (
            <DestCardEditorial key={d.id} d={d} idx={i} />
          ))}
          <article
            style={{
              flexShrink: 0,
              width: 320,
              height: 420,
              borderRadius: 6,
              border: "1px solid var(--hair)",
              background: "transparent",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              padding: "28px 24px",
              color: "var(--ink)",
            }}
          >
            <span
              style={{
                fontFamily: "var(--mono)",
                fontSize: 10.5,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--gold)",
              }}
            >
              + 220 more
            </span>
            <div>
              <div
                style={{
                  fontFamily: "var(--display)",
                  fontSize: 40,
                  lineHeight: 0.98,
                  letterSpacing: "-0.015em",
                  marginBottom: 16,
                }}
              >
                Browse the <span className="h-italic">atlas.</span>
              </div>
              <div style={{ marginTop: 18 }}>
                <PillButton size="sm" variant="invert">
                  Open atlas <ArrowUpRight size={11} />
                </PillButton>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

function ProposalPreview({ p }: { p: Proposal }) {
  const imgRef = useRef<HTMLDivElement>(null);
  return (
    <div
      onMouseEnter={() => {
        if (imgRef.current) imgRef.current.style.transform = "scale(1.08)";
      }}
      onMouseLeave={() => {
        if (imgRef.current) imgRef.current.style.transform = "scale(1)";
      }}
      style={{
        background: "var(--bone)",
        borderRadius: 22,
        overflow: "hidden",
        border: "1px solid var(--hair)",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        height: "100%",
      }}
    >
      <div style={{ height: 240, position: "relative", overflow: "hidden" }}>
        <div
          ref={imgRef}
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${p.hotel.img})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transition: "transform 1.2s cubic-bezier(0.2, 0.8, 0.2, 1)",
            willChange: "transform",
          }}
        />
        <span
          style={{
            position: "absolute",
            top: 14,
            left: 14,
            background: "rgba(10,11,15,0.6)",
            color: "var(--ink)",
            backdropFilter: "blur(10px)",
            padding: "6px 10px",
            borderRadius: 999,
            fontFamily: "var(--mono)",
            fontSize: 10,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            border: "0.5px solid rgba(242,235,221,0.2)",
          }}
        >
          {p.flag}
        </span>
      </div>
      <div
        style={{
          padding: "24px 22px 22px",
          display: "flex",
          flexDirection: "column",
          gap: 14,
          flex: 1,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 5,
              fontFamily: "var(--mono)",
              fontSize: 10,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--gold)",
            }}
          >
            <Star size={11} /> NUWAI Approved
          </span>
          <span
            style={{
              marginLeft: "auto",
              color: "var(--mute)",
              fontSize: 12,
            }}
          >
            {p.hotel.name}
          </span>
        </div>
        <div
          style={{
            fontFamily: "var(--display)",
            fontSize: 28,
            lineHeight: 1.05,
            letterSpacing: "-0.01em",
          }}
        >
          {p.title}
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {p.vibe.map((v) => (
            <span
              key={v}
              style={{
                fontFamily: "var(--mono)",
                fontSize: 10,
                letterSpacing: "0.08em",
                padding: "5px 9px",
                borderRadius: 999,
                border: "1px solid var(--hair)",
                color: "var(--mute)",
                textTransform: "uppercase",
              }}
            >
              {v}
            </span>
          ))}
        </div>
        <div
          style={{
            marginTop: "auto",
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            paddingTop: 12,
            borderTop: "1px solid var(--hair)",
          }}
        >
          <div>
            <div style={{ fontSize: 12, color: "var(--mute)" }}>From</div>
            <div style={{ fontFamily: "var(--display)", fontSize: 26 }}>
              ${p.perPerson.toLocaleString()}
              <span style={{ fontSize: 13, color: "var(--mute)" }}>
                {" "}
                /person
              </span>
            </div>
          </div>
          <PillButton size="sm" variant="ghost">
            View <ArrowRight size={11} />
          </PillButton>
        </div>
      </div>
    </div>
  );
}

function HomeProposals() {
  return (
    <section style={{ ...inner, padding: "120px 48px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          marginBottom: 56,
        }}
      >
        <div>
          <EyebrowLabel>Curated by NUWAI</EyebrowLabel>
          <h2
            className="h-display"
            style={{ fontSize: 72, margin: "20px 0 0", maxWidth: 720 }}
          >
            Three takes on Tulum.{" "}
            <span className="h-italic">All NUWAI Approved.</span>
          </h2>
          <p
            style={{
              marginTop: 18,
              maxWidth: 560,
              fontSize: 16,
              lineHeight: 1.5,
              color: "var(--mute)",
            }}
          >
            Same destination. Three completely different weeks. Hand-picked by
            our editors, with member rates and perks at every stay.
          </p>
        </div>
        <PillButton variant="ghost" size="md" as="a" href="/atelier">
          Browse collections <ArrowRight />
        </PillButton>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 20,
        }}
      >
        {PROPOSALS.map((p) => (
          <TiltCard key={p.id} max={5}>
            <ProposalPreview p={p} />
          </TiltCard>
        ))}
      </div>
    </section>
  );
}

type Tier = {
  name: string;
  tag: string;
  price: string;
  sub: string;
  bg: string;
  fg: string;
  accent: string;
  perks: string[];
  featured?: boolean;
};

function TierCard({ tier }: { tier: Tier }) {
  return (
    <div
      style={{
        background: tier.bg,
        color: tier.fg,
        borderRadius: 24,
        padding: "36px 32px 32px",
        display: "flex",
        flexDirection: "column",
        gap: 24,
        minHeight: 560,
        position: "relative",
        overflow: "hidden",
        transform: tier.featured ? "translateY(-8px)" : "none",
        boxShadow: tier.featured
          ? "0 30px 60px rgba(10,10,10,0.22)"
          : "0 8px 24px rgba(10,10,10,0.06)",
        border:
          tier.bg === "var(--bone)" ? "1px solid var(--hair)" : "none",
      }}
    >
      {tier.featured && (
        <span
          style={{
            position: "absolute",
            top: 18,
            right: 18,
            fontFamily: "var(--mono)",
            fontSize: 10,
            letterSpacing: "0.12em",
            padding: "5px 10px",
            borderRadius: 999,
            background: "var(--gold)",
            color: "var(--linen)",
            textTransform: "uppercase",
          }}
        >
          Most chosen
        </span>
      )}
      <div>
        <div
          style={{
            fontFamily: "var(--mono)",
            fontSize: 11,
            letterSpacing: "0.14em",
            opacity: 0.65,
            textTransform: "uppercase",
          }}
        >
          {tier.tag}
        </div>
        <div
          style={{
            fontFamily: "var(--display)",
            fontStyle: "italic",
            fontSize: 64,
            marginTop: 12,
            lineHeight: 1,
            color: tier.accent,
          }}
        >
          {tier.name}
        </div>
        <div
          style={{
            marginTop: 18,
            display: "flex",
            alignItems: "baseline",
            gap: 8,
          }}
        >
          <span style={{ fontFamily: "var(--display)", fontSize: 48 }}>
            {tier.price}
          </span>
          <span style={{ opacity: 0.7, fontSize: 13 }}>{tier.sub}</span>
        </div>
      </div>
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        {tier.perks.map((perk) => (
          <div
            key={perk}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 10,
              fontSize: 14.5,
              lineHeight: 1.4,
              paddingBottom: 10,
              borderBottom: `1px solid ${tier.bg === "var(--bone)" ? "var(--hair)" : "rgba(250,246,240,0.12)"}`,
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: tier.accent,
                marginTop: 8,
                flexShrink: 0,
              }}
            />
            <span>{perk}</span>
          </div>
        ))}
      </div>
      <PillButton
        size="md"
        variant={tier.bg === "var(--bone)" ? "solid" : "invert"}
      >
        {tier.name === "Black" ? "Request invitation" : "Choose " + tier.name}{" "}
        <ArrowRight />
      </PillButton>
    </div>
  );
}

function TierCardWrap({ tier, idx }: { tier: Tier; idx: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(60px)",
        transition: `opacity 1.4s cubic-bezier(0.2, 0.8, 0.2, 1) ${idx * 0.16}s, transform 1.4s cubic-bezier(0.2, 0.8, 0.2, 1) ${idx * 0.16}s`,
      }}
    >
      <TiltCard max={4}>
        <TierCard tier={tier} />
      </TiltCard>
    </div>
  );
}

function HomeMembership() {
  const tiers: Tier[] = [
    {
      name: "NUWAI",
      tag: "Start here",
      price: "$0",
      sub: "Free to join",
      bg: "var(--bone)",
      fg: "var(--ink)",
      accent: "var(--ink)",
      perks: [
        "Browse the curated catalog",
        "Save stays you love",
        "Standard concierge chat",
        "Member rates at select stays",
      ],
    },
    {
      name: "Select",
      tag: "The new way to travel",
      price: "$240",
      sub: "per year",
      bg: "var(--ocean)",
      fg: "var(--bone)",
      accent: "var(--gold)",
      perks: [
        "Full NUWAI Approved catalog",
        "Member rates at every stay",
        "Priority concierge response",
        "Complimentary upgrades & late checkout",
        "5% travel credit on every booking",
      ],
      featured: true,
    },
    {
      name: "Black",
      tag: "By invitation",
      price: "$3,600",
      sub: "per year",
      bg: "var(--carbon)",
      fg: "var(--ink)",
      accent: "var(--gold)",
      perks: [
        "Everything in Select",
        "Dedicated concierge by name",
        "Airport transfers worldwide",
        "Members-only experiences & drops",
        "Suite upgrades guaranteed",
        "Custom itineraries on request",
      ],
    },
  ];
  return (
    <section style={{ padding: "120px 0 140px", background: "var(--linen)" }}>
      <div style={inner}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <EyebrowLabel color="var(--gold)">Membership</EyebrowLabel>
          <h2
            className="h-display"
            style={{
              fontSize: 84,
              margin: "20px auto 18px",
              maxWidth: 920,
            }}
          >
            Concierge for <span className="h-italic">the way</span>
            <br /> you actually travel.
          </h2>
          <p
            style={{
              maxWidth: 580,
              margin: "0 auto",
              fontSize: 17,
              lineHeight: 1.5,
              color: "var(--mute)",
            }}
          >
            Pay nothing to plan your first trip. Upgrade when travel becomes a
            habit.
          </p>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 18,
            alignItems: "stretch",
          }}
        >
          {tiers.map((tier, i) => (
            <TierCardWrap key={tier.name} tier={tier} idx={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialItem({
  t,
  idx,
}: {
  t: (typeof TESTIMONIALS)[number];
  idx: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref);
  return (
    <figure
      ref={ref}
      style={{
        margin: 0,
        padding: "8px 0",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 1.4s cubic-bezier(0.2, 0.8, 0.2, 1) ${idx * 0.2}s, transform 1.4s cubic-bezier(0.2, 0.8, 0.2, 1) ${idx * 0.2}s`,
      }}
    >
      <blockquote
        style={{
          margin: 0,
          fontFamily: "var(--display)",
          fontSize: 30,
          lineHeight: 1.2,
          letterSpacing: "-0.005em",
          color: "var(--ink)",
        }}
      >
        <span style={{ fontStyle: "italic", color: "var(--gold)" }}>“</span>
        {t.body}
        <span style={{ fontStyle: "italic", color: "var(--gold)" }}>”</span>
      </blockquote>
      <figcaption
        style={{
          marginTop: 18,
          display: "flex",
          alignItems: "center",
          gap: 10,
          fontFamily: "var(--mono)",
          fontSize: 11,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "var(--mute)",
        }}
      >
        <span style={{ width: 24, height: 1, background: "var(--gold)" }} />
        {t.name} · {t.city}
      </figcaption>
    </figure>
  );
}

function HomeTestimonials() {
  return (
    <section
      style={{
        background: "var(--bone)",
        padding: "160px 0",
        borderTop: "1px solid var(--hair)",
        borderBottom: "1px solid var(--hair)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={inner}>
        <EyebrowLabel color="var(--gold)">From the inbox</EyebrowLabel>
        <div
          style={{
            margin: "40px 0 80px",
            maxWidth: 1100,
            fontFamily: "var(--display)",
            fontSize: "clamp(40px, 4.6vw, 80px)",
            lineHeight: 1.12,
            letterSpacing: "-0.018em",
          }}
        >
          <span style={{ fontStyle: "italic", color: "var(--gold)" }}>“</span>
          <ScrollWords
            text="I described the trip in three sentences. Three days later I had three trips I wanted to take. Picked one. It was perfect."
            baseColor="rgba(242,235,221,0.18)"
            activeColor="var(--ink)"
          />
          <span style={{ fontStyle: "italic", color: "var(--gold)" }}>”</span>
          <div
            style={{
              marginTop: 28,
              display: "flex",
              alignItems: "center",
              gap: 12,
              fontFamily: "var(--mono)",
              fontSize: 11,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "var(--mute)",
            }}
          >
            <span
              style={{
                width: 28,
                height: 1,
                background: "var(--gold)",
              }}
            />
            Lena R. · Brooklyn
          </div>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 56,
          }}
        >
          {TESTIMONIALS.slice(1).map((t, i) => (
            <TestimonialItem key={i} t={t} idx={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function HomeCTA() {
  return (
    <section
      style={{
        background: "var(--carbon)",
        padding: "180px 0 200px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "50%",
          transform: "translateX(-50%)",
          width: 900,
          height: 900,
          borderRadius: "50%",
          pointerEvents: "none",
          background:
            "radial-gradient(circle, rgba(201,168,106,0.14), transparent 60%)",
        }}
      />
      <CursorSpot color="rgba(201,168,106,0.10)" size={600} />
      <div
        style={{
          ...inner,
          textAlign: "center",
          position: "relative",
          zIndex: 2,
        }}
      >
        <EyebrowLabel color="var(--gold)">Take the next trip</EyebrowLabel>
        <h2
          className="h-display"
          style={{
            fontSize: "clamp(96px, 12vw, 200px)",
            margin: "32px auto 40px",
            maxWidth: 1200,
            letterSpacing: "-0.04em",
            lineHeight: 0.92,
          }}
        >
          <SplitText text="Travel," by="char" stagger={0.04} duration={1.2} />
          <br />
          <SplitText
            text="designed for you."
            by="char"
            stagger={0.045}
            duration={1.2}
            accentWord="designed"
            accentColor="var(--gold)"
          />
        </h2>
        <PillButton size="lg">
          Plan my trip <ArrowRight />
        </PillButton>
        <div
          style={{ marginTop: 18, fontSize: 13, color: "var(--mute)" }}
        >
          Free to plan · No commitment until you book
        </div>
      </div>
    </section>
  );
}

export default function Homepage() {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: "100%",
        overflowX: "clip",
        background: "var(--linen)",
        color: "var(--ink)",
        paddingBottom: 0,
      }}
    >
      <SiteNav />
      <HomeHero />
      <HomeManifesto />
      <HomeVignettes />
      <HomeBylines />
      <HomeHow />
      <HomeDestinations />
      <HomeProposals />
      <HomeMembership />
      <HomeTestimonials />
      <HomeCTA />
      <SiteFooter />
    </div>
  );
}
