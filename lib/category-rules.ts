import { ExpenseCategory } from "@/types/expense";

const categoryRules: Record<
    ExpenseCategory,
    string[]
> = {
    Food: [
        "KFC",
        "BURGER KING",
        "MCDONALDS",
        "PIZZA HUT",
        "DOMINOS",
        "BARITSA"
    ],

    Fuel: [
        "SHELL",
        "IOC",
        "CEYPETCO",
        "LANKA IOC",
    ],

    Entertainment: [
        "NETFLIX",
        "SPOTIFY",
        "STEAM",
        "YOUTUBE",
    ],

    Transport: [
        "UBER",
        "PICKME",
        "INTERCHANGE"
    ],

    Medical: [
        "PHARMACY"
    ],

    Grocery: [
        "KEELLS",
        "CARGILLS",
        "ARPICO",
        "SPAR",
    ]
};

export function categorizeMerchant(
    merchant: string
): ExpenseCategory {
    const normalizedMerchant = merchant.toUpperCase();

    for (const [category, merchants] of Object.entries(
        categoryRules
    )) {
        if (
            merchants.some((name) =>
                normalizedMerchant.includes(name)
            )
        ) {
            return category as ExpenseCategory;
        }
    }

    return "Food";
}