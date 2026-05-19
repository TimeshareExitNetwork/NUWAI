"use client";

import { CSSProperties, useState } from "react";
import { useRouter } from "next/navigation";
import { EyebrowLabel, Wordmark } from "./brand";
import { IOSDevice } from "./ios-frame";

const memStyles: Record<string, CSSProperties> = {
  shell: {
    height: "100%",
    width: "100%",
    background: "var(--linen)",
    color: "var(--ink)",
    display: "flex",
    flexDirection: "column",
  },
};

function MemHeader() {
  return (
    <div style={{ padding: "54px 18px 20px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 22,
        }}
      >
        <Wordmark size={20} />
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button
            style={{
              all: "unset",
              cursor: "pointer",
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: "var(--bone)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid var(--hair)",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M8 1v1.5M3.5 8H2M14 8h-1.5M5 3l-1 -1M11 3l1 -1M8 13a5 5 0 100-10 5 5 0 000 10z"
                stroke="currentColor"
                strokeWidth="1.3"
              />
            </svg>
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&auto=format&fit=crop"
            alt=""
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        </div>
      </div>
      <EyebrowLabel>Good morning</EyebrowLabel>
      <h1
        className="h-display"
        style={{
          fontSize: 40,
          margin: "10px 0 4px",
          letterSpacing: "-0.02em",
          lineHeight: 1,
        }}
      >
        Welcome back,
        <br />
        <span className="h-italic">Maya.</span>
      </h1>
    </div>
  );
}

function CardFace({
  side,
  tierName,
  subtitle,
  bg,
  accent,
  tagline,
  dataLines,
  ctaLabel,
}: {
  side: "front" | "back";
  tierName: string;
  subtitle: string;
  bg: string;
  accent: string;
  tagline: string;
  dataLines: [string, string][];
  ctaLabel?: string;
}) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        borderRadius: 22,
        overflow: "hidden",
        background: bg,
        color: "var(--ink)",
        padding: "22px 22px 20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        WebkitBackfaceVisibility: "hidden",
        backfaceVisibility: "hidden",
        transform: side === "back" ? "rotateY(180deg)" : "none",
        boxShadow: "0 18px 40px rgba(15,17,21,0.18)",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(900px 300px at 110% 110%, ${accent}, transparent 60%)`,
          opacity: 0.16,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "var(--mono)",
              fontSize: 10,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              opacity: 0.6,
            }}
          >
            NUWAI · {subtitle}
          </div>
          <div
            style={{
              fontFamily: "var(--display)",
              fontSize: 52,
              fontStyle: "italic",
              lineHeight: 1,
              color: accent,
              marginTop: 8,
            }}
          >
            {tierName}
          </div>
        </div>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            border: `1px solid ${accent}`,
            color: accent,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "var(--display)",
            fontStyle: "italic",
            fontSize: 20,
            paddingBottom: 2,
          }}
        >
          n
        </div>
      </div>
      <div style={{ position: "relative" }}>
        <div
          style={{
            fontFamily: "var(--display)",
            fontSize: 17,
            lineHeight: 1.2,
            marginBottom: 14,
            fontStyle: "italic",
            opacity: 0.85,
          }}
        >
          {tagline}
        </div>
        <div
          style={{ display: "flex", flexDirection: "column", gap: 5 }}
        >
          {dataLines.map(([k, v]) => (
            <div
              key={k}
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 12,
                fontFamily: "var(--mono)",
                letterSpacing: "0.04em",
              }}
            >
              <span style={{ opacity: 0.6, textTransform: "uppercase" }}>
                {k}
              </span>
              <span>{v}</span>
            </div>
          ))}
        </div>
        {ctaLabel && (
          <div
            style={{
              marginTop: 12,
              fontFamily: "var(--mono)",
              fontSize: 11,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: accent,
            }}
          >
            {ctaLabel}
          </div>
        )}
      </div>
    </div>
  );
}

function TierCardFlip() {
  const [flipped, setFlipped] = useState(false);
  return (
    <div style={{ padding: "0 18px", perspective: 1200 }}>
      <button
        onClick={() => setFlipped((f) => !f)}
        style={{
          all: "unset",
          cursor: "pointer",
          width: "100%",
          position: "relative",
          height: 200,
          transformStyle: "preserve-3d",
          transition: "transform 0.7s cubic-bezier(0.2, 0.8, 0.2, 1)",
          transform: flipped ? "rotateY(180deg)" : "none",
          display: "block",
        }}
      >
        <CardFace
          side="front"
          tierName="Select"
          subtitle="Your current tier"
          bg="var(--ocean)"
          accent="var(--gold)"
          tagline="The way to travel."
          dataLines={[
            ["Credit balance", "$340"],
            ["Active requests", "1 of 3"],
            ["Member since", "Oct 2025"],
          ]}
        />
        <CardFace
          side="back"
          tierName="Black"
          subtitle="By invitation"
          bg="var(--carbon)"
          accent="var(--gold)"
          tagline="When travel is the lifestyle."
          dataLines={[
            ["Top 1% advisors", "Always"],
            ["Concierge by name", "Dedicated"],
            ["Upgrades guaranteed", "Every stay"],
          ]}
          ctaLabel="Request invitation →"
        />
      </button>
      <div
        style={{
          marginTop: 10,
          display: "flex",
          justifyContent: "center",
          fontFamily: "var(--mono)",
          fontSize: 10,
          letterSpacing: "0.14em",
          color: "var(--mute)",
          textTransform: "uppercase",
        }}
      >
        {flipped ? "⇠ Tap to flip back" : "Tap to see Black tier ⇢"}
      </div>
    </div>
  );
}

function StatGrid() {
  const stats = [
    { k: "Wallet", v: "$340", s: "credits" },
    { k: "Trips", v: "2", s: "in 2026" },
    { k: "Lifetime", v: "$24k", s: "booked" },
  ];
  return (
    <div
      style={{
        margin: "20px 18px 4px",
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 1,
        background: "var(--hair)",
        borderRadius: 18,
        overflow: "hidden",
      }}
    >
      {stats.map((s) => (
        <div
          key={s.k}
          style={{ background: "var(--bone)", padding: "14px 14px" }}
        >
          <div
            style={{
              fontFamily: "var(--mono)",
              fontSize: 9.5,
              letterSpacing: "0.12em",
              color: "var(--mute)",
              textTransform: "uppercase",
            }}
          >
            {s.k}
          </div>
          <div
            style={{
              fontFamily: "var(--display)",
              fontSize: 26,
              lineHeight: 1,
              marginTop: 6,
            }}
          >
            {s.v}
          </div>
          <div style={{ fontSize: 11, color: "var(--mute)", marginTop: 2 }}>
            {s.s}
          </div>
        </div>
      ))}
    </div>
  );
}

function UpcomingList() {
  const trips = [
    {
      id: "t1",
      dest: "Tulum",
      when: "Mar 14 → 21",
      status: "Confirmed",
      img: "https://images.unsplash.com/photo-1510097467424-192d713fd8b2?w=800&auto=format&fit=crop",
    },
    {
      id: "t2",
      dest: "Lisbon",
      when: "Jun 8 → 13",
      status: "Planning",
      img: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=800&auto=format&fit=crop",
    },
  ];
  return (
    <section style={{ padding: "20px 18px 0" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 12,
        }}
      >
        <EyebrowLabel>Upcoming</EyebrowLabel>
        <button
          style={{
            all: "unset",
            cursor: "pointer",
            fontFamily: "var(--mono)",
            fontSize: 10.5,
            letterSpacing: "0.1em",
            color: "var(--mute)",
            textTransform: "uppercase",
          }}
        >
          See all
        </button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {trips.map((t) => (
          <div
            key={t.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: 10,
              borderRadius: 16,
              background: "var(--bone)",
              border: "1px solid var(--hair)",
            }}
          >
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: 12,
                flexShrink: 0,
                backgroundImage: `url(${t.img})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontFamily: "var(--display)",
                  fontSize: 22,
                  lineHeight: 1,
                }}
              >
                {t.dest}
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: "var(--mute)",
                  marginTop: 3,
                }}
              >
                {t.when}
              </div>
            </div>
            <span
              style={{
                fontFamily: "var(--mono)",
                fontSize: 9.5,
                letterSpacing: "0.1em",
                padding: "5px 8px",
                borderRadius: 999,
                background:
                  t.status === "Confirmed" ? "var(--ink)" : "var(--linen)",
                color:
                  t.status === "Confirmed" ? "var(--bone)" : "var(--ink)",
                textTransform: "uppercase",
              }}
            >
              {t.status}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

