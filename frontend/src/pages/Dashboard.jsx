import { useAuth } from "../context/AuthContext.jsx";
import CategorySummary from "../components/CategorySummary.jsx";
import ExpenseForm from "../components/ExpenseForm.jsx";
import ExpenseList from "../components/ExpenseList.jsx";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="max-w-4xl mx-auto px-5 py-8 space-y-8">
      <div>
        <p className="font-mono text-xs text-ledger-ink/50 uppercase tracking-wide">
          {new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })}
        </p>
        <h1 className="font-display text-2xl text-ledger-forest">
          {user?.name?.split(" ")[0]}'s ledger
        </h1>
      </div>

      <CategorySummary />
      <ExpenseForm />

      <div>
        <h2 className="font-display text-lg text-ledger-forest mb-2">Recent expenses</h2>
        <ExpenseList />
      </div>
    </div>
  );
}
