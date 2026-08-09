import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

// Reads the current user straight from AuthContext — no user prop
// passed in from App or a layout wrapper.
export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="border-b border-ledger-line bg-ledger-paper/90 backdrop-blur sticky top-0 z-10">
      <div className="max-w-4xl mx-auto px-5 py-4 flex items-center justify-between">
        <Link to="/" className="font-display text-xl text-ledger-forest tracking-tight">
          Tally <span className="text-ledger-rust">·</span> ledger
        </Link>
        {user && (
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs text-ledger-ink/60 hidden sm:inline">
              {user.email}
            </span>
            <button
              onClick={handleLogout}
              className="font-body text-sm px-3 py-1.5 rounded-md border border-ledger-forest text-ledger-forest hover:bg-ledger-forest hover:text-ledger-paper transition-colors"
            >
              Sign out
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
