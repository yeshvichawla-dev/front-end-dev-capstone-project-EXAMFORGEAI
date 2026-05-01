// ─── API SERVICE ─────────────────────────────────────────────────────────────
// Cache to avoid redundant API calls for the same topic+difficulty
const questionCache = new Map();

// User's API key
const DEFAULT_API_KEY = "AIzaSyBykrHWn5fgDbDNvr_NOcdkg87VOy4DYqw";

// ═══════════════════════════════════════════════════════════════════════════════
// QUESTION SOURCE MANAGEMENT (Hybrid: Trivia DB / Seeds / AI)
// ═══════════════════════════════════════════════════════════════════════════════
// Question source preference: "trivia" | "seeds" | "ai"
export function loadQuestionSource() {
  try {
    return localStorage.getItem("ef_question_source") || "ai";
  } catch { return "ai"; }
}

export function saveQuestionSource(source) {
  try {
    localStorage.setItem("ef_question_source", source);
  } catch {}
}

export function getCacheKey(topic, difficulty) {
  return `${topic}::${difficulty}`;
}

export function getCached(topic, difficulty) {
  return questionCache.get(getCacheKey(topic, difficulty)) || null;
}

export function setCache(topic, difficulty, questions) {
  questionCache.set(getCacheKey(topic, difficulty), questions);
}

export async function fetchQuestionsFromClaude(topic, difficulty = "all", count = 15, apiKey = "") {
  const cached = getCached(topic, difficulty);
  if (cached) return cached;

  const diffInstruction =
    difficulty === "all"
      ? "Mix of easy (40%), medium (40%), and hard (20%) questions."
      : `All questions should be ${difficulty} difficulty.`;

  const prompt = `Generate exactly ${count} multiple choice questions about "${topic}" for BCA (Bachelor of Computer Applications) students.
${diffInstruction}

Return ONLY a JSON array — no markdown fences, no preamble, no trailing text. Each object must have:
- "q": question string
- "opts": array of exactly 4 answer strings
- "ans": index 0-3 of the correct answer
- "diff": "easy", "medium", or "hard"
- "explanation": 1-2 sentence explanation of why the answer is correct

Example: [{"q":"What is X?","opts":["A","B","C","D"],"ans":2,"diff":"easy","explanation":"C is correct because..."}]`;

  const headers = { "Content-Type": "application/json" };
  if (apiKey) headers["x-api-key"] = apiKey;

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers,
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 4000,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err?.error?.message || `API Error ${response.status}`);
  }

  const data = await response.json();
  const text = data.content?.map((b) => b.text || "").join("") || "";
  const clean = text.replace(/```json|```/g, "").trim();

  let parsed;
  try {
    parsed = JSON.parse(clean);
  } catch {
    const match = clean.match(/\[[\s\S]*\]/);
    if (match) parsed = JSON.parse(match[0]);
    else throw new Error("Failed to parse questions from API response");
  }

  if (!Array.isArray(parsed) || parsed.length === 0) {
    throw new Error("No questions returned from API");
  }

  const result = parsed.map((q, i) => ({
    ...q,
    id: Date.now() + i,
    source: "AI Generated",
  }));

  setCache(topic, difficulty, result);
  return result;
}

