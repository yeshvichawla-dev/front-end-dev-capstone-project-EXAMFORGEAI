import React from "react";

export const diffColor = { easy: "#4CAF85", medium: "#D4A027", hard: "#E07070" };

export function CircularTimer({ seconds, total, size = 72, dark }) {
  const r = (size - 10) / 2;
  const circ = 2 * Math.PI * r;
  const pct = seconds / total;
  const offset = circ * (1 - pct);
  const color = pct > 0.5 ? "#4CAF85" : pct > 0.25 ? "#D4A027" : "#E07070";
  return (
    <svg
      width={size}
      height={size}
      style={{ transform: "rotate(-90deg)", filter: `drop-shadow(0 0 6px ${color}50)` }}
    >
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={dark ? "#1e293b" : "#e8e0d8"} strokeWidth={7} />
      <circle
        cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={7}
        strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 1s linear, stroke 0.3s" }}
      />
      <text
        x="50%" y="50%" textAnchor="middle" dominantBaseline="central"
        style={{ fill: color, fontSize: 16, fontWeight: 700, fontFamily: "monospace", transform: "rotate(90deg)", transformOrigin: "center" }}
      >
        {seconds}
      </text>
    </svg>
  );
}

export function ProgressBar({ value, max, color = "#4CAF85", height = 5 }) {
  return (
    <div style={{ background: "rgba(0,0,0,0.08)", borderRadius: 99, height, overflow: "hidden" }}>
      <div
        style={{
          width: `${Math.min((value / Math.max(max, 1)) * 100, 100)}%`,
          height: "100%",
          background: color,
          borderRadius: 99,
          transition: "width 0.5s ease",
        }}
      />
    </div>
  );
}

export function XPBurst({ xp }) {
  return (
    <div
      style={{
        position: "fixed", top: "50%", left: "50%",
        transform: "translate(-50%,-50%)",
        fontSize: 42, fontWeight: 900, zIndex: 9999,
        animation: "xpBurst 1.2s ease-out forwards",
        pointerEvents: "none",
        color: "#D4A027",
        textShadow: "0 0 20px #D4A02760",
      }}
    >
      +{xp} XP
    </div>
  );
}

export function DiffTag({ diff }) {
  const c = diffColor[diff] || "#888";
  return (
    <span
      style={{
        background: c + "18", color: c,
        border: `1px solid ${c}30`,
        borderRadius: 6, padding: "2px 9px",
        fontSize: 11, fontWeight: 700,
        letterSpacing: 0.5, textTransform: "uppercase",
      }}
    >
      {diff}
    </span>
  );
}

export function Spinner({ color = "#4CAF85", size = 44 }) {
  return (
    <div
      style={{
        width: size, height: size,
        border: `3px solid rgba(0,0,0,0.08)`,
        borderTopColor: color,
        borderRadius: "50%",
        animation: "spin 0.8s linear infinite",
      }}
    />
  );
}

export function SkeletonCard({ t }) {
  return (
    <div style={{ background: t.card, border: `1px solid ${t.cardBorder}`, borderRadius: 14, padding: 22 }}>
      <div className="skeleton" style={{ height: 14, width: "60%", marginBottom: 12 }} />
      <div className="skeleton" style={{ height: 20, width: "80%", marginBottom: 8 }} />
      <div className="skeleton" style={{ height: 12, width: "40%" }} />
    </div>
  );
}

export function Badge({ label, earned }) {
  return (
    <div
      style={{
        background: earned ? "#D4A02715" : "rgba(0,0,0,0.04)",
        border: earned ? "1px solid #D4A02730" : "1px dashed rgba(0,0,0,0.15)",
        borderRadius: 7, padding: "5px 11px",
        fontSize: 11, fontWeight: 600,
        color: earned ? "#A07010" : "#999",
        opacity: earned ? 1 : 0.6,
      }}
    >
      {earned ? "🏆 " : "🔒 "}{label}
    </div>
  );
}

export function SourceTag({ source }) {
  if (!source) return null;
  const isAI = source === "AI Generated";
  return (
    <span
      style={{
        background: isAI ? "#5B8DD915" : "#4CAF8515",
        color: isAI ? "#5B8DD9" : "#4CAF85",
        border: `1px solid ${isAI ? "#5B8DD930" : "#4CAF8530"}`,
        borderRadius: 5, padding: "1px 7px",
        fontSize: 10, fontWeight: 600, letterSpacing: 0.3,
      }}
    >
      {isAI ? "✦ AI" : "📚 Seed"}
    </span>
  );
}
