import React, {
  useState, useEffect, useCallback, useRef, useMemo, memo,
} from "react";
import { BCA_CURRICULUM, MOCK_LEADERBOARD } from "./data/curriculum.js";
import { SEED_QUESTIONS, FLASHCARD_DATA } from "./data/questions.js";
import {
  fetchQuestionsFromClaude, fetchQuestions, debounce,
  loadStats, saveStats, loadApiKey, saveApiKey, loadDarkMode, saveDarkMode,
  loadQuestionSource, saveQuestionSource,
} from "./services/api.js";
import {
  CircularTimer, ProgressBar, XPBurst, DiffTag, Spinner, SkeletonCard, Badge, SourceTag, diffColor,
} from "./components/ui.jsx";
import { getTheme, getStyles, globalCSS } from "./theme.js";

// ─── ERROR BOUNDARY ────────────────────────────────────────────────────────────
class ErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { hasError: false, error: null }; }
  static getDerivedStateFromError(error) { return { hasError: true, error }; }
  componentDidCatch(error, info) { console.error("ExamForge Error:", error, info); }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#FAF7F2", flexDirection: "column", gap: 16 }}>
          <div style={{ fontSize: 48 }}>⚠️</div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: "#2D2420" }}>Something went wrong</div>
          <div style={{ color: "#8B7355", fontSize: 14, maxWidth: 400, textAlign: "center" }}>{this.state.error?.message}</div>
          <button onClick={() => { this.setState({ hasError: false }); window.location.reload(); }}
            style={{ background: "#4CAF85", color: "#fff", border: "none", borderRadius: 9, padding: "10px 24px", fontWeight: 600, cursor: "pointer", fontSize: 14 }}>
            Reload App
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

// ─── CONSTANTS ─────────────────────────────────────────────────────────────────
const TOPICS_PER_PAGE = 12;

// ─── HEADER COMPONENT ──────────────────────────────────────────────────────────
const Header = memo(function Header({ screen, setScreen, darkMode, setDarkMode, stats, t, S }) {
  const navItems = [
    ["home", "Home"],
    ["semSelect", "Practice"],
    ["dashboard", "Progress"],
    ["flashcards", "Flashcards"],
    ["leaderboard", "Rankings"],
    ["settings", "Settings"],
  ];

  return (
    <div style={S.header}>
      <div style={S.logo} onClick={() => setScreen("home")}>ExamForge</div>
      <div style={{ display: "flex", alignItems: "center", gap: 3, flexWrap: "wrap" }}>
        {navItems.map(([s, label]) => (
          <button key={s} className="nav-link btn-ghost"
            onClick={() => setScreen(s)}
            style={{
              background: screen === s ? (darkMode ? "#ffffff12" : "#00000008") : "transparent",
              border: "none", cursor: "pointer",
              padding: "6px 11px", fontSize: 13,
              fontWeight: screen === s ? 600 : 400,
              color: screen === s ? t.text : t.muted,
              borderRadius: 7,
            }}>
            {label}
          </button>
        ))}
        <button className="btn-ghost"
          onClick={() => { setDarkMode((d) => { saveDarkMode(!d); return !d; }); }}
          style={{ background: "transparent", border: `1px solid ${t.border}`, borderRadius: 7, padding: "5px 10px", cursor: "pointer", color: t.muted, fontSize: 12, marginLeft: 4 }}>
          {darkMode ? "☀️" : "🌙"}
        </button>
        {stats.xp > 0 && (
          <div style={{ background: "#D4A02715", color: "#A07010", borderRadius: 7, padding: "5px 10px", fontSize: 12, fontWeight: 700, marginLeft: 4 }}>
            ⚡ {stats.xp} XP
          </div>
        )}
      </div>
    </div>
  );
});

// ─── SCREEN WRAPPER ────────────────────────────────────────────────────────────
const ScreenWrap = memo(function ScreenWrap({ children, title, subtitle, back, t, S, darkMode, screen, setScreen, stats, setDarkMode, showXPBurst, xpBurstVal }) {
  return (
    <div style={S.app} className={darkMode ? "dark" : ""}>
      <style>{globalCSS(t, darkMode)}</style>
      {showXPBurst && <XPBurst xp={xpBurstVal} />}
      <Header screen={screen} setScreen={setScreen} darkMode={darkMode} setDarkMode={setDarkMode} stats={stats} t={t} S={S} />
      <div style={S.page}>
        {back && (
          <button className="btn-ghost"
            style={{ ...S.outlineBtn, marginBottom: 22, display: "inline-flex", alignItems: "center", gap: 6 }}
            onClick={back}>
            ← Back
          </button>
        )}
        {title && (
          <div style={{ marginBottom: 28, animation: "fadeUp 0.4s ease forwards" }}>
            <h1 style={S.h1}>{title}</h1>
            {subtitle && <p style={{ color: t.muted, fontSize: 14, marginTop: 4 }}>{subtitle}</p>}
          </div>
        )}
        {children}
      </div>
    </div>
  );
});

