// Reusable empty state — what the UI shows when there is zero data,
// distinct from a loading skeleton or an error message.

export default function EmptyState({ icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center text-center py-14 px-6 border border-dashed border-ledger-line rounded-lg bg-white/30">
      <div className="text-4xl mb-3" aria-hidden="true">
        {icon || "🧾"}
      </div>
      <h3 className="font-display text-lg text-ledger-forest mb-1">{title}</h3>
      {description && (
        <p className="font-body text-sm text-ledger-ink/60 max-w-xs mb-4">{description}</p>
      )}
      {action}
    </div>
  );
}
