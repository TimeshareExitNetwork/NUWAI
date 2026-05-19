"use client";

import { CSSProperties, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  EyebrowLabel,
  PillButton,
  Star,
  Wordmark,
} from "./brand";
import { IOSDevice } from "./ios-frame";
import { PROPOSALS, Proposal } from "@/lib/data";

const cmpStyles: Record<string, CSSProperties> = {
  shell: {
    height: "100%",
    width: "100%",
    background: "var(--bone)",
    color: "var(--ink)",
    display: "flex",
    flexDirection: "column",
    position: "relative",
  },
};

type View = "cards" | "matrix";

function CmpTabs({
  view,
  setView,
}: {
  view: View;
  setView: (v: View) => void;
}) {
  const tabs: { id: View; l: string }[] = [
    { id: "cards", l: "Cards" },
    { id: "matrix", l: "Side-by-side" },
  ];
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 4,
        padding: 4,
        borderRadius: 999,
        background: "var(--linen)",
        border: "1px solid var(--hair)",
      }}
    >
      {tabs.map((t) => (
        <button
          key={t.id}
          onClick={() => setView(t.id)}
          style={{
            all: "unset",
            cursor: "pointer",
            padding: "8px 14px",
            borderRadius: 999,
            fontSize: 12.5,
            background: view === t.id ? "var(--ink)" : "transparent",
            color: view === t.id ? "var(--bone)" : "var(--mute)",
            fontWeight: 500,
          }}
        >
          {t.l}
        </button>
      ))}
    </div>
  );
}

function BriefRecap() {
  return (
    <div
      style={{
        padding: "16px 18px",
        borderRadius: 18,
        background: "var(--carbon)",
        color: "var(--ink)",
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "var(--gold)",
          }}
        />
        <span
          style={{
            fontFamily: "var(--mono)",
            fontSize: 10,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "rgba(250,246,240,0.6)",
          }}
        >
          Your brief
        </span>
      </div>
      <div
        style={{
          fontFamily: "var(--display)",
          fontSize: 22,
          lineHeight: 1.15,
        }}
      >
        Tulum · Mar 14 → 21 · 2 travelers · $8–12k · slow, foodie, hidden.
      </div>
    </div>
  );
}

