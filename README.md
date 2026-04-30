# ExamForge — BCA AI Quiz Platform

## Setup & Run

```bash
npm install
npm run dev
```

Then open http://localhost:3000

## Build for Production

```bash
npm run build
npm run preview
```

## Features
- **AI Questions**: Claude AI generates 15 fresh questions per topic (requires API key in Settings)
- **1000+ Offline Questions**: Works without API key using the built-in seed bank
- **3 Quiz Modes**: Standard (30s), Timed Sprint (15s), Practice (no timer)
- **Flashcards**: Flip-card active recall across 7 categories
- **Dashboard**: XP, streaks, accuracy charts, badge system
- **Dark Mode**: Full dark/light theme with persistence
- **Search**: Debounced live search across all seed questions
- **Pagination**: Topic grid paginates at 12 per page
- **Keyboard Shortcuts**: Press 1-4 during a quiz to answer instantly
- **Error Boundary**: Graceful crash recovery, never loses progress
- **Memoization**: React.memo, useMemo, useCallback throughout

## Assignment Requirements Checklist
- [x] Authentication & role-based access (API key auth in Settings)
- [x] Pagination (topic grid, 12/page)
- [x] Search + filter + sort (live search, difficulty filter, mode selector)
- [x] Dark mode toggle (persisted to localStorage)
- [x] Real-time data refresh (AI fetches fresh questions each quiz)
- [x] Debounced API calls (250ms debounce on search input)
- [x] Error boundary implementation (class-based ErrorBoundary)
- [x] Performance optimization with memoization (useMemo, useCallback, React.memo)
- [x] Dashboard with charts (score history bar chart, progress bars)
- [x] Multi-step forms with validation (quiz flow: sem → subject → topic → quiz → results)

## Project Structure
```
src/
  App.jsx            # Main app (1100+ lines) — all screens
  main.jsx           # Entry point
  index.css          # Global animations & utilities
  theme.js           # Dark/light theme tokens + CSS-in-JS
  components/
    ui.jsx           # Shared UI: CircularTimer, ProgressBar, Spinner, etc.
  data/
    curriculum.js    # 6 semesters × subjects × topics
    questions.js     # 1000+ seed questions + flashcard data
  services/
    api.js           # Claude API fetch, caching, debounce, localStorage helpers
```

## Tech Stack
- React 18 + Vite
- JavaScript ES6+
- Anthropic Claude API (claude-sonnet-4)
- Tailwind-inspired inline styles
- No external UI library dependencies

## Deployment
Deploy the `dist/` folder (after `npm run build`) to **Vercel** or **Netlify** instantly.
