"use client";

import {
  CSSProperties,
  ReactNode,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";

export function useScrollProgress(
  ref: RefObject<HTMLElement | null>,
  opts: { start?: number; end?: number } = {},
) {
  const { start = 0, end = 1 } = opts;
  const [p, setP] = useState(0);
  useEffect(() => {
    if (!ref.current) return;
    let raf: number | null = null;
    const tick = () => {
      raf = null;
      if (!ref.current) return;
      const r = ref.current.getBoundingClientRect();
      const vh = window.innerHeight;
      const raw = 1 - (r.top + r.height) / (vh + r.height);
      const clamped = Math.max(0, Math.min(1, (raw - start) / (end - start)));
      setP(clamped);
    };
    const onScroll = () => {
      if (raf == null) raf = requestAnimationFrame(tick);
    };
    tick();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf != null) cancelAnimationFrame(raf);
    };
  }, [ref, start, end]);
  return p;
}

export function useInView(
  ref: RefObject<HTMLElement | null>,
  opts: { threshold?: number; once?: boolean } = {},
) {
  const { threshold = 0.25, once = true } = opts;
  const [v, setV] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setV(true);
            if (once) obs.unobserve(e.target);
          } else if (!once) {
            setV(false);
          }
        });
      },
      { threshold, rootMargin: "0px 0px -8% 0px" },
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref, threshold, once]);
  return v;
}

export function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  duration = 1800,
  style,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref);
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    let raf: number | null = null;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const e = 1 - Math.pow(1 - p, 3);
      setN(Math.round(value * e));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      if (raf != null) cancelAnimationFrame(raf);
    };
  }, [inView, value, duration]);
  return (
    <span ref={ref} style={style}>
      {prefix}
      {n}
      {suffix}
    </span>
  );
}

export function SplitText({
  text,
  by = "word",
  stagger = 0.04,
  duration = 0.9,
  style,
  color,
  accentWord,
  accentColor,
}: {
  text: string;
  by?: "word" | "char";
  stagger?: number;
  duration?: number;
  style?: CSSProperties;
  color?: string;
  accentWord?: string;
  accentColor?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref);
  const tokens = by === "word" ? text.split(/(\s+)/) : Array.from(text);
  return (
    <span ref={ref} style={{ display: "inline", ...style }}>
      {tokens.map((tok, i) => {
        if (/^\s+$/.test(tok)) return <span key={i}>{tok}</span>;
        const isAccent =
          accentWord && tok.replace(/[.,]/g, "") === accentWord;
        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              transform: inView ? "translateY(0)" : "translateY(0.4em)",
              opacity: inView ? 1 : 0,
              transition: `transform ${duration}s cubic-bezier(0.2, 0.8, 0.2, 1) ${i * stagger}s, opacity ${duration}s ease ${i * stagger}s`,
              color: isAccent ? accentColor || "var(--gold)" : color,
              fontStyle: isAccent ? "italic" : undefined,
              whiteSpace: "pre",
            }}
          >
            {tok}
          </span>
        );
      })}
    </span>
  );
}

export function ScrollWords({
  text,
  baseColor = "rgba(242,235,221,0.18)",
  activeColor = "var(--ink)",
  accentWord,
  accentColor = "var(--gold)",
  style,
}: {
  text: string;
  baseColor?: string;
  activeColor?: string;
  accentWord?: string;
  accentColor?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const p = useScrollProgress(ref, { start: 0.1, end: 0.85 });
  const words = text.split(/(\s+)/);
  const wordCount = words.filter((w) => !/^\s+$/.test(w)).length;
  let visibleIdx = 0;
  return (
    <span ref={ref} style={{ display: "inline", ...style }}>
      {words.map((tok, i) => {
        if (/^\s+$/.test(tok)) return <span key={i}>{tok}</span>;
        const idx = visibleIdx++;
        const wordP = idx / Math.max(1, wordCount - 1);
        const lit = p >= wordP - 0.04;
        const isAccent =
          accentWord && tok.replace(/[.,]/g, "") === accentWord;
        return (
          <span
            key={i}
            style={{
              color: lit ? (isAccent ? accentColor : activeColor) : baseColor,
              fontStyle: isAccent ? "italic" : undefined,
              transition: "color 0.5s ease",
            }}
          >
            {tok}
          </span>
        );
      })}
    </span>
  );
}

export function TiltCard({
  children,
  max = 8,
  style,
}: {
  children: ReactNode;
  max?: number;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    ref.current.style.transform = `perspective(1200px) rotateX(${-y * max}deg) rotateY(${x * max}deg) translateZ(0)`;
  };
  const onLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform =
      "perspective(1200px) rotateX(0) rotateY(0)";
  };
  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        transition: "transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1)",
        willChange: "transform",
        height: "100%",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export function CursorSpot({
  color = "rgba(201,168,106,0.18)",
  size = 480,
}: {
  color?: string;
  size?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const parent = ref.current && ref.current.parentElement;
    if (!parent) return;
    const onMove = (e: MouseEvent) => {
      if (!ref.current) return;
      const r = parent.getBoundingClientRect();
      ref.current.style.transform = `translate3d(${e.clientX - r.left - size / 2}px, ${e.clientY - r.top - size / 2}px, 0)`;
    };
    parent.addEventListener("mousemove", onMove);
    return () => parent.removeEventListener("mousemove", onMove);
  }, [size]);
  return (
    <div
      ref={ref}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: size,
        height: size,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${color}, transparent 60%)`,
        pointerEvents: "none",
        willChange: "transform",
        zIndex: 1,
        mixBlendMode: "screen",
      }}
    />
  );
}

export function Marquee({
  children,
  speed = 60,
  gap = 56,
  dir = "left",
}: {
  children: ReactNode;
  speed?: number;
  gap?: number;
  dir?: "left" | "right";
}) {
  return (
    <div style={{ display: "flex", overflow: "hidden", width: "100%" }}>
      <div
        style={{
          display: "flex",
          gap,
          alignItems: "center",
          flexShrink: 0,
          animation: `nu-marquee-${dir} ${speed}s linear infinite`,
          whiteSpace: "nowrap",
        }}
      >
        {children}
        {children}
      </div>
    </div>
  );
}

export function ImageScroll({
  src,
  height,
  style,
  children,
  max = 1.18,
  filter,
}: {
  src: string;
  height: number;
  style?: CSSProperties;
  children?: ReactNode;
  max?: number;
  filter?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const p = useScrollProgress(ref);
  const scale = 1 + (max - 1) * p;
  return (
    <div
      ref={ref}
      style={{
        position: "relative",
        height,
        overflow: "hidden",
        ...style,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transform: `scale(${scale})`,
          transformOrigin: "50% 50%",
          transition: "transform 0.05s linear",
          willChange: "transform",
          filter,
        }}
      />
      {children}
    </div>
  );
}
