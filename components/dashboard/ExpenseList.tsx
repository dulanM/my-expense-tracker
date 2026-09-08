import type { Expense } from "@/types/expense";
import { ExpenseItem } from "./ExpenseItem";

interface ExpenseListProps {
  title: string;
  expenses: Expense[];
  onEdit: (expense: Expense) => void;
}

export function ExpenseList({ title, expenses, onEdit}: ExpenseListProps) {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-md">
      <h2 className="px-3 pb-1 pt-3 text-sm font-semibold text-gray-900">{title}</h2>
      {expenses.length === 0 ? (
        <p className="px-3 pb-4 pt-2 text-sm text-muted-foreground">No expenses on this day.</p>
      ) : (
        <ul className="divide-y divide-border/70">
          {expenses.map((expense) => (
            <ExpenseItem key={expense.id} expense={expense} onEdit={onEdit}/>
          ))}
        </ul>
      )}
    </section>
  );
}