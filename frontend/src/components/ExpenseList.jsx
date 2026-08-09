import { useExpenses } from "../context/ExpenseContext.jsx";
import { ExpenseListSkeleton } from "./Skeletons.jsx";
import EmptyState from "./EmptyState.jsx";
import ExpenseItem from "./ExpenseItem.jsx";

// Pulls expenses, loading, and error straight from ExpenseContext —
// no list/loading/error props passed down from a parent page.
export default function ExpenseList() {
  const { expenses, loading, error, fetchExpenses } = useExpenses();

  if (loading) return <ExpenseListSkeleton rows={5} />;

  if (error) {
    return (
      <EmptyState
        icon="⚠️"
        title="Couldn't load your expenses"
        description={error}
        action={
          <button
            onClick={fetchExpenses}
            className="text-sm px-4 py-2 rounded-md border border-ledger-forest text-ledger-forest hover:bg-ledger-forest hover:text-ledger-paper transition-colors"
          >
            Try again
          </button>
        }
      />
    );
  }

  if (expenses.length === 0) {
    return (
      <EmptyState
        icon="🧾"
        title="No expenses yet"
        description="Log your first expense above and it'll show up here."
      />
    );
  }

  return (
    <div>
      {expenses.map((expense) => (
        <ExpenseItem key={expense._id} expense={expense} />
      ))}
    </div>
  );
}
