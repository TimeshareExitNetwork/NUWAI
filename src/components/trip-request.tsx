"use client";

import { CSSProperties, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, EyebrowLabel, PillButton } from "./brand";
import { IOSDevice } from "./ios-frame";
import { VIBES } from "@/lib/data";

const STEPS = [
  {
    id: "destination",
    label: "Where",
    prompt: "Where do you want to be?",
    sub: "Country, city, or a feeling. We’ll help.",
  },
  {
    id: "dates",
    label: "When",
    prompt: "When are you thinking?",
    sub: "Exact dates or a window — both are fine.",
  },
  {
    id: "travelers",
    label: "Who",
    prompt: "Who’s coming?",
    sub: "Adults, kids, vibe of the group.",
  },
  {
    id: "budget",
    label: "Budget",
    prompt: "What’s your number?",
    sub: "Total trip cost, all-in. Honesty unlocks better plans.",
  },
  {
    id: "vibe",
    label: "Vibe",
    prompt: "What kind of trip is this?",
    sub: "Pick a few. The contradictions are the point.",
  },
  {
    id: "hotel",
    label: "Hotel",
    prompt: "How do you sleep when you travel?",
    sub: "We match advisors to the room you actually want.",
  },
] as const;

const tripStyles: Record<string, CSSProperties> = {
  shell: {
    height: "100%",
    width: "100%",
    background: "var(--bone)",
    color: "var(--ink)",
    display: "flex",
    flexDirection: "column",
    fontFamily: "var(--body)",
  },
  topbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "54px 20px 0",
  },
  body: { flex: 1, overflow: "auto", padding: "24px 22px 16px" },
  footer: {
    padding: "14px 20px 30px",
    background:
      "linear-gradient(180deg, rgba(250,246,240,0) 0%, var(--bone) 24%)",
    display: "flex",
    flexDirection: "column",
    gap: 14,
  },
};

const QUICK_DEST = [
  {
    city: "Tulum",
    country: "Mexico",
    img: "https://images.unsplash.com/photo-1510097467424-192d713fd8b2?w=800&auto=format&fit=crop",
  },
  {
    city: "Amalfi",
    country: "Italy",
    img: "https://images.unsplash.com/photo-1633321702518-7feccafb94d5?w=800&auto=format&fit=crop",
  },
  {
    city: "Bali",
    country: "Indonesia",
    img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&auto=format&fit=crop",
  },
  {
    city: "Tokyo",
    country: "Japan",
    img: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&auto=format&fit=crop",
  },
  {
    city: "Cabo",
    country: "Mexico",
    img: "https://images.unsplash.com/photo-1597211833712-5e41faa202ea?w=800&auto=format&fit=crop",
  },
  {
    city: "Lisbon",
    country: "Portugal",
    img: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=800&auto=format&fit=crop",
  },
];

type FormState = {
  destination: { text: string };
  dates: { preset: string };
  travelers: { shape?: string; adults: number; kids: number };
  budget: { total: number; band?: string };
  vibe: { tags: string[]; notes?: string };
  hotel: { style: string };
};

