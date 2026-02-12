import { prisma } from "../db/prisma";

export async function listExpenses() {
  return prisma.expense.findMany({ orderBy: { date: "desc" } });
}

export async function createExpense(data: {
  amount: number;
  category: string;
  description: string;
  date: Date;
}) {
  return prisma.expense.create({ data });
}

export async function updateExpense(
  id: string,
  data: {
    amount: number;
    category: string;
    description: string;
    date: Date;
  },
) {
  return prisma.expense.update({ where: { id }, data });
}

export async function deleteExpense(id: string) {
  return prisma.expense.delete({ where: { id } });
}
