"use client";

import { CSSProperties, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, EyebrowLabel } from "./brand";
import { ImageScroll, ScrollWords, useInView } from "./effects";
import { SiteFooter, SiteNav, siteInner } from "./site-chrome";

const inner: CSSProperties = siteInner;

type Article = {
  slug: string;
  dept: Dept;
  title: string;
  dek: string;
  byline: string;
  read: string;
  img: string;
};

type Dept = "Dispatches" | "Rooms" | "Tables" | "The Long Read" | "Back Page";

const LEADER: Article = {
  slug: "the-quietest-coast-in-europe",
  dept: "The Long Read",
  title: "The quietest coast in Europe is also the most demanding.",
  dek: "Eight days on the Alentejo, a region Lisbon has been hiding for thirty years, in a small house with no Wi-Fi and one very serious cook.",
  byline: "By Priya Ramesh · Dispatch from Comporta",
  read: "16 min",
  img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=2400&auto=format&fit=crop&q=80",
};

const ARTICLES: Article[] = [
  {
    slug: "the-tent-in-tulum",
    dept: "Rooms",
    title: "The tent in Tulum that ruined every hotel after it.",
    dek: "Habitas, room fourteen, the first three mornings.",
    byline: "Sofía Marín",
    read: "9 min",
    img: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1400&auto=format&fit=crop&q=80",
  },
  {
    slug: "kin-toh-omakase",
    dept: "Tables",
    title: "Three nights at Kin Toh, in order.",
    dek: "How a Yucatán tasting menu reorganises a week.",
    byline: "Daniel Okafor",
    read: "7 min",
    img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1400&auto=format&fit=crop&q=80",
  },
  {
    slug: "alentejo-housekeeper",
    dept: "Dispatches",
    title: "A housekeeper, two dogs, and a kitchen the size of a closet.",
    dek: "Notes from a private rental in Comporta.",
    byline: "Priya Ramesh",
    read: "6 min",
    img: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=1400&auto=format&fit=crop&q=80",
  },
  {
    slug: "tokyo-eight-days",
    dept: "The Long Read",
    title: "Eight days in Tokyo, and what to leave out.",
    dek: "Less is the entire point. A revised itinerary, fourth printing.",
    byline: "Editor's desk",
    read: "14 min",
    img: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1400&auto=format&fit=crop&q=80",
  },
  {
    slug: "ibiza-north-coast",
    dept: "Dispatches",
    title: "The north of Ibiza, in September, after the season.",
    dek: "Three villas, two restaurants, one club we still don't name.",
    byline: "Daniel Okafor",
    read: "8 min",
    img: "https://images.unsplash.com/photo-1559628233-eb1bdacba7a1?w=1400&auto=format&fit=crop&q=80",
  },
  {
    slug: "advisor-bookshelf",
    dept: "Back Page",
    title: "An advisor's bookshelf — Sofía Marín, Mexico City.",
    dek: "Forty-one titles she keeps in the room she briefs from.",
    byline: "The Back Page",
    read: "4 min",
    img: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1400&auto=format&fit=crop&q=80",
  },
  {
    slug: "amalfi-may",
    dept: "Rooms",
    title: "Why we send everyone to Amalfi in May, not June.",
    dek: "Two and a half weeks of perfect light, and what they hide.",
    byline: "Editor's desk",
    read: "5 min",
    img: "https://images.unsplash.com/photo-1633321702518-7feccafb94d5?w=1400&auto=format&fit=crop&q=80",
  },
];

const DEPTS: Dept[] = [
  "Dispatches",
  "Rooms",
  "Tables",
  "The Long Read",
  "Back Page",
];

