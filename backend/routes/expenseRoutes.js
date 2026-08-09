import express from "express";
import Expense from "../models/Expense.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

// @route GET /api/expenses
router.get("/", async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user._id }).sort({ date: -1 });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch expenses", error: err.message });
  }
});

// @route POST /api/expenses
router.post("/", async (req, res) => {
  try {
    const { title, amount, category, date, note } = req.body;

    if (!title || amount === undefined || !category) {
      return res.status(400).json({ message: "Title, amount and category are required" });
    }
    if (amount < 0) {
      return res.status(400).json({ message: "Amount cannot be negative" });
    }

    const expense = await Expense.create({
      user: req.user._id,
      title,
      amount,
      category,
      date: date || Date.now(),
      note,
    });

    res.status(201).json(expense);
  } catch (err) {
    res.status(500).json({ message: "Failed to create expense", error: err.message });
  }
});

// @route PUT /api/expenses/:id
router.put("/:id", async (req, res) => {
  try {
    const expense = await Expense.findOne({ _id: req.params.id, user: req.user._id });
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    Object.assign(expense, req.body);
    await expense.save();
    res.json(expense);
  } catch (err) {
    res.status(500).json({ message: "Failed to update expense", error: err.message });
  }
});

// @route DELETE /api/expenses/:id
router.delete("/:id", async (req, res) => {
  try {
    const expense = await Expense.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }
    res.json({ message: "Expense deleted", id: req.params.id });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete expense", error: err.message });
  }
});

export default router;
