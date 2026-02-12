"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExpenses = getExpenses;
exports.postExpense = postExpense;
exports.putExpense = putExpense;
exports.removeExpense = removeExpense;
const errorHandler_1 = require("../middleware/errorHandler");
const expenseService_1 = require("../services/expenseService");
function parseExpenseBody(body) {
    const amount = Number(body.amount);
    const category = String(body.category || "").trim();
    const description = String(body.description || "").trim();
    const date = new Date(body.date);
    if (!Number.isFinite(amount) || amount <= 0) {
        throw new errorHandler_1.HttpError(400, "Amount must be greater than 0");
    }
    if (!category) {
        throw new errorHandler_1.HttpError(400, "Category is required");
    }
    if (!description) {
        throw new errorHandler_1.HttpError(400, "Description is required");
    }
    if (Number.isNaN(date.getTime())) {
        throw new errorHandler_1.HttpError(400, "Date is invalid");
    }
    return { amount, category, description, date };
}
async function getExpenses(_req, res, next) {
    try {
        const expenses = await (0, expenseService_1.listExpenses)();
        res.json(expenses);
    }
    catch (error) {
        next(error);
    }
}
async function postExpense(req, res, next) {
    try {
        const data = parseExpenseBody(req.body);
        const created = await (0, expenseService_1.createExpense)(data);
        res.status(201).json(created);
    }
    catch (error) {
        next(error);
    }
}
async function putExpense(req, res, next) {
    try {
        const data = parseExpenseBody(req.body);
        const updated = await (0, expenseService_1.updateExpense)(req.params.id, data);
        res.json(updated);
    }
    catch (error) {
        if (error.code === "P2025") {
            next(new errorHandler_1.HttpError(404, "Expense not found"));
            return;
        }
        next(error);
    }
}
async function removeExpense(req, res, next) {
    try {
        await (0, expenseService_1.deleteExpense)(req.params.id);
        res.status(204).send();
    }
    catch (error) {
        if (error.code === "P2025") {
            next(new errorHandler_1.HttpError(404, "Expense not found"));
            return;
        }
        next(error);
    }
}