// Fetch questions from Open Trivia Database
// API: https://opentdb.com/api.php?amount=50&category=18&difficulty=hard&type=multiple
// Category 18 = Science: Computers & Technology
export async function fetchQuestionsFromTrivia(amount = 50, category = 18, difficulty = "all") {
  const cacheKey = `trivia::${category}::${difficulty}::${amount}`;
  const cached = questionCache.get(cacheKey);
  if (cached) return cached;

  const diffParam = difficulty === "all" ? "" : `&difficulty=${difficulty}`;
  const url = `https://opentdb.com/api.php?amount=${amount}&category=${category}${diffParam}&type=multiple`;

  console.log("Fetching from Open Trivia DB:", url);

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Open Trivia API Error ${response.status}`);
  }

  const data = await response.json();

  if (data.response_code !== 0) {
    throw new Error("Failed to fetch questions from Open Trivia Database");
  }

  const decodeHtml = (html) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  const result = data.results.map((q, i) => {
    const allOptions = [q.correct_answer, ...q.incorrect_answers].sort(() => Math.random() - 0.5);
    const correctIndex = allOptions.findIndex(opt => opt === q.correct_answer);

    return {
      id: Date.now() + i,
      q: decodeHtml(q.question),
      opts: allOptions.map(opt => decodeHtml(opt)),
      ans: correctIndex,
      diff: q.difficulty,
      explanation: `This is the correct answer from Open Trivia Database (Category: ${q.category}).`,
      source: "Open Trivia DB",
    };
  });

  questionCache.set(cacheKey, result);
  return result;
}

// Fetch questions from the built-in seed questions
import { SEED_QUESTIONS } from "../data/questions.js";

const SEED_TOPIC_MAP = {
  "Data & Information": "Data & Information",
  "Decision Making Basics": "Decision Making Basics",
  "Python Basics": "Python Basics",
  "HTML Basics": "HTML Basics",
  "CSS Basics": "CSS Basics",
  "JavaScript Basics": "JavaScript Basics",
  "React Basics": "React Basics",
  "SQL Basics": "SQL Basics",
  "C Basics": "C Basics",
  "C++ Basics": "C++ Basics",
  "Java Basics": "Java Basics",
  "Data Wrangling & EDA": "Data Wrangling & EDA",
  "Machine Learning Fundamentals": "Machine Learning Fundamentals",
  "DBMS": "DBMS",
  "Operating Systems": "Operating Systems",
  "Cloud Computing": "Cloud Computing",
  "Deep Learning": "Deep Learning",
};

export async function fetchQuestionsFromSeeds(topic, difficulty = "all") {
  const cacheKey = `seeds::${topic}::${difficulty}`;
  const cached = questionCache.get(cacheKey);
  if (cached) return cached;

  let seedKey = SEED_TOPIC_MAP[topic] || topic;
  let seedQs = SEED_QUESTIONS[seedKey] || [];

  if (seedQs.length === 0) {
    const allTopics = Object.keys(SEED_QUESTIONS);
    const matched = allTopics.find((t) => topic.toLowerCase().includes(t.toLowerCase()) || t.toLowerCase().includes(topic.toLowerCase()));
    if (matched) {
      seedKey = matched;
      seedQs = SEED_QUESTIONS[matched];
    }
  }

  if (seedQs.length === 0) {
    throw new Error(`No seed questions found for topic: ${topic}`);
  }

  let filtered = seedQs;
  if (difficulty !== "all") {
    filtered = seedQs.filter((q) => q.diff === difficulty);
  }

  const result = [...filtered]
    .sort(() => Math.random() - 0.5)
    .slice(0, Math.min(15, filtered.length))
    .map((q, i) => ({
      ...q,
      id: Date.now() + i,
      source: "Seed Questions",
    }));

  questionCache.set(cacheKey, result);
  return result;
}

// Unified function - fetches questions based on user's selected source
// Falls back to other sources if primary fails
export async function fetchQuestions(topic, difficulty = "all", apiKey = "") {
  const source = loadQuestionSource();

  try {
    if (source === "trivia") {
      console.log("Fetching from Trivia DB...");
      return await fetchQuestionsFromTrivia(15, 18, difficulty);
    } else if (source === "seeds") {
      console.log("Fetching from Seeds...");
      return await fetchQuestionsFromSeeds(topic, difficulty);
    } else {
      console.log("Fetching from AI...");
      return await fetchQuestionsFromClaude(topic, difficulty, 15, apiKey);
    }
  } catch (primaryError) {
    console.warn(`Primary source (${source}) failed:`, primaryError.message);

    if (source === "trivia") {
      try {
        console.log("Falling back to Seeds...");
        return await fetchQuestionsFromSeeds(topic, difficulty);
      } catch {
        console.log("Falling back to AI...");
        return await fetchQuestionsFromClaude(topic, difficulty, 15, apiKey);
      }
    } else if (source === "seeds") {
      try {
        console.log("Falling back to AI...");
        return await fetchQuestionsFromClaude(topic, difficulty, 15, apiKey);
      } catch {
        console.log("Falling back to Trivia DB...");
        return await fetchQuestionsFromTrivia(15, 18, difficulty);
      }
    } else {
      try {
        console.log("Falling back to Seeds...");
        return await fetchQuestionsFromSeeds(topic, difficulty);
      } catch {
        console.log("Falling back to Trivia DB...");
        return await fetchQuestionsFromTrivia(15, 18, difficulty);
      }
    }
  }
}

// Debounce utility
export function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

// Storage helpers with error boundaries
export function loadStats() {
  try {
    return (
      JSON.parse(localStorage.getItem("ef_stats_v5") || "null") || {
        totalQuizzes: 0,
        totalCorrect: 0,
        totalQ: 0,
        xp: 0,
        streak: 0,
        badges: [],
        history: [],
        topicStats: {},
        lastPlayed: null,
      }
    );
  } catch {
    return {
      totalQuizzes: 0,
      totalCorrect: 0,
      totalQ: 0,
      xp: 0,
      streak: 0,
      badges: [],
      history: [],
      topicStats: {},
      lastPlayed: null,
    };
  }
}

export function saveStats(stats) {
  try {
    localStorage.setItem("ef_stats_v5", JSON.stringify(stats));
  } catch {}
}

export function loadApiKey() {
  try {
    const savedKey = localStorage.getItem("ef_api_key");
    if (savedKey && savedKey.trim() !== "") return savedKey;
    return DEFAULT_API_KEY;
  } catch {
    return DEFAULT_API_KEY;
  }
}

export function saveApiKey(key) {
  try {
    localStorage.setItem("ef_api_key", key);
  } catch {}
}

export function loadDarkMode() {
  try {
    return JSON.parse(localStorage.getItem("ef_dark") || "false");
  } catch {
    return false;
  }
}

export function saveDarkMode(val) {
  try {
    localStorage.setItem("ef_dark", JSON.stringify(val));
  } catch {}
}
