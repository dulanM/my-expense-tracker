"use client";
import { CategoryCard } from "@/components/dashboard/CategoryCard";
import { ExpenseList } from "@/components/dashboard/ExpenseList";
import { MonthlySpending } from "@/components/dashboard/MonthlySpending";
import { expenses } from "@/data/expenses";
import { Expense, CATEGORIES } from "@/types/expense";
import { useState } from "react";


export default function Home() {
  const todayTotal = expenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );
  const TODAY = new Date(2026, 8, 7, 12, 0, 0);
  const [editing, setEditing] = useState<Expense | null>(null);
  const [selectedDay, setSelectedDay] = useState<Date>(TODAY);

  return (
    <main className="min-h-screen bg-[#f5f6f7]">
      <div className="mx-auto max-w-5xl">
        <section className="p-5">
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

        <section className="p-5">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {CATEGORIES.map((category) => (
              <CategoryCard key={category} category={category} amount={1000} />
            ))}
          </div>
        </section>

        <div className="space-y-5 px-5">
          <ExpenseList
            title="Today's expenses"
            expenses={expenses} />

          <MonthlySpending
            monthLabel={selectedDay.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
            total={20000}
            totals={{
              Food: 45000,
              Fuel: 25000,
              Entertainment: 15000,
              Transport: 40000
            }} />
        </div>
      </div>
    </main>
  );
}