function CmpCard({
  p,
  idx,
  onOpen,
}: {
  p: Proposal;
  idx: number;
  onOpen: () => void;
}) {
  return (
    <article
      style={{
        flex: "0 0 86%",
        scrollSnapAlign: "start",
        background: "var(--bone)",
        borderRadius: 22,
        overflow: "hidden",
        border: "1px solid var(--hair)",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
        position: "relative",
      }}
    >
      <div
        style={{
          height: 180,
          backgroundImage: `url(${p.hotel.img})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
        }}
      >
        <span
          style={{
            position: "absolute",
            top: 12,
            left: 12,
            background: "rgba(10,11,15,0.6)",
            color: "var(--ink)",
            backdropFilter: "blur(10px)",
            padding: "5px 9px",
            borderRadius: 999,
            fontFamily: "var(--mono)",
            fontSize: 9.5,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            border: "0.5px solid rgba(242,235,221,0.2)",
          }}
        >
          {p.flag}
        </span>
        <span
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            fontFamily: "var(--mono)",
            fontSize: 10,
            letterSpacing: "0.12em",
            color: "var(--ink)",
            textShadow: "0 1px 2px rgba(0,0,0,0.5)",
            textTransform: "uppercase",
          }}
        >
          Plan 0{idx + 1}
        </span>
      </div>
      <div
        style={{
          padding: "18px 18px 16px",
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={p.advisor.avatar}
            alt=""
            style={{
              width: 24,
              height: 24,
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
          <span style={{ fontSize: 12 }}>{p.advisor.name}</span>
          <span
            style={{
              marginLeft: "auto",
              display: "flex",
              alignItems: "center",
              gap: 3,
              color: "var(--mute)",
              fontSize: 11,
            }}
          >
            <Star size={10} /> {p.advisor.rating}
          </span>
        </div>
        <h3
          style={{
            margin: 0,
            fontFamily: "var(--display)",
            fontSize: 26,
            lineHeight: 1.05,
            letterSpacing: "-0.01em",
            fontWeight: 400,
          }}
        >
          {p.title}
        </h3>
        <p
          style={{
            margin: 0,
            fontSize: 13,
            lineHeight: 1.4,
            color: "var(--mute)",
          }}
        >
          {p.headline}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {p.vibe.map((v) => (
            <span
              key={v}
              style={{
                fontFamily: "var(--mono)",
                fontSize: 9.5,
                letterSpacing: "0.08em",
                padding: "4px 8px",
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
            marginTop: 4,
            padding: "10px 12px",
            borderRadius: 12,
            background: "var(--linen)",
            borderLeft: "2px solid var(--gold)",
            fontFamily: "var(--display)",
            fontStyle: "italic",
            fontSize: 15,
            lineHeight: 1.3,
          }}
        >
          “{p.fit}”
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            paddingTop: 10,
            borderTop: "1px solid var(--hair)",
          }}
        >
          <div>
            <div style={{ fontSize: 11, color: "var(--mute)" }}>
              Total · 7 nights
            </div>
            <div
              style={{
                fontFamily: "var(--display)",
                fontSize: 28,
                lineHeight: 1,
              }}
            >
              ${p.price.toLocaleString()}
            </div>
            <div
              style={{
                fontSize: 11,
                color: "var(--mute)",
                marginTop: 2,
              }}
            >
              ${p.perPerson.toLocaleString()} / person
            </div>
          </div>
          <PillButton size="sm" onClick={onOpen}>
            Open <ArrowRight size={11} />
          </PillButton>
        </div>
      </div>
    </article>
  );
}

function CardScroller({ onOpen }: { onOpen: (p: Proposal) => void }) {
  return (
    <div
      style={{
        display: "flex",
        overflowX: "auto",
        gap: 14,
        padding: "0 18px 24px",
        scrollSnapType: "x mandatory",
        scrollbarWidth: "none",
      }}
    >
      {PROPOSALS.map((p, i) => (
        <CmpCard key={p.id} p={p} idx={i} onOpen={() => onOpen(p)} />
      ))}
    </div>
  );
}

function MatrixView({ onOpen }: { onOpen: (p: Proposal) => void }) {
  const rows: {
    k: string;
    pick: (p: Proposal) => string;
    sub?: (p: Proposal) => string;
  }[] = [
    {
      k: "Hotel",
      pick: (p) => p.hotel.name,
      sub: (p) => p.hotel.style,
    },
    {
      k: "Price (total)",
      pick: (p) => `$${p.price.toLocaleString()}`,
      sub: (p) => `$${p.perPerson.toLocaleString()} / pp`,
    },
    {
      k: "Vibe",
      pick: (p) => p.vibe[0],
      sub: (p) => p.vibe.slice(1).join(" · "),
    },
    {
      k: "Experiences",
      pick: (p) => `${p.experiences.length} included`,
      sub: (p) => p.experiences.slice(0, 2).join(", ") + "…",
    },
    {
      k: "Boat day",
      pick: (p) =>
        /boat|yacht|sailboat/i.test(p.itinerary.map((i) => i.body).join(" "))
          ? "Yes"
          : "No",
    },
    {
      k: "Beach club",
      pick: (p) =>
        /beach club|bonbonniere|bagatelle/i.test(
          p.itinerary.map((i) => i.body).join(" "),
        )
          ? "Yes"
          : "No",
    },
    { k: "Highlight", pick: (p) => p.flag },
  ];
  return (
    <div style={{ padding: "0 14px 24px" }}>
      <div
        style={{
          background: "var(--bone)",
          borderRadius: 18,
          overflow: "hidden",
          border: "1px solid var(--hair)",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "70px 1fr 1fr 1fr",
            borderBottom: "1px solid var(--hair)",
          }}
        >
          <div style={{ padding: 10 }} />
          {PROPOSALS.map((p) => (
            <button
              key={p.id}
              onClick={() => onOpen(p)}
              style={{
                all: "unset",
                cursor: "pointer",
                padding: "12px 8px",
                borderLeft: "1px solid var(--hair)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 6,
                textAlign: "center",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.advisor.avatar}
                alt=""
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
              <div
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 9,
                  letterSpacing: "0.1em",
                  color: "var(--mute)",
                  textTransform: "uppercase",
                }}
              >
                {p.flag}
              </div>
            </button>
          ))}
        </div>

        {rows.map((r, i) => (
          <div
            key={r.k}
            style={{
              display: "grid",
              gridTemplateColumns: "70px 1fr 1fr 1fr",
              borderBottom:
                i < rows.length - 1 ? "1px solid var(--hair)" : "0",
            }}
          >
            <div
              style={{
                padding: "12px 10px",
                fontFamily: "var(--mono)",
                fontSize: 9.5,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--mute)",
                alignSelf: "center",
              }}
            >
              {r.k}
            </div>
            {PROPOSALS.map((p) => (
              <div
                key={p.id}
                style={{
                  padding: "12px 8px",
                  borderLeft: "1px solid var(--hair)",
                  fontSize: 12,
                  lineHeight: 1.3,
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--display)",
                    fontSize: 15,
                    lineHeight: 1.15,
                  }}
                >
                  {r.pick(p)}
                </div>
                {r.sub && (
                  <div
                    style={{
                      fontSize: 10.5,
                      color: "var(--mute)",
                      marginTop: 3,
                    }}
                  >
                    {r.sub(p)}
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function ProposalDetail({
  p,
  onClose,
  onChoose,
}: {
  p: Proposal;
  onClose: () => void;
  onChoose: () => void;
}) {
  const router = useRouter();
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 30,
        background: "var(--bone)",
        display: "flex",
        flexDirection: "column",
        animation: "nuwai-slide-up 0.35s cubic-bezier(0.2, 0.8, 0.2, 1)",
      }}
    >
      <style>{`
        @keyframes nuwai-slide-up {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>

      <div
        style={{
          height: 260,
          position: "relative",
          backgroundImage: `url(${p.hotel.img})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(10,10,10,0.4) 0%, transparent 30%, transparent 60%, rgba(10,10,10,0.5) 100%)",
          }}
        />
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 54,
            left: 16,
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: "rgba(250,246,240,0.9)",
            border: 0,
            backdropFilter: "blur(10px)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14">
            <path
              d="M2 2l10 10M12 2L2 12"
              stroke="var(--ink)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
        <div
          style={{
            position: "absolute",
            left: 18,
            right: 18,
            bottom: 18,
            color: "var(--ink)",
          }}
        >
          <div
            style={{
              fontFamily: "var(--mono)",
              fontSize: 10,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              opacity: 0.85,
            }}
          >
            {p.hotel.name} · {p.hotel.style}
          </div>
          <div
            style={{
              fontFamily: "var(--display)",
              fontSize: 34,
              lineHeight: 1.05,
              marginTop: 6,
              letterSpacing: "-0.01em",
            }}
          >
            {p.title}
          </div>
        </div>
      </div>

      <div style={{ flex: 1, overflow: "auto", padding: "18px 18px 12px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "14px 14px",
            borderRadius: 14,
            background: "var(--linen)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={p.advisor.avatar}
            alt=""
            style={{
              width: 42,
              height: 42,
              borderRadius: "50%",
              objectFit: "cover",
              border: "2px solid var(--bone)",
            }}
          />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13.5 }}>{p.advisor.name}</div>
            <div
              style={{
                fontSize: 11,
                color: "var(--mute)",
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              {p.advisor.city} · {p.advisor.trips} trips ·{" "}
              <Star size={9} /> {p.advisor.rating}
            </div>
          </div>
          <button
            onClick={() => router.push("/concierge")}
            style={{
              all: "unset",
              cursor: "pointer",
              fontSize: 12,
              fontFamily: "var(--mono)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--ink)",
              textDecoration: "underline",
              textUnderlineOffset: 3,
            }}
          >
            Message
          </button>
        </div>

        <section style={{ marginTop: 24 }}>
          <EyebrowLabel>Why this trip</EyebrowLabel>
          <div
            style={{
              marginTop: 10,
              fontFamily: "var(--display)",
              fontSize: 22,
              lineHeight: 1.25,
              fontStyle: "italic",
              color: "var(--ink)",
            }}
          >
            “{p.fit}”
          </div>
        </section>

        <section style={{ marginTop: 28 }}>
          <EyebrowLabel>Itinerary · 7 days</EyebrowLabel>
          <div
            style={{
              marginTop: 14,
              display: "flex",
              flexDirection: "column",
            }}
          >
            {p.itinerary.map((d, i) => (
              <div
                key={d.day}
                style={{
                  display: "grid",
                  gridTemplateColumns: "52px 1fr",
                  padding: "14px 0",
                  borderBottom:
                    i < p.itinerary.length - 1
                      ? "1px solid var(--hair)"
                      : "0",
                  gap: 12,
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: 10.5,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--mute)",
                    paddingTop: 2,
                  }}
                >
                  {d.day.replace("Day ", "D · ")}
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: "var(--display)",
                      fontSize: 18,
                      marginBottom: 2,
                    }}
                  >
                    {d.t}
                  </div>
                  <div
                    style={{
                      fontSize: 12.5,
                      color: "var(--mute)",
                      lineHeight: 1.4,
                    }}
                  >
                    {d.body}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginTop: 28 }}>
          <EyebrowLabel>Experiences</EyebrowLabel>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 8,
              marginTop: 12,
            }}
          >
            {p.experiences.map((e) => (
              <span
                key={e}
                style={{
                  padding: "8px 12px",
                  borderRadius: 999,
                  background: "var(--linen)",
                  fontSize: 12.5,
                }}
              >
                {e}
              </span>
            ))}
          </div>
        </section>

        <section style={{ marginTop: 28 }}>
          <EyebrowLabel>Upgrades you can add</EyebrowLabel>
          <div
            style={{
              marginTop: 12,
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            {p.upgrades.map((u) => (
              <div
                key={u.name}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "14px 16px",
                  borderRadius: 14,
                  background: "var(--bone)",
                  border: "1px solid var(--hair)",
                }}
              >
                <div>
                  <div style={{ fontSize: 13.5 }}>{u.name}</div>
                  <div style={{ fontSize: 11, color: "var(--mute)" }}>
                    Add to trip
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <span
                    style={{ fontFamily: "var(--display)", fontSize: 16 }}
                  >
                    +${u.delta.toLocaleString()}
                  </span>
                  <button
                    style={{
                      all: "unset",
                      cursor: "pointer",
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      background: "var(--ink)",
                      color: "var(--linen)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 16,
                      lineHeight: 1,
                    }}
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginTop: 28, marginBottom: 12 }}>
          <EyebrowLabel>Where the money goes</EyebrowLabel>
          <div
            style={{
              marginTop: 12,
              padding: "14px 16px",
              borderRadius: 14,
              background: "var(--linen)",
            }}
          >
            {p.breakdown.map((row, i) => (
              <div
                key={row.k}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "8px 0",
                  borderBottom:
                    i < p.breakdown.length - 1
                      ? "1px solid var(--hair)"
                      : "0",
                  fontSize: 13,
                }}
              >
                <span style={{ color: "var(--mute)" }}>{row.k}</span>
                <span style={{ fontFamily: "var(--display)", fontSize: 15 }}>
                  ${row.v.toLocaleString()}
                </span>
              </div>
            ))}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                paddingTop: 12,
                marginTop: 4,
                borderTop: "1px solid var(--ink)",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 10.5,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                }}
              >
                Total
              </span>
              <span style={{ fontFamily: "var(--display)", fontSize: 26 }}>
                ${p.price.toLocaleString()}
              </span>
            </div>
          </div>
        </section>
      </div>

      <div
        style={{
          padding: "12px 16px 26px",
          borderTop: "1px solid var(--hair)",
          background: "var(--bone)",
          display: "flex",
          gap: 10,
          alignItems: "center",
        }}
      >
        <button
          onClick={() => router.push("/concierge")}
          style={{
            all: "unset",
            cursor: "pointer",
            padding: "14px 16px",
            borderRadius: 999,
            border: "1px solid var(--hair)",
            background: "var(--bone)",
            color: "var(--ink)",
            fontSize: 13,
            display: "flex",
            gap: 8,
            alignItems: "center",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M2 4h10v5H7l-3 3V9H2V4z"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinejoin="round"
            />
          </svg>
          Ask
        </button>
        <PillButton
          size="md"
          onClick={onChoose}
          style={{ flex: 1, justifyContent: "center" }}
        >
          Choose this trip <ArrowRight />
        </PillButton>
      </div>
    </div>
  );
}

function ChosenOverlay({
  p,
  onClose,
}: {
  p: Proposal;
  onClose: () => void;
}) {
  const router = useRouter();
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 40,
        background: "var(--carbon)",
        color: "var(--ink)",
        display: "flex",
        flexDirection: "column",
        animation: "nuwai-fade-in 0.45s ease",
      }}
    >
      <style>{`
        @keyframes nuwai-fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes nuwai-mark-in {
          from { transform: scale(0.85); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
      <button
        onClick={onClose}
        style={{
          position: "absolute",
          top: 54,
          right: 18,
          background: "transparent",
          border: 0,
          color: "var(--ink)",
          fontFamily: "var(--mono)",
          fontSize: 11,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          cursor: "pointer",
          opacity: 0.6,
        }}
      >
        Close
      </button>
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 28,
        }}
      >
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            border: "1px solid rgba(250,246,240,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 28,
            animation: "nuwai-mark-in 0.5s 0.1s both",
          }}
        >
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path
              d="M6 16l7 7L26 9"
              stroke="var(--gold)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <EyebrowLabel color="var(--gold)">Trip chosen</EyebrowLabel>
        <h1
          className="h-display"
          style={{
            fontSize: 44,
            margin: "14px 0 14px",
            letterSpacing: "-0.02em",
            color: "var(--ink)",
            lineHeight: 1,
          }}
        >
          <span className="h-italic">{p.title}.</span>
        </h1>
        <p
          style={{
            margin: 0,
            color: "rgba(250,246,240,0.7)",
            fontSize: 14.5,
            lineHeight: 1.5,
          }}
        >
          {p.advisor.name} has been notified and will reach out to confirm
          everything within an hour. We’ll hold {p.hotel.name} for 48 hours.
        </p>
      </div>
      <div
        style={{
          padding: "12px 20px 30px",
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        <PillButton
          size="lg"
          variant="invert"
          onClick={() => router.push("/concierge")}
          style={{ width: "100%", justifyContent: "center" }}
        >
          Open chat with {p.advisor.name.split(" ")[0]} <ArrowRight />
        </PillButton>
        <button
          onClick={() => router.push("/membership")}
          style={{
            all: "unset",
            cursor: "pointer",
            textAlign: "center",
            padding: 12,
            color: "rgba(250,246,240,0.7)",
            fontSize: 13,
          }}
        >
          View in my trips →
        </button>
      </div>
    </div>
  );
}

export default function ComparisonScreen() {
  const router = useRouter();
  const [view, setView] = useState<View>("cards");
  const [open, setOpen] = useState<Proposal | null>(null);
  const [chosen, setChosen] = useState<Proposal | null>(null);

  return (
    <div className="nu-mobile-stage">
      <IOSDevice width={402} height={840} dark>
        <div style={cmpStyles.shell}>
          <div
            style={{
              padding: "54px 18px 12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <button
              onClick={() => router.push("/trip-request")}
              style={{
                all: "unset",
                cursor: "pointer",
                padding: 8,
                margin: -8,
                color: "var(--ink)",
              }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M12 5l-5 5 5 5"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <Wordmark size={20} />
            <button
              onClick={() => router.push("/concierge")}
              style={{
                all: "unset",
                cursor: "pointer",
                fontFamily: "var(--mono)",
                fontSize: 11,
                letterSpacing: "0.1em",
                color: "var(--ink)",
                textTransform: "uppercase",
              }}
            >
              Help
            </button>
          </div>

          <div style={{ padding: "14px 18px 18px" }}>
            <EyebrowLabel>3 proposals · in by 11:42 am</EyebrowLabel>
            <h1
              className="h-display"
              style={{
                fontSize: 34,
                margin: "10px 0 14px",
                letterSpacing: "-0.02em",
                lineHeight: 1.04,
              }}
            >
              Three takes on
              <br />
              <span className="h-italic">your Tulum week.</span>
            </h1>
            <BriefRecap />
            <div
              style={{
                marginTop: 16,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <CmpTabs view={view} setView={setView} />
              <span
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 10,
                  letterSpacing: "0.12em",
                  color: "var(--mute)",
                  textTransform: "uppercase",
                }}
              >
                Swipe →
              </span>
            </div>
          </div>

          <div style={{ flex: 1, overflow: "auto", paddingBottom: 24 }}>
            {view === "cards" && <CardScroller onOpen={setOpen} />}
            {view === "matrix" && <MatrixView onOpen={setOpen} />}
          </div>

          {open && (
            <ProposalDetail
              p={open}
              onClose={() => setOpen(null)}
              onChoose={() => {
                setChosen(open);
                setOpen(null);
              }}
            />
          )}
          {chosen && (
            <ChosenOverlay p={chosen} onClose={() => setChosen(null)} />
          )}
        </div>
      </IOSDevice>
    </div>
  );
}
