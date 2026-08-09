import { useExpenses } from "../context/ExpenseContext.jsx";

const CATEGORY_DOT = {
  Food: "bg-ledger-rust",
  Transport: "bg-ledger-moss",
  Bills: "bg-ledger-gold",
  Shopping: "bg-ledger-forest",
  Health: "bg-ledger-rust",
  Entertainment: "bg-ledger-gold",
  Other: "bg-ledger-ink/40",
};

const formatPKR = (n) =>
  new Intl.NumberFormat("en-PK", { style: "currency", currency: "PKR", maximumFractionDigits: 0 }).format(n);

export default function ExpenseItem({ expense }) {
  const { deleteExpense } = useExpenses();

  return (
    <div className="flex items-center justify-between py-3 border-b border-ledger-line group">
      <div className="flex items-center gap-3 min-w-0">
        <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${CATEGORY_DOT[expense.category] || "bg-ledger-ink/40"}`} />
        <div className="min-w-0">
          <p className="font-body text-sm text-ledger-ink truncate">{expense.title}</p>
          <p className="font-mono text-xs text-ledger-ink/50">
            {expense.category} · {new Date(expense.date).toLocaleDateString("en-GB", { day: "2-digit", month: "short" })}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        <span className="font-mono text-sm text-ledger-ink">{formatPKR(expense.amount)}</span>
        <button
          onClick={() => deleteExpense(expense._id)}
          aria-label={`Delete ${expense.title}`}
          className="text-ledger-ink/30 hover:text-ledger-rust transition-colors opacity-0 group-hover:opacity-100 text-sm"
        >
          Remove
        </button>
      </div>
    </div>
  );
}
