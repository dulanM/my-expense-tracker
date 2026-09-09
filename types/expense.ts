import { Car, Film, Fuel, ShoppingBasket, Stethoscope, UtensilsCrossed, type LucideIcon } from "lucide-react";

export type ExpenseCategory = "Food" | "Fuel" | "Entertainment" | "Transport"| "Medical" | "Grocery";

export const CATEGORIES: ExpenseCategory[] = ["Food", "Fuel", "Entertainment", "Transport", "Medical", "Grocery",];

export const CATEGORY_META: Record<
    ExpenseCategory,
    { icon: LucideIcon; tint: string; color: string }
> = {
    Food: {
        icon: UtensilsCrossed,
        tint: "bg-orange-100 text-orange-600",
        color: "#f97316",
    },
    Fuel: {
        icon: Fuel,
        tint: "bg-blue-100 text-blue-600",
        color: "#3b82f6",
    },
    Entertainment: {
        icon: Film,
        tint: "bg-purple-100 text-purple-600",
        color: "#a855f7",
    },
    Transport: {
        icon: Car,
        tint: "bg-green-100 text-green-600",
        color: "#22c55e",
    },
    Medical: {
        icon: Stethoscope,
        tint: "bg-red-100 text-red-600",
        color: "#ef4444",
    },

    Grocery: {
        icon: ShoppingBasket,
        tint: "bg-yellow-100 text-yellow-600",
        color: "#eab308",
    },
};

export interface Expense {
    id: string;
    merchant: string;
    amount: number;
    category: ExpenseCategory;
    date: string;
    time: string;
    rawMessage?: string;
}


export const formatLKR = (amount: number) =>
    `LKR ${amount.toLocaleString("en-LK", { maximumFractionDigits: 0 })}`;

export const formatTime = (isoDate: string) =>
    new Date(isoDate).toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    });