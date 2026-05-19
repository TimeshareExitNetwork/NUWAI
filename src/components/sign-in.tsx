"use client";

import { CSSProperties, useState } from "react";
import Link from "next/link";
import { ArrowRight, EyebrowLabel, Wordmark } from "./brand";

const shellStyle: CSSProperties = {
  minHeight: "100vh",
  width: "100%",
  background:
    "radial-gradient(900px 600px at 50% 20%, rgba(201,168,106,0.10), transparent 60%), radial-gradient(700px 500px at 80% 80%, rgba(74,110,125,0.12), transparent 65%), var(--linen)",
  color: "var(--ink)",
  display: "flex",
  flexDirection: "column",
  position: "relative",
};

export default function SignInScreen() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  return (
    <div style={shellStyle}>
      <header
        style={{
          padding: "32px 48px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Link
          href="/"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Wordmark size={24} color="var(--ink)" />
        </Link>
        <Link
          href="/atelier"
          style={{
            color: "var(--mute)",
            textDecoration: "none",
            fontFamily: "var(--mono)",
            fontSize: 11,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}
        >
          How we work
        </Link>
      </header>

      <main
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "32px 24px",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: 420,
            padding: "44px 40px 36px",
            border: "1px solid rgba(201,168,106,0.22)",
            borderRadius: 6,
            background: "rgba(20,23,29,0.55)",
            backdropFilter: "blur(18px) saturate(160%)",
            WebkitBackdropFilter: "blur(18px) saturate(160%)",
            boxShadow:
              "0 30px 80px rgba(0,0,0,0.34), inset 0 1px 0 rgba(255,255,255,0.04)",
            position: "relative",
          }}
        >
          <div
            style={{
              fontFamily: "var(--mono)",
              fontSize: 11,
              letterSpacing: "0.22em",
              color: "var(--gold)",
              textTransform: "uppercase",
              marginBottom: 18,
            }}
          >
            No. 09 · Sign in
          </div>
          <h1
            className="h-display"
            style={{
              margin: 0,
              fontSize: 44,
              letterSpacing: "-0.02em",
              lineHeight: 0.98,
            }}
          >
            Continue, by{" "}
            <span className="h-italic" style={{ color: "var(--gold)" }}>
              letter.
            </span>
          </h1>
          <p
            style={{
              margin: "16px 0 28px",
              fontSize: 14,
              lineHeight: 1.5,
              color: "var(--mute)",
            }}
          >
            Sign in with the email address you used to write your brief. We
            will send a single link, valid for ten minutes.
          </p>

          {!sent ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (email.trim()) setSent(true);
              }}
              style={{ display: "flex", flexDirection: "column", gap: 14 }}
            >
              <label
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 10,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--mute)",
                }}
              >
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@elsewhere.com"
                style={{
                  background: "transparent",
                  border: 0,
                  borderBottom: "1px solid rgba(242,235,221,0.25)",
                  padding: "10px 0",
                  outline: "none",
                  color: "var(--ink)",
                  fontFamily: "var(--display)",
                  fontSize: 22,
                  letterSpacing: "-0.005em",
                }}
              />
              <button
                type="submit"
                disabled={!email.trim()}
                style={{
                  marginTop: 28,
                  height: 50,
                  borderRadius: 999,
                  border: 0,
                  cursor: email.trim() ? "pointer" : "default",
                  background: email.trim() ? "var(--ink)" : "var(--hair)",
                  color: email.trim() ? "var(--linen)" : "var(--mute)",
                  fontFamily: "var(--mono)",
                  fontSize: 12,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                  transition: "background 0.2s ease, color 0.2s ease",
                }}
              >
                Continue <ArrowRight size={12} />
              </button>
            </form>
          ) : (
            <div
              style={{
                padding: "20px 0",
                borderTop: "1px solid var(--hair)",
                borderBottom: "1px solid var(--hair)",
                color: "var(--ink)",
              }}
            >
              <EyebrowLabel color="var(--gold)">
                Letter posted
              </EyebrowLabel>
              <div
                style={{
                  fontFamily: "var(--display)",
                  fontSize: 22,
                  lineHeight: 1.3,
                  marginTop: 10,
                  fontStyle: "italic",
                }}
              >
                Check {email}.
              </div>
              <div
                style={{
                  marginTop: 8,
                  fontFamily: "var(--mono)",
                  fontSize: 11,
                  letterSpacing: "0.14em",
                  color: "var(--mute)",
                  textTransform: "uppercase",
                }}
              >
                Valid for 10 minutes · One link per attempt
              </div>
            </div>
          )}

          <div
            style={{
              marginTop: 32,
              paddingTop: 18,
              borderTop: "1px solid var(--hair)",
              fontFamily: "var(--mono)",
              fontSize: 10.5,
              letterSpacing: "0.18em",
              color: "var(--mute)",
              textTransform: "uppercase",
              textAlign: "center",
            }}
          >
            By invitation, and on referral.
          </div>
        </div>
      </main>

      <footer
        style={{
          padding: "20px 48px 32px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontFamily: "var(--mono)",
          fontSize: 11,
          letterSpacing: "0.16em",
          color: "var(--mute)",
          textTransform: "uppercase",
        }}
      >
        <span>© NUWAI Travel, Inc. 2026</span>
        <div style={{ display: "flex", gap: 24 }}>
          <Link
            href="/help"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            Help
          </Link>
          <Link
            href="/privacy"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            Privacy
          </Link>
        </div>
      </footer>
    </div>
  );
}
