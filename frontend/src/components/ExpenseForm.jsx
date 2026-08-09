import { useState } from "react";
import { useExpenses, CATEGORIES } from "../context/ExpenseContext.jsx";

const todayISO = () => new Date().toISOString().slice(0, 10);

export default function ExpenseForm() {
  const { addExpense, mutating } = useExpenses();
  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: CATEGORIES[0],
    date: todayISO(),
    note: "",
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const next = {};
    if (!form.title.trim()) next.title = "Give this expense a title.";
    if (form.amount === "" || Number(form.amount) <= 0)
      next.amount = "Enter an amount greater than zero.";
    if (!form.date) next.date = "Pick a date.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const result = await addExpense({ ...form, amount: Number(form.amount) });
    if (result.ok) {
      setForm({ title: "", amount: "", category: CATEGORIES[0], date: todayISO(), note: "" });
      setErrors({});
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border border-ledger-line rounded-lg p-5 bg-white/40 space-y-4"
    >
      <h2 className="font-display text-lg text-ledger-forest">Add an expense</h2>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-mono text-ledger-ink/60 mb-1">Title</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Groceries, fuel, rent…"
            className="w-full px-3 py-2 rounded-md border border-ledger-line bg-white focus:outline-none focus:ring-2 focus:ring-ledger-forest/40"
          />
          {errors.title && <p className="text-ledger-rust text-xs mt-1">{errors.title}</p>}
        </div>

        <div>
          <label className="block text-xs font-mono text-ledger-ink/60 mb-1">Amount (PKR)</label>
          <input
            name="amount"
            type="number"
            min="0"
            step="0.01"
            value={form.amount}
            onChange={handleChange}
            placeholder="0.00"
            className="w-full px-3 py-2 rounded-md border border-ledger-line bg-white font-mono focus:outline-none focus:ring-2 focus:ring-ledger-forest/40"
          />
          {errors.amount && <p className="text-ledger-rust text-xs mt-1">{errors.amount}</p>}
        </div>

        <div>
          <label className="block text-xs font-mono text-ledger-ink/60 mb-1">Category</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-md border border-ledger-line bg-white focus:outline-none focus:ring-2 focus:ring-ledger-forest/40"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-mono text-ledger-ink/60 mb-1">Date</label>
          <input
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-md border border-ledger-line bg-white font-mono focus:outline-none focus:ring-2 focus:ring-ledger-forest/40"
          />
          {errors.date && <p className="text-ledger-rust text-xs mt-1">{errors.date}</p>}
        </div>

        <div className="sm:col-span-2">
          <label className="block text-xs font-mono text-ledger-ink/60 mb-1">Note (optional)</label>
          <input
            name="note"
            value={form.note}
            onChange={handleChange}
            placeholder="Anything worth remembering about this one"
            className="w-full px-3 py-2 rounded-md border border-ledger-line bg-white focus:outline-none focus:ring-2 focus:ring-ledger-forest/40"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={mutating}
        className="w-full sm:w-auto px-5 py-2.5 rounded-md bg-ledger-forest text-ledger-paper font-body text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-ledger-forest/90 transition-colors inline-flex items-center justify-center gap-2"
      >
        {mutating && (
          <span className="w-3.5 h-3.5 border-2 border-ledger-paper/40 border-t-ledger-paper rounded-full animate-spin" />
        )}
        {mutating ? "Saving…" : "Add expense"}
      </button>
    </form>
  );
}