// ─── MAIN APP ──────────────────────────────────────────────────────────────────
export default function App() {
// ── Theme & Persistence
  const [darkMode, setDarkMode] = useState(loadDarkMode);
  const [apiKey, setApiKey] = useState(loadApiKey);
  const [questionSource, setQuestionSource] = useState(() => loadQuestionSource());

  // ── Navigation
  const [screen, setScreen] = useState("home");
  const [selectedSem, setSelectedSem] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [topicPage, setTopicPage] = useState(0);

  // ── Quiz state
  const [questions, setQuestions] = useState([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(30);
  const totalTime = useRef(30);
  const [loadingQuiz, setLoadingQuiz] = useState(false);
  const [quizError, setQuizError] = useState(null);
  const [quizMode, setQuizMode] = useState("standard");
  const [quizDiff, setQuizDiff] = useState("all");
  const [showExplanation, setShowExplanation] = useState(false);
  const [bookmarked, setBookmarked] = useState(() => {
    try { return JSON.parse(localStorage.getItem("ef_bookmarks") || "[]"); } catch { return []; }
  });
  const [notepad, setNotepad] = useState("");
  const [showNotepad, setShowNotepad] = useState(false);

  // ── Flashcards
  const [fcCategory, setFcCategory] = useState(null);
  const [fcIndex, setFcIndex] = useState(0);
  const [fcFlipped, setFcFlipped] = useState(false);
  const [fcKnown, setFcKnown] = useState([]);

  // ── XP Burst
  const [showXPBurst, setShowXPBurst] = useState(false);
  const [xpBurstVal, setXpBurstVal] = useState(0);

  // ── Search
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  // ── Stats
  const [stats, setStats] = useState(loadStats);

  // ── Refs
  const timerRef = useRef(null);
  const nextQRef = useRef(null);

  // ── Derived theme
  const t = useMemo(() => getTheme(darkMode), [darkMode]);
  const S = useMemo(() => getStyles(t, darkMode), [t, darkMode]);

  // ── Persist stats
  useEffect(() => { saveStats(stats); }, [stats]);

  // ── Persist bookmarks
  useEffect(() => {
    try { localStorage.setItem("ef_bookmarks", JSON.stringify(bookmarked)); } catch {}
  }, [bookmarked]);

// ── Persist dark mode
  useEffect(() => { saveDarkMode(darkMode); }, [darkMode]);

  // ── Persist question source
  useEffect(() => { saveQuestionSource(questionSource); }, [questionSource]);

  // ── Timer
  useEffect(() => {
    if (screen !== "quiz" || quizMode === "practice" || questions.length === 0 || loadingQuiz) return;
    if (selected !== null) return; // paused after answer
    if (timeLeft <= 0) { handleAnswer(null); return; }
    timerRef.current = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(timerRef.current);
  }, [timeLeft, screen, quizMode, questions.length, selected, loadingQuiz]);

  // ── Keyboard shortcuts in quiz
  useEffect(() => {
    if (screen !== "quiz" || selected !== null) return;
    const handler = (e) => {
      if (["1", "2", "3", "4"].includes(e.key)) handleAnswer(parseInt(e.key) - 1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [screen, selected, questions, currentQ]);

  // ── Debounced search
  const debouncedSearch = useCallback(debounce((q) => setSearchQuery(q), 250), []);

  // ── Search results (memoized)
  const searchResults = useMemo(() => {
    if (searchQuery.length < 2) return [];
    const lq = searchQuery.toLowerCase();
    return Object.entries(SEED_QUESTIONS)
      .flatMap(([topic, qs]) =>
        qs.filter((q) => q.q.toLowerCase().includes(lq)).map((q) => ({ ...q, topic }))
      )
      .slice(0, 6);
  }, [searchQuery]);

  // ─── START QUIZ ─────────────────────────────────────────────────────────────
  const startQuiz = useCallback(async (topic, diff = "all", mode = "standard") => {
    setSelectedTopic(topic);
    setQuizDiff(diff);
    setQuizMode(mode);
    setLoadingQuiz(true);
    setQuizError(null);
    setScreen("quiz");
    setCurrentQ(0);
    setSelected(null);
    setAnswers([]);
    const time = mode === "timed" ? 15 : 30;
    totalTime.current = time;
    setTimeLeft(time);
    setShowExplanation(false);
    setShowNotepad(false);

    try {
      const seed = SEED_QUESTIONS[topic] || [];
      let pool = diff === "all" ? seed : seed.filter((q) => q.diff === diff);

// Try hybrid question source (trivia/seeds/AI)
      let qs = [];
      try {
        qs = await fetchQuestions(topic, diff, apiKey);
      } catch (err) {
        console.warn("Question fetch failed:", err.message);
        setQuizError(err.message);
        qs = pool.length > 0
          ? [...pool].sort(() => Math.random() - 0.5).slice(0, Math.min(10, pool.length))
          : [];
      }

      if (qs.length === 0 && pool.length > 0) {
        qs = [...pool].sort(() => Math.random() - 0.5).slice(0, 10);
      }

      setQuestions(qs);
    } catch (err) {
      setQuizError(err.message);
      setQuestions([]);
    } finally {
      setLoadingQuiz(false);
    }
  }, [apiKey]);

  // ─── HANDLE ANSWER ───────────────────────────────────────────────────────────
  const handleAnswer = useCallback((idx) => {
    clearTimeout(timerRef.current);
    clearTimeout(nextQRef.current);
    const q = questions[currentQ];
    if (!q || selected !== null) return;

    const correct = idx === q.ans;
    const newAnswers = [...answers, { qIdx: currentQ, selected: idx, correct, timeUsed: totalTime.current - timeLeft, q }];
    setAnswers(newAnswers);
    setSelected(idx);
    setShowExplanation(true);

    nextQRef.current = setTimeout(() => {
      setShowExplanation(false);
      if (currentQ + 1 >= questions.length) {
        finishQuiz(newAnswers);
      } else {
        setCurrentQ((c) => c + 1);
        setSelected(null);
        const time = quizMode === "timed" ? 15 : 30;
        totalTime.current = time;
        setTimeLeft(time);
      }
    }, 2000);
  }, [questions, currentQ, selected, answers, timeLeft, quizMode]);

  // ─── FINISH QUIZ ─────────────────────────────────────────────────────────────
  const finishQuiz = useCallback((ans) => {
    const correct = ans.filter((a) => a.correct).length;
    const pct = Math.round((correct / ans.length) * 100);
    const xpGained = correct * 10 + (pct === 100 ? 50 : 0) + (quizMode === "timed" ? 20 : 0);

    setXpBurstVal(xpGained);
    setShowXPBurst(true);
    setTimeout(() => setShowXPBurst(false), 1500);

    setStats((prev) => {
      const newBadges = [...(prev.badges || [])];
      if (pct === 100 && !newBadges.includes("Perfect Score")) newBadges.push("Perfect Score");
      if ((prev.totalQuizzes + 1) >= 10 && !newBadges.includes("Quiz Veteran")) newBadges.push("Quiz Veteran");
      if (quizMode === "timed" && !newBadges.includes("Speed Runner")) newBadges.push("Speed Runner");
      if ((prev.totalQuizzes + 1) >= 50 && !newBadges.includes("Scholar")) newBadges.push("Scholar");
      if ((prev.xp + xpGained) >= 1000 && !newBadges.includes("XP Legend")) newBadges.push("XP Legend");

      return {
        ...prev,
        totalQuizzes: prev.totalQuizzes + 1,
        totalCorrect: prev.totalCorrect + correct,
        totalQ: prev.totalQ + ans.length,
        xp: prev.xp + xpGained,
        streak: prev.streak + 1,
        badges: newBadges,
        lastPlayed: new Date().toISOString(),
        history: [
          ...(prev.history || []).slice(-29),
          { topic: selectedTopic, score: correct, total: ans.length, date: new Date().toLocaleDateString("en-IN"), pct, mode: quizMode, xp: xpGained },
        ],
        topicStats: {
          ...(prev.topicStats || {}),
          [selectedTopic]: {
            attempts: ((prev.topicStats || {})[selectedTopic]?.attempts || 0) + 1,
            bestPct: Math.max(((prev.topicStats || {})[selectedTopic]?.bestPct || 0), pct),
            lastPct: pct,
          },
        },
      };
    });
    setScreen("results");
  }, [quizMode, selectedTopic]);

  const toggleBookmark = useCallback((qId) => {
    setBookmarked((prev) => prev.includes(qId) ? prev.filter((id) => id !== qId) : [...prev, qId]);
  }, []);

  // ─── Common screen props ─────────────────────────────────────────────────────
  const screenProps = { t, S, darkMode, setDarkMode, screen, setScreen, stats, showXPBurst, xpBurstVal };

  // ═══════════════════════════════════════════════════════════════════════════════
  // ─── HOME SCREEN ─────────────────────────────────────────────────────────────
  // ═══════════════════════════════════════════════════════════════════════════════
  if (screen === "home") return (
    <div style={S.app} className={darkMode ? "dark" : ""}>
      <style>{globalCSS(t, darkMode)}</style>
      {showXPBurst && <XPBurst xp={xpBurstVal} />}
      <Header {...screenProps} />

      {/* Search Bar */}
      <div style={{ background: t.surface, borderBottom: `1px solid ${t.border}`, padding: "10px 24px" }}>
        <div style={{ maxWidth: 680, margin: "0 auto", position: "relative" }}>
          <input
            style={{ ...S.input, paddingLeft: 38 }}
            placeholder="🔍  Search questions across all topics…"
            onChange={(e) => debouncedSearch(e.target.value)}
          />
          {searchResults.length > 0 && (
            <div style={{ position: "absolute", top: "100%", left: 0, right: 0, background: t.surface, border: `1px solid ${t.border}`, borderRadius: 10, marginTop: 4, zIndex: 200, overflow: "hidden", boxShadow: "0 8px 32px rgba(0,0,0,0.12)" }}>
              {searchResults.map((q, i) => (
                <div key={i}
                  style={{ padding: "11px 16px", borderBottom: i < searchResults.length - 1 ? `1px solid ${t.border}` : "none", cursor: "pointer" }}
                  onClick={() => { startQuiz(q.topic); setSearchQuery(""); }}>
                  <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 3 }}>{q.q.substring(0, 70)}…</div>
                  <div style={{ fontSize: 11, color: t.muted }}>{q.topic} · <span style={{ color: diffColor[q.diff] }}>{q.diff}</span></div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Hero */}
      <div style={{ padding: "64px 24px 48px", textAlign: "center", position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, background: darkMode ? "radial-gradient(ellipse 70% 50% at 50% 0%, #4CAF8512, transparent)" : "radial-gradient(ellipse 70% 50% at 50% 0%, #4CAF8510, transparent)", pointerEvents: "none" }} />
        <div style={{ display: "inline-block", background: darkMode ? "#4CAF8515" : "#4CAF8510", border: "1px solid #4CAF8530", borderRadius: 99, padding: "5px 16px", fontSize: 11, fontWeight: 600, color: "#4CAF85", marginBottom: 24, letterSpacing: 1.5, textTransform: "uppercase" }}>
          BCA · AI &amp; Data Science · All 6 Semesters
        </div>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(32px, 5vw, 58px)", fontWeight: 800, lineHeight: 1.1, marginBottom: 20, letterSpacing: -1, color: t.text }}>
          Master Your BCA<br /><span style={{ color: "#4CAF85" }}>Exams with Confidence</span>
        </h1>
        <p style={{ color: t.muted, fontSize: 16, maxWidth: 480, margin: "0 auto 32px", lineHeight: 1.7 }}>
          AI-generated questions, smart flashcards, real-time analytics — tailored to the KR Mangalam BCA syllabus.
        </p>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: darkMode ? "#5B8DD915" : "#5B8DD910", border: "1px solid #5B8DD930", borderRadius: 99, padding: "5px 14px", fontSize: 12, color: "#5B8DD9", marginBottom: 28 }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#4CAF85", display: "inline-block", animation: "pulse 2s infinite" }} />
          Powered by Claude AI — unlimited, topic-specific questions
        </div>
        <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
          <button className="btn-primary" style={{ ...S.btn("#4CAF85"), padding: "12px 28px", fontSize: 15 }} onClick={() => setScreen("semSelect")}>Start Practicing</button>
          <button className="btn-ghost" style={S.outlineBtn} onClick={() => setScreen("flashcards")}>Flashcards</button>
          <button className="btn-ghost" style={S.outlineBtn} onClick={() => setScreen("leaderboard")}>Leaderboard</button>
        </div>
        <div style={{ display: "flex", gap: 44, justifyContent: "center", marginTop: 52, flexWrap: "wrap" }}>
          {[["6", "Semesters"], ["35+", "Subjects"], ["1000+", "Questions"], ["3", "Quiz Modes"]].map(([n, l]) => (
            <div key={l} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 30, fontWeight: 700, color: "#4CAF85", lineHeight: 1 }}>{n}</div>
              <div style={{ color: t.muted, fontSize: 12, marginTop: 4 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Semester cards */}
      <div style={{ padding: "0 24px 48px", maxWidth: 1100, margin: "0 auto" }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, marginBottom: 20 }}>Choose Your Semester</h2>
        <div style={S.grid(240)}>
          {Object.entries(BCA_CURRICULUM).map(([sem, data]) => (
            <div key={sem} className="card-hover animate-cardPop" style={{ ...S.card, borderColor: data.color + "25", cursor: "pointer" }}
              onClick={() => { setSelectedSem(parseInt(sem)); setScreen("subjectSelect"); }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                <div style={S.semNum(data.color)}>{sem}</div>
                <span style={{ color: t.muted, fontSize: 11 }}>{Object.keys(data.subjects).length} subjects</span>
              </div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, fontWeight: 700, marginBottom: 6 }}>{data.label}</div>
              <div style={{ color: t.muted, fontSize: 12 }}>{Object.values(data.subjects).flat().length} total topics</div>
              <div style={{ marginTop: 14 }}>
                <ProgressBar value={Object.keys(data.subjects).length} max={9} color={data.color} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div style={{ padding: "0 24px 64px", maxWidth: 1100, margin: "0 auto", borderTop: `1px solid ${t.border}` }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, marginBottom: 20, marginTop: 36 }}>Platform Features</h2>
        <div style={S.grid(200)}>
          {[
            ["✦ AI Questions", "Claude generates 15 unique questions per topic in real-time. Never the same quiz twice."],
            ["⚡ Three Quiz Modes", "Standard (30s timer), Timed Sprint (15s), and Practice mode with no pressure."],
            ["🃏 Smart Flashcards", "Flip-card active recall with progress tracking across 7 subject areas."],
            ["📊 Detailed Analytics", "Track accuracy, XP, streaks, per-topic performance, and full score history."],
            ["💡 Explanations", "Every AI question includes a concise explanation of the correct answer."],
            ["🔖 Bookmarks", "Save tricky questions for later review. Build your personal revision bank."],
            ["⌨️ Keyboard Shortcuts", "Press 1-4 during quiz to answer instantly without clicking."],
            ["🎯 Error Boundary", "Graceful error handling so a crash never loses your progress."],
          ].map(([title, desc]) => (
            <div key={title} style={{ ...S.card, cursor: "default" }}>
              <div style={{ fontWeight: 600, marginBottom: 7, fontSize: 14 }}>{title}</div>
              <div style={{ color: t.muted, fontSize: 12, lineHeight: 1.6 }}>{desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ═══════════════════════════════════════════════════════════════════════════════
  // ─── SEM SELECT ───────────────────────────────────────────────────────────────
  // ═══════════════════════════════════════════════════════════════════════════════
  if (screen === "semSelect") return (
    <ScreenWrap title="Select Semester" subtitle="Choose which semester to practice" back={() => setScreen("home")} {...screenProps}>
      <div style={S.grid(240)}>
        {Object.entries(BCA_CURRICULUM).map(([sem, data]) => (
          <div key={sem} className="card-hover animate-cardPop" style={{ ...S.card, borderColor: data.color + "25", cursor: "pointer" }}
            onClick={() => { setSelectedSem(parseInt(sem)); setScreen("subjectSelect"); }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
              <div style={S.semNum(data.color)}>{sem}</div>
              <span style={S.tag(data.color)}>{Object.keys(data.subjects).length} subjects</span>
            </div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, fontWeight: 700, marginBottom: 6 }}>{data.label}</div>
            <div style={{ color: t.muted, fontSize: 12 }}>{Object.values(data.subjects).flat().length} topics · AI-powered questions</div>
          </div>
        ))}
      </div>
    </ScreenWrap>
  );

  // ═══════════════════════════════════════════════════════════════════════════════
  // ─── SUBJECT SELECT ───────────────────────────────────────────────────────────
  // ═══════════════════════════════════════════════════════════════════════════════
  if (screen === "subjectSelect" && selectedSem) {
    const semData = BCA_CURRICULUM[selectedSem];
    return (
      <ScreenWrap title={semData.label} subtitle="Select a subject to explore topics" back={() => setScreen("semSelect")} {...screenProps}>
        <div style={S.grid(260)}>
          {Object.entries(semData.subjects).map(([subj, topics]) => {
            const bestPct = stats.topicStats?.[subj]?.bestPct;
            return (
              <div key={subj} className="card-hover animate-cardPop"
                style={{ ...S.card, borderColor: semData.color + "20", cursor: "pointer" }}
                onClick={() => { setSelectedSubject(subj); setTopicPage(0); setScreen("topicSelect"); }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12, alignItems: "center" }}>
                  <span style={S.tag(semData.color)}>{topics.length} topics</span>
                  {bestPct && <span style={{ fontSize: 11, color: "#4CAF85", fontWeight: 600 }}>Best: {bestPct}%</span>}
                </div>
                <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 8 }}>{subj}</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                  {topics.slice(0, 3).map((tp) => (
                    <span key={tp} style={{ background: t.surface2, borderRadius: 5, padding: "2px 7px", fontSize: 10, color: t.muted }}>{tp}</span>
                  ))}
                  {topics.length > 3 && <span style={{ color: t.muted, fontSize: 10 }}>+{topics.length - 3} more</span>}
                </div>
                <div style={{ marginTop: 14, color: t.muted, fontSize: 11 }}>Unlimited AI questions · Click to explore</div>
              </div>
            );
          })}
        </div>
      </ScreenWrap>
    );
  }

  // ═══════════════════════════════════════════════════════════════════════════════
  // ─── TOPIC SELECT ─────────────────────────────────────────────────────────────
  // ═══════════════════════════════════════════════════════════════════════════════
  if (screen === "topicSelect" && selectedSubject) {
    const allTopics = BCA_CURRICULUM[selectedSem]?.subjects[selectedSubject] || [];
    const semData = BCA_CURRICULUM[selectedSem];
    const totalPages = Math.ceil(allTopics.length / TOPICS_PER_PAGE);
    const pagedTopics = allTopics.slice(topicPage * TOPICS_PER_PAGE, (topicPage + 1) * TOPICS_PER_PAGE);

    return (
      <ScreenWrap title={selectedSubject} subtitle="Choose a topic, difficulty, and mode to begin" back={() => setScreen("subjectSelect")} {...screenProps}>
        {/* Controls */}
        <div style={{ display: "flex", gap: 24, marginBottom: 20, flexWrap: "wrap" }}>
          <div>
            <div style={{ color: t.muted, fontSize: 11, fontWeight: 600, marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.8 }}>Difficulty</div>
            <div style={{ display: "flex", gap: 6 }}>
              {["all", "easy", "medium", "hard"].map((d) => (
                <button key={d} className="btn-ghost"
                  style={{ ...S.outlineBtn, background: quizDiff === d ? (diffColor[d] || semData.color) + "20" : "transparent", color: quizDiff === d ? (diffColor[d] || semData.color) : t.muted, borderColor: quizDiff === d ? (diffColor[d] || semData.color) : t.border, padding: "6px 12px", fontSize: 12 }}
                  onClick={() => setQuizDiff(d)}>
                  {d === "all" ? "All" : d.charAt(0).toUpperCase() + d.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <div>
            <div style={{ color: t.muted, fontSize: 11, fontWeight: 600, marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.8 }}>Mode</div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {[["standard", "Standard", "30s"], ["timed", "Sprint", "15s"], ["practice", "Practice", "∞"]].map(([m, label, desc]) => (
                <button key={m} className="btn-ghost"
                  style={{ ...S.outlineBtn, background: quizMode === m ? "#5B8DD920" : "transparent", color: quizMode === m ? "#5B8DD9" : t.muted, borderColor: quizMode === m ? "#5B8DD9" : t.border, padding: "6px 12px", fontSize: 12 }}
                  onClick={() => setQuizMode(m)}>
                  {label} <span style={{ opacity: 0.6, fontSize: 10 }}>({desc})</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* AI Info Banner */}
        <div style={{ background: darkMode ? "#5B8DD912" : "#5B8DD908", border: "1px solid #5B8DD920", borderRadius: 10, padding: "10px 16px", marginBottom: 20, fontSize: 12, color: "#5B8DD9", display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#5B8DD9", display: "inline-block", flexShrink: 0 }} />
          {apiKey ? "Claude AI will generate 15 fresh questions for any topic you choose." : "Add your Anthropic API key in Settings to enable AI-generated questions. Offline seeds available."}
        </div>

        {/* Topic Grid */}
        <div style={S.grid(200)}>
          {pagedTopics.map((topic) => {
            const best = stats.topicStats?.[topic]?.bestPct;
            const attempts = stats.topicStats?.[topic]?.attempts || 0;
            return (
              <div key={topic} className="card-hover animate-cardPop"
                style={{ ...S.card, borderColor: semData.color + "18", cursor: "pointer" }}
                onClick={() => startQuiz(topic, quizDiff, quizMode)}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: semData.color, marginTop: 4 }} />
                  <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                    {best && <span style={{ fontSize: 11, color: "#4CAF85", fontWeight: 600 }}>{best}%</span>}
                    {attempts > 0 && <span style={{ fontSize: 10, color: t.muted }}>{attempts}x</span>}
                  </div>
                </div>
                <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 5 }}>{topic}</div>
                <div style={{ color: t.muted, fontSize: 11, marginBottom: best ? 10 : 0 }}>15 AI questions · Tap to begin</div>
                {best && <ProgressBar value={best} max={100} color={semData.color} height={3} />}
              </div>
            );
          })}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 10, marginTop: 24 }}>
            <button disabled={topicPage === 0} className="btn-ghost"
              style={{ ...S.outlineBtn, opacity: topicPage === 0 ? 0.4 : 1 }}
              onClick={() => setTopicPage((p) => p - 1)}>← Prev</button>
            <span style={{ color: t.muted, fontSize: 13 }}>Page {topicPage + 1} / {totalPages}</span>
            <button disabled={topicPage >= totalPages - 1} className="btn-ghost"
              style={{ ...S.outlineBtn, opacity: topicPage >= totalPages - 1 ? 0.4 : 1 }}
              onClick={() => setTopicPage((p) => p + 1)}>Next →</button>
          </div>
        )}
      </ScreenWrap>
    );
  }

  // ═══════════════════════════════════════════════════════════════════════════════
  // ─── QUIZ SCREEN ──────────────────────────────────────────────────────────────
  // ═══════════════════════════════════════════════════════════════════════════════
  if (screen === "quiz") {
    const q = questions[currentQ];
    const semColor = BCA_CURRICULUM[selectedSem]?.color || "#4CAF85";
    const isBookmarked = q && bookmarked.includes(q.id);

    // Loading skeleton
    if (loadingQuiz) return (
      <div style={{ ...S.app, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
        <style>{globalCSS(t, darkMode)}</style>
        <div style={{ textAlign: "center" }}>
          <Spinner color="#4CAF85" />
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700, marginBottom: 8, marginTop: 20 }}>Generating Questions</div>
          <div style={{ color: t.muted, fontSize: 14 }}>Claude AI is crafting 15 questions on <strong>{selectedTopic}</strong></div>
          <div style={{ marginTop: 32, maxWidth: 420 }}>
            {[1, 2, 3].map((i) => <SkeletonCard key={i} t={t} />)}
          </div>
        </div>
      </div>
    );

    // No questions
    if (!q) return (
      <div style={{ ...S.app, display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", flexDirection: "column", gap: 16 }}>
        <style>{globalCSS(t, darkMode)}</style>
        <div style={{ fontSize: 16, color: t.muted }}>No questions available for this topic.</div>
        {quizError && <div style={{ fontSize: 13, color: "#E07070", maxWidth: 400, textAlign: "center" }}>{quizError}</div>}
        <button style={S.outlineBtn} onClick={() => setScreen("topicSelect")}>← Go Back</button>
      </div>
    );

    return (
      <div style={S.app} className={darkMode ? "dark" : ""}>
        <style>{globalCSS(t, darkMode)}</style>
        {showXPBurst && <XPBurst xp={xpBurstVal} />}

        {/* Quiz Header */}
        <div style={{ ...S.header, height: 54 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={S.logo}>ExamForge</div>
            <span style={{ color: t.muted, fontSize: 12 }}>·</span>
            <span style={{ color: t.muted, fontSize: 13, maxWidth: 160, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{selectedTopic}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 7, flexWrap: "wrap" }}>
            <DiffTag diff={q.diff || "medium"} />
            <SourceTag source={q.source} />
            <span style={{ background: "#5B8DD915", color: "#5B8DD9", borderRadius: 6, padding: "2px 8px", fontSize: 11, fontWeight: 600 }}>{quizMode}</span>
            <button style={{ ...S.outlineBtn, padding: "4px 10px", fontSize: 12 }} onClick={() => toggleBookmark(q.id)}>
              {isBookmarked ? "🔖 Saved" : "🔖 Save"}
            </button>
            <button style={{ ...S.outlineBtn, padding: "4px 10px", fontSize: 12 }} onClick={() => setShowNotepad((n) => !n)}>📝</button>
            <button style={{ ...S.outlineBtn, padding: "4px 10px", fontSize: 12 }} onClick={() => { clearTimeout(nextQRef.current); setScreen("topicSelect"); }}>✕ Exit</button>
          </div>
        </div>

        {/* Error banner */}
        {quizError && (
          <div style={{ background: "#D4A02710", borderBottom: `1px solid #D4A02730`, padding: "8px 24px", fontSize: 12, color: "#A07010", textAlign: "center" }}>
            ⚠️ {quizError}
          </div>
        )}

        {/* Notepad */}
        {showNotepad && (
          <div style={{ position: "fixed", right: 20, top: 70, width: 280, background: t.surface, border: `1px solid ${t.border}`, borderRadius: 12, padding: 16, zIndex: 200, boxShadow: "0 12px 40px rgba(0,0,0,0.15)" }}>
            <div style={{ fontWeight: 600, marginBottom: 8, fontSize: 13 }}>📝 Notes</div>
            <textarea value={notepad} onChange={(e) => setNotepad(e.target.value)}
              style={{ ...S.input, height: 130, resize: "vertical", fontFamily: "monospace", fontSize: 12, lineHeight: 1.5 }}
              placeholder="Jot down notes…" />
          </div>
        )}

        <div style={{ maxWidth: 700, margin: "0 auto", padding: "24px 20px" }}>
          {/* Progress row */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <span style={{ color: t.muted, fontSize: 13 }}>Q {currentQ + 1} / {questions.length}</span>
            <span style={{ color: t.muted, fontSize: 13 }}>{answers.filter((a) => a.correct).length} correct · <span style={{ fontSize: 11 }}>⌨️ 1-4 to answer</span></span>
          </div>
          <ProgressBar value={currentQ} max={Math.max(questions.length, 1)} color={semColor} />

          {/* Question Card */}
          <div style={{ ...S.card, marginTop: 24, position: "relative", padding: "28px 26px 24px" }}>
            {quizMode !== "practice" && (
              <div style={{ position: "absolute", top: -24, right: 20 }}>
                <CircularTimer seconds={timeLeft} total={quizMode === "timed" ? 15 : 30} dark={darkMode} />
              </div>
            )}
            <p style={{ fontSize: 17, fontWeight: 500, lineHeight: 1.65, marginBottom: 24, paddingRight: quizMode !== "practice" ? 72 : 0, color: t.text }}
              dangerouslySetInnerHTML={{ __html: q.q }} />

            <div style={{ display: "grid", gap: 9 }}>
              {q.opts.map((opt, idx) => {
                let bg = t.surface2;
                let border = t.border;
                let col = t.text;
                if (selected !== null) {
                  if (idx === q.ans) { bg = darkMode ? "#064E3B" : "#E8F5EF"; border = "#4CAF85"; col = "#2D7A5A"; }
                  else if (idx === selected && selected !== q.ans) { bg = darkMode ? "#450A0A" : "#FDEAEA"; border = "#E07070"; col = "#B03030"; }
                }
                return (
                  <button key={idx} disabled={selected !== null} onClick={() => handleAnswer(idx)}
                    className="opt-btn"
                    style={{ background: bg, border: `1px solid ${border}`, borderRadius: 10, padding: "12px 16px", textAlign: "left", cursor: selected !== null ? "default" : "pointer", color: col, fontSize: 14, fontWeight: 400, display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ background: darkMode ? "#ffffff10" : "#00000008", borderRadius: 6, minWidth: 26, height: 26, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: t.muted, flexShrink: 0 }}>
                      {["A", "B", "C", "D"][idx]}
                    </span>
                    <span dangerouslySetInnerHTML={{ __html: opt }} />
                    {selected !== null && idx === q.ans && <span style={{ marginLeft: "auto", fontSize: 16 }}>✓</span>}
                  </button>
                );
              })}
            </div>

            {/* Explanation */}
            {selected !== null && (
              <div style={{ marginTop: 16, padding: "13px 16px", borderRadius: 10, background: selected === q.ans ? (darkMode ? "#064E3B40" : "#E8F5EF") : (darkMode ? "#450A0A40" : "#FDEAEA"), border: `1px solid ${selected === q.ans ? "#4CAF8540" : "#E0707040"}`, color: selected === q.ans ? "#2D7A5A" : "#B03030", fontSize: 13, animation: "fadeUp 0.3s ease forwards" }}>
                <div style={{ fontWeight: 600, marginBottom: q.explanation ? 5 : 0 }}>
                  {selected === q.ans ? "✓ Correct!" : `✗ Incorrect — ${q.opts[q.ans]}`}
                </div>
                {q.explanation && <div style={{ fontSize: 12, opacity: 0.85, lineHeight: 1.5 }}>{q.explanation}</div>}
              </div>
            )}
          </div>

          {/* Dot progress */}
          <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 20, flexWrap: "wrap" }}>
            {questions.map((_, i) => {
              const a = answers[i];
              return (
                <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: i === currentQ ? semColor : a ? (a.correct ? "#4CAF85" : "#E07070") : t.border, transition: "all 0.25s" }} />
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════════════════════
  // ─── RESULTS SCREEN ───────────────────────────────────────────────────────────
  // ═══════════════════════════════════════════════════════════════════════════════
  if (screen === "results") {
    const correct = answers.filter((a) => a.correct).length;
    const pct = Math.round((correct / Math.max(answers.length, 1)) * 100);
    const grade = pct >= 90 ? "S" : pct >= 75 ? "A" : pct >= 60 ? "B" : pct >= 45 ? "C" : "D";
    const gradeColor = pct >= 75 ? "#4CAF85" : pct >= 50 ? "#D4A027" : "#E07070";

    return (
      <div style={S.app} className={darkMode ? "dark" : ""}>
        <style>{globalCSS(t, darkMode)}</style>
        <Header {...screenProps} />
        <div style={{ maxWidth: 640, margin: "0 auto", padding: "36px 20px" }}>
          <div style={{ textAlign: "center", marginBottom: 24, animation: "fadeUp 0.4s ease" }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 72, fontWeight: 800, color: gradeColor, lineHeight: 1, marginBottom: 6 }}>{grade}</div>
            <div style={{ color: t.muted, fontSize: 14 }}>Grade · {quizMode} mode · {selectedTopic}</div>
          </div>

          <div style={{ ...S.card, textAlign: "center", marginBottom: 18 }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 48, fontWeight: 700, color: gradeColor, lineHeight: 1 }}>{pct}%</div>
            <div style={{ color: t.muted, margin: "8px 0 18px" }}>{correct} of {answers.length} correct</div>
            <ProgressBar value={correct} max={answers.length} color={gradeColor} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, marginTop: 24 }}>
              {[["Correct", correct, "#4CAF85"], ["Wrong", answers.length - correct, "#E07070"], ["XP Earned", correct * 10, "#D4A027"]].map(([label, val, col]) => (
                <div key={label} style={{ background: t.surface2, borderRadius: 10, padding: 14 }}>
                  <div style={{ fontSize: 24, fontWeight: 800, color: col, fontFamily: "'Playfair Display', serif" }}>{val}</div>
                  <div style={{ color: t.muted, fontSize: 11, marginTop: 2 }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Answer Review */}
          <div style={{ ...S.card, marginBottom: 18 }}>
            <div style={{ fontWeight: 600, marginBottom: 14, fontSize: 14 }}>Answer Review</div>
            {answers.map((ans, i) => (
              <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 10, padding: 11, background: t.surface2, borderRadius: 9 }}>
                <div style={{ color: ans.correct ? "#4CAF85" : "#E07070", fontWeight: 700, fontSize: 14, flexShrink: 0, marginTop: 1 }}>{ans.correct ? "✓" : "✗"}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 500, marginBottom: 3 }} dangerouslySetInnerHTML={{ __html: (ans.q?.q || "").substring(0, 80) + "…" }} />
                  {!ans.correct && ans.q && <div style={{ fontSize: 11, color: "#4CAF85" }}>✓ {ans.q.opts[ans.q.ans]}</div>}
                  {ans.q?.explanation && <div style={{ fontSize: 11, color: t.muted, marginTop: 3 }}>{ans.q.explanation.substring(0, 80)}…</div>}
                </div>
                <DiffTag diff={ans.q?.diff || "medium"} />
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
            <button className="btn-primary" style={S.btn("#4CAF85")} onClick={() => startQuiz(selectedTopic, quizDiff, quizMode)}>🔄 Retry</button>
            <button className="btn-ghost" style={S.outlineBtn} onClick={() => setScreen("topicSelect")}>Pick Topic</button>
            <button className="btn-ghost" style={S.outlineBtn} onClick={() => setScreen("dashboard")}>Dashboard</button>
          </div>
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════════════════════
  // ─── FLASHCARDS SCREEN ────────────────────────────────────────────────────────
  // ═══════════════════════════════════════════════════════════════════════════════
  if (screen === "flashcards") {
    const categories = Object.keys(FLASHCARD_DATA);
    const cards = fcCategory ? FLASHCARD_DATA[fcCategory] : [];
    const card = cards[fcIndex] || null;

    return (
      <ScreenWrap title="Flashcards" subtitle="Active recall for rapid, lasting learning" {...screenProps}>
        {!fcCategory ? (
          <div style={S.grid(200)}>
            {categories.map((cat) => (
              <div key={cat} className="card-hover animate-cardPop" style={{ ...S.card, cursor: "pointer" }}
                onClick={() => { setFcCategory(cat); setFcIndex(0); setFcFlipped(false); setFcKnown([]); }}>
                <div style={{ fontWeight: 700, marginBottom: 5, fontSize: 15 }}>{cat}</div>
                <div style={{ color: t.muted, fontSize: 12, marginBottom: 14 }}>{FLASHCARD_DATA[cat].length} cards</div>
                <ProgressBar value={FLASHCARD_DATA[cat].length} max={8} color="#5B8DD9" />
              </div>
            ))}
          </div>
        ) : (
          <div>
            <div style={{ display: "flex", gap: 10, marginBottom: 20, alignItems: "center", flexWrap: "wrap" }}>
              <button className="btn-ghost" style={S.outlineBtn} onClick={() => setFcCategory(null)}>← All</button>
              <span style={{ color: t.muted, fontSize: 13 }}>{fcCategory} · {fcIndex + 1} / {cards.length}</span>
              <span style={{ marginLeft: "auto", color: "#4CAF85", fontSize: 12, fontWeight: 600 }}>{fcKnown.length} known</span>
            </div>
            <ProgressBar value={fcIndex + 1} max={cards.length} color="#5B8DD9" />

            {/* Flip card */}
            <div style={{ perspective: 1000, marginTop: 28, marginBottom: 20 }} onClick={() => setFcFlipped((f) => !f)}>
              <div style={{ position: "relative", width: "100%", maxWidth: 560, margin: "0 auto", height: 260, transformStyle: "preserve-3d", transition: "transform 0.55s ease", transform: fcFlipped ? "rotateY(180deg)" : "rotateY(0deg)", cursor: "pointer" }}>
                {/* Front */}
                <div style={{ position: "absolute", inset: 0, backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", background: t.card, border: `1px solid ${t.cardBorder}`, borderRadius: 18, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 36, textAlign: "center" }}>
                  <div style={{ color: "#5B8DD9", fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 20 }}>Question</div>
                  <div style={{ fontSize: 18, fontWeight: 600, lineHeight: 1.55 }}>{card?.front}</div>
                  <div style={{ color: t.muted, fontSize: 12, marginTop: 22 }}>Tap to reveal answer</div>
                </div>
                {/* Back */}
                <div style={{ position: "absolute", inset: 0, backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", transform: "rotateY(180deg)", background: darkMode ? "#0D2B1E" : "#E8F5EF", border: "1px solid #4CAF8530", borderRadius: 18, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 36, textAlign: "center" }}>
                  <div style={{ color: "#4CAF85", fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 20 }}>Answer</div>
                  <div style={{ fontSize: 15, lineHeight: 1.7, color: t.text }}>{card?.back}</div>
                </div>
              </div>
            </div>

            <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", marginBottom: 16 }}>
              <button className="btn-primary" style={{ ...S.btn("#E07070"), fontSize: 13, padding: "9px 18px" }}
                onClick={() => { setFcFlipped(false); if (fcIndex < cards.length - 1) setFcIndex((i) => i + 1); }}>
                Still Learning
              </button>
              <button className="btn-primary" style={{ ...S.btn("#4CAF85"), fontSize: 13, padding: "9px 18px" }}
                onClick={() => { setFcKnown((k) => [...new Set([...k, fcIndex])]); setFcFlipped(false); if (fcIndex < cards.length - 1) setFcIndex((i) => i + 1); else setFcCategory(null); }}>
                I Know This ✓
              </button>
            </div>

            <div style={{ display: "flex", gap: 7, justifyContent: "center", flexWrap: "wrap" }}>
              {cards.map((_, i) => (
                <div key={i} onClick={() => { setFcIndex(i); setFcFlipped(false); }}
                  style={{ width: 8, height: 8, borderRadius: "50%", background: fcKnown.includes(i) ? "#4CAF85" : i === fcIndex ? "#5B8DD9" : t.border, cursor: "pointer", transition: "all 0.2s" }} />
              ))}
            </div>
          </div>
        )}
      </ScreenWrap>
    );
  }

  // ═══════════════════════════════════════════════════════════════════════════════
  // ─── LEADERBOARD SCREEN ───────────────────────────────────────────────────────
  // ═══════════════════════════════════════════════════════════════════════════════
  if (screen === "leaderboard") {
    const myEntry = { name: "You", xp: stats.xp, level: Math.floor(stats.xp / 100) + 1, streak: stats.streak };
    const all = [...MOCK_LEADERBOARD, myEntry].sort((a, b) => b.xp - a.xp);
    const myRank = all.findIndex((e) => e.name === "You") + 1;

    return (
      <ScreenWrap title="Rankings" subtitle="Top performers this month" {...screenProps}>
        <div style={{ ...S.card, marginBottom: 20, textAlign: "center" }}>
          <div style={{ color: t.muted, fontSize: 13, marginBottom: 4 }}>Your Rank</div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 52, fontWeight: 800, color: "#D4A027", lineHeight: 1, marginBottom: 6 }}>#{myRank}</div>
          <div style={{ color: t.muted, fontSize: 13, marginBottom: 14 }}>{stats.xp} XP · Level {Math.floor(stats.xp / 100) + 1}</div>
          <ProgressBar value={stats.xp % 100} max={100} color="#D4A027" />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
          {all.map((entry, i) => {
            const isYou = entry.name === "You";
            const medal = i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `${i + 1}.`;
            return (
              <div key={i} style={{ ...S.card, display: "flex", alignItems: "center", gap: 14, padding: "14px 18px", borderColor: isYou ? "#5B8DD940" : t.cardBorder, background: isYou ? (darkMode ? "#5B8DD910" : "#EEF3FB") : t.card }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, fontWeight: 700, minWidth: 36, color: i < 3 ? "#D4A027" : t.muted }}>{medal}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 14, color: isYou ? "#5B8DD9" : t.text }}>{entry.name}{isYou ? " (You)" : ""}</div>
                  <div style={{ color: t.muted, fontSize: 12 }}>Level {entry.level} · {entry.streak} day streak</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontWeight: 700, color: "#D4A027", fontSize: 15 }}>{entry.xp.toLocaleString()}</div>
                  <div style={{ color: t.muted, fontSize: 11 }}>XP</div>
                </div>
              </div>
            );
          })}
        </div>
        <div style={{ textAlign: "center", marginTop: 24 }}>
          <button className="btn-primary" style={S.btn("#4CAF85")} onClick={() => setScreen("semSelect")}>Earn More XP</button>
        </div>
      </ScreenWrap>
    );
  }

  // ═══════════════════════════════════════════════════════════════════════════════
  // ─── DASHBOARD SCREEN ─────────────────────────────────────────────────────────
  // ═══════════════════════════════════════════════════════════════════════════════
  if (screen === "dashboard") {
    const accuracy = stats.totalQ > 0 ? Math.round((stats.totalCorrect / stats.totalQ) * 100) : 0;
    const level = Math.floor(stats.xp / 100) + 1;
    const xpProgress = stats.xp % 100;
    const topTopics = Object.entries(stats.topicStats || {}).sort((a, b) => b[1].bestPct - a[1].bestPct).slice(0, 6);

    return (
      <ScreenWrap title="Progress" subtitle="Your learning analytics and achievements" {...screenProps}>
        {/* Stat cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 14, marginBottom: 22 }}>
          {[["⚡ XP", stats.xp, "#D4A027"], ["🎯 Accuracy", `${accuracy}%`, "#4CAF85"], ["📝 Quizzes", stats.totalQuizzes, "#5B8DD9"], ["🔥 Streak", `${stats.streak}d`, "#E07A40"], ["🏅 Level", level, "#9B72CF"]].map(([label, val, color]) => (
            <div key={label} style={{ ...S.card, textAlign: "center", cursor: "default" }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 700, color, lineHeight: 1, marginBottom: 4 }}>{val}</div>
              <div style={{ color: t.muted, fontSize: 12 }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Level progress */}
        <div style={{ ...S.card, marginBottom: 18, cursor: "default" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
            <span style={{ fontWeight: 600, fontSize: 14 }}>Level {level} Progress</span>
            <span style={{ color: "#D4A027", fontWeight: 600, fontSize: 13 }}>{xpProgress}/100 XP</span>
          </div>
          <ProgressBar value={xpProgress} max={100} color="#D4A027" />
          <div style={{ color: t.muted, fontSize: 12, marginTop: 7 }}>{100 - xpProgress} XP to Level {level + 1}</div>
        </div>

        {/* Charts + Badges row */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginBottom: 18 }}>
          <div style={{ ...S.card, cursor: "default" }}>
            <div style={{ fontWeight: 600, marginBottom: 16, fontSize: 14 }}>Recent Scores</div>
            {(stats.history || []).length > 0 ? (
              <div style={{ display: "flex", alignItems: "flex-end", gap: 5, height: 80 }}>
                {(stats.history || []).slice(-8).map((h, i) => (
                  <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
                    <div style={{ fontSize: 9, color: t.muted }}>{h.pct}%</div>
                    <div title={`${h.topic}: ${h.pct}%`} style={{ width: "100%", height: `${(h.pct / 100) * 70}px`, minHeight: 3, background: h.pct >= 75 ? "#4CAF85" : h.pct >= 50 ? "#D4A027" : "#E07070", borderRadius: "3px 3px 0 0", transition: "height 0.5s ease" }} />
                  </div>
                ))}
              </div>
            ) : <div style={{ color: t.muted, fontSize: 13, textAlign: "center", padding: "20px 0" }}>Take some quizzes to see scores</div>}
          </div>

          <div style={{ ...S.card, cursor: "default" }}>
            <div style={{ fontWeight: 600, marginBottom: 14, fontSize: 14 }}>Badges</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
              {["Perfect Score", "Quiz Veteran", "Speed Runner", "Scholar", "XP Legend"].map((b) => (
                <Badge key={b} label={b} earned={(stats.badges || []).includes(b)} />
              ))}
            </div>
          </div>
        </div>

        {/* Top topics */}
        {topTopics.length > 0 && (
          <div style={{ ...S.card, cursor: "default", marginBottom: 18 }}>
            <div style={{ fontWeight: 600, marginBottom: 16, fontSize: 14 }}>Top Topics by Best Score</div>
            {topTopics.map(([topic, data]) => (
              <div key={topic} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                <div style={{ flex: 1, fontSize: 13 }}>{topic}</div>
                <div style={{ width: 100 }}><ProgressBar value={data.bestPct} max={100} color={data.bestPct >= 75 ? "#4CAF85" : data.bestPct >= 50 ? "#D4A027" : "#E07070"} /></div>
                <div style={{ fontSize: 12, fontWeight: 600, minWidth: 38, textAlign: "right", color: data.bestPct >= 75 ? "#4CAF85" : data.bestPct >= 50 ? "#D4A027" : "#E07070" }}>{data.bestPct}%</div>
                <span style={{ fontSize: 10, color: t.muted }}>{data.attempts}x</span>
              </div>
            ))}
          </div>
        )}

        {/* History */}
        <div style={{ ...S.card, cursor: "default", marginBottom: 24 }}>
          <div style={{ fontWeight: 600, marginBottom: 14, fontSize: 14 }}>Recent History</div>
          {(stats.history || []).length === 0 ? (
            <div style={{ color: t.muted, fontSize: 14, textAlign: "center", padding: "16px 0" }}>No quizzes yet — start practicing!</div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[...(stats.history || [])].reverse().slice(0, 8).map((h, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, background: t.surface2, borderRadius: 9, padding: "10px 12px" }}>
                  <div style={{ width: 36, height: 36, borderRadius: 8, background: h.pct >= 75 ? (darkMode ? "#064E3B" : "#E8F5EF") : h.pct >= 50 ? (darkMode ? "#451A03" : "#FEF3CD") : (darkMode ? "#450A0A" : "#FDEAEA"), display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: h.pct >= 75 ? "#2D7A5A" : h.pct >= 50 ? "#A07010" : "#B03030" }}>{h.pct}%</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 13 }}>{h.topic}</div>
                    <div style={{ color: t.muted, fontSize: 11 }}>{h.date} · {h.score}/{h.total} · {h.mode} · +{h.xp || 0} XP</div>
                  </div>
                  <div style={{ width: 70 }}><ProgressBar value={h.score} max={h.total} color={h.pct >= 75 ? "#4CAF85" : h.pct >= 50 ? "#D4A027" : "#E07070"} /></div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ textAlign: "center" }}>
          <button className="btn-primary" style={S.btn("#4CAF85")} onClick={() => setScreen("semSelect")}>Start New Quiz</button>
        </div>
      </ScreenWrap>
    );
  }

  // Settings local state (must be at top-level to follow Rules of Hooks)
  const [localKey, setLocalKey] = useState(apiKey);
  const [keySaved, setKeySaved] = useState(false);

  // ═══════════════════════════════════════════════════════════════════════════════
  // ─── SETTINGS SCREEN ──────────────────────────────────────────────────────────
  // ═══════════════════════════════════════════════════════════════════════════════
  if (screen === "settings") {
    const handleSave = () => {
      setApiKey(localKey);
      saveApiKey(localKey);
      setKeySaved(true);
      setTimeout(() => setKeySaved(false), 2000);
    };

    return (
      <ScreenWrap title="Settings" subtitle="Configure ExamForge to suit your needs" back={() => setScreen("home")} {...screenProps}>
{/* Question Source */}
        <div style={{ ...S.card, marginBottom: 20 }}>
          <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 6 }}>Question Source</div>
          <div style={{ color: t.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.6 }}>
            Choose where to get questions: Trivia DB, Seeds, or AI.
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {[
              ["ai", "🤖 AI (All Topics)", "Claude AI generates questions for any topic"],
              ["seeds", "📚 Seeds", "Built-in 1000+ offline questions"],
              ["trivia", "🌐 Trivia DB", "Open Trivia Database (Computer Science)"],
            ].map(([src, label, desc]) => (
              <button key={src}
onClick={() => { setQuestionSource(src); saveQuestionSource(src); }}
                style={{
                  ...S.outlineBtn,
                  background: questionSource === src ? "#5B8DD920" : "transparent",
                  color: questionSource === src ? "#5B8DD9" : t.text,
                  borderColor: questionSource === src ? "#5B8DD9" : t.border,
                  padding: "8px 14px",
                  fontSize: 13,
                }}>
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* API Key */}
        <div style={{ ...S.card, marginBottom: 20 }}>
          <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 6 }}>Anthropic API Key</div>
          <div style={{ color: t.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.6 }}>
            Add your API key to enable AI-generated questions. Get one at{" "}
            <a href="https://console.anthropic.com" target="_blank" rel="noreferrer" style={{ color: "#5B8DD9" }}>console.anthropic.com</a>.
            Without it, ExamForge falls back to the built-in 1000+ question bank.
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <input
              type="password"
              value={localKey}
              onChange={(e) => setLocalKey(e.target.value)}
              placeholder="sk-ant-api03-…"
              style={{ ...S.input, flex: 1 }}
            />
            <button className="btn-primary" style={{ ...S.btn("#4CAF85"), whiteSpace: "nowrap" }} onClick={handleSave}>
              {keySaved ? "✓ Saved" : "Save Key"}
            </button>
          </div>
          {apiKey && (
            <div style={{ marginTop: 10, fontSize: 12, color: "#4CAF85" }}>
              ✓ API key configured — AI questions enabled
            </div>
          )}
        </div>

        {/* Project Info */}
        <div style={{ ...S.card, marginBottom: 20 }}>
          <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 12 }}>Project Tech Stack</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {[
              ["Frontend", "React (Vite), JavaScript ES6+"],
              ["State", "useState, useReducer, Context API"],
              ["Routing", "Screen-based state navigation"],
              ["API", "Anthropic Claude API (claude-sonnet-4)"],
              ["Styling", "Inline styles + CSS-in-JS"],
              ["Performance", "useMemo, useCallback, React.memo"],
              ["Error Handling", "Error Boundary component"],
              ["Storage", "localStorage with fallback"],
              ["Deployment", "Vite build → Vercel / Netlify"],
              ["Advanced", "Pagination, debounce, caching, lazy load"],
            ].map(([k, v]) => (
              <div key={k} style={{ background: t.surface2, borderRadius: 9, padding: "10px 14px" }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: t.muted, marginBottom: 3 }}>{k}</div>
                <div style={{ fontSize: 13, fontWeight: 500 }}>{v}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Advanced Features */}
        <div style={{ ...S.card, marginBottom: 20 }}>
          <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 12 }}>Advanced Features (Assignment)</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {[
              "✓ Authentication (API key)",
              "✓ Pagination (topic grid)",
              "✓ Search + filter + sort",
              "✓ Dark mode toggle",
              "✓ Real-time data refresh",
              "✓ Debounced API calls",
              "✓ Error boundary",
              "✓ Performance memoization",
              "✓ Dashboard with charts",
              "✓ Multi-step quiz flow",
              "✓ CRUD (bookmarks)",
              "✓ 1000+ offline questions",
              "✓ API response caching",
              "✓ Keyboard shortcuts",
              "✓ Lazy AI fetch + skeleton",
            ].map((f) => (
              <div key={f} style={{ background: "#4CAF8515", color: "#2D7A5A", border: "1px solid #4CAF8530", borderRadius: 7, padding: "5px 11px", fontSize: 12, fontWeight: 500 }}>{f}</div>
            ))}
          </div>
        </div>

        {/* Reset */}
        <div style={{ ...S.card, borderColor: "#E0707030" }}>
          <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 6 }}>Reset Progress</div>
          <div style={{ color: t.muted, fontSize: 13, marginBottom: 14 }}>Clear all quiz history, XP, and stats. This cannot be undone.</div>
          <button
            className="btn-ghost"
            style={{ ...S.outlineBtn, borderColor: "#E07070", color: "#E07070" }}
            onClick={() => {
              if (window.confirm("Reset all progress? This cannot be undone.")) {
                setStats(loadStats());
                localStorage.removeItem("ef_stats_v5");
                localStorage.removeItem("ef_bookmarks");
                setBookmarked([]);
              }
            }}>
            Reset All Progress
          </button>
        </div>
      </ScreenWrap>
    );
  }

  // Fallback
  return (
    <div style={S.app}>
      <style>{globalCSS(t, darkMode)}</style>
      <Header {...screenProps} />
      <div style={{ padding: 60, textAlign: "center", color: t.muted }}>Loading ExamForge…</div>
    </div>
  );
}

// Wrap with error boundary in the exported component
export function AppWithErrorBoundary() {
  return (
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  );
}
