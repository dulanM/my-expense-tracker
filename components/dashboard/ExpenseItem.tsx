import { CATEGORY_META, formatLKR, formatTime, type Expense } from "@/types/expense";

interface ExpenseItemProps {
    expense: Expense;
    onEdit: (expense: Expense) => void;
}

export function ExpenseItem({ expense, onEdit }: ExpenseItemProps) {
    const { icon: Icon, tint } = CATEGORY_META[expense.category];

    return (
        <li>
            <button
                type="button"
                onClick={() => onEdit(expense)}
                aria-label={`Edit category for ${expense.merchant}`}
                className="grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors hover:bg-gray-100"
            >
                <span className={`grid size-10 shrink-0 place-items-center rounded-full ${tint}`}>
                    <Icon className="size-[18px]" aria-hidden="true" />
                </span>
                <span className="min-w-0">

                    <span className="block truncate text-sm font-semibold text-gray-900">
                        {expense.merchant}
                    </span>

                    <span className="block truncate text-xs text-gray-500">
                        {expense.category} · {formatTime(expense.date)}
                    </span>
                </span>

                <span className="shrink-0 text-sm font-semibold text-gray-900 tabular-nums">
                    {formatLKR(expense.amount)}
                </span>
            </button>
        </li>
    );
}