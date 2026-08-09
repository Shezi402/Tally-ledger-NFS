import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Login() {
  const { login, actionLoading } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const next = {};
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Enter a valid email address.";
    if (form.password.length < 6) next.password = "Password must be at least 6 characters.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    const result = await login(form.email, form.password);
    if (result.ok) navigate("/");
  };

  return (
    <div className="max-w-sm mx-auto mt-16 px-5">
      <h1 className="font-display text-2xl text-ledger-forest mb-1">Welcome back</h1>
      <p className="font-body text-sm text-ledger-ink/60 mb-6">Sign in to your ledger.</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-mono text-ledger-ink/60 mb-1">Email</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full px-3 py-2 rounded-md border border-ledger-line bg-white focus:outline-none focus:ring-2 focus:ring-ledger-forest/40"
          />
          {errors.email && <p className="text-ledger-rust text-xs mt-1">{errors.email}</p>}
        </div>
        <div>
          <label className="block text-xs font-mono text-ledger-ink/60 mb-1">Password</label>
          <input
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full px-3 py-2 rounded-md border border-ledger-line bg-white focus:outline-none focus:ring-2 focus:ring-ledger-forest/40"
          />
          {errors.password && <p className="text-ledger-rust text-xs mt-1">{errors.password}</p>}
        </div>
        <button
          type="submit"
          disabled={actionLoading}
          className="w-full px-4 py-2.5 rounded-md bg-ledger-forest text-ledger-paper text-sm font-medium disabled:opacity-50 inline-flex items-center justify-center gap-2 hover:bg-ledger-forest/90 transition-colors"
        >
          {actionLoading && (
            <span className="w-3.5 h-3.5 border-2 border-ledger-paper/40 border-t-ledger-paper rounded-full animate-spin" />
          )}
          {actionLoading ? "Signing in…" : "Sign in"}
        </button>
      </form>

      <p className="text-sm text-ledger-ink/60 mt-5">
        No account yet?{" "}
        <Link to="/register" className="text-ledger-forest font-medium hover:underline">
          Create one
        </Link>
      </p>
    </div>
  );
}
