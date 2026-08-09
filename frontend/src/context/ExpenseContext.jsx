import { createContext, useCallback, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../api/axios.js";
import { useAuth } from "./AuthContext.jsx";

/*
 * ExpenseContext — global expense state.
 *
 * The Week-before CRUD task fetched expenses in a parent page and
 * passed the list, plus add/update/delete callbacks, down through
 * ExpenseList -> ExpenseItem -> ExpenseForm as props. That chain is
 * the prop-drilling this refactor removes: any component in the tree
 * can now call useExpenses() and reach state or actions directly.
 */

const ExpenseContext = createContext(null);

export const CATEGORIES = [
  "Food",
  "Transport",
  "Bills",
  "Shopping",
  "Health",
  "Entertainment",
  "Other",
];

export function ExpenseProvider({ children }) {
  const { user } = useAuth();
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mutating, setMutating] = useState(false);

  const fetchExpenses = useCallback(async () => {
    if (!user) {
      setExpenses([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.get("/expenses");
      setExpenses(data);
    } catch (err) {
      setError(err.response?.data?.message || "Could not load your expenses.");
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  const addExpense = async (payload) => {
    setMutating(true);
    try {
      const { data } = await api.post("/expenses", payload);
      setExpenses((prev) => [data, ...prev]);
      toast.success("Expense added");
      return { ok: true };
    } catch (err) {
      const message = err.response?.data?.message || "Could not add that expense.";
      toast.error(message);
      return { ok: false, message };
    } finally {
      setMutating(false);
    }
  };

  const deleteExpense = async (id) => {
    const previous = expenses;
    setExpenses((prev) => prev.filter((e) => e._id !== id)); // optimistic
    try {
      await api.delete(`/expenses/${id}`);
      toast.success("Expense removed");
    } catch (err) {
      setExpenses(previous); // roll back
      toast.error(err.response?.data?.message || "Could not remove that expense.");
    }
  };

  return (
    <ExpenseContext.Provider
      value={{ expenses, loading, error, mutating, fetchExpenses, addExpense, deleteExpense }}
    >
      {children}
    </ExpenseContext.Provider>
  );
}

export const useExpenses = () => useContext(ExpenseContext);