function SavedTrips() {
  const saved = [
    {
      d: "Amalfi",
      t: "A slow week",
      img: "https://images.unsplash.com/photo-1633321702518-7feccafb94d5?w=800&auto=format&fit=crop",
    },
    {
      d: "Tokyo",
      t: "Solo · 5 days",
      img: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&auto=format&fit=crop",
    },
    {
      d: "Bali",
      t: "Wellness retreat",
      img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&auto=format&fit=crop",
    },
  ];
  return (
    <section style={{ padding: "24px 0 0" }}>
      <div
        style={{
          padding: "0 18px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 12,
        }}
      >
        <EyebrowLabel>Saved for later</EyebrowLabel>
      </div>
      <div
        style={{
          display: "flex",
          overflowX: "auto",
          gap: 10,
          padding: "0 18px 4px",
          scrollbarWidth: "none",
        }}
      >
        {saved.map((s, i) => (
          <div
            key={i}
            style={{
              flex: "0 0 160px",
              height: 200,
              borderRadius: 16,
              overflow: "hidden",
              backgroundImage: `url(${s.img})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(180deg, transparent 50%, rgba(15,17,21,0.7))",
              }}
            />
            <div
              style={{
                position: "absolute",
                left: 10,
                bottom: 10,
                color: "var(--ink)",
              }}
            >
              <div style={{ fontFamily: "var(--display)", fontSize: 20 }}>
                {s.d}
              </div>
              <div style={{ fontSize: 11, opacity: 0.85 }}>{s.t}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function QuickActions() {
  const router = useRouter();
  const actions = [
    {
      l: "Plan a trip",
      i: "＋",
      onClick: () => router.push("/trip-request"),
    },
    { l: "Concierge", i: "✦", onClick: () => router.push("/concierge") },
    { l: "Browse", i: "⌖", onClick: () => router.push("/") },
  ];
  return (
    <section style={{ padding: "20px 18px 14px" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 8,
        }}
      >
        {actions.map((a) => (
          <button
            key={a.l}
            onClick={a.onClick}
            style={{
              all: "unset",
              cursor: "pointer",
              padding: "14px 12px",
              borderRadius: 16,
              background: "var(--bone)",
              border: "1px solid var(--hair)",
              display: "flex",
              flexDirection: "column",
              gap: 4,
              textAlign: "left",
            }}
          >
            <span
              style={{
                fontFamily: "var(--display)",
                fontSize: 22,
                lineHeight: 1,
              }}
            >
              {a.i}
            </span>
            <span style={{ fontSize: 12.5 }}>{a.l}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

export default function MembershipScreen() {
  return (
    <div className="nu-mobile-stage">
      <IOSDevice width={402} height={840} dark>
        <div style={memStyles.shell}>
          <div style={{ flex: 1, overflow: "auto", paddingBottom: 40 }}>
            <MemHeader />
            <TierCardFlip />
            <StatGrid />
            <UpcomingList />
            <SavedTrips />
            <QuickActions />
          </div>
        </div>
      </IOSDevice>
    </div>
  );
}
