import { Router } from "express";
import {
  getExpenses,
  postExpense,
  putExpense,
  removeExpense,
} from "../controllers/expensesController";

const router = Router();

router.get("/", getExpenses);
router.post("/", postExpense);
router.put("/:id", putExpense);
router.delete("/:id", removeExpense);

export default router;
