import type { Request, Response, NextFunction } from "express";
import { getDashboardSummary } from "../services/dashboardService";

export async function getDashboard(
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const summary = await getDashboardSummary();
    res.json(summary);
  } catch (error) {
    next(error);
  }
}
