"use client";

import { CSSProperties, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { IOSDevice } from "./ios-frame";
import { ChatMessage, MESSAGES } from "@/lib/data";

const concStyles: Record<string, CSSProperties> = {
  shell: {
    height: "100%",
    width: "100%",
    background: "var(--bone)",
    color: "var(--ink)",
    display: "flex",
    flexDirection: "column",
  },
};

function ChatHeader() {
  const router = useRouter();
  return (
    <div
      style={{
        padding: "54px 16px 14px",
        display: "grid",
        gridTemplateColumns: "36px 1fr 36px",
        alignItems: "center",
        gap: 10,
        borderBottom: "1px solid var(--hair)",
        background: "var(--bone)",
      }}
    >
      <button
        onClick={() => router.push("/compare")}
        style={{
          all: "unset",
          cursor: "pointer",
          width: 36,
          height: 36,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M12 5l-5 5 5 5"
            stroke="var(--ink)"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: "50%",
            background: "var(--carbon)",
            color: "var(--gold)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "var(--display)",
            fontStyle: "italic",
            fontSize: 16,
            paddingBottom: 2,
          }}
        >
          n
        </div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 500, textAlign: "center" }}>
            NUWAI Concierge
          </div>
          <div
            style={{
              fontSize: 10.5,
              color: "var(--mute)",
              fontFamily: "var(--mono)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              display: "flex",
              alignItems: "center",
              gap: 5,
              justifyContent: "center",
            }}
          >
            <span
              style={{
                width: 5,
                height: 5,
                borderRadius: "50%",
                background: "#3DBE7B",
              }}
            />{" "}
            Online · Tulum trip
          </div>
        </div>
      </div>
      <button
        style={{
          all: "unset",
          cursor: "pointer",
          width: 36,
          height: 36,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--mute)",
        }}
      >
        <svg width="18" height="18" viewBox="0 0 18 18">
          <circle cx="4" cy="9" r="1.5" fill="currentColor" />
          <circle cx="9" cy="9" r="1.5" fill="currentColor" />
          <circle cx="14" cy="9" r="1.5" fill="currentColor" />
        </svg>
      </button>
    </div>
  );
}

function TripPinned() {
  return (
    <div
      style={{
        margin: "14px 16px 6px",
        padding: "12px 14px",
        borderRadius: 14,
        background: "var(--linen)",
        display: "flex",
        alignItems: "center",
        gap: 12,
      }}
    >
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: 10,
          backgroundImage:
            "url(https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=400&auto=format&fit=crop)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          flexShrink: 0,
        }}
      />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontFamily: "var(--display)",
            fontSize: 16,
            lineHeight: 1.2,
          }}
        >
          Quiet jungle, loud sunsets.
        </div>
        <div style={{ fontSize: 11, color: "var(--mute)", marginTop: 2 }}>
          Habitas Tulum · Mar 14 → 21 · Held until Sat
        </div>
      </div>
      <span
        style={{
          fontFamily: "var(--mono)",
          fontSize: 9.5,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          padding: "4px 7px",
          borderRadius: 999,
          background: "var(--gold)",
          color: "var(--ink)",
        }}
      >
        Pinned
      </span>
    </div>
  );
}

