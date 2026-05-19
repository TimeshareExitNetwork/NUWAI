"use client";

import { CSSProperties } from "react";
import { EyebrowLabel } from "./brand";
import { SiteFooter, SiteNav, siteInner } from "./site-chrome";

const inner: CSSProperties = siteInner;

export type DocSection = {
  id: string;
  no: string;
  title: string;
  body: (string | { kind: "list"; items: string[] } | { kind: "note"; body: string })[];
};

export function DocumentPage({
  kicker,
  title,
  titleItalic,
  dated,
  intro,
  sections,
  contactName,
  contactEmail,
}: {
  kicker: string;
  title: string;
  titleItalic: string;
  dated: string;
  intro: string;
  sections: DocSection[];
  contactName: string;
  contactEmail: string;
}) {
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
      <section
        style={{
          background: "var(--carbon)",
          paddingTop: 160,
          paddingBottom: 80,
        }}
      >
        <div style={inner}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 32,
            }}
          >
            <span
              style={{ width: 30, height: 1, background: "var(--gold)" }}
            />
            <span
              style={{
                fontFamily: "var(--mono)",
                fontSize: 11,
                letterSpacing: "0.26em",
                color: "var(--gold)",
                textTransform: "uppercase",
              }}
            >
              {kicker}
            </span>
          </div>
          <h1
            className="h-display"
            style={{
              margin: 0,
              fontSize: "clamp(56px, 7vw, 132px)",
              letterSpacing: "-0.035em",
              lineHeight: 0.96,
              maxWidth: 1080,
            }}
          >
            {title}{" "}
            <span className="h-italic" style={{ color: "var(--gold)" }}>
              {titleItalic}
            </span>
          </h1>
          <div
            style={{
              marginTop: 40,
              paddingTop: 22,
              borderTop: "1px solid var(--hair)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 24,
              flexWrap: "wrap",
              fontFamily: "var(--mono)",
              fontSize: 11,
              letterSpacing: "0.18em",
              color: "var(--mute)",
              textTransform: "uppercase",
            }}
          >
            <span>In force from · {dated}</span>
            <span style={{ color: "var(--gold)" }}>
              A document, not a notice
            </span>
            <span>Set in Instrument Serif &amp; Geist Mono</span>
          </div>
        </div>
      </section>

      <section style={{ background: "var(--linen)", padding: "100px 0" }}>
        <div style={inner}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "260px 1fr",
              gap: 80,
              alignItems: "flex-start",
            }}
          >
            <aside
              style={{
                position: "sticky",
                top: 110,
              }}
            >
              <EyebrowLabel color="var(--gold)">Contents</EyebrowLabel>
              <ol
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: "20px 0 0",
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                {sections.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      style={{
                        display: "grid",
                        gridTemplateColumns: "32px 1fr",
                        gap: 10,
                        alignItems: "baseline",
                        textDecoration: "none",
                        color: "var(--mute)",
                        fontFamily: "var(--mono)",
                        fontSize: 11.5,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        padding: "6px 0",
                        borderTop: "1px solid var(--hair)",
                      }}
                    >
                      <span style={{ color: "var(--gold)" }}>{s.no}</span>
                      <span>{s.title}</span>
                    </a>
                  </li>
                ))}
              </ol>
              <div
                style={{
                  marginTop: 36,
                  fontFamily: "var(--mono)",
                  fontSize: 10.5,
                  letterSpacing: "0.16em",
                  color: "var(--mute)",
                  textTransform: "uppercase",
                  lineHeight: 1.8,
                }}
              >
                <div>For correspondence —</div>
                <div style={{ color: "var(--ink)", textTransform: "none", fontSize: 13, letterSpacing: 0 }}>
                  {contactName}
                </div>
                <div style={{ color: "var(--ink)", textTransform: "none", fontSize: 13, letterSpacing: 0 }}>
                  {contactEmail}
                </div>
              </div>
            </aside>

            <article style={{ maxWidth: 720 }}>
              <p
                style={{
                  margin: 0,
                  fontFamily: "var(--display)",
                  fontStyle: "italic",
                  fontSize: 26,
                  lineHeight: 1.4,
                  color: "var(--mute)",
                  letterSpacing: "-0.005em",
                  paddingBottom: 28,
                  borderBottom: "1px solid var(--hair)",
                }}
              >
                {intro}
              </p>
              {sections.map((s) => (
                <section
                  key={s.id}
                  id={s.id}
                  style={{
                    paddingTop: 56,
                    paddingBottom: 28,
                    borderBottom: "1px solid var(--hair)",
                    scrollMarginTop: 100,
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--mono)",
                      fontSize: 11,
                      letterSpacing: "0.2em",
                      color: "var(--gold)",
                      textTransform: "uppercase",
                      marginBottom: 12,
                    }}
                  >
                    § {s.no}
                  </div>
                  <h2
                    className="h-display"
                    style={{
                      margin: "0 0 22px",
                      fontSize: 40,
                      lineHeight: 1.05,
                      letterSpacing: "-0.015em",
                      fontWeight: 400,
                    }}
                  >
                    {s.title}
                  </h2>
                  {s.body.map((b, i) => {
                    if (typeof b === "string") {
                      return (
                        <p
                          key={i}
                          style={{
                            margin: "0 0 16px",
                            fontFamily: "var(--display)",
                            fontSize: 21,
                            lineHeight: 1.55,
                            color: "var(--ink)",
                            letterSpacing: "-0.003em",
                          }}
                        >
                          {b}
                        </p>
                      );
                    }
                    if (b.kind === "list") {
                      return (
                        <ul
                          key={i}
                          style={{
                            margin: "8px 0 18px",
                            padding: 0,
                            listStyle: "none",
                          }}
                        >
                          {b.items.map((it, j) => (
                            <li
                              key={j}
                              style={{
                                display: "grid",
                                gridTemplateColumns: "24px 1fr",
                                gap: 10,
                                padding: "10px 0",
                                borderBottom: "1px solid var(--hair)",
                                fontFamily: "var(--display)",
                                fontSize: 19,
                                lineHeight: 1.45,
                                color: "var(--ink)",
                              }}
                            >
                              <span
                                style={{
                                  fontFamily: "var(--mono)",
                                  fontSize: 11,
                                  letterSpacing: "0.14em",
                                  color: "var(--gold)",
                                  textTransform: "uppercase",
                                  paddingTop: 6,
                                }}
                              >
                                {String.fromCharCode(97 + j)}
                              </span>
                              <span>{it}</span>
                            </li>
                          ))}
                        </ul>
                      );
                    }
                    return (
                      <div
                        key={i}
                        style={{
                          margin: "12px 0",
                          padding: "14px 18px",
                          borderLeft: "2px solid var(--gold)",
                          background: "var(--bone)",
                          fontFamily: "var(--mono)",
                          fontSize: 12.5,
                          letterSpacing: "0.04em",
                          color: "var(--mute)",
                          lineHeight: 1.55,
                          textTransform: "uppercase",
                        }}
                      >
                        Note · {b.body}
                      </div>
                    );
                  })}
                </section>
              ))}
              <div
                style={{
                  marginTop: 48,
                  padding: "26px 28px",
                  borderRadius: 4,
                  background: "var(--carbon)",
                  color: "var(--ink)",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: 11,
                    letterSpacing: "0.18em",
                    color: "var(--gold)",
                    textTransform: "uppercase",
                    marginBottom: 8,
                  }}
                >
                  For correspondence
                </div>
                <div
                  className="h-display"
                  style={{
                    fontSize: 26,
                    letterSpacing: "-0.012em",
                    marginBottom: 4,
                  }}
                >
                  {contactName}
                </div>
                <div
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: 13,
                    color: "var(--mute)",
                  }}
                >
                  {contactEmail}
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
