import {
    ExpenseCategory
} from "@/types/expense";
import { categorizeMerchant } from "./category-rules";

export interface ParsedExpense {
    merchant: string;
    amount: number;
    currency: string;
    date: string;
    time: string;
    category: ExpenseCategory;
}

export function parseExpenseMessage(
    message: string
): ParsedExpense | null {
    const merchantMatch = message.match(
        /Purchase at (.+?) for LKR/i
    );

    const amountMatch = message.match(
        /for LKR\s*([\d,]+(?:\.\d{2})?)/i
    );

    const dateTimeMatch = message.match(
        /on (\d{2}\/\d{2}\/\d{2}) (\d{1,2}:\d{2}\s*[AP]M)/i
    );

    if (!merchantMatch || !amountMatch || !dateTimeMatch) {
        return null;
    }

    const merchant = merchantMatch[1].trim();

    const amount = Number(
        amountMatch[1].replace(/,/g, "")
    );

    const date = parseDate(dateTimeMatch[1]);

    const time = dateTimeMatch[2];

    const category = categorizeMerchant(merchant);

    return {
        merchant,
        amount,
        currency: "LKR",
        date,
        time,
        category,
    };
}

function parseDate(value: string): string {
    const [day, month, year] = value.split("/");

    const fullYear =
        Number(year) >= 50
            ? 1900 + Number(year)
            : 2000 + Number(year);

    return `${fullYear}-${month}-${day}`;
}