function Bubble({ m, prev }: { m: ChatMessage; prev?: ChatMessage }) {
  const me = m.from === "me";
  const showAvatar = !me && (!prev || prev.from !== m.from);
  return (
    <div
      style={{
        display: "flex",
        gap: 8,
        flexDirection: me ? "row-reverse" : "row",
        alignItems: "flex-end",
        margin: "4px 0",
      }}
    >
      {!me && (
        <div
          style={{
            width: 26,
            height: 26,
            borderRadius: "50%",
            background: showAvatar ? "var(--carbon)" : "transparent",
            color: "var(--gold)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "var(--display)",
            fontStyle: "italic",
            fontSize: 13,
            paddingBottom: 1,
            flexShrink: 0,
          }}
        >
          {showAvatar ? "n" : ""}
        </div>
      )}
      <div
        style={{
          maxWidth: "78%",
          display: "flex",
          flexDirection: "column",
          alignItems: me ? "flex-end" : "flex-start",
          gap: 6,
        }}
      >
        <div
          style={{
            padding: "10px 14px",
            background: me ? "var(--ink)" : "var(--linen)",
            color: me ? "var(--bone)" : "var(--ink)",
            borderRadius: 18,
            borderBottomRightRadius: me ? 6 : 18,
            borderBottomLeftRadius: me ? 18 : 6,
            fontSize: 14.5,
            lineHeight: 1.4,
          }}
        >
          {m.body}
        </div>
        {m.actions && (
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {m.actions.map((a) => (
              <button
                key={a}
                style={{
                  all: "unset",
                  cursor: "pointer",
                  padding: "8px 12px",
                  borderRadius: 999,
                  background: "var(--bone)",
                  border: "1px solid var(--ink)",
                  fontSize: 12.5,
                  color: "var(--ink)",
                }}
              >
                {a}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ChatComposer({
  value,
  setValue,
  onSend,
}: {
  value: string;
  setValue: (v: string) => void;
  onSend: () => void;
}) {
  return (
    <div
      style={{
        padding: "10px 12px 26px",
        borderTop: "1px solid var(--hair)",
        background: "var(--bone)",
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 6,
          overflowX: "auto",
          scrollbarWidth: "none",
        }}
      >
        {[
          "Hold the room",
          "Change dates",
          "Add a flight",
          "See other proposals",
        ].map((q) => (
          <button
            key={q}
            style={{
              all: "unset",
              cursor: "pointer",
              padding: "7px 12px",
              borderRadius: 999,
              background: "var(--linen)",
              fontSize: 12,
              color: "var(--ink)",
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
          >
            {q}
          </button>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          background: "var(--linen)",
          borderRadius: 999,
          padding: "6px 6px 6px 16px",
        }}
      >
        <button
          style={{
            all: "unset",
            cursor: "pointer",
            width: 28,
            height: 28,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--mute)",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M8 2v12M2 8h12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && value.trim()) onSend();
          }}
          placeholder="Message your concierge…"
          style={{
            flex: 1,
            border: 0,
            outline: 0,
            background: "transparent",
            fontFamily: "var(--body)",
            fontSize: 14.5,
            padding: "8px 0",
            color: "var(--ink)",
          }}
        />
        <button
          onClick={onSend}
          disabled={!value.trim()}
          style={{
            all: "unset",
            cursor: value.trim() ? "pointer" : "default",
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: value.trim() ? "var(--ink)" : "var(--hair)",
            color: value.trim() ? "var(--linen)" : "var(--mute)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M2 7h10m0 0L8 3m4 4l-4 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default function ConciergeScreen() {
  const [msgs, setMsgs] = useState<ChatMessage[]>(MESSAGES);
  const [draft, setDraft] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current)
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [msgs]);

  const send = () => {
    const text = draft.trim();
    if (!text) return;
    setMsgs((m) => [...m, { from: "me", body: text }]);
    setDraft("");
    setTimeout(() => {
      setMsgs((m) => [
        ...m,
        {
          from: "concierge",
          name: "NUWAI Concierge",
          time: "now",
          body: "On it — Sofía is online. Want me to loop her in directly?",
          actions: ["Loop Sofía in", "Keep it with you"],
        },
      ]);
    }, 900);
  };

  return (
    <div className="nu-mobile-stage">
      <IOSDevice width={402} height={840} dark>
        <div style={concStyles.shell}>
          <ChatHeader />
          <TripPinned />
          <div
            ref={scrollRef}
            style={{
              flex: 1,
              overflow: "auto",
              padding: "6px 16px 8px",
            }}
          >
            <div
              style={{
                textAlign: "center",
                fontFamily: "var(--mono)",
                fontSize: 10,
                letterSpacing: "0.14em",
                color: "var(--mute)",
                textTransform: "uppercase",
                padding: "12px 0 16px",
              }}
            >
              Today · 9:41 am
            </div>
            {msgs.map((m, i) => (
              <Bubble key={i} m={m} prev={msgs[i - 1]} />
            ))}
          </div>
          <ChatComposer value={draft} setValue={setDraft} onSend={send} />
        </div>
      </IOSDevice>
    </div>
  );
}
