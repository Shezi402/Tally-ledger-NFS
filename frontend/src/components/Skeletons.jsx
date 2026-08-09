// Skeleton loaders — shown for every data-fetching UI instead of a blank screen.

export function ExpenseRowSkeleton() {
  return (
    <div className="flex items-center justify-between py-3 border-b border-ledger-line">
      <div className="flex items-center gap-3">
        <div className="skeleton w-9 h-9 rounded-full" />
        <div className="space-y-2">
          <div className="skeleton h-3.5 w-32" />
          <div className="skeleton h-2.5 w-20" />
        </div>
      </div>
      <div className="skeleton h-4 w-16" />
    </div>
  );
}

export function ExpenseListSkeleton({ rows = 5 }) {
  return (
    <div>
      {Array.from({ length: rows }).map((_, i) => (
        <ExpenseRowSkeleton key={i} />
      ))}
    </div>
  );
}

export function SummarySkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="border border-ledger-line rounded-lg p-4 bg-white/40">
          <div className="skeleton h-2.5 w-16 mb-3" />
          <div className="skeleton h-5 w-20" />
        </div>
      ))}
    </div>
  );
}
