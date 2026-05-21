"use client";

import { CSSProperties, useRef } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  EyebrowLabel,
  PillButton,
} from "./brand";
import { ScrollWords, SplitText, useInView } from "./effects";
import { SiteFooter, SiteNav, siteInner } from "./site-chrome";
import { COLLECTIONS, type Collection } from "@/lib/data";

const inner: CSSProperties = siteInner;

function Hero() {
  return (
    <section
      style={{
        background: "var(--linen)",
        padding: "160px 0 100px",
        borderBottom: "1px solid var(--hair)",
      }}
    >
      <div style={{ ...inner, maxWidth: 1080 }}>
        <EyebrowLabel color="var(--gold)">Curated by NUWAI</EyebrowLabel>
        <h1
          className="h-display"
          style={{
            fontSize: "clamp(56px, 7vw, 112px)",
            margin: "26px 0 0",
            letterSpacing: "-0.035em",
          }}
        >
          <SplitText text="Six ways" by="word" stagger={0.08} duration={1.0} />
          <br />
          <SplitText
            text="to disappear."
            by="word"
            stagger={0.1}
            duration={1.0}
            accentWord="disappear."
            accentColor="var(--gold)"
          />
        </h1>
        <p
          style={{
            marginTop: 32,
            maxWidth: 640,
            fontSize: 17.5,
            lineHeight: 1.55,
            color: "rgba(242,235,221,0.82)",
          }}
        >
          Every collection is hand-picked by our editors. Every stay carries
          the NUWAI Approved mark — properties we&rsquo;ve slept in, eaten at,
          and would book ourselves twice.
        </p>
      </div>
    </section>
  );
}

function CollectionCard({ c, i }: { c: Collection; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, 0.15);
  const imgRef = useRef<HTMLDivElement>(null);
  return (
    <Link
      href={`/destinations#${c.id}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div
        ref={ref}
        onMouseEnter={() => {
          if (imgRef.current) imgRef.current.style.transform = "scale(1.06)";
        }}
        onMouseLeave={() => {
          if (imgRef.current) imgRef.current.style.transform = "scale(1)";
        }}
        style={{
          position: "relative",
          borderRadius: 24,
          overflow: "hidden",
          height: 520,
          border: "1px solid var(--hair)",
          transform: visible ? "translateY(0)" : "translateY(24px)",
          opacity: visible ? 1 : 0,
          transition: `transform 0.9s cubic-bezier(0.2, 0.8, 0.2, 1) ${
            i * 80
          }ms, opacity 0.9s ease ${i * 80}ms`,
          cursor: "pointer",
        }}
      >
        <div
          ref={imgRef}
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${c.cover})`,
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
              "linear-gradient(180deg, rgba(10,11,15,0.25) 0%, rgba(10,11,15,0) 40%, rgba(10,11,15,0.85) 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 22,
            left: 22,
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "rgba(10,11,15,0.55)",
            backdropFilter: "blur(10px)",
            padding: "7px 12px",
            borderRadius: 999,
            border: "0.5px solid rgba(242,235,221,0.2)",
            fontFamily: "var(--mono)",
            fontSize: 10,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--ink)",
          }}
        >
          {c.tag}
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 24,
            left: 24,
            right: 24,
            color: "var(--ink)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
              marginBottom: 12,
            }}
          >
            <h3
              className="h-display"
              style={{
                fontSize: 38,
                margin: 0,
                letterSpacing: "-0.015em",
              }}
            >
              {c.name}
            </h3>
            <span
              style={{
                fontFamily: "var(--mono)",
                fontSize: 11,
                letterSpacing: "0.12em",
                color: "rgba(242,235,221,0.7)",
                textTransform: "uppercase",
              }}
            >
              {c.count} stays
            </span>
          </div>
          <p
            style={{
              margin: 0,
              fontSize: 14.5,
              lineHeight: 1.5,
              color: "rgba(242,235,221,0.82)",
              maxWidth: 440,
            }}
          >
            {c.blurb}
          </p>
          <div
            style={{
              marginTop: 16,
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontSize: 13,
              color: "var(--gold)",
              letterSpacing: "0.01em",
            }}
          >
            Explore the collection <ArrowUpRight size={13} />
          </div>
        </div>
      </div>
    </Link>
  );
}

function CollectionGrid() {
  return (
    <section style={{ background: "var(--linen)", padding: "100px 0 120px" }}>
      <div style={inner}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 22,
          }}
        >
          {COLLECTIONS.map((c, i) => (
            <CollectionCard key={c.id} c={c} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function EditorialNote() {
  return (
    <section style={{ background: "var(--bone)", padding: "140px 0" }}>
      <div style={{ ...inner, maxWidth: 920 }}>
        <EyebrowLabel color="var(--gold)">The NUWAI Approved mark</EyebrowLabel>
        <p
          style={{
            fontFamily: "var(--display)",
            fontSize: "clamp(28px, 3vw, 44px)",
            lineHeight: 1.3,
            letterSpacing: "-0.012em",
            margin: "28px 0 0",
            color: "var(--ink)",
          }}
        >
          <ScrollWords
            text="A property earns the NUWAI Approved mark by being good. Not viral, not biggest, not cheapest. Our editors stay there. They check the small things — the water pressure, the wake-up call, the way the staff treats the housekeeper. We turn down more than we accept."
            baseColor="rgba(242,235,221,0.2)"
            activeColor="var(--ink)"
            accentWord="NUWAI"
          />
        </p>
        <div style={{ marginTop: 40 }}>
          <PillButton size="md" as="a" href="/membership">
            Join NUWAI <ArrowRight />
          </PillButton>
        </div>
      </div>
    </section>
  );
}

export default function Atelier() {
  return (
    <>
      <SiteNav variant="solid" />
      <Hero />
      <CollectionGrid />
      <EditorialNote />
      <SiteFooter />
    </>
  );
}
