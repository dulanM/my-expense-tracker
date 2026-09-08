"use client";
import { CategoryCard } from "@/components/dashboard/CategoryCard";
import EditExpenseDialog from "@/components/dashboard/EditExpenseDialog";
import { ExpenseList } from "@/components/dashboard/ExpenseList";
import { MonthlySpending } from "@/components/dashboard/MonthlySpending";
import { getCategoryExpenseTotals, getCurrentMonthCategoryTotals, getCurrentMonthTotal } from "@/lib/expense-utils";
import { Expense } from "@/types/expense";
import { useState, useEffect } from "react";


export default function Home() {
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [editing, setEditing] = useState<Expense | null>(null);
    const categoryTotals = getCategoryExpenseTotals(expenses);
    const monthlyTotal = getCurrentMonthTotal(expenses);
    const monthlyCategoryTotals = getCurrentMonthCategoryTotals(expenses);

    async function loadExpenses() {
        try {

            const response = await fetch("/api/expenses");

            if (!response.ok) {
                throw new Error("Failed to fetch expenses");
            }

            const data = await response.json();

            if (!data.success) {
                throw new Error(data.error || "Failed to fetch expenses");
            }

            setExpenses(data.expenses);
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        loadExpenses();
    }, []);

    const todayTotal = expenses.reduce(
        (total, expense) => total + expense.amount,
        0
    );
    return (
        <main className="min-h-screen bg-[#f5f6f7]">
            <div className="mx-auto max-w-5xl">
                <section className="p-5 pb-2">
                    <div className="rounded-3xl border bg-white p-5 shadow-sm">
                        <p className="text-sm font-medium text-gray-500">
                            Today&apos;s spending
                        </p>

                        <h2 className="mt-2 text-4xl font-bold text-gray-900">
                            LKR {todayTotal.toLocaleString()}
                        </h2>

                        <p className="mt-2 text-sm text-gray-500">
                            {expenses.length} transactions
                        </p>
                    </div>
                </section>

                <section className="pt-2 pb-3 pr-5 pl-5">
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                        {categoryTotals.map((category) => (
                            <CategoryCard key={category.categoryName} category={category.categoryName} amount={category.expenseTotal} />
                        ))}
                    </div>
                </section>

                <div className="space-y-5 px-5">
                    <ExpenseList
                        title="Today's expenses"
                        expenses={expenses}
                        onEdit={setEditing} />

                    <MonthlySpending
                        monthLabel={new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                        total={monthlyTotal}
                        totals={monthlyCategoryTotals} />
                </div>
            </div>

            <EditExpenseDialog
                expense={editing}
                onClose={() => setEditing(null)}
                onUpdated={loadExpenses}
            />
        </main>
    );
}
