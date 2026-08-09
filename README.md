# Tally — Expense Ledger

MERN app built for **Week 3: Global State, Data Fetching Patterns & UI Polish** (Neuro Five Solutions internship).

## What this covers

- **Global state (Context API)** — `AuthContext` and `ExpenseContext` in `frontend/src/context/`.
- **2 refactored features:**
  1. **Auth** — `Navbar`, `ProtectedRoute`, `Login`, `Register`, `Dashboard` all read/write auth state via `useAuth()` instead of receiving `user`/`setUser` as props.
  2. **Expense CRUD** — `ExpenseForm`, `ExpenseList`, `ExpenseItem`, `CategorySummary` all read/write expense state via `useExpenses()` instead of one page holding the array and passing it + callbacks down three levels.
- **Skeleton loaders** — `ExpenseListSkeleton`, `SummarySkeleton`, spinner on session check, spinners on buttons while submitting. No blank screens while fetching.
- **Empty states** — "No expenses yet" (list), "Nothing to summarize yet" (summary), and a distinct "Couldn't load your expenses" error state with a retry button — three different zero/failure states, not just an empty `<ul>`.

## Run it locally

### Backend
```bash
cd backend
cp .env.example .env       # fill in MONGO_URI and JWT_SECRET
npm install
npm run dev                # http://localhost:5000
```

### Frontend
```bash
cd frontend
npm install
npm run dev                # http://localhost:5173
```

Needs a MongoDB instance (local `mongod` or a free MongoDB Atlas cluster) — put the connection string in `backend/.env`.

## Recording the demo video

Suggested walkthrough for the LinkedIn video:
1. Show `AuthContext.jsx` and `ExpenseContext.jsx` briefly — explain these replaced prop-drilled `user`/`expenses` state from earlier weeks.
2. Refresh the dashboard on a throttled network (DevTools → Network → Slow 3G) to show the skeleton loaders instead of a blank page.
3. Delete all expenses (or use a fresh account) to show the empty state, then add one back.
4. Trigger the error state — stop the backend server, hit refresh, show the "Couldn't load your expenses" + Retry button, then start the backend again and click Retry.
5. Add an expense with the loading spinner visible on the button, and show the toast confirmation.
