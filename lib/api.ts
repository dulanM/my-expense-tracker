import { Expense } from "@/types/expense";

interface ExpensesResponse {
  success: boolean;
  expenses: Expense[];
  error?: string;
}

export async function getExpenses(): Promise<Expense[]> {
  const response = await fetch("/api/expenses", {
    method: "GET",
    cache: "no-store",
  });

  const data: ExpensesResponse = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.error || "Failed to fetch expenses");
  }

  return data.expenses;
}