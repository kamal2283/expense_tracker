import { del, get, post, put } from "./client";
import type { DashboardSummary, Expense } from "../types";

export async function fetchExpenses() {
  return get<Expense[]>("/expenses");
}

export async function createExpense(
  payload: Omit<Expense, "id" | "createdAt">,
) {
  return post<Expense>("/expenses", payload);
}

export async function updateExpense(
  id: string,
  payload: Omit<Expense, "id" | "createdAt">,
) {
  return put<Expense>(`/expenses/${id}`, payload);
}

export async function deleteExpense(id: string) {
  return del(`/expenses/${id}`);
}

export async function fetchDashboard() {
  return get<DashboardSummary>("/dashboard");
}
