import { CATEGORY_META, formatLKR, type ExpenseCategory } from "@/types/expense";

interface CategoryCardProps {
  category: ExpenseCategory;
  amount: number;
}

export function CategoryCard({ category, amount }: CategoryCardProps) {
  const { icon: Icon, tint } = CATEGORY_META[category];

  return (
    <div className="rounded-2xl border-2 bg-white p-4 shadow-soft">
      <div className={`grid size-9 place-items-center rounded-full ${tint}`}>
        <Icon className="size-[18px] " aria-hidden="true" />
      </div>
  
      <p className="mt-3 truncate text-sm font-medium text-gray-500">
        {category}
      </p>
  
      <p className="mt-0.5 text-lg font-semibold tracking-tight text-black">
        {formatLKR(amount)}
      </p>
    </div>
  );
}