function TopBar({
  stepIdx,
  onBack,
  onClose,
}: {
  stepIdx: number;
  onBack: () => void;
  onClose: () => void;
}) {
  return (
    <div style={tripStyles.topbar}>
      <button
        onClick={onBack}
        aria-label="Back"
        style={{
          border: 0,
          background: "transparent",
          padding: 8,
          margin: -8,
          color: "var(--ink)",
          cursor: "pointer",
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
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        {STEPS.map((s, i) => (
          <span
            key={s.id}
            style={{
              width: i === stepIdx ? 22 : 6,
              height: 6,
              borderRadius: 999,
              background: i <= stepIdx ? "var(--ink)" : "var(--hair)",
              transition: "all 0.3s ease",
            }}
          />
        ))}
      </div>
      <button
        onClick={onClose}
        aria-label="Close"
        style={{
          border: 0,
          background: "transparent",
          padding: 8,
          margin: -8,
          color: "var(--mute)",
          cursor: "pointer",
          fontFamily: "var(--mono)",
          fontSize: 11,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
        }}
      >
        Save
      </button>
    </div>
  );
}

function StepHeader({
  step,
  idx,
}: {
  step: (typeof STEPS)[number];
  idx: number;
}) {
  return (
    <div style={{ marginBottom: 28 }}>
      <div
        style={{
          fontFamily: "var(--mono)",
          fontSize: 10.5,
          letterSpacing: "0.16em",
          color: "var(--mute)",
          textTransform: "uppercase",
        }}
      >
        Step {String(idx + 1).padStart(2, "0")} / 06 · {step.label}
      </div>
      <h1
        className="h-display"
        style={{
          fontSize: 44,
          margin: "14px 0 8px",
          letterSpacing: "-0.02em",
        }}
      >
        {step.prompt}
      </h1>
      <p
        style={{
          margin: 0,
          fontSize: 15,
          color: "var(--mute)",
          lineHeight: 1.45,
        }}
      >
        {step.sub}
      </p>
    </div>
  );
}

function FieldShell({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) {
  return (
    <div
      style={{
        background: "var(--linen)",
        borderRadius: 18,
        padding: "14px 16px",
        display: "flex",
        flexDirection: "column",
        gap: 6,
      }}
    >
      <span
        style={{
          fontFamily: "var(--mono)",
          fontSize: 10,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "var(--mute)",
        }}
      >
        {label}
      </span>
      {children}
    </div>
  );
}

function DestinationStep({
  value,
  onChange,
}: {
  value: FormState["destination"];
  onChange: (v: FormState["destination"]) => void;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      <FieldShell label="Searching for">
        <input
          autoFocus
          value={value.text}
          onChange={(e) => onChange({ ...value, text: e.target.value })}
          placeholder="e.g. Tulum, somewhere warm, an island…"
          style={{
            border: 0,
            background: "transparent",
            outline: "none",
            fontFamily: "var(--display)",
            fontSize: 28,
            color: "var(--ink)",
            padding: 0,
            width: "100%",
          }}
        />
      </FieldShell>
      <div>
        <div
          style={{
            fontFamily: "var(--mono)",
            fontSize: 11,
            letterSpacing: "0.12em",
            color: "var(--mute)",
            textTransform: "uppercase",
            marginBottom: 12,
          }}
        >
          In season this month
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 10,
          }}
        >
          {QUICK_DEST.map((d) => {
            const on = value.text.toLowerCase() === d.city.toLowerCase();
            return (
              <button
                key={d.city}
                onClick={() => onChange({ ...value, text: d.city })}
                style={{
                  all: "unset",
                  cursor: "pointer",
                  height: 120,
                  borderRadius: 16,
                  overflow: "hidden",
                  position: "relative",
                  backgroundImage: `url(${d.img})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  boxShadow: on ? "0 0 0 3px var(--ink)" : "none",
                  transition: "box-shadow 0.15s",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(180deg, transparent 40%, rgba(10,10,10,0.7))",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    left: 12,
                    bottom: 10,
                    color: "var(--ink)",
                  }}
                >
                  <div
                    style={{ fontFamily: "var(--display)", fontSize: 22 }}
                  >
                    {d.city}
                  </div>
                  <div style={{ fontSize: 11, opacity: 0.8 }}>{d.country}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function DatesStep({
  value,
  onChange,
}: {
  value: FormState["dates"];
  onChange: (v: FormState["dates"]) => void;
}) {
  const presets = [
    { id: "weekend", l: "A long weekend", s: "3 nights" },
    { id: "week", l: "A full week", s: "7 nights" },
    { id: "twoweeks", l: "Two weeks", s: "14 nights" },
    { id: "custom", l: "Specific dates", s: "Pick a range" },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      <FieldShell label="Approach">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 8,
            marginTop: 6,
          }}
        >
          {presets.map((p) => {
            const on = value.preset === p.id;
            return (
              <button
                key={p.id}
                onClick={() => onChange({ ...value, preset: p.id })}
                style={{
                  all: "unset",
                  cursor: "pointer",
                  padding: "14px 14px",
                  borderRadius: 14,
                  background: on ? "var(--ink)" : "var(--bone)",
                  color: on ? "var(--bone)" : "var(--ink)",
                  border: "1px solid var(--hair)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                }}
              >
                <span
                  style={{ fontFamily: "var(--display)", fontSize: 20 }}
                >
                  {p.l}
                </span>
                <span
                  style={{
                    fontSize: 11,
                    opacity: 0.75,
                    fontFamily: "var(--mono)",
                    letterSpacing: "0.05em",
                  }}
                >
                  {p.s}
                </span>
              </button>
            );
          })}
        </div>
      </FieldShell>
      <FieldShell label="Window">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "4px 0",
          }}
        >
          <span style={{ fontFamily: "var(--display)", fontSize: 22 }}>
            Mar 14
          </span>
          <ArrowRight />
          <span style={{ fontFamily: "var(--display)", fontSize: 22 }}>
            Mar 21
          </span>
        </div>
        <span style={{ fontSize: 12, color: "var(--mute)" }}>
          ± 2 days flexibility
        </span>
      </FieldShell>
    </div>
  );
}

function Stepper({
  value,
  min,
  max,
  onChange,
}: {
  value: number;
  min: number;
  max: number;
  onChange: (n: number) => void;
}) {
  const Btn = ({
    ch,
    onClick,
    disabled,
  }: {
    ch: string;
    onClick: () => void;
    disabled: boolean;
  }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        width: 36,
        height: 36,
        borderRadius: "50%",
        border: "1px solid var(--hair)",
        background: "var(--bone)",
        color: "var(--ink)",
        cursor: "pointer",
        fontSize: 18,
        opacity: disabled ? 0.35 : 1,
      }}
    >
      {ch}
    </button>
  );
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "4px 0",
      }}
    >
      <span style={{ fontFamily: "var(--display)", fontSize: 30 }}>
        {value}
      </span>
      <div style={{ display: "flex", gap: 10 }}>
        <Btn
          ch="−"
          disabled={value <= min}
          onClick={() => onChange(Math.max(min, value - 1))}
        />
        <Btn
          ch="+"
          disabled={value >= max}
          onClick={() => onChange(Math.min(max, value + 1))}
        />
      </div>
    </div>
  );
}

function TravelersStep({
  value,
  onChange,
}: {
  value: FormState["travelers"];
  onChange: (v: FormState["travelers"]) => void;
}) {
  const types = [
    { id: "solo", l: "Just me", n: 1 },
    { id: "couple", l: "Couple", n: 2 },
    { id: "friends", l: "Friend group", n: 4 },
    { id: "family", l: "Family", n: 4 },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      <FieldShell label="Shape">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 8,
            marginTop: 6,
          }}
        >
          {types.map((t) => {
            const on = value.shape === t.id;
            return (
              <button
                key={t.id}
                onClick={() =>
                  onChange({ ...value, shape: t.id, adults: t.n })
                }
                style={{
                  all: "unset",
                  cursor: "pointer",
                  textAlign: "left",
                  padding: "14px 14px",
                  borderRadius: 14,
                  background: on ? "var(--ink)" : "var(--bone)",
                  color: on ? "var(--bone)" : "var(--ink)",
                  border: "1px solid var(--hair)",
                }}
              >
                <span
                  style={{ fontFamily: "var(--display)", fontSize: 22 }}
                >
                  {t.l}
                </span>
              </button>
            );
          })}
        </div>
      </FieldShell>
      <FieldShell label="Adults">
        <Stepper
          value={value.adults}
          min={1}
          max={12}
          onChange={(n) => onChange({ ...value, adults: n })}
        />
      </FieldShell>
      <FieldShell label="Kids">
        <Stepper
          value={value.kids}
          min={0}
          max={8}
          onChange={(n) => onChange({ ...value, kids: n })}
        />
      </FieldShell>
    </div>
  );
}

function BudgetStep({
  value,
  onChange,
}: {
  value: FormState["budget"];
  onChange: (v: FormState["budget"]) => void;
}) {
  const bands = [
    { id: "easy", l: "Lean", r: "$2k – $5k" },
    { id: "mid", l: "Comfortable", r: "$5k – $10k" },
    { id: "rich", l: "Elevated", r: "$10k – $20k" },
    { id: "top", l: "No limit", r: "$20k +" },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      <FieldShell label="Total trip budget">
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 4,
            padding: "4px 0",
          }}
        >
          <span
            style={{
              fontFamily: "var(--display)",
              fontSize: 56,
              lineHeight: 1,
            }}
          >
            ${value.total.toLocaleString()}
          </span>
        </div>
        <input
          type="range"
          min={2000}
          max={30000}
          step={500}
          value={value.total}
          onChange={(e) =>
            onChange({ ...value, total: Number(e.target.value) })
          }
          style={{
            width: "100%",
            accentColor: "var(--ink)",
            marginTop: 8,
          }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontFamily: "var(--mono)",
            fontSize: 11,
            color: "var(--mute)",
            marginTop: 4,
          }}
        >
          <span>$2k</span>
          <span>$30k+</span>
        </div>
      </FieldShell>
      <FieldShell label="Or pick a band">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 8,
            marginTop: 6,
          }}
        >
          {bands.map((b) => {
            const on = value.band === b.id;
            return (
              <button
                key={b.id}
                onClick={() => onChange({ ...value, band: b.id })}
                style={{
                  all: "unset",
                  cursor: "pointer",
                  padding: "12px 14px",
                  borderRadius: 14,
                  background: on ? "var(--ink)" : "var(--bone)",
                  color: on ? "var(--bone)" : "var(--ink)",
                  border: "1px solid var(--hair)",
                }}
              >
                <div
                  style={{ fontFamily: "var(--display)", fontSize: 18 }}
                >
                  {b.l}
                </div>
                <div
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: 10.5,
                    opacity: 0.7,
                    marginTop: 2,
                  }}
                >
                  {b.r}
                </div>
              </button>
            );
          })}
        </div>
      </FieldShell>
    </div>
  );
}

function VibeStep({
  value,
  onChange,
}: {
  value: FormState["vibe"];
  onChange: (v: FormState["vibe"]) => void;
}) {
  const toggle = (v: string) => {
    const next = value.tags.includes(v)
      ? value.tags.filter((x) => x !== v)
      : [...value.tags, v];
    onChange({ ...value, tags: next });
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {VIBES.map((v) => {
          const on = value.tags.includes(v);
          return (
            <button
              key={v}
              onClick={() => toggle(v)}
              style={{
                all: "unset",
                cursor: "pointer",
                padding: "10px 14px",
                borderRadius: 999,
                background: on ? "var(--ink)" : "var(--bone)",
                color: on ? "var(--bone)" : "var(--ink)",
                border: "1px solid " + (on ? "var(--ink)" : "var(--hair)"),
                fontSize: 14,
                fontWeight: 400,
              }}
            >
              {v}
            </button>
          );
        })}
      </div>
      <FieldShell label="Tell us in your own words (optional)">
        <textarea
          value={value.notes ?? ""}
          onChange={(e) => onChange({ ...value, notes: e.target.value })}
          placeholder="e.g. ‘slow mornings, one big night, no kids around’"
          rows={3}
          style={{
            border: 0,
            background: "transparent",
            outline: "none",
            resize: "none",
            fontFamily: "var(--body)",
            fontSize: 15,
            color: "var(--ink)",
            padding: 0,
            width: "100%",
          }}
        />
      </FieldShell>
    </div>
  );
}

function HotelStep({
  value,
  onChange,
}: {
  value: FormState["hotel"];
  onChange: (v: FormState["hotel"]) => void;
}) {
  const styles = [
    {
      id: "boutique",
      l: "Boutique",
      s: "Design-forward, under 40 rooms.",
    },
    {
      id: "resort",
      l: "Full-service",
      s: "Pools, spa, multiple restaurants.",
    },
    {
      id: "villa",
      l: "Private villa",
      s: "House for the group, with staff.",
    },
    { id: "eco", l: "Eco / tented", s: "Off-grid, in nature." },
    { id: "urban", l: "Urban classic", s: "Five-star city stay." },
    { id: "surprise", l: "Surprise me", s: "Trust the advisor." },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {styles.map((s) => {
        const on = value.style === s.id;
        return (
          <button
            key={s.id}
            onClick={() => onChange({ ...value, style: s.id })}
            style={{
              all: "unset",
              cursor: "pointer",
              padding: "16px 18px",
              borderRadius: 16,
              background: on ? "var(--ink)" : "var(--linen)",
              color: on ? "var(--bone)" : "var(--ink)",
              border: "1px solid " + (on ? "var(--ink)" : "var(--hair)"),
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
            <div style={{ fontFamily: "var(--display)", fontSize: 22 }}>
              {s.l}
            </div>
            <div style={{ fontSize: 12.5, opacity: on ? 0.75 : 0.6 }}>
              {s.s}
            </div>
          </button>
        );
      })}
    </div>
  );
}

function ReviewScreen({
  state,
  onEdit,
  onSubmit,
}: {
  state: FormState;
  onEdit: (i: number) => void;
  onSubmit: () => void;
}) {
  const rows: [string, string][] = [
    ["Destination", state.destination.text || "Tulum"],
    ["Dates", "Mar 14 → 21"],
    ["Travelers", `${state.travelers.adults} adults`],
    ["Budget", `$${state.budget.total.toLocaleString()} total`],
    [
      "Vibe",
      (state.vibe.tags.length > 0
        ? state.vibe.tags
        : ["Slow & restorative", "Foodie"]
      )
        .slice(0, 3)
        .join(" · "),
    ],
    [
      "Hotel",
      state.hotel.style.charAt(0).toUpperCase() + state.hotel.style.slice(1),
    ],
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={tripStyles.topbar}>
        <button
          onClick={() => onEdit(STEPS.length - 1)}
          style={{
            border: 0,
            background: "transparent",
            color: "var(--ink)",
            padding: 8,
            margin: -8,
            cursor: "pointer",
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
        <span
          style={{
            fontFamily: "var(--mono)",
            fontSize: 11,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--mute)",
          }}
        >
          Review
        </span>
        <span style={{ width: 20 }} />
      </div>
      <div style={{ ...tripStyles.body, paddingTop: 12 }}>
        <h1
          className="h-display"
          style={{ fontSize: 44, margin: "0 0 8px", letterSpacing: "-0.02em" }}
        >
          Look right?
        </h1>
        <p
          style={{
            margin: 0,
            fontSize: 15,
            color: "var(--mute)",
            lineHeight: 1.45,
          }}
        >
          Submit, and three advisors will design for you. You’ll hear back
          within 48 hours.
        </p>
        <div
          style={{
            marginTop: 24,
            background: "var(--linen)",
            borderRadius: 18,
            overflow: "hidden",
          }}
        >
          {rows.map(([k, v], i) => (
            <button
              key={k}
              onClick={() => onEdit(i)}
              style={{
                all: "unset",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "16px 18px",
                width: "100%",
                borderBottom:
                  i < rows.length - 1 ? "1px solid var(--hair)" : "0",
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: 10,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "var(--mute)",
                    marginBottom: 4,
                  }}
                >
                  {k}
                </div>
                <div style={{ fontFamily: "var(--display)", fontSize: 22 }}>
                  {v}
                </div>
              </div>
              <span
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 11,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--ink)",
                  textDecoration: "underline",
                  textUnderlineOffset: 4,
                }}
              >
                Edit
              </span>
            </button>
          ))}
        </div>

        <div
          style={{
            marginTop: 28,
            padding: 18,
            borderRadius: 18,
            background: "var(--ocean)",
            color: "var(--ink)",
            display: "flex",
            alignItems: "center",
            gap: 14,
          }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: "rgba(250,246,240,0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              fontFamily: "var(--display)",
              fontStyle: "italic",
              fontSize: 22,
            }}
          >
            n
          </div>
          <div style={{ flex: 1, fontSize: 13.5, lineHeight: 1.4 }}>
            Free until you book. Cancel a request any time before you choose a
            plan.
          </div>
        </div>
      </div>
      <div style={tripStyles.footer}>
        <PillButton
          size="lg"
          onClick={onSubmit}
          style={{ width: "100%", justifyContent: "center" }}
        >
          Send to advisors <ArrowRight />
        </PillButton>
      </div>
    </div>
  );
}

function SubmittedScreen({ onContinue }: { onContinue: () => void }) {
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "0 28px",
      }}
    >
      <div
        style={{
          width: 88,
          height: 88,
          borderRadius: "50%",
          border: "1px solid var(--hair)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 28,
          position: "relative",
        }}
      >
        <span
          style={{
            fontFamily: "var(--display)",
            fontStyle: "italic",
            fontSize: 44,
            color: "var(--ink)",
            paddingBottom: 4,
          }}
        >
          n
        </span>
        <div
          style={{
            position: "absolute",
            inset: -8,
            borderRadius: "50%",
            border: "1px dashed var(--hair)",
          }}
        />
      </div>
      <EyebrowLabel>Request sent</EyebrowLabel>
      <h1
        className="h-display"
        style={{
          fontSize: 44,
          margin: "14px 0 12px",
          letterSpacing: "-0.02em",
        }}
      >
        Three advisors are
        <br />
        <span className="h-italic">designing.</span>
      </h1>
      <p
        style={{
          margin: 0,
          maxWidth: 280,
          fontSize: 14.5,
          color: "var(--mute)",
          lineHeight: 1.5,
        }}
      >
        We’ll ping you as proposals come in. Average: 22 hours.
      </p>
      <div style={{ height: 36 }} />
      <PillButton size="md" onClick={onContinue}>
        See sample proposals <ArrowRight />
      </PillButton>
    </div>
  );
}

export default function TripRequestScreen() {
  const router = useRouter();
  const [idx, setIdx] = useState(0);
  const [state, setState] = useState<FormState>({
    destination: { text: "Tulum" },
    dates: { preset: "week" },
    travelers: { shape: "couple", adults: 2, kids: 0 },
    budget: { total: 9000, band: "mid" },
    vibe: { tags: ["Slow & restorative", "Foodie", "Hidden & local"] },
    hotel: { style: "boutique" },
  });
  const [submitted, setSubmitted] = useState(false);
  const review = idx === STEPS.length;

  const goHome = () => router.push("/");

  let content: React.ReactNode;
  if (submitted) {
    content = <SubmittedScreen onContinue={() => router.push("/compare")} />;
  } else if (review) {
    content = (
      <ReviewScreen
        state={state}
        onEdit={(i) => setIdx(Math.min(i, STEPS.length - 1))}
        onSubmit={() => setSubmitted(true)}
      />
    );
  } else {
    content = (
      <div style={tripStyles.shell}>
        <TopBar
          stepIdx={Math.min(idx, STEPS.length - 1)}
          onBack={() => (idx === 0 ? goHome() : setIdx(idx - 1))}
          onClose={goHome}
        />
        <div style={tripStyles.body}>
          <StepHeader step={STEPS[idx]} idx={idx} />
          {idx === 0 && (
            <DestinationStep
              value={state.destination}
              onChange={(v) => setState((s) => ({ ...s, destination: v }))}
            />
          )}
          {idx === 1 && (
            <DatesStep
              value={state.dates}
              onChange={(v) => setState((s) => ({ ...s, dates: v }))}
            />
          )}
          {idx === 2 && (
            <TravelersStep
              value={state.travelers}
              onChange={(v) => setState((s) => ({ ...s, travelers: v }))}
            />
          )}
          {idx === 3 && (
            <BudgetStep
              value={state.budget}
              onChange={(v) => setState((s) => ({ ...s, budget: v }))}
            />
          )}
          {idx === 4 && (
            <VibeStep
              value={state.vibe}
              onChange={(v) => setState((s) => ({ ...s, vibe: v }))}
            />
          )}
          {idx === 5 && (
            <HotelStep
              value={state.hotel}
              onChange={(v) => setState((s) => ({ ...s, hotel: v }))}
            />
          )}
        </div>
        <div style={tripStyles.footer}>
          <PillButton
            size="lg"
            onClick={() => setIdx(idx + 1)}
            style={{ width: "100%", justifyContent: "center" }}
          >
            {idx === STEPS.length - 1 ? "Review" : "Continue"} <ArrowRight />
          </PillButton>
        </div>
      </div>
    );
  }

  return (
    <div className="nu-mobile-stage">
      <IOSDevice width={402} height={840} dark>
        {content}
      </IOSDevice>
    </div>
  );
}
