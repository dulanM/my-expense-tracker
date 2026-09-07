import { CATEGORY_META, formatLKR, type ExpenseCategory } from "@/types/expense";

interface CategoryBreakdownProps {
  totals: Record<ExpenseCategory, number>;
}

export function CategoryBreakdown({ totals }: CategoryBreakdownProps) {
  const rows = (Object.keys(totals) as ExpenseCategory[])
    .map((category) => ({ category, amount: totals[category] }))
    .sort((a, b) => b.amount - a.amount);
  const total = rows.reduce((t, r) => t + r.amount, 0) || 1;

  return (
    <ul className="space-y-3">
      {rows.map(({ category, amount }) => {
        const { icon: Icon, tint, color } = CATEGORY_META[category];
        const pct = Math.round((amount / total) * 100);
        return (
          <li key={category} className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3">
            <span className={`grid size-8 shrink-0 place-items-center rounded-lg ${tint}`}>
              <Icon className="size-4" aria-hidden="true" />
            </span>
            <span className="min-w-0">
              <span className="flex items-baseline justify-between gap-2">
                <span className="truncate text-sm font-medium text-gray-900">{category}</span>
                <span className="shrink-0 text-xs text-gray-500 tabular-nums">{pct}%</span>
              </span>
              <span className="mt-1.5 block h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
                <span
                  className="block h-full rounded-full"
                  style={{ width: `${pct}%`, backgroundColor: color }}
                />
              </span>
            </span>
            <span className="shrink-0 text-sm font-semibold text-gray-900 tabular-nums">
              {formatLKR(amount)}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
