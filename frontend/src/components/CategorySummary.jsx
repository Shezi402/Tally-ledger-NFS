import { useMemo } from "react";
import { useExpenses } from "../context/ExpenseContext.jsx";
import { SummarySkeleton } from "./Skeletons.jsx";
import EmptyState from "./EmptyState.jsx";

const formatPKR = (n) =>
  new Intl.NumberFormat("en-PK", { style: "currency", currency: "PKR", maximumFractionDigits: 0 }).format(n);

// A second feature reading the same global expense state — proof
// this isn't just one context/one consumer, but genuinely shared
// state across independent parts of the UI.
export default function CategorySummary() {
  const { expenses, loading } = useExpenses();

  const { total, byCategory, topCategory } = useMemo(() => {
    const total = expenses.reduce((sum, e) => sum + e.amount, 0);
    const byCategory = expenses.reduce((acc, e) => {
      acc[e.category] = (acc[e.category] || 0) + e.amount;
      return acc;
    }, {});
    const topCategory = Object.entries(byCategory).sort((a, b) => b[1] - a[1])[0];
    return { total, byCategory, topCategory };
  }, [expenses]);

  if (loading) return <SummarySkeleton />;

  if (expenses.length === 0) {
    return (
      <EmptyState
        icon="📊"
        title="Nothing to summarize yet"
        description="Once you've logged a few expenses, your totals and top category will show up here."
      />
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      <div className="border border-ledger-line rounded-lg p-4 bg-white/40">
        <p className="font-mono text-[11px] uppercase tracking-wide text-ledger-ink/50 mb-1">Total spent</p>
        <p className="font-display text-xl text-ledger-forest">{formatPKR(total)}</p>
      </div>
      <div className="border border-ledger-line rounded-lg p-4 bg-white/40">
        <p className="font-mono text-[11px] uppercase tracking-wide text-ledger-ink/50 mb-1">Entries</p>
        <p className="font-display text-xl text-ledger-forest">{expenses.length}</p>
      </div>
      <div className="border border-ledger-line rounded-lg p-4 bg-white/40 col-span-2 sm:col-span-1">
        <p className="font-mono text-[11px] uppercase tracking-wide text-ledger-ink/50 mb-1">Top category</p>
        <p className="font-display text-xl text-ledger-forest">{topCategory?.[0] || "—"}</p>
      </div>
      <div className="border border-ledger-line rounded-lg p-4 bg-white/40 col-span-2 sm:col-span-1">
        <p className="font-mono text-[11px] uppercase tracking-wide text-ledger-ink/50 mb-1">Categories used</p>
        <p className="font-display text-xl text-ledger-forest">{Object.keys(byCategory).length}</p>
      </div>
    </div>
  );
}
