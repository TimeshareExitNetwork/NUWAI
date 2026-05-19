"use client";

import { CSSProperties, useState } from "react";
import {
  ArrowRight,
  EyebrowLabel,
  PillButton,
  Wordmark,
} from "./brand";
import { ADVISORS_INBOX } from "@/lib/data";

const advStyles: Record<string, CSSProperties> = {
  shell: {
    width: "100%",
    minHeight: "100vh",
    background: "var(--linen)",
    color: "var(--ink)",
    display: "flex",
    flexDirection: "column",
  },
};

function AdvSidebar() {
  const items: { l: string; n: number | string; on?: boolean }[] = [
    { l: "Inbox", n: 4, on: true },
    { l: "Drafting", n: 1 },
    { l: "Submitted", n: 2 },
    { l: "Won", n: 38 },
    { l: "Travelers", n: "" },
    { l: "Earnings", n: "" },
    { l: "Settings", n: "" },
  ];
  return (
    <aside
      style={{
        width: 240,
        flexShrink: 0,
        padding: "28px 18px",
        borderRight: "1px solid var(--hair)",
        display: "flex",
        flexDirection: "column",
        gap: 8,
        background: "var(--bone)",
      }}
    >
      <div
        style={{
          padding: "4px 8px 18px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Wordmark size={22} />
        <span
          style={{
            fontFamily: "var(--mono)",
            fontSize: 9,
            letterSpacing: "0.14em",
            color: "var(--mute)",
            textTransform: "uppercase",
          }}
        >
          Advisors
        </span>
      </div>
      {items.map((it) => (
        <button
          key={it.l}
          style={{
            all: "unset",
            cursor: "pointer",
            padding: "10px 12px",
            borderRadius: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: it.on ? "var(--ink)" : "transparent",
            color: it.on ? "var(--bone)" : "var(--ink)",
            fontSize: 13.5,
          }}
        >
          <span>{it.l}</span>
          {it.n !== "" && (
            <span
              style={{
                fontFamily: "var(--mono)",
                fontSize: 10.5,
                opacity: it.on ? 0.7 : 0.5,
              }}
            >
              {it.n}
            </span>
          )}
        </button>
      ))}
      <div style={{ flex: 1 }} />
      <div
        style={{
          marginTop: 18,
          padding: 14,
          borderRadius: 14,
          background: "var(--linen)",
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        <div
          style={{ fontFamily: "var(--display)", fontSize: 18, lineHeight: 1.1 }}
        >
          Top 5% advisor
        </div>
        <div
          style={{ fontSize: 11.5, color: "var(--mute)", lineHeight: 1.4 }}
        >
          You’re seeing 28% more requests than peers this month.
        </div>
      </div>
      <div
        style={{
          marginTop: 14,
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "8px",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop"
          alt=""
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 12.5 }}>Sofía Marín</div>
          <div style={{ fontSize: 10, color: "var(--mute)" }}>
            Mexico City · Latin Am
          </div>
        </div>
      </div>
    </aside>
  );
}

function AdvTopbar() {
  return (
    <div
      style={{
        padding: "24px 32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "1px solid var(--hair)",
        background: "var(--bone)",
      }}
    >
      <div>
        <EyebrowLabel>Marketplace · live</EyebrowLabel>
        <h1
          className="h-display"
          style={{
            fontSize: 38,
            margin: "8px 0 0",
            letterSpacing: "-0.01em",
            lineHeight: 1,
          }}
        >
          <span className="h-italic">Inbox.</span>
        </h1>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "8px 14px",
            borderRadius: 999,
            background: "var(--linen)",
            border: "1px solid var(--hair)",
            fontSize: 12.5,
            color: "var(--mute)",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="6" cy="6" r="4" stroke="currentColor" strokeWidth="1.3" />
            <path
              d="M9 9l3.5 3.5"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
            />
          </svg>
          Search requests…
        </div>
        <PillButton size="sm" variant="ghost">
          Filters
        </PillButton>
        <PillButton size="sm">
          + New proposal <ArrowRight size={11} />
        </PillButton>
      </div>
    </div>
  );
}

function AdvStats() {
  const stats = [
    { k: "Open requests", v: "4", s: "+1 today" },
    { k: "Win rate", v: "38%", s: "last 30 days" },
    { k: "Avg. response", v: "14h", s: "NUWAI avg: 22h" },
    { k: "This month", v: "$28k", s: "commissions" },
  ];
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 1,
        background: "var(--hair)",
        margin: "24px 32px 0",
        borderRadius: 18,
        overflow: "hidden",
      }}
    >
      {stats.map((s) => (
        <div
          key={s.k}
          style={{ background: "var(--bone)", padding: "20px 22px" }}
        >
          <div
            style={{
              fontFamily: "var(--mono)",
              fontSize: 10,
              letterSpacing: "0.14em",
              color: "var(--mute)",
              textTransform: "uppercase",
            }}
          >
            {s.k}
          </div>
          <div
            style={{
              fontFamily: "var(--display)",
              fontSize: 40,
              lineHeight: 1,
              marginTop: 8,
              letterSpacing: "-0.01em",
            }}
          >
            {s.v}
          </div>
          <div style={{ fontSize: 11.5, color: "var(--mute)", marginTop: 4 }}>
            {s.s}
          </div>
        </div>
      ))}
    </div>
  );
}

function AdvInbox({
  current,
  onPick,
}: {
  current: string | null;
  onPick: (id: string) => void;
}) {
  return (
    <div
      style={{
        margin: "24px 32px 32px",
        background: "var(--bone)",
        borderRadius: 18,
        overflow: "hidden",
        border: "1px solid var(--hair)",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "60px 1.2fr 1fr 1fr 1fr 0.7fr 0.7fr 0.6fr",
          padding: "12px 20px",
          borderBottom: "1px solid var(--hair)",
          fontFamily: "var(--mono)",
          fontSize: 10,
          letterSpacing: "0.12em",
          color: "var(--mute)",
          textTransform: "uppercase",
        }}
      >
        <span>Match</span>
        <span>Traveler</span>
        <span>Destination</span>
        <span>Budget</span>
        <span>Vibe</span>
        <span>Posted</span>
        <span>Deadline</span>
        <span style={{ textAlign: "right" }}>Status</span>
      </div>
      {ADVISORS_INBOX.map((r, i) => {
        const isCurrent = current === r.id;
        return (
          <button
            key={r.id}
            onClick={() => onPick(r.id)}
            style={{
              all: "unset",
              cursor: "pointer",
              display: "grid",
              gridTemplateColumns:
                "60px 1.2fr 1fr 1fr 1fr 0.7fr 0.7fr 0.6fr",
              padding: "18px 20px",
              width: "100%",
              borderBottom:
                i < ADVISORS_INBOX.length - 1
                  ? "1px solid var(--hair)"
                  : "0",
              background: isCurrent ? "var(--linen)" : "transparent",
              alignItems: "center",
              fontSize: 14,
            }}
          >
            <span>
              <span
                style={{
                  fontFamily: "var(--display)",
                  fontSize: 18,
                  color: r.match >= 90 ? "var(--ocean)" : "var(--ink)",
                }}
              >
                {r.match}
                <span style={{ fontSize: 11, color: "var(--mute)" }}>%</span>
              </span>
            </span>
            <span>
              <span style={{ fontFamily: "var(--display)", fontSize: 18 }}>
                {r.traveler}
              </span>
            </span>
            <span>{r.dest}</span>
            <span style={{ fontFamily: "var(--mono)", fontSize: 12 }}>
              {r.budget}
            </span>
            <span style={{ fontSize: 12.5, color: "var(--mute)" }}>
              {r.vibe}
            </span>
            <span style={{ fontSize: 12, color: "var(--mute)" }}>
              {r.posted}
            </span>
            <span
              style={{
                fontFamily: "var(--mono)",
                fontSize: 12,
                color:
                  r.deadline !== "—" && r.deadline.includes("24h")
                    ? "var(--gold)"
                    : "var(--ink)",
              }}
            >
              {r.deadline}
            </span>
            <span style={{ textAlign: "right" }}>
              <span
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 9.5,
                  letterSpacing: "0.1em",
                  padding: "4px 8px",
                  borderRadius: 999,
                  textTransform: "uppercase",
                  background:
                    r.status === "New" ? "var(--ink)" : "var(--linen)",
                  color: r.status === "New" ? "var(--bone)" : "var(--ink)",
                  border: r.status === "New" ? "0" : "1px solid var(--hair)",
                }}
              >
                {r.status}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}

function AdvDetail({
  id,
  onClose,
}: {
  id: string;
  onClose: () => void;
}) {
  const r = ADVISORS_INBOX.find((x) => x.id === id) || ADVISORS_INBOX[0];
  return (
    <aside
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        bottom: 0,
        width: 460,
        background: "var(--bone)",
        borderLeft: "1px solid var(--hair)",
        boxShadow: "-20px 0 60px rgba(15,17,21,0.12)",
        display: "flex",
        flexDirection: "column",
        zIndex: 30,
        transform: "translateX(0)",
        animation: "adv-slide 0.35s cubic-bezier(0.2, 0.8, 0.2, 1)",
      }}
    >
      <style>{`
        @keyframes adv-slide {
          from { transform: translateX(40px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
      <div
        style={{
          padding: "24px 24px 14px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          borderBottom: "1px solid var(--hair)",
        }}
      >
        <div>
          <EyebrowLabel>Trip request · {r.posted}</EyebrowLabel>
          <h2
            className="h-display"
            style={{
              fontSize: 32,
              margin: "8px 0 4px",
              letterSpacing: "-0.01em",
              lineHeight: 1.05,
            }}
          >
            {r.traveler} → <span className="h-italic">{r.dest}</span>
          </h2>
          <div style={{ fontSize: 12.5, color: "var(--mute)" }}>
            {r.travelers} travelers · {r.budget} · {r.vibe}
          </div>
        </div>
        <button
          onClick={onClose}
          style={{
            all: "unset",
            cursor: "pointer",
            padding: 8,
            margin: -8,
            color: "var(--mute)",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16">
            <path
              d="M3 3l10 10M13 3L3 13"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      <div style={{ flex: 1, overflow: "auto", padding: "20px 24px" }}>
        <section style={{ marginBottom: 24 }}>
          <EyebrowLabel>Brief in their words</EyebrowLabel>
          <div
            style={{
              marginTop: 10,
              padding: "14px 16px",
              borderRadius: 14,
              background: "var(--linen)",
              fontFamily: "var(--display)",
              fontSize: 19,
              lineHeight: 1.3,
              fontStyle: "italic",
            }}
          >
            “Slow mornings, a couple of beach club afternoons, one big night
            out. We want to feel hidden, not on a strip. Foodie. Open to
            anything that’s not generic.”
          </div>
        </section>

        <section style={{ marginBottom: 24 }}>
          <EyebrowLabel>Structured</EyebrowLabel>
          <div
            style={{
              marginTop: 10,
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 8,
            }}
          >
            {(
              [
                ["Destination", r.dest],
                ["Travelers", `${r.travelers} (couple)`],
                ["Window", "Mar 14 → 21"],
                ["Flex", "±2 days"],
                ["Budget", r.budget + " all-in"],
                ["Hotel", "Boutique · design"],
                ["Vibe", r.vibe],
                ["Avoid", "Strip, all-inclusives"],
              ] as [string, string][]
            ).map(([k, v]) => (
              <div
                key={k}
                style={{
                  padding: "10px 12px",
                  borderRadius: 10,
                  background: "var(--linen)",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: 9.5,
                    letterSpacing: "0.1em",
                    color: "var(--mute)",
                    textTransform: "uppercase",
                  }}
                >
                  {k}
                </div>
                <div style={{ fontSize: 13, marginTop: 2 }}>{v}</div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: 24 }}>
          <EyebrowLabel>Match analysis</EyebrowLabel>
          <div
            style={{
              marginTop: 10,
              padding: "14px 16px",
              borderRadius: 14,
              background: "var(--carbon)",
              color: "var(--ink)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: 12,
                marginBottom: 8,
              }}
            >
              <span
                style={{
                  fontFamily: "var(--display)",
                  fontSize: 40,
                  color: "var(--gold)",
                  lineHeight: 1,
                }}
              >
                {r.match}%
              </span>
              <span
                style={{ fontSize: 12, color: "rgba(251,248,241,0.7)" }}
              >
                fit for your specialties
              </span>
            </div>
            <div
              style={{
                fontSize: 12.5,
                lineHeight: 1.5,
                color: "rgba(251,248,241,0.85)",
              }}
            >
              You’ve booked Habitas, Azulik, Casa Malca multiple times.
              You’ve worked with couples in this budget band 12 times in the
              last year (avg. NPS 9.4).
            </div>
          </div>
        </section>

        <section style={{ marginBottom: 24 }}>
          <EyebrowLabel>Other advisors on this</EyebrowLabel>
          <div
            style={{
              marginTop: 10,
              display: "flex",
              gap: 6,
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex" }}>
              {[
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&auto=format&fit=crop",
              ].map((src, i) => (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  key={i}
                  src={src}
                  alt=""
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "2px solid var(--bone)",
                    marginLeft: i > 0 ? -8 : 0,
                  }}
                />
              ))}
            </div>
            <span style={{ fontSize: 12.5, color: "var(--mute)" }}>
              2 other advisors invited · 1 proposal in
            </span>
          </div>
        </section>
      </div>

      <div
        style={{
          padding: "14px 24px 18px",
          borderTop: "1px solid var(--hair)",
          display: "flex",
          gap: 10,
          alignItems: "center",
        }}
      >
        <button
          style={{
            all: "unset",
            cursor: "pointer",
            padding: "12px 16px",
            borderRadius: 999,
            border: "1px solid var(--hair)",
            fontSize: 13,
            color: "var(--ink)",
          }}
        >
          Decline
        </button>
        <PillButton size="md" style={{ flex: 1, justifyContent: "center" }}>
          Start proposal <ArrowRight />
        </PillButton>
      </div>
    </aside>
  );
}

export default function AdvisorScreen() {
  const [picked, setPicked] = useState<string | null>(null);
  return (
    <div style={advStyles.shell}>
      <div style={{ display: "flex", flex: 1, minHeight: "100vh" }}>
        <AdvSidebar />
        <main style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <AdvTopbar />
          <AdvStats />
          <div
            style={{
              padding: "24px 32px 12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <EyebrowLabel>
              4 open requests · in your area of practice
            </EyebrowLabel>
            <div style={{ display: "flex", gap: 8 }}>
              {["All", "Mexico", "Mediterranean", "Asia"].map((t, i) => (
                <button
                  key={t}
                  style={{
                    all: "unset",
                    cursor: "pointer",
                    padding: "6px 12px",
                    borderRadius: 999,
                    background: i === 0 ? "var(--ink)" : "transparent",
                    color: i === 0 ? "var(--bone)" : "var(--mute)",
                    border: i === 0 ? "0" : "1px solid var(--hair)",
                    fontSize: 12,
                  }}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <AdvInbox current={picked} onPick={setPicked} />
        </main>
      </div>
      {picked && <AdvDetail id={picked} onClose={() => setPicked(null)} />}
    </div>
  );
}
