"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listExpenses = listExpenses;
exports.createExpense = createExpense;
exports.updateExpense = updateExpense;
exports.deleteExpense = deleteExpense;
const prisma_1 = require("../db/prisma");
async function listExpenses() {
    return prisma_1.prisma.expense.findMany({ orderBy: { date: "desc" } });
}
async function createExpense(data) {
    return prisma_1.prisma.expense.create({ data });
}
async function updateExpense(id, data) {
    return prisma_1.prisma.expense.update({ where: { id }, data });
}
async function deleteExpense(id) {
    return prisma_1.prisma.expense.delete({ where: { id } });
}
