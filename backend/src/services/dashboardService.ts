import { prisma } from "../db/prisma";

export async function getDashboardSummary() {
  const totalResult = await prisma.expense.aggregate({
    _sum: { amount: true },
  });

  const categoryTotals = await prisma.expense.groupBy({
    by: ["category"],
    _sum: { amount: true },
  });

  return {
    total: totalResult._sum.amount ?? 0,
    categories: categoryTotals.map((item) => ({
      category: item.category,
      total: item._sum.amount ?? 0,
    })),
  };
}