function JournalMasthead() {
  return (
    <section
      style={{
        background: "var(--linen)",
        paddingTop: 140,
        paddingBottom: 64,
        borderBottom: "1px solid var(--hair)",
      }}
    >
      <div style={inner}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto 1fr",
            alignItems: "baseline",
            gap: 24,
          }}
        >
          <div
            style={{
              fontFamily: "var(--mono)",
              fontSize: 11,
              letterSpacing: "0.22em",
              color: "var(--mute)",
              textTransform: "uppercase",
            }}
          >
            No. 14 · Spring 2026
          </div>
          <h1
            className="h-display"
            style={{
              margin: 0,
              fontSize: "clamp(72px, 9vw, 168px)",
              letterSpacing: "-0.04em",
              lineHeight: 1,
              textAlign: "center",
            }}
          >
            The <span className="h-italic">Journal</span>
          </h1>
          <div
            style={{
              textAlign: "right",
              fontFamily: "var(--mono)",
              fontSize: 11,
              letterSpacing: "0.22em",
              color: "var(--mute)",
              textTransform: "uppercase",
            }}
          >
            Edited by P. Ramesh
          </div>
        </div>
        <div
          style={{
            marginTop: 36,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: 24,
            borderTop: "1px solid var(--hair)",
            fontFamily: "var(--mono)",
            fontSize: 11,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--mute)",
            gap: 24,
            flexWrap: "wrap",
          }}
        >
          <span>14° in Lisbon · Light rain</span>
          <span>Published the third Friday of each season</span>
          <span style={{ color: "var(--gold)" }}>
            For members &amp; the curious
          </span>
        </div>
      </div>
    </section>
  );
}

function JournalLeader() {
  const ref = useRef<HTMLElement>(null);
  return (
    <section
      ref={ref}
      style={{ background: "var(--carbon)", padding: "120px 0" }}
    >
      <div style={inner}>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            gap: 24,
            marginBottom: 40,
          }}
        >
          <EyebrowLabel color="var(--gold)">
            The Leader · {LEADER.dept}
          </EyebrowLabel>
          <span
            style={{
              fontFamily: "var(--mono)",
              fontSize: 11,
              letterSpacing: "0.18em",
              color: "var(--mute)",
              textTransform: "uppercase",
            }}
          >
            {LEADER.read} · {LEADER.byline}
          </span>
        </div>
        <Link
          href={`/journal/${LEADER.slug}`}
          style={{ textDecoration: "none", color: "inherit", display: "block" }}
        >
          <ImageScroll
            src={LEADER.img}
            height={620}
            style={{ borderRadius: 6 }}
            filter="saturate(0.92)"
            max={1.18}
          />
        </Link>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 64,
            marginTop: 48,
            alignItems: "flex-start",
          }}
        >
          <h2
            className="h-display"
            style={{
              margin: 0,
              fontSize: "clamp(48px, 5.4vw, 84px)",
              lineHeight: 1,
              letterSpacing: "-0.025em",
            }}
          >
            {LEADER.title}
          </h2>
          <p
            style={{
              margin: 0,
              fontFamily: "var(--display)",
              fontSize: 24,
              lineHeight: 1.45,
              color: "rgba(242,235,221,0.82)",
              paddingTop: 8,
            }}
          >
            <ScrollWords
              text={LEADER.dek}
              baseColor="rgba(242,235,221,0.22)"
              activeColor="var(--ink)"
            />
          </p>
        </div>
        <div
          style={{
            marginTop: 56,
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
          }}
        >
          <span>The Long Read · Cover essay</span>
          <Link
            href={`/journal/${LEADER.slug}`}
            style={{
              color: "var(--ink)",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            Read the essay <ArrowUpRight />
          </Link>
        </div>
      </div>
    </section>
  );
}

function PullQuote() {
  return (
    <section style={{ background: "var(--bone)", padding: "120px 0" }}>
      <div style={inner}>
        <blockquote
          style={{
            margin: 0,
            fontFamily: "var(--display)",
            fontStyle: "italic",
            fontSize: "clamp(40px, 5vw, 80px)",
            lineHeight: 1.1,
            letterSpacing: "-0.018em",
            color: "var(--ink)",
            maxWidth: 1080,
          }}
        >
          <span style={{ color: "var(--gold)" }}>“</span>
          On the third morning the housekeeper asked if I would like the eggs
          soft or very soft, and I understood at once that the rest of the
          trip had already been decided for me.
          <span style={{ color: "var(--gold)" }}>”</span>
        </blockquote>
        <div
          style={{
            marginTop: 28,
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontFamily: "var(--mono)",
            fontSize: 11,
            letterSpacing: "0.18em",
            color: "var(--mute)",
            textTransform: "uppercase",
          }}
        >
          <span style={{ width: 28, height: 1, background: "var(--gold)" }} />
          From the cover essay
        </div>
      </div>
    </section>
  );
}

