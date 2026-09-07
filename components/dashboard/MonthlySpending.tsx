import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { CATEGORY_META, formatLKR, type ExpenseCategory } from "@/types/expense";
import { CategoryBreakdown } from "./CategoryBreakdown";

interface MonthlySpendingProps {
    monthLabel: string;
    total: number;
    totals: Record<ExpenseCategory, number>;
}

export function MonthlySpending({ monthLabel, total, totals }: MonthlySpendingProps) {
    const data = (Object.keys(totals) as ExpenseCategory[])
        .map((category) => ({ name: category, value: totals[category] }))
        .filter((d) => d.value > 0);

    return (
        <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-md">
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-3">
                <h2 className="truncate text-sm font-semibold text-gray-900">
                    Monthly spending
                </h2>

                <p className="shrink-0 text-xs text-gray-500">
                    {monthLabel}
                </p>
            </div>

            <div className="mt-4 flex flex-col gap-6 sm:flex-row sm:items-center">
                <div className="relative mx-auto h-48 w-48 shrink-0">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                dataKey="value"
                                nameKey="name"
                                innerRadius="66%"
                                outerRadius="100%"
                                paddingAngle={2}
                                stroke="none"
                                isAnimationActive={false}
                            >
                                {data.map((entry) => (
                                    <Cell key={entry.name} fill={CATEGORY_META[entry.name as ExpenseCategory].color} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="pointer-events-none absolute inset-0 grid place-items-center text-center">
                        <div>
                            <p className="text-xs text-gray-500">
                                Total
                            </p>

                            <p className="text-lg font-semibold text-gray-900 tabular-nums">
                                {formatLKR(total)}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="min-w-0 flex-1">
                    <CategoryBreakdown totals={totals} />
                </div>
            </div>
        </section>
    );
}