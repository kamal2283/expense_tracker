import { useEffect, useState } from "react";
import CategoryChart from "../components/CategoryChart";
import PageTitle from "../components/PageTitle";
import type { DashboardSummary } from "../types";
import { fetchDashboard } from "../api/expenses";
import { formatCurrency } from "../utils/format";

const emptySummary: DashboardSummary = { total: 0, categories: [] };

export default function Dashboard() {
  const [summary, setSummary] = useState<DashboardSummary>(emptySummary);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isActive = true;

    fetchDashboard()
      .then((data) => {
        if (isActive) {
          setSummary(data);
        }
      })
      .catch((err) => {
        if (isActive) {
          setError(err.message);
        }
      });

    return () => {
      isActive = false;
    };
  }, []);

  return (
    <section className="page">
      <PageTitle title="Dashboard" subtitle="Overview of your spending." />

      {error ? <p className="error">{error}</p> : null}

      <div className="grid">
        <div className="card highlight">
          <h3>Total Expenses</h3>
          <p className="highlight__value">{formatCurrency(summary.total)}</p>
        </div>
        <div className="card">
          <h3>Category Breakdown</h3>
          <CategoryChart categories={summary.categories} />
        </div>
      </div>
    </section>
  );
}
