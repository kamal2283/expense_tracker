"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDashboardSummary = getDashboardSummary;
const prisma_1 = require("../db/prisma");
async function getDashboardSummary() {
    const totalResult = await prisma_1.prisma.expense.aggregate({
        _sum: { amount: true },
    });
    const categoryTotals = await prisma_1.prisma.expense.groupBy({
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
