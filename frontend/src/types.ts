export type Expense = {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
  createdAt: string;
};

export type DashboardSummary = {
  total: number;
  categories: Array<{ category: string; total: number }>;
};
