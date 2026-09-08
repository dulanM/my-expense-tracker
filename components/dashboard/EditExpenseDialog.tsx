"use client";

import { useEffect, useState } from "react";
import { Expense, ExpenseCategory } from "@/types/expense";
import { ExpenseCategory as categories } from "@/types/expense";
interface EditExpenseDialogProps {
    expense: Expense | null;
    onClose: () => void;
    onUpdated: () => void;
}

export default function EditExpenseDialog({
    expense,
    onClose,
    onUpdated,
}: EditExpenseDialogProps) {
    const categories: ExpenseCategory[] = [
        "Food",
        "Fuel",
        "Entertainment",
        "Transport",
    ];
    const [category, setCategory] = useState<ExpenseCategory>("Food");
    const [loading, setLoading] = useState(false);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        if (expense) {
            setCategory(expense.category);
        }
    }, [expense]);

    if (!expense) {
        return null;
    }

    const categoryChanged = category !== expense.category;

    async function handleUpdate() {
        if (!categoryChanged || loading) {
            return;
        }

        try {
            setLoading(true);

            const response = await fetch(`/api/expenses/${expense!.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    category,
                }),
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(
                    data.error || "Failed to update expense"
                );
            }

            onClose();
            onUpdated();
        } catch (error) {
            console.error(error);
            alert(
                error instanceof Error
                    ? error.message
                    : "Failed to update expense"
            );
        } finally {
            setLoading(false);
        }
    }

    async function handleDelete() {
        if (deleting) {
            return;
        }

        const confirmed = window.confirm(
            "Are you sure you want to delete this transaction?"
        );

        if (!confirmed) {
            return;
        }

        try {
            setDeleting(true);

            const response = await fetch(
                `/api/expenses/${expense!.id}`,
                {
                    method: "DELETE",
                }
            );

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(
                    data.error || "Failed to delete expense"
                );
            }

            onClose();
            onUpdated();
        } catch (error) {
            console.error(error);
            alert(
                error instanceof Error
                    ? error.message
                    : "Failed to delete expense"
            );
        } finally {
            setDeleting(false);
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-5">
            <div className="w-full max-w-md rounded-3xl bg-white p-5 shadow-xl">

                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-900">
                        Edit transaction
                    </h2>

                    <button
                        type="button"
                        onClick={onClose}
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200"
                    >
                        ✕
                    </button>
                </div>

                <div className="mt-5 rounded-2xl bg-gray-50 p-4">
                    <p className="text-sm text-gray-500">
                        Merchant
                    </p>

                    <p className="mt-1 font-semibold text-gray-900">
                        {expense.merchant}
                    </p>

                    <p className="mt-3 text-sm text-gray-500">
                        Amount
                    </p>

                    <p className="mt-1 text-2xl font-bold text-gray-900">
                        {'LKR'}{" "}
                        {expense.amount.toLocaleString()}
                    </p>
                </div>

                <div className="mt-5">
                    <label className="text-sm font-medium text-gray-700">
                        Category
                    </label>

                    <select
                        value={category}
                        onChange={(e) =>
                            setCategory(
                                e.target.value as ExpenseCategory
                            )
                        }
                        className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-2 py-3 text-gray-900 outline-none focus:border-gray-500"
                    >
                        {categories.map((item) => (
                            <option key={item} value={item}>
                                {item}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mt-6 flex gap-3">
                    <button
                        type="button"
                        onClick={handleDelete}
                        disabled={deleting || loading}
                        className="flex-1 rounded-xl border border-red-200 px-4 py-3 font-medium text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {deleting ? "Deleting..." : "Delete"}
                    </button>

                    <button
                        type="button"
                        onClick={handleUpdate}
                        disabled={!categoryChanged || loading || deleting}
                        className="flex-1 rounded-xl bg-gray-900 px-4 py-3 font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-300"
                    >
                        {loading ? "Updating..." : "Update"}
                    </button>
                </div>
            </div>
        </div>
    );
}