function DepartmentStrip({ dept }: { dept: Dept }) {
  const items = ARTICLES.filter((a) => a.dept === dept);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  if (items.length === 0) return null;
  return (
    <section
      ref={ref}
      style={{
        background: "var(--linen)",
        padding: "80px 0",
        borderBottom: "1px solid var(--hair)",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(30px)",
        transition:
          "opacity 1s cubic-bezier(0.2, 0.8, 0.2, 1), transform 1s cubic-bezier(0.2, 0.8, 0.2, 1)",
      }}
    >
      <div style={inner}>
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBottom: 36,
            gap: 32,
          }}
        >
          <h3
            className="h-display"
            style={{
              margin: 0,
              fontSize: "clamp(40px, 4.6vw, 64px)",
              letterSpacing: "-0.018em",
              lineHeight: 1,
            }}
          >
            {dept === "Back Page" ? (
              <>
                The <span className="h-italic">Back Page</span>
              </>
            ) : dept === "The Long Read" ? (
              <>
                The <span className="h-italic">Long Read</span>
              </>
            ) : (
              <span className="h-italic">{dept}</span>
            )}
          </h3>
          <span
            style={{
              fontFamily: "var(--mono)",
              fontSize: 10.5,
              letterSpacing: "0.22em",
              color: "var(--mute)",
              textTransform: "uppercase",
            }}
          >
            {items.length} {items.length === 1 ? "piece" : "pieces"} · Edition
            14
          </span>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${Math.min(items.length, 3)}, 1fr)`,
            gap: 24,
            alignItems: "flex-start",
          }}
        >
          {items.map((a, i) => (
            <Link
              key={a.slug}
              href={`/journal/${a.slug}`}
              style={{
                textDecoration: "none",
                color: "inherit",
                display: "block",
                marginTop: i % 2 === 1 ? 32 : 0,
              }}
            >
              <ImageScroll
                src={a.img}
                height={items.length > 1 ? 380 : 520}
                style={{ borderRadius: 6 }}
                filter="saturate(0.92)"
                max={1.16}
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
                  fontSize: 10,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--mute)",
                  marginBottom: 14,
                }}
              >
                <span style={{ color: "var(--gold)" }}>{a.dept}</span>
                <span>{a.read}</span>
              </div>
              <h4
                className="h-display"
                style={{
                  margin: 0,
                  fontSize: 28,
                  lineHeight: 1.1,
                  letterSpacing: "-0.012em",
                  color: "var(--ink)",
                  fontWeight: 400,
                  maxWidth: 460,
                }}
              >
                {a.title}
              </h4>
              <p
                style={{
                  margin: "10px 0 0",
                  fontSize: 14.5,
                  lineHeight: 1.5,
                  color: "var(--mute)",
                  maxWidth: 420,
                }}
              >
                {a.dek}
              </p>
              <div
                style={{
                  marginTop: 14,
                  fontFamily: "var(--mono)",
                  fontSize: 10,
                  letterSpacing: "0.14em",
                  color: "var(--mute)",
                  textTransform: "uppercase",
                }}
              >
                — {a.byline}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function BackPageFooter() {
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
              In the next edition
            </EyebrowLabel>
            <h3
              className="h-display"
              style={{
                margin: "16px 0 12px",
                fontSize: "clamp(40px, 4.6vw, 64px)",
                letterSpacing: "-0.02em",
                lineHeight: 1,
              }}
            >
              No. 15 · <span className="h-italic">Summer 2026</span>
            </h3>
            <p
              style={{
                margin: 0,
                fontSize: 17,
                lineHeight: 1.6,
                color: "rgba(242,235,221,0.78)",
                maxWidth: 480,
              }}
            >
              A long read from the Norwegian fjords, a roomful of new tables
              in Lisbon, and a back page on what a Tokyo concierge keeps in
              her desk drawer.
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
            <div>Filed by Friday, 22 May</div>
            <div>Posted to members the third Friday of June</div>
            <div style={{ color: "var(--gold)" }}>
              Press subscriptions on application
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function JournalScreen() {
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
      <JournalMasthead />
      <JournalLeader />
      <PullQuote />
      {DEPTS.filter((d) => d !== "The Long Read" || ARTICLES.some((a) => a.dept === "The Long Read")).map(
        (d) => (
          <DepartmentStrip key={d} dept={d} />
        ),
      )}
      <BackPageFooter />
      <SiteFooter />
    </div>
  );
}
