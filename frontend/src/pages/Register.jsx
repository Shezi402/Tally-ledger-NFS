import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Register() {
  const { register, actionLoading } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const next = {};
    if (form.name.trim().length < 2) next.name = "Enter your full name.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Enter a valid email address.";
    if (form.password.length < 6) next.password = "Password must be at least 6 characters.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    const result = await register(form.name, form.email, form.password);
    if (result.ok) navigate("/");
  };

  return (
    <div className="max-w-sm mx-auto mt-16 px-5">
      <h1 className="font-display text-2xl text-ledger-forest mb-1">Open a ledger</h1>
      <p className="font-body text-sm text-ledger-ink/60 mb-6">Create an account to start tracking.</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-mono text-ledger-ink/60 mb-1">Full name</label>
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-3 py-2 rounded-md border border-ledger-line bg-white focus:outline-none focus:ring-2 focus:ring-ledger-forest/40"
          />
          {errors.name && <p className="text-ledger-rust text-xs mt-1">{errors.name}</p>}
        </div>
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
          {actionLoading ? "Creating account…" : "Create account"}
        </button>
      </form>

      <p className="text-sm text-ledger-ink/60 mt-5">
        Already have an account?{" "}
        <Link to="/login" className="text-ledger-forest font-medium hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
