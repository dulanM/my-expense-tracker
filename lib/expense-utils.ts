import { Expense, ExpenseCategory } from "@/types/expense";

export function getCategoryExpenseTotals(expenses: Expense[]) {
  return expenses.reduce(
    (totals, expense) => {
      const existingCategory = totals.find(
        (item) => item.categoryName === expense.category
      );

      if (existingCategory) {
        existingCategory.expenseTotal += expense.amount;
      } else {
        totals.push({
          categoryName: expense.category,
          expenseTotal: expense.amount,
        });
      }

      return totals;
    },
    [] as {
      categoryName: ExpenseCategory;
      expenseTotal: number;
    }[]
  );
}

export function getMonthlyTotal(
  expenses: Expense[],
  year: number,
  month: number
) {
  return expenses
    .filter((expense) => {
      const [expenseYear, expenseMonth] = expense.date
        .split("-")
        .map(Number);

      return (
        expenseYear === year &&
        expenseMonth === month
      );
    })
    .reduce((total, expense) => total + expense.amount, 0);
}

export function getCurrentMonthTotal(expenses: Expense[]) {
  const now = new Date();

  return getMonthlyTotal(
    expenses,
    now.getFullYear(),
    now.getMonth() + 1
  );
}

export function getCurrentMonthCategoryTotals(
  expenses: Expense[]
): Record<ExpenseCategory, number> {
  const now = new Date();

  const totals: Record<ExpenseCategory, number> = {
    Food: 0,
    Fuel: 0,
    Entertainment: 0,
    Transport: 0,
  };

  expenses.forEach((expense) => {
    const expenseDate = new Date(expense.date);

    if (
      expenseDate.getFullYear() === now.getFullYear() &&
      expenseDate.getMonth() === now.getMonth()
    ) {
      totals[expense.category] += expense.amount;
    }
  });

  return totals;
}