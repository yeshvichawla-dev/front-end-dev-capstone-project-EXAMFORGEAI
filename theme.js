export function getTheme(darkMode) {
  return darkMode
    ? {
        bg: "#0D1117",
        surface: "#161B22",
        surface2: "#21262D",
        border: "#30363D",
        text: "#E6EDF3",
        muted: "#7D8590",
        card: "#161B22",
        cardBorder: "#30363D",
        headerBg: "rgba(13,17,23,0.96)",
        inputBg: "#21262D",
      }
    : {
        bg: "#FAF7F2",
        surface: "#FFFFFF",
        surface2: "#F5F0E8",
        border: "#E8DDD0",
        text: "#2D2420",
        muted: "#8B7355",
        card: "#FFFFFF",
        cardBorder: "#E8DDD0",
        headerBg: "rgba(250,247,242,0.96)",
        inputBg: "#F5F0E8",
      };
}

export function getStyles(t, darkMode) {
  return {
    app: {
      minHeight: "100vh",
      background: t.bg,
      color: t.text,
      fontFamily: "'DM Sans', sans-serif",
      overflowX: "hidden",
    },
    header: {
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 24px", height: 58,
      borderBottom: `1px solid ${t.border}`,
      background: t.headerBg,
      backdropFilter: "blur(20px)",
      position: "sticky", top: 0, zIndex: 100,
    },
    logo: {
      fontFamily: "'Playfair Display', serif",
      fontSize: 20, fontWeight: 700,
      color: t.text, cursor: "pointer",
      letterSpacing: -0.5, userSelect: "none",
    },
    page: { padding: "32px 24px", maxWidth: 1100, margin: "0 auto" },
    card: {
      background: t.card,
      border: `1px solid ${t.cardBorder}`,
      borderRadius: 14, padding: 22,
    },
    btn: (bg, color = "#fff") => ({
      background: bg, color,
      border: "none", borderRadius: 9,
      padding: "10px 22px",
      fontWeight: 600, cursor: "pointer",
      fontSize: 14,
      fontFamily: "'DM Sans', sans-serif",
    }),
    outlineBtn: {
      background: "transparent",
      border: `1px solid ${t.border}`,
      color: t.muted, borderRadius: 9,
      padding: "9px 18px", cursor: "pointer",
      fontSize: 13, fontWeight: 500,
      fontFamily: "'DM Sans', sans-serif",
      transition: "all 0.15s",
    },
    grid: (min) => ({
      display: "grid",
      gridTemplateColumns: `repeat(auto-fill, minmax(${min}px, 1fr))`,
      gap: 16,
    }),
    h1: {
      fontFamily: "'Playfair Display', serif",
      fontSize: 28, fontWeight: 700,
      marginBottom: 6, letterSpacing: -0.5,
    },
    tag: (c) => ({
      background: c + "18", color: c,
      borderRadius: 6, padding: "3px 10px",
      fontSize: 11, fontWeight: 600, letterSpacing: 0.3,
    }),
    input: {
      background: t.inputBg,
      border: `1px solid ${t.border}`,
      borderRadius: 9, padding: "10px 16px",
      color: t.text, fontSize: 14,
      outline: "none", width: "100%",
      fontFamily: "'DM Sans', sans-serif",
    },
    semNum: (color) => ({
      width: 36, height: 36, borderRadius: 8,
      background: color + "18", color,
      display: "flex", alignItems: "center",
      justifyContent: "center",
      fontSize: 14, fontWeight: 700,
    }),
  };
}

export const globalCSS = (t, darkMode) => `
  @keyframes xpBurst { 0%{opacity:1;transform:translate(-50%,-50%) scale(1)} 50%{transform:translate(-50%,-80%) scale(1.3)} 100%{opacity:0;transform:translate(-50%,-130%) scale(0.8)} }
  @keyframes spin { to{transform:rotate(360deg)} }
  @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.45} }
  @keyframes fadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
  @keyframes cardPop { 0%{opacity:0;transform:scale(0.96) translateY(10px)} 100%{opacity:1;transform:scale(1) translateY(0)} }
  * { box-sizing:border-box; margin:0; padding:0; }
  body { font-family:'DM Sans',sans-serif; }
  ::-webkit-scrollbar{width:6px}
  ::-webkit-scrollbar-track{background:${t.bg}}
  ::-webkit-scrollbar-thumb{background:${t.border};border-radius:3px}
  .card-hover{transition:all 0.22s ease}
  .card-hover:hover{transform:translateY(-3px);box-shadow:0 8px 32px rgba(0,0,0,0.10)}
  .btn-primary{transition:all 0.18s ease}
  .btn-primary:hover{filter:brightness(1.08);transform:translateY(-1px)}
  .btn-ghost:hover{background:${darkMode ? "#ffffff10" : "#00000008"} !important}
  .opt-btn{transition:all 0.2s ease}
  .opt-btn:hover:not(:disabled){border-color:#5B8DD9 !important;background:${darkMode ? "#5B8DD915" : "#5B8DD908"} !important}
  .nav-link{transition:all 0.15s}
  .nav-link:hover{color:${t.text} !important}
  .skeleton{background:linear-gradient(90deg,${darkMode?"#21262D 25%,#2d333b 50%,#21262D 75%":"#f0ebe3 25%,#e8e2d8 50%,#f0ebe3 75%"});background-size:200% 100%;animation:shimmer 1.5s infinite;border-radius:8px}
  @keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}
  textarea:focus,input:focus{outline:none}
  button{font-family:'DM Sans',sans-serif}
`;
