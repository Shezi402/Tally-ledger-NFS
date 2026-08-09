import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true, trim: true },
    amount: { type: Number, required: true, min: 0 },
    category: {
      type: String,
      required: true,
      enum: ["Food", "Transport", "Bills", "Shopping", "Health", "Entertainment", "Other"],
    },
    date: { type: Date, required: true, default: Date.now },
    note: { type: String, trim: true, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("Expense", expenseSchema);
