"use client";

import type { CSSProperties, ReactNode } from "react";

export function Wordmark({
  size = 22,
  color = "currentColor",
}: {
  size?: number;
  color?: string;
}) {
  return (
    <span
      style={{
        fontFamily: 'var(--display)',
        fontSize: size,
        lineHeight: 1,
        letterSpacing: "-0.01em",
        color,
        fontStyle: "italic",
        fontWeight: 400,
        display: "inline-flex",
        alignItems: "baseline",
        gap: 2,
      }}
    >
      <span style={{ fontStyle: "normal" }}>n</span>
      <span>u</span>
      <span style={{ fontStyle: "normal" }}>w</span>
      <span>a</span>
      <span style={{ fontStyle: "normal" }}>i</span>
      <span
        aria-hidden="true"
        style={{
          width: 4,
          height: 4,
          borderRadius: "50%",
          background: "currentColor",
          display: "inline-block",
          marginLeft: 4,
          alignSelf: "center",
        }}
      />
    </span>
  );
}

export function EyebrowLabel({
  children,
  color = "currentColor",
  dot = true,
}: {
  children: ReactNode;
  color?: string;
  dot?: boolean;
}) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        fontFamily: "var(--mono)",
        fontSize: 11,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color,
        fontWeight: 500,
      }}
    >
      {dot && (
        <span
          style={{
            width: 5,
            height: 5,
            borderRadius: "50%",
            background: "currentColor",
            opacity: 0.6,
          }}
        />
      )}
      {children}
    </span>
  );
}

type PillVariant = "solid" | "ghost" | "invert" | "sand";
type PillSize = "sm" | "md" | "lg";

export function PillButton({
  children,
  onClick,
  variant = "solid",
  size = "md",
  style = {},
  as = "button",
  href,
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: PillVariant;
  size?: PillSize;
  style?: CSSProperties;
  as?: "button" | "a";
  href?: string;
}) {
  const sizes = {
    sm: { h: 36, px: 16, fs: 13 },
    md: { h: 48, px: 22, fs: 14.5 },
    lg: { h: 56, px: 28, fs: 16 },
  }[size];
  const variants: Record<PillVariant, { bg: string; fg: string; bd: string }> = {
    solid: { bg: "var(--ink)", fg: "var(--linen)", bd: "var(--ink)" },
    ghost: { bg: "transparent", fg: "var(--ink)", bd: "var(--hair)" },
    invert: { bg: "var(--bone)", fg: "var(--ink)", bd: "var(--bone)" },
    sand: { bg: "var(--gold)", fg: "var(--linen)", bd: "var(--gold)" },
  };
  const v = variants[variant];
  const baseStyle: CSSProperties = {
    height: sizes.h,
    padding: `0 ${sizes.px}px`,
    borderRadius: 999,
    border: `1px solid ${v.bd}`,
    background: v.bg,
    color: v.fg,
    fontFamily: "var(--body)",
    fontSize: sizes.fs,
    fontWeight: 500,
    letterSpacing: "-0.005em",
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    textDecoration: "none",
    transition: "transform 0.15s ease, opacity 0.15s ease",
    ...style,
  };
  if (as === "a") {
    return (
      <a href={href} style={baseStyle} onClick={onClick}>
        {children}
      </a>
    );
  }
  return (
    <button onClick={onClick} style={baseStyle}>
      {children}
    </button>
  );
}

export function ArrowRight({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 14 14"
      fill="none"
      style={{ flexShrink: 0 }}
    >
      <path
        d="M1 7h12m0 0L8 2m5 5l-5 5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ArrowUpRight({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 14 14"
      fill="none"
      style={{ flexShrink: 0 }}
    >
      <path
        d="M3 11L11 3M11 3H5M11 3v6"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Star({ size = 12, filled = true }: { size?: number; filled?: boolean }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 12 12"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1"
    >
      <path d="M6 1l1.6 3.4L11 5l-2.6 2.4.7 3.4L6 9.1 2.9 10.8l.7-3.4L1 5l3.4-.6L6 1z" />
    </svg>
  );
}
