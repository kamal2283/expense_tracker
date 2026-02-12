import { formatCurrency } from "../utils/format";

type CategoryChartProps = {
  categories: Array<{ category: string; total: number }>;
};

export default function CategoryChart({ categories }: CategoryChartProps) {
  if (!categories.length) {
    return <p className="card empty">No category data yet.</p>;
  }

  const maxValue = Math.max(...categories.map((item) => item.total));

  return (
    <div className="card chart">
      {categories.map((item) => {
        const width = maxValue ? (item.total / maxValue) * 100 : 0;
        return (
          <div className="chart__row" key={item.category}>
            <span className="chart__label">{item.category}</span>
            <div className="chart__bar">
              <span style={{ width: `${width}%` }} />
            </div>
            <span className="chart__value">{formatCurrency(item.total)}</span>
          </div>
        );
      })}
    </div>
  );
}
