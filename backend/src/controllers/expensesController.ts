import type { Request, Response, NextFunction } from "express";
import { HttpError } from "../middleware/errorHandler";
import {
  createExpense,
  deleteExpense,
  listExpenses,
  updateExpense,
} from "../services/expenseService";

function parseExpenseBody(body: Request["body"]) {
  const amount = Number(body.amount);
  const category = String(body.category || "").trim();
  const description = String(body.description || "").trim();
  const date = new Date(body.date);

  if (!Number.isFinite(amount) || amount <= 0) {
    throw new HttpError(400, "Amount must be greater than 0");
  }

  if (!category) {
    throw new HttpError(400, "Category is required");
  }

  if (!description) {
    throw new HttpError(400, "Description is required");
  }

  if (Number.isNaN(date.getTime())) {
    throw new HttpError(400, "Date is invalid");
  }

  return { amount, category, description, date };
}

export async function getExpenses(
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const expenses = await listExpenses();
    res.json(expenses);
  } catch (error) {
    next(error);
  }
}

export async function postExpense(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const data = parseExpenseBody(req.body);
    const created = await createExpense(data);
    res.status(201).json(created);
  } catch (error) {
    next(error);
  }
}

export async function putExpense(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const data = parseExpenseBody(req.body);
    const updated = await updateExpense(req.params.id, data);
    res.json(updated);
  } catch (error) {
    if ((error as { code?: string }).code === "P2025") {
      next(new HttpError(404, "Expense not found"));
      return;
    }

    next(error);
  }
}

export async function removeExpense(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    await deleteExpense(req.params.id);
    res.status(204).send();
  } catch (error) {
    if ((error as { code?: string }).code === "P2025") {
      next(new HttpError(404, "Expense not found"));
      return;
    }

    next(error);
  }
}
